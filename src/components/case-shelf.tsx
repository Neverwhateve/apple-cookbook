"use client";

import Link from "next/link";
import { Bookmark, Clock3, Pin, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getPinnedCases,
  getActiveCases,
  getRecentCases,
  onRetailCasesChange,
  type RetailCaseEntry
} from "@/lib/retail-case-store";

const outcomeLabels = {
  resolved: "已解决",
  follow_up: "需观察",
  service: "转服务／支持"
} as const;

function CaseList({ entries, emptyMessage }: { entries: RetailCaseEntry[]; emptyMessage: string }) {
  if (entries.length === 0) {
    return <p className="text-sm leading-6 text-zinc-500 dark:text-zinc-400">{emptyMessage}</p>;
  }

  return (
    <ul className="space-y-2">
      {entries.slice(0, 3).map((entry) => (
        <li key={entry.route}>
          <Link
            href={entry.route}
            className="block rounded-xl bg-zinc-50 px-3 py-3 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <span className="flex items-start justify-between gap-2">
              <span>{entry.title}</span>
              {entry.outcome ? (
                <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  {outcomeLabels[entry.outcome]}
                </span>
              ) : null}
            </span>
            {entry.note ? <span className="mt-1 line-clamp-2 block text-xs font-normal leading-5 text-zinc-600 dark:text-zinc-400">{entry.note}</span> : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function CaseShelf() {
  const [pinned, setPinned] = useState<RetailCaseEntry[]>([]);
  const [active, setActive] = useState<RetailCaseEntry[]>([]);
  const [recent, setRecent] = useState<RetailCaseEntry[]>([]);

  useEffect(() => {
    const refresh = () => {
      setPinned(getPinnedCases());
      setActive(getActiveCases());
      setRecent(getRecentCases());
    };

    refresh();
    return onRetailCasesChange(refresh);
  }, []);

  return (
    <section aria-labelledby="case-shelf-title" className="border-y border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div>
          <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">你的工作台</p>
          <h2 id="case-shelf-title" className="mt-1 text-3xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50">
            继续处理
          </h2>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 dark:border-amber-900/70 dark:bg-amber-950/20">
            <div className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-amber-700 dark:text-amber-300" aria-hidden="true" />
              <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">交接与跟进</h3>
            </div>
            <div className="mt-4">
              <CaseList entries={active} emptyMessage="标记为“需要观察”或“转服务”的案例会出现在这里，直到明确标为已解决。" />
            </div>
          </div>
          <div className="rounded-2xl bg-zinc-50 p-5 dark:bg-zinc-900">
            <div className="flex items-center gap-2">
              <Pin className="h-4 w-4 text-blue-700 dark:text-blue-300" aria-hidden="true" />
              <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">固定案例</h3>
            </div>
            <div className="mt-4">
              <CaseList entries={pinned} emptyMessage="把高频或正在处理的案例固定在这里。" />
            </div>
          </div>
          <div className="rounded-2xl bg-zinc-50 p-5 dark:bg-zinc-900">
            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-blue-700 dark:text-blue-300" aria-hidden="true" />
              <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">最近打开</h3>
            </div>
            <div className="mt-4">
              <CaseList entries={recent} emptyMessage="打开一个案例后，它会留在这里，方便交接或继续处理。" />
            </div>
          </div>
        </div>
        <p className="mt-4 inline-flex items-center gap-2 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
          <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
          这些记录只保存在当前设备，不包含顾客个人信息。
        </p>
      </div>
    </section>
  );
}
