import Link from "next/link";
import { getAllArticles, getAllTags } from "@/lib/cookbook";

export default function TagsPage() {
  const articles = getAllArticles();
  const tags = getAllTags().map((tag) => ({
    name: tag,
    count: articles.filter((article) => article.tags.includes(tag)).length
  }));

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-semibold text-zinc-950 dark:text-zinc-50">Tags</h1>
      <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Tags connect symptoms, features, systems, accounts, networks, privacy, repair, and accessory issues across categories.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag.name}
            href={`/tags/${encodeURIComponent(tag.name)}`}
            className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
          >
            {tag.name}
            <span className="ml-2 text-zinc-500">{tag.count}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}

