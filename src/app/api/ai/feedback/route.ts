import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getAiConfig } from "@/lib/ai-config";
import { getAiStorageUnavailableReason, recordAiFeedback } from "@/lib/ai-logs";
import { sanitizeFreeText } from "@/lib/ai-privacy";
import { getPublishedArticles } from "@/lib/cookbook";

export const dynamic = "force-dynamic";
const feedbackRequests = new Map<string, number[]>();

function noStore(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function feedbackRateAllowed(sessionId: string) {
  const now = Date.now();
  const recent = (feedbackRequests.get(sessionId) ?? []).filter((at) => now - at < 60_000);
  if (recent.length >= 10) return false;
  recent.push(now);
  feedbackRequests.set(sessionId, recent);
  return true;
}

export async function POST(request: NextRequest) {
  const config = getAiConfig();
  if (!config.enabled || !config.feedbackEnabled) return noStore({ error: "AI 反馈当前未启用。" }, 404);
  const storageUnavailableReason = getAiStorageUnavailableReason();
  if (storageUnavailableReason) return noStore({ error: storageUnavailableReason }, 503);

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const questionId = typeof body.question_id === "string" ? body.question_id : "";
    const articleId = typeof body.article_id === "string" ? body.article_id : "";
    const helpful = typeof body.helpful === "boolean" ? body.helpful : null;
    const solved = typeof body.solved === "boolean" ? body.solved : null;
    const sessionId = typeof body.session_id === "string" ? body.session_id.slice(0, 160) : "anonymous";
    if (!/^AIQ-[0-9a-f-]{36}$/i.test(questionId) || helpful === null || solved === null) return noStore({ error: "反馈格式无效。" }, 400);
    if (articleId && !getPublishedArticles().some((article) => article.id === articleId)) return noStore({ error: "文章不存在。" }, 404);
    if (!feedbackRateAllowed(sessionId)) return noStore({ error: "反馈提交过于频繁，请稍后再试。" }, 429);

    await recordAiFeedback({
      id: crypto.randomUUID(), questionId, articleId: articleId || null, helpful, solved,
      feedbackSanitized: sanitizeFreeText(body.feedback), createdAt: new Date().toISOString()
    });
    return noStore({ ok: true });
  } catch {
    return noStore({ error: "暂时无法记录反馈。" }, 500);
  }
}
