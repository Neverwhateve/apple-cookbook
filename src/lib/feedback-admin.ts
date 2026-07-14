import fs from "node:fs/promises";
import crypto from "node:crypto";
import path from "node:path";
import { atomicWriteText, withFileLock } from "./file-store.ts";
import {
  feedbackDataRoot,
  getFeedbackQueueLockPath,
  getFeedbackStorageUnavailableReason,
  type FeedbackSubmission
} from "./feedback.ts";

export type FeedbackStatus = FeedbackSubmission["status"];

export type AdminFeedbackItem = FeedbackSubmission & {
  priority: "P0" | null;
  syncedToGithub: boolean;
  queuePosition: number;
};

export type AdminFeedbackQueues = {
  review: AdminFeedbackItem[];
  active: AdminFeedbackItem[];
  archived: AdminFeedbackItem[];
};

const localDevelopmentSessionSecret = "apple-cookbook-local-development-session";
const minimumAdminTokenLength = 43;
const minimumAdminTokenEntropyBits = 128;

function parseSubmission(line: string): FeedbackSubmission | null {
  try {
    const value = JSON.parse(line) as FeedbackSubmission;
    if (!value.id || !value.title) return null;
    return {
      ...value,
      reporterName: value.reporterName ?? "",
      reporterVerified: value.reporterVerified === true,
      status: value.status ?? "open"
    };
  } catch {
    return null;
  }
}

function getAdminStorePaths(root = feedbackDataRoot) {
  const feedbackRoot = path.join(root, "feedback");

  return {
    feedbackRoot,
    inboxPath: path.join(feedbackRoot, "inbox.jsonl"),
    archivePath: path.join(feedbackRoot, "archive.jsonl"),
    syncedGithubIssuesPath: path.join(feedbackRoot, "synced-github-issues.txt"),
    lockPath: getFeedbackQueueLockPath(root)
  };
}

async function readSyncedIds(filePath: string) {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return new Set(raw.split(/\r?\n/).filter(Boolean));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return new Set<string>();
    throw error;
  }
}

async function readSubmissions(filePath: string) {
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

export async function getAdminFeedbackItems(root = feedbackDataRoot): Promise<AdminFeedbackItem[]> {
  const queues = await getAdminFeedbackQueues(root);
  return [...queues.review, ...queues.active, ...queues.archived];
}

function toAdminItems(submissions: FeedbackSubmission[], syncedIds: Set<string>) {
  return submissions
    .map((submission, index) => ({
      ...submission,
      priority: submission.status === "needs_review" ? null : ("P0" as const),
      syncedToGithub: syncedIds.has(submission.id),
      queuePosition: index + 1
    }))
    .sort((a, b) => {
      const statusRank: Record<FeedbackStatus, number> = {
        open: 0,
        in_progress: 1,
        needs_review: 2,
        resolved: 3,
        dismissed: 4
      };

      return statusRank[a.status] - statusRank[b.status] || a.queuePosition - b.queuePosition;
    });
}

async function readAdminFeedbackQueues(paths: ReturnType<typeof getAdminStorePaths>): Promise<AdminFeedbackQueues> {
  const [inboxSubmissions, archiveSubmissions] = await Promise.all([
    readSubmissions(paths.inboxPath),
    readSubmissions(paths.archivePath)
  ]);
  const syncedIds = await readSyncedIds(paths.syncedGithubIssuesPath);
  const legacyArchived = inboxSubmissions.filter(
    (submission) => submission.status === "resolved" || submission.status === "dismissed"
  );
  const archivedIds = new Set(archiveSubmissions.map((submission) => submission.id));
  const activeSubmissions = inboxSubmissions.filter(
    (submission) => submission.status === "open" || submission.status === "in_progress"
  );
  const reviewSubmissions = inboxSubmissions.filter((submission) => submission.status === "needs_review");
  const archivedSubmissions = [
    ...legacyArchived.filter((submission) => !archivedIds.has(submission.id)),
    ...archiveSubmissions
  ];

  return {
    review: toAdminItems(reviewSubmissions, syncedIds),
    active: toAdminItems(activeSubmissions, syncedIds),
    archived: toAdminItems(archivedSubmissions, syncedIds)
  };
}

export async function getAdminFeedbackQueues(root = feedbackDataRoot): Promise<AdminFeedbackQueues> {
  const paths = getAdminStorePaths(root);

  // A read-only deployment cannot create a lock and has no competing local
  // writers, so read its snapshot directly. Writable stores use the same lock
  // as mutations to avoid observing the gap between two atomic file renames.
  if (getFeedbackStorageUnavailableReason()) {
    return readAdminFeedbackQueues(paths);
  }

  try {
    await fs.access(paths.feedbackRoot);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return readAdminFeedbackQueues(paths);
    }
    throw error;
  }

  return withFileLock(paths.lockPath, () => readAdminFeedbackQueues(paths));
}

async function writeSubmissions(filePath: string, submissions: FeedbackSubmission[]) {
  const body = submissions.length ? `${submissions.map((submission) => JSON.stringify(submission)).join("\n")}\n` : "";
  await atomicWriteText(filePath, body);
}

async function writeSyncedIds(filePath: string, ids: Set<string>) {
  const body = [...ids].sort().join("\n");
  await atomicWriteText(filePath, body ? `${body}\n` : "");
}

export async function updateFeedbackStatus(id: string, status: FeedbackStatus, adminNote = "", root = feedbackDataRoot) {
  if (!id) throw new Error("Missing feedback id.");

  const storageUnavailableReason = getFeedbackStorageUnavailableReason();
  if (storageUnavailableReason) throw new Error(storageUnavailableReason);

  const paths = getAdminStorePaths(root);

  await withFileLock(paths.lockPath, async () => {
    await fs.mkdir(paths.feedbackRoot, { recursive: true });
    const [activeSubmissions, archivedSubmissions] = await Promise.all([
      readSubmissions(paths.inboxPath),
      readSubmissions(paths.archivePath)
    ]);
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

    await Promise.all([
      writeSubmissions(paths.inboxPath, activeSubmissions),
      writeSubmissions(paths.archivePath, archivedSubmissions)
    ]);
  });
}

export async function moveFeedbackItem(id: string, direction: "first" | "last", root = feedbackDataRoot) {
  if (!id) throw new Error("Missing feedback id.");

  const storageUnavailableReason = getFeedbackStorageUnavailableReason();
  if (storageUnavailableReason) throw new Error(storageUnavailableReason);

  const paths = getAdminStorePaths(root);

  await withFileLock(paths.lockPath, async () => {
    const submissions = await readSubmissions(paths.inboxPath);
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

    await writeSubmissions(paths.inboxPath, submissions);
  });
}

/**
 * Promotes a human-reviewed item back into the P0 intake exactly once.
 *
 * Removing the synchronization marker makes the next feedback-sync run create
 * a fresh GitHub Issue. The original AI review Issue stays closed as audit
 * history instead of being silently reused.
 */
export async function queueFeedbackForHarvest(id: string, adminNote = "", root = feedbackDataRoot) {
  if (!id) throw new Error("Missing feedback id.");

  const storageUnavailableReason = getFeedbackStorageUnavailableReason();
  if (storageUnavailableReason) throw new Error(storageUnavailableReason);

  const paths = getAdminStorePaths(root);

  return withFileLock(paths.lockPath, async () => {
    await fs.mkdir(paths.feedbackRoot, { recursive: true });
    const [activeSubmissions, archivedSubmissions, syncedIds] = await Promise.all([
      readSubmissions(paths.inboxPath),
      readSubmissions(paths.archivePath),
      readSyncedIds(paths.syncedGithubIssuesPath)
    ]);
    const activeIndex = activeSubmissions.findIndex((submission) => submission.id === id);
    const archivedIndex = archivedSubmissions.findIndex((submission) => submission.id === id);

    if (activeIndex === -1 && archivedIndex === -1) {
      throw new Error(`Feedback item not found: ${id}`);
    }

    const source = activeIndex === -1 ? archivedSubmissions : activeSubmissions;
    const sourceIndex = activeIndex === -1 ? archivedIndex : activeIndex;
    const current = source[sourceIndex];

    // A first promotion already removed the marker and placed the item in the
    // open queue. Treat retries/double-clicks as idempotent so they cannot
    // dispatch duplicate P0 work.
    if (current.status === "open" && !syncedIds.has(id)) {
      return { queued: false as const };
    }

    const nextItem: FeedbackSubmission = {
      ...current,
      status: "open",
      adminNote: adminNote.trim() || "管理员复核后确认有效，重新进入 P0。",
      updatedAt: new Date().toISOString()
    };

    if (activeIndex !== -1) {
      activeSubmissions.splice(activeIndex, 1);
    } else {
      archivedSubmissions.splice(archivedIndex, 1);
    }

    activeSubmissions.unshift(nextItem);
    syncedIds.delete(id);

    await Promise.all([
      writeSubmissions(paths.inboxPath, activeSubmissions),
      writeSubmissions(paths.archivePath, archivedSubmissions),
      writeSyncedIds(paths.syncedGithubIssuesPath, syncedIds)
    ]);

    return { queued: true as const };
  });
}

function getAdminUsername() {
  return process.env.APPLE_COOKBOOK_ADMIN_USERNAME || "admin";
}

function getAdminPassword() {
  return process.env.APPLE_COOKBOOK_ADMIN_PASSWORD || "";
}

function getAdminToken() {
  return process.env.APPLE_COOKBOOK_ADMIN_TOKEN || "";
}

function estimateEntropyBits(value: string) {
  const counts = new Map<string, number>();

  for (const character of value) {
    counts.set(character, (counts.get(character) ?? 0) + 1);
  }

  return [...counts.values()].reduce((entropy, count) => {
    const probability = count / value.length;
    return entropy - probability * Math.log2(probability) * value.length;
  }, 0);
}

function hasHighEntropyAdminToken(value: string) {
  return (
    value === value.trim() &&
    value.length >= minimumAdminTokenLength &&
    estimateEntropyBits(value) >= minimumAdminTokenEntropyBits
  );
}

function hasProductionAdminConfiguration() {
  return Boolean(getAdminPassword()) && hasHighEntropyAdminToken(getAdminToken());
}

function getSessionSecret() {
  if (process.env.NODE_ENV === "production") {
    return hasProductionAdminConfiguration() ? getAdminToken() : null;
  }

  return getAdminToken() || getAdminPassword() || localDevelopmentSessionSecret;
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

export function canUseAdminCredentials(username: string, password: string) {
  const configuredPassword = getAdminPassword();

  if (process.env.NODE_ENV === "production" && !hasProductionAdminConfiguration()) {
    return false;
  }

  if (!configuredPassword) {
    return username === getAdminUsername();
  }

  return safeEqual(username, getAdminUsername()) && safeEqual(password, configuredPassword);
}

export function createAdminSessionToken() {
  const sessionSecret = getSessionSecret();

  if (!sessionSecret) {
    throw new Error("Admin authentication is not configured for production.");
  }

  return crypto.createHmac("sha256", sessionSecret).update("apple-cookbook-admin").digest("hex");
}

export function canUseAdminSession(value: string | undefined) {
  if (!value) return false;

  const sessionSecret = getSessionSecret();
  if (!sessionSecret) return false;

  const expected = crypto.createHmac("sha256", sessionSecret).update("apple-cookbook-admin").digest("hex");
  return safeEqual(value, expected);
}
