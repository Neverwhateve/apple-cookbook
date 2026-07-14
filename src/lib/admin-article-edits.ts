import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { atomicWriteText, withFileLock } from "./file-store.ts";
import { validateEditableArticleBody } from "./article-content.ts";
import type { Article } from "./cookbook.ts";

export type AdminArticleEditProposal = {
  schemaVersion: 1;
  proposalId: string;
  createdAt: string;
  articlePath: string;
  baseContentHash: string;
  proposedContentHash: string;
  proposedContent: string;
  reason?: string;
};

const maxReasonLength = 1_000;

export function hashArticleContent(content: string | Buffer) {
  return `sha256:${crypto.createHash("sha256").update(content).digest("hex")}`;
}

function shanghaiDate(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(now);
}

function buildProposalId(now = new Date()) {
  const date = shanghaiDate(now).replaceAll("-", "");
  return `AE-${date}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

function getEditStoreRoot(dataRoot: string) {
  return path.join(dataRoot, "article-edits");
}

function getPendingRoot(dataRoot: string) {
  return path.join(getEditStoreRoot(dataRoot), "pending");
}

function normalizeBody(body: string) {
  return body.replace(/\r\n/g, "\n").trim();
}

function replaceUpdatedDate(frontmatter: string, schemaVersion: number, date: string) {
  const field = schemaVersion === 2 ? "lastUpdatedAt" : "updated";
  const expression = new RegExp(`^${field}:[^\\n\\r]*$`, "m");

  if (!expression.test(frontmatter)) {
    throw new Error(`文章元数据缺少 ${field}，无法安全提交。`);
  }

  return frontmatter.replace(expression, `${field}: ${date}`);
}

function replaceYamlString(frontmatter: string, field: string, value: string) {
  const expression = new RegExp(`^${field}:[^\\n\\r]*$`, "m");
  if (!expression.test(frontmatter)) throw new Error(`文章元数据缺少 ${field}，无法安全提交。`);

  return frontmatter.replace(expression, `${field}: ${JSON.stringify(value)}`);
}

function normalizeSingleLine(value: string, field: string, maximum: number) {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length < 2) throw new Error(`${field}至少需要 2 个字符。`);
  if (normalized.length > maximum) throw new Error(`${field}不能超过 ${maximum} 个字符。`);
  return normalized;
}

export function buildProposedArticleContent(
  raw: string,
  { body, title, summary, now = new Date() }: { body: string; title: string; summary?: string; now?: Date }
) {
  const frontmatterMatch = raw.match(/^(---\r?\n[\s\S]*?\r?\n---\r?\n)/);
  if (!frontmatterMatch) throw new Error("文章缺少可识别的 YAML frontmatter。");

  const parsed = matter(raw);
  const normalizedTitle = normalizeSingleLine(title, "标题", 160);
  const schemaVersion = Number(parsed.data.schemaVersion) === 2 ? 2 : 1;
  const normalizedSummary = schemaVersion === 2 ? normalizeSingleLine(summary ?? "", "摘要", 500) : undefined;
  const normalizedBody = normalizeBody(body).replace(/^# .+$/m, `# ${normalizedTitle}`);
  const bodyError = validateEditableArticleBody(normalizedBody);
  if (bodyError) throw new Error(bodyError);

  let frontmatter = replaceUpdatedDate(
    frontmatterMatch[1].replace(/\r\n/g, "\n"),
    schemaVersion,
    shanghaiDate(now)
  );
  frontmatter = replaceYamlString(frontmatter, "title", normalizedTitle);
  if (schemaVersion === 2 && normalizedSummary) {
    frontmatter = replaceYamlString(frontmatter, "summary", normalizedSummary);
  }

  return `${frontmatter}\n${normalizedBody}\n`;
}

async function resolveArticleFile(article: Pick<Article, "filePath">, contentRoot: string) {
  const cookbookRoot = await fs.realpath(path.join(contentRoot, "cookbook"));
  const candidate = path.resolve(cookbookRoot, article.filePath);
  const relative = path.relative(cookbookRoot, candidate);

  if (!relative || relative.startsWith("..") || path.isAbsolute(relative) || !/\.mdx?$/.test(relative)) {
    throw new Error("文章路径不在 cookbook 目录内。");
  }

  const stats = await fs.lstat(candidate);
  if (!stats.isFile() || stats.isSymbolicLink()) {
    throw new Error("文章路径必须是普通 Markdown 文件。");
  }

  const realFilePath = await fs.realpath(candidate);
  if (!realFilePath.startsWith(`${cookbookRoot}${path.sep}`)) {
    throw new Error("文章路径解析后离开了 cookbook 目录。");
  }

  return { absolutePath: realFilePath, articlePath: `cookbook/${relative.split(path.sep).join("/")}` };
}

async function hasPendingEdit(articlePath: string, dataRoot: string) {
  try {
    const files = await fs.readdir(getPendingRoot(dataRoot));

    for (const file of files.filter((value) => value.endsWith(".json"))) {
      try {
        const proposal = JSON.parse(
          await fs.readFile(path.join(getPendingRoot(dataRoot), file), "utf8")
        ) as Partial<AdminArticleEditProposal>;
        if (proposal.articlePath === articlePath) return true;
      } catch {
        // A malformed proposal is left for the recovery workflow. It must not
        // make every unrelated article uneditable.
      }
    }

    return false;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return false;
    throw error;
  }
}

export async function createAdminArticleEditProposal({
  article,
  body,
  title,
  summary,
  expectedHash,
  reason,
  contentRoot = process.cwd(),
  dataRoot = process.env.APPLE_COOKBOOK_DATA_DIR ?? process.cwd(),
  now = new Date()
}: {
  article: Pick<Article, "filePath">;
  body: string;
  title: string;
  summary?: string;
  expectedHash: string;
  reason?: string;
  contentRoot?: string;
  dataRoot?: string;
  now?: Date;
}) {
  if (process.env.VERCEL && dataRoot === process.cwd()) {
    throw new Error("当前部署环境没有持久化文章编辑存储，修改未提交。");
  }

  const { absolutePath, articlePath } = await resolveArticleFile(article, contentRoot);
  const editStoreRoot = getEditStoreRoot(dataRoot);
  const lockPath = path.join(editStoreRoot, ".proposal.lock");

  return withFileLock(lockPath, async () => {
    const raw = await fs.readFile(absolutePath, "utf8");
    const currentHash = hashArticleContent(raw);

    if (!/^sha256:[0-9a-f]{64}$/.test(expectedHash) || expectedHash !== currentHash) {
      throw new Error("文章已在别处更新。请刷新页面后重新编辑，避免覆盖新内容。");
    }

    if (await hasPendingEdit(articlePath, dataRoot)) {
      throw new Error("这篇文章已有待发布的管理员修改，请等待发布完成后再继续编辑。");
    }

    const parsed = matter(raw);
    const normalizedTitle = title.replace(/\s+/g, " ").trim();
    const normalizedSummary = summary?.replace(/\s+/g, " ").trim();
    const visibleContentChanged =
      normalizeBody(body) !== parsed.content.trim().replace(/\r\n/g, "\n") ||
      normalizedTitle !== String(parsed.data.title ?? "").trim() ||
      (Number(parsed.data.schemaVersion) === 2 && normalizedSummary !== String(parsed.data.summary ?? "").trim());

    if (!visibleContentChanged) {
      throw new Error("正文没有变化，无需提交。请先修改文字或删除可选板块。");
    }

    const proposedContent = buildProposedArticleContent(raw, { body, title, summary, now });
    const proposalId = buildProposalId(now);
    const proposal: AdminArticleEditProposal = {
      schemaVersion: 1,
      proposalId,
      createdAt: now.toISOString(),
      articlePath,
      baseContentHash: currentHash,
      proposedContentHash: hashArticleContent(proposedContent),
      proposedContent,
      ...(reason?.trim() ? { reason: reason.trim().slice(0, maxReasonLength) } : {})
    };
    const pendingRoot = getPendingRoot(dataRoot);
    const proposalPath = path.join(pendingRoot, `${proposalId}.json`);

    await atomicWriteText(proposalPath, `${JSON.stringify(proposal)}\n`);

    return proposal;
  });
}

export async function readAdminArticleSource(article: Pick<Article, "filePath">, contentRoot = process.cwd()) {
  const { absolutePath } = await resolveArticleFile(article, contentRoot);
  const raw = await fs.readFile(absolutePath, "utf8");
  const parsed = matter(raw);

  return {
    raw,
    body: parsed.content.trim(),
    contentHash: hashArticleContent(raw)
  };
}
