import Link from "next/link";
import { Search } from "lucide-react";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { getPublishedCategories } from "@/lib/cookbook";
import { categoryPresentation } from "@/lib/category-presentation";
import { compareRecentArticles } from "@/lib/recent-sort";

export function generateStaticParams() {
  return getPublishedCategories().map((category) => ({
    category: category.name
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const name = decodeURIComponent(category);
  const presentation = categoryPresentation(name);

  return {
    title: `${presentation.label} 故障排查`,
    description: `浏览 ${presentation.label} 相关的 Apple 故障症状、官方步骤与已标注的社区经验。`
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categoryParam } = await params;
  const name = decodeURIComponent(categoryParam);
  const category = getPublishedCategories().find((item) => item.name === name);

  if (!category) {
    notFound();
  }

  const presentation = categoryPresentation(category.name);
  const articles = [...category.items].sort(compareRecentArticles);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="text-sm text-zinc-500">
        <Link href="/categories" className="hover:text-zinc-950 dark:hover:text-zinc-50">
          分类
        </Link>
        <span className="mx-2">/</span>
        <span>{presentation.label}</span>
      </nav>
      <h1 className="mt-4 text-3xl font-semibold text-zinc-950 dark:text-zinc-50">{presentation.label}</h1>
      <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">{presentation.description}</p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">共 {articles.length} 篇，按最近更新排列。</p>
        <Link
          href="/#site-search"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-blue-300 dark:hover:border-blue-900 dark:hover:bg-blue-950/30"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          改为按症状搜索
        </Link>
      </div>
      {articles.length > 0 ? (
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.route} article={article} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-6 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
          这个分类的文章正在整理中。
        </div>
      )}
    </main>
  );
}
