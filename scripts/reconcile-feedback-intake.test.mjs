import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, test } from "node:test";
import {
  normalizeAutomationReviewSummary,
  reconcileFeedbackFiles,
  reconcileFeedbackRecords
} from "./reconcile-feedback-intake.mjs";

const temporaryRoots = [];
const now = "2026-07-14T08:00:00.000Z";

function submission(id, status = "open") {
  return {
    id,
    createdAt: "2026-07-14T06:00:00.000Z",
    kind: "content_bug",
    title: `内容 Bug ${id}`,
    description: "测试反馈",
    status,
    source: "website"
  };
}

afterEach(async () => {
  await Promise.all(temporaryRoots.splice(0).map((root) => fs.rm(root, { recursive: true, force: true })));
});

test("keeps AI no-change feedback active for human review with a structured summary", () => {
  const result = reconcileFeedbackRecords({
    inboxRecords: [submission("AC-REVIEW")],
    archiveRecords: [],
    syncedIds: new Set(["AC-REVIEW"]),
    decisions: [
      {
        id: "AC-REVIEW",
        action: "needs_review",
        reviewedAt: "2026-07-14T07:30:00Z",
        summary:
          "<!-- apple-cookbook-automation-review:no_content_change -->\n" +
          "Mac mini 已完成验证，但没有发现需要发布的内容修改。\n\n当前文章已经包含该步骤。",
        issueUrl: "https://github.com/example/repo/issues/42"
      }
    ],
    now
  });

  assert.equal(result.needsReviewCount, 1);
  assert.equal(result.resolvedCount, 0);
  assert.equal(result.archiveRecords.length, 0);
  assert.deepEqual(result.inboxRecords[0].automationReview, {
    outcome: "no_content_change",
    reviewedAt: "2026-07-14T07:30:00.000Z",
    summary: "当前文章已经包含该步骤。",
    issueUrl: "https://github.com/example/repo/issues/42"
  });
  assert.equal(result.inboxRecords[0].status, "needs_review");
  assert.equal(result.inboxRecords[0].updatedAt, now);
});

test("archives an ordinarily closed synced feedback Issue as resolved", () => {
  const result = reconcileFeedbackRecords({
    inboxRecords: [submission("AC-RESOLVED")],
    archiveRecords: [submission("AC-OLD", "dismissed")],
    syncedIds: new Set(["AC-RESOLVED"]),
    decisions: [{ id: "AC-RESOLVED", action: "resolved", reviewedAt: now }],
    now
  });

  assert.equal(result.inboxRecords.length, 0);
  assert.equal(result.resolvedCount, 1);
  assert.deepEqual(result.archiveRecords.map((item) => item.id), ["AC-RESOLVED", "AC-OLD"]);
  assert.equal(result.archiveRecords[0].status, "resolved");
  assert.equal(result.archiveRecords[0].adminNote, "GitHub P0 issue 已关闭，自动归档。");
});

test("ignores a stale closed Issue after an administrator removes the synced marker", () => {
  const result = reconcileFeedbackRecords({
    inboxRecords: [
      {
        ...submission("AC-REQUEUED"),
        automationReview: {
          outcome: "no_content_change",
          reviewedAt: "2026-07-14T07:00:00.000Z",
          summary: "旧结论",
          issueUrl: "https://github.com/example/repo/issues/40"
        }
      }
    ],
    archiveRecords: [],
    syncedIds: new Set(),
    decisions: [
      {
        id: "AC-REQUEUED",
        action: "needs_review",
        reviewedAt: "2026-07-14T07:00:00.000Z",
        summary: "旧结论",
        issueUrl: "https://github.com/example/repo/issues/40"
      }
    ],
    now
  });

  assert.equal(result.skippedUnsyncedCount, 1);
  assert.equal(result.inboxRecords[0].status, "open");
  assert.equal(result.archiveRecords.length, 0);
});

test("file reconciliation checks the current synced marker before writing queues", async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "apple-cookbook-reconcile-feedback-"));
  temporaryRoots.push(root);
  const feedbackRoot = path.join(root, "feedback");
  const decisionsFile = path.join(root, "decisions.jsonl");
  await fs.mkdir(feedbackRoot, { recursive: true });
  await fs.writeFile(path.join(feedbackRoot, "inbox.jsonl"), `${JSON.stringify(submission("AC-FILE"))}\n`);
  await fs.writeFile(path.join(feedbackRoot, "archive.jsonl"), "");
  await fs.writeFile(path.join(feedbackRoot, "synced-github-issues.txt"), "");
  await fs.writeFile(
    decisionsFile,
    `${JSON.stringify({ id: "AC-FILE", action: "resolved", reviewedAt: now })}\n`
  );

  const result = reconcileFeedbackFiles({ dataDir: root, decisionsFile, now });
  const persistedInbox = (await fs.readFile(path.join(feedbackRoot, "inbox.jsonl"), "utf8")).trim();
  const persistedArchive = await fs.readFile(path.join(feedbackRoot, "archive.jsonl"), "utf8");

  assert.equal(result.skippedUnsyncedCount, 1);
  assert.equal(JSON.parse(persistedInbox).status, "open");
  assert.equal(persistedArchive, "");
});

test("normalizes an empty automation summary to a useful fallback", () => {
  assert.equal(
    normalizeAutomationReviewSummary("<!-- apple-cookbook-automation-review:no_content_change -->"),
    "自动验证未发现需要发布的内容修改，未提供进一步说明。"
  );
});
