import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { atomicWriteText, withFileLock } from "./file-store.ts";

export const aiDataRoot = process.env.APPLE_COOKBOOK_DATA_DIR ?? process.cwd();

export type AiUsageLog = {
  provider: "deepseek";
  model: string;
  operation: "analyze" | "search";
  success: boolean;
  latencyMs: number;
  inputTokens: number | null;
  outputTokens: number | null;
  estimatedCost: number | null;
  errorCode: string | null;
  createdAt: string;
};

type JsonRecord = Record<string, unknown>;

function paths(root = aiDataRoot) {
  const directory = path.join(root, "ai");
  return {
    directory,
    lockPath: path.join(directory, ".ai.lock"),
    search: path.join(directory, "search-logs.jsonl"),
    questions: path.join(directory, "questions.jsonl"),
    feedback: path.join(directory, "feedback.jsonl"),
    usage: path.join(directory, "usage.jsonl")
  };
}

export function getAiStorageUnavailableReason() {
  return process.env.VERCEL ? "当前部署环境不提供持久化 AI 匿名记录。" : null;
}

export function hashAnonymousSession(sessionId: string) {
  const salt = process.env.APPLE_COOKBOOK_ADMIN_TOKEN ?? "apple-cookbook-ai-anonymous-session-v1";
  return crypto.createHash("sha256").update(`${salt}\0${sessionId}`).digest("hex");
}

async function append(filePath: string, entry: JsonRecord, root = aiDataRoot) {
  if (getAiStorageUnavailableReason()) return;
  const store = paths(root);
  await fs.mkdir(store.directory, { recursive: true });
  await withFileLock(store.lockPath, async () => {
    let current = "";
    try {
      current = await fs.readFile(filePath, "utf8");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
    await atomicWriteText(filePath, `${current}${current && !current.endsWith("\n") ? "\n" : ""}${JSON.stringify(entry)}\n`);
  });
}

export async function recordSearchLog(entry: JsonRecord) {
  await append(paths().search, entry);
}

export async function recordAiQuestion(entry: JsonRecord) {
  await append(paths().questions, entry);
}

export async function recordAiFeedback(entry: JsonRecord) {
  await append(paths().feedback, entry);
}

export async function recordAiUsage(entry: AiUsageLog) {
  await append(paths().usage, entry as unknown as JsonRecord);
}

export async function countUsageToday(root = aiDataRoot) {
  const usagePath = paths(root).usage;
  const datePrefix = new Date().toISOString().slice(0, 10);
  try {
    const records = (await fs.readFile(usagePath, "utf8")).split("\n");
    return records.reduce((total, line) => {
      if (!line) return total;
      try {
        const entry = JSON.parse(line) as Partial<AiUsageLog>;
        return entry.success === true && entry.createdAt?.startsWith(datePrefix) ? total + 1 : total;
      } catch {
        return total;
      }
    }, 0);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return 0;
    throw error;
  }
}
