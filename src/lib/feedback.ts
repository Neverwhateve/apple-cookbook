import fs from "node:fs/promises";
import path from "node:path";

export type FeedbackKind = "missing_problem" | "article_feedback" | "workflow_request";

export type FeedbackSubmission = {
  id: string;
  createdAt: string;
  kind: FeedbackKind;
  title: string;
  description: string;
  customerWords: string;
  device: string;
  contact: string;
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
  if (value === "article_feedback" || value === "workflow_request") return value;
  return "missing_problem";
}

function buildSubmission(formData: FormData): FeedbackSubmission {
  const now = new Date();
  const createdAt = now.toISOString();
  const id = `AC-${createdAt.slice(0, 10).replaceAll("-", "")}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

  return {
    id,
    createdAt,
    kind: toFeedbackKind(normalizeSingleLine(formData.get("kind"))),
    title: normalizeSingleLine(formData.get("title")),
    description: normalizeMultiline(formData.get("description")),
    customerWords: normalizeSingleLine(formData.get("customerWords")),
    device: normalizeSingleLine(formData.get("device")),
    contact: normalizeSingleLine(formData.get("contact")),
    status: "open",
    source: "website"
  };
}

function validateSubmission(submission: FeedbackSubmission) {
  if (submission.title.length < 3) return "Add a short title so this can be tracked.";
  if (submission.description.length < 10) return "Add a little more detail about what happened.";
  return null;
}

function buildDailyWorkItem(submission: FeedbackSubmission) {
  const lines = [
    `- [ ] ${submission.id} ${submission.title}`,
    `  - Type: ${submission.kind}`,
    `  - Source: Website feedback form`,
    `  - Created: ${submission.createdAt}`,
    `  - Device: ${submission.device || "Not specified"}`,
    `  - Customer words: ${submission.customerWords || "Not specified"}`,
    `  - Contact: ${submission.contact || "Not specified"}`,
    `  - Next: Review sources, dedupe against cookbook articles, then create or update a Markdown recipe.`,
    `  - Notes: ${submission.description.replace(/\n/g, " ")}`
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
      "# Daily Work Intake\n\nOpen items collected from the Apple Cookbook website. Review these during daily work automation and turn accepted items into cookbook articles or article updates.\n\n",
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
