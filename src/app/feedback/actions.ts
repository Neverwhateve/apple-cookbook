"use server";

import { redirect } from "next/navigation";
import { saveFeedback } from "@/lib/feedback";

export type FeedbackState = {
  ok: boolean;
  message: string;
  id?: string;
};

export async function submitFeedback(_state: FeedbackState, formData: FormData): Promise<FeedbackState> {
  const result = await saveFeedback(formData);

  if (!result.ok) {
    return {
      ok: false,
      message: result.error
    };
  }

  return {
    ok: true,
    id: result.id,
    message: `已记录为 ${result.id}，并加入每日工作收集。`
  };
}

export async function submitQuickFeedback(formData: FormData) {
  const result = await saveFeedback(formData);

  if (!result.ok) {
    redirect(`/feedback?error=${encodeURIComponent(result.error)}`);
  }

  redirect(`/feedback?submitted=${encodeURIComponent(result.id)}`);
}
