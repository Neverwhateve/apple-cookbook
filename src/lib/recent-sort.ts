export type RecentSortableArticle = {
  readonly title: string;
  readonly updated: string;
  readonly recentSortTimestamp?: number;
};

export function dateSortTimestamp(value: string) {
  const timestamp = Date.parse(`${value}T00:00:00.000Z`);
  return Number.isFinite(timestamp) ? timestamp : 0;
}

export function recentArticleSortValue(article: Pick<RecentSortableArticle, "updated" | "recentSortTimestamp">) {
  return article.recentSortTimestamp ?? dateSortTimestamp(article.updated);
}

export function compareRecentArticles(left: RecentSortableArticle, right: RecentSortableArticle) {
  return (
    recentArticleSortValue(right) - recentArticleSortValue(left) ||
    right.updated.localeCompare(left.updated) ||
    left.title.localeCompare(right.title)
  );
}
