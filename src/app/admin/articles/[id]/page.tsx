import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { AdminArticleEditor } from "@/components/admin-article-editor";
import { readAdminArticleSource } from "@/lib/admin-article-edits";
import { getArticleById } from "@/lib/cookbook";
import { canUseAdminSession } from "@/lib/feedback-admin";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "编辑文章",
  robots: { index: false, follow: false }
};

export default async function AdminArticleEditorPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ feedbackId?: string; submitted?: string; dispatch?: string; error?: string }>;
}) {
  const cookieStore = await cookies();
  if (!canUseAdminSession(cookieStore.get("apple-cookbook-admin")?.value)) {
    redirect("/admin/feedback");
  }

  const [{ id }, query] = await Promise.all([params, searchParams]);
  const article = getArticleById(id);
  if (!article) notFound();

  const source = await readAdminArticleSource(article);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/admin/articles" className="text-blue-600 hover:underline dark:text-blue-400">
            ← 返回文章搜索
          </Link>
          <Link href={article.route} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">
            打开当前读者页 ↗
          </Link>
        </div>
        <p className="mt-4 text-sm font-semibold text-zinc-500">Admin · {article.category}</p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-950 dark:text-zinc-50">编辑：{article.title}</h1>
        <p className="mt-2 font-mono text-xs text-zinc-500">{article.filePath}</p>
      </div>

      {query.submitted ? (
        <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100">
          编辑任务 {query.submitted} 已保存。{query.dispatch === "dispatched" ? "发布流程已立即启动。" : "定时发布流程会继续处理。"}
        </div>
      ) : null}

      {query.error ? (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900 dark:border-red-900 dark:bg-red-950/30 dark:text-red-100">
          {query.error}
        </div>
      ) : null}

      <AdminArticleEditor
        articleId={article.id}
        schemaVersion={article.schemaVersion}
        initialTitle={article.title}
        initialSummary={article.summary}
        initialBody={source.body}
        expectedHash={source.contentHash}
        feedbackId={query.feedbackId ?? ""}
      />
    </main>
  );
}
