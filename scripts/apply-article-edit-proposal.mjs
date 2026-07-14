#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { contentHash, validateCookbookPath } from "./validate-harvest-run.mjs";

const proposalIdPattern = /^AE-\d{8}-[A-Z0-9]{8}$/;
const contentHashPattern = /^sha256:[0-9a-f]{64}$/;
const isoDateTimePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/;
const proposalFields = new Set([
  "schemaVersion",
  "proposalId",
  "createdAt",
  "articlePath",
  "baseContentHash",
  "proposedContentHash",
  "proposedContent",
  "reason"
]);
const requiredProposalFields = [
  "schemaVersion",
  "proposalId",
  "createdAt",
  "articlePath",
  "baseContentHash",
  "proposedContentHash",
  "proposedContent"
];
const maxProposalBytes = 3 * 1024 * 1024;
const maxProposedContentBytes = 2 * 1024 * 1024;
const maxReasonLength = 1000;

export class ArticleEditProposalError extends Error {
  constructor(errors) {
    super(`Article edit proposal failed with ${errors.length} error${errors.length === 1 ? "" : "s"}.`);
    this.name = "ArticleEditProposalError";
    this.errors = errors;
  }
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidIsoDateTime(value) {
  return (
    typeof value === "string" &&
    isoDateTimePattern.test(value) &&
    !Number.isNaN(Date.parse(value))
  );
}

function safeLabel(value) {
  const candidate = path.basename(String(value || "proposal.json"));
  return /^[A-Za-z0-9._-]{1,120}$/.test(candidate) ? candidate : "proposal file";
}

export function validateArticleEditProposal(value, options = {}) {
  const label = options.label ?? "article edit proposal";
  const errors = [];

  if (!isRecord(value)) {
    throw new ArticleEditProposalError([`${label}: proposal must be a JSON object`]);
  }

  for (const field of requiredProposalFields) {
    if (!Object.hasOwn(value, field)) errors.push(`${label}: missing required field ${field}`);
  }

  const unknownFields = Object.keys(value).filter((field) => !proposalFields.has(field));
  if (unknownFields.length) {
    errors.push(`${label}: proposal contains ${unknownFields.length} unsupported field${unknownFields.length === 1 ? "" : "s"}`);
  }

  if (value.schemaVersion !== 1) errors.push(`${label}: schemaVersion must be 1`);
  if (typeof value.proposalId !== "string" || !proposalIdPattern.test(value.proposalId)) {
    errors.push(`${label}: proposalId must match AE-YYYYMMDD-XXXXXXXX using uppercase letters and digits`);
  }
  if (!isValidIsoDateTime(value.createdAt)) {
    errors.push(`${label}: createdAt must be a valid UTC ISO date-time`);
  }

  if (typeof value.articlePath === "string" && /[\u0000-\u001f\u007f]/u.test(value.articlePath)) {
    errors.push(`${label}: articlePath must not contain control characters`);
  } else {
    const pathError = validateCookbookPath(value.articlePath);
    if (pathError) errors.push(`${label}: articlePath ${pathError}`);
  }

  if (typeof value.baseContentHash !== "string" || !contentHashPattern.test(value.baseContentHash)) {
    errors.push(`${label}: baseContentHash must use sha256:<64 lowercase hex characters>`);
  }
  if (typeof value.proposedContentHash !== "string" || !contentHashPattern.test(value.proposedContentHash)) {
    errors.push(`${label}: proposedContentHash must use sha256:<64 lowercase hex characters>`);
  }
  if (
    typeof value.baseContentHash === "string" &&
    typeof value.proposedContentHash === "string" &&
    value.baseContentHash === value.proposedContentHash
  ) {
    errors.push(`${label}: proposed content must differ from the base content`);
  }

  if (typeof value.proposedContent !== "string" || value.proposedContent.length === 0) {
    errors.push(`${label}: proposedContent must be a non-empty string`);
  } else {
    if (value.proposedContent.includes("\0")) {
      errors.push(`${label}: proposedContent must not contain NUL characters`);
    }
    if (Buffer.byteLength(value.proposedContent, "utf8") > maxProposedContentBytes) {
      errors.push(`${label}: proposedContent exceeds the ${maxProposedContentBytes}-byte limit`);
    }
  }

  if (value.reason !== undefined) {
    if (typeof value.reason !== "string" || !value.reason.trim()) {
      errors.push(`${label}: reason must be a non-empty string when provided`);
    } else if (value.reason.length > maxReasonLength) {
      errors.push(`${label}: reason exceeds the ${maxReasonLength}-character limit`);
    } else if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(value.reason)) {
      errors.push(`${label}: reason must not contain unsafe control characters`);
    }
  }

  if (errors.length) throw new ArticleEditProposalError(errors);
  return value;
}

function readProposalFile(proposalPath) {
  const absolutePath = path.resolve(proposalPath);
  const label = safeLabel(absolutePath);
  let stat;

  try {
    stat = fs.lstatSync(absolutePath);
  } catch (error) {
    const detail = error.code === "ENOENT" ? "does not exist" : "cannot be inspected";
    throw new ArticleEditProposalError([`${label}: proposal file ${detail}`]);
  }

  if (!stat.isFile() || stat.isSymbolicLink()) {
    throw new ArticleEditProposalError([`${label}: proposal path must be a regular file, not a symlink`]);
  }
  if (stat.size > maxProposalBytes) {
    throw new ArticleEditProposalError([`${label}: proposal file exceeds the ${maxProposalBytes}-byte limit`]);
  }

  let proposal;
  try {
    proposal = JSON.parse(fs.readFileSync(absolutePath, "utf8"));
  } catch {
    throw new ArticleEditProposalError([`${label}: proposal file must contain valid JSON`]);
  }

  validateArticleEditProposal(proposal, { label });
  if (`${proposal.proposalId}.json` !== path.basename(absolutePath)) {
    throw new ArticleEditProposalError([`${label}: filename must match proposalId (${proposal.proposalId}.json)`]);
  }

  return proposal;
}

function git(cwd, args, options = {}) {
  return execFileSync("git", args, {
    cwd,
    encoding: options.encoding ?? "utf8",
    maxBuffer: 16 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"]
  });
}

function assertGitRepositoryRoot(cwd) {
  let reportedRoot;
  try {
    reportedRoot = git(cwd, ["rev-parse", "--show-toplevel"]).trim();
  } catch {
    throw new ArticleEditProposalError(["checkout: target directory must be a Git working tree"]);
  }

  const actualRoot = fs.realpathSync(reportedRoot);
  if (actualRoot !== cwd) {
    throw new ArticleEditProposalError(["checkout: --cwd must point to the Git working-tree root"]);
  }
}

function resolveTrackedArticle(cwd, articlePath) {
  const cookbookPath = path.join(cwd, "cookbook");
  let cookbookStat;

  try {
    cookbookStat = fs.lstatSync(cookbookPath);
  } catch {
    throw new ArticleEditProposalError(["checkout: cookbook directory does not exist"]);
  }
  if (!cookbookStat.isDirectory() || cookbookStat.isSymbolicLink()) {
    throw new ArticleEditProposalError(["checkout: cookbook must be a real directory, not a symlink"]);
  }

  const absolutePath = path.join(cwd, ...articlePath.split("/"));
  let articleStat;
  try {
    articleStat = fs.lstatSync(absolutePath);
  } catch (error) {
    const detail = error.code === "ENOENT" ? "does not exist" : "cannot be inspected";
    throw new ArticleEditProposalError([`${articlePath}: article ${detail}`]);
  }
  if (!articleStat.isFile() || articleStat.isSymbolicLink()) {
    throw new ArticleEditProposalError([`${articlePath}: article must be a regular file, not a symlink`]);
  }

  const realCookbookPath = fs.realpathSync(cookbookPath);
  const realArticlePath = fs.realpathSync(absolutePath);
  if (!realArticlePath.startsWith(`${realCookbookPath}${path.sep}`)) {
    throw new ArticleEditProposalError([`${articlePath}: resolved path escapes cookbook/`]);
  }

  try {
    git(cwd, ["ls-files", "--error-unmatch", "--", articlePath]);
  } catch {
    throw new ArticleEditProposalError([`${articlePath}: article must already be tracked by Git`]);
  }

  return { absolutePath, articleStat };
}

function assertCleanCheckout(cwd) {
  const dirtyPaths = git(cwd, ["status", "--porcelain=v1", "--untracked-files=all"])
    .split(/\r?\n/)
    .filter(Boolean);
  if (dirtyPaths.length) {
    throw new ArticleEditProposalError([
      `checkout: working tree must be clean before applying a proposal (${dirtyPaths.length} changed path${dirtyPaths.length === 1 ? "" : "s"})`
    ]);
  }
}

function atomicReplace(filePath, content, mode) {
  const tempPath = path.join(
    path.dirname(filePath),
    `.${path.basename(filePath)}.${process.pid}.${crypto.randomUUID()}.tmp`
  );
  let descriptor;

  try {
    descriptor = fs.openSync(tempPath, "wx", mode || 0o600);
    fs.writeFileSync(descriptor, content, "utf8");
    fs.fsyncSync(descriptor);
    fs.closeSync(descriptor);
    descriptor = undefined;
    fs.renameSync(tempPath, filePath);
  } finally {
    if (descriptor !== undefined) fs.closeSync(descriptor);
    fs.rmSync(tempPath, { force: true });
  }
}

export function applyArticleEditProposal(options = {}) {
  if (!options.proposalPath) {
    throw new ArticleEditProposalError(["proposal: proposalPath is required"]);
  }

  const proposal = readProposalFile(options.proposalPath);
  const requestedCwd = path.resolve(options.cwd ?? process.cwd());
  let cwd;
  try {
    cwd = fs.realpathSync(requestedCwd);
  } catch {
    throw new ArticleEditProposalError(["checkout: target directory does not exist"]);
  }

  assertGitRepositoryRoot(cwd);
  const { absolutePath, articleStat } = resolveTrackedArticle(cwd, proposal.articlePath);
  const currentContent = fs.readFileSync(absolutePath);
  const currentHash = contentHash(currentContent);
  if (currentHash !== proposal.baseContentHash) {
    throw new ArticleEditProposalError([
      `${proposal.articlePath}: stale proposal; baseContentHash does not match the current checkout`
    ]);
  }

  const calculatedProposedHash = contentHash(Buffer.from(proposal.proposedContent, "utf8"));
  if (calculatedProposedHash !== proposal.proposedContentHash) {
    throw new ArticleEditProposalError([
      `${proposal.articlePath}: proposedContentHash does not match proposedContent`
    ]);
  }

  assertCleanCheckout(cwd);
  const latestArticleStat = fs.lstatSync(absolutePath);
  if (
    !latestArticleStat.isFile() ||
    latestArticleStat.isSymbolicLink() ||
    latestArticleStat.dev !== articleStat.dev ||
    latestArticleStat.ino !== articleStat.ino ||
    contentHash(fs.readFileSync(absolutePath)) !== proposal.baseContentHash
  ) {
    throw new ArticleEditProposalError([
      `${proposal.articlePath}: article changed while the proposal was being checked`
    ]);
  }
  atomicReplace(absolutePath, proposal.proposedContent, articleStat.mode & 0o777);

  const appliedHash = contentHash(fs.readFileSync(absolutePath));
  if (appliedHash !== proposal.proposedContentHash) {
    throw new ArticleEditProposalError([`${proposal.articlePath}: applied content hash verification failed`]);
  }

  const proposalSlug = proposal.proposalId.toLowerCase();
  return {
    schemaVersion: proposal.schemaVersion,
    proposalId: proposal.proposalId,
    createdAt: proposal.createdAt,
    articlePath: proposal.articlePath,
    baseContentHash: proposal.baseContentHash,
    proposedContentHash: proposal.proposedContentHash,
    reason: proposal.reason?.trim() || `Administrator article edit ${proposal.proposalId}`,
    runId: `admin-edit-${proposalSlug}`,
    branch: `harvest/admin-edit-${proposalSlug}`
  };
}

function parseArguments(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--proposal") options.proposalPath = argv[++index];
    else if (argument === "--cwd") options.cwd = argv[++index];
    else if (argument === "--help" || argument === "-h") options.help = true;
    else throw new ArticleEditProposalError([`Unknown argument: ${argument}`]);
  }

  if (options.proposalPath !== undefined && typeof options.proposalPath !== "string") {
    throw new ArticleEditProposalError(["--proposal requires a path"]);
  }
  if (options.cwd !== undefined && typeof options.cwd !== "string") {
    throw new ArticleEditProposalError(["--cwd requires a path"]);
  }
  return options;
}

function usage() {
  return `Usage:
  node scripts/apply-article-edit-proposal.mjs --proposal /path/to/AE-YYYYMMDD-XXXXXXXX.json [--cwd /path/to/checkout]

Validates and atomically applies one existing-article edit to a clean Git checkout.`;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  try {
    const options = parseArguments(process.argv.slice(2));
    if (options.help) console.log(usage());
    else console.log(JSON.stringify(applyArticleEditProposal(options)));
  } catch (error) {
    if (error instanceof ArticleEditProposalError) {
      console.error(error.message);
      for (const detail of error.errors) console.error(`ERROR ${detail}`);
      process.exitCode = 1;
    } else {
      throw error;
    }
  }
}
