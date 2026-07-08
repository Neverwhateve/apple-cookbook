import Link from "next/link";
import { getAllCategories } from "@/lib/cookbook";

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-semibold text-zinc-950 dark:text-zinc-50">分类</h1>
      <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
        按设备、服务和零售场景组织问题。每篇文章仍以 Markdown 文件保存在对应知识库目录中。
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/categories/${encodeURIComponent(category.name)}`}
            className="rounded-lg border border-zinc-200 bg-white p-4 transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
          >
            <div className="text-base font-semibold text-zinc-950 dark:text-zinc-50">{category.name}</div>
            <div className="mt-2 text-sm text-zinc-500">{category.items.length} 篇文章</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
