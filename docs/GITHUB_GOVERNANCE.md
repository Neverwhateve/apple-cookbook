# GitHub Main Branch Governance

Apple Cookbook keeps its expected `main`-branch controls in `.github/rulesets/main.json`. The file is policy-as-code for review and drift detection; it is not applied automatically and no repository-setting mutation occurs during normal validation.

## Current Remote State

The initial read-only inspection on 2026-07-13 found no remote protection. Phase 1 was activated at 15:40 +08:00. After PR #12 successfully ran the candidate check, Phase 2 updated the same ruleset at 16:02 +08:00:

- repository: `Neverwhateve/apple-cookbook`;
- default branch: `main`;
- legacy branch protection: absent (`404 Branch not protected`);
- active repository ruleset: `Protect main` (ID `18863035`), targeting only `refs/heads/main`;
- enforced now: pull requests, branch-deletion protection, non-fast-forward/force-push protection, and the strict `Validate pull request` status check;
- bypass list: empty; the API reports `current_user_can_bypass: never`;
- workflow registry: content quality, Alibaba Cloud deployment, and feedback intake sync;
- `.github/workflows/content-quality.yml`: registered by the successful PR run and published to the default branch by PR #12;
- read-only governance audit: exit `0`, with no findings.

The ruleset matches `.github/rulesets/main.json`. No duplicate ruleset was created, strict/up-to-date checking is enabled, and automation has no bypass path. PR #12 was explicitly authorized and merged only after its latest required check succeeded.

## Read-only Check

With an authenticated GitHub CLI, inspect the current remote state:

```bash
node scripts/check-github-governance.mjs
```

The script only makes `GET` requests through `gh api`. It never creates, updates, or deletes a ruleset. Use `--json` for machine-readable output or `--repo owner/name` to inspect an explicit repository.

For deterministic CI or review without GitHub access, pass a previously captured normalized snapshot:

```bash
node scripts/check-github-governance.mjs \
  --actual /path/to/governance-snapshot.json \
  --json
```

The snapshot shape is the output model used by `collectSnapshotWithGh`: `defaultBranch`, `branch.protected`, optional `branch.protection`, complete `rulesets`, and `workflows` containing `name`, `path`, and `state`. Tests exercise this offline path, so a missing or unauthenticated `gh` binary does not prevent policy validation.

The checker exits with `0` when policy matches, `1` for governance drift, and `2` when the check itself cannot run because configuration, JSON, `gh`, or authentication is invalid.

GitHub omits `bypass_actors` from a ruleset response when the caller is not allowed to view that sensitive setting. The checker treats an omitted field as unverifiable and fails closed; use an administrator account for a conclusive audit even though the script itself only issues read requests.

## Required Check Name

The workflow identity has three related names:

- workflow: `Content quality`;
- job id: `validate`;
- job name and required status-check context: `Validate pull request`.

For a normal GitHub Actions workflow, GitHub defines the required-check context as the **job name**. Do not configure `Content quality / Validate pull request` as the machine context. The combined form may appear as a UI label, but it does not match the check-run name that branch governance requires. Job names also need to remain unique across workflows to avoid ambiguous required checks.

## Phased Activation

Phase 1 is complete:

1. Active `Protect main` ruleset created with no bypass actors.
2. Pull requests are required; deletion and force pushes are blocked.
3. The unregistered status check was deliberately omitted to avoid locking the repository.

Phase 2 is also complete at the repository-settings layer:

1. PR #12 delivered `.github/workflows/content-quality.yml` and its complete dependency closure: package scripts, validators, schemas, tests, and referenced implementation.
2. Its `Validate pull request` job completed successfully before the required check was enabled.
3. Existing ruleset ID `18863035` was updated in place; no second overlapping `Protect main` ruleset exists.
4. The exact check context `Validate pull request` is required with strict/up-to-date checking.
5. The bypass list remains empty for automation.
6. API readback and the read-only checker both match policy; the checker exits `0`.

After any ruleset or workflow change, rerun the read-only checker and continue to require exit `0`. Future pull requests must remain up to date and pass `Validate pull request`; the check and policy file must be changed together if the job is ever renamed.

The baseline uses zero mandatory approvals so a single-maintainer repository can still merge its own pull requests after CI. If an independent reviewer is consistently available, raising `required_approving_review_count` to `1` is the recommended next tightening step and should be reflected in the policy file at the same time.

## Operational Notes

- Do not enable a required check before the workflow exists and has run successfully; otherwise every pull request can remain permanently waiting for a status that GitHub cannot produce.
- Do not rename the `Validate pull request` job without updating the expected policy and repository ruleset together.
- The check detects configuration drift, but it cannot grant authorization or prove that an administrator reviewed a settings change.
- Rulesets layer with legacy branch protection. This project expects the named `Protect main` ruleset so the intended controls stay reproducible and reviewable in one place.

GitHub references: [rules available in rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets), [troubleshooting required status checks](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/troubleshooting-rules), and [managing repository rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/managing-rulesets-for-a-repository).
