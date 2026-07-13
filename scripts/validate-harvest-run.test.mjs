import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { afterEach, test } from "node:test";
import {
  HarvestValidationError,
  contentHash,
  validateCookbookPath,
  validateHarvestManifest,
  validateHarvestRun
} from "./validate-harvest-run.mjs";

const temporaryRepositories = [];
const validatorPath = fileURLToPath(new URL("./validate-harvest-run.mjs", import.meta.url));

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
  fs.writeFileSync(
    path.join(cwd, "cookbook", "iPhone", "canonical-target.md"),
    article({ title: "Canonical target", slug: "canonical-target" })
  );
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
    schemaVersion: 2,
    runId: "daily-2026-07-13",
    automationId: "daily-harvest",
    generatedAt: "2026-07-13T10:00:00.000Z",
    baseCommit,
    changes: changes.map((change) => ({
      reason: "Test Harvest proposal",
      canonicalReview: {
        queries: ["test symptom"],
        matchedArticleIds: change.action === "redirect"
          ? [change.canonicalArticleId]
          : change.action === "update"
            ? ["existing-article"]
            : [],
        decision: change.action === "create"
          ? "create-new"
          : change.action === "update"
            ? "update-existing"
            : "redirect-to-existing",
        notes: "Compared symptom and alias matches before proposing this change."
      },
      ...change
    }))
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
  assert.match(validateCookbookPath("cookbook/.hidden/safe.md"), /traversal/);
});

test("CLI options that require values fail closed when their value is missing", () => {
  for (const argument of ["--manifest", "--changed-since", "--expected-base", "--expected-branch"]) {
    const result = spawnSync(process.execPath, [validatorPath, argument], {
      encoding: "utf8",
      env: process.env
    });
    assert.equal(result.status, 1);
    assert.match(result.stderr, new RegExp(`${argument} requires a value`));
  }
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

test("create cannot pre-assign canonicalArticleId before review", () => {
  const { cwd, baseCommit } = setupRepository();
  const relativePath = "cookbook/iPhone/unsafe-create.md";
  const absolutePath = path.join(cwd, relativePath);
  fs.writeFileSync(
    absolutePath,
    article({ title: "Unsafe create", slug: "unsafe-create", status: "draft", canonicalArticleId: "canonical-target" })
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
  assert.match(details, /must not assign canonicalArticleId before human review/);
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

test("missing or inconsistent canonical review evidence fails", () => {
  const { cwd, baseCommit } = setupRepository();
  const relativePath = "cookbook/iPhone/new-article.md";
  const absolutePath = path.join(cwd, relativePath);
  fs.writeFileSync(absolutePath, article({ title: "New article", slug: "new-article", status: "draft" }));

  const unsafeManifest = manifest(baseCommit, [{
    path: relativePath,
    action: "create",
    baseContentHash: null,
    proposedContentHash: hashFile(absolutePath)
  }]);
  delete unsafeManifest.changes[0].canonicalReview;
  delete unsafeManifest.changes[0].reason;

  const details = errorDetails(() => validateHarvestManifest(unsafeManifest, { cwd }));
  assert.match(details, /reason must explain/);
  assert.match(details, /canonicalReview must be an object/);

  unsafeManifest.changes[0].reason = "Create a distinct symptom article.";
  unsafeManifest.changes[0].canonicalReview = {
    queries: ["test symptom"],
    matchedArticleIds: [],
    decision: "update-existing",
    notes: "No equivalent canonical article was found."
  };
  const mismatch = errorDetails(() => validateHarvestManifest(unsafeManifest, { cwd }));
  assert.match(mismatch, /decision must be create-new/);
});

test("manifest v2 rejects legacy versions, unknown fields, and update identity mismatches", () => {
  const { cwd, baseCommit } = setupRepository();
  const relativePath = "cookbook/iPhone/existing-article.md";
  const absolutePath = path.join(cwd, relativePath);
  const baseHash = hashFile(absolutePath);
  fs.appendFileSync(absolutePath, "\nUpdated.\n");
  const candidate = manifest(baseCommit, [{
    path: relativePath,
    action: "update",
    baseContentHash: baseHash,
    proposedContentHash: hashFile(absolutePath)
  }]);
  candidate.schemaVersion = 1;
  candidate.unknown = true;
  candidate.changes[0].canonicalReview.matchedArticleIds = ["another-article"];

  const details = errorDetails(() => validateHarvestManifest(candidate, { cwd }));
  assert.match(details, /schemaVersion must be 2/);
  assert.match(details, /manifest contains unknown fields: unknown/);
  assert.match(details, /must include the updated article id or slug/);
});

test("Harvest updates cannot promote status, replace identity, or change canonicalArticleId", () => {
  for (const mutation of ["status", "slug", "canonicalArticleId"]) {
    const { cwd, baseCommit } = setupRepository();
    const relativePath = "cookbook/iPhone/existing-article.md";
    const absolutePath = path.join(cwd, relativePath);
    const baseHash = hashFile(absolutePath);
    const proposed = mutation === "status"
      ? article({ status: "canonical" })
      : mutation === "slug"
        ? article({ slug: "changed-identity" })
        : article({ canonicalArticleId: "canonical-target" });
    fs.writeFileSync(absolutePath, proposed);
    const candidate = manifest(baseCommit, [{
      path: relativePath,
      action: "update",
      baseContentHash: baseHash,
      proposedContentHash: hashFile(absolutePath)
    }]);
    if (mutation === "slug") {
      candidate.changes[0].canonicalReview.matchedArticleIds = ["changed-identity"];
    }

    const details = errorDetails(() => validateHarvestManifest(candidate, { cwd }));
    assert.match(
      details,
      mutation === "canonicalArticleId"
        ? /update cannot change canonicalArticleId/
        : new RegExp(`cannot change ${mutation}`)
    );
  }
});

test("redirect requires an existing non-self canonical target", () => {
  const { cwd, baseCommit } = setupRepository();
  const relativePath = "cookbook/iPhone/existing-article.md";
  const absolutePath = path.join(cwd, relativePath);
  const baseHash = hashFile(absolutePath);
  fs.writeFileSync(absolutePath, article({ canonicalArticleId: "canonical-target" }));

  const validManifest = manifest(baseCommit, [{
    path: relativePath,
    action: "redirect",
    baseContentHash: baseHash,
    proposedContentHash: hashFile(absolutePath),
    canonicalArticleId: "canonical-target"
  }]);
  assert.equal(validateHarvestManifest(validManifest, { cwd }).paths.has(relativePath), true);

  fs.writeFileSync(absolutePath, article({ canonicalArticleId: "existing-article" }));
  const selfRedirect = manifest(baseCommit, [{
    path: relativePath,
    action: "redirect",
    baseContentHash: baseHash,
    proposedContentHash: hashFile(absolutePath),
    canonicalArticleId: "existing-article"
  }]);
  const selfDetails = errorDetails(() => validateHarvestManifest(selfRedirect, { cwd }));
  assert.match(selfDetails, /redirect cannot point an article to itself/);

  selfRedirect.changes[0].canonicalArticleId = "missing-target";
  selfRedirect.changes[0].canonicalReview.matchedArticleIds = ["missing-target"];
  const missingDetails = errorDetails(() => validateHarvestManifest(selfRedirect, { cwd }));
  assert.match(missingDetails, /must identify an article present at baseCommit/);
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

test("ordinary code or documentation PRs skip the Harvest-only diff boundary", () => {
  const { cwd, baseCommit } = setupRepository();
  fs.mkdirSync(path.join(cwd, "docs"), { recursive: true });
  fs.writeFileSync(path.join(cwd, "docs", "ordinary-change.md"), "# Ordinary change\n");
  git(cwd, ["add", "."]);
  git(cwd, ["commit", "-q", "-m", "ordinary docs change"]);

  const result = validateHarvestRun({ cwd, changedSince: baseCommit });
  assert.equal(result.skipped, true);
});

test("run manifest filename must exactly match its runId", () => {
  const { cwd, baseCommit } = setupRepository();
  const relativePath = "cookbook/iPhone/new-article.md";
  const absolutePath = path.join(cwd, relativePath);
  fs.writeFileSync(absolutePath, article({ title: "New article", slug: "new-article", status: "draft" }));
  const manifestPath = "harvest/manifests/wrong-run-id.json";
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

  const details = errorDetails(() => validateHarvestRun({ cwd, manifestPaths: [manifestPath] }));
  assert.match(details, /filename must exactly match manifest runId/);
});

test("run manifest rejects branch mismatches and symlink files", () => {
  const { cwd, baseCommit } = setupRepository();
  const relativePath = "cookbook/iPhone/new-article.md";
  const absolutePath = path.join(cwd, relativePath);
  fs.writeFileSync(absolutePath, article({ title: "New article", slug: "new-article", status: "draft" }));
  const manifestPath = "harvest/manifests/daily-2026-07-13.json";
  const manifestDirectory = path.join(cwd, "harvest", "manifests");
  fs.mkdirSync(manifestDirectory, { recursive: true });
  const realManifestPath = path.join(cwd, "real-manifest.json");
  fs.writeFileSync(
    realManifestPath,
    `${JSON.stringify(manifest(baseCommit, [{
      path: relativePath,
      action: "create",
      baseContentHash: null,
      proposedContentHash: hashFile(absolutePath)
    }]), null, 2)}\n`
  );
  fs.symlinkSync(realManifestPath, path.join(cwd, manifestPath));

  const symlinkDetails = errorDetails(() => validateHarvestRun({ cwd, manifestPaths: [manifestPath] }));
  assert.match(symlinkDetails, /regular file, not a symlink/);

  fs.unlinkSync(path.join(cwd, manifestPath));
  fs.copyFileSync(realManifestPath, path.join(cwd, manifestPath));
  const branchDetails = errorDetails(() => validateHarvestRun({
    cwd,
    manifestPaths: [manifestPath],
    expectedBranch: "harvest/different-run"
  }));
  assert.match(branchDetails, /branch harvest\/different-run must exactly match runId/);
});

test("changed-since rejects deleted or renamed Cookbook files", () => {
  for (const change of ["delete", "rename"]) {
    const { cwd, baseCommit } = setupRepository();
    const sourcePath = "cookbook/iPhone/existing-article.md";
    if (change === "delete") fs.unlinkSync(path.join(cwd, sourcePath));
    else fs.renameSync(path.join(cwd, sourcePath), path.join(cwd, "cookbook/iPhone/renamed-article.md"));
    git(cwd, ["add", "-A"]);
    git(cwd, ["commit", "-q", "-m", change]);

    const details = errorDetails(() => validateHarvestRun({
      cwd,
      changedSince: baseCommit,
      requireManifest: true
    }));
    assert.match(details, /may only add or modify files/);
    assert.match(details, change === "delete" ? /D cookbook\/iPhone\/existing-article\.md/ : /R\d*/);
  }
});

test("changed-since rejects files outside the Cookbook and run manifest allowlist", () => {
  const { cwd, baseCommit } = setupRepository();
  const relativePath = "cookbook/iPhone/new-article.md";
  const absolutePath = path.join(cwd, relativePath);
  fs.writeFileSync(absolutePath, article({ title: "New article", slug: "new-article", status: "draft" }));
  fs.mkdirSync(path.join(cwd, ".github", "workflows"), { recursive: true });
  fs.writeFileSync(path.join(cwd, ".github", "workflows", "unsafe.yml"), "name: unsafe\n");

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
  git(cwd, ["commit", "-q", "-m", "unsafe extra path"]);

  const details = errorDetails(() => validateHarvestRun({
    cwd,
    changedSince: baseCommit,
    expectedBase: baseCommit,
    requireManifest: true
  }));
  assert.match(details, /unexpected paths/);
  assert.match(details, /\.github\/workflows\/unsafe\.yml/);
});
