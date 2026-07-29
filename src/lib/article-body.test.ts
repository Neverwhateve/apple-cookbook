import assert from "node:assert/strict";
import test from "node:test";
import { formatArticleBody } from "./article-body.ts";

test("formatArticleBody keeps user-facing steps and removes Chinese authoring sections", () => {
  assert.equal(
    formatArticleBody("# 标题\n\n## 症状\n\n现象\n\n## Apple 官方方案\n\n1. 步骤\n\n## 相关问题\n\n- 内部关联"),
    "## 症状\n\n现象\n\n## Apple 官方方案\n\n1. 步骤"
  );
});

test("formatArticleBody removes a legacy English Metadata section", () => {
  assert.equal(
    formatArticleBody("## 症状\n\n现象\n\n## 如果仍未解决\n\n联系支持\n\n## Metadata\n\n- status: canonical"),
    "## 症状\n\n现象\n\n## 如果仍未解决\n\n联系支持"
  );
});

test("formatArticleBody makes Retail guidance explicit without changing its steps", () => {
  assert.equal(
    formatArticleBody("## 症状\n\n现象\n\n## 零售排查流程\n\n1. 先复现问题\n\n## 升级处理\n\n联系支持"),
    "## 症状\n\n现象\n\n## 零售排查流程（同事实践）\n1. 先复现问题\n\n## 如果仍未解决\n联系支持"
  );
});
