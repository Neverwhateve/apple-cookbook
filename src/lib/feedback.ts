import fs from "node:fs/promises";
import path from "node:path";

export type FeedbackKind =
  | "missing_problem"
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
  contact: string;
  sourceTitle: string;
  sourceUrl: string;
  status: "open";
  source: "website";
};

const feedbackRoot = path.join(process.cwd(), "feedback");
const todoRoot = path.join(process.cwd(), "todos");
const inboxPath = path.join(feedbackRoot, "inbox.jsonl");
const dailyWorkPath = path.join(todoRoot, "daily-work.md");
const runtimeFeedbackRoot = path.join("/tmp", "apple-cookbook-feedback");
const runtimeInboxPath = path.join(runtimeFeedbackRoot, "inbox.jsonl");
const runtimeDailyWorkPath = path.join(runtimeFeedbackRoot, "daily-work.md");

function normalizeMultiline(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeSingleLine(value: FormDataEntryValue | null) {
  return normalizeMultiline(value).replace(/\s+/g, " ").slice(0, 240);
}

function toFeedbackKind(value: string): FeedbackKind {
  if (
    value === "article_feedback" ||
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
    contact: normalizeSingleLine(formData.get("contact")),
    sourceTitle: normalizeSingleLine(formData.get("sourceTitle")),
    sourceUrl: normalizeSingleLine(formData.get("sourceUrl")),
    status: "open",
    source: "website"
  };
}

function validateSubmission(submission: FeedbackSubmission) {
  if (submission.title.length < 3) return "请添加一个简短标题，方便后续跟进。";
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
    `- [ ] ${submission.id} ${submission.title}`,
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
    `  - 顾客原话: ${submission.customerWords || "未填写"}`,
    `  - 联系方式: ${submission.contact || "未填写"}`,
    `  - 下一步: ${nextStep}`,
    `  - 备注: ${submission.description.replace(/\n/g, " ")}`
  ];

  return `${lines.join("\n")}\n`;
}

async function ensureStore() {
  if (process.env.VERCEL) {
    await fs.mkdir(runtimeFeedbackRoot, { recursive: true });
    return;
  }

  await fs.mkdir(feedbackRoot, { recursive: true });
  await fs.mkdir(todoRoot, { recursive: true });
  try {
    await fs.access(dailyWorkPath);
  } catch {
    await fs.writeFile(
      dailyWorkPath,
      "# 每日工作收集\n\n这里记录从 Apple Cookbook 网站收集到的待处理事项。请在每日复核中整理，并将确认有效的内容转成知识库新条目或文章更新。\n\n",
      "utf8"
    );
  }
}

export async function saveFeedback(formData: FormData) {
  const submission = buildSubmission(formData);
  const error = validateSubmission(submission);

  if (error) {
    return { ok: false as const, error };
  }

  await ensureStore();

  if (process.env.VERCEL) {
    await fs.appendFile(runtimeInboxPath, `${JSON.stringify(submission)}\n`, "utf8");
    await fs.appendFile(runtimeDailyWorkPath, buildDailyWorkItem(submission), "utf8");
    console.log("APPLE_COOKBOOK_FEEDBACK", JSON.stringify(submission));
  } else {
    await fs.appendFile(inboxPath, `${JSON.stringify(submission)}\n`, "utf8");
    await fs.appendFile(dailyWorkPath, buildDailyWorkItem(submission), "utf8");
  }

  return { ok: true as const, id: submission.id };
}
