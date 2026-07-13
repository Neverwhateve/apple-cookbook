import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { afterEach, test } from "node:test";

const temporaryDirectories = [];
const scriptPath = path.resolve("scripts/create-harvest-manifest.mjs");

function exec(command, args, cwd) {
  return execFileSync(command, args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
}

function article(title, status = "canonical") {
  return `---\ntitle: ${title}\nstatus: ${status}\n---\n\n## 症状\n\nTest.\n`;
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test("materializes tracked updates and untracked creates with complete hashes", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "apple-cookbook-manifest-"));
  temporaryDirectories.push(cwd);
  fs.mkdirSync(path.join(cwd, "cookbook", "iPhone"), { recursive: true });
  fs.writeFileSync(path.join(cwd, "cookbook", "iPhone", "existing.md"), article("Existing"));
  exec("git", ["init", "-q"], cwd);
  exec("git", ["config", "user.email", "test@example.com"], cwd);
  exec("git", ["config", "user.name", "Test"], cwd);
  exec("git", ["add", "."], cwd);
  exec("git", ["commit", "-q", "-m", "base"], cwd);
  const base = exec("git", ["rev-parse", "HEAD"], cwd).trim();

  fs.appendFileSync(path.join(cwd, "cookbook", "iPhone", "existing.md"), "\nUpdated.\n");
  fs.writeFileSync(path.join(cwd, "cookbook", "iPhone", "new.md"), article("New"));

  const output = exec(process.execPath, [
    scriptPath,
    "--base", base,
    "--run-id", "test-run",
    "--reason", "Test",
    "--automation-id", "mac-mini-feedback-watcher"
  ], cwd).trim();
  const manifest = JSON.parse(fs.readFileSync(path.join(cwd, output), "utf8"));

  assert.deepEqual(manifest.changes.map(({ path: filePath, action }) => [filePath, action]), [
    ["cookbook/iPhone/existing.md", "update"],
    ["cookbook/iPhone/new.md", "create"]
  ]);
  assert.match(manifest.changes[0].baseContentHash, /^sha256:[0-9a-f]{64}$/);
  assert.equal(manifest.changes[1].baseContentHash, null);
  assert.ok(manifest.changes.every((change) => /^sha256:[0-9a-f]{64}$/.test(change.proposedContentHash)));
  assert.equal(manifest.automationId, "mac-mini-feedback-watcher");
});
