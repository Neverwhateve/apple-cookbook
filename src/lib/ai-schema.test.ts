import assert from "node:assert/strict";
import test from "node:test";
import { parseModelRecommendation, parseQuestionAnalysis } from "./ai-schema.ts";

test("analysis schema limits clarification questions", () => {
  const result = parseQuestionAnalysis({
    intent: "troubleshoot", devices: ["iPhone"], category: "connection", normalized_issue: "Finder 未识别 iPhone",
    symptoms: ["可以充电", "Finder 不显示"], keywords: ["Finder", "信任此电脑"], need_clarification: true,
    clarifying_questions: ["线缆能传输数据吗？", "是否看到信任提示？", "不应返回的第三题"], risk_level: "low"
  });
  assert.deepEqual(result?.clarifyingQuestions, ["线缆能传输数据吗？", "是否看到信任提示？"]);
});

test("recommendation schema discards invented article IDs and unsupported steps", () => {
  const result = parseModelRecommendation({
    summary: "相关内容", confidence: "medium", coverage: "partial", needs_human_review: false,
    recommended_articles: [
      { article_id: "real-article", reason: "直接相关", relevance: "high" },
      { article_id: "invented", reason: "不存在", relevance: "high" }
    ],
    suggested_steps: [
      { text: "先阅读真实文章", source_article_id: "real-article" },
      { text: "不能保留", source_article_id: "invented" }
    ]
  }, new Set(["real-article"]));
  assert.deepEqual(result?.recommendedArticles.map((article) => article.articleId), ["real-article"]);
  assert.deepEqual(result?.suggestedSteps.map((step) => step.sourceArticleId), ["real-article"]);
});
