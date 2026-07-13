"use client";

import { MessageSquarePlus, SendHorizonal, X } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitFeedback, type FeedbackState } from "@/app/feedback/actions";
import { useFeedbackDialog } from "@/components/use-feedback-dialog";

const initialState: FeedbackState = {
  ok: false,
  message: ""
};

interface ArticleFeedbackWidgetProps {
  articleTitle: string;
  articleUrl: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-zinc-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
    >
      <SendHorizonal className="h-4 w-4" aria-hidden="true" />
      {pending ? "提交中" : "提交"}
    </button>
  );
}

function ArticleFeedbackForm({ articleTitle, articleUrl }: ArticleFeedbackWidgetProps) {
  const [state, formAction, pending] = useActionState(submitFeedback, initialState);

  return (
    <form action={formAction} className="mt-4 space-y-3" aria-busy={pending}>
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
          data-feedback-dialog-initial-focus
          className="mt-2 w-full resize-y rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-base leading-6 transition placeholder:text-zinc-500 focus:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-900"
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
          className="mt-2 w-full rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-base transition placeholder:text-zinc-500 focus:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-900"
        />
        <p className="mt-1.5 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
          此项仅保存在私有反馈队列，不会同步到公开 GitHub Issue。
        </p>
      </div>

      <div className="flex flex-col gap-3 border-t border-zinc-200 pt-3 dark:border-zinc-800">
        <p
          role="status"
          aria-atomic="true"
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
  );
}

function ArticleFeedbackWidgetSession({ articleTitle, articleUrl }: ArticleFeedbackWidgetProps) {
  const { closeDialog, dialogRef, handleCancel, handleClose, open, openDialog, sessionKey, triggerRef } =
    useFeedbackDialog();

  return (
    <>
      <dialog
        ref={dialogRef}
        id="article-feedback-panel"
        aria-modal="true"
        aria-labelledby="article-feedback-title"
        aria-describedby="article-feedback-context"
        onCancel={handleCancel}
        onClose={handleClose}
        className="fixed bottom-[calc(1rem_+_env(safe-area-inset-bottom))] left-auto right-[calc(1rem_+_env(safe-area-inset-right))] top-auto m-0 max-h-[calc(100dvh_-_2rem_-_env(safe-area-inset-top)_-_env(safe-area-inset-bottom))] w-[min(360px,calc(100vw_-_2rem))] max-w-none overflow-y-auto overscroll-contain rounded-lg border border-zinc-200 bg-white p-4 shadow-2xl backdrop:bg-zinc-950/30 backdrop:backdrop-blur-[1px] dark:border-zinc-800 dark:bg-zinc-950 dark:backdrop:bg-black/60 sm:bottom-[calc(1.5rem_+_env(safe-area-inset-bottom))] sm:right-[calc(1.5rem_+_env(safe-area-inset-right))]"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 id="article-feedback-title" className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
              反馈这篇内容
            </h2>
            <p id="article-feedback-context" className="mt-1 truncate text-xs text-zinc-500 dark:text-zinc-400">
              {articleTitle}
            </p>
          </div>
          <button
            type="button"
            onClick={closeDialog}
            className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
            aria-label="关闭反馈浮窗"
            title="关闭"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {open ? <ArticleFeedbackForm key={sessionKey} articleTitle={articleTitle} articleUrl={articleUrl} /> : null}
      </dialog>

      <button
        ref={triggerRef}
        type="button"
        onClick={openDialog}
        className="fixed bottom-[calc(1rem_+_env(safe-area-inset-bottom))] right-[calc(1rem_+_env(safe-area-inset-right))] z-30 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 shadow-lg transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:border-zinc-600 dark:hover:bg-zinc-900 sm:bottom-[calc(1.5rem_+_env(safe-area-inset-bottom))] sm:right-[calc(1.5rem_+_env(safe-area-inset-right))]"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="article-feedback-panel"
      >
        <MessageSquarePlus className="h-4 w-4" aria-hidden="true" />
        反馈
      </button>
    </>
  );
}

export function ArticleFeedbackWidget({ articleTitle, articleUrl }: ArticleFeedbackWidgetProps) {
  return <ArticleFeedbackWidgetSession key={articleUrl} articleTitle={articleTitle} articleUrl={articleUrl} />;
}
