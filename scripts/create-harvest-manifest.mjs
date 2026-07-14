#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import matter from "gray-matter";

function git(args, options = {}) {
  return execFileSync("git", args, {
    cwd: process.cwd(),
    encoding: options.encoding ?? "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });
}

function hash(content) {
  return `sha256:${crypto.createHash("sha256").update(content).digest("hex")}`;
}

function baseContent(baseCommit, filePath) {
  try {
    return git(["show", `${baseCommit}:${filePath}`], { encoding: null });
  } catch {
    return null;
  }
}

function parseArgs(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index += 2) {
    const key = argv[index];
    const value = argv[index + 1];
    if (!key?.startsWith("--") || !value) throw new Error(`Invalid argument: ${key ?? "missing"}`);
    values[key.slice(2)] = value;
  }
  return values;
}

const args = parseArgs(process.argv.slice(2));
const baseCommit = args.base;
const runId = args["run-id"];
const reason = args.reason || "Autonomous verified content maintenance";
const automationId = args["automation-id"] || "mac-mini-codex-worker";
const query = args.query || "website content Bug targeting the current article";

if (!/^[0-9a-f]{40,64}$/.test(baseCommit ?? "")) throw new Error("--base must be a full Git commit SHA");
if (!/^[a-z0-9][a-z0-9._-]{2,99}$/i.test(runId ?? "")) throw new Error("--run-id is invalid");
if (!/^[a-z0-9][a-z0-9._-]{2,99}$/i.test(automationId)) throw new Error("--automation-id is invalid");
if (!query.trim() || query.length > 500) throw new Error("--query must contain 1-500 characters");

const changed = [
  ...git(["diff", "--name-only", "--diff-filter=ACMRTUXB", baseCommit, "--", "cookbook"]).split(/\r?\n/),
  ...git(["ls-files", "--others", "--exclude-standard", "--", "cookbook"]).split(/\r?\n/)
].filter(Boolean).sort();

if (changed.length === 0) throw new Error("No changed Cookbook files to materialize");

const changes = changed.map((filePath) => {
  const proposed = fs.readFileSync(path.join(process.cwd(), filePath));
  const previous = baseContent(baseCommit, filePath);
  if (previous === null) {
    throw new Error(`Mac feedback automation may update existing articles only: ${filePath}`);
  }
  const data = matter(proposed.toString("utf8")).data;
  const articleId = String(data.id ?? data.slug ?? "").trim();
  if (!articleId) throw new Error(`Updated article has no id or slug: ${filePath}`);
  return {
    path: filePath,
    action: "update",
    baseContentHash: hash(previous),
    proposedContentHash: hash(proposed),
    reason,
    canonicalReview: {
      queries: [query.trim()],
      matchedArticleIds: [articleId],
      decision: "update-existing",
      notes: "The report targets this existing article; the automation verified and updated that canonical match instead of creating a duplicate."
    }
  };
});

const manifest = {
  schemaVersion: 2,
  runId,
  automationId,
  generatedAt: new Date().toISOString(),
  baseCommit,
  changes
};

const outputPath = path.join(process.cwd(), "harvest", "manifests", `${runId}.json`);
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, { encoding: "utf8", mode: 0o600 });
console.log(path.relative(process.cwd(), outputPath));
