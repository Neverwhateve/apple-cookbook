import Link from "next/link";
import type { Article } from "@/lib/cookbook";
import { VerificationBadge } from "@/components/verification-badge";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={article.route}
      className="block rounded-lg border border-zinc-200 bg-white p-4 transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">{article.title}</span>
        <VerificationBadge level={article.verification} compact />
      </div>
      <p className="mt-2 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">{article.excerpt}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {article.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
