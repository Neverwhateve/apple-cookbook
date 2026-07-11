"use client";

import { SendHorizonal } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { submitFeedback, type FeedbackState } from "@/app/feedback/actions";

const initialState: FeedbackState = {
  ok: false,
  message: ""
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
    >
      <SendHorizonal className="h-4 w-4" />
      {pending ? "正在记录" : "提交"}
    </button>
  );
}

export function FeedbackForm({
  initialQuestion = "",
  initialLink = ""
}: {
  initialQuestion?: string;
  initialLink?: string;
}) {
  const [state, formAction] = useActionState(submitFeedback, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-5 rounded-lg border border-zinc-200 bg-white p-5 shadow-soft dark:border-zinc-800 dark:bg-zinc-950"
    >
      <input type="hidden" name="kind" value="missing_problem" />
      <div>
        <label htmlFor="question" className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
          问题
        </label>
        <textarea
          id="question"
          name="question"
          rows={7}
          defaultValue={initialQuestion}
          placeholder="例如：Apple Watch 无法解锁 Mac，已确认蓝牙和 Wi-Fi 开启，但 Mac 设置里仍无法勾选。"
          className="mt-2 w-full resize-y rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm leading-6 outline-none transition placeholder:text-zinc-500 focus:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-900"
        />
      </div>

      <div>
        <label htmlFor="link" className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
          链接
        </label>
        <input
          id="link"
          name="link"
          type="url"
          defaultValue={initialLink}
          placeholder="https://support.apple.com/..."
          className="mt-2 w-full rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none transition placeholder:text-zinc-500 focus:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-900"
        />
      </div>

      <div className="flex flex-col gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
        <p
          aria-live="polite"
          className={`min-h-5 text-sm ${
            state.message
              ? state.ok
                ? "text-emerald-700 dark:text-emerald-400"
                : "text-red-600 dark:text-red-400"
              : "text-zinc-500 dark:text-zinc-400"
          }`}
        >
          {state.message || "填写问题或链接后提交。问题会作为高优先级待办处理。"}
        </p>
        <SubmitButton />
      </div>
    </form>
  );
}
