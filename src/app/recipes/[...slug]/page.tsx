import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { getAllArticles, getArticleBySlug, getRelatedArticles } from "@/lib/cookbook";
import { difficultyLabels, statusLabels, verificationLabels } from "@/lib/labels";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.route.replace("/recipes/", "").split("/").map(decodeURIComponent)
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "未找到文章"
    };
  }

  return {
    title: `${article.title} | Apple Cookbook`,
    description: article.excerpt
  };
}

export default async function RecipePage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = getRelatedArticles(article);

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,760px)_minmax(280px,1fr)]">
      <article className="min-w-0 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="inline-flex items-center gap-1 hover:text-zinc-950 dark:hover:text-zinc-50">
            <ArrowLeft className="h-4 w-4" />
            搜索
          </Link>
          <span>/</span>
          <Link
            href={`/categories/${encodeURIComponent(article.category)}`}
            className="hover:text-zinc-950 dark:hover:text-zinc-50"
          >
            {article.category}
          </Link>
        </nav>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            {verificationLabels[article.verification]}
          </span>
          <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            {difficultyLabels[article.difficulty]}
          </span>
          <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            {statusLabels[article.status]}
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50 sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 max-w-3xl border-l-4 border-zinc-300 pl-4 text-base leading-7 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
          {article.excerpt}
        </p>

        <div className="article-body mt-10">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: () => null
            }}
          >
            {article.body}
          </ReactMarkdown>
        </div>
      </article>

      <aside className="space-y-6">
        <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">元信息</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-zinc-500">最后更新</dt>
              <dd className="mt-1 text-zinc-800 dark:text-zinc-200">{article.updated}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">设备</dt>
              <dd className="mt-1 text-zinc-800 dark:text-zinc-200">{article.device.join(", ")}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">来源数量</dt>
              <dd className="mt-1 text-zinc-800 dark:text-zinc-200">
                {article.official_sources.length + article.community_sources.length}
              </dd>
            </div>
          </dl>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">标签</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">来源</h2>
          <div className="mt-4 space-y-3 text-sm">
            {article.official_sources.map((source) => (
              <a
                key={source}
                href={source}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2 text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
              >
                <ExternalLink className="mt-0.5 h-3.5 w-3.5 flex-none" />
                <span className="break-all">{source}</span>
              </a>
            ))}
          </div>
        </section>

        {related.length > 0 ? (
          <section>
            <h2 className="mb-3 text-base font-semibold text-zinc-950 dark:text-zinc-50">相关文章</h2>
            <div className="space-y-3">
              {related.map((item) => (
                <ArticleCard key={item.route} article={item} />
              ))}
            </div>
          </section>
        ) : null}
      </aside>
    </main>
  );
}
