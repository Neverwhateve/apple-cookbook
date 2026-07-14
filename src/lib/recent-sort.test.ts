import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { compareRecentArticles, recentArticleSortValue } from "./recent-sort.ts";

describe("recent article ordering", () => {
  it("uses file change timestamps before frontmatter dates", () => {
    const olderSameDay = {
      title: "AirPods older same-day article",
      updated: "2026-07-14",
      recentSortTimestamp: Date.parse("2026-07-14T08:00:00.000Z")
    };
    const newerSameDay = {
      title: "Mac newer same-day article",
      updated: "2026-07-14",
      recentSortTimestamp: Date.parse("2026-07-14T12:00:00.000Z")
    };

    assert.deepEqual([olderSameDay, newerSameDay].sort(compareRecentArticles), [newerSameDay, olderSameDay]);
  });

  it("falls back to frontmatter date and title when no timestamp is available", () => {
    const left = { title: "A title", updated: "2026-07-14" };
    const right = { title: "B title", updated: "2026-07-14" };
    const previousDay = { title: "Newest title", updated: "2026-07-13" };

    assert.equal(recentArticleSortValue(left), Date.parse("2026-07-14T00:00:00.000Z"));
    assert.deepEqual([right, previousDay, left].sort(compareRecentArticles), [left, right, previousDay]);
  });
});
