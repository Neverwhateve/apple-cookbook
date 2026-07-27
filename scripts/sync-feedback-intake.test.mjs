import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workflow = fs.readFileSync(path.join(root, ".github/workflows/sync-feedback-intake.yml"), "utf8");

test("archives a closed published Issue before applying in-progress labels", () => {
  const reconciliationStart = workflow.indexOf(`issue_state=$(jq -r '.state' <<<"$issue_json")`);
  const reconciliation = workflow.slice(reconciliationStart);
  const closedGuard = reconciliation.indexOf('if [[ "$issue_state" == "CLOSED" ]]; then');
  const publishedLabel = reconciliation.indexOf('index("codex-published")');

  assert.ok(reconciliationStart >= 0, "expected the feedback reconciliation loop");
  assert.ok(closedGuard >= 0, "expected a closed Issue reconciliation branch");
  assert.ok(publishedLabel >= 0, "expected the published Issue state branch");
  assert.ok(closedGuard < publishedLabel, "closed Issues must be archived before published labels are considered");
});
