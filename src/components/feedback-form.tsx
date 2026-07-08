"use client";

import { SendHorizonal } from "lucide-react";
import { useActionState } from "react";
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
  const [state, formAction] = useActionState(submitFeedback, initialState);

  return (
    <form action={formAction} className="space-y-5 rounded-lg border border-zinc-200 bg-white p-5 shadow-soft dark:border-zinc-800 dark:bg-zinc-950">
      <div>
        <label htmlFor="kind" className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
          类型
        </label>
        <select
          id="kind"
          name="kind"
          className="mt-2 w-full rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none transition focus:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-900"
          defaultValue="missing_problem"
        >
          <option value="missing_problem">需要新增故障排查条目</option>
          <option value="article_feedback">反馈现有条目</option>
          <option value="workflow_request">零售流程或升级处理请求</option>
        </select>
      </div>

      <div>
        <label htmlFor="title" className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
          简短标题
        </label>
        <input
          id="title"
          name="title"
          required
          minLength={3}
          defaultValue={initialTitle}
          placeholder="例如：Apple Watch 无法解锁 Mac"
          className="mt-2 w-full rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none transition placeholder:text-zinc-500 focus:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-900"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="customerWords" className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
            顾客原话
          </label>
          <input
            id="customerWords"
            name="customerWords"
            placeholder="例如：我的 Mac 解锁不了"
            className="mt-2 w-full rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none transition placeholder:text-zinc-500 focus:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-900"
          />
        </div>

        <div>
          <label htmlFor="device" className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
            设备或服务
          </label>
          <input
            id="device"
            name="device"
            placeholder="iPhone, Mac, iCloud, AirPods"
            className="mt-2 w-full rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none transition placeholder:text-zinc-500 focus:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-900"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
            详细情况
        </label>
        <textarea
          id="description"
          name="description"
          required
          minLength={10}
          rows={6}
          placeholder="发生了什么、顾客期望什么、已经尝试过哪些步骤，以及看到的完整报错信息。"
          className="mt-2 w-full resize-y rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm leading-6 outline-none transition placeholder:text-zinc-500 focus:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-900"
        />
      </div>

      <div>
        <label htmlFor="contact" className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
          可选联系方式或备注
        </label>
        <input
          id="contact"
          name="contact"
          placeholder="姓名、门店，或后续跟进方式"
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
          {state.message || "提交内容会记录到每日复核清单。"}
        </p>
        <SubmitButton />
      </div>
    </form>
  );
}
