import Link from "next/link";
import { ArrowRight, Clock, FilePlus2, Folder, Layers3, ShieldCheck, Tags } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { SearchPanel } from "@/components/search-panel";
import { getAllArticles, getAllCategories, getAllTags } from "@/lib/cookbook";

export default function HomePage() {
  const articles = getAllArticles();
  const categories = getAllCategories();
  const tags = getAllTags();
  const recentlyUpdated = [...articles].sort((a, b) => b.updated.localeCompare(a.updated)).slice(0, 4);
  const popular = articles.filter((article) => article.popular).slice(0, 4);

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section className="min-w-0">
        <div className="mb-6">
          <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Retail troubleshooting encyclopedia</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50 sm:text-5xl">
            Search symptoms first. Diagnose faster.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Markdown-first Apple troubleshooting recipes for official guidance, verified workarounds, and practical Retail diagnosis.
          </p>
        </div>

        <SearchPanel articles={articles} />

        <section className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-semibold text-zinc-950 dark:text-zinc-50">
              <Clock className="h-4 w-4" />
              Recently Updated
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {recentlyUpdated.map((article) => (
              <ArticleCard key={article.route} article={article} />
            ))}
          </div>
        </section>
      </section>

      <aside className="space-y-6">
        <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="flex items-center gap-2 text-base font-semibold text-zinc-950 dark:text-zinc-50">
            <FilePlus2 className="h-4 w-4" />
            Missing a problem?
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Submit customer wording, symptoms, and device context. It will be recorded for daily review.
          </p>
          <Link
            href="/feedback"
            className="mt-4 inline-flex min-h-10 items-center justify-center rounded-md bg-zinc-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Submit feedback
          </Link>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="flex items-center gap-2 text-base font-semibold text-zinc-950 dark:text-zinc-50">
            <ShieldCheck className="h-4 w-4" />
            Product Principles
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Official Apple solutions stay clearly separated from unofficial workarounds.</li>
            <li>Articles explain why the issue happens and when to stop troubleshooting.</li>
            <li>Search favors customer wording, aliases, Chinese, and English.</li>
          </ul>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-semibold text-zinc-950 dark:text-zinc-50">
              <Tags className="h-4 w-4" />
              Tags
            </h2>
            <Link href="/tags" className="text-sm text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50">
              View all
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 12).map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-700 transition hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                {tag}
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-semibold text-zinc-950 dark:text-zinc-50">
              <Folder className="h-4 w-4" />
              Categories
            </h2>
            <Link href="/categories" className="text-sm text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50">
              View all
            </Link>
          </div>
          <div className="space-y-2">
            {categories.slice(0, 8).map((category) => (
              <Link
                key={category.name}
                href={`/categories/${encodeURIComponent(category.name)}`}
                className="flex items-center justify-between rounded-md border border-zinc-200 px-3 py-2 text-sm transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
              >
                <span>{category.name}</span>
                <span className="text-zinc-500">{category.items.length}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="flex items-center gap-2 text-base font-semibold text-zinc-950 dark:text-zinc-50">
            <Layers3 className="h-4 w-4" />
            Popular Recipes
          </h2>
          <div className="mt-4 space-y-3">
            {popular.map((article) => (
              <Link key={article.route} href={article.route} className="group block text-sm">
                <span className="font-medium text-zinc-800 group-hover:text-zinc-950 dark:text-zinc-200 dark:group-hover:text-white">
                  {article.title}
                </span>
                <ArrowRight className="ml-1 inline h-3 w-3" />
              </Link>
            ))}
          </div>
        </section>
      </aside>
    </main>
  );
}
