"use client";

import Link from "next/link";
import { Eye, LockKeyhole, Send, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { submitAdminArticleEdit } from "@/app/admin/articles/actions";
import {
  formatPublicArticleBody,
  getEditableArticleSections,
  removeEditableArticleSection
} from "@/lib/article-content";

function SubmitButton({ resolvesFeedback }: { resolvesFeedback: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
    >
      <Send className="h-4 w-4" aria-hidden="true" />
      {pending ? "正在提交" : resolvesFeedback ? "提交修改并解决反馈" : "提交修改并发布"}
    </button>
  );
}

export function AdminArticleEditor({
  articleId,
  schemaVersion,
  initialTitle,
  initialSummary,
  initialBody,
  expectedHash,
  feedbackId = ""
}: {
  articleId: string;
  schemaVersion: number;
  initialTitle: string;
  initialSummary: string;
  initialBody: string;
  expectedHash: string;
  feedbackId?: string;
}) {
  const [title, setTitle] = useState(initialTitle);
  const [summary, setSummary] = useState(initialSummary);
  const [body, setBody] = useState(initialBody);
  const [editorMessage, setEditorMessage] = useState("");
  const sections = useMemo(() => getEditableArticleSections(body), [body]);
  const previewBody = useMemo(() => formatPublicArticleBody(body), [body]);

  function removeSection(index: number, sectionTitle: string) {
    if (!window.confirm(`确认删除整个「${sectionTitle}」板块及其中内容吗？`)) return;

    try {
      setBody((current) => removeEditableArticleSection(current, index));
      setEditorMessage(`已在本次草稿中删除「${sectionTitle}」。提交后才会进入发布流程。`);
    } catch (error) {
      setEditorMessage(error instanceof Error ? error.message : "无法删除这个板块。");
    }
  }

  return (
    <form action={submitAdminArticleEdit} className="space-y-6">
      <input type="hidden" name="articleId" value={articleId} />
      <input type="hidden" name="expectedHash" value={expectedHash} />
      {feedbackId ? <input type="hidden" name="feedbackId" value={feedbackId} /> : null}

      {feedbackId ? (
        <aside className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-100">
          这次修改关联反馈 {feedbackId}。提交成功后反馈会归档为已解决；文章通过 CI 后自动上线。
        </aside>
      ) : null}

      <section className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">标题与摘要</h2>
        <div className="mt-4 grid gap-4">
          <div>
            <label htmlFor="admin-article-title" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              文章标题
            </label>
            <input
              id="admin-article-title"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              minLength={2}
              maxLength={160}
              className="mt-2 w-full rounded-md border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </div>

          {schemaVersion === 2 ? (
            <div>
              <label htmlFor="admin-article-summary" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                公开摘要
              </label>
              <textarea
                id="admin-article-summary"
                name="summary"
                value={summary}
                onChange={(event) => setSummary(event.target.value)}
                required
                minLength={2}
                maxLength={500}
                rows={3}
                className="mt-2 w-full resize-y rounded-md border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm leading-6 outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
              />
              <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">
                v2 文章的症状、方案和来源还存在结构化元数据；本编辑器不会静默改写这些可信度字段。
              </p>
            </div>
          ) : (
            <input type="hidden" name="summary" value="" />
          )}
        </div>
      </section>

      <section className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">正文 Markdown</h2>
            <p className="mt-1 text-sm text-zinc-500">可直接修改文字；标题的 H1 会在提交时自动与文章标题同步。</p>
          </div>
          <span className="text-xs text-zinc-500">{body.length.toLocaleString("zh-CN")} 字符</span>
        </div>
        <textarea
          name="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          required
          maxLength={200_000}
          rows={28}
          spellCheck={false}
          className="mt-4 w-full resize-y rounded-md border border-zinc-300 bg-zinc-950 px-4 py-3 font-mono text-sm leading-6 text-zinc-100 outline-none focus:border-blue-500 dark:border-zinc-700"
        />
      </section>

      <section className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">板块管理</h2>
        <p className="mt-1 text-sm text-zinc-500">核心板块由内容规范锁定；其余二级板块可以整块删除。</p>
        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {sections.map((section) => (
            <div key={`${section.title}-${section.index}`} className="flex items-center justify-between gap-3 rounded-md border border-zinc-200 px-3 py-2 dark:border-zinc-800">
              <span className="min-w-0 truncate text-sm text-zinc-800 dark:text-zinc-200">{section.title}</span>
              {section.required ? (
                <span className="inline-flex flex-none items-center gap-1 text-xs text-zinc-500">
                  <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
                  核心
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => removeSection(section.index, section.title)}
                  className="inline-flex min-h-9 flex-none items-center gap-1 rounded-md px-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  删除板块
                </button>
              )}
            </div>
          ))}
        </div>
        <p className="mt-3 min-h-5 text-sm text-blue-700 dark:text-blue-300" aria-live="polite">
          {editorMessage}
        </p>
      </section>

      <section className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
          <Eye className="h-5 w-5" aria-hidden="true" />
          读者页正文预览
        </h2>
        <p className="mt-1 text-sm text-zinc-500">相关问题、标签和元信息不会出现在读者页正文区域。</p>
        <article className="article-body mt-6 rounded-md border border-zinc-100 p-5 dark:border-zinc-900">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{previewBody}</ReactMarkdown>
        </article>
      </section>

      <section className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <label htmlFor="admin-edit-reason" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          修改说明（可选）
        </label>
        <input
          id="admin-edit-reason"
          name="reason"
          maxLength={1_000}
          placeholder="例如：修正设置路径，并删除已过时的社区方案"
          className="mt-2 w-full rounded-md border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-xs leading-5 text-zinc-500">
            提交后会生成带完整文件哈希的发布任务；若 Harvest 已更新同一文件，系统会拒绝覆盖并要求重新审核。
          </p>
          <SubmitButton resolvesFeedback={Boolean(feedbackId)} />
        </div>
        <Link href="/admin/feedback" className="mt-4 inline-flex text-sm text-blue-600 hover:underline dark:text-blue-400">
          返回 feedback 管理
        </Link>
      </section>
    </form>
  );
}
