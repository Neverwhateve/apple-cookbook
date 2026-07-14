import fs from "node:fs/promises";
import path from "node:path";
import { atomicWriteText, withFileLock } from "./file-store.ts";

export type FeedbackKind =
  | "missing_problem"
  | "content_bug"
  | "article_feedback"
  | "workflow_request"
  | "link_submission"
  | "question_submission";

export type FeedbackSubmission = {
  id: string;
  createdAt: string;
  kind: FeedbackKind;
  title: string;
  description: string;
  customerWords: string;
  device: string;
  reporterName: string;
  contact: string;
  sourceTitle: string;
  sourceUrl: string;
  status: "open" | "in_progress" | "needs_review" | "resolved" | "dismissed";
  source: "website";
  adminNote?: string;
  updatedAt?: string;
  automationReview?: {
    outcome: "no_content_change";
    reviewedAt: string;
    summary: string;
    issueUrl: string;
  };
};

export const feedbackDataRoot = process.env.APPLE_COOKBOOK_DATA_DIR ?? process.cwd();
const maxMultilineLength = 4000;
export const feedbackQueueLockName = ".queue.lock";

export function getFeedbackStorageUnavailableReason() {
  return process.env.VERCEL
    ? "当前部署环境不提供持久化反馈存储，本次内容未保存。请稍后重试或通过项目维护渠道提交。"
    : null;
}

export function getFeedbackQueueLockPath(root = feedbackDataRoot) {
  // Remote writers must acquire this same mkdir-style directory lock before
  // changing inbox.jsonl or archive.jsonl.
  return path.join(root, "feedback", feedbackQueueLockName);
}

function getFeedbackStorePaths(root: string) {
  const storeFeedbackRoot = path.join(root, "feedback");
  const storeTodoRoot = path.join(root, "todos");

  return {
    feedbackRoot: storeFeedbackRoot,
    todoRoot: storeTodoRoot,
    inboxPath: path.join(storeFeedbackRoot, "inbox.jsonl"),
    dailyWorkPath: path.join(storeTodoRoot, "daily-work.md"),
    lockPath: getFeedbackQueueLockPath(root)
  };
}

function normalizeMultiline(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, maxMultilineLength);
}

function normalizeSingleLine(value: FormDataEntryValue | null) {
  return normalizeMultiline(value).replace(/\s+/g, " ").slice(0, 240);
}

function toFeedbackKind(value: string): FeedbackKind {
  if (
    value === "article_feedback" ||
    value === "content_bug" ||
    value === "workflow_request" ||
    value === "link_submission" ||
    value === "question_submission"
  ) {
    return value;
  }

  return "missing_problem";
}

function buildTitle(kind: FeedbackKind, title: string, content: string) {
  if (title) return title;

  const prefix = kind === "link_submission" ? "待分析链接" : "待分析问题";
  const normalizedContent = content.replace(/^https?:\/\//, "").slice(0, 80);

  return `${prefix}: ${normalizedContent}`;
}

function buildSubmission(formData: FormData): FeedbackSubmission {
  const now = new Date();
  const createdAt = now.toISOString();
  const id = `AC-${createdAt.slice(0, 10).replaceAll("-", "")}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const kind = toFeedbackKind(normalizeSingleLine(formData.get("kind")));
  const content = normalizeMultiline(formData.get("content"));
  const description = normalizeMultiline(formData.get("description")) || content;
  const title = buildTitle(kind, normalizeSingleLine(formData.get("title")), content || description);

  return {
    id,
    createdAt,
    kind,
    title,
    description,
    customerWords: normalizeSingleLine(formData.get("customerWords")),
    device: normalizeSingleLine(formData.get("device")),
    reporterName: normalizeSingleLine(formData.get("reporterName")),
    contact: normalizeSingleLine(formData.get("contact")),
    sourceTitle: normalizeSingleLine(formData.get("sourceTitle")),
    sourceUrl: normalizeSingleLine(formData.get("sourceUrl")),
    status: "open",
    source: "website"
  };
}

function validateSubmission(submission: FeedbackSubmission) {
  if (submission.title.length < 3) return "请添加一个简短标题，方便后续跟进。";
  if (submission.kind === "content_bug" && submission.reporterName.length < 2) {
    return "请填写你的名字，方便记录是谁发现了这个问题。";
  }
  if (submission.kind === "link_submission") {
    if (!/^https?:\/\/\S+\.\S+/.test(submission.description)) return "请粘贴一个完整链接。";
  } else if (submission.description.length < 3) {
    return "请写下链接或问题，方便加入待办。";
  }

  return null;
}

function buildDailyWorkItem(submission: FeedbackSubmission) {
  const nextStep =
    submission.kind === "link_submission"
      ? "分析链接内容，提取可用信息，判断是否新增或更新知识库条目。"
      : submission.kind === "question_submission"
        ? "分析问题场景，查证来源，整理成知识库新增或更新建议。"
        : "复核来源，与现有知识库条目去重，然后新增或更新 Markdown 条目。";

  const lines = [
    `- [ ] [P0] ${submission.id} ${submission.title}`,
    `  - 优先级: P0 - 用户反馈问题或链接，优先处理`,
    `  - 类型: ${submission.kind}`,
    `  - 来源: 网站反馈表单`,
    `  - 创建时间: ${submission.createdAt}`,
    ...(submission.sourceTitle || submission.sourceUrl
      ? [
          `  - 关联内容: ${submission.sourceTitle || "未填写"}`,
          `  - 关联链接: ${submission.sourceUrl || "未填写"}`
        ]
      : []),
    `  - 设备: ${submission.device || "未填写"}`,
    `  - 提交人: ${submission.reporterName || "未填写"}`,
    `  - 顾客原话: ${submission.customerWords || "未填写"}`,
    `  - 联系方式: ${submission.contact || "未填写"}`,
    `  - 下一步: ${nextStep}`,
    `  - 备注: ${submission.description.replace(/\n/g, " ")}`
  ];

  return `${lines.join("\n")}\n`;
}

async function prependDailyWorkItem(filePath: string, item: string) {
  let existing = "";

  try {
    existing = await fs.readFile(filePath, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
  }

  await atomicWriteText(filePath, `${item}\n${existing}`.trimEnd() + "\n");
}

async function ensureStore(root = feedbackDataRoot) {
  const paths = getFeedbackStorePaths(root);

  await fs.mkdir(paths.feedbackRoot, { recursive: true });
  await fs.mkdir(paths.todoRoot, { recursive: true });
  try {
    await fs.access(paths.dailyWorkPath);
  } catch {
    await atomicWriteText(
      paths.dailyWorkPath,
      "# 每日工作收集\n\n这里记录从 Apple Cookbook 网站收集到的待处理事项。请在每日复核中整理，并将确认有效的内容转成知识库新条目或文章更新。\n\n"
    );
  }
}

export async function saveFeedback(formData: FormData, root = feedbackDataRoot) {
  const submission = buildSubmission(formData);
  const error = validateSubmission(submission);

  if (error) {
    return { ok: false as const, error };
  }

  const storageUnavailableReason = getFeedbackStorageUnavailableReason();

  if (storageUnavailableReason) {
    return {
      ok: false as const,
      error: storageUnavailableReason
    };
  }

  const paths = getFeedbackStorePaths(root);

  await withFileLock(paths.lockPath, async () => {
    await ensureStore(root);

    let existingInbox = "";
    try {
      existingInbox = await fs.readFile(paths.inboxPath, "utf8");
    } catch (readError) {
      if ((readError as NodeJS.ErrnoException).code !== "ENOENT") throw readError;
    }

    const separator = existingInbox && !existingInbox.endsWith("\n") ? "\n" : "";
    await atomicWriteText(paths.inboxPath, `${existingInbox}${separator}${JSON.stringify(submission)}\n`);

    // inbox.jsonl is the durable source of truth. daily-work.md is a
    // rebuildable projection; the shared lock prevents concurrent loss, but a
    // process crash between the two atomic replacements is not a transaction.
    try {
      await prependDailyWorkItem(paths.dailyWorkPath, buildDailyWorkItem(submission));
    } catch (dailyWorkError) {
      console.error("Failed to update the derived feedback daily-work queue.", {
        feedbackId: submission.id,
        error: dailyWorkError
      });
    }
  });

  return { ok: true as const, id: submission.id };
}
