import { isIndexableArticle, type Article } from "./cookbook.ts";

const DEFAULT_SITE_URL = "https://cookbook.wuxiela.fun";

export type ArticleStructuredDataInput = Pick<
  Article,
  | "status"
  | "title"
  | "summary"
  | "excerpt"
  | "route"
  | "category"
  | "tags"
  | "devices"
  | "platforms"
  | "systemVersions"
  | "lastUpdatedAt"
  | "createdAt"
  | "sources"
>;

type StructuredDataOrganization = {
  "@type": "Organization";
  "@id": string;
  name: "Apple Cookbook";
  url: string;
};

export type ArticleStructuredData = {
  "@context": "https://schema.org";
  "@type": "TechArticle";
  "@id": string;
  url: string;
  mainEntityOfPage: {
    "@type": "WebPage";
    "@id": string;
  };
  headline: string;
  description: string;
  inLanguage: "zh-CN";
  dateModified: string;
  datePublished?: string;
  author: StructuredDataOrganization;
  publisher: StructuredDataOrganization;
  isAccessibleForFree: true;
  articleSection: string;
  keywords?: string[];
  about?: Array<{
    "@type": "Thing";
    name: string;
  }>;
  citation?: string[];
};

function unique(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

export function buildArticleStructuredData(
  article: ArticleStructuredDataInput,
  siteUrl: string | URL = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL
): ArticleStructuredData | null {
  if (!isIndexableArticle(article)) return null;

  const rootUrl = new URL("/", siteUrl).toString();
  const canonicalUrl = new URL(article.route, rootUrl).toString();
  const organization: StructuredDataOrganization = {
    "@type": "Organization",
    "@id": `${rootUrl}#organization`,
    name: "Apple Cookbook",
    url: rootUrl
  };
  const keywords = unique(article.tags);
  const topics = unique([...article.devices, ...article.platforms, ...article.systemVersions]);
  const citations = unique(article.sources.map((source) => source.url));

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${canonicalUrl}#article`,
    url: canonicalUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    headline: article.title,
    description: article.summary || article.excerpt,
    inLanguage: "zh-CN",
    dateModified: article.lastUpdatedAt,
    ...(article.createdAt ? { datePublished: article.createdAt } : {}),
    author: organization,
    publisher: organization,
    isAccessibleForFree: true,
    articleSection: article.category,
    ...(keywords.length ? { keywords } : {}),
    ...(topics.length
      ? {
          about: topics.map((name) => ({
            "@type": "Thing" as const,
            name
          }))
        }
      : {}),
    ...(citations.length ? { citation: citations } : {})
  };
}

/**
 * Keep user-controlled article metadata from terminating the JSON-LD script.
 * U+2028/U+2029 are escaped as an additional defense for older JavaScript
 * parsers and downstream tooling that may treat JSON as script source.
 */
export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
