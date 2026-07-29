import assert from "node:assert/strict";
import test from "node:test";
import { categoryPresentation } from "./category-presentation.ts";

test("categoryPresentation gives internal category names user-facing labels", () => {
  assert.deepEqual(categoryPresentation("Family Sharing"), {
    label: "家庭共享",
    description: "屏幕使用时间、儿童账号与购买请求"
  });
  assert.equal(categoryPresentation("Networking").label, "网络与热点");
});

test("categoryPresentation keeps an unknown category reachable", () => {
  assert.deepEqual(categoryPresentation("Future product"), {
    label: "Future product",
    description: "浏览这个主题下的排查文章"
  });
});
