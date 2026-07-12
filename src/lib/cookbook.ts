import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type VerificationLevel = "Official" | "Verified" | "Likely" | "Experimental" | "Unknown";

export type ArticleMeta = {
  title: string;
  slug: string;
  device: string[];
  category: string;
  tags: string[];
  aliases: string[];
  verification: VerificationLevel;
  difficulty: "Quick" | "Moderate" | "Advanced";
  updated: string;
  official_sources: string[];
  community_sources: string[];
  status: "seed" | "draft" | "reviewed" | "canonical";
  popular?: boolean;
};

export type Article = ArticleMeta & {
  body: string;
  excerpt: string;
  filePath: string;
  route: string;
};

const cookbookRoot = path.join(process.cwd(), "cookbook");
const emptyProductCategories = ["iPad", "Vision Pro"];

function ensureArray(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String);
  return [String(value)];
}

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

function getCategoryDirectories() {
  if (!fs.existsSync(cookbookRoot)) return [];

  return emptyProductCategories.filter((category) => fs.existsSync(path.join(cookbookRoot, category)));
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

function formatDateValue(value: unknown) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "未复核");
}

export function getAllArticles(): Article[] {
  return walkMarkdownFiles(cookbookRoot)
    .map((filePath) => {
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = matter(raw);
      const relativeFilePath = path.relative(cookbookRoot, filePath);
      const slugParts = normalizeSlugParts(relativeFilePath);
      const data = parsed.data;

      return {
        title: String(data.title ?? path.basename(filePath, path.extname(filePath))),
        slug: String(data.slug ?? slugParts.at(-1)),
        device: ensureArray(data.device),
        category: String(data.category ?? slugParts.at(0) ?? "未分类"),
        tags: ensureArray(data.tags),
        aliases: ensureArray(data.aliases),
        verification: String(data.verification ?? "Unknown") as VerificationLevel,
        difficulty: String(data.difficulty ?? "Moderate") as Article["difficulty"],
        updated: formatDateValue(data.updated),
        official_sources: ensureArray(data.official_sources),
        community_sources: ensureArray(data.community_sources),
        status: String(data.status ?? "draft") as Article["status"],
        popular: Boolean(data.popular),
        body: parsed.content.trim(),
        excerpt: buildExcerpt(parsed.content),
        filePath: relativeFilePath,
        route: `/recipes/${slugParts.join("/")}`
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getArticleBySlug(slug: string[]) {
  const route = `/recipes/${slug.map((part) => encodeURIComponent(decodeURIComponent(part))).join("/")}`;
  return getAllArticles().find((article) => article.route === route);
}

export function getAllCategories() {
  const articles = getAllArticles();
  const categories = new Map<string, Article[]>();

  for (const category of getCategoryDirectories()) {
    categories.set(category, []);
  }

  for (const article of articles) {
    const current = categories.get(article.category) ?? [];
    current.push(article);
    categories.set(article.category, current);
  }

  return Array.from(categories.entries())
    .map(([name, items]) => ({ name, items }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getAllTags() {
  return Array.from(new Set(getAllArticles().flatMap((article) => article.tags))).sort((a, b) =>
    a.localeCompare(b)
  );
}

export function getRelatedArticles(article: Article, limit = 4) {
  const tags = new Set(article.tags);

  return getAllArticles()
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
