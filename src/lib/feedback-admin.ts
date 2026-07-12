import fs from "node:fs/promises";
import crypto from "node:crypto";
import path from "node:path";
import { feedbackDataRoot, type FeedbackSubmission } from "@/lib/feedback";

export type FeedbackStatus = FeedbackSubmission["status"];

export type AdminFeedbackItem = FeedbackSubmission & {
  priority: "P0";
  syncedToGithub: boolean;
  queuePosition: number;
};

export type AdminFeedbackQueues = {
  active: AdminFeedbackItem[];
  archived: AdminFeedbackItem[];
};

const feedbackRoot = path.join(feedbackDataRoot, "feedback");
const inboxPath = path.join(feedbackRoot, "inbox.jsonl");
const archivePath = path.join(feedbackRoot, "archive.jsonl");
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

async function readSubmissions(filePath = inboxPath) {
  try {
    const raw = await fs.readFile(filePath, "utf8");
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
  const queues = await getAdminFeedbackQueues();
  return [...queues.active, ...queues.archived];
}

function toAdminItems(submissions: FeedbackSubmission[], syncedIds: Set<string>) {
  return submissions
    .map((submission, index) => ({
      ...submission,
      priority: "P0" as const,
      syncedToGithub: syncedIds.has(submission.id),
      queuePosition: index + 1
    }))
    .sort((a, b) => {
      const statusRank: Record<FeedbackStatus, number> = {
        open: 0,
        in_progress: 1,
        resolved: 2,
        dismissed: 3
      };

      return statusRank[a.status] - statusRank[b.status] || a.queuePosition - b.queuePosition;
    });
}

export async function getAdminFeedbackQueues(): Promise<AdminFeedbackQueues> {
  let [activeSubmissions, archivedSubmissions] = await Promise.all([
    readSubmissions(inboxPath),
    readSubmissions(archivePath)
  ]);
  const syncedIds = await readSyncedIds();
  const shouldArchive = activeSubmissions.filter(
    (submission) => submission.status === "resolved" || submission.status === "dismissed"
  );

  if (shouldArchive.length) {
    const archivedIds = new Set(archivedSubmissions.map((submission) => submission.id));
    activeSubmissions = activeSubmissions.filter(
      (submission) => submission.status !== "resolved" && submission.status !== "dismissed"
    );
    archivedSubmissions = [
      ...shouldArchive.filter((submission) => !archivedIds.has(submission.id)),
      ...archivedSubmissions
    ];
    await Promise.all([writeSubmissions(inboxPath, activeSubmissions), writeSubmissions(archivePath, archivedSubmissions)]);
  }

  return {
    active: toAdminItems(activeSubmissions, syncedIds),
    archived: toAdminItems(archivedSubmissions, syncedIds)
  };
}

async function writeSubmissions(filePath: string, submissions: FeedbackSubmission[]) {
  await fs.mkdir(feedbackRoot, { recursive: true });
  const body = submissions.length ? `${submissions.map((submission) => JSON.stringify(submission)).join("\n")}\n` : "";
  await fs.writeFile(filePath, body, "utf8");
}

export async function updateFeedbackStatus(id: string, status: FeedbackStatus, adminNote = "") {
  if (!id) throw new Error("Missing feedback id.");

  await fs.mkdir(feedbackRoot, { recursive: true });
  const [activeSubmissions, archivedSubmissions] = await Promise.all([readSubmissions(inboxPath), readSubmissions(archivePath)]);
  const activeIndex = activeSubmissions.findIndex((submission) => submission.id === id);
  const archivedIndex = archivedSubmissions.findIndex((submission) => submission.id === id);

  if (activeIndex === -1 && archivedIndex === -1) {
    throw new Error(`Feedback item not found: ${id}`);
  }

  const source = activeIndex === -1 ? archivedSubmissions : activeSubmissions;
  const sourceIndex = activeIndex === -1 ? archivedIndex : activeIndex;
  const nextItem = {
    ...source[sourceIndex],
    status,
    adminNote: adminNote.trim(),
    updatedAt: new Date().toISOString()
  };

  if (activeIndex !== -1) {
    activeSubmissions.splice(activeIndex, 1);
  } else {
    archivedSubmissions.splice(archivedIndex, 1);
  }

  if (status === "resolved" || status === "dismissed") {
    archivedSubmissions.unshift(nextItem);
  } else {
    activeSubmissions.unshift(nextItem);
  }

  await Promise.all([writeSubmissions(inboxPath, activeSubmissions), writeSubmissions(archivePath, archivedSubmissions)]);
}

export async function moveFeedbackItem(id: string, direction: "first" | "last") {
  if (!id) throw new Error("Missing feedback id.");

  const submissions = await readSubmissions(inboxPath);
  const currentIndex = submissions.findIndex((submission) => submission.id === id);

  if (currentIndex === -1) {
    throw new Error(`Feedback item not found: ${id}`);
  }

  const [item] = submissions.splice(currentIndex, 1);

  if (direction === "first") {
    submissions.unshift(item);
  } else {
    submissions.push(item);
  }

  await writeSubmissions(inboxPath, submissions);
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
