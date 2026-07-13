#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  HarvestValidationError,
  contentHash,
  harvestArticleIdsAtCommit,
  validateCookbookPath,
  validateHarvestArticleContent,
  validateHarvestArticleTransition,
  validateHarvestManifest,
  validateHarvestRun
} from "./validate-harvest-run.mjs";

const COMMIT_PATTERN = /^[0-9a-f]{40,64}$/;
const RUN_ID_PATTERN = /^[a-z0-9][a-z0-9._-]{2,99}$/i;
const ACTIONS = new Set(["create", "update", "redirect"]);
const DECISIONS = new Map([
  ["create", "create-new"],
  ["update", "update-existing"],
  ["redirect", "redirect-to-existing"]
]);
const TOP_LEVEL_KEYS = new Set([
  "schemaVersion",
  "runId",
  "automationId",
  "generatedAt",
  "baseCommit",
  "changes"
]);
const CHANGE_KEYS = new Set([
  "path",
  "action",
  "reason",
  "canonicalArticleId",
  "canonicalReview",
  "content"
]);
const REVIEW_KEYS = new Set(["queries", "matchedArticleIds", "decision", "notes"]);
const MAX_INPUT_BYTES = 5 * 1024 * 1024;
const MAX_ARTICLE_BYTES = 512 * 1024;
const MAX_TOTAL_ARTICLE_BYTES = 2 * 1024 * 1024;
const MAX_CHANGES = 20;
const contentValidatorPath = fileURLToPath(new URL("./validate-content.mjs", import.meta.url));

export class HarvestProposalError extends Error {
  constructor(details) {
    const normalized = Array.isArray(details) ? details : [String(details)];
    super(`Harvest proposal failed with ${normalized.length} error${normalized.length === 1 ? "" : "s"}.`);
    this.name = "HarvestProposalError";
    this.details = normalized;
  }
}

function git(cwd, args, options = {}) {
  return execFileSync("git", args, {
    cwd,
    encoding: Object.hasOwn(options, "encoding") ? options.encoding : "utf8",
    maxBuffer: 64 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"]
  });
}

function gitSucceeds(cwd, args) {
  try {
    git(cwd, args);
    return true;
  } catch {
    return false;
  }
}

function isIsoDateTime(value) {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/.test(value) &&
    !Number.isNaN(Date.parse(value))
  );
}

function isNonEmptyString(value, maxLength = Infinity) {
  return typeof value === "string" && value.trim() === value && value.length > 0 && value.length <= maxLength;
}

function validateStringArray(value, label, errors, { allowEmpty = true, maxItems = 50 } = {}) {
  if (
    !Array.isArray(value) ||
    (!allowEmpty && value.length === 0) ||
    value.length > maxItems ||
    value.some((item) => !isNonEmptyString(item, 500)) ||
    new Set(value).size !== value.length
  ) {
    errors.push(`${label} must be a unique string array with ${allowEmpty ? "0" : "1"}-${maxItems} items`);
  }
}

function rejectUnknownKeys(value, allowedKeys, label, errors) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return;
  const unknown = Object.keys(value).filter((field) => !allowedKeys.has(field));
  if (unknown.length) errors.push(`${label} contains unknown fields: ${unknown.join(", ")}`);
}

function normalizeProposal(input) {
  const errors = [];
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new HarvestProposalError(["proposal input must be a JSON object"]);
  }

  rejectUnknownKeys(input, TOP_LEVEL_KEYS, "proposal", errors);
  if (input.schemaVersion !== 1) errors.push("proposal.schemaVersion must be 1");
  if (!RUN_ID_PATTERN.test(input.runId ?? "")) errors.push("proposal.runId must use 3-100 safe identifier characters");
  if (!isNonEmptyString(input.automationId, 100) || input.automationId.length < 2) {
    errors.push("proposal.automationId must identify the producing automation in 2-100 characters");
  }
  if (!isIsoDateTime(input.generatedAt)) errors.push("proposal.generatedAt must be a valid UTC ISO timestamp");
  if (!COMMIT_PATTERN.test(input.baseCommit ?? "")) {
    errors.push("proposal.baseCommit must be a full 40-64 character lowercase Git object ID");
  }
  if (!Array.isArray(input.changes) || input.changes.length === 0 || input.changes.length > MAX_CHANGES) {
    errors.push(`proposal.changes must contain 1-${MAX_CHANGES} changes`);
  }

  const seenPaths = new Set();
  let totalBytes = 0;
  const normalizedChanges = [];

  for (const [index, change] of (Array.isArray(input.changes) ? input.changes : []).entries()) {
    const label = `proposal.changes[${index}]`;
    if (!change || typeof change !== "object" || Array.isArray(change)) {
      errors.push(`${label} must be an object`);
      continue;
    }
    rejectUnknownKeys(change, CHANGE_KEYS, label, errors);

    const pathError = validateCookbookPath(change.path);
    if (pathError) errors.push(`${label}.path ${pathError}`);
    else if (seenPaths.has(change.path)) errors.push(`${label}.path duplicates ${change.path}`);
    else seenPaths.add(change.path);

    if (!ACTIONS.has(change.action)) errors.push(`${label}.action must be create, update, or redirect`);
    if (!isNonEmptyString(change.reason, 1000)) errors.push(`${label}.reason must be a trimmed 1-1000 character explanation`);
    if (typeof change.content !== "string" || change.content.length === 0 || change.content.includes("\0")) {
      errors.push(`${label}.content must be a non-empty Markdown string without NUL bytes`);
    }

    const proposedContent = typeof change.content === "string" ? Buffer.from(change.content, "utf8") : Buffer.alloc(0);
    totalBytes += proposedContent.length;
    if (proposedContent.length > MAX_ARTICLE_BYTES) {
      errors.push(`${label}.content exceeds the ${MAX_ARTICLE_BYTES} byte per-article limit`);
    }

    if (change.action === "redirect") {
      if (!isNonEmptyString(change.canonicalArticleId, 500)) {
        errors.push(`${label}.canonicalArticleId is required for redirect`);
      }
    } else if (Object.hasOwn(change, "canonicalArticleId")) {
      errors.push(`${label}.canonicalArticleId is only allowed for redirect`);
    }

    const review = change.canonicalReview;
    if (!review || typeof review !== "object" || Array.isArray(review)) {
      errors.push(`${label}.canonicalReview must record the canonical-match decision`);
    } else {
      rejectUnknownKeys(review, REVIEW_KEYS, `${label}.canonicalReview`, errors);
      validateStringArray(review.queries, `${label}.canonicalReview.queries`, errors, {
        allowEmpty: false,
        maxItems: 20
      });
      validateStringArray(review.matchedArticleIds, `${label}.canonicalReview.matchedArticleIds`, errors);
      if (review.decision !== DECISIONS.get(change.action)) {
        errors.push(`${label}.canonicalReview.decision must be ${String(DECISIONS.get(change.action))}`);
      }
      if (!isNonEmptyString(review.notes, 1000)) {
        errors.push(`${label}.canonicalReview.notes must be a trimmed 1-1000 character explanation`);
      }
      if (
        change.action === "redirect" &&
        isNonEmptyString(change.canonicalArticleId, 500) &&
        Array.isArray(review.matchedArticleIds) &&
        !review.matchedArticleIds.includes(change.canonicalArticleId)
      ) {
        errors.push(`${label}.canonicalReview.matchedArticleIds must include ${change.canonicalArticleId}`);
      }
    }

    let articleData = null;
    if (proposedContent.length && ACTIONS.has(change.action)) {
      try {
        articleData = validateHarvestArticleContent(proposedContent, change, { label: change.path ?? label }).data;
      } catch (error) {
        if (error instanceof HarvestValidationError) errors.push(...error.errors);
        else throw error;
      }
    }

    if (
      change.action === "update" &&
      articleData &&
      Array.isArray(review?.matchedArticleIds)
    ) {
      const articleId = String(articleData.id ?? articleData.slug ?? "").trim();
      if (!articleId || !review.matchedArticleIds.includes(articleId)) {
        errors.push(`${label}.canonicalReview.matchedArticleIds must include the updated article id or slug`);
      }
    }

    normalizedChanges.push({
      path: change.path,
      action: change.action,
      reason: change.reason,
      ...(change.action === "redirect" ? { canonicalArticleId: change.canonicalArticleId } : {}),
      canonicalReview: review,
      proposedContent
    });
  }

  if (totalBytes > MAX_TOTAL_ARTICLE_BYTES) {
    errors.push(`proposal article content exceeds the ${MAX_TOTAL_ARTICLE_BYTES} byte total limit`);
  }
  if (errors.length) throw new HarvestProposalError(errors);

  normalizedChanges.sort((left, right) => left.path.localeCompare(right.path, "en"));
  return {
    schemaVersion: 1,
    runId: input.runId,
    automationId: input.automationId,
    generatedAt: input.generatedAt,
    baseCommit: input.baseCommit,
    changes: normalizedChanges
  };
}

function repositoryRoot(cwd) {
  try {
    return path.resolve(git(path.resolve(cwd), ["rev-parse", "--show-toplevel"]).trim());
  } catch {
    throw new HarvestProposalError(["current directory is not inside a Git working tree"]);
  }
}

function readBaseFile(cwd, baseCommit, relativePath) {
  if (!gitSucceeds(cwd, ["cat-file", "-e", `${baseCommit}:${relativePath}`])) return null;
  return git(cwd, ["show", `${baseCommit}:${relativePath}`], { encoding: null });
}

function parseNameStatus(output) {
  const fields = output.split("\0");
  const entries = [];
  for (let index = 0; index < fields.length && fields[index];) {
    const statusToken = fields[index++];
    const status = statusToken[0];
    if (status === "R" || status === "C") {
      entries.push({ status, statusToken, sourcePath: fields[index++], path: fields[index++] });
    } else {
      entries.push({ status, statusToken, path: fields[index++] });
    }
  }
  return entries;
}

function workingTreeChanges(cwd, baseCommit) {
  const entries = parseNameStatus(
    git(cwd, ["diff", "--name-status", "-z", "--find-renames", baseCommit, "--"])
  );
  const untracked = git(cwd, ["ls-files", "--others", "--exclude-standard", "-z", "--"])
    .split("\0")
    .filter(Boolean)
    .map((filePath) => ({ status: "?", statusToken: "?", path: filePath }));
  return [...entries, ...untracked];
}

function assertRepositoryState(cwd, proposal, manifestPath) {
  if (!gitSucceeds(cwd, ["cat-file", "-e", `${proposal.baseCommit}^{commit}`])) {
    throw new HarvestProposalError([`baseCommit ${proposal.baseCommit} is not available as a commit`]);
  }
  if (!gitSucceeds(cwd, ["merge-base", "--is-ancestor", proposal.baseCommit, "HEAD"])) {
    throw new HarvestProposalError([`baseCommit ${proposal.baseCommit} is not an ancestor of HEAD`]);
  }

  let branch;
  try {
    branch = git(cwd, ["symbolic-ref", "--quiet", "--short", "HEAD"]).trim();
  } catch {
    throw new HarvestProposalError(["Harvest proposals cannot run from a detached HEAD"]);
  }
  const allowedBranches = new Set([
    `harvest/${proposal.runId}`,
    `automation/harvest/${proposal.runId}`
  ]);
  if (!allowedBranches.has(branch)) {
    throw new HarvestProposalError([
      `branch must be harvest/${proposal.runId} or automation/harvest/${proposal.runId} (found ${branch})`
    ]);
  }

  const allowedPaths = new Set([...proposal.changes.map((change) => change.path), manifestPath]);
  const unsafe = [];
  const unexpected = [];
  for (const entry of workingTreeChanges(cwd, proposal.baseCommit)) {
    if (!["A", "M", "?"].includes(entry.status)) {
      unsafe.push(`${entry.statusToken} ${entry.sourcePath ? `${entry.sourcePath} -> ` : ""}${entry.path}`);
      continue;
    }
    const affectedPaths = entry.sourcePath ? [entry.sourcePath, entry.path] : [entry.path];
    if (affectedPaths.some((filePath) => !allowedPaths.has(filePath))) {
      unexpected.push(`${entry.statusToken} ${entry.path}`);
    }
  }

  const errors = [];
  if (unsafe.length) errors.push(`only additions and modifications are allowed; unsafe changes: ${unsafe.join(", ")}`);
  if (unexpected.length) errors.push(`proposal branch contains undeclared paths: ${unexpected.join(", ")}`);
  if (errors.length) throw new HarvestProposalError(errors);
}

function absolutePath(cwd, relativePath) {
  return path.join(cwd, ...relativePath.split("/"));
}

function lstatOrNull(target) {
  try {
    return fs.lstatSync(target);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

function assertSafeFileTarget(cwd, relativePath, { allowMissingParents = false } = {}) {
  const segments = relativePath.split("/");
  let current = cwd;
  for (let index = 0; index < segments.length - 1; index += 1) {
    current = path.join(current, segments[index]);
    const stat = lstatOrNull(current);
    if (stat === null) {
      if (allowMissingParents) continue;
      throw new HarvestProposalError([`${relativePath}: parent directory does not exist`]);
    }
    if (stat.isSymbolicLink() || !stat.isDirectory()) {
      throw new HarvestProposalError([`${relativePath}: every parent must be a real directory, not a symlink`]);
    }
  }

  const target = absolutePath(cwd, relativePath);
  const targetStat = lstatOrNull(target);
  if (targetStat && (targetStat.isSymbolicLink() || !targetStat.isFile())) {
    throw new HarvestProposalError([`${relativePath}: target must be a regular file, not a symlink`]);
  }
  return target;
}

function readWorkingFile(cwd, relativePath, options = {}) {
  const target = assertSafeFileTarget(cwd, relativePath, options);
  if (lstatOrNull(target) === null) return null;
  const stat = fs.statSync(target);
  return { content: fs.readFileSync(target), mode: stat.mode & 0o777 };
}

function createManifest(proposal, effectiveChanges) {
  return {
    schemaVersion: 2,
    runId: proposal.runId,
    automationId: proposal.automationId,
    generatedAt: proposal.generatedAt,
    baseCommit: proposal.baseCommit,
    changes: effectiveChanges.map((change) => ({
      path: change.path,
      action: change.action,
      baseContentHash: change.baseContent === null ? null : contentHash(change.baseContent),
      proposedContentHash: contentHash(change.proposedContent),
      ...(change.action === "redirect" ? { canonicalArticleId: change.canonicalArticleId } : {}),
      reason: change.reason,
      canonicalReview: change.canonicalReview
    }))
  };
}

function validatorFailureDetails(error) {
  const stderr = String(error?.stderr ?? "").trim();
  if (!stderr) return ["proposed Cookbook corpus failed content validation"];
  return ["proposed Cookbook corpus failed content validation", stderr.slice(0, 12000)];
}

function runContentValidator(cwd) {
  try {
    execFileSync(process.execPath, [contentValidatorPath], {
      cwd,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
      stdio: ["ignore", "pipe", "pipe"]
    });
  } catch (error) {
    throw new HarvestProposalError(validatorFailureDetails(error));
  }
}

function validateProposedCorpus(cwd, changes) {
  const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "apple-cookbook-harvest-preview-"));
  try {
    fs.cpSync(path.join(cwd, "cookbook"), path.join(temporaryRoot, "cookbook"), {
      recursive: true,
      dereference: false
    });
    for (const change of changes) {
      const target = absolutePath(temporaryRoot, change.path);
      fs.writeFileSync(target, change.proposedContent, { flag: "w", mode: 0o600 });
    }
    runContentValidator(temporaryRoot);
  } finally {
    fs.rmSync(temporaryRoot, { recursive: true, force: true });
  }
}

function ensureDirectory(cwd, relativePath, createdDirectories) {
  const target = absolutePath(cwd, relativePath);
  const stat = lstatOrNull(target);
  if (stat) {
    if (stat.isSymbolicLink() || !stat.isDirectory()) {
      throw new HarvestProposalError([`${relativePath}: expected a real directory, not a symlink`]);
    }
    return;
  }
  fs.mkdirSync(target, { mode: 0o755 });
  createdDirectories.push(target);
}

function sameContent(left, right) {
  if (left === null || right === null) return left === right;
  return Buffer.compare(left, right) === 0;
}

function atomicReplace(target, content, expectedContent, mode) {
  const targetStat = lstatOrNull(target);
  if (targetStat && (targetStat.isSymbolicLink() || !targetStat.isFile())) {
    throw new HarvestProposalError([`${path.basename(target)} changed into a non-regular file; refusing to overwrite it`]);
  }
  const current = targetStat ? fs.readFileSync(target) : null;
  if (!sameContent(current, expectedContent)) {
    throw new HarvestProposalError([`${path.basename(target)} changed concurrently; refusing to overwrite it`]);
  }

  const temporaryPath = path.join(
    path.dirname(target),
    `.${path.basename(target)}.harvest-${process.pid}-${Math.random().toString(16).slice(2)}`
  );
  let descriptor;
  try {
    descriptor = fs.openSync(temporaryPath, "wx", mode);
    fs.writeFileSync(descriptor, content);
    fs.fsyncSync(descriptor);
    fs.closeSync(descriptor);
    descriptor = undefined;
    fs.renameSync(temporaryPath, target);
  } finally {
    if (descriptor !== undefined) fs.closeSync(descriptor);
    fs.rmSync(temporaryPath, { force: true });
  }
}

function rollback(writes, createdDirectories) {
  const incomplete = [];
  for (const write of [...writes].reverse()) {
    try {
      const currentStat = lstatOrNull(write.target);
      if (currentStat && (currentStat.isSymbolicLink() || !currentStat.isFile())) {
        incomplete.push(write.relativePath);
        continue;
      }
      const current = currentStat ? fs.readFileSync(write.target) : null;
      if (!sameContent(current, write.after)) {
        incomplete.push(write.relativePath);
        continue;
      }
      if (write.before === null) fs.unlinkSync(write.target);
      else atomicReplace(write.target, write.before, write.after, write.mode);
    } catch {
      incomplete.push(write.relativePath);
    }
  }
  for (const directory of [...createdDirectories].reverse()) {
    try {
      fs.rmdirSync(directory);
    } catch {
      // A non-empty or concurrently changed directory is intentionally preserved.
    }
  }
  return [...new Set(incomplete)];
}

function prepare(cwd, proposal) {
  const manifestPath = `harvest/manifests/${proposal.runId}.json`;
  assertRepositoryState(cwd, proposal, manifestPath);

  if (readBaseFile(cwd, proposal.baseCommit, manifestPath) !== null) {
    throw new HarvestProposalError([`${manifestPath}: runId has already been recorded at baseCommit`]);
  }
  assertSafeFileTarget(cwd, manifestPath, { allowMissingParents: true });

  const effectiveChanges = [];
  const noOpChanges = [];
  const baseArticleIds = harvestArticleIdsAtCommit(cwd, proposal.baseCommit);
  for (const change of proposal.changes) {
    const baseContent = readBaseFile(cwd, proposal.baseCommit, change.path);
    const working = readWorkingFile(cwd, change.path);
    if (change.action === "create" && baseContent !== null) {
      throw new HarvestProposalError([`${change.path}: create cannot replace a file present at baseCommit`]);
    }
    if (change.action !== "create" && baseContent === null) {
      throw new HarvestProposalError([`${change.path}: ${change.action} requires a file at baseCommit`]);
    }
    if (change.action === "redirect" && !baseArticleIds.has(change.canonicalArticleId)) {
      throw new HarvestProposalError([`${change.path}: redirect target must exist at baseCommit`]);
    }
    try {
      validateHarvestArticleTransition(baseContent, change.proposedContent, change, { label: change.path });
    } catch (error) {
      if (error instanceof HarvestValidationError) throw new HarvestProposalError(error.errors);
      throw error;
    }

    const isNoOp = baseContent !== null && sameContent(baseContent, change.proposedContent);
    const allowedCurrent = change.action === "create"
      ? [null, change.proposedContent]
      : [baseContent, change.proposedContent];
    if (!allowedCurrent.some((candidate) => sameContent(working?.content ?? null, candidate))) {
      throw new HarvestProposalError([`${change.path}: working file differs from both baseCommit and this proposal`]);
    }

    const preparedChange = {
      ...change,
      baseContent,
      beforeContent: working?.content ?? null,
      beforeMode: working?.mode ?? 0o644,
      needsWrite: !isNoOp && !sameContent(working?.content ?? null, change.proposedContent)
    };
    if (isNoOp) noOpChanges.push(preparedChange);
    else effectiveChanges.push(preparedChange);
  }

  if (effectiveChanges.length === 0) {
    const existingManifest = readWorkingFile(cwd, manifestPath, { allowMissingParents: true });
    if (existingManifest !== null) {
      throw new HarvestProposalError([`${manifestPath}: an all-no-op proposal must not have a run manifest`]);
    }
    return { manifestPath, manifest: null, manifestContent: null, effectiveChanges, noOpChanges, manifestNeedsWrite: false };
  }

  const manifest = createManifest(proposal, effectiveChanges);
  const manifestContent = Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  const existingManifest = readWorkingFile(cwd, manifestPath, { allowMissingParents: true });
  if (existingManifest !== null && !sameContent(existingManifest.content, manifestContent)) {
    throw new HarvestProposalError([`${manifestPath}: an existing manifest differs; runIds are immutable and cannot be overwritten`]);
  }

  return {
    manifestPath,
    manifest,
    manifestContent,
    effectiveChanges,
    noOpChanges,
    manifestNeedsWrite: existingManifest === null
  };
}

function buildSummary(proposal, prepared, mode, filesWritten = []) {
  const changes = [...prepared.effectiveChanges, ...prepared.noOpChanges]
    .sort((left, right) => left.path.localeCompare(right.path, "en"))
    .map((change) => ({
      path: change.path,
      action: change.action,
      result: prepared.noOpChanges.includes(change)
        ? "no-op"
        : change.needsWrite
          ? mode === "write" ? "written" : "would-write"
          : "already-materialized",
      proposedContentHash: contentHash(change.proposedContent)
    }));
  const filesToWrite = prepared.effectiveChanges.filter((change) => change.needsWrite).length +
    (prepared.manifestNeedsWrite ? 1 : 0);
  const result = prepared.effectiveChanges.length === 0
    ? "no-op"
    : filesToWrite === 0
      ? "already-materialized"
      : mode === "write"
        ? "materialized"
        : "would-materialize";

  return {
    mode,
    result,
    runId: proposal.runId,
    baseCommit: proposal.baseCommit,
    manifestPath: prepared.manifestPath,
    effectiveChangeCount: prepared.effectiveChanges.length,
    noOpCount: prepared.noOpChanges.length,
    filesToWrite,
    filesWritten,
    changes
  };
}

export function generateHarvestProposal(input, options = {}) {
  const proposal = normalizeProposal(input);
  const cwd = repositoryRoot(options.cwd ?? process.cwd());
  const write = options.write === true;
  const prepared = prepare(cwd, proposal);

  validateProposedCorpus(cwd, proposal.changes);
  if (!write || prepared.effectiveChanges.length === 0) {
    return buildSummary(proposal, prepared, write ? "write" : "dry-run");
  }

  const writes = [];
  const createdDirectories = [];
  try {
    for (const change of prepared.effectiveChanges.filter((item) => item.needsWrite)) {
      const target = assertSafeFileTarget(cwd, change.path);
      atomicReplace(target, change.proposedContent, change.beforeContent, change.beforeMode);
      writes.push({
        target,
        relativePath: change.path,
        before: change.beforeContent,
        after: change.proposedContent,
        mode: change.beforeMode
      });
    }
    options.testHooks?.afterArticleWrites?.({
      cwd,
      paths: writes.map((write) => write.relativePath)
    });

    validateHarvestManifest(prepared.manifest, {
      cwd,
      expectedBase: proposal.baseCommit,
      label: prepared.manifestPath
    });
    runContentValidator(cwd);

    if (prepared.manifestNeedsWrite) {
      ensureDirectory(cwd, "harvest", createdDirectories);
      ensureDirectory(cwd, "harvest/manifests", createdDirectories);
      const target = assertSafeFileTarget(cwd, prepared.manifestPath);
      atomicReplace(target, prepared.manifestContent, null, 0o644);
      writes.push({
        target,
        relativePath: prepared.manifestPath,
        before: null,
        after: prepared.manifestContent,
        mode: 0o644
      });
    }
    options.testHooks?.afterManifestWrite?.({
      cwd,
      paths: writes.map((write) => write.relativePath)
    });

    validateHarvestRun({
      cwd,
      manifestPaths: [prepared.manifestPath],
      expectedBase: proposal.baseCommit,
      requireManifest: true
    });
  } catch (error) {
    const incomplete = rollback(writes, createdDirectories);
    const details = error instanceof HarvestProposalError
      ? error.details
      : error instanceof HarvestValidationError
        ? error.errors
        : [error.message];
    if (incomplete.length) details.push(`rollback incomplete for: ${incomplete.join(", ")}`);
    throw new HarvestProposalError(details);
  }

  return buildSummary(
    proposal,
    prepared,
    "write",
    writes.map((write) => write.relativePath)
  );
}

export function readProposalInput(inputPath) {
  const resolved = path.resolve(inputPath);
  let stat;
  try {
    stat = fs.lstatSync(resolved);
  } catch (error) {
    throw new HarvestProposalError([`cannot read proposal input (${error.message})`]);
  }
  if (stat.isSymbolicLink() || !stat.isFile()) {
    throw new HarvestProposalError(["proposal input must be a regular file, not a symlink"]);
  }
  if (stat.size > MAX_INPUT_BYTES) {
    throw new HarvestProposalError([`proposal input exceeds the ${MAX_INPUT_BYTES} byte limit`]);
  }
  try {
    return JSON.parse(fs.readFileSync(resolved, "utf8"));
  } catch (error) {
    throw new HarvestProposalError([`proposal input is not valid JSON (${error.message})`]);
  }
}

function parseArguments(argv) {
  const options = { write: false };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--") continue;
    if (argument === "--input") options.inputPath = argv[++index];
    else if (argument === "--write") options.write = true;
    else if (argument === "--help" || argument === "-h") options.help = true;
    else throw new HarvestProposalError([`unknown argument: ${argument}`]);
  }
  if (!options.help && !isNonEmptyString(options.inputPath)) {
    throw new HarvestProposalError(["--input requires a proposal JSON path"]);
  }
  return options;
}

function usage() {
  return `Usage:
  pnpm generate:harvest --input /absolute/path/to/proposal.json
  pnpm generate:harvest --input /absolute/path/to/proposal.json --write

The default is a validated dry-run. --write materializes article files and one immutable run manifest.
The command never creates branches, commits, pushes, pull requests, or published articles.`;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  try {
    const options = parseArguments(process.argv.slice(2));
    if (options.help) console.log(usage());
    else {
      const proposal = readProposalInput(options.inputPath);
      const summary = generateHarvestProposal(proposal, { write: options.write });
      console.log(JSON.stringify(summary, null, 2));
    }
  } catch (error) {
    const details = error instanceof HarvestProposalError ? error.details : [error.message];
    console.error(error instanceof HarvestProposalError ? error.message : "Harvest proposal failed.");
    for (const detail of details) console.error(`ERROR ${detail}`);
    process.exitCode = 1;
  }
}
