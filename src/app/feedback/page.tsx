import Link from "next/link";
import { ClipboardList, FilePlus2, Inbox, Search } from "lucide-react";
import { FeedbackForm } from "@/components/feedback-form";

export const metadata = {
  title: "提交问题或来源",
  description: "向 Apple Cookbook 提交尚未收录的问题、真实症状或参考来源。",
  robots: {
    index: false,
    follow: true
  }
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
            提交链接或问题。
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            不需要整理格式。发一个链接或一句问题，先进入待办，我之后负责分析、查证和整理成知识库条目。
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
            <li>链接或问题原文。</li>
            <li>一项每日待办事项。</li>
            <li>后续分析整理所需的来源线索。</li>
          </ul>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="flex items-center gap-2 text-base font-semibold text-zinc-950 dark:text-zinc-50">
            <ClipboardList className="h-4 w-4" />
            复核路径
          </h2>
          <ol className="mt-4 space-y-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            <li>先判断链接或问题属于哪个场景。</li>
            <li>查证来源并和现有条目去重。</li>
            <li>整理成新增条目或文章更新。</li>
          </ol>
        </section>

        <Link
          href="/#site-search"
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
