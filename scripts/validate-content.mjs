#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = path.join(process.cwd(), "cookbook");
const v1RequiredFields = [
  "title",
  "slug",
  "device",
  "category",
  "tags",
  "aliases",
  "verification",
  "difficulty",
  "updated",
  "official_sources",
  "community_sources",
  "status",
  "popular"
];
const v2RequiredFields = [
  "schemaVersion",
  "id",
  "title",
  "slug",
  "summary",
  "symptoms",
  "devices",
  "platforms",
  "systemVersions",
  "categories",
  "tags",
  "keywords",
  "aliases",
  "errorMessages",
  "officialTerms",
  "communityTerms",
  "difficulty",
  "estimatedTime",
  "verificationLevel",
  "status",
  "canonicalArticleId",
  "solutions",
  "warnings",
  "limitations",
  "sources",
  "lastVerifiedAt",
  "lastUpdatedAt",
  "createdAt",
  "relatedArticles",
  "popular"
];
const requiredSections = ["症状", "可能原因", "Apple 官方方案", "零售排查流程", "升级处理", "相关问题"];
const verificationLevels = new Set(["Official", "Verified", "Likely", "Experimental", "Unknown"]);
const difficultyLevels = new Set(["Quick", "Moderate", "Advanced"]);
const statuses = new Set(["seed", "draft", "reviewed", "canonical"]);
const sourceTypes = new Set([
  "official-support",
  "official-guide",
  "official-policy",
  "community",
  "documentation",
  "test",
  "other"
]);
const solutionKinds = new Set(["recommended", "alternative", "escalation"]);
const officialAppleContentHosts = new Set(["support.apple.com"]);
const officialAppleContentHostList = [...officialAppleContentHosts].join(", ");
const idPattern = /^[a-z0-9][a-z0-9._-]*$/;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const v1AllowedFields = new Set([...v1RequiredFields, "schemaVersion"]);
const v2AllowedFields = new Set(v2RequiredFields);
const errors = [];
const warnings = [];

function walkMarkdownFiles(directory) {
  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walkMarkdownFiles(absolutePath);
    return entry.isFile() && /\.mdx?$/.test(entry.name) ? [absolutePath] : [];
  });
}

function displayPath(filePath) {
  return path.relative(process.cwd(), filePath);
}

function report(collection, filePath, message) {
  collection.push(`${displayPath(filePath)}: ${message}`);
}

function toDateString(value) {
  return value instanceof Date ? value.toISOString().slice(0, 10) : String(value ?? "");
}

function isIsoDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(toDateString(value));
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringArray(value, { allowEmpty = true } = {}) {
  return (
    Array.isArray(value) &&
    (allowEmpty || value.length > 0) &&
    value.every((item) => typeof item === "string" && item.trim().length > 0) &&
    new Set(value).size === value.length
  );
}

function isOfficialAppleContentHostname(hostname) {
  return officialAppleContentHosts.has(String(hostname).toLowerCase());
}

function parseHttpsUrl(filePath, field, value) {
  let url;

  try {
    url = new URL(value);
  } catch {
    report(errors, filePath, `${field} 包含无效 URL：${String(value)}`);
    return null;
  }

  if (url.protocol !== "https:") {
    report(errors, filePath, `${field} 必须使用 HTTPS：${String(value)}`);
    return null;
  }

  return url;
}

function validateUrlList(filePath, field, value, official) {
  if (!Array.isArray(value)) return;

  for (const source of value) {
    const url = parseHttpsUrl(filePath, field, source);
    if (official && url && !isOfficialAppleContentHostname(url.hostname)) {
      report(errors, filePath, `Official 来源必须来自允许的 Apple 官方内容 host（${officialAppleContentHostList}）：${source}`);
    }
  }
}

function sectionBody(content, title) {
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = content.match(new RegExp(`^##\\s+${escapedTitle}\\s*$([\\s\\S]*?)(?=^##\\s+|(?![\\s\\S]))`, "m"));
  return match?.[1]?.trim() ?? "";
}

function validateRequiredFields(filePath, data, requiredFields) {
  for (const field of requiredFields) {
    if (!Object.hasOwn(data, field) || data[field] === undefined || data[field] === "") {
      report(errors, filePath, `缺少必填字段 ${field}`);
    }
  }
}

function validateCommonMetadata(filePath, data, { v2 }) {
  const devices = v2 ? data.devices : data.device;
  const categories = v2 ? data.categories : data.category;
  const verification = v2 ? data.verificationLevel : data.verification;
  const updated = v2 ? data.lastUpdatedAt : data.updated;

  if (typeof data.title !== "string" || !data.title.trim()) {
    report(errors, filePath, "title 必须是非空字符串");
  }

  if (!slugPattern.test(String(data.slug ?? ""))) {
    report(errors, filePath, `slug 格式无效：${String(data.slug ?? "")}`);
  }

  const fileSlug = path.basename(filePath, path.extname(filePath));
  if (data.slug && data.slug !== fileSlug) {
    report(errors, filePath, `slug 与文件名不一致：${data.slug} != ${fileSlug}`);
  }

  if (!isStringArray(devices, { allowEmpty: false })) {
    report(errors, filePath, `${v2 ? "devices" : "device"} 必须是非空、无重复的字符串数组`);
  }
  if (v2) {
    if (!isStringArray(categories, { allowEmpty: false })) {
      report(errors, filePath, "categories 必须是非空、无重复的字符串数组");
    }
  } else if (typeof categories !== "string" || !categories.trim()) {
    report(errors, filePath, "category 必须是非空字符串");
  }
  if (!isStringArray(data.tags, { allowEmpty: false })) {
    report(errors, filePath, "tags 必须是非空、无重复的字符串数组");
  }
  if (!isStringArray(data.aliases)) report(errors, filePath, "aliases 必须是无重复的字符串数组");

  if (!verificationLevels.has(verification)) {
    report(errors, filePath, `${v2 ? "verificationLevel" : "verification"} 无效：${String(verification)}`);
  }

  if (!v2 && data.difficulty === "Easy") {
    report(warnings, filePath, "difficulty=Easy 是兼容值，请在人工复核后改为 Quick");
  } else if (!difficultyLevels.has(data.difficulty)) {
    report(errors, filePath, `difficulty 无效：${String(data.difficulty)}`);
  }

  if (!statuses.has(data.status)) report(errors, filePath, `status 无效：${String(data.status)}`);
  if (typeof data.popular !== "boolean") report(errors, filePath, "popular 必须是 boolean");
  if (!isIsoDate(updated)) {
    report(errors, filePath, `${v2 ? "lastUpdatedAt" : "updated"} 必须是 ISO 日期：${toDateString(updated)}`);
  }

  return { verification, updated };
}

function validateV1(filePath, data) {
  validateRequiredFields(filePath, data, v1RequiredFields);
  const unknownFields = Object.keys(data).filter((field) => !v1AllowedFields.has(field));
  if (unknownFields.length) {
    report(warnings, filePath, `存在 v1 Schema 未定义字段：${unknownFields.join(", ")}`);
  }
  if (data.schemaVersion !== undefined && Number(data.schemaVersion) !== 1) {
    report(errors, filePath, `schemaVersion 无效：${String(data.schemaVersion)}`);
  }

  const common = validateCommonMetadata(filePath, data, { v2: false });

  if (!isStringArray(data.official_sources)) report(errors, filePath, "official_sources 必须是无重复的字符串数组");
  if (!isStringArray(data.community_sources)) report(errors, filePath, "community_sources 必须是无重复的字符串数组");
  validateUrlList(filePath, "official_sources", data.official_sources, true);
  validateUrlList(filePath, "community_sources", data.community_sources, false);

  if (common.verification === "Official" && (!Array.isArray(data.official_sources) || data.official_sources.length === 0)) {
    report(errors, filePath, "Official 文章必须至少有一个 Apple 官方来源");
  }
  return {
    verification: common.verification,
    communitySourceCount: Array.isArray(data.community_sources) ? data.community_sources.length : 0
  };
}

function validateV2Sources(filePath, value) {
  if (!Array.isArray(value)) {
    report(errors, filePath, "sources 必须是数组");
    return { sourceIds: new Set(), officialSourceIds: new Set(), communitySourceCount: 0 };
  }

  const sourceIds = new Set();
  const officialSourceIds = new Set();
  let communitySourceCount = 0;

  for (const [index, source] of value.entries()) {
    const label = `sources[${index}]`;
    if (!isRecord(source)) {
      report(errors, filePath, `${label} 必须是对象`);
      continue;
    }

    for (const field of ["id", "title", "url", "publisher", "sourceType", "accessedAt", "publishedAt", "official"]) {
      if (!Object.hasOwn(source, field) || source[field] === undefined || source[field] === "") {
        report(errors, filePath, `${label} 缺少字段 ${field}`);
      }
    }

    if (!idPattern.test(String(source.id ?? ""))) report(errors, filePath, `${label}.id 格式无效`);
    if (sourceIds.has(source.id)) report(errors, filePath, `${label}.id 重复：${String(source.id)}`);
    if (typeof source.id === "string") sourceIds.add(source.id);
    if (typeof source.title !== "string" || !source.title.trim()) report(errors, filePath, `${label}.title 必须是非空字符串`);
    if (typeof source.publisher !== "string" || !source.publisher.trim()) report(errors, filePath, `${label}.publisher 必须是非空字符串`);
    if (!sourceTypes.has(source.sourceType)) report(errors, filePath, `${label}.sourceType 无效：${String(source.sourceType)}`);
    if (typeof source.official !== "boolean") report(errors, filePath, `${label}.official 必须是 boolean`);
    if (!isIsoDate(source.accessedAt)) report(errors, filePath, `${label}.accessedAt 必须是 ISO 日期`);
    if (source.publishedAt !== null && !isIsoDate(source.publishedAt)) {
      report(errors, filePath, `${label}.publishedAt 必须是 ISO 日期或 null`);
    }

    const url = parseHttpsUrl(filePath, `${label}.url`, source.url);
    if (source.official === true) {
      if (typeof source.id === "string" && url && isOfficialAppleContentHostname(url.hostname)) {
        officialSourceIds.add(source.id);
      }
      if (url && !isOfficialAppleContentHostname(url.hostname)) {
        report(
          errors,
          filePath,
          `${label} 标为 official，但 URL 不属于允许的 Apple 官方内容 host（${officialAppleContentHostList}）：${String(source.url)}`
        );
      }
    } else {
      communitySourceCount += 1;
    }
  }

  return { sourceIds, officialSourceIds, communitySourceCount };
}

function validateV2Solutions(filePath, data, sourceInfo) {
  if (!Array.isArray(data.solutions)) {
    report(errors, filePath, "solutions 必须是数组");
    return;
  }

  const solutionIds = new Set();
  let actionableSolutionCount = 0;

  for (const [index, solution] of data.solutions.entries()) {
    const label = `solutions[${index}]`;
    if (!isRecord(solution)) {
      report(errors, filePath, `${label} 必须是对象`);
      continue;
    }

    for (const field of ["id", "title", "summary", "kind", "steps", "verificationLevel", "sourceIds", "warnings", "limitations"]) {
      if (!Object.hasOwn(solution, field) || solution[field] === undefined || solution[field] === "") {
        report(errors, filePath, `${label} 缺少字段 ${field}`);
      }
    }

    if (!idPattern.test(String(solution.id ?? ""))) report(errors, filePath, `${label}.id 格式无效`);
    if (solutionIds.has(solution.id)) report(errors, filePath, `${label}.id 重复：${String(solution.id)}`);
    if (typeof solution.id === "string") solutionIds.add(solution.id);
    if (typeof solution.title !== "string" || !solution.title.trim()) report(errors, filePath, `${label}.title 必须是非空字符串`);
    if (solution.summary !== null && (typeof solution.summary !== "string" || !solution.summary.trim())) {
      report(errors, filePath, `${label}.summary 必须是非空字符串或 null`);
    }
    if (!solutionKinds.has(solution.kind)) report(errors, filePath, `${label}.kind 无效：${String(solution.kind)}`);
    if (!verificationLevels.has(solution.verificationLevel)) {
      report(errors, filePath, `${label}.verificationLevel 无效：${String(solution.verificationLevel)}`);
    }
    if (!isStringArray(solution.steps)) report(errors, filePath, `${label}.steps 必须是无重复的字符串数组`);
    if (!isStringArray(solution.sourceIds)) report(errors, filePath, `${label}.sourceIds 必须是无重复的字符串数组`);
    if (!isStringArray(solution.warnings)) report(errors, filePath, `${label}.warnings 必须是无重复的字符串数组`);
    if (!isStringArray(solution.limitations)) report(errors, filePath, `${label}.limitations 必须是无重复的字符串数组`);

    if (Array.isArray(solution.steps) && solution.steps.length > 0) actionableSolutionCount += 1;
    if (Array.isArray(solution.sourceIds)) {
      for (const sourceId of solution.sourceIds) {
        if (!sourceInfo.sourceIds.has(sourceId)) report(errors, filePath, `${label}.sourceIds 引用了不存在的来源：${sourceId}`);
      }
    }
    if (
      solution.verificationLevel === "Official" &&
      (!Array.isArray(solution.sourceIds) || !solution.sourceIds.some((sourceId) => sourceInfo.officialSourceIds.has(sourceId)))
    ) {
      report(errors, filePath, `${label} 标为 Official，但未引用 Apple 官方来源`);
    }
    if (solution.verificationLevel === "Official" && Array.isArray(solution.sourceIds)) {
      const nonOfficialSourceIds = solution.sourceIds.filter(
        (sourceId) => sourceInfo.sourceIds.has(sourceId) && !sourceInfo.officialSourceIds.has(sourceId)
      );
      if (nonOfficialSourceIds.length) {
        report(
          errors,
          filePath,
          `${label} 标为 Official，但引用了非官方来源：${nonOfficialSourceIds.join(", ")}`
        );
      }
    }
    if (solution.verificationLevel === "Experimental" && (!Array.isArray(solution.warnings) || solution.warnings.length === 0)) {
      report(errors, filePath, `${label} 为 Experimental，必须包含风险提示`);
    }
  }

  if ((data.status === "reviewed" || data.status === "canonical") && actionableSolutionCount === 0) {
    report(errors, filePath, `${data.status} 文章必须至少包含一个有操作步骤的结构化方案`);
  }
}

function validateV2(filePath, data) {
  validateRequiredFields(filePath, data, v2RequiredFields);
  const unknownFields = Object.keys(data).filter((field) => !v2AllowedFields.has(field));
  if (unknownFields.length) report(warnings, filePath, `存在 v2 Schema 未定义字段：${unknownFields.join(", ")}`);
  if (data.schemaVersion !== 2) report(errors, filePath, `schemaVersion 必须为数字 2：${String(data.schemaVersion)}`);

  const common = validateCommonMetadata(filePath, data, { v2: true });

  if (!idPattern.test(String(data.id ?? ""))) report(errors, filePath, `id 格式无效：${String(data.id ?? "")}`);
  for (const field of [
    "symptoms",
    "platforms",
    "systemVersions",
    "keywords",
    "errorMessages",
    "officialTerms",
    "communityTerms",
    "warnings",
    "limitations",
    "relatedArticles"
  ]) {
    if (!isStringArray(data[field])) report(errors, filePath, `${field} 必须是无重复的字符串数组`);
  }
  if (typeof data.summary !== "string" || !data.summary.trim()) report(errors, filePath, "summary 必须是非空字符串");
  if (data.estimatedTime !== null && (typeof data.estimatedTime !== "string" || !data.estimatedTime.trim())) {
    report(errors, filePath, "estimatedTime 必须是非空字符串或 null");
  }
  if (data.canonicalArticleId !== null && !idPattern.test(String(data.canonicalArticleId ?? ""))) {
    report(errors, filePath, "canonicalArticleId 必须是合法文章 ID 或 null");
  }
  if (data.createdAt !== null && !isIsoDate(data.createdAt)) report(errors, filePath, "createdAt 必须是 ISO 日期或 null");
  if (data.lastVerifiedAt !== null && !isIsoDate(data.lastVerifiedAt)) {
    report(errors, filePath, "lastVerifiedAt 必须是 ISO 日期或 null");
  }

  const sourceInfo = validateV2Sources(filePath, data.sources);
  validateV2Solutions(filePath, data, sourceInfo);

  const recommendedSolution = Array.isArray(data.solutions)
    ? data.solutions.find((solution) => isRecord(solution) && solution.kind === "recommended")
    : undefined;
  const hasOfficialRecommendedSolution =
    isRecord(recommendedSolution) && recommendedSolution.verificationLevel === "Official";
  if (common.verification === "Official" && !hasOfficialRecommendedSolution) {
    report(
      errors,
      filePath,
      "Official 文章必须包含一个 kind=recommended 且 verificationLevel=Official 的主方案"
    );
  }

  if (common.verification === "Official" && sourceInfo.officialSourceIds.size === 0) {
    report(
      errors,
      filePath,
      `Official 文章必须至少有一个显式标记且属于允许 host（${officialAppleContentHostList}）的 Apple 官方来源`
    );
  }
  if (common.verification === "Experimental" && (!Array.isArray(data.warnings) || data.warnings.length === 0)) {
    report(errors, filePath, "Experimental 文章必须包含 warnings 风险提示");
  }
  if (data.status === "reviewed" || data.status === "canonical") {
    if (!isIsoDate(data.lastVerifiedAt)) report(errors, filePath, `${data.status} 文章必须记录 lastVerifiedAt`);
    if (!Array.isArray(data.sources) || data.sources.length === 0) report(errors, filePath, `${data.status} 文章必须至少有一个来源`);
    if (!Array.isArray(data.symptoms) || data.symptoms.length === 0) report(errors, filePath, `${data.status} 文章必须至少有一个症状词`);
  }

  return { verification: common.verification, communitySourceCount: sourceInfo.communitySourceCount };
}

const files = walkMarkdownFiles(root);
const articles = files.map((filePath) => {
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  return { filePath, data: parsed.data, content: parsed.content };
});
const slugOwners = new Map();
const titleOwners = new Map();
const articleIdOwners = new Map();
const allArticleIds = new Set(
  articles.map(({ data }) => String(data.id ?? data.slug ?? "").trim()).filter(Boolean)
);
const allRecipeRoutes = new Set(
  articles.map(({ filePath }) => {
    const relative = path.relative(root, filePath).replace(/\.mdx?$/, "");
    return `/recipes/${relative.split(path.sep).map(encodeURIComponent).join("/")}`;
  })
);
let v1OfficialWithCommunity = 0;

for (const { filePath, data, content } of articles) {
  const declaredVersion = data.schemaVersion;
  const v2 = Number(declaredVersion) === 2;
  if (declaredVersion !== undefined && ![1, 2].includes(Number(declaredVersion))) {
    report(errors, filePath, `不支持的 schemaVersion：${String(declaredVersion)}`);
  }

  const validation = v2 ? validateV2(filePath, data) : validateV1(filePath, data);
  if (!v2 && validation.verification === "Official" && validation.communitySourceCount > 0) {
    v1OfficialWithCommunity += 1;
    if (!/^##\s+.*(?:非官方|社区).*$/m.test(content)) {
      report(warnings, filePath, "包含社区来源，但正文缺少明确的“非官方”或“社区”章节标题");
    }
  }

  const articleId = String(data.id ?? data.slug ?? "").trim();
  if (articleId) {
    const idList = articleIdOwners.get(articleId) ?? [];
    idList.push(filePath);
    articleIdOwners.set(articleId, idList);
  }
  if (v2) {
    if (data.canonicalArticleId && !allArticleIds.has(data.canonicalArticleId)) {
      report(errors, filePath, `canonicalArticleId 指向不存在的文章：${data.canonicalArticleId}`);
    }
    if (Array.isArray(data.relatedArticles)) {
      for (const relatedId of data.relatedArticles) {
        if (!allArticleIds.has(relatedId)) report(errors, filePath, `relatedArticles 指向不存在的文章：${relatedId}`);
      }
    }
  }

  for (const section of requiredSections) {
    if (!new RegExp(`^##\\s+${section}\\s*$`, "m").test(content)) {
      report(errors, filePath, `缺少正文章节「${section}」`);
    }
  }

  const officialSolution = sectionBody(content, "Apple 官方方案");
  if (!/^\d+\.\s+/m.test(officialSolution)) {
    report(errors, filePath, "Apple 官方方案必须包含可执行的编号步骤");
  }

  if (validation.verification === "Experimental" && !content.includes("风险")) {
    report(errors, filePath, "Experimental 内容必须在正文包含风险提示");
  }

  if ((data.status === "seed" || data.status === "draft") && data.popular) {
    report(warnings, filePath, `${data.status} 内容不应进入热门推荐`);
  }

  for (const match of content.matchAll(/\]\((\/recipes\/[^)]+)\)/g)) {
    if (!allRecipeRoutes.has(match[1])) report(errors, filePath, `内部文章链接不存在：${match[1]}`);
  }

  const slugList = slugOwners.get(data.slug) ?? [];
  slugList.push(filePath);
  slugOwners.set(data.slug, slugList);
  const titleList = titleOwners.get(data.title) ?? [];
  titleList.push(filePath);
  titleOwners.set(data.title, titleList);
}

for (const [slug, owners] of slugOwners) {
  if (owners.length > 1) errors.push(`重复 slug ${slug}: ${owners.map(displayPath).join(", ")}`);
}

for (const [title, owners] of titleOwners) {
  if (owners.length > 1) warnings.push(`重复标题 ${title}: ${owners.map(displayPath).join(", ")}`);
}

for (const [articleId, owners] of articleIdOwners) {
  if (owners.length > 1) errors.push(`重复文章 ID ${articleId}: ${owners.map(displayPath).join(", ")}`);
}

const indexableArticles = articles.filter(({ data }) => data.status === "reviewed" || data.status === "canonical");
const popularCount = indexableArticles.filter(({ data }) => data.popular).length;
if (indexableArticles.length && popularCount / indexableArticles.length > 0.8) {
  warnings.push(
    `热门标记覆盖 ${popularCount}/${indexableArticles.length} 篇 reviewed/canonical 文章，popular 已失去精选作用`
  );
}

if (v1OfficialWithCommunity) {
  warnings.push(
    `${v1OfficialWithCommunity} 篇 v1 Official 文章同时包含社区来源，尚无 solution-level sourceIds；需逐篇迁移并核对可信边界`
  );
}

const v2Count = articles.filter(({ data }) => Number(data.schemaVersion) === 2).length;
console.log(
  `Content validation: ${articles.length} articles (${articles.length - v2Count} v1, ${v2Count} v2), ${errors.length} errors, ${warnings.length} warnings.`
);
for (const warning of warnings) console.warn(`WARN  ${warning}`);
for (const error of errors) console.error(`ERROR ${error}`);

if (errors.length) process.exitCode = 1;
