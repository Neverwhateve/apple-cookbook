"use server";

import { saveFeedback } from "@/lib/feedback";

export type FeedbackState = {
  ok: boolean;
  message: string;
  id?: string;
};

export async function submitFeedback(_state: FeedbackState, formData: FormData): Promise<FeedbackState> {
  try {
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
  } catch (error) {
    console.error("Feedback submission could not be persisted.", { error });
    return {
      ok: false,
      message: "暂时无法保存反馈，本次内容未记录。请保留原文并稍后重试。"
    };
  }
}
