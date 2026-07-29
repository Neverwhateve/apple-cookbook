import assert from "node:assert/strict";
import test from "node:test";
import { retailPathGroups, retailPathHref } from "./retail-paths.ts";

test("retail paths cover symptom, customer task, and service entry modes", () => {
  assert.deepEqual(
    retailPathGroups.map((group) => group.id),
    ["symptoms", "setup", "service"]
  );
  assert.ok(retailPathGroups.every((group) => group.paths.length >= 3));
});

test("search-backed retail paths return to the customer-language search", () => {
  const path = retailPathGroups[0]?.paths[0];
  assert.ok(path);
  assert.equal(retailPathHref(path!), "/?q=%E6%88%91%E7%9A%84%20iPhone%20%E5%BE%88%E7%83%AB#site-search");
});

test("service triage keeps its explicit route", () => {
  const path = retailPathGroups[2]?.paths[0];
  assert.ok(path);
  assert.equal(retailPathHref(path!), "/service");
});
