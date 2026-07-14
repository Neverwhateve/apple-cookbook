/**
 * Dependency-free search primitives for the Cookbook knowledge base.
 *
 * The module intentionally operates on a UI-agnostic document shape so the
 * same ranking behaviour can be used by a client-side search panel, a server
 * route, or a future pre-built search index.
 */

export type SearchVerificationLevel =
  | "Official"
  | "Verified"
  | "Likely"
  | "Experimental"
  | "Unknown";

export type SearchDifficulty = "Quick" | "Moderate" | "Advanced";

export type SearchDocumentStatus = "seed" | "draft" | "reviewed" | "canonical" | "archived";

export type SearchDocument = {
  readonly id: string;
  readonly title: string;
  readonly route: string;
  readonly summary: string;
  readonly symptoms: readonly string[];
  readonly keywords: readonly string[];
  /** Explicit editorial keywords used to opt an article into required intents. */
  readonly intentKeywords: readonly string[];
  readonly aliases: readonly string[];
  readonly devices: readonly string[];
  readonly platforms: readonly string[];
  readonly systemVersions: readonly string[];
  readonly errorMessages: readonly string[];
  readonly officialTerms: readonly string[];
  readonly communityTerms: readonly string[];
  readonly solutionSteps: readonly string[];
  readonly category: string;
  readonly verification: SearchVerificationLevel;
  readonly difficulty: SearchDifficulty;
  readonly updated: string;
  readonly recentSortTimestamp?: number;
  readonly status: SearchDocumentStatus;
};

export const SEARCHABLE_FIELDS = [
  "title",
  "summary",
  "symptoms",
  "keywords",
  "aliases",
  "devices",
  "platforms",
  "systemVersions",
  "errorMessages",
  "officialTerms",
  "communityTerms",
  "solutionSteps",
  "category"
] as const;

export type SearchField = (typeof SEARCHABLE_FIELDS)[number];

export type SearchMatchKind =
  | "exact"
  | "phrase"
  | "compact"
  | "term"
  | "synonym"
  | "fuzzy"
  | "cjk-ngram"
  | "error-code";

export type SearchMatchedField = {
  readonly field: SearchField;
  readonly score: number;
  readonly kinds: readonly SearchMatchKind[];
  readonly terms: readonly string[];
  readonly snippet: string;
};

/** Backwards-friendly descriptive alias for consumers that prefer this name. */
export type MatchedSearchField = SearchMatchedField;

export type SearchHit = {
  readonly document: SearchDocument;
  readonly score: number;
  /** A value between 0 and 1 describing how much of the query was matched. */
  readonly termCoverage: number;
  readonly matchedFields: readonly SearchMatchedField[];
  /** Plain text only; safe for a UI to render without using innerHTML. */
  readonly snippet: string;
};

type FieldConfiguration = {
  readonly field: SearchField;
  readonly weight: number;
};

const FIELD_CONFIGURATIONS: readonly FieldConfiguration[] = [
  { field: "title", weight: 18 },
  { field: "errorMessages", weight: 17 },
  { field: "symptoms", weight: 16 },
  { field: "aliases", weight: 15 },
  { field: "keywords", weight: 13 },
  { field: "officialTerms", weight: 12 },
  { field: "communityTerms", weight: 10 },
  { field: "summary", weight: 10 },
  { field: "devices", weight: 8 },
  { field: "platforms", weight: 8 },
  { field: "systemVersions", weight: 7 },
  { field: "solutionSteps", weight: 6 },
  { field: "category", weight: 5 }
];

const ENGLISH_STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "can",
  "could",
  "do",
  "does",
  "for",
  "how",
  "i",
  "is",
  "it",
  "me",
  "my",
  "of",
  "on",
  "please",
  "the",
  "this",
  "to",
  "what",
  "why"
]);

const CJK_STOP_PHRASES = [
  "为什么",
  "怎么样",
  "怎么办",
  "怎么",
  "如何",
  "请问",
  "帮我",
  "我的",
  "这个",
  "那个",
  "一下",
  "一直",
  "总是",
  "有时候",
  "是不是",
  "可以吗"
] as const;

type RawSynonymGroup = {
  readonly id: string;
  readonly terms: readonly string[];
};

/**
 * Small, intentionally curated vocabulary. This is not meant to replace
 * article aliases; it bridges recurring user language and Apple terminology.
 */
const RAW_SYNONYM_GROUPS: readonly RawSynonymGroup[] = [
  {
    id: "find-my",
    terms: ["查找", "查找 app", "find my", "findmy"]
  },
  {
    id: "location",
    terms: ["位置", "定位", "位置信息", "location"]
  },
  {
    id: "family-member",
    terms: ["家人", "家庭成员", "家人共享成员", "家庭共享成员", "family member"]
  },
  {
    id: "not-visible",
    terms: ["看不到", "看不见", "无法看到", "无法查看", "不显示", "找不到", "not showing"]
  },
  {
    id: "not-updating",
    terms: ["不更新", "没有更新", "停止更新", "位置不动", "not updating", "stuck"]
  },
  {
    id: "wifi",
    terms: ["wifi", "wi fi", "wi-fi", "无线局域网", "无线网络", "wlan"]
  },
  {
    id: "connection-failure",
    terms: [
      "连不上",
      "连接不上",
      "无法连接",
      "不能连接",
      "连接失败",
      "无法加入",
      "unable to join",
      "wont connect",
      "can't connect",
      "cannot connect",
      "not connecting"
    ]
  },
  {
    id: "no-internet",
    terms: ["不能上网", "无法上网", "没网", "无互联网", "没有网络", "no internet", "offline"]
  },
  {
    id: "charging",
    terms: ["充电", "充不上电", "充不了电", "无法充电", "不能充电", "charging", "charge"]
  },
  {
    id: "charging-case-failure",
    terms: [
      "充电盒充不上电",
      "充电盒充不了电",
      "充电盒无法充电",
      "充电盒没有反应",
      "充电盒没反应",
      "盒子充不上电",
      "盒子充不了电",
      "airpods case not charging",
      "charging case not working",
      "charging case wont charge",
      "charging case won't charge"
    ]
  },
  {
    id: "charge-at-eighty",
    terms: [
      "充电80",
      "充电到80",
      "充到80",
      "充至80",
      "停在80",
      "卡在80",
      "80上限",
      "充电上限",
      "百分之八十",
      "charge limit 80",
      "charging paused at 80",
      "stopped charging at 80"
    ]
  },
  {
    id: "battery",
    terms: ["电池", "电量", "续航", "battery"]
  },
  {
    id: "battery-drain",
    terms: ["掉电快", "耗电快", "电池掉得快", "续航变差", "battery drain", "draining fast"]
  },
  {
    id: "system-data",
    terms: ["系统数据", "其他储存空间", "其他存储空间", "system data", "other storage"]
  },
  {
    id: "storage-large",
    terms: [
      "系统数据很大",
      "储存占用很大",
      "存储占用很大",
      "占用很大",
      "占空间",
      "占用过多",
      "空间不足",
      "storage full",
      "taking up space"
    ]
  },
  {
    id: "not-responding",
    terms: ["未响应", "无响应", "没有反应", "没反应", "not responding", "unresponsive"]
  },
  {
    id: "password",
    terms: ["密码", "口令", "passcode", "password"]
  },
  {
    id: "forgotten",
    terms: ["忘记", "忘了", "不记得", "forgot", "forgotten"]
  },
  {
    id: "airdrop",
    terms: ["隔空投送", "airdrop"]
  },
  {
    id: "personal-hotspot",
    terms: ["个人热点", "热点", "personal hotspot", "hotspot"]
  },
  {
    id: "apple-account",
    terms: ["apple 账户", "apple账号", "apple id", "appleid"]
  },
  {
    id: "apple-account-password-reset",
    terms: [
      "忘记 apple 账户密码",
      "忘记了 apple 账户密码",
      "我忘了 apple 账户的密码",
      "apple 账户密码忘记",
      "apple 账户密码忘了",
      "忘记 apple 账号密码",
      "忘记了 apple 账号密码",
      "apple 账号密码忘记",
      "apple 账号密码忘了",
      "忘记 apple id 密码",
      "忘记了 apple id 密码",
      "我忘了 apple id 的密码",
      "apple id 密码忘记",
      "apple id 密码忘了",
      "forgot apple account password",
      "forgot my apple account password",
      "forgot apple id password",
      "forgot my apple id password",
      "i forgot my apple id password"
    ]
  },
  {
    id: "screen-time-limits",
    terms: [
      "屏幕使用时间限制",
      "屏幕时间限制",
      "屏幕使用时间限额",
      "屏幕时间限额",
      "app 限额",
      "app限额",
      "停用时间",
      "screen time limits",
      "screen time limit",
      "app limits",
      "app limit"
    ]
  },
  {
    id: "apple-pay-declined",
    terms: [
      "付款被拒绝",
      "支付被拒绝",
      "付款失败",
      "支付失败",
      "刷卡失败",
      "刷不出来",
      "读卡器没反应",
      "payment declined",
      "transaction failed",
      "terminal not working"
    ]
  },
  {
    id: "wallet-add-card",
    terms: [
      "钱包无法添加卡片",
      "无法添加银行卡",
      "添加银行卡失败",
      "添加卡片失败",
      "无法添加卡",
      "不能添加卡",
      "添加不了卡",
      "加不了卡",
      "cannot add card",
      "can't add a card",
      "card not added"
    ]
  }
];

/**
 * Broad symptoms such as “空间不足” occur in many unrelated articles. When a
 * query explicitly names one of these concepts, a result must match that
 * concept instead of surviving on a neighbouring symptom alone.
 */
const REQUIRED_QUERY_CONCEPTS = new Set([
  "system-data",
  "charge-at-eighty",
  "charging-case-failure",
  "screen-time-limits",
  "apple-pay-declined",
  "wallet-add-card",
  "apple-account-password-reset"
]);

type PreparedSynonymTerm = {
  readonly original: string;
  readonly normalized: string;
  readonly compact: string;
};

type PreparedSynonymGroup = {
  readonly id: string;
  readonly terms: readonly PreparedSynonymTerm[];
};

type ConceptMatch = {
  readonly id: string;
  readonly term: PreparedSynonymTerm;
};

type PreparedField = {
  readonly field: SearchField;
  readonly weight: number;
  readonly values: readonly string[];
  readonly normalized: string;
  readonly compact: string;
  readonly englishTokens: ReadonlySet<string>;
  readonly cjkNgrams: ReadonlyMap<string, number>;
  readonly conceptMatches: ReadonlyMap<string, PreparedSynonymTerm>;
};

type PreparedDocument = {
  readonly document: SearchDocument;
  readonly fields: readonly PreparedField[];
  readonly errorCodes: ReadonlySet<string>;
  readonly intentConcepts: ReadonlySet<string>;
};

type PreparedQuery = {
  readonly normalized: string;
  readonly compact: string;
  readonly englishTerms: readonly string[];
  readonly cjkNgrams: ReadonlyMap<string, number>;
  readonly concepts: readonly ConceptMatch[];
  readonly errorCodes: readonly string[];
  readonly hasMeaningfulSignal: boolean;
};

const documentCache = new WeakMap<SearchDocument, PreparedDocument>();

/**
 * Normalizes full-width characters, case, punctuation, and mixed CJK/Latin
 * boundaries. Keeping a visible boundary here makes both `iPhone无法充电` and
 * `iPhone 无法充电` produce the same representation.
 */
export function normalizeSearchText(value: string): string {
  return String(value ?? "")
    .normalize("NFKC")
    .toLocaleLowerCase("en-US")
    .replace(/[\u2018\u2019'`\u00b4]/g, "")
    .replace(
      /([\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}])([\p{Script=Latin}\p{N}])/gu,
      "$1 $2"
    )
    .replace(
      /([\p{Script=Latin}\p{N}])([\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}])/gu,
      "$1 $2"
    )
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function compactText(value: string): string {
  return value.replace(/\s+/g, "");
}

const SYNONYM_GROUPS: readonly PreparedSynonymGroup[] = RAW_SYNONYM_GROUPS.map((group) => ({
  id: group.id,
  terms: group.terms
    .map((term) => {
      const normalized = normalizeSearchText(term);

      return {
        original: term,
        normalized,
        compact: compactText(normalized)
      };
    })
    .filter((term) => term.compact.length >= 2)
    .sort((left, right) => right.compact.length - left.compact.length)
}));

function getConceptMatches(normalized: string): Map<string, PreparedSynonymTerm> {
  const compact = compactText(normalized);
  const matches = new Map<string, PreparedSynonymTerm>();

  for (const group of SYNONYM_GROUPS) {
    const matchingTerm = group.terms.find((term) => compact.includes(term.compact));

    if (matchingTerm) matches.set(group.id, matchingTerm);
  }

  return matches;
}

function getEnglishTokens(normalized: string): Set<string> {
  const tokens = normalized.match(/[\p{Script=Latin}\p{N}]+/gu) ?? [];
  return new Set(tokens);
}

function removeAll(value: string, search: string): string {
  if (!search) return value;
  return value.split(search).join(" ");
}

function makeQueryResidual(normalized: string, concepts: readonly ConceptMatch[]): string {
  let residual = normalized;
  const matchingTerms = [...concepts]
    .map((concept) => concept.term.normalized)
    .sort((left, right) => right.length - left.length);

  for (const term of matchingTerms) residual = removeAll(residual, term);
  for (const phrase of CJK_STOP_PHRASES) {
    residual = removeAll(residual, normalizeSearchText(phrase));
  }

  return residual.replace(/\s+/g, " ").trim();
}

function buildCjkNgrams(normalized: string): Map<string, number> {
  const runs = normalized.match(
    /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]+/gu
  );
  const grams = new Map<string, number>();

  for (const run of runs ?? []) {
    const characters = Array.from(run);

    for (const size of [2, 3, 4] as const) {
      if (characters.length < size) continue;

      for (let index = 0; index <= characters.length - size; index += 1) {
        const gram = characters.slice(index, index + size).join("");
        grams.set(gram, size);
      }
    }
  }

  return grams;
}

function normalizeErrorCode(value: string): string {
  return value.normalize("NFKC").toLocaleLowerCase("en-US").replace(/[\s:#\uff1a]/g, "");
}

function extractErrorCodes(value: string): Set<string> {
  const source = String(value ?? "").normalize("NFKC");
  const codes = new Set<string>();

  const addMatches = (expression: RegExp, captureGroup = 0) => {
    for (const match of source.matchAll(expression)) {
      const candidate = match[captureGroup];
      if (candidate) codes.add(normalizeErrorCode(candidate));
    }
  };

  addMatches(/\b0x[\da-f]{3,}\b/giu);
  addMatches(/(?:错误(?:代码|码)?|error(?:\s+code)?|code)\s*[:\uff1a#-]?\s*(-?[a-z]*\d[\da-z_-]*)/giu, 1);
  addMatches(/(?:^|[^\p{L}\p{N}])(-\d{2,})(?=$|[^\p{L}\p{N}])/gu, 1);
  addMatches(/\b\d{3,6}\b/g);

  const trimmed = source.trim();
  if (/^-?[a-z]*\d[\da-z_-]*$/iu.test(trimmed)) {
    codes.add(normalizeErrorCode(trimmed));
  }

  return codes;
}

function valuesForField(document: SearchDocument, field: SearchField): readonly string[] {
  const value = document[field];

  if (Array.isArray(value)) {
    return value.map((item) => String(item ?? "")).filter(Boolean);
  }

  const text = String(value ?? "");
  return text ? [text] : [];
}

function prepareField(document: SearchDocument, configuration: FieldConfiguration): PreparedField {
  const values = valuesForField(document, configuration.field);
  const normalized = normalizeSearchText(values.join(" "));

  return {
    field: configuration.field,
    weight: configuration.weight,
    values,
    normalized,
    compact: compactText(normalized),
    englishTokens: getEnglishTokens(normalized),
    cjkNgrams: buildCjkNgrams(normalized),
    conceptMatches: getConceptMatches(normalized)
  };
}

function prepareDocument(document: SearchDocument): PreparedDocument {
  const cached = documentCache.get(document);
  if (cached) return cached;

  // Required concepts are an explicit canonical opt-in. Searchable `keywords`
  // also contain broad taxonomy tags, so they must not establish article
  // intent. Only the title, aliases, and frontmatter-authored intent keywords
  // may satisfy the gate.
  const intentConcepts = new Set<string>();
  for (const value of [document.title, ...document.aliases, ...document.intentKeywords]) {
    for (const conceptId of getConceptMatches(normalizeSearchText(value)).keys()) {
      intentConcepts.add(conceptId);
    }
  }

  const prepared: PreparedDocument = {
    document,
    fields: FIELD_CONFIGURATIONS.map((configuration) => prepareField(document, configuration)),
    errorCodes: new Set(document.errorMessages.flatMap((message) => [...extractErrorCodes(message)])),
    intentConcepts
  };

  documentCache.set(document, prepared);
  return prepared;
}

function prepareQuery(query: string): PreparedQuery {
  const normalized = normalizeSearchText(query);
  const conceptMatches = getConceptMatches(normalized);
  const concepts = [...conceptMatches].map(([id, term]) => ({ id, term }));
  const errorCodes = [...extractErrorCodes(query)];
  let residual = makeQueryResidual(normalized, concepts);

  for (const code of errorCodes) residual = removeAll(residual, normalizeSearchText(code));

  const englishTerms = [...getEnglishTokens(residual)].filter(
    (term) => !ENGLISH_STOP_WORDS.has(term) && !errorCodes.includes(normalizeErrorCode(term))
  );
  const cjkNgrams = buildCjkNgrams(residual);

  return {
    normalized,
    compact: compactText(normalized),
    englishTerms,
    cjkNgrams,
    concepts,
    errorCodes,
    hasMeaningfulSignal:
      concepts.length > 0 || englishTerms.length > 0 || cjkNgrams.size > 0 || errorCodes.length > 0
  };
}

/**
 * A bounded Damerau-Levenshtein check for distance <= 1. Adjacent transposes
 * count as one edit, so common input mistakes such as `battrey` are covered.
 */
function isWithinOneEdit(left: string, right: string): boolean {
  if (left === right) return true;
  if (Math.abs(left.length - right.length) > 1) return false;

  if (left.length === right.length) {
    const differences: number[] = [];

    for (let index = 0; index < left.length; index += 1) {
      if (left[index] !== right[index]) differences.push(index);
      if (differences.length > 2) return false;
    }

    if (differences.length === 1) return true;

    return (
      differences.length === 2 &&
      differences[1] === differences[0] + 1 &&
      left[differences[0]] === right[differences[1]] &&
      left[differences[1]] === right[differences[0]]
    );
  }

  const shorter = left.length < right.length ? left : right;
  const longer = left.length < right.length ? right : left;
  let shortIndex = 0;
  let longIndex = 0;
  let edits = 0;

  while (shortIndex < shorter.length && longIndex < longer.length) {
    if (shorter[shortIndex] === longer[longIndex]) {
      shortIndex += 1;
      longIndex += 1;
      continue;
    }

    edits += 1;
    longIndex += 1;
    if (edits > 1) return false;
  }

  return true;
}

function gramWeight(size: number): number {
  if (size === 4) return 2.35;
  if (size === 3) return 1.65;
  return 1;
}

function roundScore(value: number): number {
  return Math.round(value * 1000) / 1000;
}

function cleanSnippet(value: string): string {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_>#|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncateSnippet(value: string, terms: readonly string[], maximumLength = 150): string {
  const cleaned = cleanSnippet(value);
  if (cleaned.length <= maximumLength) return cleaned;

  const normalized = normalizeSearchText(cleaned);
  const normalizedTerms = terms.map(normalizeSearchText).filter(Boolean);
  const firstMatch = normalizedTerms
    .map((term) => normalized.indexOf(term))
    .filter((index) => index >= 0)
    .sort((left, right) => left - right)[0];
  const approximateStart = firstMatch === undefined ? 0 : Math.max(0, firstMatch - 38);
  const start = Math.min(approximateStart, Math.max(0, cleaned.length - maximumLength));
  const content = cleaned.slice(start, start + maximumLength).trim();

  return `${start > 0 ? "\u2026" : ""}${content}${start + maximumLength < cleaned.length ? "\u2026" : ""}`;
}

function selectSnippet(values: readonly string[], terms: readonly string[]): string {
  if (values.length === 0) return "";

  const normalizedTerms = terms.map(normalizeSearchText).filter(Boolean);
  const rankedValues = values
    .map((value, index) => {
      const normalized = normalizeSearchText(value);
      const compact = compactText(normalized);
      const matches = normalizedTerms.filter((term) => {
        return normalized.includes(term) || compact.includes(compactText(term));
      }).length;

      return { value, index, matches };
    })
    .sort((left, right) => right.matches - left.matches || left.index - right.index);

  return truncateSnippet(rankedValues[0].value, terms);
}

function qualityBoost(document: SearchDocument): number {
  const statusBoost =
    document.status === "canonical" ? 4 : document.status === "reviewed" ? 2.5 : document.status === "seed" ? 0.5 : 0;
  const verificationBoost =
    document.verification === "Official" ? 2 : document.verification === "Verified" ? 1.25 : 0;

  return statusBoost + verificationBoost;
}

type MutableFieldMatch = {
  field: SearchField;
  score: number;
  kinds: Set<SearchMatchKind>;
  terms: Set<string>;
  values: readonly string[];
};

function scoreDocument(prepared: PreparedDocument, query: PreparedQuery): SearchHit | null {
  // A code in the query is a hard constraint: 4013 must never fuzzily return 4014.
  if (query.errorCodes.some((code) => !prepared.errorCodes.has(code))) return null;

  const matchedConcepts = new Set<string>();
  const matchedEnglishTerms = new Set<string>();
  const matchedCjkNgrams = new Set<string>();
  const matchedErrorCodes = new Set<string>();
  const fieldMatches: MutableFieldMatch[] = [];
  let rawScore = 0;
  let fullPhraseMatched = false;

  const queryGramTotal = [...query.cjkNgrams.values()].reduce(
    (total, size) => total + gramWeight(size),
    0
  );

  for (const field of prepared.fields) {
    if (!field.normalized) continue;

    const kinds = new Set<SearchMatchKind>();
    const terms = new Set<string>();
    let fieldScore = 0;

    if (query.normalized && field.normalized === query.normalized) {
      fieldScore += field.weight * 11;
      kinds.add("exact");
      terms.add(query.normalized);
      fullPhraseMatched = true;
    } else if (query.normalized.length >= 2 && field.normalized.includes(query.normalized)) {
      fieldScore += field.weight * 7;
      kinds.add("phrase");
      terms.add(query.normalized);
      fullPhraseMatched = true;
    } else if (query.compact.length >= 2 && field.compact.includes(query.compact)) {
      fieldScore += field.weight * 5.5;
      kinds.add("compact");
      terms.add(query.normalized);
      fullPhraseMatched = true;
    }

    for (const concept of query.concepts) {
      const fieldTerm = field.conceptMatches.get(concept.id);
      if (!fieldTerm) continue;

      fieldScore += field.weight * 2.6;
      kinds.add("synonym");
      terms.add(fieldTerm.normalized);
      matchedConcepts.add(concept.id);
    }

    for (const queryTerm of query.englishTerms) {
      if (field.englishTokens.has(queryTerm)) {
        fieldScore += field.weight * 2.4;
        kinds.add("term");
        terms.add(queryTerm);
        matchedEnglishTerms.add(queryTerm);
        continue;
      }

      if (!/^[a-z]+$/.test(queryTerm) || queryTerm.length < 4) continue;

      const fuzzyMatch = [...field.englishTokens].find(
        (fieldTerm) =>
          /^[a-z]+$/.test(fieldTerm) &&
          fieldTerm.length >= 4 &&
          isWithinOneEdit(queryTerm, fieldTerm)
      );

      if (fuzzyMatch) {
        fieldScore += field.weight * 1.8;
        kinds.add("fuzzy");
        terms.add(fuzzyMatch);
        matchedEnglishTerms.add(queryTerm);
      }
    }

    if (query.cjkNgrams.size > 0 && queryGramTotal > 0) {
      let matchedWeight = 0;
      let hasLongGram = false;
      const fieldMatchedGrams: string[] = [];

      for (const [gram, size] of query.cjkNgrams) {
        if (!field.cjkNgrams.has(gram)) continue;
        matchedWeight += gramWeight(size);
        hasLongGram ||= size >= 3;
        fieldMatchedGrams.push(gram);
      }

      const gramCoverage = matchedWeight / queryGramTotal;
      if (gramCoverage >= 0.08 || hasLongGram || query.cjkNgrams.size <= 3) {
        fieldScore += field.weight * 3.2 * gramCoverage;
        if (fieldMatchedGrams.length > 0) kinds.add("cjk-ngram");

        for (const gram of fieldMatchedGrams) {
          terms.add(gram);
          matchedCjkNgrams.add(gram);
        }
      }
    }

    if (field.field === "errorMessages") {
      for (const code of query.errorCodes) {
        if (!prepared.errorCodes.has(code)) continue;
        fieldScore += field.weight * 16;
        kinds.add("error-code");
        terms.add(code);
        matchedErrorCodes.add(code);
      }
    }

    if (fieldScore <= 0) continue;
    rawScore += fieldScore;
    fieldMatches.push({ field: field.field, score: fieldScore, kinds, terms, values: field.values });
  }

  const matchedCjkWeight = [...matchedCjkNgrams].reduce(
    (total, gram) => total + gramWeight(query.cjkNgrams.get(gram) ?? 2),
    0
  );
  const cjkCoverage = queryGramTotal > 0 ? Math.min(1, matchedCjkWeight / queryGramTotal) : 0;
  const coverageDenominator =
    query.concepts.length +
    query.englishTerms.length +
    query.errorCodes.length +
    (query.cjkNgrams.size > 0 ? 1 : 0);
  const coverageNumerator =
    matchedConcepts.size +
    matchedEnglishTerms.size +
    matchedErrorCodes.size +
    (query.cjkNgrams.size > 0 ? cjkCoverage : 0);
  const termCoverage = fullPhraseMatched
    ? 1
    : coverageDenominator > 0
      ? Math.min(1, coverageNumerator / coverageDenominator)
      : 0;

  if (
    query.concepts.some(
      (concept) => REQUIRED_QUERY_CONCEPTS.has(concept.id) && !prepared.intentConcepts.has(concept.id)
    )
  ) {
    return null;
  }

  if (rawScore < 7 || (termCoverage < 0.16 && !fullPhraseMatched && matchedErrorCodes.size === 0)) {
    return null;
  }

  const matchedFields: SearchMatchedField[] = fieldMatches
    .map((match) => ({
      field: match.field,
      score: roundScore(match.score),
      kinds: [...match.kinds],
      terms: [...match.terms],
      snippet: selectSnippet(match.values, [...match.terms])
    }))
    .sort((left, right) => right.score - left.score);

  const snippetFieldPreference: readonly SearchField[] = [
    "summary",
    "symptoms",
    "solutionSteps",
    "aliases",
    "officialTerms",
    "communityTerms",
    "title",
    "errorMessages",
    "keywords",
    "devices",
    "platforms",
    "systemVersions",
    "category"
  ];
  const snippet =
    snippetFieldPreference
      .map((field) => matchedFields.find((match) => match.field === field)?.snippet)
      .find(Boolean) ?? truncateSnippet(prepared.document.summary || prepared.document.title, []);
  const finalScore = rawScore * (0.72 + termCoverage * 0.58) + termCoverage * 12 + qualityBoost(prepared.document);

  return {
    document: prepared.document,
    score: roundScore(finalScore),
    termCoverage: roundScore(termCoverage),
    matchedFields,
    snippet
  };
}

/**
 * Ranks documents for a natural-language query. The function is deterministic,
 * never mutates input documents, and caches only normalized document data in a
 * WeakMap; repeated queries do not rebuild the document-side search material.
 */
export function searchDocuments(
  documents: readonly SearchDocument[],
  query: string,
  limit = 20
): SearchHit[] {
  const maximumResults = Number.isFinite(limit) ? Math.max(0, Math.floor(limit)) : 20;
  if (maximumResults === 0) return [];

  const preparedQuery = prepareQuery(query);
  if (!preparedQuery.normalized || !preparedQuery.hasMeaningfulSignal) return [];

  return documents
    .map((document) => scoreDocument(prepareDocument(document), preparedQuery))
    .filter((hit): hit is SearchHit => hit !== null)
    .sort((left, right) => {
      return (
        right.score - left.score ||
        right.termCoverage - left.termCoverage ||
        right.document.updated.localeCompare(left.document.updated) ||
        left.document.title.localeCompare(right.document.title, "zh-CN")
      );
    })
    .slice(0, maximumResults);
}
