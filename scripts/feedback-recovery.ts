#!/usr/bin/env node

import crypto from "node:crypto";
import { constants as fsConstants } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { atomicWriteText, withFileLock } from "../src/lib/file-store.ts";
import { getFeedbackQueueLockPath } from "../src/lib/feedback.ts";

const trackedFiles = [
  "feedback/inbox.jsonl",
  "feedback/archive.jsonl",
  "feedback/synced-github-issues.txt",
  "todos/daily-work.md"
] as const;

const feedbackKinds = new Set([
  "missing_problem",
  "content_bug",
  "article_feedback",
  "workflow_request",
  "link_submission",
  "question_submission"
]);
const feedbackStatuses = new Set(["open", "in_progress", "needs_review", "resolved", "dismissed"]);

type TrackedFile = (typeof trackedFiles)[number];
type RecoveryFile = TrackedFile | "manifest.json";
type IssueLevel = "error" | "warning";

type SnapshotFile = {
  relativePath: TrackedFile;
  content: Buffer | null;
};

type QueueRecord = {
  id: string;
  line: number;
  status: string;
};

export type FeedbackRecoveryIssue = {
  level: IssueLevel;
  code: string;
  file?: RecoveryFile;
  line?: number;
  message: string;
};

export type FeedbackDoctorReport = {
  ok: boolean;
  summary: {
    inboxRecords: number;
    archiveRecords: number;
    syncedGithubIds: number;
    presentFiles: number;
    errors: number;
    warnings: number;
  };
  issues: FeedbackRecoveryIssue[];
};

type BackupManifest = {
  formatVersion: 1;
  createdAt: string;
  health: {
    ok: boolean;
    errors: number;
    warnings: number;
  };
  files: Array<{
    path: TrackedFile;
    present: boolean;
    bytes: number;
    sha256: string | null;
  }>;
};

export type FeedbackSnapshotVerificationReport = {
  ok: boolean;
  summary: {
    declaredFiles: number;
    presentFiles: number;
    filesChecked: number;
    errors: number;
    warnings: number;
  };
  issues: FeedbackRecoveryIssue[];
};

type CliOptions = {
  command: "doctor" | "backup" | "verify";
  dataDir: string;
  outputDir?: string;
  name?: string;
  snapshotDir?: string;
  json: boolean;
};

type SnapshotReadMode = "read-only-if-absent" | "always-lock";

function isErrno(error: unknown, code: string) {
  return (error as NodeJS.ErrnoException).code === code;
}

async function pathExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    if (isErrno(error, "ENOENT")) return false;
    throw error;
  }
}

async function readOptionalFile(root: string, relativePath: TrackedFile): Promise<SnapshotFile> {
  try {
    return {
      relativePath,
      content: await fs.readFile(path.join(root, relativePath))
    };
  } catch (error) {
    if (isErrno(error, "ENOENT")) {
      return { relativePath, content: null };
    }
    throw error;
  }
}

async function readSnapshotFiles(root: string) {
  return Promise.all(trackedFiles.map((relativePath) => readOptionalFile(root, relativePath)));
}

async function withConsistentStoreSnapshot<T>(
  root: string,
  mode: SnapshotReadMode,
  callback: (files: SnapshotFile[]) => Promise<T>
) {
  const feedbackRoot = path.join(root, "feedback");
  const todoRoot = path.join(root, "todos");

  // Avoid creating a feedback directory just to diagnose an entirely absent store.
  // Backups always lock, including the first backup racing with the first write.
  if (mode === "read-only-if-absent") {
    const storeExists = (await pathExists(feedbackRoot)) || (await pathExists(todoRoot));
    if (!storeExists) {
      return callback(await readSnapshotFiles(root));
    }
  }

  return withFileLock(getFeedbackQueueLockPath(root), async () => callback(await readSnapshotFiles(root)));
}

function addIssue(
  issues: FeedbackRecoveryIssue[],
  level: IssueLevel,
  code: string,
  message: string,
  location: Pick<FeedbackRecoveryIssue, "file" | "line"> = {}
) {
  issues.push({ level, code, message, ...location });
}

function parseQueueFile(file: SnapshotFile, issues: FeedbackRecoveryIssue[]) {
  if (!file.content) return [];

  const records: QueueRecord[] = [];
  const seen = new Map<string, number>();
  const lines = file.content.toString("utf8").split(/\r?\n/);

  lines.forEach((line, index) => {
    if (!line.trim()) return;
    const lineNumber = index + 1;
    let value: unknown;

    try {
      value = JSON.parse(line);
    } catch {
      addIssue(issues, "error", "INVALID_JSONL", "JSONL 行无法解析。", {
        file: file.relativePath,
        line: lineNumber
      });
      return;
    }

    if (!value || typeof value !== "object" || Array.isArray(value)) {
      addIssue(issues, "error", "INVALID_RECORD", "JSONL 行必须是对象。", {
        file: file.relativePath,
        line: lineNumber
      });
      return;
    }

    const record = value as Record<string, unknown>;
    const id = typeof record.id === "string" ? record.id.trim() : "";
    const title = typeof record.title === "string" ? record.title.trim() : "";
    const status = record.status === undefined ? "open" : String(record.status);

    if (!id || !title) {
      addIssue(issues, "error", "MISSING_REQUIRED_FIELD", "反馈记录缺少非空 id 或 title。", {
        file: file.relativePath,
        line: lineNumber
      });
      return;
    }

    if (typeof record.createdAt !== "string" || Number.isNaN(Date.parse(record.createdAt))) {
      addIssue(issues, "error", "INVALID_CREATED_AT", "反馈记录的 createdAt 不是有效日期。", {
        file: file.relativePath,
        line: lineNumber
      });
    }

    if (typeof record.kind !== "string" || !feedbackKinds.has(record.kind)) {
      addIssue(issues, "error", "INVALID_KIND", "反馈记录包含未知 kind。", {
        file: file.relativePath,
        line: lineNumber
      });
    }

    if (!feedbackStatuses.has(status)) {
      addIssue(issues, "error", "INVALID_STATUS", "反馈记录包含未知 status。", {
        file: file.relativePath,
        line: lineNumber
      });
    }

    const firstLine = seen.get(id);
    if (firstLine !== undefined) {
      addIssue(
        issues,
        "error",
        "DUPLICATE_QUEUE_ID",
        `同一队列内出现重复 id（首次位于第 ${firstLine} 行）。`,
        { file: file.relativePath, line: lineNumber }
      );
    } else {
      seen.set(id, lineNumber);
    }

    records.push({ id, line: lineNumber, status });
  });

  return records;
}

function readText(file: SnapshotFile | undefined) {
  return file?.content?.toString("utf8") ?? "";
}

function analyzeSnapshot(files: SnapshotFile[]): FeedbackDoctorReport {
  const issues: FeedbackRecoveryIssue[] = [];
  const byPath = new Map(files.map((file) => [file.relativePath, file]));
  const inbox = parseQueueFile(byPath.get("feedback/inbox.jsonl")!, issues);
  const archive = parseQueueFile(byPath.get("feedback/archive.jsonl")!, issues);
  const inboxIds = new Set(inbox.map((record) => record.id));
  const archiveIds = new Set(archive.map((record) => record.id));
  const crossPartitionCount = [...inboxIds].filter((id) => archiveIds.has(id)).length;

  if (crossPartitionCount > 0) {
    addIssue(
      issues,
      "error",
      "ACTIVE_ARCHIVE_CONFLICT",
      `${crossPartitionCount} 个反馈 id 同时存在于 inbox 与 archive。`
    );
  }

  const terminalInboxCount = inbox.filter(
    (record) => record.status === "resolved" || record.status === "dismissed"
  ).length;
  if (terminalInboxCount > 0) {
    addIssue(
      issues,
      "warning",
      "TERMINAL_STATUS_IN_INBOX",
      `${terminalInboxCount} 条已结束反馈仍位于 inbox；管理页兼容该旧格式，但建议人工复核。`,
      { file: "feedback/inbox.jsonl" }
    );
  }

  const activeArchiveCount = archive.filter(
    (record) => record.status === "open" || record.status === "in_progress" || record.status === "needs_review"
  ).length;
  if (activeArchiveCount > 0) {
    addIssue(
      issues,
      "warning",
      "ACTIVE_STATUS_IN_ARCHIVE",
      `${activeArchiveCount} 条未结束反馈位于 archive；建议人工复核队列状态。`,
      { file: "feedback/archive.jsonl" }
    );
  }

  const syncedLines = readText(byPath.get("feedback/synced-github-issues.txt"))
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const syncedIds = new Set<string>();
  let duplicateSyncedIds = 0;

  for (const id of syncedLines) {
    if (syncedIds.has(id)) duplicateSyncedIds += 1;
    syncedIds.add(id);
  }

  if (duplicateSyncedIds > 0) {
    addIssue(
      issues,
      "error",
      "DUPLICATE_SYNCED_ID",
      `${duplicateSyncedIds} 个 GitHub 同步标记重复。`,
      { file: "feedback/synced-github-issues.txt" }
    );
  }

  const knownIds = new Set([...inboxIds, ...archiveIds]);
  const orphanedSyncedIds = [...syncedIds].filter((id) => !knownIds.has(id)).length;
  if (orphanedSyncedIds > 0) {
    addIssue(
      issues,
      "warning",
      "ORPHANED_SYNCED_ID",
      `${orphanedSyncedIds} 个 GitHub 同步标记找不到对应反馈记录。`,
      { file: "feedback/synced-github-issues.txt" }
    );
  }

  const dailyWork = readText(byPath.get("todos/daily-work.md"));
  const missingDailyWorkItems = [...inboxIds].filter((id) => !dailyWork.includes(id)).length;
  if (missingDailyWorkItems > 0) {
    addIssue(
      issues,
      "warning",
      "DAILY_WORK_PROJECTION_GAP",
      `${missingDailyWorkItems} 条 inbox 反馈未出现在 daily-work 投影视图。`,
      { file: "todos/daily-work.md" }
    );
  }

  const errors = issues.filter((issue) => issue.level === "error").length;
  const warnings = issues.filter((issue) => issue.level === "warning").length;

  return {
    ok: errors === 0,
    summary: {
      inboxRecords: inbox.length,
      archiveRecords: archive.length,
      syncedGithubIds: syncedIds.size,
      presentFiles: files.filter((file) => file.content !== null).length,
      errors,
      warnings
    },
    issues
  };
}

export async function doctorFeedbackStore(root: string): Promise<FeedbackDoctorReport> {
  return withConsistentStoreSnapshot(path.resolve(root), "read-only-if-absent", async (files) =>
    analyzeSnapshot(files)
  );
}

function sha256(content: Buffer) {
  return crypto.createHash("sha256").update(content).digest("hex");
}

async function syncDirectory(directory: string) {
  let handle: fs.FileHandle | undefined;
  try {
    handle = await fs.open(directory, "r");
    await handle.sync();
  } catch (error) {
    if (!isErrno(error, "EINVAL") && !isErrno(error, "ENOTSUP")) throw error;
  } finally {
    await handle?.close().catch(() => undefined);
  }
}

function defaultBackupName(now: Date) {
  return `feedback-snapshot-${now.toISOString().replace(/[-:.]/g, "")}`;
}

function validateBackupName(name: string) {
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,119}$/.test(name) || name === "." || name === "..") {
    throw new Error("Backup name may contain only letters, digits, dots, underscores, and hyphens.");
  }
}

async function writeAtomicBackup(
  outputDir: string,
  backupName: string,
  files: SnapshotFile[],
  manifest: BackupManifest
) {
  const resolvedOutputDir = path.resolve(outputDir);
  const finalPath = path.join(resolvedOutputDir, backupName);
  let temporaryPath: string | null = null;

  await fs.mkdir(resolvedOutputDir, { recursive: true, mode: 0o700 });
  if (await pathExists(finalPath)) {
    throw new Error(`Backup already exists: ${finalPath}`);
  }

  try {
    temporaryPath = await fs.mkdtemp(path.join(resolvedOutputDir, `.${backupName}.tmp-`));
    await fs.chmod(temporaryPath, 0o700);

    for (const file of files) {
      if (!file.content) continue;
      const targetPath = path.join(temporaryPath, file.relativePath);
      await fs.mkdir(path.dirname(targetPath), { recursive: true, mode: 0o700 });
      const handle = await fs.open(targetPath, "wx", 0o600);
      try {
        await handle.writeFile(file.content);
        await handle.sync();
      } finally {
        await handle.close();
      }
    }

    await atomicWriteText(path.join(temporaryPath, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
    await syncDirectory(temporaryPath);

    // The shared queue lock serializes this tool for one store. Recheck before
    // rename so a previous snapshot is never intentionally replaced.
    if (await pathExists(finalPath)) {
      throw new Error(`Backup already exists: ${finalPath}`);
    }

    await fs.rename(temporaryPath, finalPath);
    temporaryPath = null;
    await syncDirectory(resolvedOutputDir);
    return finalPath;
  } finally {
    if (temporaryPath) {
      await fs.rm(temporaryPath, { recursive: true, force: true }).catch(() => undefined);
    }
  }
}

export async function backupFeedbackStore(
  root: string,
  outputDir: string,
  requestedName?: string,
  now = new Date()
) {
  const backupName = requestedName ?? defaultBackupName(now);
  validateBackupName(backupName);

  return withConsistentStoreSnapshot(path.resolve(root), "always-lock", async (files) => {
    const report = analyzeSnapshot(files);
    const manifest: BackupManifest = {
      formatVersion: 1,
      createdAt: now.toISOString(),
      health: {
        ok: report.ok,
        errors: report.summary.errors,
        warnings: report.summary.warnings
      },
      files: files.map((file) => ({
        path: file.relativePath,
        present: file.content !== null,
        bytes: file.content?.byteLength ?? 0,
        sha256: file.content ? sha256(file.content) : null
      }))
    };
    const backupPath = await writeAtomicBackup(outputDir, backupName, files, manifest);

    return { backupPath, manifest };
  });
}

type SnapshotEntry = {
  relativePath: string;
  absolutePath: string;
  kind: "file" | "directory" | "symlink" | "other";
  mode: number;
};

type SnapshotLayout = {
  rootMode: number;
  entries: SnapshotEntry[];
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function hasExactKeys(value: Record<string, unknown>, expectedKeys: readonly string[]) {
  const actualKeys = Object.keys(value).sort();
  const expected = [...expectedKeys].sort();
  return actualKeys.length === expected.length && actualKeys.every((key, index) => key === expected[index]);
}

function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

function isCanonicalIsoDate(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const date = new Date(value);
  return !Number.isNaN(date.valueOf()) && date.toISOString() === value;
}

function classifyManifestPath(value: string) {
  if (value.includes("\0") || path.isAbsolute(value) || path.posix.isAbsolute(value) || path.win32.isAbsolute(value)) {
    return "absolute" as const;
  }

  const segments = value.split(/[\\/]/);
  if (
    !value ||
    value.includes("\\") ||
    segments.some((segment) => segment === "." || segment === ".." || segment === "") ||
    path.posix.normalize(value) !== value
  ) {
    return "unsafe" as const;
  }

  return "safe" as const;
}

function parseBackupManifest(value: unknown, issues: FeedbackRecoveryIssue[]): BackupManifest | null {
  const startingErrors = issues.filter((issue) => issue.level === "error").length;

  if (!isPlainObject(value)) {
    addIssue(issues, "error", "INVALID_MANIFEST", "manifest 必须是 JSON 对象。", {
      file: "manifest.json"
    });
    return null;
  }

  if (!hasExactKeys(value, ["formatVersion", "createdAt", "health", "files"])) {
    addIssue(issues, "error", "INVALID_MANIFEST_FIELDS", "manifest 顶层字段与 formatVersion 1 不匹配。", {
      file: "manifest.json"
    });
  }

  if (value.formatVersion !== 1) {
    addIssue(issues, "error", "UNSUPPORTED_MANIFEST_VERSION", "仅支持 formatVersion 1。", {
      file: "manifest.json"
    });
  }

  if (!isCanonicalIsoDate(value.createdAt)) {
    addIssue(issues, "error", "INVALID_MANIFEST_CREATED_AT", "manifest createdAt 必须是规范 UTC ISO 日期。", {
      file: "manifest.json"
    });
  }

  if (!isPlainObject(value.health) || !hasExactKeys(value.health, ["ok", "errors", "warnings"])) {
    addIssue(issues, "error", "INVALID_MANIFEST_HEALTH", "manifest health 字段结构无效。", {
      file: "manifest.json"
    });
  } else {
    if (
      typeof value.health.ok !== "boolean" ||
      !isNonNegativeInteger(value.health.errors) ||
      !isNonNegativeInteger(value.health.warnings)
    ) {
      addIssue(issues, "error", "INVALID_MANIFEST_HEALTH", "manifest health 值无效。", {
        file: "manifest.json"
      });
    } else if (value.health.ok !== (value.health.errors === 0)) {
      addIssue(issues, "error", "INCONSISTENT_MANIFEST_HEALTH", "manifest health.ok 与 errors 不一致。", {
        file: "manifest.json"
      });
    }
  }

  const parsedFiles: BackupManifest["files"] = [];
  const seenPaths = new Set<string>();

  if (!Array.isArray(value.files)) {
    addIssue(issues, "error", "INVALID_MANIFEST_FILES", "manifest files 必须是数组。", {
      file: "manifest.json"
    });
  } else {
    for (const entry of value.files) {
      if (!isPlainObject(entry) || !hasExactKeys(entry, ["path", "present", "bytes", "sha256"])) {
        addIssue(issues, "error", "INVALID_MANIFEST_FILE_ENTRY", "manifest 文件条目结构无效。", {
          file: "manifest.json"
        });
        continue;
      }

      if (typeof entry.path !== "string") {
        addIssue(issues, "error", "INVALID_MANIFEST_PATH", "manifest 文件路径必须是字符串。", {
          file: "manifest.json"
        });
        continue;
      }

      if (seenPaths.has(entry.path)) {
        addIssue(issues, "error", "DUPLICATE_MANIFEST_PATH", "manifest 包含重复文件路径。", {
          file: "manifest.json"
        });
      }
      seenPaths.add(entry.path);

      const pathClassification = classifyManifestPath(entry.path);
      if (pathClassification === "absolute") {
        addIssue(issues, "error", "ABSOLUTE_MANIFEST_PATH", "manifest 不得包含绝对文件路径。", {
          file: "manifest.json"
        });
        continue;
      }
      if (pathClassification === "unsafe") {
        addIssue(issues, "error", "UNSAFE_MANIFEST_PATH", "manifest 不得包含路径穿越或非规范路径。", {
          file: "manifest.json"
        });
        continue;
      }
      if (!trackedFiles.includes(entry.path as TrackedFile)) {
        addIssue(issues, "error", "UNKNOWN_MANIFEST_PATH", "manifest 包含不受支持的文件路径。", {
          file: "manifest.json"
        });
        continue;
      }

      if (typeof entry.present !== "boolean" || !isNonNegativeInteger(entry.bytes)) {
        addIssue(issues, "error", "INVALID_MANIFEST_FILE_METADATA", "manifest 文件元数据类型无效。", {
          file: entry.path as TrackedFile
        });
        continue;
      }

      if (entry.present) {
        if (typeof entry.sha256 !== "string" || !/^[a-f0-9]{64}$/.test(entry.sha256)) {
          addIssue(issues, "error", "INVALID_MANIFEST_DIGEST", "存在文件必须包含小写 SHA-256 摘要。", {
            file: entry.path as TrackedFile
          });
          continue;
        }
      } else if (entry.bytes !== 0 || entry.sha256 !== null) {
        addIssue(issues, "error", "INVALID_ABSENT_FILE_METADATA", "缺失文件必须记录 bytes 0 与 sha256 null。", {
          file: entry.path as TrackedFile
        });
        continue;
      }

      parsedFiles.push({
        path: entry.path as TrackedFile,
        present: entry.present,
        bytes: entry.bytes,
        sha256: entry.sha256 as string | null
      });
    }
  }

  for (const trackedFile of trackedFiles) {
    if (!seenPaths.has(trackedFile)) {
      addIssue(issues, "error", "MISSING_MANIFEST_ENTRY", "manifest 缺少受控文件条目。", {
        file: trackedFile
      });
    }
  }

  const endingErrors = issues.filter((issue) => issue.level === "error").length;
  if (endingErrors !== startingErrors) return null;

  return {
    formatVersion: 1,
    createdAt: value.createdAt as string,
    health: value.health as BackupManifest["health"],
    files: parsedFiles
  };
}

async function inspectSnapshotLayout(snapshotRoot: string, issues: FeedbackRecoveryIssue[]): Promise<SnapshotLayout | null> {
  let rootStat;
  try {
    rootStat = await fs.lstat(snapshotRoot);
  } catch (error) {
    const code = isErrno(error, "ENOENT") ? "SNAPSHOT_NOT_FOUND" : "SNAPSHOT_UNREADABLE";
    addIssue(issues, "error", code, "无法读取指定的快照目录。");
    return null;
  }

  if (rootStat.isSymbolicLink()) {
    addIssue(issues, "error", "SYMLINK_NOT_ALLOWED", "快照根目录不得是符号链接。");
    return null;
  }
  if (!rootStat.isDirectory()) {
    addIssue(issues, "error", "SNAPSHOT_NOT_DIRECTORY", "指定的快照路径不是目录。");
    return null;
  }

  const entries: SnapshotEntry[] = [];

  async function walk(directory: string, relativeDirectory = ""): Promise<void> {
    let names;
    try {
      names = await fs.readdir(directory);
    } catch {
      addIssue(issues, "error", "SNAPSHOT_UNREADABLE", "快照目录包含无法读取的条目。");
      return;
    }

    for (const name of names) {
      const relativePath = relativeDirectory ? `${relativeDirectory}/${name}` : name;
      const absolutePath = path.join(directory, name);
      let stat;

      try {
        stat = await fs.lstat(absolutePath);
      } catch {
        addIssue(issues, "error", "SNAPSHOT_UNREADABLE", "快照目录包含无法读取的条目。");
        continue;
      }

      const kind = stat.isSymbolicLink()
        ? "symlink"
        : stat.isFile()
          ? "file"
          : stat.isDirectory()
            ? "directory"
            : "other";
      entries.push({ relativePath, absolutePath, kind, mode: stat.mode });

      if (kind === "directory") await walk(absolutePath, relativePath);
    }
  }

  await walk(snapshotRoot);
  return { rootMode: rootStat.mode, entries };
}

async function readRegularFile(filePath: string) {
  // Windows does not consistently implement O_NOFOLLOW. Layout lstat still
  // rejects links there; Unix additionally asks the kernel not to follow a
  // final-component link swapped in between inspection and open.
  const noFollow = process.platform === "win32" ? 0 : fsConstants.O_NOFOLLOW;
  const handle = await fs.open(filePath, fsConstants.O_RDONLY | noFollow);
  try {
    const stat = await handle.stat();
    if (!stat.isFile()) throw new Error("Snapshot entry is not a regular file.");
    return { content: await handle.readFile(), mode: stat.mode };
  } finally {
    await handle.close();
  }
}

function finalizeVerificationReport(
  issues: FeedbackRecoveryIssue[],
  declaredFiles: number,
  presentFiles: number,
  filesChecked: number
): FeedbackSnapshotVerificationReport {
  const errors = issues.filter((issue) => issue.level === "error").length;
  const warnings = issues.filter((issue) => issue.level === "warning").length;
  return {
    ok: errors === 0,
    summary: { declaredFiles, presentFiles, filesChecked, errors, warnings },
    issues
  };
}

export async function verifyFeedbackSnapshot(snapshotDir: string): Promise<FeedbackSnapshotVerificationReport> {
  const issues: FeedbackRecoveryIssue[] = [];
  const snapshotRoot = path.resolve(snapshotDir);
  const layout = await inspectSnapshotLayout(snapshotRoot, issues);
  if (!layout) return finalizeVerificationReport(issues, 0, 0, 0);

  const symlinkCount = layout.entries.filter((entry) => entry.kind === "symlink").length;
  if (symlinkCount > 0) {
    addIssue(issues, "error", "SYMLINK_NOT_ALLOWED", `${symlinkCount} 个快照条目是符号链接；不会跟随读取。`);
  }

  const specialEntryCount = layout.entries.filter((entry) => entry.kind === "other").length;
  if (specialEntryCount > 0) {
    addIssue(issues, "error", "NON_REGULAR_ENTRY", `${specialEntryCount} 个快照条目不是常规文件或目录。`);
  }

  const manifestEntry = layout.entries.find((entry) => entry.relativePath === "manifest.json");
  if (!manifestEntry) {
    addIssue(issues, "error", "MISSING_MANIFEST", "快照缺少 manifest.json。", { file: "manifest.json" });
    return finalizeVerificationReport(issues, 0, 0, 0);
  }
  if (manifestEntry.kind !== "file") {
    addIssue(issues, "error", "INVALID_MANIFEST_FILE", "manifest.json 必须是常规文件。", {
      file: "manifest.json"
    });
    return finalizeVerificationReport(issues, 0, 0, 0);
  }

  let manifestContent: Buffer;
  let manifestMode = manifestEntry.mode;
  try {
    const read = await readRegularFile(manifestEntry.absolutePath);
    manifestContent = read.content;
    manifestMode = read.mode;
  } catch {
    addIssue(issues, "error", "MANIFEST_UNREADABLE", "无法安全读取 manifest.json。", {
      file: "manifest.json"
    });
    return finalizeVerificationReport(issues, 0, 0, 0);
  }

  let manifestValue: unknown;
  try {
    manifestValue = JSON.parse(manifestContent.toString("utf8"));
  } catch {
    addIssue(issues, "error", "INVALID_MANIFEST_JSON", "manifest.json 不是有效 JSON。", {
      file: "manifest.json"
    });
    return finalizeVerificationReport(issues, 0, 0, 0);
  }

  const manifest = parseBackupManifest(manifestValue, issues);
  if (!manifest) return finalizeVerificationReport(issues, 0, 0, 0);

  const presentEntries = manifest.files.filter((entry) => entry.present);
  const expectedFiles = new Set(["manifest.json", ...presentEntries.map((entry) => entry.path)]);
  const expectedDirectories = new Set(
    presentEntries.flatMap((entry) => {
      const directory = path.posix.dirname(entry.path);
      return directory === "." ? [] : [directory];
    })
  );

  const unexpectedFiles = layout.entries.filter(
    (entry) => entry.kind === "file" && !expectedFiles.has(entry.relativePath)
  ).length;
  if (unexpectedFiles > 0) {
    addIssue(issues, "error", "EXTRA_FILE", `${unexpectedFiles} 个文件未在 manifest 中声明；未读取其内容或名称。`);
  }

  const unexpectedDirectories = layout.entries.filter(
    (entry) => entry.kind === "directory" && !expectedDirectories.has(entry.relativePath)
  ).length;
  if (unexpectedDirectories > 0) {
    addIssue(issues, "error", "EXTRA_DIRECTORY", `${unexpectedDirectories} 个目录不属于已声明快照布局。`);
  }

  let filesChecked = 0;
  const checkedModes = [layout.rootMode, manifestMode];

  for (const entry of presentEntries) {
    const actualEntry = layout.entries.find((candidate) => candidate.relativePath === entry.path);
    if (!actualEntry || actualEntry.kind !== "file") {
      addIssue(issues, "error", "MISSING_FILE", "manifest 声明存在的文件缺失或不是常规文件。", {
        file: entry.path
      });
      continue;
    }

    try {
      const read = await readRegularFile(actualEntry.absolutePath);
      filesChecked += 1;
      checkedModes.push(read.mode);

      if (read.content.byteLength !== entry.bytes) {
        addIssue(issues, "error", "BYTE_LENGTH_MISMATCH", "文件字节数与 manifest 不一致。", {
          file: entry.path
        });
      }
      if (sha256(read.content) !== entry.sha256) {
        addIssue(issues, "error", "SHA256_MISMATCH", "文件 SHA-256 与 manifest 不一致。", {
          file: entry.path
        });
      }
    } catch {
      addIssue(issues, "error", "FILE_UNREADABLE", "无法安全读取 manifest 声明的文件。", {
        file: entry.path
      });
    }
  }

  for (const directory of expectedDirectories) {
    const entry = layout.entries.find((candidate) => candidate.relativePath === directory);
    if (entry?.kind === "directory") checkedModes.push(entry.mode);
  }

  if (process.platform !== "win32") {
    const permissiveEntries = checkedModes.filter((mode) => (mode & 0o077) !== 0).length;
    if (permissiveEntries > 0) {
      addIssue(
        issues,
        "warning",
        "PERMISSIONS_TOO_OPEN",
        `${permissiveEntries} 个已验证条目允许组或其他用户访问；请按部署平台人工复核权限。`
      );
    }
  }

  return finalizeVerificationReport(issues, manifest.files.length, presentEntries.length, filesChecked);
}

function printUsage() {
  console.log(`Apple Cookbook feedback recovery tools

Usage:
  node --experimental-strip-types scripts/feedback-recovery.ts doctor [--data-dir PATH] [--json]
  node --experimental-strip-types scripts/feedback-recovery.ts backup --output PATH [--data-dir PATH] [--name NAME] [--json]
  node --experimental-strip-types scripts/feedback-recovery.ts verify --snapshot PATH [--json]

APPLE_COOKBOOK_DATA_DIR is used when --data-dir is omitted.`);
}

function parseCliArguments(argv: string[]): CliOptions | null {
  const normalizedArgv = argv.filter((argument) => argument !== "--");
  if (normalizedArgv.includes("--help") || normalizedArgv.includes("-h")) return null;

  const command = normalizedArgv[0];
  if (command !== "doctor" && command !== "backup" && command !== "verify") {
    throw new Error("Expected command: doctor, backup, or verify.");
  }

  const options: CliOptions = {
    command,
    dataDir: process.env.APPLE_COOKBOOK_DATA_DIR ?? process.cwd(),
    json: false
  };

  for (let index = 1; index < normalizedArgv.length; index += 1) {
    const argument = normalizedArgv[index];

    if (argument === "--json") {
      options.json = true;
      continue;
    }

    const value = normalizedArgv[index + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for ${argument}.`);
    }

    if (argument === "--data-dir" && command !== "verify") options.dataDir = value;
    else if (argument === "--output" && command === "backup") options.outputDir = value;
    else if (argument === "--name" && command === "backup") options.name = value;
    else if (argument === "--snapshot" && command === "verify") options.snapshotDir = value;
    else throw new Error(`Unknown option: ${argument}`);
    index += 1;
  }

  if (command === "backup" && !options.outputDir) {
    throw new Error("The backup command requires --output PATH.");
  }
  if (command === "verify" && !options.snapshotDir) {
    throw new Error("The verify command requires --snapshot PATH.");
  }

  return options;
}

function printDoctorReport(report: FeedbackDoctorReport) {
  console.log(
    `Feedback store: ${report.ok ? "healthy" : "inconsistent"}; ` +
      `${report.summary.inboxRecords} inbox, ${report.summary.archiveRecords} archived, ` +
      `${report.summary.errors} errors, ${report.summary.warnings} warnings.`
  );
  for (const issue of report.issues) {
    const location = issue.file ? ` ${issue.file}${issue.line ? `:${issue.line}` : ""}` : "";
    console.log(`[${issue.level.toUpperCase()}] ${issue.code}${location}: ${issue.message}`);
  }
}

function printVerificationReport(report: FeedbackSnapshotVerificationReport) {
  console.log(
    `Feedback snapshot: ${report.ok ? "valid" : "invalid"}; ` +
      `${report.summary.filesChecked}/${report.summary.presentFiles} present files checked, ` +
      `${report.summary.errors} errors, ${report.summary.warnings} warnings.`
  );
  for (const issue of report.issues) {
    const location = issue.file ? ` ${issue.file}${issue.line ? `:${issue.line}` : ""}` : "";
    console.log(`[${issue.level.toUpperCase()}] ${issue.code}${location}: ${issue.message}`);
  }
}

async function main() {
  const options = parseCliArguments(process.argv.slice(2));
  if (!options) {
    printUsage();
    return;
  }

  if (options.command === "doctor") {
    const report = await doctorFeedbackStore(options.dataDir);
    if (options.json) console.log(JSON.stringify(report));
    else printDoctorReport(report);
    if (!report.ok) process.exitCode = 1;
    return;
  }

  if (options.command === "verify") {
    const report = await verifyFeedbackSnapshot(options.snapshotDir!);
    if (options.json) console.log(JSON.stringify(report));
    else printVerificationReport(report);
    if (!report.ok) process.exitCode = 1;
    return;
  }

  const result = await backupFeedbackStore(options.dataDir, options.outputDir!, options.name);
  if (options.json) {
    console.log(JSON.stringify(result));
  } else {
    console.log(
      `Feedback snapshot created: ${result.backupPath} ` +
        `(${result.manifest.health.errors} errors, ${result.manifest.health.warnings} warnings)`
    );
  }
}

if (fileURLToPath(import.meta.url) === path.resolve(process.argv[1] ?? "")) {
  main().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : "Unknown feedback recovery error.";
    console.error(message);
    process.exitCode = 1;
  });
}
