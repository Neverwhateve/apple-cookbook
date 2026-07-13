import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import test from "node:test";

const projectRoot = process.cwd();
const scriptPath = path.join(projectRoot, "scripts", "preview-content-migration.mjs");
const pilotArticle = "cookbook/Networking/iphone-ipad-wifi-no-internet-unable-to-join.md";

function runPreview(...args) {
  return spawnSync(process.execPath, [scriptPath, ...args], {
    cwd: projectRoot,
    encoding: "utf8"
  });
}

test("accepts the package-manager argument separator", () => {
  const result = runPreview("--", "--file", pilotArticle, "--json");

  assert.equal(result.status, 0, result.stderr);
  const output = JSON.parse(result.stdout);
  assert.deepEqual(output.summary, { total: 1, v1: 0, v2: 1, reviewIssues: 0 });
  assert.equal(output.articles[0].route, "/recipes/Networking/iphone-ipad-wifi-no-internet-unable-to-join");
  assert.equal(output.articles[0].alreadyV2, true);
});

test("keeps file previews inside the cookbook directory", () => {
  const result = runPreview("--file", "README.md", "--json");

  assert.equal(result.status, 2);
  assert.match(result.stderr, /必须位于 cookbook\/ 目录内/);
});
