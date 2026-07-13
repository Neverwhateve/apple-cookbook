import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  OFFICIAL_APPLE_CONTENT_HOSTS,
  isOfficialAppleContentUrl,
  normalizeArticleFrontmatter
} from "./article-schema.ts";

describe("normalizeArticleFrontmatter", () => {
  it("keeps legacy v1 fields compatible and builds structured source records", () => {
    const article = normalizeArticleFrontmatter(
      {
        title: "旧格式文章",
        slug: "legacy-article",
        device: ["iPhone"],
        category: "iPhone",
        tags: ["iOS", "电池"],
        aliases: ["手机耗电"],
        verification: "Official",
        difficulty: "Easy",
        updated: new Date("2026-07-13T00:00:00.000Z"),
        official_sources: ["https://support.apple.com/zh-cn/123456"],
        community_sources: ["https://discussions.apple.com/thread/123456"],
        status: "canonical",
        popular: true
      },
      { fallbackTitle: "文件名", fallbackSlug: "file-slug", fallbackCategory: "目录" }
    );

    assert.equal(article.schemaVersion, 1);
    assert.equal(article.id, "legacy-article");
    assert.deepEqual(article.device, ["iPhone"]);
    assert.deepEqual(article.devices, ["iPhone"]);
    assert.equal(article.category, "iPhone");
    assert.deepEqual(article.categories, ["iPhone"]);
    assert.equal(article.verification, "Official");
    assert.equal(article.verificationLevel, "Official");
    assert.equal(article.difficulty, "Quick");
    assert.equal(article.updated, "2026-07-13");
    assert.equal(article.lastUpdatedAt, "2026-07-13");
    assert.deepEqual(article.official_sources, ["https://support.apple.com/zh-cn/123456"]);
    assert.deepEqual(article.community_sources, ["https://discussions.apple.com/thread/123456"]);
    assert.deepEqual(
      article.sources.map(({ publisher, official, accessedAt }) => ({ publisher, official, accessedAt })),
      [
        { publisher: "Apple", official: true, accessedAt: null },
        { publisher: "Apple Support Community", official: false, accessedAt: null }
      ]
    );
  });

  it("reads v2 fields while emitting the aliases required by the current UI", () => {
    const article = normalizeArticleFrontmatter({
      schemaVersion: 2,
      id: "ac-find-my-family-location",
      title: "查找中看不到家人的位置",
      slug: "find-my-family-location",
      summary: "位置共享已开启，但家庭成员仍不显示。",
      symptoms: ["看不到老婆位置"],
      devices: ["iPhone", "iPad"],
      platforms: ["iOS", "iPadOS"],
      systemVersions: ["iOS 18"],
      categories: ["查找"],
      tags: ["位置共享"],
      keywords: ["家人位置"],
      aliases: ["family location not showing"],
      errorMessages: ["找不到位置"],
      officialTerms: ["共享我的位置"],
      communityTerms: ["老婆位置不见了"],
      difficulty: "Quick",
      estimatedTime: "5 分钟",
      verificationLevel: "Official",
      status: "canonical",
      canonicalArticleId: "ac-find-my-family-location",
      sources: [
        {
          id: "apple-find-my-guide",
          title: "在 iPhone 上共享位置",
          url: "https://support.apple.com/zh-cn/guide/iphone/example",
          publisher: "Apple",
          sourceType: "official-guide",
          accessedAt: "2026-07-12",
          publishedAt: "2025-09-15",
          official: true
        },
        {
          id: "community-case",
          title: "用户案例",
          url: "https://example.com/case",
          publisher: "Example Community",
          sourceType: "community",
          accessedAt: "2026-07-12",
          official: false
        }
      ],
      solutions: [
        {
          id: "check-location-sharing",
          title: "检查位置共享",
          kind: "recommended",
          steps: ["打开“查找”并确认共享我的位置。"],
          verificationLevel: "Official",
          sourceIds: ["apple-find-my-guide"],
          warnings: [],
          limitations: ["菜单名称可能因系统版本不同而变化。"]
        },
        {
          id: "refresh-session",
          title: "刷新共享会话",
          kind: "alternative",
          steps: ["停止共享后重新邀请。"],
          verificationLevel: "Verified",
          sourceIds: ["community-case"],
          warnings: ["需要家庭成员重新确认。"],
          limitations: []
        }
      ],
      warnings: ["不要共享 Apple 账户密码。"],
      limitations: ["受屏幕使用时间设置影响。"],
      lastVerifiedAt: "2026-07-12",
      lastUpdatedAt: "2026-07-13",
      createdAt: "2026-07-01",
      relatedArticles: ["ac-find-my-not-updating"],
      popular: false
    });

    assert.equal(article.schemaVersion, 2);
    assert.equal(article.id, "ac-find-my-family-location");
    assert.equal(article.category, "查找");
    assert.deepEqual(article.device, ["iPhone", "iPad"]);
    assert.equal(article.verification, "Official");
    assert.equal(article.updated, "2026-07-13");
    assert.deepEqual(article.official_sources, ["https://support.apple.com/zh-cn/guide/iphone/example"]);
    assert.deepEqual(article.community_sources, ["https://example.com/case"]);
    assert.deepEqual(article.solutionSteps, ["打开“查找”并确认共享我的位置。"]);
    assert.deepEqual(article.alternativeSolutions.map((solution) => solution.id), ["refresh-session"]);
    assert.equal(article.lastVerifiedAt, "2026-07-12");
  });

  it("does not infer Official trust from a source domain or source type", () => {
    const article = normalizeArticleFrontmatter({
      schemaVersion: 2,
      title: "来源信任测试",
      slug: "source-trust-test",
      verificationLevel: "Verified",
      lastUpdatedAt: "2026-07-13",
      sources: [
        {
          id: "unreviewed-apple-link",
          title: "尚未核对的链接",
          url: "https://support.apple.com/zh-cn/123456",
          publisher: "Apple",
          sourceType: "official-support",
          accessedAt: "2026-07-13"
        }
      ]
    });

    assert.deepEqual(article.official_sources, []);
    assert.deepEqual(article.community_sources, ["https://support.apple.com/zh-cn/123456"]);
    assert.equal(article.sources[0]?.official, false);
  });

  it("uses an exact HTTPS allowlist for Apple Official content hosts", () => {
    assert.deepEqual(OFFICIAL_APPLE_CONTENT_HOSTS, ["support.apple.com"]);
    assert.equal(isOfficialAppleContentUrl("https://support.apple.com/zh-cn/123456"), true);
    assert.equal(isOfficialAppleContentUrl("http://support.apple.com/zh-cn/123456"), false);
    assert.equal(isOfficialAppleContentUrl("https://discussions.apple.com/thread/123456"), false);
    assert.equal(isOfficialAppleContentUrl("https://discussionschinese.apple.com/thread/123456"), false);
    assert.equal(isOfficialAppleContentUrl("https://support.apple.com.example.com/zh-cn/123456"), false);
  });

  it("demotes community URLs even when v2 metadata marks them official", () => {
    const article = normalizeArticleFrontmatter({
      schemaVersion: 2,
      slug: "community-trust-boundary",
      verificationLevel: "Official",
      sources: [
        {
          id: "apple-community-thread",
          title: "Apple 支持社区帖子",
          url: "https://discussions.apple.com/thread/123456",
          publisher: "Apple Support Community",
          sourceType: "community",
          accessedAt: "2026-07-13",
          official: true
        }
      ],
      solutions: [
        {
          id: "unsafe-official-solution",
          title: "错误标记的官方方案",
          kind: "recommended",
          steps: ["执行社区建议。"],
          verificationLevel: "Official",
          sourceIds: ["apple-community-thread"],
          warnings: [],
          limitations: []
        }
      ],
      alternativeSolutions: [
        {
          id: "unsafe-explicit-alternative",
          title: "错误标记的替代方案",
          kind: "alternative",
          steps: ["执行另一条社区建议。"],
          verificationLevel: "Official",
          sourceIds: ["apple-community-thread"],
          warnings: [],
          limitations: []
        }
      ]
    });

    assert.deepEqual(article.official_sources, []);
    assert.deepEqual(article.community_sources, ["https://discussions.apple.com/thread/123456"]);
    assert.equal(article.sources[0]?.official, false);
    assert.equal(article.verificationLevel, "Unknown");
    assert.equal(article.solutions[0]?.verificationLevel, "Unknown");
    assert.equal(article.alternativeSolutions[0]?.verificationLevel, "Unknown");
  });

  it("demotes an Official solution that mixes official and community sources", () => {
    const article = normalizeArticleFrontmatter({
      schemaVersion: 2,
      slug: "mixed-solution-sources",
      verificationLevel: "Official",
      sources: [
        {
          id: "apple-source",
          title: "Apple 官方来源",
          url: "https://support.apple.com/zh-cn/123456",
          publisher: "Apple",
          sourceType: "official-support",
          accessedAt: "2026-07-13",
          official: true
        },
        {
          id: "community-source",
          title: "社区来源",
          url: "https://discussions.apple.com/thread/123456",
          publisher: "Apple Support Community",
          sourceType: "community",
          accessedAt: "2026-07-13",
          official: false
        }
      ],
      solutions: [
        {
          id: "mixed-official-solution",
          title: "混合来源方案",
          kind: "recommended",
          steps: ["执行一个步骤。"],
          verificationLevel: "Official",
          sourceIds: ["apple-source", "community-source"],
          warnings: [],
          limitations: []
        }
      ]
    });

    assert.equal(article.verificationLevel, "Unknown");
    assert.equal(article.solutions[0]?.verificationLevel, "Unknown");
  });

  it("keeps an Official article when only an alternative solution fails closed", () => {
    const article = normalizeArticleFrontmatter({
      schemaVersion: 2,
      slug: "unsafe-alternative-sources",
      verificationLevel: "Official",
      sources: [
        {
          id: "apple-source",
          title: "Apple 官方来源",
          url: "https://support.apple.com/zh-cn/123456",
          publisher: "Apple",
          sourceType: "official-support",
          accessedAt: "2026-07-13",
          official: true
        },
        {
          id: "community-source",
          title: "社区来源",
          url: "https://discussions.apple.com/thread/123456",
          publisher: "Apple Support Community",
          sourceType: "community",
          accessedAt: "2026-07-13",
          official: false
        }
      ],
      solutions: [
        {
          id: "safe-official-solution",
          title: "安全的主方案",
          kind: "recommended",
          steps: ["执行 Apple 官方步骤。"],
          verificationLevel: "Official",
          sourceIds: ["apple-source"],
          warnings: [],
          limitations: []
        },
        {
          id: "unsafe-official-alternative",
          title: "错误标记的替代方案",
          kind: "alternative",
          steps: ["执行社区步骤。"],
          verificationLevel: "Official",
          sourceIds: ["community-source"],
          warnings: [],
          limitations: []
        }
      ]
    });

    assert.equal(article.verificationLevel, "Official");
    assert.equal(article.solutions[0]?.verificationLevel, "Official");
    assert.equal(article.solutions[1]?.verificationLevel, "Unknown");
    assert.equal(article.alternativeSolutions[0]?.verificationLevel, "Unknown");
  });

  it("does not trust an Official source id when the id is duplicated", () => {
    const article = normalizeArticleFrontmatter({
      schemaVersion: 2,
      slug: "ambiguous-source-id",
      verificationLevel: "Official",
      sources: [
        {
          id: "shared-source",
          title: "Apple 官方来源",
          url: "https://support.apple.com/zh-cn/123456",
          publisher: "Apple",
          sourceType: "official-support",
          accessedAt: "2026-07-13",
          official: true
        },
        {
          id: "shared-source",
          title: "社区来源",
          url: "https://discussions.apple.com/thread/123456",
          publisher: "Apple Support Community",
          sourceType: "community",
          accessedAt: "2026-07-13",
          official: false
        }
      ],
      solutions: [
        {
          id: "ambiguous-official-solution",
          title: "引用歧义来源的方案",
          kind: "recommended",
          steps: ["执行一个步骤。"],
          verificationLevel: "Official",
          sourceIds: ["shared-source"],
          warnings: [],
          limitations: []
        }
      ]
    });

    assert.equal(article.verificationLevel, "Unknown");
    assert.equal(article.solutions[0]?.verificationLevel, "Unknown");
  });

  it("demotes invalid legacy official_sources at runtime", () => {
    const url = "https://discussionschinese.apple.com/thread/123456";
    const article = normalizeArticleFrontmatter({
      slug: "legacy-community-trust-boundary",
      verification: "Official",
      official_sources: [url]
    });

    assert.deepEqual(article.official_sources, []);
    assert.deepEqual(article.community_sources, [url]);
    assert.equal(article.sources[0]?.publisher, "Apple Support Community");
    assert.equal(article.sources[0]?.sourceType, "community");
    assert.equal(article.sources[0]?.official, false);
    assert.equal(article.verificationLevel, "Unknown");
  });

  it("lets explicit v2 source metadata win over duplicate legacy URL lists", () => {
    const url = "https://support.apple.com/zh-cn/123456";
    const article = normalizeArticleFrontmatter({
      schemaVersion: 2,
      slug: "partial-migration",
      lastUpdatedAt: "2026-07-13",
      sources: [
        {
          id: "pending-review",
          title: "待确认来源",
          url,
          publisher: "Apple",
          sourceType: "official-support",
          accessedAt: "2026-07-13",
          official: false
        }
      ],
      official_sources: [url]
    });

    assert.equal(article.sources.length, 1);
    assert.deepEqual(article.official_sources, []);
    assert.deepEqual(article.community_sources, [url]);
  });

  it("fails closed for unsupported trust, difficulty, and workflow enums", () => {
    const article = normalizeArticleFrontmatter(
      {
        verificationLevel: "TotallyOfficial",
        difficulty: "Instant",
        status: "published"
      },
      { fallbackTitle: "Fallback title", fallbackSlug: "fallback-slug", fallbackCategory: "Fallback category" }
    );

    assert.equal(article.title, "Fallback title");
    assert.equal(article.slug, "fallback-slug");
    assert.equal(article.category, "Fallback category");
    assert.equal(article.verification, "Unknown");
    assert.equal(article.difficulty, "Moderate");
    assert.equal(article.status, "draft");
  });
});
