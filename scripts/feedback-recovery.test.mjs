import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { afterEach, describe, it } from "node:test";

const scriptPath = fileURLToPath(new URL("./feedback-recovery.ts", import.meta.url));
const temporaryRoots = [];

async function makeTemporaryRoot(prefix) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), prefix));
  temporaryRoots.push(root);
  return root;
}

function makeSubmission(id, status = "open") {
  return {
    id,
    createdAt: "2026-07-13T08:00:00.000Z",
    kind: "missing_problem",
    title: `反馈 ${id}`,
    description: "测试内容",
    customerWords: "",
    device: "iPhone",
    contact: "",
    sourceTitle: "",
    sourceUrl: "",
    status,
    source: "website"
  };
}

async function writeText(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, "utf8");
}

async function writeJsonl(filePath, records) {
  await writeText(filePath, records.length ? `${records.map((record) => JSON.stringify(record)).join("\n")}\n` : "");
}

async function runCli(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["--experimental-strip-types", scriptPath, ...args], {
      env: { ...process.env, NODE_NO_WARNINGS: "1" },
      stdio: ["ignore", "pipe", "pipe"]
    });
    let stdout = "";
    let stderr = "";

    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", reject);
    child.on("close", (code, signal) => resolve({ code, signal, stdout, stderr }));
  });
}

async function createValidSnapshot(name) {
  const sourceRoot = await makeTemporaryRoot(`apple-cookbook-feedback-${name}-source-`);
  const outputRoot = await makeTemporaryRoot(`apple-cookbook-feedback-${name}-target-`);
  await writeJsonl(path.join(sourceRoot, "feedback/inbox.jsonl"), [makeSubmission(`AC-${name.toUpperCase()}`)]);
  await writeText(path.join(sourceRoot, "todos/daily-work.md"), `AC-${name.toUpperCase()}\n`);

  const backup = await runCli([
    "backup",
    "--data-dir",
    sourceRoot,
    "--output",
    outputRoot,
    "--name",
    `${name}-snapshot`,
    "--json"
  ]);
  assert.equal(backup.code, 0, backup.stderr);
  return JSON.parse(backup.stdout).backupPath;
}

afterEach(async () => {
  await Promise.all(temporaryRoots.splice(0).map((root) => fs.rm(root, { recursive: true, force: true })));
});

describe("feedback recovery CLI", () => {
  it("reports a consistent queue without exposing submission content", async () => {
    const root = await makeTemporaryRoot("apple-cookbook-feedback-doctor-");
    await writeJsonl(path.join(root, "feedback/inbox.jsonl"), [makeSubmission("AC-TEST-1")]);
    await writeJsonl(path.join(root, "feedback/archive.jsonl"), [makeSubmission("AC-TEST-2", "resolved")]);
    await writeText(path.join(root, "feedback/synced-github-issues.txt"), "AC-TEST-2\n");
    await writeText(path.join(root, "todos/daily-work.md"), "# 每日工作\n\nAC-TEST-1\nAC-TEST-2\n");

    const result = await runCli(["doctor", "--", "--data-dir", root, "--json"]);
    assert.equal(result.code, 0, result.stderr);
    const report = JSON.parse(result.stdout);

    assert.equal(report.ok, true);
    assert.deepEqual(report.summary, {
      inboxRecords: 1,
      archiveRecords: 1,
      syncedGithubIds: 1,
      presentFiles: 4,
      errors: 0,
      warnings: 0
    });
    assert.equal(result.stdout.includes("测试内容"), false);
  });

  it("accepts content Bugs that are waiting for human review", async () => {
    const root = await makeTemporaryRoot("apple-cookbook-feedback-review-doctor-");
    await writeJsonl(path.join(root, "feedback/inbox.jsonl"), [
      {
        ...makeSubmission("AC-REVIEW", "needs_review"),
        kind: "content_bug",
        automationReview: {
          outcome: "no_content_change",
          reviewedAt: "2026-07-14T08:00:00.000Z",
          summary: "当前内容无需修改。",
          issueUrl: "https://github.com/example/repo/issues/42"
        }
      }
    ]);

    const result = await runCli(["doctor", "--data-dir", root, "--json"]);
    const report = JSON.parse(result.stdout);

    assert.equal(result.code, 0, result.stderr);
    assert.equal(report.ok, true);
    assert.equal(report.summary.inboxRecords, 1);
  });

  it("keeps doctor side-effect free when the store is completely absent", async () => {
    const root = await makeTemporaryRoot("apple-cookbook-feedback-empty-doctor-");

    const result = await runCli(["doctor", "--data-dir", root, "--json"]);
    assert.equal(result.code, 0, result.stderr);
    assert.equal(JSON.parse(result.stdout).summary.presentFiles, 0);
    await assert.rejects(fs.access(path.join(root, "feedback")), { code: "ENOENT" });
    await assert.rejects(fs.access(path.join(root, "todos")), { code: "ENOENT" });
  });

  it("fails doctor on malformed JSONL without echoing the raw line", async () => {
    const root = await makeTemporaryRoot("apple-cookbook-feedback-corrupt-");
    const privateMarker = "PRIVATE-MALFORMED-CONTENT";
    await writeText(path.join(root, "feedback/inbox.jsonl"), `{not-json:${privateMarker}}\n`);

    const result = await runCli(["doctor", "--data-dir", root, "--json"]);
    assert.equal(result.code, 1);
    const report = JSON.parse(result.stdout);

    assert.equal(report.ok, false);
    assert.ok(report.issues.some((issue) => issue.code === "INVALID_JSONL"));
    assert.equal(result.stdout.includes(privateMarker), false);
    assert.equal(result.stderr.includes(privateMarker), false);
  });

  it("detects duplicate ids and inbox/archive partition conflicts", async () => {
    const root = await makeTemporaryRoot("apple-cookbook-feedback-conflict-");
    await writeJsonl(path.join(root, "feedback/inbox.jsonl"), [
      makeSubmission("AC-CONFLICT"),
      makeSubmission("AC-CONFLICT")
    ]);
    await writeJsonl(path.join(root, "feedback/archive.jsonl"), [makeSubmission("AC-CONFLICT", "resolved")]);
    await writeText(path.join(root, "todos/daily-work.md"), "AC-CONFLICT\n");

    const result = await runCli(["doctor", "--data-dir", root, "--json"]);
    assert.equal(result.code, 1);
    const report = JSON.parse(result.stdout);
    const codes = new Set(report.issues.map((issue) => issue.code));

    assert.ok(codes.has("DUPLICATE_QUEUE_ID"));
    assert.ok(codes.has("ACTIVE_ARCHIVE_CONFLICT"));
  });

  it("creates a hashed atomic snapshot and refuses to overwrite it", async () => {
    const root = await makeTemporaryRoot("apple-cookbook-feedback-backup-source-");
    const outputRoot = await makeTemporaryRoot("apple-cookbook-feedback-backup-target-");
    const inboxPath = path.join(root, "feedback/inbox.jsonl");
    const originalInbox = `${JSON.stringify(makeSubmission("AC-BACKUP-1"))}\n`;
    await writeText(inboxPath, originalInbox);
    await writeText(path.join(root, "todos/daily-work.md"), "AC-BACKUP-1\n");

    const first = await runCli([
      "backup",
      "--data-dir",
      root,
      "--output",
      outputRoot,
      "--name",
      "fixed-snapshot",
      "--json"
    ]);
    assert.equal(first.code, 0, first.stderr);
    const result = JSON.parse(first.stdout);
    const manifestPath = path.join(result.backupPath, "manifest.json");
    const manifestBefore = await fs.readFile(manifestPath, "utf8");
    const manifest = JSON.parse(manifestBefore);
    const inboxManifest = manifest.files.find((file) => file.path === "feedback/inbox.jsonl");

    assert.equal(await fs.readFile(path.join(result.backupPath, "feedback/inbox.jsonl"), "utf8"), originalInbox);
    assert.equal(inboxManifest.present, true);
    assert.equal(inboxManifest.bytes, Buffer.byteLength(originalInbox));
    assert.equal(inboxManifest.sha256, crypto.createHash("sha256").update(originalInbox).digest("hex"));
    assert.deepEqual(
      manifest.files.filter((file) => !file.present).map((file) => file.path),
      ["feedback/archive.jsonl", "feedback/synced-github-issues.txt"]
    );

    await writeText(inboxPath, `${originalInbox}${JSON.stringify(makeSubmission("AC-BACKUP-2"))}\n`);
    const second = await runCli([
      "backup",
      "--data-dir",
      root,
      "--output",
      outputRoot,
      "--name",
      "fixed-snapshot",
      "--json"
    ]);

    assert.equal(second.code, 1);
    assert.match(second.stderr, /already exists/);
    assert.equal(await fs.readFile(manifestPath, "utf8"), manifestBefore);
    assert.equal(await fs.readFile(path.join(result.backupPath, "feedback/inbox.jsonl"), "utf8"), originalInbox);
    assert.equal((await fs.readdir(outputRoot)).some((name) => name.includes(".tmp-")), false);
  });

  it("takes the shared queue lock before backing up a completely absent store", async () => {
    const root = await makeTemporaryRoot("apple-cookbook-feedback-empty-source-");
    const outputRoot = await makeTemporaryRoot("apple-cookbook-feedback-empty-target-");

    const result = await runCli([
      "backup",
      "--data-dir",
      root,
      "--output",
      outputRoot,
      "--name",
      "empty-snapshot",
      "--json"
    ]);
    assert.equal(result.code, 0, result.stderr);
    const { backupPath, manifest } = JSON.parse(result.stdout);

    // withFileLock creates the shared lock's parent even when the store did not
    // previously exist, and removes only the lock after the consistent read.
    assert.equal((await fs.stat(path.join(root, "feedback"))).isDirectory(), true);
    await assert.rejects(fs.access(path.join(root, "feedback/.queue.lock")), { code: "ENOENT" });
    assert.ok(manifest.files.every((file) => file.present === false));
    assert.equal((await fs.stat(path.join(backupPath, "manifest.json"))).isFile(), true);
  });

  it("waits for the exact shared queue lock before publishing a snapshot", async () => {
    const root = await makeTemporaryRoot("apple-cookbook-feedback-lock-source-");
    const outputRoot = await makeTemporaryRoot("apple-cookbook-feedback-lock-target-");
    const lockPath = path.join(root, "feedback/.queue.lock");
    const finalPath = path.join(outputRoot, "contended-snapshot");

    await fs.mkdir(lockPath, { recursive: true });
    await writeText(path.join(lockPath, "owner.json"), JSON.stringify({ token: "test-holder" }));

    const pendingBackup = runCli([
      "backup",
      "--data-dir",
      root,
      "--output",
      outputRoot,
      "--name",
      "contended-snapshot",
      "--json"
    ]);
    await new Promise((resolve) => setTimeout(resolve, 100));
    await assert.rejects(fs.access(finalPath), { code: "ENOENT" });

    await fs.rm(lockPath, { recursive: true });
    const result = await pendingBackup;
    assert.equal(result.code, 0, result.stderr);
    assert.equal((await fs.stat(path.join(finalPath, "manifest.json"))).isFile(), true);
  });

  it("verifies a valid snapshot offline and accepts standalone separators", async () => {
    const snapshotPath = await createValidSnapshot("verify-valid");

    const result = await runCli(["--", "verify", "--", "--snapshot", snapshotPath, "--json"]);
    assert.equal(result.code, 0, result.stderr);
    const report = JSON.parse(result.stdout);

    assert.equal(report.ok, true);
    assert.deepEqual(report.summary, {
      declaredFiles: 4,
      presentFiles: 2,
      filesChecked: 2,
      errors: 0,
      warnings: 0
    });
    assert.equal(result.stdout.includes("测试内容"), false);
  });

  it("detects same-length file tampering by SHA-256 without exposing content", async () => {
    const snapshotPath = await createValidSnapshot("verify-tamper");
    const inboxPath = path.join(snapshotPath, "feedback/inbox.jsonl");
    const tampered = await fs.readFile(inboxPath);
    tampered[0] ^= 1;
    await fs.writeFile(inboxPath, tampered);

    const result = await runCli(["verify", "--snapshot", snapshotPath, "--json"]);
    assert.equal(result.code, 1);
    const report = JSON.parse(result.stdout);

    assert.equal(report.ok, false);
    assert.ok(report.issues.some((issue) => issue.code === "SHA256_MISMATCH"));
    assert.equal(report.issues.some((issue) => issue.code === "BYTE_LENGTH_MISMATCH"), false);
    assert.equal(result.stdout.includes("测试内容"), false);

    await fs.appendFile(inboxPath, "x");
    const resizedResult = await runCli(["verify", "--snapshot", snapshotPath, "--json"]);
    assert.equal(resizedResult.code, 1);
    const resizedCodes = new Set(JSON.parse(resizedResult.stdout).issues.map((issue) => issue.code));
    assert.ok(resizedCodes.has("BYTE_LENGTH_MISMATCH"));
    assert.ok(resizedCodes.has("SHA256_MISMATCH"));
  });

  it("rejects malformed or structurally incompatible manifests without echoing raw data", async () => {
    const malformedSnapshot = await createValidSnapshot("verify-malformed-manifest");
    const privateMarker = "PRIVATE-MANIFEST-CONTENT";
    await fs.writeFile(path.join(malformedSnapshot, "manifest.json"), `{not-json:${privateMarker}}\n`);

    const malformedResult = await runCli(["verify", "--snapshot", malformedSnapshot, "--json"]);
    assert.equal(malformedResult.code, 1);
    assert.ok(JSON.parse(malformedResult.stdout).issues.some((issue) => issue.code === "INVALID_MANIFEST_JSON"));
    assert.equal(malformedResult.stdout.includes(privateMarker), false);
    assert.equal(malformedResult.stderr.includes(privateMarker), false);

    const incompatibleSnapshot = await createValidSnapshot("verify-incompatible-manifest");
    const manifestPath = path.join(incompatibleSnapshot, "manifest.json");
    const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
    manifest.formatVersion = 2;
    manifest.unknownField = privateMarker;
    manifest.files.push({ ...manifest.files[0] });
    await fs.writeFile(manifestPath, `${JSON.stringify(manifest)}\n`);

    const incompatibleResult = await runCli(["verify", "--snapshot", incompatibleSnapshot, "--json"]);
    assert.equal(incompatibleResult.code, 1);
    const incompatibleReport = JSON.parse(incompatibleResult.stdout);
    const codes = new Set(incompatibleReport.issues.map((issue) => issue.code));
    assert.ok(codes.has("INVALID_MANIFEST_FIELDS"));
    assert.ok(codes.has("UNSUPPORTED_MANIFEST_VERSION"));
    assert.ok(codes.has("DUPLICATE_MANIFEST_PATH"));
    assert.equal(incompatibleResult.stdout.includes(privateMarker), false);
  });

  it("rejects traversal and absolute paths declared by a manifest", async () => {
    const snapshotPath = await createValidSnapshot("verify-unsafe-paths");
    const manifestPath = path.join(snapshotPath, "manifest.json");
    const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
    manifest.files[0].path = "../private-feedback.jsonl";
    manifest.files[1].path = "/private/archive.jsonl";
    await fs.writeFile(manifestPath, `${JSON.stringify(manifest)}\n`);

    const result = await runCli(["verify", "--snapshot", snapshotPath, "--json"]);
    assert.equal(result.code, 1);
    const report = JSON.parse(result.stdout);
    const codes = new Set(report.issues.map((issue) => issue.code));

    assert.ok(codes.has("UNSAFE_MANIFEST_PATH"));
    assert.ok(codes.has("ABSOLUTE_MANIFEST_PATH"));
    assert.equal(result.stdout.includes("private-feedback"), false);
  });

  it(
    "rejects symlinks without following or exposing their target",
    { skip: process.platform === "win32" },
    async () => {
      const snapshotPath = await createValidSnapshot("verify-symlink");
      const externalRoot = await makeTemporaryRoot("apple-cookbook-feedback-external-");
      const externalPath = path.join(externalRoot, "PRIVATE-SYMLINK-TARGET.txt");
      const inboxPath = path.join(snapshotPath, "feedback/inbox.jsonl");
      await writeText(externalPath, "PRIVATE-SYMLINK-CONTENT");
      await fs.rm(inboxPath);
      await fs.symlink(externalPath, inboxPath);

      const result = await runCli(["verify", "--snapshot", snapshotPath, "--json"]);
      assert.equal(result.code, 1);
      const report = JSON.parse(result.stdout);

      assert.ok(report.issues.some((issue) => issue.code === "SYMLINK_NOT_ALLOWED"));
      assert.ok(report.issues.some((issue) => issue.code === "MISSING_FILE"));
      assert.equal(result.stdout.includes("PRIVATE-SYMLINK"), false);
      assert.equal(result.stderr.includes("PRIVATE-SYMLINK"), false);
    }
  );

  it("rejects missing and extra files without exposing unexpected filenames", async () => {
    const snapshotPath = await createValidSnapshot("verify-layout");
    const privateFilename = "PRIVATE-CONTACT-13800138000.txt";
    await fs.rm(path.join(snapshotPath, "feedback/inbox.jsonl"));
    await writeText(path.join(snapshotPath, privateFilename), "PRIVATE-FILE-CONTENT");

    const result = await runCli(["verify", "--snapshot", snapshotPath, "--json"]);
    assert.equal(result.code, 1);
    const report = JSON.parse(result.stdout);
    const codes = new Set(report.issues.map((issue) => issue.code));

    assert.ok(codes.has("MISSING_FILE"));
    assert.ok(codes.has("EXTRA_FILE"));
    assert.equal(result.stdout.includes(privateFilename), false);
    assert.equal(result.stdout.includes("PRIVATE-FILE-CONTENT"), false);
  });

  it(
    "reports permissive Unix permissions as a warning without failing integrity",
    { skip: process.platform === "win32" },
    async () => {
      const snapshotPath = await createValidSnapshot("verify-permissions");
      await fs.chmod(path.join(snapshotPath, "feedback/inbox.jsonl"), 0o644);

      const result = await runCli(["verify", "--snapshot", snapshotPath, "--json"]);
      assert.equal(result.code, 0, result.stderr);
      const report = JSON.parse(result.stdout);

      assert.equal(report.ok, true);
      assert.equal(report.summary.errors, 0);
      assert.ok(report.issues.some((issue) => issue.code === "PERMISSIONS_TOO_OPEN"));
      assert.ok(report.summary.warnings > 0);
    }
  );
});
