"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function SearchResultBackLink() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery(new URLSearchParams(window.location.search).get("q")?.trim() ?? "");
  }, []);

  if (!query) return null;

  const visibleQuery = query.length > 48 ? `${query.slice(0, 48)}…` : query;

  return (
    <Link
      href={`/?q=${encodeURIComponent(query)}#site-search`}
      className="mt-4 inline-flex min-h-11 items-center rounded-full border border-zinc-200 px-4 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-800 dark:text-blue-300 dark:hover:border-blue-900 dark:hover:bg-blue-950/30"
    >
      返回“{visibleQuery}”的搜索结果
    </Link>
  );
}
