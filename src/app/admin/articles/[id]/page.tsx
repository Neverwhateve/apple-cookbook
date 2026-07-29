import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { AdminArticleEditor } from "@/components/admin-article-editor";
import { readAdminArticleSource } from "@/lib/admin-article-edits";
import { getArticleById } from "@/lib/cookbook";
import { canUseAdminSession } from "@/lib/feedback-admin";
import { statusLabels, verificationLabels } from "@/lib/labels";

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
  const officialSourceCount = article.sources.filter((item) => item.official).length;
  const communitySourceCount = article.sources.length - officialSourceCount;

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

      <section
        className="mb-6 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
        aria-labelledby="article-maintenance-details-title"
      >
        <h2 id="article-maintenance-details-title" className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
          维护概览
        </h2>
        <dl className="mt-3 grid gap-x-6 gap-y-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">发布状态</dt>
            <dd className="mt-1 font-medium text-zinc-950 dark:text-zinc-50">{statusLabels[article.status]}</dd>
          </div>
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">主方案可信度</dt>
            <dd className="mt-1 font-medium text-zinc-950 dark:text-zinc-50">{verificationLabels[article.verification]}</dd>
          </div>
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">最后验证</dt>
            <dd className="mt-1 font-medium text-zinc-950 dark:text-zinc-50">{article.lastVerifiedAt ?? "尚未单独记录"}</dd>
          </div>
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">内容更新</dt>
            <dd className="mt-1 font-medium text-zinc-950 dark:text-zinc-50">{article.updated}</dd>
          </div>
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">Apple 官方来源</dt>
            <dd className="mt-1 font-medium text-zinc-950 dark:text-zinc-50">{officialSourceCount} 条</dd>
          </div>
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">社区与其他来源</dt>
            <dd className="mt-1 font-medium text-zinc-950 dark:text-zinc-50">{communitySourceCount} 条</dd>
          </div>
        </dl>
      </section>

      {article.status === "seed" ? (
        <aside
          aria-labelledby="seed-review-title"
          className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100"
        >
          <h2 id="seed-review-title" className="flex items-center gap-2 text-base font-semibold">
            <ShieldAlert className="h-4 w-4" aria-hidden="true" />
            待进一步复核
          </h2>
          <p className="mt-2 text-sm leading-6 text-amber-900 dark:text-amber-200">
            此提示仅管理员可见。该条目的步骤和结论仍可能调整；请人工核对来源、适用版本与风险提示，或等待 Codex 完成复核后再作为已复核内容处理。
          </p>
        </aside>
      ) : null}

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
