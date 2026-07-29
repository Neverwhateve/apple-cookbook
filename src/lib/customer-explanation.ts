/**
 * Keeps customer-facing language grounded in reviewed article content. A
 * generic sentence is only used when the article itself has no usable brief.
 */
export function customerExplanationFor({
  solutionSummary,
  articleSummary,
  title
}: {
  solutionSummary?: string;
  articleSummary?: string;
  title: string;
}) {
  return solutionSummary?.trim() || articleSummary?.trim() || `我们先把“${title}”的范围缩小，再做最安全的检查。`;
}
