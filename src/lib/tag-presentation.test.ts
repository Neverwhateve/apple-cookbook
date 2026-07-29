import assert from "node:assert/strict";
import test from "node:test";
import { getArticleTagTopics, getArticlesForTagTopic, getTagTopic, getTagTopics } from "./tag-presentation.ts";

test("tag topics merge synonymous internal tags into one browse entry", () => {
  const topics = getTagTopics([
    { tags: ["Battery", "iPhone"] },
    { tags: ["电池", "iPad"] },
    { tags: ["Charging", "Mac"] }
  ]);

  assert.deepEqual(topics.find((topic) => topic.slug === "电池与充电"), {
    slug: "电池与充电",
    label: "电池与充电",
    description: "续航、发热、无法充电与液体检测",
    count: 3
  });
});

test("tag topic pages include every matching synonym without duplicating articles", () => {
  const articles = [
    { id: "both", tags: ["Battery", "Charging"] },
    { id: "battery", tags: ["电池"] },
    { id: "network", tags: ["Wi-Fi"] }
  ];

  assert.deepEqual(
    getArticlesForTagTopic(articles, "电池与充电").map((article) => article.id),
    ["both", "battery"]
  );
  assert.equal(getTagTopic("不存在"), undefined);
});

test("article tag summaries only expose the compact browse topics", () => {
  assert.deepEqual(
    getArticleTagTopics(["iPhone", "Apple Account", "Passcode", "Face ID"]).map((topic) => topic.slug),
    ["Apple账户与安全", "隐私与设备功能"]
  );
});
