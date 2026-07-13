#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const MANIFEST_PATH_PATTERN = /^harvest\/manifests\/[^/]+\.json$/;
const HASH_PATTERN = /^sha256:[0-9a-f]{64}$/;
const COMMIT_PATTERN = /^[0-9a-f]{40,64}$/;
const MAX_MANIFEST_BYTES = 1024 * 1024;
const ACTIONS = new Set(["create", "update", "redirect"]);
const MANIFEST_KEYS = new Set([
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
  "baseContentHash",
  "proposedContentHash",
  "canonicalArticleId",
  "reason",
  "canonicalReview"
]);
const CANONICAL_DECISIONS = new Map([
  ["create", "create-new"],
  ["update", "update-existing"],
  ["redirect", "redirect-to-existing"]
]);

export class HarvestValidationError extends Error {
  constructor(errors) {
    super(`Harvest validation failed with ${errors.length} error${errors.length === 1 ? "" : "s"}.`);
    this.name = "HarvestValidationError";
    this.errors = errors;
  }
}

export function contentHash(content) {
  return `sha256:${crypto.createHash("sha256").update(content).digest("hex")}`;
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

function parseManifestJson(cwd, relativePath) {
  const segments = relativePath.split("/");
  let current = cwd;
  try {
    for (let index = 0; index < segments.length - 1; index += 1) {
      current = path.join(current, segments[index]);
      const parentStat = fs.lstatSync(current);
      if (parentStat.isSymbolicLink() || !parentStat.isDirectory()) {
        throw new Error("every parent must be a real directory, not a symlink");
      }
    }

    const filePath = path.join(cwd, ...segments);
    const fileStat = fs.lstatSync(filePath);
    if (fileStat.isSymbolicLink() || !fileStat.isFile()) {
      throw new Error("manifest must be a regular file, not a symlink");
    }
    if (fileStat.size > MAX_MANIFEST_BYTES) {
      throw new Error(`manifest exceeds the ${MAX_MANIFEST_BYTES} byte limit`);
    }
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new HarvestValidationError([
      `${relativePath}: cannot read a safe, valid manifest (${error.message})`
    ]);
  }
}

function isIsoDateTime(value) {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/.test(value) &&
    !Number.isNaN(Date.parse(value))
  );
}

export function validateCookbookPath(value) {
  if (typeof value !== "string" || value.length === 0 || value.length > 500) {
    return "path must be a non-empty string no longer than 500 characters";
  }

  if (value.includes("\\") || value.includes("\0") || /[\r\n]/.test(value)) {
    return "path must use safe POSIX separators and contain no control characters";
  }

  if (path.posix.isAbsolute(value) || path.posix.normalize(value) !== value) {
    return "path must be repository-relative and normalized";
  }

  const segments = value.split("/");
  if (
    segments[0] !== "cookbook" ||
    segments.length < 2 ||
    segments.some((segment) => !segment || segment.startsWith(".") || segment.includes(":")) ||
    !segments.at(-1).endsWith(".md")
  ) {
    return "path must point to a Markdown file below cookbook/ without traversal segments";
  }

  return null;
}

function hasOfficialAppleSource(data) {
  const legacySources = Array.isArray(data.official_sources) ? data.official_sources : [];
  const structuredSources = Array.isArray(data.sources)
    ? data.sources.filter((source) => source && source.official === true).map((source) => source.url)
    : [];

  return [...legacySources, ...structuredSources].some((source) => {
    try {
      const url = new URL(source);
      return url.protocol === "https:" && url.hostname === "support.apple.com";
    } catch {
      return false;
    }
  });
}

function isNonEmptyString(value, maxLength = Infinity) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

function sameMetadataValue(left, right) {
  return left === right || (left === null && right === undefined) || (left === undefined && right === null);
}

function isUniqueNonEmptyStringArray(value, { allowEmpty = true, maxItems = Infinity } = {}) {
  return (
    Array.isArray(value) &&
    value.length <= maxItems &&
    (allowEmpty || value.length > 0) &&
    value.every((item) => isNonEmptyString(item, 500)) &&
    new Set(value).size === value.length
  );
}

function validateCanonicalReview(review, action, canonicalArticleId, label, errors) {
  if (!review || typeof review !== "object" || Array.isArray(review)) {
    errors.push(`${label}.canonicalReview must be an object recording the canonical-match decision`);
    return;
  }

  const unknownFields = Object.keys(review).filter(
    (field) => !["queries", "matchedArticleIds", "decision", "notes"].includes(field)
  );
  if (unknownFields.length) {
    errors.push(`${label}.canonicalReview contains unknown fields: ${unknownFields.join(", ")}`);
  }
  if (!isUniqueNonEmptyStringArray(review.queries, { allowEmpty: false, maxItems: 20 })) {
    errors.push(`${label}.canonicalReview.queries must contain 1-20 unique symptom or alias searches`);
  }
  if (!isUniqueNonEmptyStringArray(review.matchedArticleIds, { maxItems: 50 })) {
    errors.push(`${label}.canonicalReview.matchedArticleIds must be a unique string array with at most 50 items`);
  }

  const expectedDecision = CANONICAL_DECISIONS.get(action);
  if (review.decision !== expectedDecision) {
    errors.push(`${label}.canonicalReview.decision must be ${String(expectedDecision)} for ${String(action)}`);
  }
  if (!isNonEmptyString(review.notes, 1000)) {
    errors.push(`${label}.canonicalReview.notes must explain the decision in 1-1000 characters`);
  }
  if (
    action === "redirect" &&
    typeof canonicalArticleId === "string" &&
    Array.isArray(review.matchedArticleIds) &&
    !review.matchedArticleIds.includes(canonicalArticleId)
  ) {
    errors.push(`${label}.canonicalReview.matchedArticleIds must include redirect target ${canonicalArticleId}`);
  }
}

function inspectHarvestArticleContent(content, change, label) {
  const errors = [];
  let data;

  try {
    data = matter(Buffer.isBuffer(content) ? content.toString("utf8") : content).data;
  } catch (error) {
    errors.push(`${label}: cannot parse YAML frontmatter (${error.message})`);
    return { data: null, errors };
  }

  if (change.action === "create" && data.status !== "draft") {
    errors.push(`${label}: Harvest-created articles must use status=draft (found ${String(data.status)})`);
  }
  if (change.action === "create") {
    const contentCanonicalId = data.canonicalArticleId ?? data.canonical_article_id;
    if (contentCanonicalId !== undefined && contentCanonicalId !== null) {
      errors.push(`${label}: Harvest create must not assign canonicalArticleId before human review`);
    }
  }

  const verificationLevel = data.verificationLevel ?? data.verification;
  if (verificationLevel === "Official" && !hasOfficialAppleSource(data)) {
    errors.push(`${label}: verification=Official requires at least one HTTPS support.apple.com source`);
  }

  if (change.action === "redirect") {
    const contentCanonicalId = data.canonicalArticleId ?? data.canonical_article_id;
    if (contentCanonicalId !== change.canonicalArticleId) {
      errors.push(`${label}: redirect canonicalArticleId must match frontmatter canonicalArticleId`);
    }
    const contentArticleId = String(data.id ?? data.slug ?? "").trim();
    if (contentArticleId && contentCanonicalId === contentArticleId) {
      errors.push(`${label}: redirect cannot point an article to itself`);
    }
  }

  return { data, errors };
}

export function validateHarvestArticleContent(content, change, options = {}) {
  const label = options.label ?? change.path ?? "Harvest article";
  const result = inspectHarvestArticleContent(content, change, label);
  if (result.errors.length) throw new HarvestValidationError(result.errors);
  return { data: result.data };
}

function inspectHarvestArticleTransition(baseContent, proposedContent, change, label) {
  const errors = [];
  if (change.action === "create" || baseContent === null) return errors;

  let baseData;
  let proposedData;
  try {
    baseData = matter(Buffer.isBuffer(baseContent) ? baseContent.toString("utf8") : baseContent).data;
  } catch (error) {
    errors.push(`${label}: cannot parse base YAML frontmatter (${error.message})`);
    return errors;
  }
  try {
    proposedData = matter(Buffer.isBuffer(proposedContent) ? proposedContent.toString("utf8") : proposedContent).data;
  } catch (error) {
    errors.push(`${label}: cannot parse proposed YAML frontmatter (${error.message})`);
    return errors;
  }

  for (const field of ["id", "slug", "status"]) {
    if (!sameMetadataValue(baseData[field], proposedData[field])) {
      errors.push(`${label}: Harvest ${change.action} cannot change ${field}; use a separate human-reviewed change`);
    }
  }
  if (change.action === "update") {
    const baseCanonicalId = baseData.canonicalArticleId ?? baseData.canonical_article_id;
    const proposedCanonicalId = proposedData.canonicalArticleId ?? proposedData.canonical_article_id;
    if (!sameMetadataValue(baseCanonicalId, proposedCanonicalId)) {
      errors.push(`${label}: update cannot change canonicalArticleId; use redirect or a separate human-reviewed change`);
    }
  }
  return errors;
}

export function validateHarvestArticleTransition(baseContent, proposedContent, change, options = {}) {
  const label = options.label ?? change.path ?? "Harvest article";
  const errors = inspectHarvestArticleTransition(baseContent, proposedContent, change, label);
  if (errors.length) throw new HarvestValidationError(errors);
  return { valid: true };
}

function readWorkingFile(cwd, relativePath, errors) {
  const absolutePath = path.join(cwd, ...relativePath.split("/"));

  if (!fs.existsSync(absolutePath)) {
    errors.push(`${relativePath}: proposed file does not exist in the working tree`);
    return null;
  }

  const fileStat = fs.lstatSync(absolutePath);
  if (!fileStat.isFile() || fileStat.isSymbolicLink()) {
    errors.push(`${relativePath}: proposed path must be a regular file, not a symlink`);
    return null;
  }

  const cookbookRoot = fs.realpathSync(path.join(cwd, "cookbook"));
  const realFilePath = fs.realpathSync(absolutePath);
  if (realFilePath !== cookbookRoot && !realFilePath.startsWith(`${cookbookRoot}${path.sep}`)) {
    errors.push(`${relativePath}: resolved path escapes cookbook/`);
    return null;
  }

  return fs.readFileSync(absolutePath);
}

function readBaseFile(cwd, baseCommit, relativePath) {
  if (!gitSucceeds(cwd, ["cat-file", "-e", `${baseCommit}:${relativePath}`])) return null;
  return git(cwd, ["show", `${baseCommit}:${relativePath}`], { encoding: null });
}

function validateManifestShape(manifest, label, errors) {
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
    errors.push(`${label}: manifest must be a JSON object`);
    return;
  }

  const unknownFields = Object.keys(manifest).filter((field) => !MANIFEST_KEYS.has(field));
  if (unknownFields.length) errors.push(`${label}: manifest contains unknown fields: ${unknownFields.join(", ")}`);
  if (manifest.schemaVersion !== 2) errors.push(`${label}: schemaVersion must be 2`);
  if (typeof manifest.runId !== "string" || !/^[a-z0-9][a-z0-9._-]{2,99}$/i.test(manifest.runId)) {
    errors.push(`${label}: runId must be 3-100 safe identifier characters`);
  }
  if (
    typeof manifest.automationId !== "string" ||
    manifest.automationId.trim() !== manifest.automationId ||
    manifest.automationId.length < 2 ||
    manifest.automationId.length > 100
  ) {
    errors.push(`${label}: automationId must be a trimmed 2-100 character producer identifier`);
  }
  if (!isIsoDateTime(manifest.generatedAt)) errors.push(`${label}: generatedAt must be a valid UTC ISO timestamp`);
  if (typeof manifest.baseCommit !== "string" || !COMMIT_PATTERN.test(manifest.baseCommit)) {
    errors.push(`${label}: baseCommit must be a full 40-64 character lowercase Git object ID`);
  }
  if (!Array.isArray(manifest.changes) || manifest.changes.length === 0 || manifest.changes.length > 20) {
    errors.push(`${label}: changes must contain 1-20 entries`);
  }
}

export function harvestArticleIdsAtCommit(cwd, commit) {
  const articleIds = new Set();
  if (!COMMIT_PATTERN.test(commit ?? "") || !gitSucceeds(cwd, ["cat-file", "-e", `${commit}^{commit}`])) {
    return articleIds;
  }

  const articlePaths = git(cwd, ["ls-tree", "-r", "--name-only", "-z", commit, "--", "cookbook"])
    .split("\0")
    .filter((filePath) => filePath.endsWith(".md"));
  for (const articlePath of articlePaths) {
    const content = readBaseFile(cwd, commit, articlePath);
    if (content === null) continue;
    try {
      const data = matter(content.toString("utf8")).data;
      const articleId = String(data.id ?? data.slug ?? "").trim();
      if (articleId) articleIds.add(articleId);
    } catch {
      // The content validator reports malformed base articles separately.
    }
  }
  return articleIds;
}

export function validateHarvestManifest(manifest, options = {}) {
  const cwd = path.resolve(options.cwd ?? process.cwd());
  const label = options.label ?? "harvest manifest";
  const expectedBase = options.expectedBase;
  const errors = [];

  validateManifestShape(manifest, label, errors);
  if (!manifest || typeof manifest !== "object" || !Array.isArray(manifest.changes)) {
    throw new HarvestValidationError(errors);
  }

  const { baseCommit } = manifest;
  if (typeof baseCommit === "string" && COMMIT_PATTERN.test(baseCommit)) {
    if (!gitSucceeds(cwd, ["cat-file", "-e", `${baseCommit}^{commit}`])) {
      errors.push(`${label}: baseCommit ${baseCommit} is not available as a commit`);
    } else if (!gitSucceeds(cwd, ["merge-base", "--is-ancestor", baseCommit, "HEAD"])) {
      errors.push(`${label}: baseCommit ${baseCommit} is not an ancestor of HEAD`);
    }

    if (expectedBase && baseCommit !== expectedBase) {
      errors.push(`${label}: baseCommit ${baseCommit} does not match the current PR base ${expectedBase}; regenerate or rebase the Harvest proposal`);
    }
  }

  const seenPaths = new Set();
  const validatedPaths = new Set();
  const baseArticleIds = typeof baseCommit === "string" && COMMIT_PATTERN.test(baseCommit)
    ? harvestArticleIdsAtCommit(cwd, baseCommit)
    : new Set();

  for (const [index, change] of manifest.changes.entries()) {
    const changeLabel = `${label}: changes[${index}]`;
    if (!change || typeof change !== "object" || Array.isArray(change)) {
      errors.push(`${changeLabel} must be an object`);
      continue;
    }

    const unknownFields = Object.keys(change).filter((field) => !CHANGE_KEYS.has(field));
    if (unknownFields.length) {
      errors.push(`${changeLabel} contains unknown fields: ${unknownFields.join(", ")}`);
    }

    const pathError = validateCookbookPath(change.path);
    if (pathError) {
      errors.push(`${changeLabel}.path ${pathError}`);
      continue;
    }

    if (seenPaths.has(change.path)) {
      errors.push(`${changeLabel}.path duplicates ${change.path}`);
      continue;
    }
    seenPaths.add(change.path);
    validatedPaths.add(change.path);

    if (!ACTIONS.has(change.action)) {
      errors.push(`${changeLabel}.action must be create, update, or redirect`);
      continue;
    }

    if (!HASH_PATTERN.test(change.proposedContentHash ?? "")) {
      errors.push(`${changeLabel}.proposedContentHash must use sha256:<64 lowercase hex characters>`);
    }

    const isCreate = change.action === "create";
    if (isCreate && change.baseContentHash !== null) {
      errors.push(`${changeLabel}.baseContentHash must be null for create`);
    }
    if (!isCreate && !HASH_PATTERN.test(change.baseContentHash ?? "")) {
      errors.push(`${changeLabel}.baseContentHash must use sha256:<64 lowercase hex characters>`);
    }

    if (change.action === "redirect" && (typeof change.canonicalArticleId !== "string" || !change.canonicalArticleId.trim())) {
      errors.push(`${changeLabel}.canonicalArticleId is required for redirect`);
    } else if (change.action === "redirect" && !baseArticleIds.has(change.canonicalArticleId)) {
      errors.push(`${changeLabel}.canonicalArticleId must identify an article present at baseCommit`);
    } else if (change.action !== "redirect" && Object.hasOwn(change, "canonicalArticleId")) {
      errors.push(`${changeLabel}.canonicalArticleId is only allowed for redirect`);
    }
    if (!isNonEmptyString(change.reason, 1000)) {
      errors.push(`${changeLabel}.reason must explain the proposed change in 1-1000 characters`);
    }
    validateCanonicalReview(change.canonicalReview, change.action, change.canonicalArticleId, changeLabel, errors);

    const workingContent = readWorkingFile(cwd, change.path, errors);
    const baseContent = typeof baseCommit === "string" && COMMIT_PATTERN.test(baseCommit)
      ? readBaseFile(cwd, baseCommit, change.path)
      : null;

    if (isCreate && baseContent !== null) {
      errors.push(`${change.path}: create cannot replace a path that exists at baseCommit`);
    }
    if (!isCreate && baseContent === null) {
      errors.push(`${change.path}: ${change.action} requires the path to exist at baseCommit`);
    }

    if (baseContent !== null) {
      const actualBaseHash = contentHash(baseContent);
      if (change.baseContentHash !== actualBaseHash) {
        errors.push(`${change.path}: baseContentHash does not match baseCommit content (expected ${actualBaseHash})`);
      }
    }

    if (workingContent !== null) {
      const actualProposedHash = contentHash(workingContent);
      if (change.proposedContentHash !== actualProposedHash) {
        errors.push(`${change.path}: proposedContentHash does not match the checked-out file (expected ${actualProposedHash})`);
      }

      if (baseContent !== null && contentHash(baseContent) === actualProposedHash) {
        errors.push(`${change.path}: ${change.action} is a no-op; proposed content is identical to baseCommit`);
      }

      const articleInspection = inspectHarvestArticleContent(workingContent, change, change.path);
      errors.push(...articleInspection.errors);
      if (change.action === "update" && articleInspection.data) {
        const articleId = String(articleInspection.data.id ?? articleInspection.data.slug ?? "").trim();
        if (!articleId || !change.canonicalReview?.matchedArticleIds?.includes(articleId)) {
          errors.push(`${changeLabel}.canonicalReview.matchedArticleIds must include the updated article id or slug`);
        }
      }
      if (!isCreate && baseContent !== null) {
        errors.push(...inspectHarvestArticleTransition(baseContent, workingContent, change, change.path));
      }
    }
  }

  if (errors.length) throw new HarvestValidationError(errors);
  return { manifest, paths: validatedPaths };
}

function changedEntriesSince(cwd, baseCommit) {
  if (!COMMIT_PATTERN.test(baseCommit ?? "")) {
    throw new HarvestValidationError(["--changed-since must be a full 40-64 character lowercase Git object ID"]);
  }
  if (!gitSucceeds(cwd, ["cat-file", "-e", `${baseCommit}^{commit}`])) {
    throw new HarvestValidationError([`--changed-since commit ${baseCommit} is not available; use a full-history checkout`]);
  }

  const fields = git(cwd, ["diff", "--name-status", "-z", "--find-renames", `${baseCommit}...HEAD`, "--"])
    .split("\0");
  const entries = [];

  for (let index = 0; index < fields.length && fields[index];) {
    const statusToken = fields[index++];
    const status = statusToken[0];
    if (status === "R" || status === "C") {
      const sourcePath = fields[index++];
      const changedPath = fields[index++];
      entries.push({ status, statusToken, path: changedPath, sourcePath });
    } else {
      entries.push({ status, statusToken, path: fields[index++] });
    }
  }

  return entries;
}

export function validateHarvestRun(options = {}) {
  const cwd = path.resolve(options.cwd ?? process.cwd());
  let manifestPaths = options.manifestPaths?.map((value) => value.replaceAll("\\", "/")) ?? [];
  let changedPaths = null;
  let changedEntries = null;

  if (options.changedSince) {
    changedEntries = changedEntriesSince(cwd, options.changedSince);
    changedPaths = changedEntries.flatMap((entry) =>
      entry.sourcePath ? [entry.sourcePath, entry.path] : [entry.path]
    );

    const changedManifests = changedPaths.filter((filePath) => MANIFEST_PATH_PATTERN.test(filePath));
    manifestPaths = [...new Set([...manifestPaths, ...changedManifests])];
    const enforceHarvestBoundary = options.requireManifest || manifestPaths.length > 0;

    if (enforceHarvestBoundary) {
      const unsafeEntries = changedEntries.filter((entry) => !["A", "M"].includes(entry.status));
      const nonAllowlistedEntries = changedEntries.filter(
        (entry) => !MANIFEST_PATH_PATTERN.test(entry.path) && validateCookbookPath(entry.path) !== null
      );
      const boundaryErrors = [];
      if (unsafeEntries.length) {
        boundaryErrors.push(
          `Harvest proposals may only add or modify files; unsafe changes: ${unsafeEntries
            .map((entry) => `${entry.statusToken} ${entry.sourcePath ? `${entry.sourcePath} -> ` : ""}${entry.path}`)
            .join(", ")}`
        );
      }
      if (nonAllowlistedEntries.length) {
        boundaryErrors.push(
          `Harvest proposals may only change cookbook/**/*.md and one run manifest; unexpected paths: ${nonAllowlistedEntries
            .map((entry) => `${entry.statusToken} ${entry.path}`)
            .join(", ")}`
        );
      }
      if (boundaryErrors.length) throw new HarvestValidationError(boundaryErrors);
    }
  }

  if (manifestPaths.length === 0) {
    if (options.requireManifest) {
      throw new HarvestValidationError(["Harvest branch requires one changed harvest/manifests/*.json file"]);
    }
    return { skipped: true, message: "No changed Harvest manifest; ordinary PR validation skipped." };
  }

  if (manifestPaths.length > 1) {
    throw new HarvestValidationError([`A Harvest PR must contain exactly one changed manifest; found ${manifestPaths.length}`]);
  }

  const manifestPath = manifestPaths[0];
  if (!MANIFEST_PATH_PATTERN.test(manifestPath)) {
    throw new HarvestValidationError([`${manifestPath}: manifest path must match harvest/manifests/*.json`]);
  }

  if (changedEntries) {
    const manifestEntry = changedEntries.find((entry) => entry.path === manifestPath);
    if (!manifestEntry || manifestEntry.status !== "A") {
      throw new HarvestValidationError([`${manifestPath}: each Harvest run manifest must be newly added by its proposal`]);
    }
  }

  const manifest = parseManifestJson(cwd, manifestPath);
  if (manifestPath !== `harvest/manifests/${manifest.runId}.json`) {
    throw new HarvestValidationError([`${manifestPath}: filename must exactly match manifest runId ${String(manifest.runId)}`]);
  }
  if (options.expectedBranch) {
    const expectedBranches = new Set([
      `harvest/${manifest.runId}`,
      `automation/harvest/${manifest.runId}`
    ]);
    if (!expectedBranches.has(options.expectedBranch)) {
      throw new HarvestValidationError([
        `${manifestPath}: branch ${options.expectedBranch} must exactly match runId ${manifest.runId}`
      ]);
    }
  }
  const result = validateHarvestManifest(manifest, {
    cwd,
    expectedBase: options.expectedBase,
    label: manifestPath
  });

  if (changedPaths) {
    const changedCookbookPaths = new Set(changedPaths.filter((filePath) => validateCookbookPath(filePath) === null));
    const missingFromManifest = [...changedCookbookPaths].filter((filePath) => !result.paths.has(filePath));
    const missingFromDiff = [...result.paths].filter((filePath) => !changedCookbookPaths.has(filePath));
    const errors = [];

    if (missingFromManifest.length) {
      errors.push(`Changed cookbook files missing from manifest: ${missingFromManifest.join(", ")}`);
    }
    if (missingFromDiff.length) {
      errors.push(`Manifest paths not changed in this PR: ${missingFromDiff.join(", ")}`);
    }
    if (errors.length) throw new HarvestValidationError(errors);
  }

  return { skipped: false, manifestPath, changeCount: result.paths.size };
}

function parseArguments(argv) {
  const options = { manifestPaths: [] };
  const readValue = (index, argument) => {
    const value = argv[index + 1];
    if (typeof value !== "string" || value.startsWith("--")) {
      throw new HarvestValidationError([`${argument} requires a value`]);
    }
    return value;
  };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--manifest") options.manifestPaths.push(readValue(index++, argument));
    else if (argument === "--changed-since") options.changedSince = readValue(index++, argument);
    else if (argument === "--expected-base") options.expectedBase = readValue(index++, argument);
    else if (argument === "--expected-branch") options.expectedBranch = readValue(index++, argument);
    else if (argument === "--require") options.requireManifest = true;
    else if (argument === "--help" || argument === "-h") options.help = true;
    else throw new HarvestValidationError([`Unknown argument: ${argument}`]);
  }

  if (options.manifestPaths.some((value) => typeof value !== "string")) {
    throw new HarvestValidationError(["--manifest requires a path"]);
  }
  if (options.expectedBranch !== undefined && typeof options.expectedBranch !== "string") {
    throw new HarvestValidationError(["--expected-branch requires a branch name"]);
  }
  return options;
}

function usage() {
  return `Usage:
  node scripts/validate-harvest-run.mjs --manifest harvest/manifests/<run>.json [--expected-base <sha>]
  node scripts/validate-harvest-run.mjs --changed-since <sha> [--expected-base <sha>] [--expected-branch <name>] [--require]

Without a manifest, the command skips ordinary PRs unless --require is set.`;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  try {
    const options = parseArguments(process.argv.slice(2));
    if (options.help) {
      console.log(usage());
    } else {
      const result = validateHarvestRun(options);
      if (result.skipped) console.log(`Harvest validation: skipped. ${result.message}`);
      else console.log(`Harvest validation: passed ${result.manifestPath} (${result.changeCount} changes).`);
    }
  } catch (error) {
    if (error instanceof HarvestValidationError) {
      console.error(error.message);
      for (const detail of error.errors) console.error(`ERROR ${detail}`);
      process.exitCode = 1;
    } else {
      throw error;
    }
  }
}
