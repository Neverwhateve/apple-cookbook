export type AiIntent = "search" | "troubleshoot" | "unsupported";
export type RiskLevel = "low" | "medium" | "high";
export type Confidence = "high" | "medium" | "low";
export type Coverage = "complete" | "partial" | "missing";

export type QuestionAnalysis = {
  intent: AiIntent;
  devices: string[];
  category: string;
  normalizedIssue: string;
  symptoms: string[];
  keywords: string[];
  needClarification: boolean;
  clarifyingQuestions: string[];
  riskLevel: RiskLevel;
};

export type ModelRecommendation = {
  summary: string;
  recommendedArticles: { articleId: string; reason: string; relevance: "high" | "medium" | "low" }[];
  suggestedSteps: { text: string; sourceArticleId: string }[];
  confidence: Confidence;
  coverage: Coverage;
  needsHumanReview: boolean;
};

const intents = new Set<AiIntent>(["search", "troubleshoot", "unsupported"]);
const risks = new Set<RiskLevel>(["low", "medium", "high"]);
const confidence = new Set<Confidence>(["high", "medium", "low"]);
const coverage = new Set<Coverage>(["complete", "partial", "missing"]);
const relevance = new Set(["high", "medium", "low"]);

function record(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
}

function text(value: unknown, maximum = 240) {
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}

function strings(value: unknown, maximumItems = 8, maximumLength = 160) {
  return Array.isArray(value)
    ? Array.from(new Set(value.map((item) => text(item, maximumLength)).filter(Boolean))).slice(0, maximumItems)
    : [];
}

export function parseQuestionAnalysis(value: unknown): QuestionAnalysis | null {
  const result = record(value);
  if (!result || !intents.has(result.intent as AiIntent) || !risks.has(result.risk_level as RiskLevel)) return null;

  const questions = strings(result.clarifying_questions, 2);
  return {
    intent: result.intent as AiIntent,
    devices: strings(result.devices, 4),
    category: text(result.category, 80),
    normalizedIssue: text(result.normalized_issue, 240),
    symptoms: strings(result.symptoms, 6),
    keywords: strings(result.keywords, 8),
    needClarification: result.need_clarification === true && questions.length > 0,
    clarifyingQuestions: questions,
    riskLevel: result.risk_level as RiskLevel
  };
}

export function parseModelRecommendation(value: unknown, allowedArticleIds: Set<string>): ModelRecommendation | null {
  const result = record(value);
  if (!result || !confidence.has(result.confidence as Confidence) || !coverage.has(result.coverage as Coverage)) return null;

  const recommendedArticles = (Array.isArray(result.recommended_articles) ? result.recommended_articles : [])
    .map(record)
    .filter((item): item is Record<string, unknown> => Boolean(item))
    .map((item) => ({ articleId: text(item.article_id, 160), reason: text(item.reason, 280), relevance: text(item.relevance, 12) }))
    .filter((item) => allowedArticleIds.has(item.articleId) && relevance.has(item.relevance))
    .slice(0, 3)
    .map((item) => ({ ...item, relevance: item.relevance as "high" | "medium" | "low" }));
  const allowedRecommendedIds = new Set(recommendedArticles.map((item) => item.articleId));
  const suggestedSteps = (Array.isArray(result.suggested_steps) ? result.suggested_steps : [])
    .map(record)
    .filter((item): item is Record<string, unknown> => Boolean(item))
    .map((item) => ({ text: text(item.text, 280), sourceArticleId: text(item.source_article_id, 160) }))
    .filter((item) => item.text && allowedRecommendedIds.has(item.sourceArticleId))
    .slice(0, 4);

  return {
    summary: text(result.summary, 480),
    recommendedArticles,
    suggestedSteps,
    confidence: result.confidence as Confidence,
    coverage: result.coverage as Coverage,
    needsHumanReview: result.needs_human_review === true
  };
}
