import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, it } from "node:test";
import {
  buildProposedArticleContent,
  createAdminArticleEditProposal,
  hashArticleContent,
  readAdminArticleSource,
  type AdminArticleEditProposal
} from "./admin-article-edits.ts";
import {
  getEditableArticleSections,
  removeEditableArticleSection,
  validateEditableArticleBody
} from "./article-content.ts";

const temporaryRoots: string[] = [];
const fixedNow = new Date("2026-07-14T08:00:00.000Z");

const articleBody = `# 测试文章

这是一段导语。

## 症状

- 无法完成操作。

## 可能原因

- 设置不正确。

## Apple 官方方案

1. 打开设置并检查选项。

## 补充处理思路（社区）

- 这是可以删除的可选内容。

## 零售排查流程

1. 复现问题。

## 升级处理

- 联系支持。

## 相关问题

- 暂无。
`;

const articleRaw = `---
title: 测试文章
slug: test-article
device:
  - iPhone
category: iPhone
tags:
  - 测试
aliases: []
verification: Official
difficulty: Quick
updated: 2026-07-01
official_sources:
  - https://support.apple.com/zh-cn/100000
community_sources: []
status: canonical
popular: false
---

${articleBody}`;

async function makeArticleRoot() {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "apple-cookbook-admin-edit-test-"));
  temporaryRoots.push(root);
  const filePath = path.join(root, "cookbook", "iPhone", "test-article.md");
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, articleRaw, "utf8");
  return { root, filePath, article: { filePath: "iPhone/test-article.md" } };
}

afterEach(async () => {
  await Promise.all(temporaryRoots.splice(0).map((root) => fs.rm(root, { recursive: true, force: true })));
});

describe("administrator article structure", () => {
  it("deletes an optional H2 section without touching neighbouring core sections", () => {
    const sections = getEditableArticleSections(articleBody);
    const optional = sections.find((section) => section.title.includes("补充处理思路"));
    assert.ok(optional);

    const nextBody = removeEditableArticleSection(articleBody, optional.index);

    assert.doesNotMatch(nextBody, /补充处理思路/);
    assert.match(nextBody, /## Apple 官方方案/);
    assert.match(nextBody, /## 零售排查流程/);
    assert.equal(validateEditableArticleBody(nextBody), null);
  });

  it("refuses to delete or omit a required section", () => {
    const symptom = getEditableArticleSections(articleBody).find((section) => section.title === "症状");
    assert.ok(symptom);
    assert.throws(() => removeEditableArticleSection(articleBody, symptom.index), /不能删除/);
    assert.match(validateEditableArticleBody(articleBody.replace(/^## 症状[\s\S]*?(?=^## )/m, "")) ?? "", /症状/);
  });

  it("rejects duplicate headings and reordered core sections", () => {
    assert.match(validateEditableArticleBody(`${articleBody}\n## 症状\n\n重复`) ?? "", /重复/);
    const reordered = articleBody.replace("## 症状", "## 临时").replace("## 可能原因", "## 症状").replace("## 临时", "## 可能原因");
    assert.match(validateEditableArticleBody(reordered) ?? "", /顺序/);
  });
});

describe("administrator article edit proposals", () => {
  it("builds a persistent full-file proposal with hashes and an updated date", async () => {
    const { root, article } = await makeArticleRoot();
    const dataRoot = path.join(root, "data");
    const source = await readAdminArticleSource(article, root);
    const changedBody = source.body.replace("打开设置并检查选项", "打开“设置”并检查正确选项");

    const proposal = await createAdminArticleEditProposal({
      article,
      title: "更新后的测试文章",
      body: changedBody,
      expectedHash: source.contentHash,
      reason: "修正文案",
      contentRoot: root,
      dataRoot,
      now: fixedNow
    });
    const persisted = JSON.parse(
      await fs.readFile(path.join(dataRoot, "article-edits", "pending", `${proposal.proposalId}.json`), "utf8")
    ) as AdminArticleEditProposal;

    assert.match(proposal.proposalId, /^AE-20260714-[A-Z0-9]{8}$/);
    assert.equal(persisted.articlePath, "cookbook/iPhone/test-article.md");
    assert.equal(persisted.baseContentHash, hashArticleContent(articleRaw));
    assert.equal(persisted.proposedContentHash, hashArticleContent(persisted.proposedContent));
    assert.match(persisted.proposedContent, /^title: "更新后的测试文章"$/m);
    assert.match(persisted.proposedContent, /^updated: 2026-07-14$/m);
    assert.match(persisted.proposedContent, /^# 更新后的测试文章$/m);
    assert.match(persisted.proposedContent, /打开“设置”并检查正确选项/);
  });

  it("rejects stale editor tabs and duplicate pending edits", async () => {
    const { root, article } = await makeArticleRoot();
    const dataRoot = path.join(root, "data");
    const source = await readAdminArticleSource(article, root);
    const input = {
      article,
      title: "测试文章已修改",
      body: source.body.replace("这是一段导语", "这是一段更新后的导语"),
      expectedHash: source.contentHash,
      contentRoot: root,
      dataRoot,
      now: fixedNow
    };

    await assert.rejects(
      createAdminArticleEditProposal({ ...input, expectedHash: `sha256:${"0".repeat(64)}` }),
      /文章已在别处更新/
    );
    await createAdminArticleEditProposal(input);
    await assert.rejects(createAdminArticleEditProposal(input), /已有待发布/);
  });

  it("refuses article symlinks even when they point to Markdown", async () => {
    const { root, article, filePath } = await makeArticleRoot();
    const targetPath = path.join(root, "target.md");
    await fs.rename(filePath, targetPath);
    await fs.symlink(targetPath, filePath);

    await assert.rejects(readAdminArticleSource(article, root), /普通 Markdown 文件/);
  });

  it("keeps v2 summaries editable without reserializing the rest of frontmatter", () => {
    const v2Raw = articleRaw
      .replace("title: 测试文章", "schemaVersion: 2\ntitle: 测试文章\nsummary: 原摘要")
      .replace("updated: 2026-07-01", "lastUpdatedAt: 2026-07-01");
    const proposed = buildProposedArticleContent(v2Raw, {
      body: articleBody,
      title: "测试文章",
      summary: "新的公开摘要",
      now: fixedNow
    });

    assert.match(proposed, /^summary: "新的公开摘要"$/m);
    assert.match(proposed, /^lastUpdatedAt: 2026-07-14$/m);
    assert.match(proposed, /^official_sources:/m);
  });
});
