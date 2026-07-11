import { CheckCircle2, CircleDot, ExternalLink, Inbox, RotateCcw, ShieldAlert, XCircle } from "lucide-react";
import { updateFeedbackQueueItem } from "@/app/admin/feedback/actions";
import { canUseAdmin, getAdminFeedbackItems, type FeedbackStatus } from "@/lib/feedback-admin";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "反馈队列管理 | Apple Cookbook",
  description: "查看和管理 Apple Cookbook P0 反馈队列。"
};

const statusLabels: Record<FeedbackStatus, string> = {
  open: "待处理",
  in_progress: "处理中",
  resolved: "已解决",
  dismissed: "已忽略"
};

const statusClasses: Record<FeedbackStatus, string> = {
  open: "bg-red-50 text-red-700 ring-red-200 dark:bg-red-950/30 dark:text-red-300 dark:ring-red-900",
  in_progress: "bg-amber-50 text-amber-800 ring-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:ring-amber-900",
  resolved: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:ring-emerald-900",
  dismissed: "bg-zinc-100 text-zinc-600 ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-800"
};

function StatusButton({
  id,
  token,
  status,
  children
}: {
  id: string;
  token: string;
  status: FeedbackStatus;
  children: React.ReactNode;
}) {
  return (
    <form action={updateFeedbackQueueItem}>
      <input type="hidden" name="token" value={token} />
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <button
        type="submit"
        className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
      >
        {children}
      </button>
    </form>
  );
}

export default async function AdminFeedbackPage({
  searchParams
}: {
  searchParams?: Promise<{ token?: string }>;
}) {
  const token = (await searchParams)?.token ?? "";
  const allowed = canUseAdmin(token);

  if (!allowed) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-1 h-5 w-5 flex-none text-red-600" />
            <div>
              <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">需要管理员访问令牌</h1>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                生产环境请设置 <code className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-900">APPLE_COOKBOOK_ADMIN_TOKEN</code>
                ，然后访问 <code className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-900">/admin/feedback?token=你的令牌</code>。
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const items = await getAdminFeedbackItems();
  const openCount = items.filter((item) => item.status === "open").length;
  const activeCount = items.filter((item) => item.status === "open" || item.status === "in_progress").length;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-col gap-4 border-b border-zinc-200 pb-6 dark:border-zinc-800 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Admin</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50">P0 反馈队列</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            查看网站提交的问题和链接，决定是否进入处理、关闭或重新打开。待处理项会被 3 小时 harvest 自动化优先消费。
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm sm:w-64">
          <div className="rounded-md border border-zinc-200 p-3 dark:border-zinc-800">
            <p className="text-zinc-500 dark:text-zinc-400">待处理</p>
            <p className="mt-1 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">{openCount}</p>
          </div>
          <div className="rounded-md border border-zinc-200 p-3 dark:border-zinc-800">
            <p className="text-zinc-500 dark:text-zinc-400">活跃</p>
            <p className="mt-1 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">{activeCount}</p>
          </div>
        </div>
      </div>

      {items.length ? (
        <div className="space-y-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">P0</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${statusClasses[item.status]}`}>
                      {statusLabels[item.status]}
                    </span>
                    <span className="text-xs text-zinc-500">{item.syncedToGithub ? "已同步 GitHub" : "未同步 GitHub"}</span>
                  </div>
                  <h2 className="mt-2 text-lg font-semibold text-zinc-950 dark:text-zinc-50">{item.title}</h2>
                  <p className="mt-1 text-xs text-zinc-500">
                    {item.id} · {item.kind} · {new Date(item.createdAt).toLocaleString("zh-CN", { hour12: false })}
                  </p>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-zinc-700 dark:text-zinc-300">{item.description}</p>
                  <div className="mt-3 grid gap-2 text-xs text-zinc-500 sm:grid-cols-2">
                    <p>设备：{item.device || "未填写"}</p>
                    <p>顾客原话：{item.customerWords || "未填写"}</p>
                    <p>联系方式：{item.contact || "未填写"}</p>
                    <p>更新时间：{item.updatedAt ? new Date(item.updatedAt).toLocaleString("zh-CN", { hour12: false }) : "未更新"}</p>
                  </div>
                  {item.sourceUrl ? (
                    <a
                      href={item.sourceUrl}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {item.sourceTitle || item.sourceUrl}
                    </a>
                  ) : null}
                  {item.adminNote ? <p className="mt-3 text-sm text-zinc-500">管理员备注：{item.adminNote}</p> : null}
                </div>

                <div className="flex flex-wrap gap-2 lg:w-80 lg:justify-end">
                  <StatusButton id={item.id} token={token} status="in_progress">
                    <CircleDot className="h-4 w-4" />
                    处理中
                  </StatusButton>
                  <StatusButton id={item.id} token={token} status="resolved">
                    <CheckCircle2 className="h-4 w-4" />
                    已解决
                  </StatusButton>
                  <StatusButton id={item.id} token={token} status="dismissed">
                    <XCircle className="h-4 w-4" />
                    忽略
                  </StatusButton>
                  <StatusButton id={item.id} token={token} status="open">
                    <RotateCcw className="h-4 w-4" />
                    重开
                  </StatusButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <section className="rounded-lg border border-dashed border-zinc-300 p-10 text-center dark:border-zinc-800">
          <Inbox className="mx-auto h-8 w-8 text-zinc-400" />
          <h2 className="mt-3 text-base font-semibold text-zinc-950 dark:text-zinc-50">暂无反馈</h2>
          <p className="mt-2 text-sm text-zinc-500">线上提交后会出现在这里。</p>
        </section>
      )}
    </main>
  );
}
