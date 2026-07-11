"use server";

import { revalidatePath } from "next/cache";
import { canUseAdmin, updateFeedbackStatus, type FeedbackStatus } from "@/lib/feedback-admin";

const allowedStatuses = new Set<FeedbackStatus>(["open", "in_progress", "resolved", "dismissed"]);

export async function updateFeedbackQueueItem(formData: FormData) {
  const token = String(formData.get("token") ?? "");

  if (!canUseAdmin(token)) {
    throw new Error("Admin access is not configured or the token is invalid.");
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
