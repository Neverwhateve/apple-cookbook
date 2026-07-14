import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import {
  normalizeArticleFrontmatter,
  type ArticleMeta
} from "./article-schema.ts";
import type { SearchDocument } from "./search.ts";

export type {
  ArticleMeta,
  ArticleSchemaVersion,
  ArticleSolution,
  ArticleSource,
  ArticleStatus,
  DifficultyLevel,
  VerificationLevel
} from "@/lib/article-schema";

export type Article = ArticleMeta & {
  body: string;
  excerpt: string;
  filePath: string;
  route: string;
};

const cookbookRoot = path.join(process.cwd(), "cookbook");

function normalizeSlugParts(relativeFilePath: string) {
  return relativeFilePath
    .replace(/\.mdx?$/, "")
    .split(path.sep)
    .map((part) => encodeURIComponent(part));
}

function walkMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return walkMarkdownFiles(absolutePath);
    }

    if (entry.isFile() && /\.mdx?$/.test(entry.name)) {
      return [absolutePath];
    }

    return [];
  });
}

function buildExcerpt(body: string) {
  return body
    .replace(/^# .+$/m, "")
    .replace(/^---$/gm, "")
    .replace(/^#+\s+/gm, "")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/\*\*/g, "")
    .replace(/\n+/g, " ")
    .trim()
    .slice(0, 220);
}

function getSection(body: string, headingPattern: RegExp) {
  const headings = Array.from(body.matchAll(/^##\s+(.+)$/gm));
  const headingIndex = headings.findIndex((heading) => headingPattern.test(heading[1].trim()));
  if (headingIndex < 0) return "";

  const start = (headings[headingIndex].index ?? 0) + headings[headingIndex][0].length;
  const end = headings[headingIndex + 1]?.index ?? body.length;
  return body.slice(start, end).trim();
}

function markdownSearchLines(value: string, limit = 24) {
  return value
    .split("\n")
    .map((line) =>
      line
        .replace(/^#{1,6}\s+/, "")
        .replace(/^\s*(?:[-*]|\d+\.)\s+/, "")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[*_`>#|]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
    )
    .filter((line) => line.length >= 2 && !/^---+$/.test(line))
    .slice(0, limit);
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

const readAllArticles = cache((): Article[] => {
  return walkMarkdownFiles(cookbookRoot)
    .map((filePath) => {
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = matter(raw);
      const relativeFilePath = path.relative(cookbookRoot, filePath);
      const slugParts = normalizeSlugParts(relativeFilePath);
      const metadata = normalizeArticleFrontmatter(parsed.data, {
        fallbackTitle: path.basename(filePath, path.extname(filePath)),
        fallbackSlug: decodeURIComponent(slugParts.at(-1) ?? "untitled"),
        fallbackCategory: decodeURIComponent(slugParts.at(0) ?? "未分类")
      });

      return {
        ...metadata,
        body: parsed.content.trim(),
        excerpt: metadata.summary || buildExcerpt(parsed.content),
        filePath: relativeFilePath,
        route: `/recipes/${slugParts.join("/")}`
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
});

export function getAllArticles(): Article[] {
  return readAllArticles();
}

export function getArticleById(id: string, articles = getAllArticles()) {
  return articles.find((article) => article.id === id);
}

/**
 * Public lifecycle boundary for reader-facing routes.
 *
 * Seed articles remain available for unresolved or not-yet-reviewed topics.
 * Drafts are workspace-only and must never be discoverable or addressable by
 * public pages.
 */
export function isPublicArticle(article: Pick<Article, "status">) {
  return article.status !== "draft";
}

/** Only reviewed and canonical articles should be offered to search engines. */
export function isIndexableArticle(article: Pick<Article, "status">) {
  return article.status === "reviewed" || article.status === "canonical";
}

export function getPublishedArticles(articles = getAllArticles()): Article[] {
  return articles.filter(isPublicArticle);
}

export function getIndexableArticles(articles = getAllArticles()): Article[] {
  return articles.filter(isIndexableArticle);
}

function getEncodedSlugCandidates(part: string) {
  const candidates: string[] = [];

  try {
    candidates.push(encodeURIComponent(decodeURIComponent(part)));
  } catch {
    // Route params may already contain a literal `%` or malformed input.
    // A failed decode must not turn a missing article into a server error.
  }

  try {
    const encodedLiteral = encodeURIComponent(part);
    if (!candidates.includes(encodedLiteral)) {
      candidates.push(encodedLiteral);
    }
  } catch {
    // Invalid Unicode (for example, an unpaired surrogate) is not routable.
  }

  return candidates;
}

export function getArticleBySlug(slug: string[], articles = getAllArticles()) {
  const slugCandidates = slug.map(getEncodedSlugCandidates);
  if (slugCandidates.some((candidates) => candidates.length === 0)) return undefined;

  let bestMatch: { article: Article; score: number } | undefined;

  for (const article of articles) {
    const routeParts = article.route.replace(/^\/recipes\//, "").split("/");
    if (routeParts.length !== slugCandidates.length) continue;

    let score = 0;
    let matches = true;

    for (let index = 0; index < routeParts.length; index += 1) {
      const candidateIndex = slugCandidates[index].indexOf(routeParts[index]);
      if (candidateIndex < 0) {
        matches = false;
        break;
      }
      score += candidateIndex;
    }

    if (matches && (!bestMatch || score < bestMatch.score)) {
      bestMatch = { article, score };
      if (score === 0) break;
    }
  }

  return bestMatch?.article;
}

export function getPublishedArticleBySlug(slug: string[], articles = getAllArticles()) {
  return getArticleBySlug(slug, getPublishedArticles(articles));
}

export function getAllCategories(articles = getAllArticles()) {
  const categories = new Map<string, Article[]>();

  for (const article of articles) {
    const current = categories.get(article.category) ?? [];
    current.push(article);
    categories.set(article.category, current);
  }

  return Array.from(categories.entries())
    .map(([name, items]) => ({ name, items }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getPublishedCategories(articles = getAllArticles()) {
  return getAllCategories(getPublishedArticles(articles));
}

export function getAllTags(articles = getAllArticles()) {
  return Array.from(new Set(articles.flatMap((article) => article.tags))).sort((a, b) =>
    a.localeCompare(b)
  );
}

export function getPublishedTags(articles = getAllArticles()) {
  return getAllTags(getPublishedArticles(articles));
}

export function getSearchDocuments(articles = getAllArticles()): SearchDocument[] {
  return articles.map((article) => {
    const symptoms = unique([
      ...article.symptoms,
      ...markdownSearchLines(getSection(article.body, /^症状$/), 20)
    ]);
    const officialSolution = unique([
      ...article.solutionSteps,
      ...markdownSearchLines(getSection(article.body, /^Apple 官方方案$/), 24)
    ]);
    const communityTerms = unique([
      ...article.communityTerms,
      ...markdownSearchLines(getSection(article.body, /非官方|补充处理思路|社区/), 20)
    ]);
    const intentKeywords = unique(article.keywords);
    const keywords = unique([...article.tags, ...intentKeywords]);
    const searchableMetadata = [...keywords, ...article.aliases, ...symptoms, article.summary, article.excerpt];
    const systemVersions = unique([
      ...article.systemVersions,
      searchableMetadata.flatMap((value) =>
        Array.from(value.matchAll(/\b(?:iOS|iPadOS|macOS|watchOS|visionOS|tvOS)\s*\d+(?:\.\d+)*/gi), (match) => match[0])
      )
    ].flat());
    const platforms = unique([
      ...article.platforms,
      article.tags.filter((tag) => /^(?:iOS|iPadOS|macOS|watchOS|visionOS|tvOS|Windows)$/i.test(tag))
    ].flat());
    const errorMessages = unique([
      ...article.errorMessages,
      [...symptoms, ...article.aliases].filter((value) =>
        /错误|代码|提示|不可用|未响应|暂停|无服务|sos|error|unable|unavailable|not responding|no service/i.test(value)
      )
    ].flat());

    return {
      id: article.id,
      title: article.title,
      route: article.route,
      summary: article.summary || article.excerpt,
      symptoms,
      keywords,
      intentKeywords,
      aliases: article.aliases,
      devices: article.devices,
      platforms,
      systemVersions,
      errorMessages,
      officialTerms: unique([article.category, ...article.tags, ...article.officialTerms]),
      communityTerms,
      solutionSteps: officialSolution,
      category: article.category,
      verification: article.verification,
      difficulty: article.difficulty,
      updated: article.updated,
      status: article.status
    };
  });
}

export function getPublishedSearchDocuments(articles = getAllArticles()): SearchDocument[] {
  return getSearchDocuments(getPublishedArticles(articles));
}

export function getRelatedArticles(article: Article, limit = 4, articles = getAllArticles()) {
  const tags = new Set(article.tags);

  return getPublishedArticles(articles)
    .filter((candidate) => candidate.route !== article.route)
    .map((candidate) => ({
      article: candidate,
      score:
        (candidate.category === article.category ? 4 : 0) +
        candidate.tags.filter((tag) => tags.has(tag)).length * 2 +
        candidate.device.filter((device) => article.device.includes(device)).length
    }))
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((candidate) => candidate.article);
}
