import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { getAllCategories } from "@/lib/cookbook";

export function generateStaticParams() {
  return getAllCategories().map((category) => ({
    category: category.name
  }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categoryParam } = await params;
  const name = decodeURIComponent(categoryParam);
  const category = getAllCategories().find((item) => item.name === name);

  if (!category) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="text-sm text-zinc-500">
        <Link href="/categories" className="hover:text-zinc-950 dark:hover:text-zinc-50">
          分类
        </Link>
        <span className="mx-2">/</span>
        <span>{category.name}</span>
      </nav>
      <h1 className="mt-4 text-3xl font-semibold text-zinc-950 dark:text-zinc-50">{category.name}</h1>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {category.items.map((article) => (
          <ArticleCard key={article.route} article={article} />
        ))}
      </div>
    </main>
  );
}
