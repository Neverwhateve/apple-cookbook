"use client";

import Link from "next/link";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <p className="text-sm font-medium text-red-600 dark:text-red-400">页面暂时无法加载</p>
      <h1 className="mt-3 text-3xl font-semibold text-zinc-950 dark:text-zinc-50">请重试，或返回搜索其他方案</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        内容文件或服务可能暂时不可用。重试不会修改你的反馈或知识库内容。
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 items-center rounded-full bg-zinc-950 px-5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          重新加载
        </button>
        <Link
          href="/#site-search"
          className="inline-flex min-h-11 items-center rounded-full border border-zinc-200 px-5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900"
        >
          返回搜索
        </Link>
      </div>
    </main>
  );
}
