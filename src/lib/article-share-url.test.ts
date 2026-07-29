import assert from "node:assert/strict";
import test from "node:test";
import { articleShareUrl } from "./article-share-url.ts";

test("articleShareUrl removes search context while preserving the article anchor", () => {
  assert.equal(
    articleShareUrl("https://cookbook.example/recipes/AirPods/one-side?q=AirPods%20只有一边有声音#排查流程"),
    "https://cookbook.example/recipes/AirPods/one-side#%E6%8E%92%E6%9F%A5%E6%B5%81%E7%A8%8B"
  );
});

test("articleShareUrl leaves a canonical article URL unchanged", () => {
  assert.equal(
    articleShareUrl("https://cookbook.example/recipes/Mac/system-data"),
    "https://cookbook.example/recipes/Mac/system-data"
  );
});
