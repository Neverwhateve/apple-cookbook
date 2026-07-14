import Link from "next/link";
import { cookies } from "next/headers";
import {
  CheckCircle2,
  ChevronsDown,
  ChevronsUp,
  CircleDot,
  ExternalLink,
  FilePenLine,
  Inbox,
  LogOut,
  RotateCcw,
  UserCheck,
  XCircle
} from "lucide-react";
import {
  logoutAdmin,
  moveFeedbackQueueItem,
  promoteFeedbackQueueItem,
  updateFeedbackQueueItem
} from "@/app/admin/feedback/actions";
import { AdminLoginForm } from "@/components/admin-login-form";
import {
  canUseAdminSession,
  getAdminFeedbackQueues,
  type AdminFeedbackItem,
  type FeedbackStatus
} from "@/lib/feedback-admin";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "反馈与文章管理",
  description: "复核反馈、管理 P0 队列并修改 Apple Cookbook 文章。",
  robots: {
    index: false,
    follow: false
  }
};

const statusLabels: Record<FeedbackStatus, string> = {
  open: "待处理",
  in_progress: "处理中",
  needs_review: "待人工复核",
  resolved: "已解决",
  dismissed: "已确认无效"
};

const statusClasses: Record<FeedbackStatus, string> = {
  open: "bg-red-50 text-red-700 ring-red-200 dark:bg-red-950/30 dark:text-red-300 dark:ring-red-900",
  in_progress: "bg-amber-50 text-amber-800 ring-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:ring-amber-900",
  needs_review: "bg-violet-50 text-violet-800 ring-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:ring-violet-900",
  resolved: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:ring-emerald-900",
  dismissed: "bg-zinc-100 text-zinc-600 ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-800"
};

const secondaryButtonClass =
  "inline-flex min-h-9 items-center justify-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-900";

function StatusButton({ id, status, children }: { id: string; status: FeedbackStatus; children: React.ReactNode }) {
  return (
    <form action={updateFeedbackQueueItem}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <button type="submit" className={secondaryButtonClass}>
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
      <button type="submit" className={secondaryButtonClass}>
        {children}
      </button>
    </form>
  );
}

function PromoteButton({ id, archived }: { id: string; archived?: boolean }) {
  return (
    <form action={promoteFeedbackQueueItem}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-md bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
      >
        {archived ? <RotateCcw className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
        判定有效，进入 P0
      </button>
    </form>
  );
}

function FeedbackCard({
  item,
  mode
}: {
  item: AdminFeedbackItem;
  mode: "review" | "active" | "archived";
}) {
  const articleQuery = item.sourceTitle || item.title;
  const editHref = `/admin/articles?q=${encodeURIComponent(articleQuery)}&feedbackId=${encodeURIComponent(item.id)}`;

  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {item.priority ? (
              <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">P0</span>
            ) : (
              <span className="rounded-full bg-violet-600 px-2 py-0.5 text-xs font-semibold text-white">人工复核</span>
            )}
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${statusClasses[item.status]}`}>
              {statusLabels[item.status]}
            </span>
            <span className="text-xs text-zinc-500">
              {mode === "archived" ? `归档 #${item.queuePosition}` : mode === "review" ? `复核 #${item.queuePosition}` : `队列 #${item.queuePosition}`}
            </span>
            <span className="text-xs text-zinc-500">{item.syncedToGithub ? "已同步 GitHub" : "等待同步"}</span>
          </div>

          <h3 className="mt-2 text-lg font-semibold text-zinc-950 dark:text-zinc-50">{item.title}</h3>
          <p className="mt-1 text-xs text-zinc-500">
            {item.id} · {item.kind} · {new Date(item.createdAt).toLocaleString("zh-CN", { hour12: false })}
          </p>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-zinc-700 dark:text-zinc-300">{item.description}</p>

          {item.automationReview ? (
            <aside className="mt-4 rounded-md border border-violet-200 bg-violet-50 p-3 dark:border-violet-900 dark:bg-violet-950/30">
              <p className="text-xs font-semibold text-violet-800 dark:text-violet-200">AI 初审认为无需修改，请人工二次审核</p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-violet-950 dark:text-violet-100">
                {item.automationReview.summary}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-violet-700 dark:text-violet-300">
                <span>{new Date(item.automationReview.reviewedAt).toLocaleString("zh-CN", { hour12: false })}</span>
                {item.automationReview.issueUrl ? (
                  <a href={item.automationReview.issueUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">
                    查看验证记录 <ExternalLink className="h-3 w-3" />
                  </a>
                ) : null}
              </div>
            </aside>
          ) : null}

          <div className="mt-3 grid gap-2 text-xs text-zinc-500 sm:grid-cols-2">
            <p>设备：{item.device || "未填写"}</p>
            <p>提交人：{item.reporterName || "未填写"}</p>
            <p>提交人亲自验证：{item.reporterVerified ? "是" : "否"}</p>
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

        <div className="flex flex-wrap gap-2 lg:w-96 lg:justify-end">
          {mode === "active" ? (
            <>
              <MoveButton id={item.id} direction="first">
                <ChevronsUp className="h-4 w-4" /> 最前
              </MoveButton>
              <MoveButton id={item.id} direction="last">
                <ChevronsDown className="h-4 w-4" /> 最后
              </MoveButton>
              <StatusButton id={item.id} status="in_progress">
                <CircleDot className="h-4 w-4" /> 处理中
              </StatusButton>
            </>
          ) : null}

          {mode === "review" || mode === "archived" ? <PromoteButton id={item.id} archived={mode === "archived"} /> : null}

          {mode !== "archived" ? (
            <Link href={editHref} className={secondaryButtonClass}>
              <FilePenLine className="h-4 w-4" /> 编辑关联文章
            </Link>
          ) : null}

          {mode !== "archived" ? (
            <>
              <StatusButton id={item.id} status="resolved">
                <CheckCircle2 className="h-4 w-4" /> 已人工处理
              </StatusButton>
              <StatusButton id={item.id} status="dismissed">
                <XCircle className="h-4 w-4" /> 确认无效
              </StatusButton>
            </>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default async function AdminFeedbackPage() {
  const cookieStore = await cookies();
  const allowed = canUseAdminSession(cookieStore.get("apple-cookbook-admin")?.value);

  if (!allowed) return <AdminLoginForm />;

  const queues = await getAdminFeedbackQueues();
  const openCount = queues.active.filter((item) => item.status === "open").length;
  const inProgressCount = queues.active.filter((item) => item.status === "in_progress").length;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex flex-col gap-5 border-b border-zinc-200 pb-7 dark:border-zinc-800 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Apple Cookbook · Admin</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">管理员工作台</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            先处理 P0 需求；需要修正内容时，直接进入文章库修改并提交可审计的发布提案。
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:w-[28rem]">
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="rounded-md border border-violet-200 p-3 dark:border-violet-900">
              <p className="text-zinc-500">待复核</p>
              <p className="mt-1 text-2xl font-semibold text-violet-700 dark:text-violet-300">{queues.review.length}</p>
            </div>
            <div className="rounded-md border border-zinc-200 p-3 dark:border-zinc-800">
              <p className="text-zinc-500">待处理</p>
              <p className="mt-1 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">{openCount}</p>
            </div>
            <div className="rounded-md border border-zinc-200 p-3 dark:border-zinc-800">
              <p className="text-zinc-500">处理中</p>
              <p className="mt-1 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">{inProgressCount}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Link href="/admin/articles" className={secondaryButtonClass}>
              <FilePenLine className="h-4 w-4" /> 文章管理
            </Link>
            <form action={logoutAdmin}>
              <button type="submit" className={`${secondaryButtonClass} w-full`}>
                <LogOut className="h-4 w-4" /> 退出登录
              </button>
            </form>
          </div>
        </div>
      </div>

      <section aria-labelledby="p0-queue-title">
        <div className="mb-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600 dark:text-red-400">Priority queue</p>
              <h2 id="p0-queue-title" className="mt-1 text-xl font-semibold text-zinc-950 dark:text-zinc-50">P0 需求</h2>
            </div>
            <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-700 dark:bg-red-950/30 dark:text-red-300">
              {queues.active.length} 项活跃
            </span>
          </div>
          <p className="mt-2 text-sm text-zinc-500">按队列顺序优先处理。可调整优先级、更新状态，或带着该需求直接编辑现有文章。</p>
        </div>
        {queues.active.length ? (
          <div className="space-y-3">
            {queues.active.map((item) => <FeedbackCard key={item.id} item={item} mode="active" />)}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-zinc-300 p-10 text-center dark:border-zinc-800">
            <Inbox className="mx-auto h-8 w-8 text-zinc-400" />
            <p className="mt-3 text-sm text-zinc-500">暂无活跃 P0 需求。</p>
          </div>
        )}
      </section>

      <section className="mt-10 border-t border-zinc-200 pt-6 dark:border-zinc-800" aria-labelledby="review-queue-title">
        <div className="mb-4">
          <h2 id="review-queue-title" className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">待人工复核</h2>
          <p className="mt-2 text-sm text-zinc-500">AI 未发现应发布的修改时会停在这里；确认有效后会进入 P0 队列，也可直接修正关联文章。</p>
        </div>
        {queues.review.length ? (
          <div className="space-y-3">
            {queues.review.map((item) => <FeedbackCard key={item.id} item={item} mode="review" />)}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-800">
            <UserCheck className="mx-auto h-7 w-7 text-zinc-400" />
            <p className="mt-2 text-sm text-zinc-500">暂无需要二次审核的 AI 判断。</p>
          </div>
        )}
      </section>

      {queues.archived.length ? (
        <section className="mt-10 border-t border-zinc-200 pt-6 dark:border-zinc-800" aria-labelledby="archive-title">
          <div className="mb-4">
            <h2 id="archive-title" className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">归档队列</h2>
            <p className="mt-2 text-sm text-zinc-500">已解决或人工确认无效的项目保留在这里；误判时仍可重新进入 P0。</p>
          </div>
          <div className="space-y-3">
            {queues.archived.map((item) => <FeedbackCard key={item.id} item={item} mode="archived" />)}
          </div>
        </section>
      ) : null}
    </main>
  );
}
