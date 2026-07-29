/** Removes authoring-only sections before Markdown is rendered to visitors. */
export function formatArticleBody(body: string) {
  const firstSectionIndex = body.search(/^##\s+症状\s*$/m);
  const content = firstSectionIndex >= 0 ? body.slice(firstSectionIndex) : body;
  const endMatterIndex = content.search(/^##\s+(相关问题|标签|元信息|metadata)\s*$/im);
  const articleContent = endMatterIndex >= 0 ? content.slice(0, endMatterIndex).trim() : content;

  return articleContent
    // Keep this distinct from the Apple-authored route. Retail guidance is
    // useful in the moment, but it is not itself an Apple recommendation.
    .replace(/^##\s+零售排查流程\s*$/m, "## 零售排查流程（同事实践）")
    .replace(/^##\s+升级处理\s*$/m, "## 如果仍未解决");
}
