# Harvest Proposal Workflow

Harvest automation proposes content; it does not publish content and must not write directly to `main`.

The safety boundary is a draft pull request containing one run manifest under `harvest/manifests/`. The manifest records the exact base commit and SHA-256 hashes that the automation read and proposed. CI recomputes those values from Git and the checked-out Markdown before allowing review.

## Required Flow

1. Fetch the latest protected `main` branch and record its full commit SHA as `baseCommit`.
2. Create a dedicated branch named `harvest/<run-id>` from that commit.
3. Match symptoms and aliases against canonical articles before creating a new file.
4. Make only evidence-backed changes. Every newly created article must use `status: draft`.
5. Create exactly one manifest at `harvest/manifests/<run-id>.json`.
6. Run content validation and the Harvest guard locally.
7. Push the branch and open a **draft pull request**. Never push Harvest output directly to `main`.
8. Resolve guard and content-quality failures without weakening the manifest. Human review decides whether content may be promoted from `draft`.

Example local checks:

```bash
BASE_COMMIT="$(git rev-parse main)"
node scripts/validate-harvest-run.mjs \
  --manifest "harvest/manifests/<run-id>.json" \
  --expected-base "$BASE_COMMIT"
pnpm validate:content
node --test scripts/validate-harvest-run.test.mjs
```

## Manifest Contract

The machine-readable contract is `schemas/harvest-run.schema.json`.

```json
{
  "schemaVersion": 1,
  "runId": "daily-2026-07-13T100000Z",
  "automationId": "daily-harvest",
  "generatedAt": "2026-07-13T10:00:00.000Z",
  "baseCommit": "0123456789abcdef0123456789abcdef01234567",
  "changes": [
    {
      "path": "cookbook/iPhone/example-symptom.md",
      "action": "create",
      "baseContentHash": null,
      "proposedContentHash": "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason": "New symptom cluster with an Apple Support source"
    }
  ]
}
```

Rules enforced by `scripts/validate-harvest-run.mjs`:

- `baseCommit` must exist, be an ancestor of the proposal, and match the current PR base when CI supplies it.
- Each path must be normalized, traversal-safe, below `cookbook/`, and end in `.md`. Symlinks are rejected.
- A PR has one changed manifest; every changed Cookbook Markdown file must appear exactly once in it, and every manifest path must be changed by the PR.
- `create` requires a path absent at `baseCommit`, a `null` base hash, and `status: draft` in the proposed frontmatter.
- `update` and `redirect` require the file to exist at `baseCommit` and require an exact base-content hash.
- The proposed hash must match the checked-out file. Identical base and proposed hashes are rejected as meaningless changes.
- `redirect` requires `canonicalArticleId` in both the manifest and article frontmatter.
- v1 `verification: Official` or v2 `verificationLevel: Official` requires at least one HTTPS source on the exact official-content allowlist (`support.apple.com`). `discussions.apple.com`, `discussionschinese.apple.com`, other Apple subdomains, and lookalike domains cannot satisfy this rule even if metadata says `official: true`.
- Duplicate paths fail the run.

Hashes cover the complete raw Markdown file. This is the phase-one substitute for future managed-field conflict detection: it is intentionally stricter and rejects the entire proposal when any human-authored part of the base file changed. That conservative choice prevents automation from overwriting an edit outside a field it intended to manage.

An ordinary human pull request without a changed Harvest manifest skips this specialized guard and continues through the normal content, lint, type, test, and build checks. The manifest requirement is activated for `harvest/*` and `automation/harvest/*` proposal branches.

## Conflict Handling

If `main` advances after collection, CI reports that `baseCommit` no longer matches the PR base. Do not merely replace the commit or hashes in the manifest. Re-read the current canonical article, recompute the proposal, regenerate the manifest, and request review again.

If a base hash differs, treat it as a human-edit conflict. Preserve the current article, reassess the proposed change, and produce a new diff. Never resolve it by forcing an automation version over the repository version.

## Publication and Canonicalization

- Automation-created articles stay `draft` until a reviewer checks sources, steps, risk wording, duplicates, and canonical mapping.
- Updates must preserve human-authored content unless the manifest was generated from that exact file version.
- Duplicate symptoms should update a canonical article or use an explicit redirect proposal; they should not become independent published recipes.
- Promotion to `reviewed` or `canonical` should be a separate reviewed change, not part of the initial automated create.

## Repository Settings Required Outside Git

The workflow can detect unsafe proposals, but it cannot stop a token with unrestricted rights from pushing to `main`. `Protect main` is now active remotely and requires PRs plus the exact strict content-quality check, blocks deletion/force pushes, and has no bypass actors. The check was added only after Draft PR #12 registered and passed it:

- require pull requests and the exact `Validate pull request` check context (the GitHub Actions job name; `Content quality / Validate pull request` is only a possible UI display label);
- disallow force pushes and branch deletion;
- require the branch to be up to date before merge;
- do not grant the Harvest credential bypass permission;
- scope the Harvest credential to creating branches and pull requests only where possible.

All listed rules are active. Draft PR #12 still needs an explicitly approved merge so the workflow source reaches `main`; until then, unrelated branches that do not contain the workflow may be unable to produce the required check.
