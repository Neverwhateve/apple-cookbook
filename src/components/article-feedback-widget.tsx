"use client";

import { MessageSquarePlus, SendHorizonal, X } from "lucide-react";
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

export function ArticleFeedbackWidget({
  articleTitle,
  articleUrl
}: {
  articleTitle: string;
  articleUrl: string;
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(submitFeedback, initialState);

  return (
    <div className="fixed bottom-4 right-4 z-30 flex max-w-[calc(100vw-2rem)] flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open ? (
        <section
          id="article-feedback-panel"
          className="w-[min(360px,calc(100vw-2rem))] rounded-lg border border-zinc-200 bg-white p-4 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
          aria-label="文章反馈"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">反馈这篇内容</h2>
              <p className="mt-1 truncate text-xs text-zinc-500 dark:text-zinc-400">{articleTitle}</p>
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
            <input type="hidden" name="kind" value="article_feedback" />
            <input type="hidden" name="title" value={`关于《${articleTitle}》的反馈`} />
            <input type="hidden" name="sourceTitle" value={articleTitle} />
            <input type="hidden" name="sourceUrl" value={articleUrl} />

            <div>
              <label htmlFor="article-feedback-description" className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
                问题或想法
              </label>
              <textarea
                id="article-feedback-description"
                name="description"
                required
                minLength={10}
                maxLength={4000}
                rows={4}
                placeholder="哪里不准确、缺了什么步骤，或有什么更好的处理思路。"
                className="mt-2 w-full resize-y rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm leading-6 outline-none transition placeholder:text-zinc-500 focus:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-900"
              />
            </div>

            <div>
              <label htmlFor="article-feedback-contact" className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
                备注
              </label>
              <input
                id="article-feedback-contact"
                name="contact"
                placeholder="可选：姓名、门店，或后续跟进方式"
                className="mt-2 w-full rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none transition placeholder:text-zinc-500 focus:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-900"
              />
              <p className="mt-1.5 text-xs leading-5 text-zinc-500">此项仅保存在私有反馈队列，不会同步到公开 GitHub Issue。</p>
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
                {state.message || "会随当前文章一起进入每日复核。"}
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
        aria-controls="article-feedback-panel"
      >
        <MessageSquarePlus className="h-4 w-4" />
        反馈
      </button>
    </div>
  );
}
