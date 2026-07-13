import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildArticleStructuredData,
  serializeJsonLd,
  type ArticleStructuredDataInput
} from "./article-structured-data.ts";

function makeArticle(
  status: ArticleStructuredDataInput["status"] = "canonical",
  overrides: Partial<ArticleStructuredDataInput> = {}
): ArticleStructuredDataInput {
  return {
    status,
    title: "iPad 蓝框排查",
    summary: "按症状识别可能启用的辅助功能。",
    excerpt: "备用摘要",
    route: "/recipes/iPad/ipad-blue-box",
    category: "iPad",
    tags: ["Accessibility", "iPadOS", "Accessibility"],
    devices: ["iPad"],
    platforms: ["iPadOS"],
    systemVersions: ["iPadOS 26"],
    lastUpdatedAt: "2026-07-13",
    createdAt: "2026-07-12",
    sources: [
      {
        id: "apple-guide",
        title: "Apple 使用手册",
        url: "https://support.apple.com/zh-cn/guide/ipad/example",
        publisher: "Apple",
        sourceType: "official-guide",
        accessedAt: "2026-07-13",
        publishedAt: null,
        official: true
      },
      {
        id: "community-case",
        title: "社区症状案例",
        url: "https://example.com/community-case",
        publisher: "Example Community",
        sourceType: "community",
        accessedAt: "2026-07-13",
        publishedAt: null,
        official: false
      },
      {
        id: "duplicate-community-case",
        title: "重复 URL",
        url: "https://example.com/community-case",
        publisher: "Example Community",
        sourceType: "community",
        accessedAt: "2026-07-13",
        publishedAt: null,
        official: false
      }
    ],
    ...overrides
  };
}

describe("article structured data", () => {
  it("builds an absolute TechArticle without attributing authorship to Apple", () => {
    const structuredData = buildArticleStructuredData(
      makeArticle(),
      "https://preview.example.test/base/path"
    );

    assert.ok(structuredData);
    assert.equal(structuredData["@type"], "TechArticle");
    assert.equal(structuredData.url, "https://preview.example.test/recipes/iPad/ipad-blue-box");
    assert.equal(structuredData["@id"], `${structuredData.url}#article`);
    assert.equal(structuredData.mainEntityOfPage["@id"], structuredData.url);
    assert.equal(structuredData.author.name, "Apple Cookbook");
    assert.equal(structuredData.publisher.name, "Apple Cookbook");
    assert.equal(structuredData.author.url, "https://preview.example.test/");
    assert.equal(structuredData.datePublished, "2026-07-12");
    assert.equal(structuredData.dateModified, "2026-07-13");
    assert.deepEqual(structuredData.keywords, ["Accessibility", "iPadOS"]);
    assert.deepEqual(
      structuredData.about?.map((topic) => topic.name),
      ["iPad", "iPadOS", "iPadOS 26"]
    );
    assert.deepEqual(structuredData.citation, [
      "https://support.apple.com/zh-cn/guide/ipad/example",
      "https://example.com/community-case"
    ]);
  });

  it("only emits structured data for indexable lifecycle states", () => {
    assert.equal(buildArticleStructuredData(makeArticle("seed")), null);
    assert.equal(buildArticleStructuredData(makeArticle("draft")), null);
    assert.ok(buildArticleStructuredData(makeArticle("reviewed")));
    assert.ok(buildArticleStructuredData(makeArticle("canonical")));
  });

  it("does not invent publication dates or empty optional properties", () => {
    const structuredData = buildArticleStructuredData(
      makeArticle("canonical", {
        summary: "",
        createdAt: undefined,
        tags: [],
        devices: [],
        platforms: [],
        systemVersions: [],
        sources: []
      })
    );

    assert.ok(structuredData);
    assert.equal(structuredData.description, "备用摘要");
    assert.equal("datePublished" in structuredData, false);
    assert.equal("keywords" in structuredData, false);
    assert.equal("about" in structuredData, false);
    assert.equal("citation" in structuredData, false);
  });

  it("serializes untrusted metadata without allowing script termination", () => {
    const value = {
      headline: "</script><script>alert('xss')</script>",
      separators: "line\u2028paragraph\u2029end"
    };
    const serialized = serializeJsonLd(value);

    assert.equal(serialized.includes("<"), false);
    assert.ok(serialized.includes("\\u003c/script>"));
    assert.ok(serialized.includes("\\u2028"));
    assert.ok(serialized.includes("\\u2029"));
    assert.deepEqual(JSON.parse(serialized), value);
  });
});
