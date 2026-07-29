import Link from "next/link";
import type { Article } from "@/lib/cookbook";
import { VerificationBadge } from "@/components/verification-badge";
import { getArticleTagTopics } from "@/lib/tag-presentation";

export function ArticleCard({ article }: { article: Article }) {
  const topics = getArticleTagTopics(article.tags).slice(0, 2);

  return (
    <Link
      href={article.route}
      className="block rounded-lg border border-zinc-200 bg-white p-4 transition hover:border-zinc-400 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600 dark:hover:bg-zinc-900 dark:focus-visible:ring-offset-zinc-950"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">{article.title}</span>
        <VerificationBadge level={article.verification} compact />
      </div>
      <p className="mt-2 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">{article.excerpt}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {(topics.length > 0 ? topics.map((topic) => topic.label) : article.tags.slice(0, 2)).map((tag) => (
          <span key={tag} className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
