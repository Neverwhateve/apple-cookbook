import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getAllCategories,
  getAllTags,
  getArticleBySlug,
  getIndexableArticles,
  getPublishedArticleBySlug,
  getPublishedArticles,
  getPublishedCategories,
  getPublishedSearchDocuments,
  getPublishedTags,
  getRelatedArticles,
  isIndexableArticle,
  isPublicArticle,
  type Article,
  type ArticleStatus
} from "./cookbook.ts";

function makeArticle(status: ArticleStatus, overrides: Partial<Article> = {}): Article {
  const slug = overrides.slug ?? `${status}-article`;
  const category = overrides.category ?? "Test";

  return {
    schemaVersion: 2,
    id: overrides.id ?? slug,
    slug,
    title: overrides.title ?? `${status} article`,
    summary: overrides.summary ?? `${status} summary`,
    symptoms: [],
    devices: ["iPhone"],
    platforms: ["iOS"],
    systemVersions: [],
    categories: [category],
    tags: overrides.tags ?? ["shared-tag"],
    keywords: [],
    aliases: [],
    errorMessages: [],
    officialTerms: [],
    communityTerms: [],
    difficulty: "Quick",
    verificationLevel: "Unknown",
    status,
    solutions: [],
    solutionSteps: [],
    alternativeSolutions: [],
    warnings: [],
    limitations: [],
    sources: [],
    lastUpdatedAt: "2026-07-13",
    relatedArticles: [],
    popular: false,
    device: ["iPhone"],
    category,
    verification: "Unknown",
    updated: "2026-07-13",
    official_sources: [],
    community_sources: [],
    body: "## 症状\n\nFixture body.",
    excerpt: `${status} excerpt`,
    filePath: `${category}/${slug}.md`,
    route: `/recipes/${encodeURIComponent(category)}/${encodeURIComponent(slug)}`,
    ...overrides
  };
}

const lifecycleArticles = [
  makeArticle("seed"),
  makeArticle("draft"),
  makeArticle("reviewed"),
  makeArticle("canonical")
];

describe("article publication lifecycle", () => {
  it("keeps seeds public while drafts remain workspace-only", () => {
    assert.equal(isPublicArticle(lifecycleArticles[0]), true);
    assert.equal(isPublicArticle(lifecycleArticles[1]), false);
    assert.deepEqual(
      getPublishedArticles(lifecycleArticles).map((article) => article.status),
      ["seed", "reviewed", "canonical"]
    );
  });

  it("only marks reviewed and canonical articles as indexable", () => {
    assert.deepEqual(lifecycleArticles.map(isIndexableArticle), [false, false, true, true]);
    assert.deepEqual(
      getIndexableArticles(lifecycleArticles).map((article) => article.status),
      ["reviewed", "canonical"]
    );
  });

  it("allows audit lookup of drafts but rejects them at the public route boundary", () => {
    assert.equal(getArticleBySlug(["Test", "draft-article"], lifecycleArticles)?.status, "draft");
    assert.equal(getPublishedArticleBySlug(["Test", "draft-article"], lifecycleArticles), undefined);
    assert.equal(getPublishedArticleBySlug(["Test", "seed-article"], lifecycleArticles)?.status, "seed");
  });
});

describe("article slug lookup", () => {
  const localized = makeArticle("canonical", {
    id: "localized",
    slug: "含 空格",
    category: "中文分类",
    categories: ["中文分类"]
  });
  const literalPercent = makeArticle("canonical", {
    id: "literal-percent",
    slug: "charge-100%",
    category: "Battery 100%",
    categories: ["Battery 100%"]
  });
  const articles = [localized, literalPercent];

  it("finds routes from decoded, encoded, and mixed route params", () => {
    assert.equal(getArticleBySlug(["中文分类", "含 空格"], articles)?.id, "localized");
    assert.equal(
      getArticleBySlug(
        [
          "%E4%B8%AD%E6%96%87%E5%88%86%E7%B1%BB",
          "%E5%90%AB%20%E7%A9%BA%E6%A0%BC"
        ],
        articles
      )?.id,
      "localized"
    );
    assert.equal(
      getArticleBySlug(["中文分类", "%E5%90%AB%20%E7%A9%BA%E6%A0%BC"], articles)?.id,
      "localized"
    );
  });

  it("treats an already-decoded percent sign as a literal route character", () => {
    assert.equal(
      getArticleBySlug(["Battery 100%", "charge-100%"], articles)?.id,
      "literal-percent"
    );
    assert.equal(
      getArticleBySlug(["Battery%20100%25", "charge-100%25"], articles)?.id,
      "literal-percent"
    );
  });

  it("returns undefined instead of throwing for malformed encodings and Unicode", () => {
    const invalidSlugs = [
      ["中文分类", "%E0%A4%A"],
      ["%E0%A4%A", "含 空格"],
      ["中文分类", "%"],
      ["中文分类", "\uD800"]
    ];

    for (const slug of invalidSlugs) {
      assert.doesNotThrow(() => getArticleBySlug(slug, articles));
      assert.equal(getArticleBySlug(slug, articles), undefined);
      assert.equal(getPublishedArticleBySlug(slug, articles), undefined);
    }
  });
});

describe("published article projections", () => {
  const subject = makeArticle("canonical", { id: "subject", slug: "subject", tags: ["shared-tag"] });
  const seed = makeArticle("seed", {
    id: "seed-related",
    slug: "seed-related",
    category: "Seed only",
    categories: ["Seed only"],
    tags: ["shared-tag", "seed-tag"]
  });
  const reviewed = makeArticle("reviewed", {
    id: "reviewed-related",
    slug: "reviewed-related",
    tags: ["shared-tag", "reviewed-tag"]
  });
  const draft = makeArticle("draft", {
    id: "draft-related",
    slug: "draft-related",
    category: "Draft only",
    categories: ["Draft only"],
    tags: ["shared-tag", "draft-tag"]
  });
  const articles = [subject, seed, reviewed, draft];

  it("excludes draft-only categories and tags from public facets", () => {
    assert.ok(getAllCategories(articles).some((category) => category.name === "Draft only"));
    assert.ok(getAllTags(articles).includes("draft-tag"));
    assert.equal(getPublishedCategories(articles).some((category) => category.name === "Draft only"), false);
    assert.equal(getPublishedTags(articles).includes("draft-tag"), false);
    assert.ok(getPublishedCategories(articles).some((category) => category.name === "Seed only"));
    assert.ok(getPublishedTags(articles).includes("seed-tag"));
  });

  it("excludes drafts from search documents and related recommendations", () => {
    assert.deepEqual(
      getPublishedSearchDocuments(articles).map((document) => document.id),
      ["subject", "seed-related", "reviewed-related"]
    );

    const relatedIds = getRelatedArticles(subject, 10, articles).map((article) => article.id);
    assert.ok(relatedIds.includes("seed-related"));
    assert.ok(relatedIds.includes("reviewed-related"));
    assert.equal(relatedIds.includes("draft-related"), false);
  });
});
