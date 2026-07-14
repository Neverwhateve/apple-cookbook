export const requiredArticleSections = [
  "症状",
  "可能原因",
  "Apple 官方方案",
  "零售排查流程",
  "升级处理",
  "相关问题"
] as const;

const requiredSectionSet = new Set<string>(requiredArticleSections);

export type EditableArticleSection = {
  index: number;
  title: string;
  start: number;
  end: number;
  required: boolean;
};

export function getEditableArticleSections(body: string): EditableArticleSection[] {
  const headings = Array.from(body.matchAll(/^##[ \t]+(.+?)[ \t]*$/gm));

  return headings.map((heading, index) => ({
    index,
    title: heading[1].trim(),
    start: heading.index ?? 0,
    end: headings[index + 1]?.index ?? body.length,
    required: requiredSectionSet.has(heading[1].trim())
  }));
}

function sectionBody(body: string, section: EditableArticleSection) {
  const headingEnd = body.indexOf("\n", section.start);
  return body.slice(headingEnd < 0 ? section.end : headingEnd + 1, section.end).trim();
}

/**
 * Guards the renderer's structural contract before an administrator can
 * submit content. The full repository validator still runs in CI before the
 * edit is published.
 */
export function validateEditableArticleBody(body: string) {
  const normalized = body.replace(/\r\n/g, "\n").trim();

  if (normalized.length < 20) {
    return "正文过短，未提交修改。";
  }

  if (normalized.length > 200_000) {
    return "正文超过 200,000 字符，未提交修改。";
  }

  const sections = getEditableArticleSections(normalized);
  const titleCounts = new Map<string, number>();

  for (const section of sections) {
    titleCounts.set(section.title, (titleCounts.get(section.title) ?? 0) + 1);
  }

  const duplicate = [...titleCounts.entries()].find(([, count]) => count > 1)?.[0];
  if (duplicate) {
    return `存在重复的二级板块「${duplicate}」，请合并后再提交。`;
  }

  const requiredPositions = requiredArticleSections.map((title) =>
    sections.findIndex((section) => section.title === title)
  );
  const missingIndex = requiredPositions.findIndex((position) => position < 0);

  if (missingIndex >= 0) {
    return `核心板块「${requiredArticleSections[missingIndex]}」不能删除。`;
  }

  if (requiredPositions.some((position, index) => index > 0 && position <= requiredPositions[index - 1])) {
    return "核心板块顺序已改变；请按症状、可能原因、Apple 官方方案、零售排查流程、升级处理、相关问题排列。";
  }

  const officialSection = sections.find((section) => section.title === "Apple 官方方案");
  if (!officialSection || !/^\d+\.\s+/m.test(sectionBody(normalized, officialSection))) {
    return "Apple 官方方案必须保留至少一个可执行的编号步骤。";
  }

  return null;
}

export function removeEditableArticleSection(body: string, index: number) {
  const sections = getEditableArticleSections(body);
  const section = sections[index];

  if (!section) throw new Error("找不到要删除的板块，请刷新后重试。");
  if (section.required) throw new Error(`核心板块「${section.title}」不能删除。`);

  const before = body.slice(0, section.start).trimEnd();
  const after = body.slice(section.end).trimStart();

  return `${before}${before && after ? "\n\n" : ""}${after}`.trim();
}

/** Mirrors the reader route so an administrator previews exactly what is public. */
export function formatPublicArticleBody(body: string) {
  const firstSectionIndex = body.search(/^##\s+症状\s*$/m);
  const content = firstSectionIndex >= 0 ? body.slice(firstSectionIndex) : body;
  const endMatterIndex = content.search(/^##\s+(相关问题|标签|元信息)\s*$/m);
  const articleContent = endMatterIndex >= 0 ? content.slice(0, endMatterIndex).trim() : content;

  return articleContent
    .replace(/^##\s+零售排查流程\s*$/m, "## 排查流程")
    .replace(/^##\s+升级处理\s*$/m, "## 如果仍未解决");
}
