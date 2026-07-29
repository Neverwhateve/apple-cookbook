import Link from "next/link";
import { Search } from "lucide-react";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { getPublishedArticles, getPublishedTags } from "@/lib/cookbook";
import { compareRecentArticles } from "@/lib/recent-sort";
import { getArticlesForTagTopic, getTagTopic, getTagTopics } from "@/lib/tag-presentation";

export function generateStaticParams() {
  const tags = getPublishedTags();
  const topics = getTagTopics(getPublishedArticles());

  return [...new Set([...tags, ...topics.map((topic) => topic.slug)])].map((tag) => ({
    tag
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: tagParam } = await params;
  const tag = decodeURIComponent(tagParam);
  const topic = getTagTopic(tag);

  return {
    title: `${topic?.label ?? tag} 相关问题`,
    description: `查找与 ${topic?.label ?? tag} 有关的 Apple 故障排查文章。`
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: tagParam } = await params;
  const tag = decodeURIComponent(tagParam);
  const publishedArticles = getPublishedArticles();
  const topic = getTagTopic(tag);
  const articles = topic
    ? getArticlesForTagTopic(publishedArticles, topic.slug)
    : publishedArticles.filter((article) => article.tags.includes(tag));

  if (articles.length === 0) {
    notFound();
  }

  const sortedArticles = [...articles].sort(compareRecentArticles);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="text-sm text-zinc-500">
        <Link href="/tags" className="hover:text-zinc-950 dark:hover:text-zinc-50">
          标签
        </Link>
        <span className="mx-2">/</span>
        <span>{tag}</span>
      </nav>
      <h1 className="mt-4 text-3xl font-semibold text-zinc-950 dark:text-zinc-50">{topic?.label ?? tag}</h1>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {topic ? `${topic.description}。` : null} 共 {sortedArticles.length} 篇，按最近更新排列。
        </p>
        <Link
          href="/#site-search"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-blue-300 dark:hover:border-blue-900 dark:hover:bg-blue-950/30"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          改为按症状搜索
        </Link>
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sortedArticles.map((article) => (
          <ArticleCard key={article.route} article={article} />
        ))}
      </div>
    </main>
  );
}
