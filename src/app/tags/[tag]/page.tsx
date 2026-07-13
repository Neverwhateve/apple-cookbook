import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { getPublishedArticles, getPublishedTags } from "@/lib/cookbook";

export function generateStaticParams() {
  return getPublishedTags().map((tag) => ({
    tag
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: tagParam } = await params;
  const tag = decodeURIComponent(tagParam);

  return {
    title: `${tag} 相关问题`,
    description: `查找与 ${tag} 有关的 Apple 故障排查文章。`
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: tagParam } = await params;
  const tag = decodeURIComponent(tagParam);
  const articles = getPublishedArticles().filter((article) => article.tags.includes(tag));

  if (articles.length === 0) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="text-sm text-zinc-500">
        <Link href="/tags" className="hover:text-zinc-950 dark:hover:text-zinc-50">
          标签
        </Link>
        <span className="mx-2">/</span>
        <span>{tag}</span>
      </nav>
      <h1 className="mt-4 text-3xl font-semibold text-zinc-950 dark:text-zinc-50">{tag}</h1>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.route} article={article} />
        ))}
      </div>
    </main>
  );
}
