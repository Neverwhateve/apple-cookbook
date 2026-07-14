"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminArticleEditProposal } from "@/lib/admin-article-edits";
import { triggerAdminArticlePublication } from "@/lib/admin-article-trigger";
import { canUseAdminSession, updateFeedbackStatus } from "@/lib/feedback-admin";
import { getArticleById } from "@/lib/cookbook";

const cookieName = "apple-cookbook-admin";

export async function submitAdminArticleEdit(formData: FormData) {
  const cookieStore = await cookies();

  if (!canUseAdminSession(cookieStore.get(cookieName)?.value)) {
    throw new Error("管理员会话已失效，请重新登录。");
  }

  const articleId = String(formData.get("articleId") ?? "").trim();
  const article = getArticleById(articleId);

  if (!article) {
    throw new Error("找不到要编辑的文章。");
  }

  const feedbackId = String(formData.get("feedbackId") ?? "").trim();
  const reason = String(formData.get("reason") ?? "").trim();
  const editorPath = `/admin/articles/${encodeURIComponent(article.id)}`;
  const feedbackQuery = feedbackId ? `&feedbackId=${encodeURIComponent(feedbackId)}` : "";
  let destination: string;

  try {
    const proposal = await createAdminArticleEditProposal({
      article,
      title: String(formData.get("title") ?? ""),
      summary: String(formData.get("summary") ?? ""),
      body: String(formData.get("body") ?? ""),
      expectedHash: String(formData.get("expectedHash") ?? ""),
      reason:
        reason ||
        (feedbackId
          ? `管理员直接修改文章以处理反馈 ${feedbackId}`
          : `管理员从内容后台修改文章 ${article.id}`)
    });
    const trigger = await triggerAdminArticlePublication(proposal.proposalId);

    if (feedbackId) {
      await updateFeedbackStatus(
        feedbackId,
        "resolved",
        `管理员已提交文章修改 ${proposal.proposalId}；通过内容校验后自动发布。`
      );
    }

    destination = `${editorPath}?submitted=${encodeURIComponent(proposal.proposalId)}&dispatch=${trigger.status}${feedbackQuery}`;
  } catch (error) {
    const message = error instanceof Error ? error.message : "文章修改提交失败。";
    destination = `${editorPath}?error=${encodeURIComponent(message)}${feedbackQuery}`;
  }

  revalidatePath("/admin/feedback");
  revalidatePath("/admin/articles");
  revalidatePath(editorPath);
  revalidatePath(article.route);
  redirect(destination);
}
