"use client";

import Link from "next/link";
import { FilePenLine, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { searchDocuments, type SearchDocument } from "@/lib/search";

const statusLabels: Record<SearchDocument["status"], string> = {
  seed: "待复核",
  draft: "草稿",
  reviewed: "已审核",
  canonical: "正式",
  archived: "归档"
};

export function AdminArticleSearch({
  articles,
  initialQuery = "",
  feedbackId = ""
}: {
  articles: SearchDocument[];
  initialQuery?: string;
  feedbackId?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const trimmedQuery = query.trim();
  const results = useMemo(() => {
    if (trimmedQuery) return searchDocuments(articles, trimmedQuery, 20).map((hit) => hit.document);

    return [...articles].sort((left, right) => right.updated.localeCompare(left.updated)).slice(0, 10);
  }, [articles, trimmedQuery]);

  return (
    <section id="article-search" className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-start gap-3">
        <FilePenLine className="mt-0.5 h-5 w-5 flex-none text-zinc-500" aria-hidden="true" />
        <div>
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">搜索并修改文章</h2>
          <p className="mt-1 text-sm leading-6 text-zinc-500">
            可搜索全部正式文章、待复核条目和草稿。修改会经过内容校验，再自动合并发布。
          </p>
        </div>
      </div>

      {feedbackId ? (
        <p className="mt-3 rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-800 dark:bg-blue-950/30 dark:text-blue-200">
          正在处理反馈 {feedbackId}；从下方进入文章并提交修改后，该反馈会标记为已解决。
        </p>
      ) : null}

      <label htmlFor="admin-article-query" className="sr-only">
        搜索文章
      </label>
      <div className="mt-4 flex min-h-11 items-center gap-2 rounded-md border border-zinc-300 bg-zinc-50 px-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900">
        <Search className="h-4 w-4 flex-none text-zinc-500" aria-hidden="true" />
        <input
          id="admin-article-query"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="输入标题、症状、设备、错误提示或顾客说法"
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none"
        />
      </div>

      <p className="mt-3 text-xs font-medium text-zinc-500" role="status" aria-live="polite">
        {trimmedQuery ? `找到 ${results.length} 篇文章` : `最近更新 · ${results.length} 篇`}
      </p>

      <div className="mt-3 grid gap-2 md:grid-cols-2">
        {results.map((article) => {
          const queryString = feedbackId ? `?feedbackId=${encodeURIComponent(feedbackId)}` : "";

          return (
            <Link
              key={article.id}
              href={`/admin/articles/${encodeURIComponent(article.id)}${queryString}`}
              className="rounded-md border border-zinc-200 p-3 transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">{article.title}</span>
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  {statusLabels[article.status]}
                </span>
              </div>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-500">{article.summary || "暂无摘要"}</p>
              <p className="mt-2 text-[11px] text-zinc-400">
                {article.category} · 更新于 {article.updated}
              </p>
            </Link>
          );
        })}
      </div>

      {results.length === 0 ? (
        <p className="mt-4 rounded-md border border-dashed border-zinc-300 p-4 text-center text-sm text-zinc-500 dark:border-zinc-700">
          没有匹配文章，请尝试缩短关键词。
        </p>
      ) : null}
    </section>
  );
}
