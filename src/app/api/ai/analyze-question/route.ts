import { NextRequest, NextResponse } from "next/server";
import { analyzeQuestion } from "@/lib/ai-assistant";
import { publicAiAvailability } from "@/lib/ai-config";

export const dynamic = "force-dynamic";

function noStore(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function requestBody(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const body = value as Record<string, unknown>;
  const question = typeof body.question === "string" ? body.question.trim() : "";
  const clarificationAnswers = Array.isArray(body.clarification_answers)
    ? body.clarification_answers.filter((item): item is string => typeof item === "string").slice(0, 3)
    : [];
  const sessionId = typeof body.session_id === "string" ? body.session_id.slice(0, 160) : undefined;
  return { question, clarificationAnswers, sessionId };
}

export async function POST(request: NextRequest) {
  try {
    const body = requestBody(await request.json());
    if (!body || body.question.length < 2 || body.question.length > 2_000) return noStore({ error: "问题长度应为 2 到 2000 个字符。" }, 400);
    const result = await analyzeQuestion(body);
    return noStore({
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
      fallback: result.fallback,
      fallback_reason: result.fallback ? result.reason : undefined,
      availability: publicAiAvailability()
    });
  } catch {
    return noStore({ error: "暂时无法分析问题，请使用 Cookbook 搜索。" }, 500);
  }
}
