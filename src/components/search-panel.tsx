"use client";

import { FilePlus2, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Article } from "@/lib/cookbook";

type SearchArticle = Pick<
  Article,
  "title" | "route" | "category" | "tags" | "aliases" | "excerpt" | "body" | "verification" | "difficulty"
>;

function normalize(value: string) {
  return value.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
}

function scoreArticle(article: SearchArticle, query: string) {
  const q = normalize(query);
  if (!q) return 0;

  const fields = [
    { value: article.title, weight: 18 },
    { value: article.aliases.join(" "), weight: 16 },
    { value: article.tags.join(" "), weight: 9 },
    { value: article.category, weight: 8 },
    { value: article.excerpt, weight: 5 },
    { value: article.body, weight: 3 }
  ];

  const terms = q.split(" ");
  let score = 0;

  for (const field of fields) {
    const value = normalize(field.value);
    if (value.includes(q)) score += field.weight * 4;

    for (const term of terms) {
      if (value.includes(term)) score += field.weight;
    }
  }

  return score;
}

export function SearchPanel({ articles }: { articles: SearchArticle[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) {
      return articles.filter((article) => article.verification !== "Unknown").slice(0, 5);
    }

    return articles
      .map((article) => ({ article, score: scoreArticle(article, query) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((item) => item.article);
  }, [articles, query]);

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-4 shadow-soft dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-3 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900">
        <Search className="h-5 w-5 flex-none text-zinc-500" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search like a customer: My wife's location cannot be seen"
          className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-zinc-500"
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-600 dark:text-zinc-400">
        {["AirDrop keeps waiting", "老婆位置看不到", "verification failed", "Find My not updating"].map(
          (item) => (
            <button
              type="button"
              key={item}
              onClick={() => setQuery(item)}
              className="rounded-full border border-zinc-200 px-3 py-1 transition hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              {item}
            </button>
          )
        )}
      </div>

      <div className="mt-5 space-y-3">
        {results.map((article) => (
          <Link
            key={article.route}
            href={article.route}
            className="block rounded-md border border-zinc-200 p-4 transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">{article.title}</span>
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
                {article.verification}
              </span>
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
                {article.difficulty}
              </span>
            </div>
            <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">{article.excerpt}</p>
          </Link>
        ))}

        {results.length === 0 ? (
          <div className="rounded-md border border-dashed border-zinc-300 p-4 dark:border-zinc-700">
            <div className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Sparkles className="mt-0.5 h-4 w-4 flex-none" />
              <p>No match yet. Submit the symptom so it can be reviewed and added to daily work.</p>
            </div>
            <Link
              href={`/feedback?topic=${encodeURIComponent(query)}`}
              className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-md bg-zinc-950 px-3 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              <FilePlus2 className="h-4 w-4" />
              Submit this problem
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
