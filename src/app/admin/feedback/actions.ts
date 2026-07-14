"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  canUseAdminCredentials,
  canUseAdminSession,
  createAdminSessionToken,
  moveFeedbackItem,
  queueFeedbackForHarvest,
  updateFeedbackStatus,
  type FeedbackStatus
} from "@/lib/feedback-admin";
import { triggerFeedbackProcessing } from "@/lib/feedback-trigger";

const allowedStatuses = new Set<FeedbackStatus>(["open", "in_progress", "needs_review", "resolved", "dismissed"]);
const cookieName = "apple-cookbook-admin";

export async function loginAdmin(_: { error: string }, formData: FormData): Promise<{ error: string }> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!canUseAdminCredentials(username, password)) {
    return { error: "用户名或密码不正确，或管理员认证尚未完成配置。" };
  }

  const cookieStore = await cookies();
  cookieStore.set(cookieName, createAdminSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 30
  });

  revalidatePath("/admin/feedback");
  redirect("/admin/feedback");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
  revalidatePath("/admin/feedback");
}

export async function updateFeedbackQueueItem(formData: FormData) {
  const cookieStore = await cookies();

  if (!canUseAdminSession(cookieStore.get(cookieName)?.value)) {
    throw new Error("管理员会话已失效，请重新登录。");
  }

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as FeedbackStatus;
  const adminNote = String(formData.get("adminNote") ?? "");

  if (!allowedStatuses.has(status)) {
    throw new Error("Invalid feedback status.");
  }

  await updateFeedbackStatus(id, status, adminNote);
  revalidatePath("/admin/feedback");
}

export async function moveFeedbackQueueItem(formData: FormData) {
  const cookieStore = await cookies();

  if (!canUseAdminSession(cookieStore.get(cookieName)?.value)) {
    throw new Error("管理员会话已失效，请重新登录。");
  }

  const id = String(formData.get("id") ?? "");
  const direction = String(formData.get("direction") ?? "");

  if (direction !== "first" && direction !== "last") {
    throw new Error("Invalid queue move direction.");
  }

  await moveFeedbackItem(id, direction);
  revalidatePath("/admin/feedback");
}

export async function promoteFeedbackQueueItem(formData: FormData) {
  const cookieStore = await cookies();

  if (!canUseAdminSession(cookieStore.get(cookieName)?.value)) {
    throw new Error("管理员会话已失效，请重新登录。");
  }

  const id = String(formData.get("id") ?? "");
  const result = await queueFeedbackForHarvest(id, "管理员复核后确认有效，重新进入 P0，等待下一轮 Harvest。");

  if (result.queued) {
    await triggerFeedbackProcessing(id);
  }

  revalidatePath("/admin/feedback");
}
