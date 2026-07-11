import fs from "node:fs/promises";
import path from "node:path";

export type FeedbackKind = "missing_problem" | "link_review";

export type FeedbackSubmission = {
  id: string;
  createdAt: string;
  kind: FeedbackKind;
  title: string;
  description: string;
  link: string;
  customerWords: string;
  device: string;
  contact: string;
  priority: "high" | "normal";
  status: "open";
  source: "website";
};

const feedbackRoot = path.join(process.cwd(), "feedback");
const todoRoot = path.join(process.cwd(), "todos");
const dataRoot = process.env.APPLE_COOKBOOK_DATA_DIR;
const persistentFeedbackRoot = dataRoot ? path.join(dataRoot, "feedback") : feedbackRoot;
const persistentTodoRoot = dataRoot ? path.join(dataRoot, "todos") : todoRoot;
const persistentInboxPath = path.join(persistentFeedbackRoot, "inbox.jsonl");
const persistentDailyWorkPath = path.join(persistentTodoRoot, "daily-work.md");
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
  if (value === "link_review") return value;
  return "missing_problem";
}

function titleFromQuestion(question: string) {
  const firstLine = question.split("\n").find(Boolean) ?? "";
  return firstLine.slice(0, 60);
}

function normalizeUrl(value: FormDataEntryValue | null) {
  const raw = normalizeSingleLine(value);
  if (!raw) return "";

  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    return url.toString();
  } catch {
    return raw.startsWith("/") ? raw : "";
  }
}

function decodeHtml(value: string) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function extractTag(html: string, pattern: RegExp) {
  return decodeHtml(pattern.exec(html)?.[1] ?? "").replace(/\s+/g, " ").trim();
}

function textFromHtml(html: string) {
  return decodeHtml(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<\/(p|li|h[1-6]|div|section|article)>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
      .replace(/[ \t]{2,}/g, " ")
      .replace(/\n{3,}/g, "\n\n")
  ).trim();
}

function pickSentences(text: string, keywords: string[]) {
  const sentences = text
    .split(/(?<=[。！？.!?])\s+|\n+/)
    .map((line) => line.trim())
    .filter((line) => line.length >= 12);
  const matched = sentences.filter((sentence) =>
    keywords.some((keyword) => sentence.toLowerCase().includes(keyword.toLowerCase()))
  );
  return (matched.length ? matched : sentences).slice(0, 2).join(" ").slice(0, 420);
}

async function summarizeLink(link: string) {
  if (!link.startsWith("http://") && !link.startsWith("https://")) {
    return {
      title: link,
      summary: "问题: 当前站内条目需要复核。\n经验: 从当前浏览条目直接提交。\n答案: 请根据条目上下文和来源补充修正。"
    };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(link, {
      headers: {
        "user-agent": "Apple-Cookbook-Feedback/1.0"
      },
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    const title = extractTag(html, /<title[^>]*>([\s\S]*?)<\/title>/i) || link;
    const description =
      extractTag(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i) ||
      extractTag(html, /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["'][^>]*>/i);
    const text = textFromHtml(html).slice(0, 8000);
    const problem = description || pickSentences(text, ["问题", "无法", "失败", "error", "issue", "problem"]);
    const experience = pickSentences(text, ["原因", "经验", "观察", "复现", "because", "原因是", "症状"]);
    const answer = pickSentences(text, ["解决", "修复", "步骤", "方法", "answer", "solution", "fix"]);

    return {
      title,
      summary: [
        `问题: ${problem || "待从链接内容复核。"} `,
        `经验: ${experience || "待从链接内容整理。"} `,
        `答案: ${answer || "待从链接内容提炼。"}`
      ].join("\n")
    };
  } catch (error) {
    return {
      title: link,
      summary: `问题: 链接内容需要复核。\n经验: 自动读取链接失败，需人工打开来源确认。\n答案: 待读取来源后整理。\n读取错误: ${error instanceof Error ? error.message : "unknown"}`
    };
  }
}

async function buildSubmission(formData: FormData): Promise<FeedbackSubmission> {
  const now = new Date();
  const createdAt = now.toISOString();
  const id = `AC-${createdAt.slice(0, 10).replaceAll("-", "")}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const question = normalizeMultiline(formData.get("question"));
  const link = normalizeUrl(formData.get("link"));
  const kind = link && !question ? "link_review" : toFeedbackKind(normalizeSingleLine(formData.get("kind")));
  const linkSummary = kind === "link_review" && link ? await summarizeLink(link) : null;
  const title =
    normalizeSingleLine(formData.get("title")) ||
    titleFromQuestion(question) ||
    (linkSummary ? `链接复核: ${linkSummary.title}` : "");
  const description = normalizeMultiline(formData.get("description")) || question || linkSummary?.summary || "";

  return {
    id,
    createdAt,
    kind,
    title,
    description,
    link,
    customerWords: normalizeSingleLine(formData.get("customerWords")) || normalizeSingleLine(question),
    device: normalizeSingleLine(formData.get("device")),
    contact: normalizeSingleLine(formData.get("contact")),
    priority: kind === "missing_problem" ? "high" : "normal",
    status: "open",
    source: "website"
  };
}

function validateSubmission(submission: FeedbackSubmission) {
  if (!submission.description && !submission.link) return "请填写问题，或粘贴一个链接。";
  if (submission.kind === "missing_problem" && submission.description.length < 3) return "请简单描述一下问题。";
  if (submission.kind === "link_review" && !submission.link) return "请粘贴一个有效链接。";
  return null;
}

function buildDailyWorkItem(submission: FeedbackSubmission) {
  const lines = [
    `- [ ] ${submission.priority === "high" ? "P1" : "P2"} ${submission.id} ${submission.title}`,
    `  - 类型: ${submission.kind}`,
    `  - 优先级: ${submission.priority === "high" ? "高" : "普通"}`,
    `  - 来源: 网站反馈表单`,
    `  - 创建时间: ${submission.createdAt}`,
    `  - 链接: ${submission.link || "未填写"}`,
    `  - 设备: ${submission.device || "未填写"}`,
    `  - 顾客原话: ${submission.customerWords || "未填写"}`,
    `  - 联系方式: ${submission.contact || "未填写"}`,
    `  - 下一步: ${submission.kind === "link_review" ? "复核链接摘要，整理问题、经验和答案。" : "高优先级复核问题，与现有知识库条目去重，然后新增 Markdown 条目。"}`,
    `  - 备注: ${submission.description.replace(/\n/g, " ")}`
  ];

  return `${lines.join("\n")}\n`;
}

async function ensureStore() {
  if (process.env.VERCEL) {
    await fs.mkdir(runtimeFeedbackRoot, { recursive: true });
    return;
  }

  await fs.mkdir(persistentFeedbackRoot, { recursive: true });
  await fs.mkdir(persistentTodoRoot, { recursive: true });
  try {
    await fs.access(persistentDailyWorkPath);
  } catch {
    await fs.writeFile(
      persistentDailyWorkPath,
      "# 每日工作收集\n\n这里记录从 Apple Cookbook 网站收集到的待处理事项。请在每日复核中整理，并将确认有效的内容转成知识库新条目或文章更新。\n\n",
      "utf8"
    );
  }
}

export async function saveFeedback(formData: FormData) {
  const submission = await buildSubmission(formData);
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
    await fs.appendFile(persistentInboxPath, `${JSON.stringify(submission)}\n`, "utf8");
    await fs.appendFile(persistentDailyWorkPath, buildDailyWorkItem(submission), "utf8");
  }

  return { ok: true as const, id: submission.id };
}
