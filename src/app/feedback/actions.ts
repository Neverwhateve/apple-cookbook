"use server";

import { saveFeedback } from "@/lib/feedback";
import { triggerFeedbackProcessing } from "@/lib/feedback-trigger";

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

    const trigger = await triggerFeedbackProcessing(result.id);

    return {
      ok: true,
      id: result.id,
      message:
        trigger.status === "dispatched"
          ? `已记录为 ${result.id}，自动验证流程已启动。`
          : `已记录为 ${result.id}，已进入最高优先级处理队列。`
    };
  } catch (error) {
    console.error("Feedback submission could not be persisted.", { error });
    return {
      ok: false,
      message: "暂时无法保存反馈，本次内容未记录。请保留原文并稍后重试。"
    };
  }
}
