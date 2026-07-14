"use client";

import { FilePlus2, Search, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { VerificationBadge } from "@/components/verification-badge";
import { difficultyLabels } from "@/lib/labels";
import { searchDocuments, type SearchDocument, type SearchField, type SearchHit } from "@/lib/search";

const quickQueries = ["看不到家人的位置", "Wi-Fi 连不上", "充电到 80% 暂停", "更新后掉电快"];

const fieldLabels: Record<SearchField, string> = {
  title: "标题",
  summary: "摘要",
  symptoms: "症状",
  keywords: "关键词",
  aliases: "常见说法",
  devices: "设备",
  platforms: "系统",
  systemVersions: "系统版本",
  errorMessages: "错误提示",
  officialTerms: "官方术语",
  communityTerms: "社区说法",
  solutionSteps: "解决步骤",
  category: "分类"
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightedText({ text, terms }: { text: string; terms: readonly string[] }) {
  const highlightTerms = Array.from(new Set(terms.map((term) => term.trim()).filter((term) => term.length >= 2)))
    .sort((left, right) => right.length - left.length)
    .slice(0, 12);

  if (!highlightTerms.length) return text;

  const expression = new RegExp(`(${highlightTerms.map(escapeRegExp).join("|")})`, "giu");
  const parts = text.split(expression);

  return parts.map((part, index): ReactNode =>
    highlightTerms.some((term) => term.toLocaleLowerCase("zh-CN") === part.toLocaleLowerCase("zh-CN")) ? (
      <mark key={`${part}-${index}`} className="rounded-sm bg-yellow-200 px-0.5 text-inherit dark:bg-yellow-700/70">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function resultTerms(hit: SearchHit) {
  return Array.from(new Set(hit.matchedFields.flatMap((match) => match.terms)));
}

export function SearchPanel({ articles }: { articles: SearchDocument[] }) {
  const [query, setQuery] = useState("");
  const trimmedQuery = query.trim();

  const results = useMemo(() => {
    if (!trimmedQuery) {
      return [...articles]
        .filter((article) => article.verification !== "Unknown")
        .sort((a, b) => b.updated.localeCompare(a.updated))
        .slice(0, 4)
        .map((document) => ({ document, score: 0, termCoverage: 0, matchedFields: [], snippet: document.summary }));
    }

    return searchDocuments(articles, trimmedQuery, 8);
  }, [articles, trimmedQuery]);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-soft dark:border-zinc-800 dark:bg-zinc-950 sm:p-5">
      <form role="search" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="cookbook-search" className="sr-only">
          搜索 Apple 故障排查文章
        </label>
        <p id="cookbook-search-help" className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
          可以输入口语化症状、中英文功能名、设备、系统版本或完整错误提示。
        </p>
        <div className="flex min-h-12 items-center gap-3 rounded-xl border border-zinc-300 bg-zinc-50 px-3 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900">
          <Search className="h-5 w-5 flex-none text-zinc-500" aria-hidden="true" />
          <input
            id="cookbook-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="例如：为什么看不到家人的位置"
            aria-describedby="cookbook-search-help cookbook-search-status"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent py-3 text-base outline-none placeholder:text-zinc-500 focus-visible:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-200 hover:text-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
              aria-label="清除搜索"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </form>

      <div className="mt-3 flex flex-wrap gap-2" aria-label="热门症状示例">
        {quickQueries.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setQuery(item)}
            className="min-h-9 rounded-full bg-zinc-100 px-3 py-1.5 text-xs text-zinc-700 transition hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            {item}
          </button>
        ))}
      </div>

      <p id="cookbook-search-status" className="mt-5 text-xs font-semibold text-zinc-500 dark:text-zinc-400" role="status" aria-live="polite">
        {trimmedQuery ? (results.length ? `找到 ${results.length} 个匹配结果` : "没有找到匹配结果") : `最近更新 · ${results.length} 篇`}
      </p>

      <div className="mt-3 space-y-3">
        {results.map((hit, index) => {
          const article = hit.document;
          const terms = resultTerms(hit);

          return (
            <div key={article.route}>
              {trimmedQuery && index === 0 ? (
                <p className="mb-2 text-xs font-semibold text-blue-700 dark:text-blue-300">最可能答案</p>
              ) : null}
              {trimmedQuery && index === 1 ? (
                <p className="mb-2 mt-5 text-xs font-semibold text-zinc-500 dark:text-zinc-400">其他匹配</p>
              ) : null}
              <Link
                href={article.route}
                className="block rounded-xl border border-zinc-200 p-4 transition hover:border-zinc-400 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-800 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                    <HighlightedText text={article.title} terms={terms} />
                  </span>
                  <VerificationBadge level={article.verification} compact />
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
                    {difficultyLabels[article.difficulty]}
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  <HighlightedText text={hit.snippet || article.summary} terms={terms} />
                </p>
                {hit.matchedFields.length ? (
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                    命中：{hit.matchedFields.slice(0, 3).map((match) => fieldLabels[match.field]).join("、")}
                  </p>
                ) : null}
              </Link>
            </div>
          );
        })}

        {results.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 p-4 dark:border-zinc-700">
            <div className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Sparkles className="mt-0.5 h-4 w-4 flex-none" />
              <p>试试缩短描述、去掉设备型号，或换用屏幕上显示的完整错误提示。仍找不到时，可以提交这个现象。</p>
            </div>
            <Link
              href={`/feedback?topic=${encodeURIComponent(query)}`}
              className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-md bg-zinc-950 px-3 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              <FilePlus2 className="h-4 w-4" />
              提交这个问题
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
