import Link from "next/link";
import { Search } from "lucide-react";
import { getPublishedCategories } from "@/lib/cookbook";
import { categoryPresentation } from "@/lib/category-presentation";

export const metadata = {
  title: "按设备与主题浏览",
  description: "按设备、服务和故障主题浏览 Apple Cookbook 排查文章。"
};

export default function CategoriesPage() {
  const categories = getPublishedCategories();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-semibold text-zinc-950 dark:text-zinc-50">按设备或问题类型浏览</h1>
      <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
        按设备、账号和常用功能浏览。只记得现象、错误提示或功能名称时，直接搜索通常更快。
      </p>
      <Link
        href="/#site-search"
        className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-blue-300 dark:hover:border-blue-900 dark:hover:bg-blue-950/30"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
        按症状搜索
      </Link>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const presentation = categoryPresentation(category.name);

          return (
            <Link
              key={category.name}
              href={`/categories/${encodeURIComponent(category.name)}`}
              className="rounded-lg border border-zinc-200 bg-white p-4 transition hover:border-zinc-400 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
            >
              <div className="text-base font-semibold text-zinc-950 dark:text-zinc-50">{presentation.label}</div>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{presentation.description}</p>
              <div className="mt-3 text-sm text-zinc-500">{category.items.length} 篇文章</div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
