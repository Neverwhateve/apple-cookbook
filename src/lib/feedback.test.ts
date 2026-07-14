import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, it } from "node:test";
import { withFileLock } from "./file-store.ts";
import { getAdminFeedbackQueues, queueFeedbackForHarvest, updateFeedbackStatus } from "./feedback-admin.ts";
import { getFeedbackQueueLockPath, saveFeedback, type FeedbackSubmission } from "./feedback.ts";

const temporaryRoots: string[] = [];

async function makeTemporaryRoot() {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "apple-cookbook-feedback-test-"));
  temporaryRoots.push(root);
  return root;
}

function makeForm(index: number) {
  const formData = new FormData();
  formData.set("kind", "missing_problem");
  formData.set("title", `并发反馈 ${index}`);
  formData.set("content", `这是第 ${index} 条并发反馈内容。`);
  return formData;
}

function makeSubmission(index: number, status: FeedbackSubmission["status"] = "open"): FeedbackSubmission {
  return {
    id: `AC-TEST-${index}`,
    createdAt: new Date(2026, 6, 13, 0, 0, index).toISOString(),
    kind: "missing_problem",
    title: `测试反馈 ${index}`,
    description: `测试反馈内容 ${index}`,
    customerWords: "",
    device: "iPhone",
    reporterName: "测试用户",
    reporterVerified: false,
    contact: "",
    sourceTitle: "",
    sourceUrl: "",
    status,
    source: "website"
  };
}

async function writeQueue(filePath: string, submissions: FeedbackSubmission[]) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(
    filePath,
    submissions.length ? `${submissions.map((submission) => JSON.stringify(submission)).join("\n")}\n` : "",
    "utf8"
  );
}

afterEach(async () => {
  await Promise.all(temporaryRoots.splice(0).map((root) => fs.rm(root, { recursive: true, force: true })));
});

describe("feedback file store", () => {
  it("requires a reporter name for content Bug submissions", async () => {
    const root = await makeTemporaryRoot();
    const formData = new FormData();
    formData.set("kind", "content_bug");
    formData.set("title", "内容 Bug：测试文章");
    formData.set("description", "第二步的设置名称已经过期。");

    const missingName = await saveFeedback(formData, root);
    assert.equal(missingName.ok, false);
    assert.match(missingName.error, /名字/);

    formData.set("reporterName", "小陈");
    const accepted = await saveFeedback(formData, root);
    assert.equal(accepted.ok, true);
  });

  it("recovers an abandoned stale directory lock", async () => {
    const root = await makeTemporaryRoot();
    const lockPath = getFeedbackQueueLockPath(root);
    const oldDate = new Date(Date.now() - 10_000);

    await fs.mkdir(lockPath, { recursive: true });
    await fs.writeFile(path.join(lockPath, "owner.json"), JSON.stringify({ token: "abandoned" }), "utf8");
    await fs.utimes(lockPath, oldDate, oldDate);

    const result = await withFileLock(lockPath, async () => "recovered", {
      staleMs: 100,
      timeoutMs: 1_000,
      retryDelayMs: 5
    });

    assert.equal(result, "recovered");
    await assert.rejects(fs.access(lockPath), { code: "ENOENT" });
  });

  it("serializes concurrent submissions without losing inbox or daily-work entries", async () => {
    const root = await makeTemporaryRoot();
    const submissionCount = 24;
    const results = await Promise.all(
      Array.from({ length: submissionCount }, (_, index) => saveFeedback(makeForm(index), root))
    );

    assert.ok(results.every((result) => result.ok));

    const inbox = await fs.readFile(path.join(root, "feedback", "inbox.jsonl"), "utf8");
    const submissions = inbox
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => JSON.parse(line) as FeedbackSubmission);
    const dailyWork = await fs.readFile(path.join(root, "todos", "daily-work.md"), "utf8");

    assert.equal(submissions.length, submissionCount);
    assert.equal(new Set(submissions.map((submission) => submission.id)).size, submissionCount);
    assert.equal(dailyWork.match(/^- \[ \] \[P0\]/gm)?.length, submissionCount);
    await assert.rejects(fs.access(getFeedbackQueueLockPath(root)), { code: "ENOENT" });
  });

  it("moves concurrent administrator updates without overwriting sibling changes", async () => {
    const root = await makeTemporaryRoot();
    const submissions = Array.from({ length: 16 }, (_, index) => makeSubmission(index));
    const inboxPath = path.join(root, "feedback", "inbox.jsonl");

    await writeQueue(inboxPath, submissions);
    await Promise.all(
      submissions.map((submission) => updateFeedbackStatus(submission.id, "resolved", "并发归档", root))
    );

    const queues = await getAdminFeedbackQueues(root);
    assert.equal(queues.active.length, 0);
    assert.equal(queues.archived.length, submissions.length);
    assert.equal(new Set(queues.archived.map((submission) => submission.id)).size, submissions.length);
    assert.ok(queues.archived.every((submission) => submission.adminNote === "并发归档"));
  });

  it("keeps queue reads side-effect free while presenting legacy resolved items as archived", async () => {
    const root = await makeTemporaryRoot();
    const inboxPath = path.join(root, "feedback", "inbox.jsonl");
    const original = [makeSubmission(1), makeSubmission(2, "resolved")];

    await writeQueue(inboxPath, original);
    const before = await fs.readFile(inboxPath, "utf8");
    const beforeStat = await fs.stat(inboxPath);
    const queues = await getAdminFeedbackQueues(root);
    const after = await fs.readFile(inboxPath, "utf8");
    const afterStat = await fs.stat(inboxPath);

    assert.equal(after, before);
    assert.equal(afterStat.mtimeMs, beforeStat.mtimeMs);
    assert.deepEqual(queues.active.map((item) => item.id), ["AC-TEST-1"]);
    assert.deepEqual(queues.review, []);
    assert.deepEqual(queues.archived.map((item) => item.id), ["AC-TEST-2"]);
    await assert.rejects(fs.access(path.join(root, "feedback", "archive.jsonl")), { code: "ENOENT" });
  });

  it("keeps AI no-change decisions in a separate human review queue", async () => {
    const root = await makeTemporaryRoot();
    const reviewItem: FeedbackSubmission = {
      ...makeSubmission(1, "needs_review"),
      automationReview: {
        outcome: "no_content_change",
        reviewedAt: "2026-07-14T08:00:00.000Z",
        summary: "现有文章已经包含该步骤。",
        issueUrl: "https://github.com/example/repo/issues/42"
      }
    };

    await writeQueue(path.join(root, "feedback", "inbox.jsonl"), [reviewItem, makeSubmission(2)]);
    await fs.writeFile(path.join(root, "feedback", "synced-github-issues.txt"), `${reviewItem.id}\n`, "utf8");

    const queues = await getAdminFeedbackQueues(root);

    assert.deepEqual(queues.review.map((item) => item.id), [reviewItem.id]);
    assert.equal(queues.review[0].priority, null);
    assert.equal(queues.review[0].automationReview?.summary, "现有文章已经包含该步骤。");
    assert.deepEqual(queues.active.map((item) => item.id), ["AC-TEST-2"]);
    assert.equal(queues.active[0].priority, "P0");
  });

  it("promotes a reviewed item to P0 once and removes its old GitHub sync marker", async () => {
    const root = await makeTemporaryRoot();
    const reviewItem = makeSubmission(1, "needs_review");
    const feedbackRoot = path.join(root, "feedback");

    await writeQueue(path.join(feedbackRoot, "inbox.jsonl"), [reviewItem]);
    await fs.writeFile(path.join(feedbackRoot, "synced-github-issues.txt"), `${reviewItem.id}\nAC-OTHER\n`, "utf8");

    const first = await queueFeedbackForHarvest(reviewItem.id, "人工确认有效", root);
    const second = await queueFeedbackForHarvest(reviewItem.id, "重复点击", root);
    const queues = await getAdminFeedbackQueues(root);
    const syncedIds = await fs.readFile(path.join(feedbackRoot, "synced-github-issues.txt"), "utf8");

    assert.deepEqual(first, { queued: true });
    assert.deepEqual(second, { queued: false });
    assert.deepEqual(queues.review, []);
    assert.deepEqual(queues.active.map((item) => item.id), [reviewItem.id]);
    assert.equal(queues.active[0].status, "open");
    assert.equal(queues.active[0].adminNote, "人工确认有效");
    assert.equal(syncedIds, "AC-OTHER\n");
  });

  it("fails closed on Vercel instead of acknowledging ephemeral storage", async () => {
    const root = await makeTemporaryRoot();
    const previousVercel = process.env.VERCEL;

    process.env.VERCEL = "1";
    try {
      const result = await saveFeedback(makeForm(1), root);
      assert.equal(result.ok, false);
      assert.match(result.error, /未保存/);
      await assert.rejects(fs.access(path.join(root, "feedback", "inbox.jsonl")), { code: "ENOENT" });
    } finally {
      if (previousVercel === undefined) {
        delete process.env.VERCEL;
      } else {
        process.env.VERCEL = previousVercel;
      }
    }
  });
});
