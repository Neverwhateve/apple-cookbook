import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-semibold text-zinc-950 dark:text-zinc-50">找不到这个页面或条目</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        它可能已重命名、合并、尚未创建，或链接不完整。可以直接按症状搜索，或从分类重新浏览。
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/#site-search"
          className="inline-flex min-h-11 items-center rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 dark:focus-visible:ring-offset-zinc-950"
        >
          按症状搜索
        </Link>
        <Link
          href="/categories"
          className="inline-flex min-h-11 items-center rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900"
        >
          浏览分类
        </Link>
      </div>
    </main>
  );
}
