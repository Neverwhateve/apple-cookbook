import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { afterEach, test } from "node:test";
import {
  HarvestProposalError,
  generateHarvestProposal,
  readProposalInput
} from "./generate-harvest-proposal.mjs";
import { contentHash, validateHarvestManifest } from "./validate-harvest-run.mjs";

const RUN_ID = "daily-2026-07-13T100000Z";
const temporaryRepositories = [];
const generatorPath = fileURLToPath(new URL("./generate-harvest-proposal.mjs", import.meta.url));

afterEach(() => {
  for (const directory of temporaryRepositories.splice(0)) {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

function git(cwd, args, encoding = "utf8") {
  return execFileSync("git", args, { cwd, encoding, stdio: ["ignore", "pipe", "pipe"] });
}

function article({
  slug = "existing-article",
  title = "现有测试文章",
  summary = "用于验证 Harvest 安全物化流程。",
  status = "draft",
  verificationLevel = "Unknown",
  canonicalArticleId = null
} = {}) {
  return `---
schemaVersion: 2
id: ${slug}
title: ${title}
slug: ${slug}
summary: ${summary}
symptoms:
  - 测试症状
devices:
  - iPhone
platforms:
  - iOS
systemVersions:
  - iOS 18
categories:
  - iPhone
tags:
  - Test
keywords:
  - harvest
aliases: []
errorMessages: []
officialTerms: []
communityTerms: []
difficulty: Quick
estimatedTime: 5 分钟
verificationLevel: ${verificationLevel}
status: ${status}
canonicalArticleId: ${canonicalArticleId === null ? "null" : canonicalArticleId}
solutions:
  - id: inspect-state
    title: 检查当前状态
    summary: null
    kind: recommended
    steps:
      - 记录当前状态并交由人工复核。
    verificationLevel: Unknown
    sourceIds: []
    warnings: []
    limitations: []
warnings: []
limitations: []
sources: []
lastVerifiedAt: null
lastUpdatedAt: 2026-07-13
createdAt: 2026-07-13
relatedArticles: []
popular: false
---

# ${title}

${summary}

## 症状

- 出现需要进一步复核的测试症状。

## 可能原因

- 当前证据不足，尚不能确定原因。

## Apple 官方方案

1. 暂不执行未核实操作，记录信息并等待人工确认。

## 零售排查流程

1. 记录系统版本和完整错误提示。

## 升级处理

如果仍未解决，请提交给人工复核。

## 相关问题

暂无。
`;
}

function setupRepository() {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "apple-cookbook-harvest-generator-"));
  temporaryRepositories.push(cwd);
  fs.mkdirSync(path.join(cwd, "cookbook", "iPhone"), { recursive: true });
  fs.writeFileSync(path.join(cwd, "cookbook", "iPhone", "existing-article.md"), article());
  fs.writeFileSync(
    path.join(cwd, "cookbook", "iPhone", "canonical-target.md"),
    article({ slug: "canonical-target", title: "Canonical target article" })
  );
  git(cwd, ["init", "-q"]);
  git(cwd, ["config", "user.email", "harvest-generator-test@example.com"]);
  git(cwd, ["config", "user.name", "Harvest Generator Test"]);
  git(cwd, ["add", "."]);
  git(cwd, ["commit", "-q", "-m", "base"]);
  const baseCommit = git(cwd, ["rev-parse", "HEAD"]).trim();
  git(cwd, ["switch", "-q", "-c", `harvest/${RUN_ID}`]);
  return { cwd, baseCommit };
}

function review(action, articleId) {
  return {
    queries: ["测试症状", "test symptom"],
    matchedArticleIds: action === "create" ? [] : [articleId],
    decision: action === "create"
      ? "create-new"
      : action === "update"
        ? "update-existing"
        : "redirect-to-existing",
    notes: action === "create"
      ? "已按症状和别名检索，未发现可合并的 canonical article。"
      : "已确认该症状应归入现有 canonical article。"
  };
}

function proposal(baseCommit, changes) {
  return {
    schemaVersion: 1,
    runId: RUN_ID,
    automationId: "daily-harvest",
    generatedAt: "2026-07-13T10:00:00.000Z",
    baseCommit,
    changes
  };
}

function createChange({ slug = "new-article", status = "draft" } = {}) {
  return {
    path: `cookbook/iPhone/${slug}.md`,
    action: "create",
    reason: "A distinct symptom cluster needs human review.",
    canonicalReview: review("create", slug),
    content: article({ slug, title: "新的测试文章", status })
  };
}

function updateChange(content = article({ summary: "这是一项经过重新整理、等待复核的更新。" })) {
  return {
    path: "cookbook/iPhone/existing-article.md",
    action: "update",
    reason: "Clarify the symptom summary without changing its canonical identity.",
    canonicalReview: review("update", "existing-article"),
    content
  };
}

function proposalError(callback) {
  try {
    callback();
    assert.fail("Expected HarvestProposalError");
  } catch (error) {
    assert.ok(error instanceof HarvestProposalError, error.stack);
    return error.details.join("\n");
  }
}

test("dry-run validates a create without writing repository files", () => {
  const { cwd, baseCommit } = setupRepository();
  const input = proposal(baseCommit, [createChange()]);
  const before = git(cwd, ["status", "--porcelain=v1"]);

  const result = generateHarvestProposal(input, { cwd });

  assert.equal(result.mode, "dry-run");
  assert.equal(result.result, "would-materialize");
  assert.equal(result.effectiveChangeCount, 1);
  assert.equal(result.filesToWrite, 2);
  assert.equal(fs.existsSync(path.join(cwd, "cookbook/iPhone/new-article.md")), false);
  assert.equal(fs.existsSync(path.join(cwd, "harvest")), false);
  assert.equal(git(cwd, ["status", "--porcelain=v1"]), before);
});

test("CLI defaults to dry-run with proposal input outside the checkout", () => {
  const { cwd, baseCommit } = setupRepository();
  const inputDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "apple-cookbook-harvest-input-"));
  temporaryRepositories.push(inputDirectory);
  const inputPath = path.join(inputDirectory, `${RUN_ID}.json`);
  fs.writeFileSync(inputPath, `${JSON.stringify(proposal(baseCommit, [createChange()]), null, 2)}\n`);

  const result = spawnSync(process.execPath, [generatorPath, "--input", inputPath], {
    cwd,
    encoding: "utf8",
    env: process.env
  });

  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).mode, "dry-run");
  assert.equal(fs.existsSync(path.join(cwd, "cookbook/iPhone/new-article.md")), false);
  assert.equal(fs.existsSync(path.join(cwd, "harvest")), false);
  assert.equal(git(cwd, ["status", "--porcelain=v1"]), "");
});

test("write materializes exact Markdown and a valid deterministic manifest", () => {
  const { cwd, baseCommit } = setupRepository();
  const change = createChange();
  const input = proposal(baseCommit, [change]);

  const result = generateHarvestProposal(input, { cwd, write: true });
  const articlePath = path.join(cwd, change.path);
  const manifestPath = path.join(cwd, result.manifestPath);
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  assert.equal(result.result, "materialized");
  assert.deepEqual(result.filesWritten, [change.path, result.manifestPath]);
  assert.equal(fs.readFileSync(articlePath, "utf8"), change.content);
  assert.equal(manifest.changes[0].baseContentHash, null);
  assert.equal(manifest.changes[0].proposedContentHash, contentHash(Buffer.from(change.content)));
  assert.equal(manifest.changes[0].canonicalReview.decision, "create-new");
  validateHarvestManifest(manifest, { cwd, expectedBase: baseCommit });
});

test("identical rerun is idempotent and preserves the exact Git diff", () => {
  const { cwd, baseCommit } = setupRepository();
  const input = proposal(baseCommit, [createChange()]);
  generateHarvestProposal(input, { cwd, write: true });
  const articlePath = path.join(cwd, "cookbook/iPhone/new-article.md");
  const manifestPath = path.join(cwd, `harvest/manifests/${RUN_ID}.json`);
  const beforeArticle = fs.readFileSync(articlePath);
  const beforeManifest = fs.readFileSync(manifestPath);
  const beforeStatus = git(cwd, ["status", "--porcelain=v1"]);
  const manifestMtime = fs.statSync(manifestPath).mtimeMs;

  const result = generateHarvestProposal(input, { cwd, write: true });

  assert.equal(result.result, "already-materialized");
  assert.equal(result.filesToWrite, 0);
  assert.deepEqual(result.filesWritten, []);
  assert.deepEqual(fs.readFileSync(articlePath), beforeArticle);
  assert.deepEqual(fs.readFileSync(manifestPath), beforeManifest);
  assert.equal(git(cwd, ["status", "--porcelain=v1"]), beforeStatus);
  assert.equal(fs.statSync(manifestPath).mtimeMs, manifestMtime);
});

test("an all-no-op update produces no article or manifest diff", () => {
  const { cwd, baseCommit } = setupRepository();
  const existing = fs.readFileSync(path.join(cwd, "cookbook/iPhone/existing-article.md"), "utf8");

  const result = generateHarvestProposal(proposal(baseCommit, [updateChange(existing)]), { cwd, write: true });

  assert.equal(result.result, "no-op");
  assert.equal(result.effectiveChangeCount, 0);
  assert.equal(result.noOpCount, 1);
  assert.equal(fs.existsSync(path.join(cwd, "harvest")), false);
  assert.equal(git(cwd, ["status", "--porcelain=v1"]), "");
});

test("mixed proposals omit no-op changes from the manifest", () => {
  const { cwd, baseCommit } = setupRepository();
  const existing = fs.readFileSync(path.join(cwd, "cookbook/iPhone/existing-article.md"), "utf8");
  const input = proposal(baseCommit, [createChange(), updateChange(existing)]);

  const result = generateHarvestProposal(input, { cwd, write: true });
  const manifest = JSON.parse(fs.readFileSync(path.join(cwd, result.manifestPath), "utf8"));

  assert.equal(result.effectiveChangeCount, 1);
  assert.equal(result.noOpCount, 1);
  assert.deepEqual(manifest.changes.map((change) => change.path), ["cookbook/iPhone/new-article.md"]);
});

test("update hashes the exact base and proposed bytes", () => {
  const { cwd, baseCommit } = setupRepository();
  const baseContent = fs.readFileSync(path.join(cwd, "cookbook/iPhone/existing-article.md"));
  const change = updateChange();
  const result = generateHarvestProposal(proposal(baseCommit, [change]), { cwd, write: true });
  const manifest = JSON.parse(fs.readFileSync(path.join(cwd, result.manifestPath), "utf8"));

  assert.equal(manifest.changes[0].baseContentHash, contentHash(baseContent));
  assert.equal(manifest.changes[0].proposedContentHash, contentHash(Buffer.from(change.content)));
});

test("redirect materializes an existing canonical target without changing source identity or status", () => {
  const { cwd, baseCommit } = setupRepository();
  const baseContent = fs.readFileSync(path.join(cwd, "cookbook/iPhone/existing-article.md"));
  const content = article({ canonicalArticleId: "canonical-target" });
  const change = {
    path: "cookbook/iPhone/existing-article.md",
    action: "redirect",
    reason: "The symptom belongs to an existing canonical article.",
    canonicalArticleId: "canonical-target",
    canonicalReview: review("redirect", "canonical-target"),
    content
  };

  const result = generateHarvestProposal(proposal(baseCommit, [change]), { cwd, write: true });
  const manifest = JSON.parse(fs.readFileSync(path.join(cwd, result.manifestPath), "utf8"));

  assert.equal(manifest.changes[0].baseContentHash, contentHash(baseContent));
  assert.equal(manifest.changes[0].proposedContentHash, contentHash(Buffer.from(content)));
  assert.equal(manifest.changes[0].canonicalArticleId, "canonical-target");
  assert.equal(manifest.changes[0].canonicalReview.decision, "redirect-to-existing");
  validateHarvestManifest(manifest, { cwd, expectedBase: baseCommit });
});

test("unsafe create status and invalid corpus fail before any write", () => {
  const { cwd, baseCommit } = setupRepository();
  const details = proposalError(() => generateHarvestProposal(
    proposal(baseCommit, [createChange({ status: "canonical" })]),
    { cwd, write: true }
  ));

  assert.match(details, /status=draft/);
  assert.equal(fs.existsSync(path.join(cwd, "cookbook/iPhone/new-article.md")), false);
  assert.equal(fs.existsSync(path.join(cwd, "harvest")), false);
});

test("dry-run rejects status, identity, and canonical target transitions before writing", () => {
  for (const mutation of ["status", "identity", "canonical", "redirect-target"]) {
    const { cwd, baseCommit } = setupRepository();
    const content = mutation === "status"
      ? article({ status: "canonical" })
      : mutation === "identity"
        ? article({ slug: "changed-identity" })
        : article({ canonicalArticleId: "missing-target" });
    const change = mutation === "redirect-target"
      ? {
          path: "cookbook/iPhone/existing-article.md",
          action: "redirect",
          reason: "Redirect to a reviewed canonical target.",
          canonicalArticleId: "missing-target",
          canonicalReview: review("redirect", "missing-target"),
          content
        }
      : updateChange(content);
    if (mutation === "identity") change.canonicalReview.matchedArticleIds = ["changed-identity"];

    const details = proposalError(() => generateHarvestProposal(proposal(baseCommit, [change]), { cwd }));
    assert.match(
      details,
      mutation === "status"
        ? /cannot change status/
        : mutation === "identity"
          ? /cannot change (?:id|slug)/
          : mutation === "canonical"
            ? /update cannot change canonicalArticleId/
            : /redirect target must exist at baseCommit/
    );
    assert.equal(git(cwd, ["status", "--porcelain=v1"]), "");
  }
});

test("write failure rolls back articles, manifest, and created directories", () => {
  const { cwd, baseCommit } = setupRepository();
  const input = proposal(baseCommit, [createChange(), createChange({ slug: "second-new-article" })]);

  const details = proposalError(() => generateHarvestProposal(input, {
    cwd,
    write: true,
    testHooks: {
      afterManifestWrite() {
        throw new Error("simulated post-manifest failure");
      }
    }
  }));

  assert.match(details, /simulated post-manifest failure/);
  assert.equal(fs.existsSync(path.join(cwd, "cookbook/iPhone/new-article.md")), false);
  assert.equal(fs.existsSync(path.join(cwd, "cookbook/iPhone/second-new-article.md")), false);
  assert.equal(fs.existsSync(path.join(cwd, "harvest")), false);
  assert.equal(git(cwd, ["status", "--porcelain=v1"]), "");
});

test("rollback never overwrites a concurrent edit", () => {
  const { cwd, baseCommit } = setupRepository();
  const concurrentContent = "Concurrent human edit.\n";

  const details = proposalError(() => generateHarvestProposal(proposal(baseCommit, [createChange()]), {
    cwd,
    write: true,
    testHooks: {
      afterArticleWrites() {
        fs.writeFileSync(path.join(cwd, "cookbook/iPhone/new-article.md"), concurrentContent);
        throw new Error("simulated concurrent edit");
      }
    }
  }));

  assert.match(details, /rollback incomplete for: cookbook\/iPhone\/new-article\.md/);
  assert.equal(fs.readFileSync(path.join(cwd, "cookbook/iPhone/new-article.md"), "utf8"), concurrentContent);
  assert.equal(fs.existsSync(path.join(cwd, "harvest")), false);
});

test("human edits and undeclared paths are never overwritten", () => {
  for (const conflict of ["target", "undeclared"]) {
    const { cwd, baseCommit } = setupRepository();
    const existingPath = path.join(cwd, "cookbook/iPhone/existing-article.md");
    if (conflict === "target") fs.appendFileSync(existingPath, "\nHuman edit.\n");
    else fs.writeFileSync(path.join(cwd, "notes.txt"), "human note\n");
    const before = conflict === "target" ? fs.readFileSync(existingPath) : null;

    const details = proposalError(() => generateHarvestProposal(
      proposal(baseCommit, [updateChange()]),
      { cwd, write: true }
    ));

    assert.match(details, conflict === "target" ? /differs from both baseCommit/ : /undeclared paths/);
    if (before) assert.deepEqual(fs.readFileSync(existingPath), before);
    assert.equal(fs.existsSync(path.join(cwd, "harvest")), false);
  }
});

test("deleted targets, immutable manifests, and wrong branches fail closed", () => {
  {
    const { cwd, baseCommit } = setupRepository();
    fs.unlinkSync(path.join(cwd, "cookbook/iPhone/existing-article.md"));
    const details = proposalError(() => generateHarvestProposal(proposal(baseCommit, [updateChange()]), { cwd }));
    assert.match(details, /only additions and modifications/);
  }
  {
    const { cwd, baseCommit } = setupRepository();
    fs.mkdirSync(path.join(cwd, "harvest", "manifests"), { recursive: true });
    fs.writeFileSync(path.join(cwd, `harvest/manifests/${RUN_ID}.json`), "{}\n");
    const details = proposalError(() => generateHarvestProposal(proposal(baseCommit, [createChange()]), { cwd }));
    assert.match(details, /existing manifest differs/);
  }
  {
    const { cwd, baseCommit } = setupRepository();
    git(cwd, ["branch", "-m", "unsafe-branch"]);
    const details = proposalError(() => generateHarvestProposal(proposal(baseCommit, [createChange()]), { cwd }));
    assert.match(details, /branch must be harvest/);
  }
});

test("strict input rejects unknown fields, duplicate paths, and mismatched canonical decisions", () => {
  const { cwd, baseCommit } = setupRepository();
  const duplicate = createChange();
  const input = proposal(baseCommit, [duplicate, { ...duplicate }]);
  input.unexpected = true;
  input.changes[0].canonicalReview.decision = "update-existing";

  const details = proposalError(() => generateHarvestProposal(input, { cwd }));
  assert.match(details, /unknown fields: unexpected/);
  assert.match(details, /duplicates cookbook\/iPhone\/new-article\.md/);
  assert.match(details, /decision must be create-new/);
});

test("proposal input reader rejects symlinks and malformed JSON", () => {
  const { cwd } = setupRepository();
  const malformedPath = path.join(cwd, "malformed.json");
  const symlinkPath = path.join(cwd, "proposal-link.json");
  fs.writeFileSync(malformedPath, "{not-json\n");
  fs.symlinkSync(malformedPath, symlinkPath);

  assert.match(proposalError(() => readProposalInput(malformedPath)), /not valid JSON/);
  assert.match(proposalError(() => readProposalInput(symlinkPath)), /regular file, not a symlink/);
});
