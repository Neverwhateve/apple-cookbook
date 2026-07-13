import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, test } from "node:test";
import { spawnSync } from "node:child_process";

const validatorPath = fileURLToPath(new URL("./validate-content.mjs", import.meta.url));
const temporaryRoots = [];

afterEach(() => {
  for (const root of temporaryRoots.splice(0)) fs.rmSync(root, { recursive: true, force: true });
});

function v2Article({
  official = true,
  sourceUrl = "https://support.apple.com/zh-cn/guide/iphone/welcome/ios",
  solutionKind = "recommended",
  solutionVerification = "Official",
  additionalSolutions = ""
} = {}) {
  return `---
schemaVersion: 2
id: ac-v2-test
title: v2 内容校验测试
slug: v2-test
summary: 用于验证结构化来源和方案级可信等级。
symptoms:
  - 设置无法完成
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
  - validation
aliases: []
errorMessages: []
officialTerms:
  - Settings
communityTerms: []
difficulty: Quick
estimatedTime: 5 分钟
verificationLevel: Official
status: canonical
canonicalArticleId: ac-v2-test
solutions:
  - id: official-solution
    title: Apple 官方方案
    summary: null
    kind: ${solutionKind}
    steps:
      - 打开设置并检查状态。
    verificationLevel: ${solutionVerification}
    sourceIds:
      - apple-source
    warnings: []
    limitations: []
${additionalSolutions}
warnings: []
limitations: []
sources:
  - id: apple-source
    title: Apple 支持测试来源
    url: ${sourceUrl}
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-13
    publishedAt: null
    official: ${official}
lastVerifiedAt: 2026-07-13
lastUpdatedAt: 2026-07-13
createdAt: 2026-07-13
relatedArticles: []
popular: false
---

# v2 内容校验测试

这是一个只存在于临时测试目录的文章。

## 症状

- 设置无法完成。

## 可能原因

- 设置状态不一致。

## Apple 官方方案

1. 打开设置并检查状态。

## 零售排查流程

1. 复核设置。

## 升级处理

联系 Apple 支持。

## 相关问题

暂无。
`;
}

function v1Article({
  status = "canonical",
  popular = false,
  communitySources = [],
  communityHeading = "已验证的非官方处理思路"
} = {}) {
  return `---
title: v1 内容校验测试
slug: v2-test
device:
  - iPhone
category: iPhone
tags:
  - Test
aliases: []
verification: Official
difficulty: Quick
updated: 2026-07-13
official_sources:
  - https://support.apple.com/zh-cn/guide/iphone/welcome/ios
community_sources:${communitySources.length ? `\n${communitySources.map((url) => `  - ${url}`).join("\n")}` : " []"}
status: ${status}
popular: ${popular}
---

# v1 内容校验测试

用于验证 legacy warning 口径。

## 症状

- 设置无法完成。

## 可能原因

- 设置状态不一致。

## Apple 官方方案

1. 打开设置并检查状态。

## ${communityHeading}

- 这是明确标注的社区补充方法。

## 零售排查流程

1. 复核设置。

## 升级处理

联系 Apple 支持。

## 相关问题

暂无。
`;
}

function runValidator(article) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "apple-cookbook-content-validator-"));
  temporaryRoots.push(root);
  const articleRoot = path.join(root, "cookbook", "iPhone");
  fs.mkdirSync(articleRoot, { recursive: true });
  fs.writeFileSync(path.join(articleRoot, "v2-test.md"), article, "utf8");

  return spawnSync(process.execPath, [validatorPath], {
    cwd: root,
    encoding: "utf8",
    env: process.env
  });
}

test("content validator accepts a complete v2 canonical article", () => {
  const result = runValidator(v2Article());

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /1 articles \(0 v1, 1 v2\), 0 errors/);
});

test("content validator rejects an Official v2 article without an Official recommended solution", () => {
  for (const article of [
    v2Article({ solutionKind: "alternative" }),
    v2Article({ solutionVerification: "Likely" }),
    v2Article({
      solutionVerification: "Likely",
      additionalSolutions: `  - id: later-official-recommendation
    title: 后置的第二个推荐方案
    summary: null
    kind: recommended
    steps:
      - 执行另一个步骤。
    verificationLevel: Official
    sourceIds:
      - apple-source
    warnings: []
    limitations: []`
    })
  ]) {
    const result = runValidator(article);

    assert.equal(result.status, 1);
    assert.match(
      result.stderr,
      /Official 文章必须包含一个 kind=recommended 且 verificationLevel=Official 的主方案/
    );
  }
});

test("content validator accepts a safe Official recommendation with a Likely alternative", () => {
  const result = runValidator(
    v2Article({
      additionalSolutions: `  - id: likely-alternative
    title: 非官方替代方案
    summary: null
    kind: alternative
    steps:
      - 在确认适用条件后尝试替代步骤。
    verificationLevel: Likely
    sourceIds:
      - apple-source
    warnings: []
    limitations: []`
    })
  );

  assert.equal(result.status, 0, result.stderr);
  assert.doesNotMatch(result.stderr, /Official 文章必须包含一个 kind=recommended/);
});

test("content validator rejects Official v2 claims without an explicitly official Apple source", () => {
  const result = runValidator(v2Article({ official: false }));

  assert.equal(result.status, 1);
  assert.match(result.stderr, /标为 Official，但未引用 Apple 官方来源/);
  assert.match(result.stderr, /Official 文章必须至少有一个显式标记/);
});

test("content validator rejects community citations mixed into an Official solution", () => {
  const article = v2Article()
    .replace(
      "    sourceIds:\n      - apple-source",
      "    sourceIds:\n      - apple-source\n      - community-source"
    )
    .replace(
      "    official: true\nlastVerifiedAt:",
      `    official: true
  - id: community-source
    title: 社区案例
    url: https://discussions.apple.com/thread/123456
    publisher: Apple Support Community
    sourceType: community
    accessedAt: 2026-07-13
    publishedAt: null
    official: false
lastVerifiedAt:`
    );
  const result = runValidator(article);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /标为 Official，但引用了非官方来源：community-source/);
});

test("content validator keeps seed popularity out of the indexable coverage denominator", () => {
  const result = runValidator(v1Article({ status: "seed", popular: true }));

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stderr, /seed 内容不应进入热门推荐/);
  assert.doesNotMatch(result.stderr, /热门标记覆盖/);
});

test("content validator reports v1 mixed-trust debt without re-warning an explicit community section", () => {
  const result = runValidator(
    v1Article({ communitySources: ["https://discussions.apple.com/thread/123456"] })
  );

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stderr, /1 篇 v1 Official 文章同时包含社区来源/);
  assert.doesNotMatch(result.stderr, /正文缺少明确的“非官方”或“社区”章节标题/);
});

test("content validator warns when a v1 Official article leaves its community section implicit", () => {
  const result = runValidator(
    v1Article({
      communitySources: ["https://discussions.apple.com/thread/123456"],
      communityHeading: "补充处理思路"
    })
  );

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stderr, /正文缺少明确的“非官方”或“社区”章节标题/);
  assert.match(result.stderr, /1 篇 v1 Official 文章同时包含社区来源/);
});

test("content validator excludes a valid v2 mixed-trust article from the legacy aggregate", () => {
  const article = v2Article().replace(
    "    official: true\nlastVerifiedAt:",
    `    official: true
  - id: community-source
    title: 社区案例
    url: https://discussions.apple.com/thread/123456
    publisher: Apple Support Community
    sourceType: community
    accessedAt: 2026-07-13
    publishedAt: null
    official: false
lastVerifiedAt:`
  );
  const result = runValidator(article);

  assert.equal(result.status, 0, result.stderr);
  assert.doesNotMatch(result.stderr, /v1 Official 文章同时包含社区来源/);
});

test("content validator rejects Apple community hosts even when marked official", () => {
  for (const sourceUrl of [
    "https://discussions.apple.com/thread/123456",
    "https://discussionschinese.apple.com/thread/123456"
  ]) {
    const result = runValidator(v2Article({ sourceUrl }));

    assert.equal(result.status, 1);
    assert.match(result.stderr, /不属于允许的 Apple 官方内容 host（support\.apple\.com）/);
    assert.match(result.stderr, /标为 Official，但未引用 Apple 官方来源/);
    assert.match(result.stderr, /Official 文章必须至少有一个显式标记/);
  }
});

test("content validator rejects lookalike subdomains outside the exact allowlist", () => {
  const result = runValidator(
    v2Article({ sourceUrl: "https://support.apple.com.example.com/zh-cn/guide/iphone/welcome/ios" })
  );

  assert.equal(result.status, 1);
  assert.match(result.stderr, /不属于允许的 Apple 官方内容 host（support\.apple\.com）/);
});

test("article v2 JSON Schema encodes the same exact Official host policy", () => {
  const schemaPath = fileURLToPath(new URL("../schemas/article-v2.schema.json", import.meta.url));
  const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
  const officialUrlDefinition = schema.$defs.officialAppleContentUrl;
  const officialUrlPattern = new RegExp(officialUrlDefinition.pattern);

  assert.equal(officialUrlDefinition.type, "string");
  assert.equal(officialUrlDefinition.format, "uri");
  assert.equal(officialUrlPattern.test("https://support.apple.com/zh-cn/123456"), true);
  assert.equal(officialUrlPattern.test("https://discussions.apple.com/thread/123456"), false);
  assert.equal(officialUrlPattern.test("https://discussionschinese.apple.com/thread/123456"), false);
  assert.equal(officialUrlPattern.test("https://support.apple.com.example.com/123456"), false);

  const officialArticleContains = schema.allOf[0].then.properties.sources.contains.properties;
  assert.deepEqual(officialArticleContains.url, { $ref: "#/$defs/officialAppleContentUrl" });
  assert.deepEqual(schema.$defs.source.allOf[0].then.properties.url, {
    $ref: "#/$defs/officialAppleContentUrl"
  });
});
