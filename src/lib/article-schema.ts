export type VerificationLevel = "Official" | "Verified" | "Likely" | "Experimental" | "Unknown";
export type DifficultyLevel = "Quick" | "Moderate" | "Advanced";
export type ArticleStatus = "seed" | "draft" | "reviewed" | "canonical";
export type ArticleSchemaVersion = 1 | 2;

export type ArticleSourceType =
  | "official-support"
  | "official-guide"
  | "official-policy"
  | "community"
  | "documentation"
  | "test"
  | "other";

export type ArticleSource = {
  id: string;
  title: string;
  url: string;
  publisher: string;
  sourceType: ArticleSourceType;
  accessedAt: string | null;
  publishedAt: string | null;
  official: boolean;
};

export type ArticleSolutionKind = "recommended" | "alternative" | "escalation";

export type ArticleSolution = {
  id: string;
  title: string;
  summary?: string;
  kind: ArticleSolutionKind;
  steps: string[];
  verificationLevel: VerificationLevel;
  sourceIds: string[];
  warnings: string[];
  limitations: string[];
};

/**
 * Normalized metadata consumed by the current UI and search index.
 *
 * The singular and snake_case fields are deliberate v1 compatibility aliases.
 * New code can use the v2 names while existing pages continue to read the old
 * shape during an incremental content migration.
 */
export type ArticleMeta = {
  schemaVersion: ArticleSchemaVersion;
  id: string;
  title: string;
  slug: string;
  summary: string;
  symptoms: string[];
  devices: string[];
  platforms: string[];
  systemVersions: string[];
  categories: string[];
  tags: string[];
  keywords: string[];
  aliases: string[];
  errorMessages: string[];
  officialTerms: string[];
  communityTerms: string[];
  difficulty: DifficultyLevel;
  estimatedTime?: string;
  verificationLevel: VerificationLevel;
  status: ArticleStatus;
  canonicalArticleId?: string;
  solutions: ArticleSolution[];
  solutionSteps: string[];
  alternativeSolutions: ArticleSolution[];
  warnings: string[];
  limitations: string[];
  sources: ArticleSource[];
  lastVerifiedAt?: string;
  lastUpdatedAt: string;
  createdAt?: string;
  relatedArticles: string[];
  popular: boolean;

  // v1 compatibility aliases used by the existing routes and components.
  device: string[];
  category: string;
  verification: VerificationLevel;
  updated: string;
  official_sources: string[];
  community_sources: string[];
};

export type NormalizeArticleContext = {
  fallbackTitle?: string;
  fallbackSlug?: string;
  fallbackCategory?: string;
};

const verificationLevels = new Set<VerificationLevel>([
  "Official",
  "Verified",
  "Likely",
  "Experimental",
  "Unknown"
]);
const difficultyLevels = new Set<DifficultyLevel>(["Quick", "Moderate", "Advanced"]);
const articleStatuses = new Set<ArticleStatus>(["seed", "draft", "reviewed", "canonical"]);
const sourceTypes = new Set<ArticleSourceType>([
  "official-support",
  "official-guide",
  "official-policy",
  "community",
  "documentation",
  "test",
  "other"
]);
const solutionKinds = new Set<ArticleSolutionKind>(["recommended", "alternative", "escalation"]);
export const OFFICIAL_APPLE_CONTENT_HOSTS = ["support.apple.com"] as const;
const officialAppleContentHosts = new Set<string>(OFFICIAL_APPLE_CONTENT_HOSTS);
const appleCommunityHosts = new Set(["discussions.apple.com", "discussionschinese.apple.com"]);

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function stringValue(value: unknown, fallback = "") {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return value.toISOString().slice(0, 10);
  }

  const normalized = String(value ?? "").trim();
  return normalized || fallback;
}

function optionalString(value: unknown) {
  const normalized = stringValue(value);
  return normalized || undefined;
}

function stringArray(value: unknown): string[] {
  if (value === undefined || value === null || value === "") return [];
  const values = Array.isArray(value) ? value : [value];

  return Array.from(new Set(values.map((item) => stringValue(item)).filter(Boolean)));
}

function normalizeVerification(value: unknown): VerificationLevel {
  const candidate = stringValue(value, "Unknown") as VerificationLevel;
  return verificationLevels.has(candidate) ? candidate : "Unknown";
}

function normalizeDifficulty(value: unknown): DifficultyLevel {
  const candidate = stringValue(value, "Moderate");

  // Compatibility for early Harvest content. Content validation still asks an
  // editor to replace this legacy value with the canonical v2 enum.
  if (candidate === "Easy") return "Quick";

  return difficultyLevels.has(candidate as DifficultyLevel) ? (candidate as DifficultyLevel) : "Moderate";
}

function normalizeStatus(value: unknown): ArticleStatus {
  const candidate = stringValue(value, "draft") as ArticleStatus;
  return articleStatuses.has(candidate) ? candidate : "draft";
}

function normalizeSourceType(value: unknown): ArticleSourceType {
  const candidate = stringValue(value).toLowerCase();
  const aliases: Record<string, ArticleSourceType> = {
    official: "official-support",
    "apple-support": "official-support",
    "official-documentation": "documentation",
    guide: "official-guide",
    policy: "official-policy",
    verified: "test",
    experimental: "test"
  };
  const normalized = aliases[candidate] ?? candidate;

  return sourceTypes.has(normalized as ArticleSourceType) ? (normalized as ArticleSourceType) : "other";
}

function normalizeSolutionKind(value: unknown): ArticleSolutionKind {
  const candidate = stringValue(value, "recommended") as ArticleSolutionKind;
  return solutionKinds.has(candidate) ? candidate : "recommended";
}

function safeHostname(url: string) {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return "未知来源";
  }
}

export function isOfficialAppleContentUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && officialAppleContentHosts.has(url.hostname.toLowerCase());
  } catch {
    return false;
  }
}

function sourcePublisher(url: string) {
  const hostname = safeHostname(url);
  if (hostname === "support.apple.com") return "Apple";
  if (appleCommunityHosts.has(hostname)) return "Apple Support Community";
  if (hostname === "reddit.com") return "Reddit";
  return hostname;
}

function sourceTypeForLegacyUrl(url: string, official: boolean): ArticleSourceType {
  if (official) return "official-support";
  if (appleCommunityHosts.has(safeHostname(url))) return "community";
  return "community";
}

function normalizeStructuredSource(value: unknown, index: number): ArticleSource | undefined {
  const source = asRecord(value);
  const url = stringValue(source.url);
  if (!url) return undefined;

  // Explicit metadata is necessary but not sufficient: only an allowlisted
  // Apple content host may enter the Official trust boundary. Community hosts
  // such as discussions.apple.com always fail closed at runtime.
  const official = source.official === true && isOfficialAppleContentUrl(url);

  return {
    id: stringValue(source.id, `source-${index + 1}`),
    title: stringValue(source.title, `${sourcePublisher(url)} 来源`),
    url,
    publisher: stringValue(source.publisher, sourcePublisher(url)),
    sourceType: normalizeSourceType(source.sourceType),
    accessedAt: optionalString(source.accessedAt) ?? null,
    publishedAt: optionalString(source.publishedAt) ?? null,
    official
  };
}

function legacySource(url: string, official: boolean, index: number): ArticleSource {
  const publisher = sourcePublisher(url);
  const trustedOfficial = official && isOfficialAppleContentUrl(url);

  return {
    id: `legacy-${trustedOfficial ? "official" : "community"}-${index + 1}`,
    title: `${publisher} 来源`,
    url,
    publisher,
    sourceType: sourceTypeForLegacyUrl(url, trustedOfficial),
    accessedAt: null,
    publishedAt: null,
    official: trustedOfficial
  };
}

function uniqueSources(sources: ArticleSource[]) {
  const seenUrls = new Set<string>();

  return sources.filter((source) => {
    if (seenUrls.has(source.url)) return false;
    seenUrls.add(source.url);
    return true;
  });
}

function normalizeSources(data: Record<string, unknown>) {
  const structuredSources = Array.isArray(data.sources)
    ? data.sources
        .map((source, index) => normalizeStructuredSource(source, index))
        .filter((source): source is ArticleSource => Boolean(source))
    : [];
  const legacyOfficial = stringArray(data.official_sources).map((url, index) => legacySource(url, true, index));
  const legacyCommunity = stringArray(data.community_sources).map((url, index) => legacySource(url, false, index));
  const sourceCandidates = [...structuredSources, ...legacyOfficial, ...legacyCommunity];
  const sourceIdCounts = new Map<string, number>();

  for (const source of sourceCandidates) {
    sourceIdCounts.set(source.id, (sourceIdCounts.get(source.id) ?? 0) + 1);
  }

  const ambiguousSourceIds = new Set(
    [...sourceIdCounts.entries()]
      .filter(([, count]) => count > 1)
      .map(([sourceId]) => sourceId)
  );

  // Structured sources take precedence during a partial migration. Legacy URL
  // lists only fill gaps and cannot override explicit v2 trust metadata.
  return {
    sources: uniqueSources(sourceCandidates),
    ambiguousSourceIds
  };
}

function normalizeSolution(value: unknown, index: number): ArticleSolution | undefined {
  const solution = asRecord(value);
  const steps = stringArray(solution.steps ?? solution.solutionSteps);
  const title = stringValue(solution.title);
  if (!title && !steps.length) return undefined;

  return {
    id: stringValue(solution.id, `solution-${index + 1}`),
    title: title || `解决方案 ${index + 1}`,
    summary: optionalString(solution.summary),
    kind: normalizeSolutionKind(solution.kind),
    steps,
    verificationLevel: normalizeVerification(solution.verificationLevel ?? solution.verification),
    sourceIds: stringArray(solution.sourceIds),
    warnings: stringArray(solution.warnings),
    limitations: stringArray(solution.limitations)
  };
}

function normalizeSolutions(value: unknown) {
  return Array.isArray(value)
    ? value
        .map((solution, index) => normalizeSolution(solution, index))
        .filter((solution): solution is ArticleSolution => Boolean(solution))
    : [];
}

function enforceOfficialSolutionSources(
  solutions: ArticleSolution[],
  sources: ArticleSource[],
  ambiguousSourceIds: Set<string>
) {
  const officialSourceIds = new Set(
    sources
      .filter((source) => source.official && !ambiguousSourceIds.has(source.id))
      .map((source) => source.id)
  );

  return solutions.map((solution) => {
    if (
      solution.verificationLevel !== "Official" ||
      (solution.sourceIds.length > 0 &&
        solution.sourceIds.every((sourceId) => officialSourceIds.has(sourceId)))
    ) {
      return solution;
    }

    return { ...solution, verificationLevel: "Unknown" as const };
  });
}

export function normalizeArticleFrontmatter(
  input: unknown,
  context: NormalizeArticleContext = {}
): ArticleMeta {
  const data = asRecord(input);
  const schemaVersion: ArticleSchemaVersion = Number(data.schemaVersion) === 2 ? 2 : 1;
  const title = stringValue(data.title, context.fallbackTitle ?? "未命名文章");
  const slug = stringValue(data.slug, context.fallbackSlug ?? "untitled");
  const categories = stringArray(data.categories ?? data.category);
  const category = categories[0] ?? context.fallbackCategory ?? "未分类";
  const devices = stringArray(data.devices ?? data.device);
  const declaredVerificationLevel = normalizeVerification(data.verificationLevel ?? data.verification);
  const lastUpdatedAt = stringValue(data.lastUpdatedAt ?? data.updated, "未复核");
  const { sources, ambiguousSourceIds } = normalizeSources(data);
  const solutions = enforceOfficialSolutionSources(
    normalizeSolutions(data.solutions),
    sources,
    ambiguousSourceIds
  );
  const hasOfficialSource = sources.some((source) => source.official);
  const recommendedSolution = solutions.find((solution) => solution.kind === "recommended");
  const hasOfficialRecommendedSolution = recommendedSolution?.verificationLevel === "Official";
  const verificationLevel =
    declaredVerificationLevel === "Official" &&
    (!hasOfficialSource || (schemaVersion === 2 && !hasOfficialRecommendedSolution))
      ? "Unknown"
      : declaredVerificationLevel;
  const explicitSolutionSteps = stringArray(data.solutionSteps);
  const primarySolution = recommendedSolution ?? solutions[0];
  const solutionSteps = explicitSolutionSteps.length ? explicitSolutionSteps : (primarySolution?.steps ?? []);
  const explicitAlternatives = enforceOfficialSolutionSources(
    normalizeSolutions(data.alternativeSolutions),
    sources,
    ambiguousSourceIds
  );
  const alternativeSolutions = explicitAlternatives.length
    ? explicitAlternatives
    : solutions.filter((solution) => solution.kind === "alternative");

  return {
    schemaVersion,
    id: stringValue(data.id, slug),
    title,
    slug,
    summary: stringValue(data.summary),
    symptoms: stringArray(data.symptoms),
    devices,
    platforms: stringArray(data.platforms),
    systemVersions: stringArray(data.systemVersions),
    categories: categories.length ? categories : [category],
    tags: stringArray(data.tags),
    keywords: stringArray(data.keywords),
    aliases: stringArray(data.aliases),
    errorMessages: stringArray(data.errorMessages),
    officialTerms: stringArray(data.officialTerms),
    communityTerms: stringArray(data.communityTerms),
    difficulty: normalizeDifficulty(data.difficulty),
    estimatedTime: optionalString(data.estimatedTime),
    verificationLevel,
    status: normalizeStatus(data.status),
    canonicalArticleId: optionalString(data.canonicalArticleId),
    solutions,
    solutionSteps,
    alternativeSolutions,
    warnings: stringArray(data.warnings),
    limitations: stringArray(data.limitations),
    sources,
    lastVerifiedAt: optionalString(data.lastVerifiedAt),
    lastUpdatedAt,
    createdAt: optionalString(data.createdAt),
    relatedArticles: stringArray(data.relatedArticles),
    popular: data.popular === true,

    device: devices,
    category,
    verification: verificationLevel,
    updated: lastUpdatedAt,
    official_sources: sources.filter((source) => source.official).map((source) => source.url),
    community_sources: sources.filter((source) => !source.official).map((source) => source.url)
  };
}
