# GitHub Main Branch Governance

Apple Cookbook keeps its expected `main`-branch controls in `.github/rulesets/main.json`. The file is policy-as-code for review and drift detection; it is not applied automatically and no repository-setting mutation occurs during normal validation.

## Current Remote State

The initial read-only inspection on 2026-07-13 found no remote protection. Phase 1 was then activated by an administrator at 2026-07-13 15:40 +08:00:

- repository: `Neverwhateve/apple-cookbook`;
- default branch: `main`;
- legacy branch protection: absent (`404 Branch not protected`);
- active repository ruleset: `Protect main` (ID `18863035`), targeting only `refs/heads/main`;
- enforced now: pull requests, branch-deletion protection, and non-fast-forward/force-push protection;
- bypass list: empty; the API reports `current_user_can_bypass: never`;
- remote workflows: only Alibaba Cloud deployment and feedback intake sync;
- `.github/workflows/content-quality.yml`: present in this optimization branch, but not yet in the remote default branch.

`main` is no longer directly writable or deletable, but the final content-quality boundary is intentionally incomplete. The ruleset does **not** yet require `Validate pull request`: GitHub requires a candidate check to have completed successfully in the repository within the previous seven days, and that workflow has never run. Adding the missing check now would leave every pull request waiting for a job that cannot run.

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

Complete Phase 2 through a reviewed code change:

1. Create a focused pull request containing `.github/workflows/content-quality.yml` and its complete dependency closure: package scripts, validators, schemas, tests, and referenced implementation. Do not publish the YAML alone.
2. Confirm that the PR's `Validate pull request` job completes successfully. GitHub requires the check to have succeeded in this repository within the preceding seven days; it does not need to have run on the default branch.
3. Update existing ruleset ID `18863035`; do not create a second overlapping `Protect main` ruleset.
4. Add the exact check context `Validate pull request` and require branches to be up to date before merging.
5. Keep the bypass list empty for automation. In particular, never give Daily Harvest or other content collectors a bypass path.
6. Save only after comparing every setting with `.github/rulesets/main.json`, then read the ruleset back through the API. Before merge, the checker is expected to report only `REMOTE_WORKFLOW_MISSING`, because GitHub's workflow listing is sourced from the default branch.
7. Merge only after explicit approval, while the branch is up to date and `Validate pull request` is still successful.
8. After the workflow reaches the default branch, rerun the read-only checker and require exit `0`.

The baseline uses zero mandatory approvals so a single-maintainer repository can still merge its own pull requests after CI. If an independent reviewer is consistently available, raising `required_approving_review_count` to `1` is the recommended next tightening step and should be reflected in the policy file at the same time.

## Operational Notes

- Do not enable a required check before the workflow exists and has run successfully; otherwise every pull request can remain permanently waiting for a status that GitHub cannot produce.
- Do not rename the `Validate pull request` job without updating the expected policy and repository ruleset together.
- The check detects configuration drift, but it cannot grant authorization or prove that an administrator reviewed a settings change.
- Rulesets layer with legacy branch protection. This project expects the named `Protect main` ruleset so the intended controls stay reproducible and reviewable in one place.

GitHub references: [rules available in rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets), [troubleshooting required status checks](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/troubleshooting-rules), and [managing repository rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/managing-rulesets-for-a-repository).
