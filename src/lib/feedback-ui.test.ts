import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isGlobalFeedbackHiddenPath } from "./feedback-ui.ts";

describe("global feedback route visibility", () => {
  it("hides the widget on feedback, administration, and article routes", () => {
    for (const pathname of [
      "/feedback",
      "/feedback/history",
      "/admin",
      "/admin/feedback",
      "/recipes",
      "/recipes/Find%20My/location-sharing-not-working"
    ]) {
      assert.equal(isGlobalFeedbackHiddenPath(pathname), true, pathname);
    }
  });

  it("matches route segment boundaries instead of unrelated prefixes", () => {
    for (const pathname of ["/", "/categories", "/feedbacking", "/administrator", "/recipes-old"]) {
      assert.equal(isGlobalFeedbackHiddenPath(pathname), false, pathname);
    }
  });
});
