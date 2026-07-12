import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowRight, ListChecks } from "lucide-react";
import { ArticleFeedbackWidget } from "@/components/article-feedback-widget";
import { ArticleCard } from "@/components/article-card";
import { getAllArticles, getArticleBySlug, getRelatedArticles } from "@/lib/cookbook";
import { difficultyLabels, statusLabels, verificationLabels } from "@/lib/labels";

function formatArticleBody(body: string) {
  const firstSectionIndex = body.search(/^##\s+症状\s*$/m);
  const content = firstSectionIndex >= 0 ? body.slice(firstSectionIndex) : body;
  const endMatterIndex = content.search(/^##\s+(相关问题|标签|元信息)\s*$/m);
  const articleContent = endMatterIndex >= 0 ? content.slice(0, endMatterIndex).trim() : content;

  return articleContent.replace(/^##\s+零售排查流程\s*$/m, "## 排查流程");
}

function getLeadParagraph(body: string) {
  return body
    .replace(/^# .+$/m, "")
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line && line !== "---" && !line.startsWith("#") && !line.startsWith("-"));
}

function getTextFromChildren(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(getTextFromChildren).join("");
  return "";
}

function headingId(text: string) {
  return encodeURIComponent(text.trim().replace(/\s+/g, "-"));
}

function getArticleHeadings(body: string) {
  return Array.from(body.matchAll(/^##\s+(.+)$/gm)).map((match) => {
    const title = match[1].trim();

    return {
      title,
      id: headingId(title)
    };
  });
}

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
  const articleBody = formatArticleBody(article.body);
  const lead = getLeadParagraph(article.body) ?? article.excerpt;
  const headings = getArticleHeadings(articleBody);
  const primaryRelated = related.slice(0, 3);

  return (
    <main className="bg-white px-4 py-8 dark:bg-zinc-950 sm:px-6 sm:py-12">
      <article className="mx-auto max-w-[692px]">
        <nav className="mb-10 flex flex-wrap items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-950 dark:hover:text-zinc-50">
            支持
          </Link>
          <span>/</span>
          <Link
            href={`/categories/${encodeURIComponent(article.category)}`}
            className="hover:text-zinc-950 dark:hover:text-zinc-50"
          >
            {article.category}
          </Link>
        </nav>

        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {verificationLabels[article.verification]} · {difficultyLabels[article.difficulty]} · {statusLabels[article.status]}
        </p>

        <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-normal text-zinc-950 dark:text-zinc-50 sm:text-5xl">
          {article.title}
        </h1>

        <p className="mt-5 text-xl leading-8 text-zinc-700 dark:text-zinc-300">{lead}</p>

        <dl className="mt-8 grid gap-x-8 gap-y-4 border-y border-zinc-200 py-5 text-sm dark:border-zinc-800 sm:grid-cols-3">
          <div>
            <dt className="text-zinc-500">适用范围</dt>
            <dd className="mt-1 font-medium text-zinc-950 dark:text-zinc-50">{article.device.join(", ")}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">建议路径</dt>
            <dd className="mt-1 font-medium text-zinc-950 dark:text-zinc-50">{difficultyLabels[article.difficulty]}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">最后更新</dt>
            <dd className="mt-1 font-medium text-zinc-950 dark:text-zinc-50">{article.updated}</dd>
          </div>
        </dl>

        {headings.length > 0 ? (
          <nav aria-labelledby="article-jump-title" className="mt-7">
            <h2 id="article-jump-title" className="flex items-center gap-2 text-base font-semibold text-zinc-950 dark:text-zinc-50">
              <ListChecks className="h-4 w-4" />
              快速链接
            </h2>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  {heading.title}
                  <ArrowRight className="h-3 w-3" />
                </a>
              ))}
            </div>
          </nav>
        ) : null}

        <div className="article-body mt-12">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: () => null,
              h2: ({ children }) => {
                const text = getTextFromChildren(children);

                return <h2 id={headingId(text)}>{children}</h2>;
              },
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
            {articleBody}
          </ReactMarkdown>
        </div>

        <section className="mt-14 border-t border-zinc-200 pt-8 dark:border-zinc-800" aria-labelledby="details-title">
          <h2 id="details-title" className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
            更多信息
          </h2>
          <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
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
          <div className="mt-5 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                {tag}
              </span>
            ))}
          </div>
        </section>

        {primaryRelated.length > 0 ? (
          <section className="mt-10 border-t border-zinc-200 pt-8 dark:border-zinc-800" aria-labelledby="next-title">
            <div className="flex items-center justify-between gap-4">
              <h2 id="next-title" className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
                继续排查
              </h2>
              <Link
                href={`/categories/${encodeURIComponent(article.category)}`}
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
              >
                查看 {article.category}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-4 grid gap-3">
              {primaryRelated.map((item) => (
                <ArticleCard key={item.route} article={item} />
              ))}
            </div>
          </section>
        ) : null}
      </article>
      <ArticleFeedbackWidget articleTitle={article.title} articleUrl={article.route} />
    </main>
  );
}
