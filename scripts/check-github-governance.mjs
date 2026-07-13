#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const DEFAULT_EXPECTED_PATH = ".github/rulesets/main.json";

export class GovernanceCheckError extends Error {
  constructor(message) {
    super(message);
    this.name = "GovernanceCheckError";
  }
}

function readJson(filePath, label) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new GovernanceCheckError(`${label} is not readable JSON: ${error.message}`);
  }
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function escapePattern(value) {
  return value.replace(/[|\\{}()[\]^$+?.]/g, "\\$&");
}

function matchesRefPattern(pattern, refName, defaultBranch) {
  if (pattern === "~ALL") return true;
  if (pattern === "~DEFAULT_BRANCH") return refName === `refs/heads/${defaultBranch}`;
  const expression = `^${escapePattern(pattern).replace(/\*/g, ".*")}$`;
  return new RegExp(expression).test(refName);
}

function rulesetTargetsBranch(ruleset, branch, defaultBranch) {
  if (ruleset?.target !== "branch") return false;

  const refName = `refs/heads/${branch}`;
  const condition = ruleset.conditions?.ref_name;
  const includes = asArray(condition?.include);
  const excludes = asArray(condition?.exclude);

  return (
    includes.some((pattern) => matchesRefPattern(pattern, refName, defaultBranch)) &&
    !excludes.some((pattern) => matchesRefPattern(pattern, refName, defaultBranch))
  );
}

function requiredContextsFromRuleset(ruleset) {
  return asArray(ruleset?.rules)
    .filter((rule) => rule?.type === "required_status_checks")
    .flatMap((rule) => asArray(rule.parameters?.required_status_checks))
    .map((check) => check?.context)
    .filter((context) => typeof context === "string");
}

function requiredContextsFromProtection(protection) {
  const statusChecks = protection?.required_status_checks;
  return [
    ...asArray(statusChecks?.contexts),
    ...asArray(statusChecks?.checks).map((check) => check?.context)
  ].filter((context) => typeof context === "string");
}

function expectedRule(config, type) {
  return asArray(config.desiredRuleset?.rules).find((rule) => rule?.type === type);
}

function valuesEqual(expected, actual) {
  if (Array.isArray(expected) && Array.isArray(actual)) {
    return (
      expected.length === actual.length &&
      [...expected].sort().every((value, index) => value === [...actual].sort()[index])
    );
  }
  return Object.is(expected, actual);
}

export function validateExpectedConfig(config) {
  const errors = [];

  if (!config || typeof config !== "object" || Array.isArray(config)) {
    throw new GovernanceCheckError("Expected governance config must be a JSON object.");
  }
  if (config.schemaVersion !== 1) errors.push("schemaVersion must be 1");
  if (typeof config.repository !== "string" || !/^[^/]+\/[^/]+$/.test(config.repository)) {
    errors.push("repository must use owner/name format");
  }
  if (typeof config.branch !== "string" || !config.branch.trim()) errors.push("branch must be a non-empty string");

  const desired = config.desiredRuleset;
  if (!desired || typeof desired !== "object" || Array.isArray(desired)) {
    errors.push("desiredRuleset must be an object");
  } else {
    if (typeof desired.name !== "string" || !desired.name.trim()) errors.push("desiredRuleset.name is required");
    if (desired.target !== "branch") errors.push("desiredRuleset.target must be branch");
    if (desired.enforcement !== "active") errors.push("desiredRuleset.enforcement must be active");
    if (!Array.isArray(desired.bypass_actors) || desired.bypass_actors.length !== 0) {
      errors.push("desiredRuleset.bypass_actors must be an empty array");
    }
    for (const type of ["deletion", "non_fast_forward", "pull_request", "required_status_checks"]) {
      if (!expectedRule(config, type)) errors.push(`desiredRuleset.rules must include ${type}`);
    }
  }

  if (!Array.isArray(config.requiredChecks) || config.requiredChecks.length === 0) {
    errors.push("requiredChecks must contain at least one check provenance record");
  } else {
    const desiredContexts = new Set(requiredContextsFromRuleset(desired));
    for (const [index, check] of config.requiredChecks.entries()) {
      const prefix = `requiredChecks[${index}]`;
      for (const field of ["context", "workflowPath", "workflowName", "jobId", "jobName"]) {
        if (typeof check?.[field] !== "string" || !check[field].trim()) errors.push(`${prefix}.${field} is required`);
      }
      if (check?.context !== check?.jobName) {
        errors.push(`${prefix}.context must equal the GitHub Actions job name, not a workflow/job display label`);
      }
      if (!desiredContexts.has(check?.context)) {
        errors.push(`${prefix}.context must also appear in the desired required_status_checks rule`);
      }
    }
  }

  if (errors.length) {
    throw new GovernanceCheckError(`Invalid expected governance config:\n- ${errors.join("\n- ")}`);
  }
  return config;
}

function finding(code, message, detail) {
  return { code, severity: "error", message, ...(detail ? { detail } : {}) };
}

export function auditGovernance(configInput, actualInput) {
  const config = validateExpectedConfig(configInput);
  const actual = actualInput && typeof actualInput === "object" && !Array.isArray(actualInput)
    ? actualInput
    : {};
  const branch = config.branch;
  const defaultBranch = actual.defaultBranch ?? branch;
  const rulesets = asArray(actual.rulesets);
  const activeTargetingRulesets = rulesets.filter(
    (ruleset) => ruleset?.enforcement === "active" && rulesetTargetsBranch(ruleset, branch, defaultBranch)
  );
  const protection = actual.branch?.protection ?? null;
  const legacyProtected = protection !== null;
  const findings = [];

  if (typeof actual.repository === "string" && actual.repository !== config.repository) {
    findings.push(finding(
      "SNAPSHOT_REPOSITORY_MISMATCH",
      `Observed repository ${actual.repository} does not match policy repository ${config.repository}.`
    ));
  }
  if (typeof actual.branch?.name === "string" && actual.branch.name !== branch) {
    findings.push(finding(
      "SNAPSHOT_BRANCH_MISMATCH",
      `Observed branch ${actual.branch.name} does not match policy branch ${branch}.`
    ));
  }

  if (!legacyProtected && activeTargetingRulesets.length === 0) {
    findings.push(finding(
      "MAIN_UNPROTECTED",
      `${branch} is not protected by legacy branch protection or an active targeting ruleset.`
    ));
  }

  const desiredName = config.desiredRuleset.name;
  const namedRuleset = rulesets.find((ruleset) => ruleset?.name === desiredName);
  if (!namedRuleset) {
    findings.push(finding("EXPECTED_RULESET_MISSING", `Ruleset \"${desiredName}\" does not exist.`));
  } else {
    if (namedRuleset.enforcement !== "active") {
      findings.push(finding(
        "RULESET_NOT_ACTIVE",
        `Ruleset \"${desiredName}\" is ${namedRuleset.enforcement ?? "not active"}; expected active.`
      ));
    }
    if (!rulesetTargetsBranch(namedRuleset, branch, defaultBranch)) {
      findings.push(finding("RULESET_WRONG_TARGET", `Ruleset \"${desiredName}\" does not target ${branch}.`));
    }
    if (!Array.isArray(namedRuleset.bypass_actors)) {
      findings.push(finding(
        "BYPASS_ACTORS_UNVERIFIABLE",
        `Ruleset \"${desiredName}\" did not expose bypass_actors; use an account allowed to view repository rules before treating the policy as compliant.`
      ));
    } else if (namedRuleset.bypass_actors.length > 0) {
      findings.push(finding(
        "BYPASS_ACTORS_PRESENT",
        `Ruleset \"${desiredName}\" has bypass actors; the baseline requires an empty bypass list.`,
        { bypassActorCount: namedRuleset.bypass_actors.length }
      ));
    }

    const actualRuleTypes = new Set(asArray(namedRuleset.rules).map((rule) => rule?.type));
    for (const desiredRule of asArray(config.desiredRuleset.rules)) {
      if (!actualRuleTypes.has(desiredRule.type)) {
        findings.push(finding(
          "RULE_MISSING",
          `Ruleset \"${desiredName}\" is missing the ${desiredRule.type} rule.`,
          { ruleType: desiredRule.type }
        ));
      }
    }

    const expectedPullRequestRule = expectedRule(config, "pull_request");
    const actualPullRequestRule = asArray(namedRuleset.rules).find((rule) => rule?.type === "pull_request");
    if (actualPullRequestRule) {
      for (const [parameter, expectedValue] of Object.entries(expectedPullRequestRule.parameters ?? {})) {
        const actualValue = actualPullRequestRule.parameters?.[parameter];
        if (!valuesEqual(expectedValue, actualValue)) {
          findings.push(finding(
            "PULL_REQUEST_POLICY_DRIFT",
            `Ruleset \"${desiredName}\" pull_request.${parameter} does not match the baseline.`,
            { parameter, expected: expectedValue, actual: actualValue ?? null }
          ));
        }
      }
    }

    const expectedStatusRule = expectedRule(config, "required_status_checks");
    const actualStatusRule = asArray(namedRuleset.rules).find((rule) => rule?.type === "required_status_checks");
    if (actualStatusRule) {
      if (
        expectedStatusRule?.parameters?.strict_required_status_checks_policy === true &&
        actualStatusRule.parameters?.strict_required_status_checks_policy !== true
      ) {
        findings.push(finding(
          "STRICT_CHECKS_DISABLED",
          `Ruleset \"${desiredName}\" does not require branches to be up to date before merge.`
        ));
      }
      if (
        actualStatusRule.parameters?.do_not_enforce_on_create !==
        expectedStatusRule?.parameters?.do_not_enforce_on_create
      ) {
        findings.push(finding(
          "STATUS_CHECK_POLICY_DRIFT",
          `Ruleset \"${desiredName}\" required_status_checks.do_not_enforce_on_create does not match the baseline.`
        ));
      }

      const namedContexts = new Set(requiredContextsFromRuleset(namedRuleset));
      for (const expectedContext of requiredContextsFromRuleset(config.desiredRuleset)) {
        if (!namedContexts.has(expectedContext)) {
          findings.push(finding(
            "RULESET_REQUIRED_CHECK_MISSING",
            `Ruleset \"${desiredName}\" does not itself require status check \"${expectedContext}\".`,
            { context: expectedContext }
          ));
        }
      }
    }
  }

  const configuredContexts = new Set([
    ...requiredContextsFromProtection(protection),
    ...activeTargetingRulesets.flatMap(requiredContextsFromRuleset)
  ]);
  const workflows = asArray(actual.workflows);

  for (const expectedCheck of config.requiredChecks) {
    if (!configuredContexts.has(expectedCheck.context)) {
      findings.push(finding(
        "REQUIRED_CHECK_MISSING",
        `Required status check \"${expectedCheck.context}\" is not enforced for ${branch}.`,
        {
          context: expectedCheck.context,
          displayIdentity: `${expectedCheck.workflowName} / ${expectedCheck.jobName}`
        }
      ));
    }

    const workflow = workflows.find((candidate) => candidate?.path === expectedCheck.workflowPath);
    if (!workflow) {
      findings.push(finding(
        "REMOTE_WORKFLOW_MISSING",
        `${expectedCheck.workflowPath} is not present on the remote default branch.`,
        {
          prerequisite: `Merge the workflow and complete a successful \"${expectedCheck.jobName}\" run before selecting it as required.`
        }
      ));
    } else {
      if (workflow.name !== expectedCheck.workflowName) {
        findings.push(finding(
          "WORKFLOW_NAME_MISMATCH",
          `${expectedCheck.workflowPath} is named \"${workflow.name}\" remotely; expected \"${expectedCheck.workflowName}\".`
        ));
      }
      if (typeof workflow.state === "string" && workflow.state !== "active") {
        findings.push(finding(
          "REMOTE_WORKFLOW_DISABLED",
          `${expectedCheck.workflowPath} is ${workflow.state}; expected active.`
        ));
      }
    }
  }

  return {
    ok: findings.length === 0,
    repository: config.repository,
    branch,
    findings,
    observed: {
      legacyBranchProtection: legacyProtected,
      activeTargetingRulesets: activeTargetingRulesets.map((ruleset) => ruleset.name),
      requiredStatusChecks: [...configuredContexts].sort(),
      remoteWorkflowPaths: workflows.map((workflow) => workflow.path).filter(Boolean).sort()
    }
  };
}

function runGhJson(endpoint, options = {}) {
  const command = options.command ?? "gh";
  const result = spawnSync(command, ["api", endpoint], {
    encoding: "utf8",
    env: options.env ?? process.env,
    maxBuffer: 16 * 1024 * 1024
  });

  if (result.error?.code === "ENOENT") {
    throw new GovernanceCheckError(
      `GitHub CLI \"${command}\" is unavailable. Install gh and run \"gh auth login\", or pass an offline snapshot with --actual <file>.`
    );
  }
  if (result.status !== 0) {
    const reason = result.stderr.trim() || `exit status ${result.status}`;
    if (options.allowNotFound === true && /(?:HTTP\s+)?404|not found/i.test(reason)) return null;
    throw new GovernanceCheckError(
      `Read-only GitHub API request failed for ${endpoint}: ${reason}. Confirm \"gh auth status\" or use --actual <file>.`
    );
  }
  try {
    return JSON.parse(result.stdout);
  } catch (error) {
    throw new GovernanceCheckError(`GitHub API returned invalid JSON for ${endpoint}: ${error.message}`);
  }
}

export function collectSnapshotWithGh({ repository, branch, command = "gh", env = process.env } = {}) {
  if (typeof repository !== "string" || !/^[^/]+\/[^/]+$/.test(repository)) {
    throw new GovernanceCheckError("A repository in owner/name format is required for live inspection.");
  }
  if (typeof branch !== "string" || !branch) {
    throw new GovernanceCheckError("A branch is required for live inspection.");
  }

  const apiOptions = { command, env };
  const repositoryInfo = runGhJson(`repos/${repository}`, apiOptions);
  const branchInfo = runGhJson(`repos/${repository}/branches/${encodeURIComponent(branch)}`, apiOptions);
  const rulesetSummaries = runGhJson(`repos/${repository}/rulesets?per_page=100`, apiOptions);
  const workflowResponse = runGhJson(`repos/${repository}/actions/workflows?per_page=100`, apiOptions);

  const rulesets = asArray(rulesetSummaries).map((ruleset) => {
    if (!ruleset?.id) return ruleset;
    return runGhJson(`repos/${repository}/rulesets/${ruleset.id}`, apiOptions);
  });

  let protection = null;
  if (branchInfo.protected === true) {
    protection = runGhJson(
      `repos/${repository}/branches/${encodeURIComponent(branch)}/protection`,
      { ...apiOptions, allowNotFound: true }
    );
  }

  return {
    schemaVersion: 1,
    repository,
    defaultBranch: repositoryInfo.default_branch,
    branch: {
      name: branchInfo.name,
      protected: branchInfo.protected === true,
      protection
    },
    rulesets,
    workflows: asArray(workflowResponse.workflows).map((workflow) => ({
      id: workflow.id,
      name: workflow.name,
      path: workflow.path,
      state: workflow.state
    }))
  };
}

function parseArguments(argv) {
  const options = {
    expectedPath: DEFAULT_EXPECTED_PATH,
    actualPath: null,
    repository: null,
    json: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    const value = argv[index + 1];
    if (argument === "--expected" && value) {
      options.expectedPath = value;
      index += 1;
    } else if (argument === "--actual" && value) {
      options.actualPath = value;
      index += 1;
    } else if (argument === "--repo" && value) {
      options.repository = value;
      index += 1;
    } else if (argument === "--json") {
      options.json = true;
    } else if (argument === "--") {
      continue;
    } else if (argument === "--help" || argument === "-h") {
      options.help = true;
    } else {
      throw new GovernanceCheckError(`Unknown or incomplete argument: ${argument}`);
    }
  }
  return options;
}

function usage() {
  return [
    "Usage:",
    "  node scripts/check-github-governance.mjs [--repo owner/name] [--json]",
    "  node scripts/check-github-governance.mjs --actual snapshot.json [--json]",
    "",
    `Expected policy defaults to ${DEFAULT_EXPECTED_PATH}; override it with --expected <file>.`,
    "Live mode performs read-only gh api requests. It never changes repository settings."
  ].join("\n");
}

function humanReport(result, source) {
  const lines = [
    `GitHub governance: ${result.ok ? "PASS" : "FAIL"}`,
    `Repository: ${result.repository}`,
    `Branch: ${result.branch}`,
    `Source: ${source}`
  ];
  if (result.ok) {
    lines.push("All expected main-branch governance controls were observed.");
  } else {
    for (const issue of result.findings) lines.push(`- [${issue.code}] ${issue.message}`);
  }
  return lines.join("\n");
}

async function main() {
  try {
    const options = parseArguments(process.argv.slice(2));
    if (options.help) {
      console.log(usage());
      return;
    }

    const expectedPath = path.resolve(options.expectedPath);
    const config = validateExpectedConfig(readJson(expectedPath, "Expected governance config"));
    const actual = options.actualPath
      ? readJson(path.resolve(options.actualPath), "Actual governance snapshot")
      : collectSnapshotWithGh({
          repository: options.repository ?? config.repository,
          branch: config.branch
        });
    const result = auditGovernance(config, actual);
    const source = options.actualPath ? `offline snapshot ${options.actualPath}` : "live read-only GitHub API";

    console.log(options.json ? JSON.stringify(result, null, 2) : humanReport(result, source));
    if (!result.ok) process.exitCode = 1;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`GitHub governance check could not run: ${message}`);
    process.exitCode = 2;
  }
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) await main();
