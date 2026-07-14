import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { afterEach, test } from "node:test";
import {
  ArticleEditProposalError,
  applyArticleEditProposal,
  validateArticleEditProposal
} from "./apply-article-edit-proposal.mjs";
import { contentHash } from "./validate-harvest-run.mjs";

const temporaryDirectories = [];
const defaultProposalId = "AE-20260714-ABC123EF";

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

function git(cwd, args) {
  return execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });
}

function setupRepository() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "apple-cookbook-admin-edit-"));
  temporaryDirectories.push(root);
  const cwd = path.join(root, "checkout");
  const proposalRoot = path.join(root, "proposals");
  const articlePath = "cookbook/iPhone/existing-article.md";
  const absoluteArticlePath = path.join(cwd, articlePath);
  const baseContent = "---\ntitle: Existing article\nslug: existing-article\n---\n\n## 症状\n\nOriginal.\n";

  fs.mkdirSync(path.dirname(absoluteArticlePath), { recursive: true });
  fs.mkdirSync(proposalRoot, { recursive: true });
  fs.writeFileSync(absoluteArticlePath, baseContent, { encoding: "utf8", mode: 0o640 });
  git(cwd, ["init", "-q"]);
  git(cwd, ["config", "user.email", "admin-edit-test@example.com"]);
  git(cwd, ["config", "user.name", "Admin Edit Test"]);
  git(cwd, ["add", "."]);
  git(cwd, ["commit", "-q", "-m", "base"]);

  return { root, cwd, proposalRoot, articlePath, absoluteArticlePath, baseContent };
}

function proposalFor(context, overrides = {}) {
  const proposedContent = overrides.proposedContent ?? context.baseContent.replace("Original.", "Updated.");
  return {
    schemaVersion: 1,
    proposalId: defaultProposalId,
    createdAt: "2026-07-14T08:30:00.000Z",
    articlePath: context.articlePath,
    baseContentHash: contentHash(Buffer.from(context.baseContent)),
    proposedContentHash: contentHash(Buffer.from(proposedContent)),
    proposedContent,
    reason: "Feedback AE test: administrator approved the wording change.",
    ...overrides
  };
}

function writeProposal(context, proposal, fileName = `${proposal.proposalId}.json`) {
  const proposalPath = path.join(context.proposalRoot, fileName);
  fs.writeFileSync(proposalPath, `${JSON.stringify(proposal)}\n`, "utf8");
  return proposalPath;
}

function errorDetails(callback) {
  try {
    callback();
    assert.fail("Expected ArticleEditProposalError");
  } catch (error) {
    assert.ok(error instanceof ArticleEditProposalError, error.stack);
    return error.errors.join("\n");
  }
}

test("applies one valid proposal atomically and returns deterministic Harvest identifiers", () => {
  const context = setupRepository();
  const proposal = proposalFor(context);
  const proposalPath = writeProposal(context, proposal);
  const originalMode = fs.statSync(context.absoluteArticlePath).mode & 0o777;

  const result = applyArticleEditProposal({ cwd: context.cwd, proposalPath });

  assert.equal(fs.readFileSync(context.absoluteArticlePath, "utf8"), proposal.proposedContent);
  assert.equal(fs.statSync(context.absoluteArticlePath).mode & 0o777, originalMode);
  assert.equal(result.proposalId, defaultProposalId);
  assert.equal(result.runId, "admin-edit-ae-20260714-abc123ef");
  assert.equal(result.branch, "harvest/admin-edit-ae-20260714-abc123ef");
  assert.deepEqual(git(context.cwd, ["status", "--short"]).trim().split(/\r?\n/), [
    "M cookbook/iPhone/existing-article.md"
  ]);
  assert.equal(Object.hasOwn(result, "proposedContent"), false);
});

test("strict schema validation rejects unsupported fields, malformed IDs, and no-op hashes", () => {
  const context = setupRepository();
  const valid = proposalFor(context);

  const details = errorDetails(() => validateArticleEditProposal({
    ...valid,
    proposalId: "ae-unsafe",
    proposedContentHash: valid.baseContentHash,
    unexpected: true
  }));

  assert.match(details, /contains 1 unsupported field/);
  assert.match(details, /proposalId must match/);
  assert.match(details, /must differ from the base/);
});

test("path validation rejects traversal, absolute paths, backslashes, and non-Markdown targets", () => {
  const context = setupRepository();
  const valid = proposalFor(context);
  const unsafePaths = [
    "cookbook/../secrets.md",
    "/cookbook/iPhone/article.md",
    "cookbook\\iPhone\\article.md",
    "cookbook/iPhone/article.mdx",
    "cookbook/iPhone/article\u001b.md"
  ];

  for (const articlePath of unsafePaths) {
    const details = errorDetails(() => validateArticleEditProposal({ ...valid, articlePath }));
    assert.match(details, /articlePath/);
  }
});

test("rejects a stale proposal without changing a newer working-tree article", () => {
  const context = setupRepository();
  const proposal = proposalFor(context);
  const proposalPath = writeProposal(context, proposal);
  const newerContent = context.baseContent.replace("Original.", "A newer human edit.");
  fs.writeFileSync(context.absoluteArticlePath, newerContent, "utf8");

  const details = errorDetails(() => applyArticleEditProposal({ cwd: context.cwd, proposalPath }));

  assert.match(details, /stale proposal/);
  assert.equal(fs.readFileSync(context.absoluteArticlePath, "utf8"), newerContent);
});

test("rejects a proposed-content hash mismatch without touching the article", () => {
  const context = setupRepository();
  const proposal = proposalFor(context, { proposedContentHash: `sha256:${"f".repeat(64)}` });
  const proposalPath = writeProposal(context, proposal);

  const details = errorDetails(() => applyArticleEditProposal({ cwd: context.cwd, proposalPath }));

  assert.match(details, /proposedContentHash does not match proposedContent/);
  assert.equal(fs.readFileSync(context.absoluteArticlePath, "utf8"), context.baseContent);
});

test("rejects article and proposal symlinks", () => {
  const articleContext = setupRepository();
  const articleProposal = proposalFor(articleContext);
  const articleProposalPath = writeProposal(articleContext, articleProposal);
  const outsideArticle = path.join(articleContext.root, "outside.md");
  fs.writeFileSync(outsideArticle, articleContext.baseContent, "utf8");
  fs.rmSync(articleContext.absoluteArticlePath);
  fs.symlinkSync(outsideArticle, articleContext.absoluteArticlePath);

  const articleDetails = errorDetails(() => applyArticleEditProposal({
    cwd: articleContext.cwd,
    proposalPath: articleProposalPath
  }));
  assert.match(articleDetails, /article must be a regular file, not a symlink/);

  const proposalContext = setupRepository();
  const proposal = proposalFor(proposalContext);
  const realProposalPath = writeProposal(proposalContext, proposal, "stored.json");
  const linkedProposalPath = path.join(proposalContext.proposalRoot, `${proposal.proposalId}.json`);
  fs.symlinkSync(realProposalPath, linkedProposalPath);

  const proposalDetails = errorDetails(() => applyArticleEditProposal({
    cwd: proposalContext.cwd,
    proposalPath: linkedProposalPath
  }));
  assert.match(proposalDetails, /proposal path must be a regular file, not a symlink/);
});

test("requires the proposal filename to match its ID and the article to be tracked", () => {
  const filenameContext = setupRepository();
  const filenameProposal = proposalFor(filenameContext);
  const wrongFilenamePath = writeProposal(filenameContext, filenameProposal, "wrong.json");
  const filenameDetails = errorDetails(() => applyArticleEditProposal({
    cwd: filenameContext.cwd,
    proposalPath: wrongFilenamePath
  }));
  assert.match(filenameDetails, /filename must match proposalId/);

  const trackedContext = setupRepository();
  const untrackedPath = "cookbook/iPhone/untracked.md";
  const untrackedContent = trackedContext.baseContent.replaceAll("existing-article", "untracked");
  fs.writeFileSync(path.join(trackedContext.cwd, untrackedPath), untrackedContent, "utf8");
  const untrackedProposal = proposalFor(trackedContext, {
    articlePath: untrackedPath,
    baseContentHash: contentHash(Buffer.from(untrackedContent)),
    proposedContent: untrackedContent.replace("Original.", "Updated."),
    proposedContentHash: contentHash(Buffer.from(untrackedContent.replace("Original.", "Updated.")))
  });
  const untrackedProposalPath = writeProposal(trackedContext, untrackedProposal);
  const trackedDetails = errorDetails(() => applyArticleEditProposal({
    cwd: trackedContext.cwd,
    proposalPath: untrackedProposalPath
  }));
  assert.match(trackedDetails, /must already be tracked by Git/);
});

test("refuses to apply into a checkout with unrelated dirty files", () => {
  const context = setupRepository();
  const proposal = proposalFor(context);
  const proposalPath = writeProposal(context, proposal);
  fs.writeFileSync(path.join(context.cwd, "unrelated.txt"), "do not include me\n", "utf8");

  const details = errorDetails(() => applyArticleEditProposal({ cwd: context.cwd, proposalPath }));

  assert.match(details, /working tree must be clean/);
  assert.equal(fs.readFileSync(context.absoluteArticlePath, "utf8"), context.baseContent);
});

test("the published JSON Schema mirrors the strict proposal ID and hash contracts", () => {
  const schema = JSON.parse(fs.readFileSync(
    path.resolve("schemas/article-edit-proposal.schema.json"),
    "utf8"
  ));
  const context = setupRepository();
  const proposal = proposalFor(context);

  assert.equal(schema.additionalProperties, false);
  assert.deepEqual(new Set(schema.required), new Set([
    "schemaVersion",
    "proposalId",
    "createdAt",
    "articlePath",
    "baseContentHash",
    "proposedContentHash",
    "proposedContent"
  ]));
  assert.equal(new RegExp(schema.properties.proposalId.pattern).test(proposal.proposalId), true);
  assert.equal(new RegExp(schema.$defs.contentHash.pattern).test(proposal.baseContentHash), true);
});

test("the publisher workflow targets exact dispatch IDs, shares the proposal lock, and requires an event-capable token", () => {
  const workflow = fs.readFileSync(
    path.resolve(".github/workflows/publish-admin-article-edit.yml"),
    "utf8"
  );

  assert.match(workflow, /workflow_dispatch:\n\s+inputs:\n\s+proposal_id:/);
  assert.match(workflow, /REQUESTED_PROPOSAL_ID:/);
  assert.match(workflow, /\.proposal\.lock/g);
  assert.doesNotMatch(workflow, /article-edits\/\.queue\.lock/);
  assert.ok(workflow.includes("GH_TOKEN: ${{ secrets.ADMIN_ARTICLE_EDIT_PUBLISH_TOKEN }}"));
  assert.ok(!workflow.includes("GH_TOKEN: ${{ github.token }}"));
  assert.match(workflow, /node scripts\/create-harvest-manifest\.mjs/);
  assert.match(workflow, /gh pr create/);
});
