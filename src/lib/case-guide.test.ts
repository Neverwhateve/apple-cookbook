import assert from "node:assert/strict";
import test from "node:test";
import { getCaseGuide } from "./case-guide.ts";

test("case guide selects notification questions without a model", () => {
  const guide = getCaseGuide({ title: "微信收不到通知", tags: ["微信", "Notifications"], symptoms: [] });

  assert.match(guide.questions[0], /一个 App/);
  assert.match(guide.questions[2], /Apple Watch/);
});

test("case guide sends heat cases through a safety-first split", () => {
  const guide = getCaseGuide({ title: "iPhone 更新后掉电快或发热", tags: ["电池", "发热"], symptoms: [] });

  assert.match(guide.questions[0], /充电/);
  assert.match(guide.questions[2], /停止常规排查/);
});

test("case guide falls back to a broad, safe first question", () => {
  const guide = getCaseGuide({ title: "未知问题", tags: [], symptoms: [] });

  assert.match(guide.questions[0], /从什么时候开始/);
});
