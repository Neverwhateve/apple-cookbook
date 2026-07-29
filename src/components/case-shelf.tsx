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
    return <p className="text-xs leading-5 text-zinc-500 dark:text-zinc-400">{emptyMessage}</p>;
  }

  return (
    <ul className="space-y-1.5">
      {entries.slice(0, 3).map((entry) => (
        <li key={entry.route}>
          <Link
            href={entry.route}
            className="block rounded-xl bg-[#f5f5f7] px-3 py-3 text-sm font-medium text-zinc-800 transition hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
          >
            <span className="flex items-start justify-between gap-2">
              <span>{entry.title}</span>
              {entry.outcome ? (
                <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
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
    <section aria-labelledby="case-shelf-title" className="mx-auto max-w-6xl px-3 py-3 sm:px-6">
      <div className="rounded-[24px] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.035)] dark:bg-zinc-900 sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">你的工作台</p>
            <h2 id="case-shelf-title" className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">继续处理</h2>
          </div>
          <p className="inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400"><Bookmark className="h-3.5 w-3.5" aria-hidden="true" />仅保存在当前设备</p>
        </div>
        <div className="mt-5 grid gap-3 lg:grid-cols-[1.25fr_1fr_1fr]">
          <div className="rounded-2xl bg-[#fff8ec] p-4 dark:bg-amber-950/20">
            <div className="flex items-center gap-2"><span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200"><Wrench className="h-4 w-4" aria-hidden="true" /></span><h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">交接与跟进</h3></div>
            <div className="mt-3"><CaseList entries={active} emptyMessage="标记为“需要观察”或“转服务”的案例会留在这里。" /></div>
          </div>
          <div className="rounded-2xl bg-[#f5f5f7] p-4 dark:bg-zinc-800">
            <div className="flex items-center gap-2"><span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white text-blue-700 dark:bg-zinc-900 dark:text-blue-300"><Pin className="h-4 w-4" aria-hidden="true" /></span><h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">固定案例</h3></div>
            <div className="mt-3"><CaseList entries={pinned} emptyMessage="把高频或正在处理的案例固定在这里。" /></div>
          </div>
          <div className="rounded-2xl bg-[#f5f5f7] p-4 dark:bg-zinc-800">
            <div className="flex items-center gap-2"><span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white text-blue-700 dark:bg-zinc-900 dark:text-blue-300"><Clock3 className="h-4 w-4" aria-hidden="true" /></span><h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">最近打开</h3></div>
            <div className="mt-3"><CaseList entries={recent} emptyMessage="打开一个案例后，它会留在这里，方便继续处理。" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
