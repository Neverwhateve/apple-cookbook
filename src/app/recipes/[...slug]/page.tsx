import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronDownCircle, ExternalLink, MessageSquarePlus } from "lucide-react";
import { submitQuickFeedback } from "@/app/feedback/actions";
import { ArticleCard } from "@/components/article-card";
import { getAllArticles, getArticleBySlug, getRelatedArticles } from "@/lib/cookbook";
import { difficultyLabels, statusLabels, verificationLabels } from "@/lib/labels";

function headingId(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

function textFromNode(node: unknown): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textFromNode).join("");
  if (node && typeof node === "object" && "props" in node) {
    const props = (node as { props?: { children?: unknown } }).props;
    return textFromNode(props?.children);
  }
  return "";
}

function getSectionLinks(markdown: string) {
  return Array.from(markdown.matchAll(/^##\s+(.+)$/gm))
    .map((match) => {
      const title = match[1].replace(/\s+#*$/, "").trim();
      return { title, id: headingId(title) };
    })
    .filter((section) => section.title && section.id);
}

function getMainContent(markdown: string) {
  const withoutTitle = markdown.replace(/^#\s+.+\n+/, "").trimStart();
  const dividerIndex = withoutTitle.search(/^---$/m);

  if (dividerIndex >= 0) {
    return withoutTitle.slice(dividerIndex).replace(/^---\s*/m, "").trimStart();
  }

  return withoutTitle;
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
  const mainContent = getMainContent(article.body);
  const sections = getSectionLinks(mainContent);

  return (
    <main className="bg-white px-8 pb-16 pt-20 dark:bg-zinc-950 sm:px-10 sm:pb-20 sm:pt-24">
      <article className="mx-auto min-w-0 max-w-[760px]">
        <h1 className="max-w-[680px] text-[2.45rem] font-bold leading-[1.12] tracking-normal text-zinc-950 dark:text-zinc-50 sm:text-5xl">
          {article.title}
        </h1>
        <p className="mt-5 max-w-[680px] text-[1.22rem] leading-[1.5] text-zinc-800 dark:text-zinc-200 sm:text-[1.35rem]">
          {article.excerpt}
        </p>

        {sections.length > 0 ? (
          <nav aria-label="文章目录" className="mt-8 space-y-3">
            {sections.slice(0, 8).map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex w-fit items-center gap-1.5 text-[1.0625rem] leading-6 text-[#06c] hover:underline dark:text-[#7db7ff]"
              >
                <span>{section.title}</span>
                <ChevronDownCircle className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </nav>
        ) : null}

        <div className="article-body mt-14">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: () => null,
              h2: ({ children }) => {
                const text = textFromNode(children);
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
            {mainContent}
          </ReactMarkdown>
        </div>
      </article>

      <div className="mx-auto mt-16 max-w-[760px] border-t border-zinc-200 pt-8 dark:border-zinc-800">
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

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <section>
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

          <section>
            <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">标签</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8">
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

        <form action={submitQuickFeedback} className="mt-8">
          <input type="hidden" name="kind" value="missing_problem" />
          <input type="hidden" name="title" value={`反馈当前条目: ${article.title}`} />
          <input type="hidden" name="question" value={`当前条目需要复核或补充: ${article.title}`} />
          <input type="hidden" name="link" value={article.route} />
          <button
            type="submit"
            className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md bg-zinc-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            <MessageSquarePlus className="h-4 w-4" />
            提交这个问题
          </button>
        </form>

        {related.length > 0 ? (
          <section className="mt-10 border-t border-zinc-200 pt-8 dark:border-zinc-800">
            <h2 className="mb-3 text-base font-semibold text-zinc-950 dark:text-zinc-50">相关文章</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {related.map((item) => (
                <ArticleCard key={item.route} article={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
