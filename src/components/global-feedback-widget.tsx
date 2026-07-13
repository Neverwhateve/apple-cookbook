"use client";

import { MessageSquarePlus, SendHorizonal, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useActionState, useState } from "react";
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
      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-zinc-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
    >
      <SendHorizonal className="h-4 w-4" />
      {pending ? "提交中" : "提交"}
    </button>
  );
}

export function GlobalFeedbackWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<"question_submission" | "link_submission">("question_submission");
  const [state, formAction] = useActionState(submitFeedback, initialState);

  if (pathname.startsWith("/feedback") || pathname.startsWith("/admin") || pathname.startsWith("/recipes")) {
    return null;
  }

  const contentLabel = kind === "link_submission" ? "链接" : "问题";
  const placeholder =
    kind === "link_submission"
      ? "粘贴 Apple 支持、社区、新闻或论坛链接。"
      : "写下顾客问法、现象，或知识库缺少的主题。";

  return (
    <div className="fixed bottom-4 right-4 z-30 flex max-w-[calc(100vw-2rem)] flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open ? (
        <section
          id="global-feedback-panel"
          className="w-[min(380px,calc(100vw-2rem))] rounded-lg border border-zinc-200 bg-white p-4 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
          aria-label="提交反馈"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">提交链接或问题</h2>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">会进入 P0 待办队列。</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
              aria-label="关闭反馈浮窗"
              title="关闭"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form action={formAction} className="mt-4 space-y-3">
            <input type="hidden" name="kind" value={kind} />

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setKind("question_submission")}
                className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
                  kind === "question_submission"
                    ? "border-zinc-950 bg-zinc-100 text-zinc-950 dark:border-zinc-50 dark:bg-zinc-900 dark:text-zinc-50"
                    : "border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
                }`}
                aria-pressed={kind === "question_submission"}
              >
                问题
              </button>
              <button
                type="button"
                onClick={() => setKind("link_submission")}
                className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
                  kind === "link_submission"
                    ? "border-zinc-950 bg-zinc-100 text-zinc-950 dark:border-zinc-50 dark:bg-zinc-900 dark:text-zinc-50"
                    : "border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
                }`}
                aria-pressed={kind === "link_submission"}
              >
                链接
              </button>
            </div>

            <div>
              <label htmlFor="global-feedback-content" className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
                {contentLabel}
              </label>
              <textarea
                id="global-feedback-content"
                name="content"
                required
                minLength={3}
                maxLength={4000}
                rows={4}
                placeholder={placeholder}
                className="mt-2 w-full resize-y rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm leading-6 outline-none transition placeholder:text-zinc-500 focus:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-900"
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-zinc-200 pt-3 dark:border-zinc-800">
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
                {state.message || "提交后会优先进入 P0 队列。"}
              </p>
              <SubmitButton />
            </div>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 shadow-lg transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
        aria-expanded={open}
        aria-controls="global-feedback-panel"
      >
        <MessageSquarePlus className="h-4 w-4" />
        提交反馈
      </button>
    </div>
  );
}
