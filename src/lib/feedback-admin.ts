import fs from "node:fs/promises";
import crypto from "node:crypto";
import path from "node:path";
import { feedbackDataRoot, type FeedbackSubmission } from "@/lib/feedback";

export type FeedbackStatus = FeedbackSubmission["status"];

export type AdminFeedbackItem = FeedbackSubmission & {
  priority: "P0";
  syncedToGithub: boolean;
};

const feedbackRoot = path.join(feedbackDataRoot, "feedback");
const inboxPath = path.join(feedbackRoot, "inbox.jsonl");
const syncedGithubIssuesPath = path.join(feedbackRoot, "synced-github-issues.txt");

function parseSubmission(line: string): FeedbackSubmission | null {
  try {
    const value = JSON.parse(line) as FeedbackSubmission;
    if (!value.id || !value.title) return null;
    return {
      ...value,
      status: value.status ?? "open"
    };
  } catch {
    return null;
  }
}

async function readSyncedIds() {
  try {
    const raw = await fs.readFile(syncedGithubIssuesPath, "utf8");
    return new Set(raw.split(/\r?\n/).filter(Boolean));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return new Set<string>();
    throw error;
  }
}

async function readSubmissions() {
  try {
    const raw = await fs.readFile(inboxPath, "utf8");
    return raw
      .split(/\r?\n/)
      .filter(Boolean)
      .map(parseSubmission)
      .filter((item): item is FeedbackSubmission => Boolean(item));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

export async function getAdminFeedbackItems(): Promise<AdminFeedbackItem[]> {
  const [submissions, syncedIds] = await Promise.all([readSubmissions(), readSyncedIds()]);

  return submissions
    .map((submission) => ({
      ...submission,
      priority: "P0" as const,
      syncedToGithub: syncedIds.has(submission.id)
    }))
    .sort((a, b) => {
      const statusRank: Record<FeedbackStatus, number> = {
        open: 0,
        in_progress: 1,
        resolved: 2,
        dismissed: 3
      };

      return statusRank[a.status] - statusRank[b.status] || b.createdAt.localeCompare(a.createdAt);
    });
}

export async function updateFeedbackStatus(id: string, status: FeedbackStatus, adminNote = "") {
  if (!id) throw new Error("Missing feedback id.");

  await fs.mkdir(feedbackRoot, { recursive: true });
  const submissions = await readSubmissions();
  const nextSubmissions = submissions.map((submission) =>
    submission.id === id
      ? {
          ...submission,
          status,
          adminNote: adminNote.trim(),
          updatedAt: new Date().toISOString()
        }
      : submission
  );

  if (!submissions.some((submission) => submission.id === id)) {
    throw new Error(`Feedback item not found: ${id}`);
  }

  await fs.writeFile(inboxPath, `${nextSubmissions.map((submission) => JSON.stringify(submission)).join("\n")}\n`, "utf8");
}

function getAdminUsername() {
  return process.env.APPLE_COOKBOOK_ADMIN_USERNAME || "admin";
}

function getAdminPassword() {
  return process.env.APPLE_COOKBOOK_ADMIN_PASSWORD || "";
}

function getSessionSecret() {
  return process.env.APPLE_COOKBOOK_ADMIN_TOKEN || getAdminPassword() || "local-admin-session";
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

export function canUseAdminCredentials(username: string, password: string) {
  const configuredPassword = getAdminPassword();

  if (!configuredPassword && process.env.NODE_ENV === "production") {
    return false;
  }

  if (!configuredPassword) {
    return username === getAdminUsername();
  }

  return safeEqual(username, getAdminUsername()) && safeEqual(password, configuredPassword);
}

export function createAdminSessionToken() {
  return crypto.createHmac("sha256", getSessionSecret()).update("apple-cookbook-admin").digest("hex");
}

export function canUseAdminSession(value: string | undefined) {
  if (!value) return false;
  return safeEqual(value, createAdminSessionToken());
}
