import { NextRequest, NextResponse } from "next/server";
import { searchWithAssistant } from "@/lib/ai-assistant";

export const dynamic = "force-dynamic";

function noStore(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  try {
    const raw = (await request.json()) as Record<string, unknown>;
    const question = typeof raw.question === "string" ? raw.question.trim() : "";
    const clarificationAnswers = Array.isArray(raw.clarification_answers)
      ? raw.clarification_answers.filter((item): item is string => typeof item === "string").slice(0, 3)
      : [];
    const sessionId = typeof raw.session_id === "string" ? raw.session_id.slice(0, 160) : undefined;
    if (question.length < 2 || question.length > 2_000) return noStore({ error: "问题长度应为 2 到 2000 个字符。" }, 400);

    const result = await searchWithAssistant({ question, clarificationAnswers, sessionId });
    return noStore({
      question_id: result.questionId,
      sanitized_question: result.sanitizedQuestion,
      analysis: {
        intent: result.analysis.intent,
        devices: result.analysis.devices,
        category: result.analysis.category,
        normalized_issue: result.analysis.normalizedIssue,
        symptoms: result.analysis.symptoms,
        keywords: result.analysis.keywords,
        need_clarification: result.analysis.needClarification,
        clarifying_questions: result.analysis.clarifyingQuestions,
        risk_level: result.analysis.riskLevel
      },
      summary: result.summary,
      recommended_articles: result.recommendedArticles.map((article) => ({
        article_id: article.id,
        title: article.title,
        route: article.route,
        summary: article.summary,
        verification: article.verification,
        updated: article.updated,
        category: article.category,
        devices: article.devices,
        reason: article.reason,
        relevance: article.relevance
      })),
      suggested_steps: result.suggestedSteps.map((step) => ({ text: step.text, source_article_id: step.sourceArticleId })),
      confidence: result.confidence,
      coverage: result.coverage,
      needs_human_review: result.needsHumanReview,
      clarification_answers: result.clarificationAnswers,
      fallback: result.fallback,
      fallback_reason: result.fallbackReason,
      feedback_enabled: result.feedbackEnabled
    });
  } catch {
    return noStore({ error: "AI 分析暂时不可用，已保留 Cookbook 普通搜索。" }, 500);
  }
}
