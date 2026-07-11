"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  canUseAdminCredentials,
  canUseAdminSession,
  createAdminSessionToken,
  updateFeedbackStatus,
  type FeedbackStatus
} from "@/lib/feedback-admin";

const allowedStatuses = new Set<FeedbackStatus>(["open", "in_progress", "resolved", "dismissed"]);
const cookieName = "apple-cookbook-admin";

export async function loginAdmin(formData: FormData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!canUseAdminCredentials(username, password)) {
    throw new Error("用户名或密码不正确。");
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
