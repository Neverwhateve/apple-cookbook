import Link from "next/link";
import { Search } from "lucide-react";
import { getPublishedArticles } from "@/lib/cookbook";
import { getTagTopics } from "@/lib/tag-presentation";

export const metadata = {
  title: "症状与功能标签",
  description: "按症状、系统、功能和关键词浏览 Apple Cookbook。"
};

export default function TagsPage() {
  const articles = getPublishedArticles();
  const topics = getTagTopics(articles);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-semibold text-zinc-950 dark:text-zinc-50">按常见问题浏览</h1>
      <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
        我们把相近的关键词合并成少量主题，避免设备名、中英文别名和内部关键词占满页面。只记得现象或屏幕提示时，直接搜索通常更快。
      </p>
      <Link
        href="/#site-search"
        className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-blue-300 dark:hover:border-blue-900 dark:hover:bg-blue-950/30"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
        按症状搜索
      </Link>
      <section className="mt-8" aria-labelledby="topic-tags-title">
        <h2 id="topic-tags-title" className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">常见主题</h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">覆盖当前内容最多的问题类型，已按关联文章数量排序。</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/tags/${encodeURIComponent(topic.slug)}`}
              className="group min-h-28 rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-400 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
            >
              <span className="flex items-start justify-between gap-3 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                {topic.label}
                <span className="shrink-0 font-normal text-zinc-500">{topic.count} 篇</span>
              </span>
              <span className="mt-2 block text-sm leading-5 text-zinc-600 dark:text-zinc-400">{topic.description}</span>
            </Link>
          ))}
        </div>
      </section>
      <p className="mt-8 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
        所有细分关键词仍会参与搜索；已有的标签链接也会继续有效。
      </p>
    </main>
  );
}
