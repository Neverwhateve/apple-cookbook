import Link from "next/link";
import { FilePlus2, Inbox, Search } from "lucide-react";
import { FeedbackForm } from "@/components/feedback-form";

export const metadata = {
  title: "提交问题 | Apple Cookbook",
  description: "提交一个问题或链接。"
};

export default async function FeedbackPage({
  searchParams
}: {
  searchParams?: Promise<{ question?: string; link?: string; topic?: string; submitted?: string; error?: string }>;
}) {
  const params = await searchParams;
  const question = params?.question ?? params?.topic ?? "";
  const link = params?.link ?? "";
  const submitted = params?.submitted ?? "";
  const error = params?.error ?? "";

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section className="min-w-0">
        <div className="mb-6">
          <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">每日工作收集</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50 sm:text-5xl">
            提交一个问题。
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            写问题会进入高优先级待办；贴链接会自动整理问题、经验和答案，供后续复核。
          </p>
        </div>

        {submitted || error ? (
          <p
            className={`mb-4 rounded-md border px-3 py-2 text-sm ${
              submitted
                ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300"
                : "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
            }`}
          >
            {submitted ? `已直接提交为 ${submitted}。` : error}
          </p>
        ) : null}

        <FeedbackForm initialQuestion={question} initialLink={link} />
      </section>

      <aside className="space-y-4">
        <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="flex items-center gap-2 text-base font-semibold text-zinc-950 dark:text-zinc-50">
            <Inbox className="h-4 w-4" />
            会记录什么
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            <li>问题会进入 P1 待办。</li>
            <li>链接会生成待复核摘要。</li>
            <li>不再处理现有文章反馈。</li>
          </ul>
        </section>

        <Link
          href="/"
          className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4 text-sm font-medium transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
        >
          <span className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            搜索现有条目
          </span>
          <FilePlus2 className="h-4 w-4 text-zinc-500" />
        </Link>
      </aside>
    </main>
  );
}
