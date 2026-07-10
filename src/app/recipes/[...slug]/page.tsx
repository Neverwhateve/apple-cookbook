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
    <main className="bg-white px-4 py-10 dark:bg-zinc-950 sm:px-6 sm:py-14">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,780px)_260px]">
      <article className="min-w-0">
        <nav className="mb-12 flex flex-wrap items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
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

        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-zinc-950 dark:text-zinc-50 sm:text-5xl">
          {article.title}
        </h1>
        <p className="mt-5 max-w-3xl text-xl leading-8 text-zinc-700 dark:text-zinc-300">
          {article.excerpt}
        </p>

        <div className="article-body mt-12">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: () => null,
              a: ({ href, children }) => {
                const external = href?.startsWith("http");

                return (
                  <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
                    {children}
                  </a>
                );
              }
            }}
          >
            {article.body}
          </ReactMarkdown>
        </div>
      </article>

      <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <section className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
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

        <section className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">标签</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">来源</h2>
          <div className="mt-4 space-y-3 text-sm">
            {article.official_sources.map((source, index) => (
              <a
                key={source}
                href={source}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2 text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
              >
                <ExternalLink className="mt-0.5 h-3.5 w-3.5 flex-none" />
                <span>Apple 官方来源 {index + 1}</span>
              </a>
            ))}
          </div>
        </section>

        {related.length > 0 ? (
          <section className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
            <h2 className="mb-3 text-base font-semibold text-zinc-950 dark:text-zinc-50">相关文章</h2>
            <div className="space-y-3">
              {related.map((item) => (
                <ArticleCard key={item.route} article={item} />
              ))}
            </div>
          </section>
        ) : null}
      </aside>
      </div>
    </main>
  );
}
