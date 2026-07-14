import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AdminArticleSearch } from "@/components/admin-article-search";
import { canUseAdminSession } from "@/lib/feedback-admin";
import { getAllArticles, getSearchDocuments } from "@/lib/cookbook";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "文章管理",
  robots: { index: false, follow: false }
};

export default async function AdminArticlesPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; feedbackId?: string }>;
}) {
  const cookieStore = await cookies();
  if (!canUseAdminSession(cookieStore.get("apple-cookbook-admin")?.value)) {
    redirect("/admin/feedback");
  }

  const query = await searchParams;
  const articles = getSearchDocuments(getAllArticles());

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <Link href="/admin/feedback" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
          ← 返回 feedback 管理
        </Link>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-950 dark:text-zinc-50">文章管理</h1>
        <p className="mt-2 text-sm text-zinc-500">搜索文章，修改正文文字或删除可选板块。</p>
      </div>
      <AdminArticleSearch
        key={`${query.feedbackId ?? ""}:${query.q ?? ""}`}
        articles={articles}
        initialQuery={query.q ?? ""}
        feedbackId={query.feedbackId ?? ""}
      />
    </main>
  );
}
