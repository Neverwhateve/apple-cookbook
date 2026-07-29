---
schemaVersion: 2
id: article-id
title: 顾客能听懂的症状标题
slug: article-slug
summary: 用一句话说明最可能发生什么、先检查什么，以及不应过早下什么结论。
symptoms:
  - 顾客会怎么说？
devices:
  - iPhone
platforms:
  - iOS
systemVersions:
  - 当前系统
categories:
  - iPhone
tags:
  - iPhone
  - Feature
keywords:
  - 顾客搜索会输入的自然语言
aliases:
  - 中英文口语说法
errorMessages: []
officialTerms:
  - Apple 设置或功能名称
communityTerms: []
difficulty: Quick
estimatedTime: 5 分钟
verificationLevel: Official
status: canonical
canonicalArticleId: article-id
solutions:
  - id: first-safe-path
    title: 最先执行的安全路径
    summary: 这是顾客面前可以直接开始的简短解释。
    kind: recommended
    steps:
      - 先确认范围：所有场景、单一 App，还是单一设备或配件？
      - 执行第一项可观察、低风险的检查。
      - 根据结果进入下一分支；不要同时尝试多个动作。
    verificationLevel: Official
    sourceIds:
      - apple-source-id
    warnings:
      - 不要在没有备份或明确理由时进行抹掉、重置或删除。
    limitations:
      - 说明这条路径不能判断的范围。
  - id: escalation-path
    title: 何时停止一般排查
    summary: 出现安全、账户、数据或无法稳定使用的情况时，进入进一步支持或服务路径。
    kind: escalation
    steps:
      - 记录机型、系统版本、提示信息、复现条件和已经完成的步骤。
      - 停止无目的地重复操作，按官方支持或服务路径处理。
    verificationLevel: Official
    sourceIds:
      - apple-source-id
    warnings:
      - 不要承诺某个操作一定会解决问题。
    limitations: []
warnings:
  - 不要把相似症状直接当作同一个问题。
limitations:
  - 记录第三方 App、网络服务或硬件诊断的边界。
sources:
  - id: apple-source-id
    title: Apple 官方来源标题
    url: https://support.apple.com/
    publisher: Apple
    sourceType: official-support
    accessedAt: 2026-07-29
    publishedAt: null
    official: true
lastVerifiedAt: 2026-07-29
lastUpdatedAt: 2026-07-29
createdAt: 2026-07-29
relatedArticles: []
popular: false
---

# 顾客能听懂的症状标题

用顾客语言重述问题。先说这篇路径适用什么，不适用什么，不要直接宣告硬件故障或某个系统版本有问题。

---

## 症状

- “顾客实际会怎么说？”

---

## 可能原因

1. **最常见且可观察的原因**
   - 说明可用什么证据确认，而不是只列名词。
2. **需要分流的原因**
   - 说明什么答案会改变下一步。

---

## Apple 官方方案

验证级别：Apple 官方

步骤：

1. 先做一项低风险、可观察的检查。
2. 只在上一步结果支持时继续下一项动作。
3. 每一步都写明预期看到什么。

参考来源：

- [Apple 官方来源标题](https://support.apple.com/)

---

## 如何向顾客解释

> “先用一句不承诺结果、但能说明当前判断和下一步的自然语言。”

避免：

- “一定是硬件坏了。”
- “网上都说这个版本有问题。”
- “先抹掉试试看。”

---

## 问题稳定后可选的顾客教育

仅当顾客愿意、问题已稳定且不涉及服务、账户、安全或数据风险时使用：

1. 用顾客自己的设备演示一个最相关的入口或功能。
2. 说明功能需要满足的条件，不承诺所有设备或场景都会自动生效。
3. 让顾客亲自完成一次操作，再说明以后从哪里找到它。

可以这样说：

> “这次已经处理好了。如果你愿意，我可以顺便带你看一下，以后从哪里确认或调整这个功能。”

---

## 零售排查流程

1. 先问：它从什么时候开始？是否在更新、设置、迁移或更换配件后发生？
2. 再问：所有场景都会发生，还是只影响一个 App、设备或配件？
3. 检查第一项客观证据。
4. 执行一个安全动作并复测。
5. 明确结局：已解决、观察中、顾客回家完成，或需要进一步支持/服务。

---

## 升级处理

停止一般排查并获取进一步协助：

- 出现安全、账户、隐私、付款或数据风险。
- 设备无法稳定使用，或满足文章定义的服务边界。
- 已完成标准检查，仍无法确认下一条安全路径。

交接时记录：

- 机型与系统版本；
- 顾客原话、提示信息和复现条件；
- 已完成步骤及结果；
- 顾客下一步需要知道什么。

---

## 相关问题

- [相关案例](/recipes/Category/article-slug)
