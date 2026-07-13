import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { afterEach, test } from "node:test";
import {
  GovernanceCheckError,
  auditGovernance,
  collectSnapshotWithGh,
  validateExpectedConfig
} from "./check-github-governance.mjs";

const temporaryDirectories = [];
const config = JSON.parse(
  fs.readFileSync(new URL("../.github/rulesets/main.json", import.meta.url), "utf8")
);

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

function compliantRuleset() {
  return structuredClone(config.desiredRuleset);
}

function snapshot(overrides = {}) {
  return {
    schemaVersion: 1,
    repository: config.repository,
    defaultBranch: "main",
    branch: { name: "main", protected: false, protection: null },
    rulesets: [],
    workflows: [],
    ...overrides
  };
}

test("expected policy uses the job name as the required status context", () => {
  const result = validateExpectedConfig(config);
  assert.equal(result.requiredChecks[0].context, "Validate pull request");
  assert.equal(result.requiredChecks[0].jobName, "Validate pull request");
  assert.equal(result.requiredChecks[0].workflowName, "Content quality");

  const invalid = structuredClone(config);
  invalid.requiredChecks[0].context = "Content quality / Validate pull request";
  assert.throws(() => validateExpectedConfig(invalid), GovernanceCheckError);
});

test("empty remote state reports unprotected main, the missing check, and pending workflow", () => {
  const result = auditGovernance(config, snapshot());
  const codes = new Set(result.findings.map((issue) => issue.code));

  assert.equal(result.ok, false);
  assert.ok(codes.has("MAIN_UNPROTECTED"));
  assert.ok(codes.has("EXPECTED_RULESET_MISSING"));
  assert.ok(codes.has("REQUIRED_CHECK_MISSING"));
  assert.ok(codes.has("REMOTE_WORKFLOW_MISSING"));
});

test("an offline snapshot cannot silently audit a different repository", () => {
  const result = auditGovernance(config, snapshot({ repository: "example/other-repository" }));
  assert.equal(result.ok, false);
  assert.ok(result.findings.some((issue) => issue.code === "SNAPSHOT_REPOSITORY_MISMATCH"));
});

test("an effective protected flag without auditable controls does not produce a false pass", () => {
  const result = auditGovernance(config, snapshot({
    branch: { name: "main", protected: true, protection: null }
  }));
  assert.ok(result.findings.some((issue) => issue.code === "MAIN_UNPROTECTED"));
});

test("a workflow/job display label does not satisfy the machine check context", () => {
  const ruleset = compliantRuleset();
  ruleset.rules
    .find((rule) => rule.type === "required_status_checks")
    .parameters.required_status_checks[0].context = "Content quality / Validate pull request";

  const result = auditGovernance(config, snapshot({
    rulesets: [ruleset],
    workflows: [{
      name: "Content quality",
      path: ".github/workflows/content-quality.yml",
      state: "active"
    }]
  }));

  assert.equal(result.ok, false);
  assert.ok(result.findings.some((issue) => issue.code === "REQUIRED_CHECK_MISSING"));
  assert.ok(result.findings.some((issue) => issue.code === "RULESET_REQUIRED_CHECK_MISSING"));
});

test("any ruleset bypass actor fails the no-automation-bypass baseline", () => {
  const ruleset = compliantRuleset();
  ruleset.bypass_actors = [{ actor_id: 5, actor_type: "RepositoryRole", bypass_mode: "always" }];

  const result = auditGovernance(config, snapshot({
    rulesets: [ruleset],
    workflows: [{
      name: "Content quality",
      path: ".github/workflows/content-quality.yml",
      state: "active"
    }]
  }));

  assert.equal(result.ok, false);
  assert.ok(result.findings.some((issue) => issue.code === "BYPASS_ACTORS_PRESENT"));
});

test("an omitted bypass actor field is unknown rather than implicitly empty", () => {
  const ruleset = compliantRuleset();
  delete ruleset.bypass_actors;

  const result = auditGovernance(config, snapshot({
    rulesets: [ruleset],
    workflows: [{
      name: "Content quality",
      path: ".github/workflows/content-quality.yml",
      state: "active"
    }]
  }));

  assert.equal(result.ok, false);
  assert.ok(result.findings.some((issue) => issue.code === "BYPASS_ACTORS_UNVERIFIABLE"));
});

test("pull request baseline parameter drift is reported", () => {
  const ruleset = compliantRuleset();
  const pullRequestRule = ruleset.rules.find((rule) => rule.type === "pull_request");
  pullRequestRule.parameters.required_approving_review_count = 1;
  pullRequestRule.parameters.allowed_merge_methods = ["squash"];

  const result = auditGovernance(config, snapshot({
    rulesets: [ruleset],
    workflows: [{
      name: "Content quality",
      path: ".github/workflows/content-quality.yml",
      state: "active"
    }]
  }));

  const drift = result.findings.filter((issue) => issue.code === "PULL_REQUEST_POLICY_DRIFT");
  assert.equal(result.ok, false);
  assert.deepEqual(
    new Set(drift.map((issue) => issue.detail.parameter)),
    new Set(["allowed_merge_methods", "required_approving_review_count"])
  );
});

test("legacy protection cannot mask a required check missing from the named ruleset", () => {
  const ruleset = compliantRuleset();
  ruleset.rules
    .find((rule) => rule.type === "required_status_checks")
    .parameters.required_status_checks = [];

  const result = auditGovernance(config, snapshot({
    branch: {
      name: "main",
      protected: true,
      protection: {
        required_status_checks: {
          contexts: ["Validate pull request"]
        }
      }
    },
    rulesets: [ruleset],
    workflows: [{
      name: "Content quality",
      path: ".github/workflows/content-quality.yml",
      state: "active"
    }]
  }));

  assert.equal(result.ok, false);
  assert.equal(result.findings.some((issue) => issue.code === "REQUIRED_CHECK_MISSING"), false);
  assert.ok(result.findings.some((issue) => issue.code === "RULESET_REQUIRED_CHECK_MISSING"));
});

test("a complete active ruleset and matching remote workflow pass", () => {
  const result = auditGovernance(config, snapshot({
    rulesets: [compliantRuleset()],
    workflows: [{
      name: "Content quality",
      path: ".github/workflows/content-quality.yml",
      state: "active"
    }]
  }));

  assert.equal(result.ok, true);
  assert.deepEqual(result.findings, []);
  assert.deepEqual(result.observed.requiredStatusChecks, ["Validate pull request"]);
});

test("missing gh has an actionable offline fallback message", () => {
  assert.throws(
    () => collectSnapshotWithGh({
      repository: config.repository,
      branch: "main",
      command: "definitely-not-a-real-gh-command"
    }),
    (error) => {
      assert.ok(error instanceof GovernanceCheckError);
      assert.match(error.message, /GitHub CLI/);
      assert.match(error.message, /--actual/);
      return true;
    }
  );
});

test("CLI audits an offline fixture without invoking gh", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "apple-cookbook-governance-"));
  temporaryDirectories.push(directory);
  const fixturePath = path.join(directory, "snapshot.json");
  fs.writeFileSync(fixturePath, `${JSON.stringify(snapshot())}\n`);

  const scriptPath = fileURLToPath(new URL("./check-github-governance.mjs", import.meta.url));
  const expectedPath = fileURLToPath(new URL("../.github/rulesets/main.json", import.meta.url));
  const result = spawnSync(
    process.execPath,
    [scriptPath, "--expected", expectedPath, "--actual", fixturePath, "--", "--json"],
    { encoding: "utf8" }
  );

  assert.equal(result.status, 1);
  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, false);
  assert.ok(report.findings.some((issue) => issue.code === "MAIN_UNPROTECTED"));
});
