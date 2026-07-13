import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { afterEach, test } from "node:test";
import {
  HarvestValidationError,
  contentHash,
  validateCookbookPath,
  validateHarvestManifest,
  validateHarvestRun
} from "./validate-harvest-run.mjs";

const temporaryRepositories = [];

afterEach(() => {
  for (const directory of temporaryRepositories.splice(0)) {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

function git(cwd, args, encoding = "utf8") {
  return execFileSync("git", args, { cwd, encoding, stdio: ["ignore", "pipe", "pipe"] });
}

function article({
  title = "Existing article",
  slug = "existing-article",
  status = "reviewed",
  verification = "Official",
  officialSources = ["https://support.apple.com/zh-cn/guide/iphone/welcome/ios"],
  canonicalArticleId
} = {}) {
  const frontmatter = [
    "---",
    `title: ${title}`,
    `slug: ${slug}`,
    "device:",
    "  - iPhone",
    "category: iPhone",
    "tags:",
    "  - Test",
    "aliases: []",
    `verification: ${verification}`,
    "difficulty: Quick",
    "updated: 2026-07-13",
    ...(officialSources.length ? ["official_sources:", ...officialSources.map((url) => `  - ${url}`)] : ["official_sources: []"]),
    "community_sources: []",
    `status: ${status}`,
    "popular: false",
    ...(canonicalArticleId ? [`canonicalArticleId: ${canonicalArticleId}`] : []),
    "---",
    "",
    "## 症状",
    "",
    "Test.",
    ""
  ];
  return frontmatter.join("\n");
}

function setupRepository() {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "apple-cookbook-harvest-"));
  temporaryRepositories.push(cwd);
  fs.mkdirSync(path.join(cwd, "cookbook", "iPhone"), { recursive: true });
  fs.writeFileSync(path.join(cwd, "cookbook", "iPhone", "existing-article.md"), article());
  git(cwd, ["init", "-q"]);
  git(cwd, ["config", "user.email", "harvest-test@example.com"]);
  git(cwd, ["config", "user.name", "Harvest Test"]);
  git(cwd, ["add", "."]);
  git(cwd, ["commit", "-q", "-m", "base"]);
  return { cwd, baseCommit: git(cwd, ["rev-parse", "HEAD"]).trim() };
}

function hashFile(filePath) {
  return contentHash(fs.readFileSync(filePath));
}

function manifest(baseCommit, changes) {
  return {
    schemaVersion: 1,
    runId: "daily-2026-07-13",
    automationId: "daily-harvest",
    generatedAt: "2026-07-13T10:00:00.000Z",
    baseCommit,
    changes
  };
}

function errorDetails(callback) {
  try {
    callback();
    assert.fail("Expected HarvestValidationError");
  } catch (error) {
    assert.ok(error instanceof HarvestValidationError);
    return error.errors.join("\n");
  }
}

test("path validation rejects traversal, absolute paths, and non-Markdown content", () => {
  assert.equal(validateCookbookPath("cookbook/iPhone/safe.md"), null);
  assert.match(validateCookbookPath("cookbook/../secrets.md"), /normalized|traversal/);
  assert.match(validateCookbookPath("/cookbook/iPhone/safe.md"), /repository-relative/);
  assert.match(validateCookbookPath("cookbook/iPhone/safe.mdx"), /Markdown/);
});

test("a valid draft create matches the base and proposed hashes", () => {
  const { cwd, baseCommit } = setupRepository();
  const relativePath = "cookbook/iPhone/new-article.md";
  const absolutePath = path.join(cwd, relativePath);
  fs.writeFileSync(absolutePath, article({ title: "New article", slug: "new-article", status: "draft" }));

  const result = validateHarvestManifest(
    manifest(baseCommit, [{
      path: relativePath,
      action: "create",
      baseContentHash: null,
      proposedContentHash: hashFile(absolutePath)
    }]),
    { cwd, expectedBase: baseCommit }
  );

  assert.deepEqual([...result.paths], [relativePath]);
});

test("create rejects published status and Official content without an official source", () => {
  const { cwd, baseCommit } = setupRepository();
  const relativePath = "cookbook/iPhone/unsafe-create.md";
  const absolutePath = path.join(cwd, relativePath);
  fs.writeFileSync(
    absolutePath,
    article({ title: "Unsafe create", slug: "unsafe-create", status: "reviewed", officialSources: [] })
  );

  const details = errorDetails(() => validateHarvestManifest(
    manifest(baseCommit, [{
      path: relativePath,
      action: "create",
      baseContentHash: null,
      proposedContentHash: hashFile(absolutePath)
    }]),
    { cwd }
  ));

  assert.match(details, /status=draft/);
  assert.match(details, /verification=Official requires/);
});

test("v2 verificationLevel Official rejects non-official structured sources", () => {
  const { cwd, baseCommit } = setupRepository();
  const relativePath = "cookbook/iPhone/v2-unsafe-create.md";
  const absolutePath = path.join(cwd, relativePath);
  const v2Article = article({
    title: "V2 unsafe create",
    slug: "v2-unsafe-create",
    status: "draft",
    verification: "Unknown",
    officialSources: []
  }).replace(
    "verification: Unknown",
    [
      "schemaVersion: 2",
      "verificationLevel: Official",
      "verification: Unknown",
      "sources:",
      "  - title: Community report",
      "    url: https://example.com/report",
      "    publisher: Example",
      "    sourceType: community",
      "    official: false"
    ].join("\n")
  );
  fs.writeFileSync(absolutePath, v2Article);

  const details = errorDetails(() => validateHarvestManifest(
    manifest(baseCommit, [{
      path: relativePath,
      action: "create",
      baseContentHash: null,
      proposedContentHash: hashFile(absolutePath)
    }]),
    { cwd }
  ));

  assert.match(details, /verification=Official requires/);
});

test("update rejects a stale base hash and a mismatched proposed hash", () => {
  const { cwd, baseCommit } = setupRepository();
  const relativePath = "cookbook/iPhone/existing-article.md";
  fs.appendFileSync(path.join(cwd, relativePath), "\nUpdated.\n");

  const details = errorDetails(() => validateHarvestManifest(
    manifest(baseCommit, [{
      path: relativePath,
      action: "update",
      baseContentHash: `sha256:${"0".repeat(64)}`,
      proposedContentHash: `sha256:${"f".repeat(64)}`
    }]),
    { cwd }
  ));

  assert.match(details, /baseContentHash does not match/);
  assert.match(details, /proposedContentHash does not match/);
});

test("update rejects no-op content", () => {
  const { cwd, baseCommit } = setupRepository();
  const relativePath = "cookbook/iPhone/existing-article.md";
  const fileHash = hashFile(path.join(cwd, relativePath));

  const details = errorDetails(() => validateHarvestManifest(
    manifest(baseCommit, [{
      path: relativePath,
      action: "update",
      baseContentHash: fileHash,
      proposedContentHash: fileHash
    }]),
    { cwd }
  ));

  assert.match(details, /no-op/);
});

test("duplicate paths and redirect metadata mismatches fail", () => {
  const { cwd, baseCommit } = setupRepository();
  const relativePath = "cookbook/iPhone/existing-article.md";
  const absolutePath = path.join(cwd, relativePath);
  const baseHash = hashFile(absolutePath);
  fs.writeFileSync(absolutePath, article({ canonicalArticleId: "canonical-a" }));
  const proposedHash = hashFile(absolutePath);

  const details = errorDetails(() => validateHarvestManifest(
    manifest(baseCommit, [
      {
        path: relativePath,
        action: "redirect",
        baseContentHash: baseHash,
        proposedContentHash: proposedHash,
        canonicalArticleId: "canonical-b"
      },
      {
        path: relativePath,
        action: "update",
        baseContentHash: baseHash,
        proposedContentHash: proposedHash
      }
    ]),
    { cwd }
  ));

  assert.match(details, /must match frontmatter/);
  assert.match(details, /duplicates/);
});

test("changed-since validates one complete manifest and skips ordinary PRs", () => {
  const { cwd, baseCommit } = setupRepository();
  assert.equal(validateHarvestRun({ cwd }).skipped, true);

  const relativePath = "cookbook/iPhone/new-article.md";
  const absolutePath = path.join(cwd, relativePath);
  fs.writeFileSync(absolutePath, article({ title: "New article", slug: "new-article", status: "draft" }));

  const manifestPath = "harvest/manifests/daily-2026-07-13.json";
  fs.mkdirSync(path.join(cwd, "harvest", "manifests"), { recursive: true });
  fs.writeFileSync(
    path.join(cwd, manifestPath),
    `${JSON.stringify(manifest(baseCommit, [{
      path: relativePath,
      action: "create",
      baseContentHash: null,
      proposedContentHash: hashFile(absolutePath)
    }]), null, 2)}\n`
  );
  git(cwd, ["add", "."]);
  git(cwd, ["commit", "-q", "-m", "harvest proposal"]);

  const result = validateHarvestRun({
    cwd,
    changedSince: baseCommit,
    expectedBase: baseCommit,
    requireManifest: true
  });
  assert.equal(result.skipped, false);
  assert.equal(result.changeCount, 1);
});
