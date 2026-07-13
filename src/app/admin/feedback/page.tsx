import { cookies } from "next/headers";
import {
  CheckCircle2,
  ChevronsDown,
  ChevronsUp,
  CircleDot,
  ExternalLink,
  Inbox,
  LogOut,
  RotateCcw,
  ShieldAlert,
  XCircle
} from "lucide-react";
import { loginAdmin, logoutAdmin, moveFeedbackQueueItem, updateFeedbackQueueItem } from "@/app/admin/feedback/actions";
import { canUseAdminSession, getAdminFeedbackQueues, type AdminFeedbackItem, type FeedbackStatus } from "@/lib/feedback-admin";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "反馈队列管理",
  description: "查看和管理 Apple Cookbook P0 反馈队列。",
  robots: {
    index: false,
    follow: false
  }
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
  status,
  children
}: {
  id: string;
  status: FeedbackStatus;
  children: React.ReactNode;
}) {
  return (
    <form action={updateFeedbackQueueItem}>
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

function MoveButton({
  id,
  direction,
  children
}: {
  id: string;
  direction: "first" | "last";
  children: React.ReactNode;
}) {
  return (
    <form action={moveFeedbackQueueItem}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="direction" value={direction} />
      <button
        type="submit"
        className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
      >
        {children}
      </button>
    </form>
  );
}

function LoginPanel() {
  return (
    <main className="mx-auto max-w-md px-4 py-10 sm:px-6">
      <form action={loginAdmin} className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-start gap-3">
          <ShieldAlert className="mt-1 h-5 w-5 flex-none text-zinc-600 dark:text-zinc-300" />
          <div>
            <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">管理员登录</h1>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">输入用户名和密码查看 P0 反馈队列。</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="admin-username" className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
              用户名
            </label>
            <input
              id="admin-username"
              name="username"
              autoComplete="username"
              required
              className="mt-2 w-full rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none transition focus:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-900"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
              密码
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-2 w-full rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none transition focus:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-900"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 inline-flex min-h-10 w-full items-center justify-center rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          登录
        </button>
      </form>
    </main>
  );
}

function FeedbackCard({ item, archived = false }: { item: AdminFeedbackItem; archived?: boolean }) {
  return (
    <article key={item.id} className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">P0</span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${statusClasses[item.status]}`}>
              {statusLabels[item.status]}
            </span>
            <span className="text-xs text-zinc-500">{archived ? `归档 #${item.queuePosition}` : `队列 #${item.queuePosition}`}</span>
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
          {!archived ? (
            <>
              <MoveButton id={item.id} direction="first">
                <ChevronsUp className="h-4 w-4" />
                最前
              </MoveButton>
              <MoveButton id={item.id} direction="last">
                <ChevronsDown className="h-4 w-4" />
                最后
              </MoveButton>
              <StatusButton id={item.id} status="in_progress">
                <CircleDot className="h-4 w-4" />
                处理中
              </StatusButton>
            </>
          ) : null}
          <StatusButton id={item.id} status="resolved">
            <CheckCircle2 className="h-4 w-4" />
            已解决
          </StatusButton>
          <StatusButton id={item.id} status="dismissed">
            <XCircle className="h-4 w-4" />
            忽略
          </StatusButton>
          <StatusButton id={item.id} status="open">
            <RotateCcw className="h-4 w-4" />
            重开
          </StatusButton>
        </div>
      </div>
    </article>
  );
}

export default async function AdminFeedbackPage() {
  const cookieStore = await cookies();
  const allowed = canUseAdminSession(cookieStore.get("apple-cookbook-admin")?.value);

  if (!allowed) {
    return <LoginPanel />;
  }

  const queues = await getAdminFeedbackQueues();
  const openCount = queues.active.filter((item) => item.status === "open").length;
  const activeCount = queues.active.length;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-col gap-4 border-b border-zinc-200 pb-6 dark:border-zinc-800 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Admin</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50">P0 反馈队列</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            查看网站提交的问题和链接，决定是否进入处理、关闭或重新打开。待处理项会被 1 小时 harvest 自动化优先消费。
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:w-80">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-md border border-zinc-200 p-3 dark:border-zinc-800">
              <p className="text-zinc-500 dark:text-zinc-400">待处理</p>
              <p className="mt-1 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">{openCount}</p>
            </div>
            <div className="rounded-md border border-zinc-200 p-3 dark:border-zinc-800">
              <p className="text-zinc-500 dark:text-zinc-400">活跃</p>
              <p className="mt-1 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">{activeCount}</p>
            </div>
          </div>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
            >
              <LogOut className="h-4 w-4" />
              退出登录
            </button>
          </form>
        </div>
      </div>

      {queues.active.length ? (
        <div className="space-y-3">
          {queues.active.map((item) => (
            <FeedbackCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <section className="rounded-lg border border-dashed border-zinc-300 p-10 text-center dark:border-zinc-800">
          <Inbox className="mx-auto h-8 w-8 text-zinc-400" />
          <h2 className="mt-3 text-base font-semibold text-zinc-950 dark:text-zinc-50">暂无反馈</h2>
          <p className="mt-2 text-sm text-zinc-500">线上提交后会出现在这里。</p>
        </section>
      )}

      {queues.archived.length ? (
        <section className="mt-10 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">归档队列</h2>
            <p className="mt-2 text-sm text-zinc-500">已解决和已忽略的项目会移到这里，不再作为活跃 P0 队列处理。</p>
          </div>
          <div className="space-y-3">
            {queues.archived.map((item) => (
              <FeedbackCard key={item.id} item={item} archived />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
