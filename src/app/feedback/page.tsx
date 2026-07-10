import Link from "next/link";
import { ClipboardList, FilePlus2, Inbox, Search } from "lucide-react";
import { FeedbackForm } from "@/components/feedback-form";

export const metadata = {
  title: "提交反馈 | Apple Cookbook",
  description: "提交缺失的 Apple 故障排查主题或文章反馈。"
};

export default async function FeedbackPage({
  searchParams
}: {
  searchParams?: Promise<{ topic?: string }>;
}) {
  const topic = (await searchParams)?.topic ?? "";

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section className="min-w-0">
        <div className="mb-6">
          <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">每日工作收集</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50 sm:text-5xl">
            提交缺失问题或条目更新。
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            发送顾客原话、现象和背景信息，方便后续复核、去重，并整理成知识库条目。
          </p>
        </div>

        <FeedbackForm initialTitle={topic} />
      </section>

      <aside className="space-y-4">
        <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="flex items-center gap-2 text-base font-semibold text-zinc-950 dark:text-zinc-50">
            <Inbox className="h-4 w-4" />
            会记录什么
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            <li>一条结构化反馈记录，供后续自动化处理。</li>
            <li>一项每日待复核工作清单。</li>
            <li>可用于优化搜索别名的顾客原话。</li>
          </ul>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="flex items-center gap-2 text-base font-semibold text-zinc-950 dark:text-zinc-50">
            <ClipboardList className="h-4 w-4" />
            复核路径
          </h2>
          <ol className="mt-4 space-y-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            <li>先确认现有条目是否已经覆盖。</li>
            <li>优先查证 Apple 官方来源。</li>
            <li>在知识库中新增或更新 Markdown 条目。</li>
          </ol>
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
