import assert from "node:assert/strict";
import test from "node:test";
import { customerExplanationFor } from "./customer-explanation.ts";

test("customer explanation prefers the authored first-step brief", () => {
  assert.equal(
    customerExplanationFor({ solutionSummary: "先确认范围。", articleSummary: "文章摘要。", title: "示例" }),
    "先确认范围。"
  );
});

test("customer explanation uses the reviewed article summary before generic language", () => {
  assert.equal(
    customerExplanationFor({ solutionSummary: "", articleSummary: "先区分现象。", title: "示例" }),
    "先区分现象。"
  );
});
