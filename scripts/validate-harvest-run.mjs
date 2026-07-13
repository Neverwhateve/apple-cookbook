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
const ACTIONS = new Set(["create", "update", "redirect"]);

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
    encoding: options.encoding ?? "utf8",
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

function parseJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new HarvestValidationError([
      `${path.relative(process.cwd(), filePath) || filePath}: cannot read valid JSON (${error.message})`
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
    segments.some((segment) => !segment || segment === "." || segment === ".." || segment.includes(":")) ||
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

  if (manifest.schemaVersion !== 1) errors.push(`${label}: schemaVersion must be 1`);
  if (typeof manifest.runId !== "string" || !/^[a-z0-9][a-z0-9._-]{2,99}$/i.test(manifest.runId)) {
    errors.push(`${label}: runId must be 3-100 safe identifier characters`);
  }
  if (typeof manifest.automationId !== "string" || manifest.automationId.trim().length < 2) {
    errors.push(`${label}: automationId must identify the producing automation`);
  }
  if (!isIsoDateTime(manifest.generatedAt)) errors.push(`${label}: generatedAt must be a valid UTC ISO timestamp`);
  if (typeof manifest.baseCommit !== "string" || !COMMIT_PATTERN.test(manifest.baseCommit)) {
    errors.push(`${label}: baseCommit must be a full 40-64 character lowercase Git object ID`);
  }
  if (!Array.isArray(manifest.changes) || manifest.changes.length === 0) {
    errors.push(`${label}: changes must be a non-empty array`);
  }
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

  for (const [index, change] of manifest.changes.entries()) {
    const changeLabel = `${label}: changes[${index}]`;
    if (!change || typeof change !== "object" || Array.isArray(change)) {
      errors.push(`${changeLabel} must be an object`);
      continue;
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
    }

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

      let data;
      try {
        data = matter(workingContent.toString("utf8")).data;
      } catch (error) {
        errors.push(`${change.path}: cannot parse YAML frontmatter (${error.message})`);
        continue;
      }

      if (isCreate && data.status !== "canonical") {
        errors.push(`${change.path}: auto-published Harvest articles must use status=canonical (found ${String(data.status)})`);
      }

      const verificationLevel = data.verificationLevel ?? data.verification;
      if (verificationLevel === "Official" && !hasOfficialAppleSource(data)) {
        errors.push(`${change.path}: verification=Official requires at least one HTTPS support.apple.com source`);
      }

      if (change.action === "redirect") {
        const contentCanonicalId = data.canonicalArticleId ?? data.canonical_article_id;
        if (contentCanonicalId !== change.canonicalArticleId) {
          errors.push(`${change.path}: redirect canonicalArticleId must match frontmatter canonicalArticleId`);
        }
      }
    }
  }

  if (errors.length) throw new HarvestValidationError(errors);
  return { manifest, paths: validatedPaths };
}

function changedPathsSince(cwd, baseCommit) {
  if (!COMMIT_PATTERN.test(baseCommit ?? "")) {
    throw new HarvestValidationError(["--changed-since must be a full 40-64 character lowercase Git object ID"]);
  }
  if (!gitSucceeds(cwd, ["cat-file", "-e", `${baseCommit}^{commit}`])) {
    throw new HarvestValidationError([`--changed-since commit ${baseCommit} is not available; use a full-history checkout`]);
  }

  return git(cwd, ["diff", "--name-only", "--diff-filter=AM", `${baseCommit}...HEAD`, "--"])
    .split(/\r?\n/)
    .filter(Boolean);
}

export function validateHarvestRun(options = {}) {
  const cwd = path.resolve(options.cwd ?? process.cwd());
  let manifestPaths = options.manifestPaths?.map((value) => value.replaceAll("\\", "/")) ?? [];
  let changedPaths = null;

  if (options.changedSince) {
    changedPaths = changedPathsSince(cwd, options.changedSince);
    const changedManifests = changedPaths.filter((filePath) => MANIFEST_PATH_PATTERN.test(filePath));
    manifestPaths = [...new Set([...manifestPaths, ...changedManifests])];
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

  const absoluteManifestPath = path.join(cwd, ...manifestPath.split("/"));
  const manifest = parseJson(absoluteManifestPath);
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
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--manifest") options.manifestPaths.push(argv[++index]);
    else if (argument === "--changed-since") options.changedSince = argv[++index];
    else if (argument === "--expected-base") options.expectedBase = argv[++index];
    else if (argument === "--require") options.requireManifest = true;
    else if (argument === "--help" || argument === "-h") options.help = true;
    else throw new HarvestValidationError([`Unknown argument: ${argument}`]);
  }

  if (options.manifestPaths.some((value) => typeof value !== "string")) {
    throw new HarvestValidationError(["--manifest requires a path"]);
  }
  return options;
}

function usage() {
  return `Usage:
  node scripts/validate-harvest-run.mjs --manifest harvest/manifests/<run>.json [--expected-base <sha>]
  node scripts/validate-harvest-run.mjs --changed-since <sha> [--expected-base <sha>] [--require]

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
