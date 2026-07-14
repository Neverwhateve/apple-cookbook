#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const reviewMarker = "<!-- apple-cookbook-automation-review:no_content_change -->";
const noChangeHeading = "Mac mini 已完成验证，但没有发现需要发布的内容修改。";
const activeStatuses = new Set(["open", "in_progress"]);
const decisionActions = new Set(["needs_review", "resolved"]);

function parseJsonLines(raw, label) {
  return raw
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line, index) => {
      try {
        return JSON.parse(line);
      } catch {
        throw new Error(`${label} contains invalid JSON on line ${index + 1}.`);
      }
    });
}

function readJsonLines(filePath) {
  return fs.existsSync(filePath) ? parseJsonLines(fs.readFileSync(filePath, "utf8"), filePath) : [];
}

function readSyncedIds(filePath) {
  if (!fs.existsSync(filePath)) return new Set();
  return new Set(fs.readFileSync(filePath, "utf8").split(/\r?\n/).map((line) => line.trim()).filter(Boolean));
}

function normalizeTimestamp(value, fallback) {
  return typeof value === "string" && !Number.isNaN(Date.parse(value)) ? new Date(value).toISOString() : fallback;
}

export function normalizeAutomationReviewSummary(value) {
  const summary = String(value ?? "")
    .replaceAll(reviewMarker, "")
    .replace(noChangeHeading, "")
    .trim()
    .slice(0, 4000);

  return summary || "自动验证未发现需要发布的内容修改，未提供进一步说明。";
}

function normalizeDecision(value, now) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Feedback reconciliation decision must be an object.");
  }

  const id = typeof value.id === "string" ? value.id.trim() : "";
  const action = typeof value.action === "string" ? value.action : "";
  if (!id) throw new Error("Feedback reconciliation decision is missing id.");
  if (!decisionActions.has(action)) throw new Error(`Unsupported feedback reconciliation action: ${action || "missing"}.`);

  return {
    id,
    action,
    reviewedAt: normalizeTimestamp(value.reviewedAt, now),
    summary: normalizeAutomationReviewSummary(value.summary),
    issueUrl: typeof value.issueUrl === "string" ? value.issueUrl.trim().slice(0, 500) : ""
  };
}

export function reconcileFeedbackRecords({
  inboxRecords,
  archiveRecords,
  syncedIds,
  decisions,
  now = new Date().toISOString()
}) {
  const normalizedNow = normalizeTimestamp(now, new Date().toISOString());
  const decisionsById = new Map(decisions.map((decision) => {
    const normalized = normalizeDecision(decision, normalizedNow);
    return [normalized.id, normalized];
  }));
  const currentSyncedIds = syncedIds instanceof Set ? syncedIds : new Set(syncedIds);
  const nextInbox = [];
  const resolvedItems = [];
  let needsReviewCount = 0;
  let resolvedCount = 0;
  let skippedUnsyncedCount = 0;

  for (const item of inboxRecords) {
    const decision = decisionsById.get(item.id);
    if (!decision || !activeStatuses.has(item.status ?? "open")) {
      nextInbox.push(item);
      continue;
    }

    // An administrator re-queues an AI-rejected item by removing this marker
    // under the same ECS lock. A stale closed Issue must never override that
    // newer human decision.
    if (!currentSyncedIds.has(item.id)) {
      skippedUnsyncedCount += 1;
      nextInbox.push(item);
      continue;
    }

    if (decision.action === "needs_review") {
      nextInbox.push({
        ...item,
        status: "needs_review",
        updatedAt: normalizedNow,
        automationReview: {
          outcome: "no_content_change",
          reviewedAt: decision.reviewedAt,
          summary: decision.summary,
          issueUrl: decision.issueUrl
        }
      });
      needsReviewCount += 1;
      continue;
    }

    resolvedItems.push({
      ...item,
      status: "resolved",
      updatedAt: normalizedNow,
      adminNote: "GitHub P0 issue 已关闭，自动归档。"
    });
    resolvedCount += 1;
  }

  const archivedIds = new Set(archiveRecords.map((item) => item.id));
  const nextArchive = [
    ...resolvedItems.filter((item) => !archivedIds.has(item.id)),
    ...archiveRecords
  ];

  return {
    inboxRecords: nextInbox,
    archiveRecords: nextArchive,
    needsReviewCount,
    resolvedCount,
    skippedUnsyncedCount
  };
}

function atomicWriteJsonLines(filePath, records) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const temporaryPath = path.join(
    path.dirname(filePath),
    `.${path.basename(filePath)}.${process.pid}.${crypto.randomUUID()}.tmp`
  );
  const body = records.map((record) => JSON.stringify(record)).join("\n") + (records.length ? "\n" : "");
  const descriptor = fs.openSync(temporaryPath, "wx", 0o600);

  try {
    fs.writeFileSync(descriptor, body, "utf8");
    fs.fsyncSync(descriptor);
  } finally {
    fs.closeSync(descriptor);
  }

  fs.renameSync(temporaryPath, filePath);
}

function parseArguments(argv) {
  const values = new Map();
  for (let index = 0; index < argv.length; index += 2) {
    const key = argv[index];
    const value = argv[index + 1];
    if (!key?.startsWith("--") || !value) throw new Error(`Invalid argument: ${key ?? "missing"}`);
    values.set(key.slice(2), value);
  }
  return values;
}

export function reconcileFeedbackFiles({ dataDir, decisionsFile, now = new Date().toISOString() }) {
  const feedbackRoot = path.join(dataDir, "feedback");
  const inboxPath = path.join(feedbackRoot, "inbox.jsonl");
  const archivePath = path.join(feedbackRoot, "archive.jsonl");
  const syncedIdsPath = path.join(feedbackRoot, "synced-github-issues.txt");
  const result = reconcileFeedbackRecords({
    inboxRecords: readJsonLines(inboxPath),
    archiveRecords: readJsonLines(archivePath),
    syncedIds: readSyncedIds(syncedIdsPath),
    decisions: readJsonLines(decisionsFile),
    now
  });

  atomicWriteJsonLines(inboxPath, result.inboxRecords);
  atomicWriteJsonLines(archivePath, result.archiveRecords);
  return result;
}

const executedPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
if (executedPath === fileURLToPath(import.meta.url)) {
  try {
    const args = parseArguments(process.argv.slice(2));
    const dataDir = args.get("data-dir");
    const decisionsFile = args.get("decisions-file");
    if (!dataDir) throw new Error("--data-dir is required.");
    if (!decisionsFile) throw new Error("--decisions-file is required.");

    const result = reconcileFeedbackFiles({
      dataDir: path.resolve(dataDir),
      decisionsFile: path.resolve(decisionsFile)
    });
    console.log(
      `Feedback reconciliation: ${result.needsReviewCount} awaiting human review, ` +
      `${result.resolvedCount} resolved, ${result.skippedUnsyncedCount} stale decisions skipped.`
    );
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Feedback reconciliation failed.");
    process.exitCode = 1;
  }
}
