#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const projectRoot = process.cwd();
const cookbookRoot = path.join(projectRoot, "cookbook");

const featuredArticleIds = new Set([
  "airpods-wont-charge-case-not-working",
  "locked-notes-forgot-password",
  "iphone-ipad-wifi-no-internet-unable-to-join",
  "iphone-sos-no-service-searching",
  "iphone-unavailable-security-lockout-forgot-passcode",
  "iphone-wont-charge-wired-liquid-detected"
]);
const legacyOfficialArticleIds = new Set([
  "airpods-find-my-setup-incomplete",
  "airpods-firmware-wont-update",
  "airpods-wont-charge-case-not-working",
  "airpods-wont-connect-pair-reset",
  "apple-account-verification-failed",
  "apple-watch-wont-connect-pair-iphone",
  "airdrop-keeps-waiting",
  "ask-to-buy-requests-not-showing",
  "icloud-storage-full-iphone-backup-fails",
  "iphone-battery-drains-after-update",
  "iphone-black-screen-wont-turn-on-after-battery-drained",
  "iphone-charging-paused-80-temperature-charge-limit",
  "iphone-esim-setup-transfer-fails",
  "iphone-imessage-messages-not-sending-green-waiting-activation",
  "iphone-invalid-sim-no-sim",
  "iphone-personal-hotspot-not-working-greyed-out",
  "iphone-sos-no-service-searching",
  "iphone-stolen-device-protection-security-delay",
  "iphone-stuck-preparing-verifying-software-update",
  "iphone-unavailable-security-lockout-forgot-passcode",
  "iphone-wechat-camera-black-screen-lag",
  "iphone-wont-charge-wired-liquid-detected",
  "apple-pay-declined-terminal-not-working",
  "apple-wallet-cant-add-card-apple-pay",
  "location-sharing-not-working",
  "screen-time-child-usage-not-showing",
  "screen-time-limits-not-blocking",
  "screen-time-requests-not-working",
  "homekit-matter-accessories-no-response",
  "homepod-not-responding-network-problem",
  "mac-dfu-firmware-revive-restore",
  "mac-forgot-login-password-reset"
]);

function parseArguments(argv) {
  const options = { json: false, file: undefined, help: false, applyV1Official: false, repairV1OfficialSteps: false };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];

    if (argument === "--") {
      // npm and pnpm users commonly include a separator before script
      // arguments. Treat it as syntax, not as an application option.
      continue;
    } else if (argument === "--json") {
      options.json = true;
    } else if (argument === "--apply-v1-official") {
      options.applyV1Official = true;
    } else if (argument === "--repair-v1-official-steps") {
      options.repairV1OfficialSteps = true;
    } else if (argument === "--help" || argument === "-h") {
      options.help = true;
    } else if (argument === "--file") {
      options.file = argv[index + 1];
      index += 1;
      if (!options.file) throw new Error("--file 需要一个 Markdown 文件路径");
    } else if (argument.startsWith("--file=")) {
      options.file = argument.slice("--file=".length);
      if (!options.file) throw new Error("--file 需要一个 Markdown 文件路径");
    } else {
      throw new Error(`未知参数：${argument}`);
    }
  }

  return options;
}

function printHelp() {
  console.log(`Apple Cookbook v1 → v2 迁移预览

用法：
  node scripts/preview-content-migration.mjs
  node scripts/preview-content-migration.mjs --json
  node scripts/preview-content-migration.mjs --file cookbook/iPhone/example.md --json
  node scripts/preview-content-migration.mjs --apply-v1-official
  node scripts/preview-content-migration.mjs --repair-v1-official-steps

参数：
  --file <path>  只预览一个 cookbook Markdown 文件
  --json         输出完整、可机器读取的候选数据
  --apply-v1-official
                  仅迁移 v1 Official 文章；保留正文、路由和全部原 URL，
                  将主方案只关联到 Apple 官方来源，并重置首页精选为 6 篇
  --repair-v1-official-steps
                  仅重建受控迁移文章的官方步骤列表；不会改动正文或来源
  --help, -h     显示帮助

未带 --apply-v1-official 时，脚本只读取文章并输出到 stdout，不会创建或修改文件。`);
}

function walkMarkdownFiles(directory) {
  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walkMarkdownFiles(absolutePath);
    return entry.isFile() && /\.mdx?$/.test(entry.name) ? [absolutePath] : [];
  });
}

function resolveRequestedFile(value) {
  const absolutePath = path.resolve(projectRoot, value);
  const relativeToCookbook = path.relative(cookbookRoot, absolutePath);

  if (relativeToCookbook.startsWith("..") || path.isAbsolute(relativeToCookbook)) {
    throw new Error("--file 必须位于 cookbook/ 目录内");
  }
  if (!/\.mdx?$/.test(absolutePath) || !fs.statSync(absolutePath, { throwIfNoEntry: false })?.isFile()) {
    throw new Error(`找不到 Markdown 文件：${value}`);
  }

  return absolutePath;
}

function stringValue(value, fallback = "") {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) return value.toISOString().slice(0, 10);
  const normalized = String(value ?? "").trim();
  return normalized || fallback;
}

function stringArray(value) {
  if (value === undefined || value === null || value === "") return [];
  const values = Array.isArray(value) ? value : [value];
  return Array.from(new Set(values.map((item) => stringValue(item)).filter(Boolean)));
}

function normalizeDifficulty(value) {
  const candidate = stringValue(value, "Moderate");
  if (candidate === "Easy") return "Quick";
  return ["Quick", "Moderate", "Advanced"].includes(candidate) ? candidate : "Moderate";
}

function normalizeVerification(value) {
  const candidate = stringValue(value, "Unknown");
  return ["Official", "Verified", "Likely", "Experimental", "Unknown"].includes(candidate)
    ? candidate
    : "Unknown";
}

function normalizeStatus(value) {
  const candidate = stringValue(value, "draft");
  return ["seed", "draft", "reviewed", "canonical"].includes(candidate) ? candidate : "draft";
}

function articleRoute(filePath) {
  const relative = path.relative(cookbookRoot, filePath).replace(/\.mdx?$/, "");
  return `/recipes/${relative.split(path.sep).map(encodeURIComponent).join("/")}`;
}

function contentHash(raw) {
  return crypto.createHash("sha256").update(raw).digest("hex");
}

function stableId(prefix, value) {
  return `${prefix}-${crypto.createHash("sha256").update(value).digest("hex").slice(0, 12)}`;
}

function cleanMarkdown(value) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function sectionBody(content, headingPattern) {
  const headings = Array.from(content.matchAll(/^##\s+(.+)$/gm));
  const index = headings.findIndex((heading) => headingPattern.test(heading[1].trim()));
  if (index < 0) return "";

  const start = (headings[index].index ?? 0) + headings[index][0].length;
  const end = headings[index + 1]?.index ?? content.length;
  return content.slice(start, end).trim();
}

function firstSummaryParagraph(content) {
  const withoutTitle = content.replace(/^#\s+.+$/m, "");
  const paragraphs = withoutTitle
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/^---$/gm, "").trim())
    .filter((paragraph) => paragraph && !/^#{1,6}\s+/m.test(paragraph))
    .map(cleanMarkdown)
    .filter(Boolean);

  return paragraphs[0]?.slice(0, 500) ?? "";
}

function symptomLines(content) {
  return Array.from(sectionBody(content, /^(症状|Symptoms)$/i).matchAll(/^\s*[-*]\s+(.+)$/gm), (match) =>
    cleanMarkdown(match[1])
  ).filter(Boolean);
}

function officialSteps(content) {
  return Array.from(
    sectionBody(content, /^(Apple 官方方案|Official Apple Solution)$/i).matchAll(/^[\t ]*\d+\.\s+(.+)$/gm),
    (match) => cleanMarkdown(match[1])
  ).filter(Boolean);
}

function markdownLinkTitles(content) {
  const titles = new Map();

  for (const match of content.matchAll(/\[([^\]]+)\]\((https:\/\/[^)]+)\)/g)) {
    if (!titles.has(match[2])) titles.set(match[2], cleanMarkdown(match[1]));
  }

  return titles;
}

function publisherForUrl(url) {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    if (hostname === "support.apple.com") return "Apple";
    if (hostname === "discussions.apple.com") return "Apple Support Community";
    if (hostname === "reddit.com") return "Reddit";
    return hostname;
  } catch {
    return "未知来源";
  }
}

function sourceTypeForUrl(url, official) {
  if (official) return "official-support";
  try {
    new URL(url);
    return "community";
  } catch {
    return "other";
  }
}

function previewSource(url, official, linkTitles, issues) {
  const publisher = publisherForUrl(url);
  const title = linkTitles.get(url);
  const id = stableId(official ? "official" : "community", url);

  if (!title) {
    issues.push({
      code: "source_title_requires_review",
      message: `来源标题需要人工核对：${url}`
    });
  }

  return {
    id,
    title: title || `${publisher} 旧版引文（原始标题未记录）`,
    url,
    publisher,
    sourceType: sourceTypeForUrl(url, official),
    accessedAt: null,
    publishedAt: null,
    official
  };
}

function migrationFrontmatter(preview, originalData) {
  const proposed = preview.proposedFrontmatter;
  if (!proposed) throw new Error(`${preview.filePath} 已是 v2，不能作为 v1 迁移写入`);

  const officialSourceIds = proposed.sources.filter((source) => source.official).map((source) => source.id);
  if (!officialSourceIds.length) throw new Error(`${preview.filePath} 缺少可用于 Official 主方案的 Apple 来源`);
  if (!proposed.solutions.length) throw new Error(`${preview.filePath} 无法从“Apple 官方方案”提取编号步骤`);

  // The v1 date is an article review snapshot, not proof of an individual
  // source access. Preserve that distinction by keeping source accessedAt
  // unknown while retaining the established article review date.
  return {
    ...proposed,
    // Tags are taxonomy, not evidence of a user’s canonical search intent.
    // Leave editorial keywords empty until they are reviewed individually.
    keywords: [],
    canonicalArticleId: proposed.status === "canonical" ? proposed.id : null,
    solutions: proposed.solutions.map((solution) => ({
      ...solution,
      verificationLevel: "Official",
      sourceIds: officialSourceIds
    })),
    sources: proposed.sources.map((source) => ({ ...source, accessedAt: null, publishedAt: null })),
    lastVerifiedAt: stringValue(originalData.updated),
    lastUpdatedAt: stringValue(originalData.updated),
    popular: featuredArticleIds.has(proposed.id)
  };
}

function assertMigrationPreservesEvidence(article, migrated) {
  const originalOfficial = stringArray(article.data.official_sources);
  const originalCommunity = stringArray(article.data.community_sources);
  const migratedOfficial = migrated.sources.filter((source) => source.official).map((source) => source.url);
  const migratedCommunity = migrated.sources.filter((source) => !source.official).map((source) => source.url);

  if (JSON.stringify(originalOfficial) !== JSON.stringify(migratedOfficial)) {
    throw new Error(`${path.relative(projectRoot, article.filePath)} 的 Apple 官方 URL 未按原顺序保留`);
  }
  if (JSON.stringify(originalCommunity) !== JSON.stringify(migratedCommunity)) {
    throw new Error(`${path.relative(projectRoot, article.filePath)} 的社区 URL 未按原顺序保留`);
  }
}

function systemVersions(values) {
  return Array.from(
    new Set(
      Array.from(
        values.join("\n").matchAll(/\b(?:iOS|iPadOS|macOS|watchOS|visionOS|tvOS)\s*\d+(?:\.\d+)*/gi),
        (match) => match[0]
      )
    )
  );
}

function platforms(tags) {
  return Array.from(
    new Set(tags.filter((tag) => /^(?:iOS|iPadOS|macOS|watchOS|visionOS|tvOS|Windows)$/i.test(tag)))
  );
}

function errorMessages(values) {
  return Array.from(
    new Set(
      values.filter((value) =>
        /错误|代码|提示|不可用|未响应|暂停|无服务|sos|error|unable|unavailable|not responding|no service/i.test(
          value
        )
      )
    )
  );
}

function relatedArticleIds(content, routeToId) {
  const ids = [];

  for (const match of content.matchAll(/\]\((\/recipes\/[^)]+)\)/g)) {
    const id = routeToId.get(match[1]);
    if (id && !ids.includes(id)) ids.push(id);
  }

  return ids;
}

function buildPreview(article, routeToId) {
  const { filePath, raw, data, content } = article;
  const relativePath = path.relative(projectRoot, filePath);
  const sourceVersion = Number(data.schemaVersion) === 2 ? 2 : 1;

  if (sourceVersion === 2) {
    return {
      filePath: relativePath,
      route: articleRoute(filePath),
      contentHash: contentHash(raw),
      sourceVersion,
      alreadyV2: true,
      proposedFrontmatter: null,
      reviewIssues: []
    };
  }

  const issues = [];
  const slug = stringValue(data.slug, path.basename(filePath, path.extname(filePath)));
  const id = stringValue(data.id, slug);
  const category = stringValue(data.category, path.basename(path.dirname(filePath)));
  const tags = stringArray(data.tags);
  const aliases = stringArray(data.aliases);
  const symptoms = symptomLines(content);
  const summary = firstSummaryParagraph(content);
  const steps = officialSteps(content);
  const linkTitles = markdownLinkTitles(content);
  const officialSources = stringArray(data.official_sources).map((url) =>
    previewSource(url, true, linkTitles, issues)
  );
  const communitySources = stringArray(data.community_sources).map((url) =>
    previewSource(url, false, linkTitles, issues)
  );
  const sources = [...officialSources, ...communitySources];
  const verificationLevel = normalizeVerification(data.verification);

  issues.push(
    {
      code: "source_access_dates_require_review",
      message: `${sources.length} 条来源的 accessedAt 不能从 v1 updated 推断`
    },
    {
      code: "verification_date_requires_review",
      message: "lastVerifiedAt 需要根据实际复核记录填写"
    },
    {
      code: "creation_date_requires_review",
      message: "createdAt 在 v1 中没有可靠记录"
    },
    {
      code: "search_terms_require_review",
      message: "keywords、officialTerms 和 communityTerms 需要编辑审阅"
    },
    {
      code: "scope_requires_review",
      message: "estimatedTime、warnings 和 limitations 需要编辑审阅"
    }
  );

  if (!summary) {
    issues.push({ code: "summary_missing", message: "无法从正文提取一句话摘要" });
  }
  if (!symptoms.length) {
    issues.push({ code: "symptoms_missing", message: "无法从正文症状章节提取症状" });
  }
  if (!steps.length) {
    issues.push({ code: "solution_steps_missing", message: "无法从官方方案章节提取编号步骤" });
  }
  if (communitySources.length) {
    issues.push({
      code: "community_solutions_require_structuring",
      message: "社区来源对应的替代方案和方案级验证等级必须人工拆分"
    });
  }

  const solutionId = stableId("solution", `${id}:recommended`);
  const proposedFrontmatter = {
    schemaVersion: 2,
    id,
    title: stringValue(data.title, path.basename(filePath, path.extname(filePath))),
    slug,
    summary,
    symptoms,
    devices: stringArray(data.device),
    platforms: platforms(tags),
    systemVersions: systemVersions([content, ...tags, ...aliases]),
    categories: [category],
    tags,
    keywords: tags,
    aliases,
    errorMessages: errorMessages([...symptoms, ...aliases]),
    officialTerms: [],
    communityTerms: [],
    difficulty: normalizeDifficulty(data.difficulty),
    estimatedTime: null,
    verificationLevel,
    status: normalizeStatus(data.status),
    canonicalArticleId: null,
    solutions: steps.length
      ? [
          {
            id: solutionId,
            title: "Apple 官方方案",
            summary: null,
            kind: "recommended",
            steps,
            verificationLevel,
            sourceIds: officialSources.map((source) => source.id),
            warnings: [],
            limitations: []
          }
        ]
      : [],
    warnings: [],
    limitations: [],
    sources,
    lastVerifiedAt: null,
    lastUpdatedAt: stringValue(data.updated),
    createdAt: null,
    relatedArticles: relatedArticleIds(content, routeToId),
    popular: data.popular === true
  };

  return {
    filePath: relativePath,
    route: articleRoute(filePath),
    contentHash: contentHash(raw),
    sourceVersion,
    alreadyV2: false,
    proposedFrontmatter,
    reviewIssues: issues
  };
}

function loadArticle(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  return { filePath, raw, data: parsed.data, content: parsed.content };
}

function applyV1OfficialMigrations(articles, routeToId) {
  const applied = [];

  for (const article of articles) {
    const preview = buildPreview(article, routeToId);
    if (preview.sourceVersion !== 1 || preview.proposedFrontmatter?.verificationLevel !== "Official") continue;

    const migrated = migrationFrontmatter(preview, article.data);
    assertMigrationPreservesEvidence(article, migrated);
    const nextRaw = matter.stringify(article.content, migrated);
    const nextParsed = matter(nextRaw);
    if (nextParsed.content !== article.content) {
      throw new Error(`${path.relative(projectRoot, article.filePath)} 的正文在迁移中发生变化；已中止`);
    }

    fs.writeFileSync(article.filePath, nextRaw, "utf8");
    applied.push(path.relative(projectRoot, article.filePath));
  }

  return applied;
}

function repairV1OfficialSteps(articles) {
  const repaired = [];

  for (const article of articles) {
    const id = stringValue(article.data.id, article.data.slug);
    if (Number(article.data.schemaVersion) !== 2 || !legacyOfficialArticleIds.has(id)) continue;

    const steps = officialSteps(article.content);
    if (!steps.length) throw new Error(`${path.relative(projectRoot, article.filePath)} 无法提取官方编号步骤`);
    const solutions = Array.isArray(article.data.solutions) ? article.data.solutions : [];
    const recommendedIndex = solutions.findIndex((solution) => solution?.kind === "recommended");
    if (recommendedIndex < 0) throw new Error(`${path.relative(projectRoot, article.filePath)} 缺少推荐方案`);

    const nextData = {
      ...article.data,
      keywords: [],
      solutions: solutions.map((solution, index) => (index === recommendedIndex ? { ...solution, steps } : solution))
    };
    const nextRaw = matter.stringify(article.content, nextData);
    if (matter(nextRaw).content !== article.content) {
      throw new Error(`${path.relative(projectRoot, article.filePath)} 的正文在步骤修复中发生变化；已中止`);
    }

    fs.writeFileSync(article.filePath, nextRaw, "utf8");
    repaired.push(path.relative(projectRoot, article.filePath));
  }

  return repaired;
}

function printText(result) {
  console.log("Article Schema v2 migration preview (read-only)");
  console.log(`Articles: ${result.summary.total}; v1: ${result.summary.v1}; already v2: ${result.summary.v2}`);
  console.log(`Review issues: ${result.summary.reviewIssues}`);

  for (const article of result.articles) {
    if (article.alreadyV2) {
      console.log(`OK     ${article.filePath} (already v2)`);
    } else {
      console.log(`REVIEW ${article.filePath} (${article.reviewIssues.length} items)`);
    }
  }

  console.log("No files were changed. Use --json to inspect proposed metadata and review items.");
}

let options;

try {
  options = parseArguments(process.argv.slice(2));
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 2;
}

if (options?.help) {
  printHelp();
} else if (options) {
  try {
    const allFiles = walkMarkdownFiles(cookbookRoot).sort((left, right) => left.localeCompare(right));
    const allArticles = allFiles.map(loadArticle);
    const routeToId = new Map(
      allArticles.map((article) => [
        articleRoute(article.filePath),
        stringValue(article.data.id, stringValue(article.data.slug, path.basename(article.filePath, path.extname(article.filePath))))
      ])
    );
    const selectedFiles = options.file ? [resolveRequestedFile(options.file)] : allFiles;
    const selectedArticles = selectedFiles.map((filePath) =>
      allArticles.find((article) => article.filePath === filePath) ?? loadArticle(filePath)
    );
    if (options.applyV1Official) {
      const applied = applyV1OfficialMigrations(selectedArticles, routeToId);
      console.log(`Migrated ${applied.length} v1 Official articles to v2.`);
      for (const filePath of applied) console.log(`MIGRATED ${filePath}`);
    } else if (options.repairV1OfficialSteps) {
      const repaired = repairV1OfficialSteps(selectedArticles);
      console.log(`Rebuilt official steps for ${repaired.length} migrated articles.`);
      for (const filePath of repaired) console.log(`REPAIRED ${filePath}`);
    } else {
      const articles = selectedArticles.map((article) => buildPreview(article, routeToId));
      const result = {
        readOnly: true,
        schema: "schemas/article-v2.schema.json",
        summary: {
          total: articles.length,
          v1: articles.filter((article) => article.sourceVersion === 1).length,
          v2: articles.filter((article) => article.sourceVersion === 2).length,
          reviewIssues: articles.reduce((total, article) => total + article.reviewIssues.length, 0)
        },
        articles
      };

      if (options.json) {
        console.log(JSON.stringify(result, null, 2));
      } else {
        printText(result);
      }
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 2;
  }
}
