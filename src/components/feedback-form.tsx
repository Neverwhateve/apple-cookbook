"use client";

import { SendHorizonal } from "lucide-react";
import { useActionState, useEffect, useId, useState } from "react";
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

export function FeedbackForm({ initialTitle = "" }: { initialTitle?: string }) {
  const contentId = useId();
  const [kind, setKind] = useState<"link_submission" | "question_submission">("question_submission");
  // A no-results search passes its original wording as initialTitle. Keep that
  // wording in the visible field too, so the "submit this problem" path does
  // not make someone type their query a second time.
  const [content, setContent] = useState(() => initialTitle.slice(0, 4000));
  const [state, formAction] = useActionState(submitFeedback, initialState);
  const contentLabel = kind === "link_submission" ? "链接" : "问题";
  const placeholder =
    kind === "link_submission"
      ? "粘贴 Apple 支持、社区讨论、新闻、论坛或其他参考链接。"
      : "写下遇到的问题、顾客问法，或你觉得知识库缺少的主题。";

  useEffect(() => {
    if (state.ok) setContent("");
  }, [state.id, state.ok]);

  return (
    <form action={formAction} className="space-y-5 rounded-lg border border-zinc-200 bg-white p-5 shadow-soft dark:border-zinc-800 dark:bg-zinc-950">
      <input type="hidden" name="kind" value={kind} />
      {initialTitle ? <input type="hidden" name="title" value={initialTitle} /> : null}
      <div>
        <p className="text-sm font-medium text-zinc-950 dark:text-zinc-50">提交类型</p>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setKind("question_submission")}
            className={`rounded-md border p-4 text-left transition ${
              kind === "question_submission"
                ? "border-zinc-950 bg-zinc-100 dark:border-zinc-50 dark:bg-zinc-900"
                : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
            }`}
            aria-pressed={kind === "question_submission"}
          >
            <span className="block text-sm font-semibold text-zinc-950 dark:text-zinc-50">问题</span>
            <span className="mt-1 block text-sm leading-5 text-zinc-600 dark:text-zinc-400">一句话也可以，后续会查证并整理。</span>
          </button>
          <button
            type="button"
            onClick={() => setKind("link_submission")}
            className={`rounded-md border p-4 text-left transition ${
              kind === "link_submission"
                ? "border-zinc-950 bg-zinc-100 dark:border-zinc-50 dark:bg-zinc-900"
                : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
            }`}
            aria-pressed={kind === "link_submission"}
          >
            <span className="block text-sm font-semibold text-zinc-950 dark:text-zinc-50">链接</span>
            <span className="mt-1 block text-sm leading-5 text-zinc-600 dark:text-zinc-400">发来源链接，后续会查证并整理。</span>
          </button>
        </div>
      </div>

      <div>
        <label htmlFor={contentId} className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
          {contentLabel}
        </label>
        {initialTitle && kind === "question_submission" ? (
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            已带入未找到的搜索内容；可以直接提交，或补充设备、系统版本和屏幕提示。
          </p>
        ) : null}
        <textarea
          id={contentId}
          name="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          required
          minLength={3}
          maxLength={4000}
          rows={kind === "link_submission" ? 3 : 5}
          placeholder={placeholder}
          className="mt-2 w-full resize-y rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm leading-6 outline-none transition placeholder:text-zinc-500 focus:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-900"
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
          {state.message || "提交后会进入内容复核队列；原文会保留，方便后续查证。"}
        </p>
        <SubmitButton />
      </div>
    </form>
  );
}
