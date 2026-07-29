import Link from "next/link";
import type { Article } from "@/lib/cookbook";
import { VerificationBadge } from "@/components/verification-badge";
import { getArticleTagTopics } from "@/lib/tag-presentation";

export function ArticleCard({ article }: { article: Article }) {
  const topics = getArticleTagTopics(article.tags).slice(0, 2);

  return (
    <Link
      href={article.route}
      className="block rounded-2xl bg-[#f5f5f7] p-4 transition hover:-translate-y-0.5 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-zinc-800 dark:hover:bg-zinc-700"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">{article.title}</span>
        <VerificationBadge level={article.verification} compact />
      </div>
      <p className="mt-2 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">{article.excerpt}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {(topics.length > 0 ? topics.map((topic) => topic.label) : article.tags.slice(0, 2)).map((tag) => (
          <span key={tag} className="rounded-full bg-white px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
