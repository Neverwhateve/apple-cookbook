"use server";

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
    message: `Recorded as ${result.id}. It is now in the daily work intake.`
  };
}
