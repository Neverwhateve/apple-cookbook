"use client";

import { MessageSquarePlus, SendHorizonal, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitFeedback, type FeedbackState } from "@/app/feedback/actions";
import { useFeedbackDialog } from "@/components/use-feedback-dialog";
import { isGlobalFeedbackHiddenPath } from "@/lib/feedback-ui";

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
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-zinc-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
    >
      <SendHorizonal className="h-4 w-4" aria-hidden="true" />
      {pending ? "提交中" : "提交"}
    </button>
  );
}

function GlobalFeedbackForm() {
  const [kind, setKind] = useState<"question_submission" | "link_submission">("question_submission");
  const [state, formAction, pending] = useActionState(submitFeedback, initialState);
  const contentLabel = kind === "link_submission" ? "链接" : "问题";
  const placeholder =
    kind === "link_submission"
      ? "粘贴 Apple 支持、社区、新闻或论坛链接。"
      : "写下顾客问法、现象，或知识库缺少的主题。";

  return (
    <form action={formAction} className="mt-4 space-y-3" aria-busy={pending}>
      <input type="hidden" name="kind" value={kind} />

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setKind("question_submission")}
          className={`min-h-11 rounded-md border px-3 py-2 text-sm font-medium transition ${
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
          className={`min-h-11 rounded-md border px-3 py-2 text-sm font-medium transition ${
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
          data-feedback-dialog-initial-focus
          className="mt-2 w-full resize-y rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-base leading-6 transition placeholder:text-zinc-500 focus:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-900"
        />
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
          {state.message || "提交后会优先进入 P0 队列。"}
        </p>
        <SubmitButton />
      </div>
    </form>
  );
}

function GlobalFeedbackWidgetSession() {
  const { closeDialog, dialogRef, handleCancel, handleClose, open, openDialog, sessionKey, triggerRef } =
    useFeedbackDialog();

  return (
    <>
      <dialog
        ref={dialogRef}
        id="global-feedback-panel"
        aria-modal="true"
        aria-labelledby="global-feedback-title"
        aria-describedby="global-feedback-description"
        onCancel={handleCancel}
        onClose={handleClose}
        className="fixed bottom-[calc(1rem_+_env(safe-area-inset-bottom))] left-auto right-[calc(1rem_+_env(safe-area-inset-right))] top-auto m-0 max-h-[calc(100dvh_-_2rem_-_env(safe-area-inset-top)_-_env(safe-area-inset-bottom))] w-[min(380px,calc(100vw_-_2rem))] max-w-none overflow-y-auto overscroll-contain rounded-lg border border-zinc-200 bg-white p-4 shadow-2xl backdrop:bg-zinc-950/30 backdrop:backdrop-blur-[1px] dark:border-zinc-800 dark:bg-zinc-950 dark:backdrop:bg-black/60 sm:bottom-[calc(1.5rem_+_env(safe-area-inset-bottom))] sm:right-[calc(1.5rem_+_env(safe-area-inset-right))]"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="global-feedback-title" className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
              提交链接或问题
            </h2>
            <p id="global-feedback-description" className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              会进入 P0 待办队列。
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

        {open ? <GlobalFeedbackForm key={sessionKey} /> : null}
      </dialog>

      <button
        ref={triggerRef}
        type="button"
        onClick={openDialog}
        className="fixed bottom-[calc(1rem_+_env(safe-area-inset-bottom))] right-[calc(1rem_+_env(safe-area-inset-right))] z-30 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 shadow-lg transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:border-zinc-600 dark:hover:bg-zinc-900 sm:bottom-[calc(1.5rem_+_env(safe-area-inset-bottom))] sm:right-[calc(1.5rem_+_env(safe-area-inset-right))]"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="global-feedback-panel"
      >
        <MessageSquarePlus className="h-4 w-4" aria-hidden="true" />
        提交反馈
      </button>
    </>
  );
}

export function GlobalFeedbackWidget() {
  const pathname = usePathname();

  if (isGlobalFeedbackHiddenPath(pathname)) return null;

  return <GlobalFeedbackWidgetSession key={pathname} />;
}
