"use client";

import { MessageSquarePlus, SendHorizonal, X } from "lucide-react";
import { useActionState, useCallback, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitFeedback, type FeedbackState } from "@/app/feedback/actions";
import { useFeedbackDialog } from "@/components/use-feedback-dialog";

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
  const [reporterVerified, setReporterVerified] = useState(false);
  const [description, setDescription] = useState("");
  const [reporterName, setReporterName] = useState("");
  const [state, formAction] = useActionState(submitFeedback, initialState);
  const dialogRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeDialog = useCallback(() => setOpen(false), []);

  useFeedbackDialog({
    open,
    onClose: closeDialog,
    dialogRef,
    triggerRef,
    initialFocusSelector: "#article-feedback-description"
  });

  useEffect(() => {
    if (!state.ok) return;
    setDescription("");
    setReporterName("");
    setReporterVerified(false);
  }, [state.id, state.ok]);

  return (
    <div className="fixed bottom-4 right-4 z-30 flex max-w-[calc(100vw-2rem)] flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open ? (
        <section
          id="article-feedback-panel"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-feedback-title"
          aria-describedby="article-feedback-description-label"
          tabIndex={-1}
          className="w-[min(360px,calc(100vw-2rem))] rounded-lg border border-zinc-200 bg-white p-4 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 id="article-feedback-title" className="text-base font-semibold text-zinc-950 dark:text-zinc-50">反馈这篇内容</h2>
              <p className="mt-1 truncate text-xs text-zinc-500 dark:text-zinc-400">{articleTitle}</p>
            </div>
            <button
              type="button"
              onClick={closeDialog}
              className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
              aria-label="关闭反馈浮窗"
              title="关闭"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form action={formAction} className="mt-4 space-y-3">
            <input type="hidden" name="kind" value="article_feedback" />
            <input type="hidden" name="title" value={`内容反馈：《${articleTitle}》`} />
            <input type="hidden" name="sourceTitle" value={articleTitle} />
            <input type="hidden" name="sourceUrl" value={articleUrl} />

            <div>
              <label id="article-feedback-description-label" htmlFor="article-feedback-description" className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
                反馈内容
              </label>
              <textarea
                id="article-feedback-description"
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
                minLength={3}
                maxLength={4000}
                rows={4}
                placeholder="哪里不清楚、不准确、已过期，或遗漏了什么。"
                className="mt-2 w-full resize-y rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm leading-6 outline-none transition placeholder:text-zinc-500 focus:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-900"
              />
            </div>

            <div>
              <label htmlFor="article-feedback-name" className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
                你的名字（可选）
              </label>
              <input
                id="article-feedback-name"
                name="reporterName"
                value={reporterName}
                onChange={(event) => setReporterName(event.target.value)}
                maxLength={80}
                autoComplete="name"
                placeholder="用于后续复核联系"
                className="mt-2 w-full rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none transition placeholder:text-zinc-500 focus:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-900"
              />
              <p className="mt-1.5 text-xs leading-5 text-zinc-500">
                名字只保存在处理记录中，不在公开页面展示。
              </p>
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-md border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900">
              <input
                type="checkbox"
                name="reporterVerified"
                value="true"
                checked={reporterVerified}
                onChange={(event) => setReporterVerified(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-zinc-300"
              />
              <span>
                <span className="block text-sm font-medium text-zinc-950 dark:text-zinc-50">
                  我已在实际场景中复现或验证
                </span>
                <span className="mt-1 block text-xs leading-5 text-zinc-500">
                  帮助复核时判断优先级；不会自动作为 Apple 官方或社区建议公开。
                </span>
              </span>
            </label>

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
                {state.message || "提交后会记录为内容复核请求；原文会保留，方便后续查证。"}
              </p>
              <SubmitButton />
            </div>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        ref={triggerRef}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 shadow-lg transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
        aria-expanded={open}
        aria-controls="article-feedback-panel"
        aria-haspopup="dialog"
      >
        <MessageSquarePlus className="h-4 w-4" />
        反馈内容
      </button>
    </div>
  );
}
