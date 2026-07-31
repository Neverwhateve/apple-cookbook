import crypto from "node:crypto";
import { analysisJsonContract, cookbookAssistantSystemPrompt, recommendationJsonContract } from "@/ai/prompts/cookbook-assistant";
import { getPublishedArticles, getPublishedSearchDocuments, type Article } from "./cookbook.ts";
import { getAiConfig } from "./ai-config.ts";
import { countUsageToday, hashAnonymousSession, recordAiQuestion, recordAiUsage, recordSearchLog } from "./ai-logs.ts";
import { sanitizeAiInput } from "./ai-privacy.ts";
import { type ModelRecommendation, type QuestionAnalysis, type RiskLevel, parseModelRecommendation, parseQuestionAnalysis } from "./ai-schema.ts";
import { DeepSeekError, requestDeepSeekJson } from "./deepseek-client.ts";
import { searchDocuments, type SearchDocument } from "./search.ts";

export type AiArticle = {
  id: string;
  title: string;
  route: string;
  summary: string;
  verification: Article["verification"];
  updated: string;
  category: string;
  devices: string[];
  reason: string;
  relevance: "high" | "medium" | "low";
};

export type AiSearchResponse = {
  questionId: string;
  sanitizedQuestion: string;
  analysis: QuestionAnalysis;
  summary: string;
  recommendedArticles: AiArticle[];
  suggestedSteps: { text: string; sourceArticleId: string }[];
  confidence: "high" | "medium" | "low";
  coverage: "complete" | "partial" | "missing";
  needsHumanReview: boolean;
  clarificationAnswers: string[];
  fallback: boolean;
  fallbackReason?: "disabled" | "budget" | "rate_limited" | "unavailable";
  feedbackEnabled: boolean;
};

const recentRequests = new Map<string, number[]>();
let inMemoryBudgetDay = "";
let inMemoryBudgetCount = 0;
const highRiskPattern = /恢复模式|dfu|抹掉|擦除|erase|恢复密钥|recovery key|激活锁|activation lock|apple\s*(?:id|账户|账号)|apple account|忘记.*(?:密码|口令)|密码.*忘/i;
const bypassPattern = /(?:绕过|跳过|破解|解锁).{0,12}(?:激活锁|activation lock|apple\s*(?:id|账户|账号)|apple account|密码|口令)|(?:激活锁|activation lock).{0,12}(?:绕过|跳过|破解)/i;
const unsupportedPattern = /写一封邮件|天气怎么样|推荐.*游戏|股票|菜谱|翻译/i;

function safeLog(task: () => Promise<void>) {
  return task().catch((error) => {
    // Never log input or API credentials. Telemetry failure must not block search.
    console.error("AI anonymous telemetry could not be persisted.", { error: error instanceof Error ? error.message : "unknown" });
  });
}

function unique(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

function knownDevices(value: string) {
  const devicePatterns: [string, RegExp][] = [
    ["iPhone", /iphone|苹果手机|手机/i],
    ["Mac", /\bmac\b|macbook|电脑/i],
    ["iPad", /ipad/i],
    ["Apple Watch", /apple\s*watch|手表/i],
    ["AirPods", /airpods|耳机/i],
    ["HomePod", /homepod/i]
  ];
  return devicePatterns.filter(([, pattern]) => pattern.test(value)).map(([device]) => device);
}

function riskFor(value: string): RiskLevel {
  return highRiskPattern.test(value) ? "high" : /无法开机|无法充电|黑屏|连接不上|连不上/i.test(value) ? "medium" : "low";
}

function heuristicAnalysis(question: string, clarificationAnswers: string[]): QuestionAnalysis {
  const devices = knownDevices(question);
  const risky = riskFor(question);
  const unsupported = bypassPattern.test(question) || unsupportedPattern.test(question);
  const short = question.replace(/[\s,.，。！？!?]/g, "").length < 8;
  const questions: string[] = [];

  if (!unsupported && clarificationAnswers.length < 3 && (short || devices.length === 0)) {
    questions.push("使用的是哪种设备？它目前显示的完整提示或现象是什么？");
  }
  if (!unsupported && clarificationAnswers.length < 3 && (/连不上|连接|没声音|开不了机|无法充电/i.test(question) || short)) {
    questions.push("这个问题从什么时候开始？是所有场景都会发生，还是只影响一个 App、配件或连接方式？");
  }

  return {
    intent: unsupported ? "unsupported" : short ? "search" : "troubleshoot",
    devices,
    category: "",
    normalizedIssue: question.slice(0, 240),
    symptoms: [],
    keywords: unique([question, ...devices]).slice(0, 8),
    needClarification: questions.length > 0,
    clarifyingQuestions: questions.slice(0, 2),
    riskLevel: risky
  };
}

function queryForSearch(analysis: QuestionAnalysis, question: string, answers: string[]) {
  return unique([analysis.normalizedIssue, ...analysis.keywords, ...analysis.symptoms, ...analysis.devices, question, ...answers])
    .filter((item) => item.length >= 2)
    .join(" ")
    .slice(0, 1_200);
}

function candidatesFor(articles: SearchDocument[], query: string) {
  return searchDocuments(articles, query, 8).slice(0, 8).map((hit) => hit.document);
}

function articleById(articles: Article[], id: string) {
  return articles.find((article) => article.id === id);
}

function articleCandidateText(candidates: SearchDocument[]) {
  return candidates.map((article) => ({
    article_id: article.id,
    title: article.title,
    summary: article.summary.slice(0, 500),
    verification: article.verification,
    updated: article.updated,
    category: article.category,
    devices: article.devices,
    symptoms: article.symptoms.slice(0, 5)
  }));
}

function fallbackRecommendation(candidates: SearchDocument[]): ModelRecommendation {
  return {
    summary: candidates.length ? "已根据 Cookbook 的标题、症状、关键词、设备、类目、正文命中、可信度和更新时间找到相关内容。" : "Cookbook 暂时没有找到可靠的对应文章。",
    recommendedArticles: candidates.slice(0, 3).map((article, index) => ({
      articleId: article.id,
      reason: index === 0 ? "与问题中的症状和关键词匹配度最高。" : "与问题中的设备、症状或关键词相关。",
      relevance: index === 0 ? "high" : "medium"
    })),
    suggestedSteps: [],
    confidence: candidates.length >= 2 ? "medium" : "low",
    coverage: candidates.length ? "partial" : "missing",
    needsHumanReview: false
  };
}

function mapRecommendedArticles(recommendation: ModelRecommendation, articles: Article[]): AiArticle[] {
  return recommendation.recommendedArticles.flatMap((item) => {
    const article = articleById(articles, item.articleId);
    if (!article) return [];
    return [{
      id: article.id,
      title: article.title,
      route: article.route,
      summary: article.summary || article.excerpt,
      verification: article.verification,
      updated: article.updated,
      category: article.category,
      devices: article.devices,
      reason: item.reason || "与输入的问题相关。",
      relevance: item.relevance
    }];
  });
}

function assertRequestAllowed(sessionHash: string) {
  const now = Date.now();
  const recent = (recentRequests.get(sessionHash) ?? []).filter((at) => now - at < 60_000);
  if (recent.length >= 5) return false;
  recent.push(now);
  recentRequests.set(sessionHash, recent);
  return true;
}

async function budgetAvailable() {
  const config = getAiConfig();
  const day = new Date().toISOString().slice(0, 10);
  if (inMemoryBudgetDay !== day) {
    inMemoryBudgetDay = day;
    inMemoryBudgetCount = 0;
  }
  if (!config.dailyBudget || inMemoryBudgetCount >= config.dailyBudget) return false;
  if (config.loggingEnabled && (await countUsageToday()) >= config.dailyBudget) return false;
  return true;
}

async function modelAnalysis(sanitizedQuestion: string, answers: string[]) {
  const result = await requestDeepSeekJson(
    cookbookAssistantSystemPrompt,
    `${analysisJsonContract}\n\n用户的脱敏问题：${sanitizedQuestion}\n补充回答：${answers.join("；") || "无"}`
  );
  const parsed = parseQuestionAnalysis(result.value);
  if (!parsed) throw new DeepSeekError("Model analysis schema validation failed.", "invalid_response");
  return {
    analysis: answers.length >= 3 ? { ...parsed, needClarification: false, clarifyingQuestions: [] } : parsed,
    ...result
  };
}

async function modelRecommendation(analysis: QuestionAnalysis, candidates: SearchDocument[]) {
  const result = await requestDeepSeekJson(
    cookbookAssistantSystemPrompt,
    `${recommendationJsonContract}\n\n问题理解：${JSON.stringify(analysis)}\n候选 Cookbook 文章：${JSON.stringify(articleCandidateText(candidates))}`
  );
  const parsed = parseModelRecommendation(result.value, new Set(candidates.map((candidate) => candidate.id)));
  if (!parsed) throw new DeepSeekError("Model recommendation schema validation failed.", "invalid_response");
  return { recommendation: parsed, ...result };
}

async function logModelUsage(
  operation: "analyze" | "search",
  success: boolean,
  latencyMs: number,
  usage: { inputTokens: number | null; outputTokens: number | null },
  errorCode: string | null
) {
  const config = getAiConfig();
  if (!config.loggingEnabled) return;
  await safeLog(() => recordAiUsage({
    provider: "deepseek",
    model: config.model,
    operation,
    success,
    latencyMs,
    inputTokens: usage.inputTokens,
    outputTokens: usage.outputTokens,
    // Prices vary by model and deployment agreement, so deployment supplies
    // the rate instead of code hard-coding a potentially stale price.
    estimatedCost:
      usage.inputTokens === null || usage.outputTokens === null
        ? null
        : Number(((usage.inputTokens * config.inputCostPerMillion + usage.outputTokens * config.outputCostPerMillion) / 1_000_000).toFixed(8)),
    errorCode,
    createdAt: new Date().toISOString()
  }));
}

export async function analyzeQuestion(input: { question: string; clarificationAnswers?: string[]; sessionId?: string }) {
  const sanitized = sanitizeAiInput(input.question);
  const answers = (input.clarificationAnswers ?? []).map((answer) => sanitizeAiInput(answer).sanitized).filter(Boolean).slice(0, 3);
  if (!sanitized.sanitized || sanitized.sanitized.length > 2_000) throw new Error("Invalid question.");
  const sessionHash = hashAnonymousSession(input.sessionId ?? crypto.randomUUID());
  const config = getAiConfig();
  if (!config.enabled) return { sanitizedQuestion: sanitized.sanitized, analysis: heuristicAnalysis(sanitized.sanitized, answers), fallback: true, reason: "disabled" as const };
  if (!assertRequestAllowed(sessionHash)) return { sanitizedQuestion: sanitized.sanitized, analysis: heuristicAnalysis(sanitized.sanitized, answers), fallback: true, reason: "rate_limited" as const };
  if (!(await budgetAvailable())) return { sanitizedQuestion: sanitized.sanitized, analysis: heuristicAnalysis(sanitized.sanitized, answers), fallback: true, reason: "budget" as const };

  const started = Date.now();
  try {
    const result = await modelAnalysis(sanitized.sanitized, answers);
    inMemoryBudgetCount += 1;
    await logModelUsage("analyze", true, result.latencyMs, result.usage, null);
    return { sanitizedQuestion: sanitized.sanitized, analysis: result.analysis, fallback: false };
  } catch (error) {
    await logModelUsage("analyze", false, Date.now() - started, { inputTokens: null, outputTokens: null }, error instanceof DeepSeekError ? error.code : "unknown");
    return { sanitizedQuestion: sanitized.sanitized, analysis: heuristicAnalysis(sanitized.sanitized, answers), fallback: true, reason: "unavailable" as const };
  }
}

export async function searchWithAssistant(input: { question: string; clarificationAnswers?: string[]; sessionId?: string }): Promise<AiSearchResponse> {
  const initial = await analyzeQuestion(input);
  const config = getAiConfig();
  const answers = (input.clarificationAnswers ?? []).map((answer) => sanitizeAiInput(answer).sanitized).filter(Boolean).slice(0, 3);
  const articles = getPublishedArticles();
  const candidates = initial.analysis.intent === "unsupported" ? [] : candidatesFor(getPublishedSearchDocuments(articles), queryForSearch(initial.analysis, initial.sanitizedQuestion, answers));
  let recommendation = fallbackRecommendation(candidates);
  let fallback = initial.fallback;
  let fallbackReason = initial.fallback ? initial.reason : undefined;
  const sessionHash = hashAnonymousSession(input.sessionId ?? crypto.randomUUID());

  if (!initial.fallback && initial.analysis.intent !== "unsupported" && candidates.length > 0) {
    if (!assertRequestAllowed(sessionHash)) {
      fallback = true;
      fallbackReason = "rate_limited";
    } else if (!(await budgetAvailable())) {
      fallback = true;
      fallbackReason = "budget";
    } else {
      const started = Date.now();
      try {
        const result = await modelRecommendation(initial.analysis, candidates);
        recommendation = result.recommendation;
        inMemoryBudgetCount += 1;
        await logModelUsage("search", true, result.latencyMs, result.usage, null);
      } catch (error) {
        fallback = true;
        fallbackReason = "unavailable";
        await logModelUsage("search", false, Date.now() - started, { inputTokens: null, outputTokens: null }, error instanceof DeepSeekError ? error.code : "unknown");
      }
    }
  }

  if (initial.analysis.intent === "unsupported") {
    recommendation = {
      summary: bypassPattern.test(initial.sanitizedQuestion) ? "Cookbook 不提供绕过激活锁、账户或设备安全机制的操作。请使用 Apple 官方账户恢复、购买凭证或授权支持渠道。" : "这个请求不属于 Apple Cookbook 的文章检索与问题排查范围。",
      recommendedArticles: [], suggestedSteps: [], confidence: "low", coverage: "missing", needsHumanReview: false
    };
  }

  const questionId = `AIQ-${crypto.randomUUID()}`;
  const recommendedArticles = mapRecommendedArticles(recommendation, articles);
  if (config.loggingEnabled) {
    const createdAt = new Date().toISOString();
    await Promise.all([
      safeLog(() => recordSearchLog({ id: crypto.randomUUID(), querySanitized: initial.sanitizedQuestion, normalizedQuery: initial.analysis.normalizedIssue, resultCount: candidates.length, clickedArticleId: null, noResult: candidates.length === 0, createdAt })),
      safeLog(() => recordAiQuestion({ id: questionId, sanitizedQuestion: initial.sanitizedQuestion, normalizedIssue: initial.analysis.normalizedIssue, devices: initial.analysis.devices, category: initial.analysis.category, riskLevel: initial.analysis.riskLevel, recommendedArticleIds: recommendedArticles.map((article) => article.id), coverage: recommendation.coverage, resolved: null, sessionIdHash: sessionHash, createdAt }))
    ]);
  }

  return {
    questionId,
    sanitizedQuestion: initial.sanitizedQuestion,
    analysis: initial.analysis,
    summary: recommendation.summary,
    recommendedArticles,
    suggestedSteps: recommendation.suggestedSteps.filter((step) => recommendedArticles.some((article) => article.id === step.sourceArticleId)),
    confidence: recommendation.confidence,
    coverage: recommendation.coverage,
    needsHumanReview: recommendation.needsHumanReview || initial.analysis.riskLevel === "high",
    clarificationAnswers: answers,
    fallback,
    fallbackReason,
    feedbackEnabled: config.enabled && config.feedbackEnabled
  };
}
