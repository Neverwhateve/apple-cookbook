# Article Schema v2

Article Schema v2 adds structured search, trust, source, solution, canonicalization, and lifecycle metadata while keeping Markdown as the article body format. It is an additive migration: existing v1 articles remain valid inputs and are not rewritten automatically.

The machine-readable contract is [`schemas/article-v2.schema.json`](../schemas/article-v2.schema.json). The legacy contract remains in [`schemas/article.schema.json`](../schemas/article.schema.json).

`pnpm validate:content` dispatches by `schemaVersion` and adds checks JSON Schema cannot express cleanly, including solution `sourceIds`, Apple-owned official URLs, complete published solutions, and the existing Markdown section/link rules.

## Compatibility Contract

`src/lib/article-schema.ts` normalizes either frontmatter version into one internal shape.

- Frontmatter without `schemaVersion: 2` is treated as v1.
- v1 `device`, `category`, `verification`, `updated`, `official_sources`, and `community_sources` remain available to all existing pages.
- v2 `devices`, `categories`, `verificationLevel`, `lastUpdatedAt`, and structured `sources` are mapped back to those v1 aliases at read time.
- Routes continue to come from the Markdown file path. Migrating metadata does not change a URL.
- Invalid verification values become `Unknown`; invalid workflow states become `draft`.
- A v2 source enters the Official trust boundary only when it explicitly contains `official: true`, uses an allowlisted Apple official-content host, and has a unique source `id`. The adapter never infers official status from a publisher or `sourceType`; duplicate IDs are ambiguous and fail closed even if one duplicate looks official.
- When a partially migrated file contains the same URL in `sources` and a legacy source list, the structured v2 record wins.

This compatibility layer is transitional. New code should use v2 names, but existing UI code can continue using the aliases until every consumer has migrated.

## v2 Frontmatter Example

```yaml
schemaVersion: 2
id: ac-find-my-family-location
title: 查找 App 中无法看到家庭成员位置
slug: find-my-family-location
summary: 已开启位置共享，但家庭成员的位置不显示或长时间不更新。
symptoms:
  - 为什么看不到家人的位置
  - 家人的位置一直不更新
devices:
  - iPhone
  - iPad
platforms:
  - iOS
  - iPadOS
systemVersions:
  - iOS 18
categories:
  - 查找
tags:
  - 位置共享
keywords:
  - 家人位置
aliases:
  - family location not showing
errorMessages:
  - 找不到位置
officialTerms:
  - 共享我的位置
communityTerms:
  - 老婆位置看不到
difficulty: Quick
estimatedTime: 5 分钟
verificationLevel: Official
status: canonical
canonicalArticleId: ac-find-my-family-location
solutions:
  - id: check-location-sharing
    title: 检查位置共享
    summary: 先确认双方设备的共享开关和账户状态。
    kind: recommended
    steps:
      - 打开“查找”，确认“共享我的位置”已开启。
      - 在“人物”中重新选择家庭成员并检查状态。
    verificationLevel: Official
    sourceIds:
      - apple-find-my-guide
    warnings: []
    limitations:
      - 菜单名称可能随系统版本变化。
  - id: refresh-sharing-session
    title: 刷新共享会话
    summary: 官方步骤无效后再尝试重新邀请。
    kind: alternative
    steps:
      - 停止共享，然后重新发送位置共享邀请。
    verificationLevel: Verified
    sourceIds:
      - community-location-case
    warnings:
      - 家庭成员需要重新确认邀请。
    limitations: []
warnings:
  - 不要索取或共享 Apple 账户密码。
limitations:
  - 屏幕使用时间或受管理设备可能限制设置变更。
sources:
  - id: apple-find-my-guide
    title: 在 iPhone 上的“查找”中共享你的位置
    url: https://support.apple.com/zh-cn/guide/iphone/example
    publisher: Apple
    sourceType: official-guide
    accessedAt: 2026-07-13
    publishedAt: null
    official: true
  - id: community-location-case
    title: Location sharing case report
    url: https://example.com/location-case
    publisher: Example Community
    sourceType: community
    accessedAt: 2026-07-13
    publishedAt: null
    official: false
lastVerifiedAt: 2026-07-13
lastUpdatedAt: 2026-07-13
createdAt: 2026-07-01
relatedArticles:
  - ac-find-my-location-not-updating
popular: false
```

## Field Semantics

### Identity and canonicalization

- `id`: Stable content identity. It must not change when the file moves or the title changes.
- `slug`: Current URL segment and filename stem. It remains lowercase kebab-case.
- `canonicalArticleId`: The canonical target for duplicate or superseded content. A canonical article can point to itself; a duplicate points to the retained article.
- `relatedArticles`: Stable article IDs, not titles or relative file paths.

The site does not redirect duplicate articles automatically yet. Do not set a duplicate to `canonical` merely because `canonicalArticleId` exists. Redirect behavior requires a separately reviewed routing migration.

### Discovery metadata

- `summary`: One plain-language explanation shown in results and article introductions.
- `symptoms`: Real user wording such as “系统数据很大”.
- `devices`, `platforms`, `systemVersions`: Separate hardware and software facets.
- `keywords`: Editorial search terms that are not necessarily visible tags.
- `aliases`: Alternate names, abbreviations, English terms, and common spoken forms.
- `errorMessages`: Exact error text or codes. Preserve punctuation and digits.
- `officialTerms`: Apple's product and settings terminology.
- `communityTerms`: Non-official phrases that users commonly search.

### Trust and solutions

- `verificationLevel` describes the primary recommendation at article level.
- Each item in `solutions` has its own `verificationLevel` and `sourceIds`.
- `kind: recommended` is the first path shown to users; `alternative` is a fallback; `escalation` explains when to contact support or seek repair.
- `warnings` describes risk or irreversible effects. `limitations` describes scope, compatibility, or known gaps.
- An `Experimental` article must contain at least one article-level warning.
- A `reviewed` or `canonical` article must have at least one solution and a non-null `lastVerifiedAt`.

Article-level `Official` does not make every solution official. It does require exactly the primary contract used by the UI: the first declared `kind: recommended` solution must itself remain `Official` after source enforcement. A missing or lower-trust primary recommendation makes the article declaration invalid; a later Official recommendation cannot mask it. Validation rejects the mismatch and the runtime defensively downgrades the article to `Unknown`. Community or experimental alternatives retain their own lower verification level and link only to the sources that support them; an unsafe alternative is downgraded independently and does not lower an otherwise safe recommended solution.

Every `sourceId` on an `Official` solution must resolve to an explicitly official, allowlisted Apple source with a unique ID. Mixing a community citation, an unknown ID, or an ambiguous duplicate ID into that solution fails validation and is downgraded at runtime.

### Sources

Every source records:

- `id`: Stable ID referenced by solutions. It must be unique within the article; duplicates are ambiguous and cannot support Official trust.
- `title`: The actual page, document, test record, or case title.
- `url`: HTTPS URL.
- `publisher`: Responsible organization or community.
- `sourceType`: One of `official-support`, `official-guide`, `official-policy`, `community`, `documentation`, `test`, or `other`.
- `accessedAt`: Date the source was checked.
- `publishedAt`: Source publication date when known; otherwise `null`.
- `official`: Explicit trust declaration. It is treated as official only when it is `true` and the URL also passes the official-content host allowlist.

An article marked `Official` must include at least one `https://support.apple.com` source with `official: true` and a unique ID, plus an Official `kind: recommended` solution that references only trusted Official source IDs. The allowlist is intentionally exact: `discussions.apple.com`, `discussionschinese.apple.com`, other `*.apple.com` hosts, and lookalike domains cannot support an Official claim. A community URL must not be relabeled simply because it is cited alongside an Apple source. The runtime adapter defensively demotes unsupported article or solution trust to `Unknown`; the content validator rejects the invalid frontmatter so it cannot pass publication checks silently.

## Migration Workflow

1. Run the read-only preview:

   ```bash
   pnpm preview:content-v2
   pnpm preview:content-v2 -- --file cookbook/iPhone/example.md --json
   ```

2. Review every flagged field. The preview intentionally leaves dates or editorial meaning unresolved when the v1 source cannot prove them.
3. Migrate one canonical article at a time in a dedicated pull request.
4. Validate the new frontmatter against `schemas/article-v2.schema.json`.
5. Run content validation, tests, type checking, and the production build.
6. Compare the old and new route, trust badge, source grouping, search results, and related-article behavior before merging.

Do not bulk-convert source titles, access dates, `lastVerifiedAt`, or solution-level verification without editorial review. Those values are evidence, not formatting details.

## Pilot Acceptance Record

All body hashes in this section use one reproducible convention: SHA-256 over the UTF-8 bytes of `gray-matter`'s frontmatter-excluded `content.trim()` value. Leading or trailing separator whitespace therefore does not create a different acceptance hash.

`cookbook/Networking/iphone-ipad-wifi-no-internet-unable-to-join.md` is the first manually reviewed v2 pilot (2026-07-13).

- The title, slug, route, body, and original ten source URLs remain unchanged.
- The Markdown body SHA-256 before and after migration is `6f8569ba194cb0836e982057591442c0da1ea0de447161410b05bd065cf68792`.
- Seven Apple pages were opened and checked before their titles, publication dates, and `official: true` boundary were recorded.
- Three community records remain explicitly `official: false`; the DNS fallback stays `Unknown` and is not presented as Apple guidance.
- `pnpm preview:content-v2 -- --file cookbook/Networking/iphone-ipad-wifi-no-internet-unable-to-join.md --json` reports one v2 article and zero review issues.

`cookbook/Mac/mac-mail-cant-send-receive-email.md` is the second manually reviewed v2 pilot (2026-07-13).

- At the frontmatter-equivalence checkpoint, the title, slug, route, body, and original nine source URLs in their original order were unchanged.
- The Markdown body SHA-256 before and after that migration checkpoint is `10e550b0d1bb95089edf6ec810bad839309c477a9dadac947f0e7d208e301ddd`.
- Five Apple Support pages were opened and checked before their current titles, publication dates, and `official: true` boundary were recorded.
- Four community records remain explicitly `official: false`; provider-migration, Exchange/IMAP, and SMTP branches remain `Likely` rather than being promoted to Apple guidance.
- `pnpm preview:content-v2 -- --file cookbook/Mac/mac-mail-cant-send-receive-email.md --json` reports one v2 article and zero review issues.
- After that frontmatter-equivalence checkpoint, a separate editorial correction narrowed the public rebuild step to Apple’s documented search case, downgraded the Exchange/IMAP application to “Likely,” and removed an absolute hardware conclusion. The current body SHA-256 is `acc92f1d16315205da05eed3bd88a3a0f6b2c6077bfbb8f68a1ef6d9a791fab1`; this later content correction is intentionally not presented as part of the no-body-change migration.

`cookbook/iPad/ipad-keyboard-small-floating-split-moving.md` is the third manually reviewed v2 pilot (2026-07-13).

- At the frontmatter-equivalence checkpoint, the title, slug, route, body, and original six source URLs in their original order were unchanged.
- The Markdown body SHA-256 before and after that migration checkpoint is `986f37b06b16f9e818f35bc5efc711372f34c14fd0e6fdd26b3b78fc69473a51`.
- Four Apple Support pages were opened and checked before recording their current titles, publication dates, and `official: true` boundary; two Apple Support Community pages remain explicitly `official: false`.
- Restoring floating/split keyboards and the specific iPadOS 26.0.1 position fix are Official. Applying Accessibility Shortcut or external-keyboard checks as a causal fix remains `Likely`, because the official shortcut page documents the setting but not that general diagnosis.
- The legacy compatibility value `difficulty: Easy` is normalized to the canonical v2 value `Quick` without changing the rendered difficulty meaning.
- `pnpm preview:content-v2 -- --file cookbook/iPad/ipad-keyboard-small-floating-split-moving.md --json` reports one v2 article and zero review issues.
- After that frontmatter-equivalence checkpoint, a separate editorial correction moved the Accessibility Shortcut and external-keyboard checks out of the public Apple-official section, relabeled that section as community and supplemental troubleshooting with an explicit `Likely` level, and removed an unrelated community source from the `Likely` solution's `sourceIds` without deleting the source record. The current body SHA-256 is `90adca9bc5764a4b5162e57f9e56d5cbbf875349a034153a52fff9f855d97c2d`; this later trust-boundary correction is intentionally not presented as part of the no-body-change migration.

Use this equivalence check as the minimum bar for later migrations. A successful schema conversion alone is not sufficient.

## Native v2 Acceptance Record

`cookbook/Mac/mac-system-data-storage-apfs-snapshots-purgeable-space.md` is the first article authored natively against Article Schema v2 (2026-07-13).

- It closes a real-corpus gap for the symptom “系统数据很大” instead of creating a placeholder solely to satisfy a synthetic search fixture.
- Ten `support.apple.com` pages were opened and checked. Dates are recorded only where the Chinese page shows a publication date; guide pages remain `publishedAt: null`.
- The primary storage inspection, built-in cleanup, Time Machine, and temporary safe-mode paths are Official. Applying generic APFS snapshot deletion as a System Data remedy remains `Likely`, even though Disk Utility officially exposes the capability.
- The article does not claim that snapshots are necessarily classified as System Data, does not prescribe a normal GB threshold, and does not recommend Terminal deletion or third-party cleaners as first-line actions.
- `pnpm preview:content-v2 -- --file cookbook/Mac/mac-system-data-storage-apfs-snapshots-purgeable-space.md --json` reports one v2 article and zero review issues.
- `src/lib/search-corpus.test.ts` locks the real corpus result to its stable id and route.

## Automation Rules

- Harvest may propose v2 metadata but must not publish it directly.
- Automated updates should modify managed fields only and preserve human-written Markdown.
- Stable `id`, source IDs, and solution IDs prevent repeated runs from producing meaningless diffs.
- Content hashes and the Harvest base commit must be checked before applying a proposal.
- A new automated article starts as `draft`; promotion to `reviewed` or `canonical` requires validation and human review.
- A missing `official` flag is treated as `false` by the runtime adapter.
