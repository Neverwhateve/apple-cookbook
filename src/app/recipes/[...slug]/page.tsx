import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowRight, ExternalLink, ListChecks } from "lucide-react";
import { ArticleActions } from "@/components/article-actions";
import { ArticleFeedbackWidget } from "@/components/article-feedback-widget";
import { ArticleCard } from "@/components/article-card";
import { CustomerMomentCard } from "@/components/customer-moment";
import { ArticleQuickStart } from "@/components/article-quick-start";
import { ArticleSymptomMatch } from "@/components/article-symptom-match";
import { SearchResultBackLink } from "@/components/search-result-back-link";
import { SolutionVotePanel } from "@/components/solution-vote-panel";
import { VerificationBadge } from "@/components/verification-badge";
import { formatArticleBody } from "@/lib/article-body";
import type { ArticleSource } from "@/lib/article-schema";
import { buildArticleStructuredData, serializeJsonLd } from "@/lib/article-structured-data";
import {
  getPublishedArticles,
  getPublishedArticleBySlug,
  getRelatedArticles,
  isIndexableArticle
} from "@/lib/cookbook";
import { difficultyLabels, verificationDescriptions } from "@/lib/labels";
import { categoryPresentation } from "@/lib/category-presentation";
import { getCustomerMoment } from "@/lib/customer-moments";
import { getSolutionVoteStorageUnavailableReason } from "@/lib/solution-votes";
import { getArticleTagTopics } from "@/lib/tag-presentation";

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
  // Retain existing shared links that pointed at the formerly generic
  // "排查流程" section while making its trust label explicit in the UI.
  if (text === "零售排查流程（同事实践）") return "排查流程";

  return (
    text
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\p{L}\p{N}-]/gu, "") || "section"
  );
}

function SourceList({ sources, emptyMessage }: { sources: ArticleSource[]; emptyMessage: string }) {
  if (sources.length === 0) {
    return <p className="mt-3 text-sm text-zinc-500">{emptyMessage}</p>;
  }

  return (
    <ul className="mt-3 space-y-3 text-sm">
      {sources.map((source) => (
        <li key={source.id}>
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="group block rounded-xl border border-zinc-200 p-3 transition hover:border-blue-300 hover:bg-blue-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-800 dark:hover:border-blue-800 dark:hover:bg-blue-950/20"
          >
            <span className="flex items-start gap-2 font-medium text-blue-600 group-hover:underline dark:text-blue-400">
              <span>{source.title}</span>
              <ExternalLink aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 flex-none" />
              <span className="sr-only">（在新窗口打开）</span>
            </span>
            <span className="mt-1 block text-xs leading-5 text-zinc-500 dark:text-zinc-400">
              {source.publisher}
              {source.publishedAt ? ` · 发布于 ${source.publishedAt}` : ""}
              {source.accessedAt ? ` · 查阅于 ${source.accessedAt}` : ""}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
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
  return getPublishedArticles().map((article) => ({
    slug: article.route.replace("/recipes/", "").split("/").map(decodeURIComponent)
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const article = getPublishedArticleBySlug(slug);

  if (!article) {
    return {
      title: "未找到文章"
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: article.route
    },
    robots: {
      index: isIndexableArticle(article),
      follow: true
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: article.route,
      modifiedTime: article.lastUpdatedAt
    }
  };
}

export default async function RecipePage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const article = getPublishedArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = getRelatedArticles(article);
  const articleBody = formatArticleBody(article.body);
  const lead = article.summary || getLeadParagraph(article.body) || article.excerpt;
  const headings = getArticleHeadings(articleBody);
  const officialStepsHeading = headings.find((heading) => heading.title === "Apple 官方方案");
  const recommendedSolution = article.solutions.find(
    (solution) => solution.kind === "recommended" && solution.steps.length > 0
  );
  const escalationSteps = article.solutions
    .filter((solution) => solution.kind === "escalation")
    .flatMap((solution) => solution.steps);
  const primaryRelated = related.slice(0, 3);
  const officialSources = article.sources.filter((source) => source.official);
  const communitySources = article.sources.filter((source) => !source.official);
  const primaryOfficialSource = officialSources[0];
  const category = categoryPresentation(article.category);
  const customerMoment = getCustomerMoment(article.tags);
  const structuredData = buildArticleStructuredData(article);
  const voteableSolutions = article.solutions
    .filter((solution) => solution.kind !== "escalation" && solution.steps.length > 0)
    .map(({ id, title, verificationLevel }) => ({ id, title, verificationLevel }));
  const canCollectPracticeFeedback = !getSolutionVoteStorageUnavailableReason() && voteableSolutions.length > 1;

  return (
    <main className="bg-white px-4 py-8 dark:bg-zinc-950 sm:px-6 sm:py-12">
      {structuredData ? (
        <script
          id="article-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
        />
      ) : null}
      <article className="mx-auto max-w-[692px]">
        <div className="mb-10">
          <nav aria-label="文章路径" className="flex flex-wrap items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <Link href="/" className="inline-flex min-h-11 items-center hover:text-zinc-950 dark:hover:text-zinc-50">
              支持
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={`/categories/${encodeURIComponent(article.category)}`}
              className="inline-flex min-h-11 items-center hover:text-zinc-950 dark:hover:text-zinc-50"
            >
              {category.label}
            </Link>
          </nav>
          <SearchResultBackLink />
        </div>

        <h1 className="text-4xl font-semibold leading-tight tracking-normal text-zinc-950 dark:text-zinc-50 sm:text-5xl">
          {article.title}
        </h1>

        <p className="mt-5 text-xl leading-8 text-zinc-700 dark:text-zinc-300">{lead}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <VerificationBadge level={article.verification} />
          <span className="text-sm text-zinc-500 dark:text-zinc-400">{difficultyLabels[article.difficulty]}难度</span>
          {article.estimatedTime ? <span className="text-sm text-zinc-500 dark:text-zinc-400">预计 {article.estimatedTime}</span> : null}
        </div>

        <ArticleSymptomMatch symptoms={article.symptoms} />

        {recommendedSolution ? (
          <ArticleQuickStart
            solution={recommendedSolution}
            detailsHref={officialStepsHeading ? `#${officialStepsHeading.id}` : undefined}
            title={article.title}
            articleSummary={article.summary}
            tags={article.tags}
            symptoms={article.symptoms}
            escalationSteps={escalationSteps}
          />
        ) : null}

        <dl className="mt-8 grid gap-x-8 gap-y-4 border-y border-zinc-200 py-5 text-sm dark:border-zinc-800 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-zinc-500">适用设备</dt>
            <dd className="mt-1 font-medium text-zinc-950 dark:text-zinc-50">{article.device.join(", ")}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">适用系统</dt>
            <dd className="mt-1 font-medium text-zinc-950 dark:text-zinc-50">
              {[...article.platforms, ...article.systemVersions].join(", ") || "请查看正文说明"}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500">最后验证</dt>
            <dd className="mt-1 font-medium text-zinc-950 dark:text-zinc-50">{article.lastVerifiedAt ?? "尚未单独记录"}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">内容更新</dt>
            <dd className="mt-1 font-medium text-zinc-950 dark:text-zinc-50">{article.updated}</dd>
          </div>
        </dl>

        <p className="mt-4 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
          {verificationDescriptions[article.verification]}
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {officialStepsHeading ? (
            <a
              href={`#${officialStepsHeading.id}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:focus-visible:ring-offset-zinc-950"
            >
              <ListChecks aria-hidden="true" className="h-4 w-4" />
              跳到 Apple 官方步骤
            </a>
          ) : null}
          {primaryOfficialSource ? (
            <a
              href={primaryOfficialSource.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
            >
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
              打开 Apple 官方来源
              <span className="sr-only">（在新窗口打开）</span>
            </a>
          ) : null}
          <ArticleActions title={article.title} route={article.route} />
        </div>

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
                  className="inline-flex min-h-11 items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
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
                const trustClass =
                  text === "Apple 官方方案"
                    ? "official-heading"
                    : text === "零售排查流程（同事实践）"
                      ? "retail-heading"
                    : /非官方|社区|分享|补充处理思路/.test(text)
                      ? "community-heading"
                      : undefined;

                return (
                  <h2 id={headingId(text)} className={trustClass}>
                    {children}
                  </h2>
                );
              },
              a: ({ href, children }) => {
                const external = href?.startsWith("http");

                return (
                  <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
                    {children}
                    {external ? <span className="sr-only">（在新窗口打开）</span> : null}
                  </a>
                );
              }
            }}
          >
            {articleBody}
          </ReactMarkdown>
        </div>

        {customerMoment ? <CustomerMomentCard moment={customerMoment} /> : null}

        {canCollectPracticeFeedback ? <SolutionVotePanel articleId={article.id} solutions={voteableSolutions} /> : null}

        <section className="mt-14 border-t border-zinc-200 pt-8 dark:border-zinc-800" aria-labelledby="details-title">
          <h2 id="details-title" className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
            来源与更多信息
          </h2>
          <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-zinc-500">设备</dt>
              <dd className="mt-1 text-zinc-800 dark:text-zinc-200">{article.device.join(", ")}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">来源数量</dt>
              <dd className="mt-1 text-zinc-800 dark:text-zinc-200">{article.sources.length}</dd>
            </div>
          </dl>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">Apple 官方来源</h3>
              <SourceList sources={officialSources} emptyMessage="这篇文章暂未登记 Apple 官方来源。" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">同事分享与其他经验</h3>
              <SourceList sources={communitySources} emptyMessage="这篇文章暂未登记同事分享或其他经验来源。" />
            </div>
          </div>
          <nav className="mt-5 flex flex-wrap gap-2" aria-label="相关主题">
            {getArticleTagTopics(article.tags).slice(0, 4).map((topic) => (
              <Link
                key={topic.slug}
                href={`/tags/${encodeURIComponent(topic.slug)}`}
                className="inline-flex min-h-11 items-center rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700 transition hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                {topic.label}
              </Link>
            ))}
          </nav>
        </section>

        {primaryRelated.length > 0 ? (
          <section className="mt-10 border-t border-zinc-200 pt-8 dark:border-zinc-800" aria-labelledby="next-title">
            <div className="flex items-center justify-between gap-4">
              <h2 id="next-title" className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
                继续排查
              </h2>
              <Link
                href={`/categories/${encodeURIComponent(article.category)}`}
                className="inline-flex min-h-11 items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
              >
                查看 {category.label}
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
