# Harvest Proposal Workflow

Harvest automation publishes validated content without waiting for human review. It still uses an isolated branch, manifest, pull-request checks, and protected `main` so a failed or stale run cannot overwrite production.

Routine two-hour work runs through the Codex app automation on the Mac mini.
Website content Bugs use the event-driven Mac watcher described in
`docs/MAC_MINI_AUTOMATION.md`; the ECS host does not run Codex and does not hold
an OpenAI API key.

The safety boundary is a ready validation pull request containing only declared
Cookbook Markdown changes and one immutable run manifest under
`harvest/manifests/`. The manifest records the exact base commit, SHA-256
hashes, and canonical-match review that the automation used. CI recomputes the
hashes, checks action and identity consistency, and validates the review
structure before allowing publication; it does not repeat the semantic search
or prove that its notes are true.

`scripts/generate-harvest-proposal.mjs` is a deterministic safety materializer,
not a content author. An upstream research process supplies complete Markdown
in an explicit JSON input. The materializer validates that input, previews it
against the whole content corpus, writes exact bytes only with `--write`, and
creates the matching manifest. It never browses, invents claims, changes
branches, commits, pushes, opens a pull request, approves, or merges by itself.

## Required Flow

1. Fetch the latest protected `main` branch and record its full commit SHA as `baseCommit`.
2. Create a dedicated branch named exactly `harvest/<run-id>` or `automation/harvest/<run-id>` from that commit.
3. Match symptom language, aliases, error messages, devices, and system terms against canonical articles. Record the actual queries, matched article IDs, decision, and notes in `canonicalReview`.
4. Have the research process produce a proposal JSON outside the checkout. It must contain complete, evidence-backed Markdown; every automatically published create must use `status: canonical`.
5. Run the materializer without `--write`. The default dry-run validates the entire proposed corpus in an isolated temporary directory and makes no repository change.
6. Review the path/hash-only summary. Run the same command with `--write` to materialize exact Markdown bytes and one manifest at `harvest/manifests/<run-id>.json`.
7. Run content, Harvest, lint, type, test, and build checks. Commit only the declared articles and manifest.
8. Push the branch and open a ready validation pull request. Never push Harvest output directly to `main`.
9. When all checks pass, CI merges the automation PR and explicitly starts the `main` deployment workflow for ECS. A failed check stops publication automatically.

Example local flow:

```bash
git fetch origin main
BASE_COMMIT="$(git rev-parse origin/main)"
RUN_ID="daily-2026-07-13T100000Z"
git switch --create "harvest/$RUN_ID" "$BASE_COMMIT"

pnpm generate:harvest --input "/tmp/$RUN_ID.json"
pnpm generate:harvest --input "/tmp/$RUN_ID.json" --write
pnpm verify

pnpm validate:harvest \
  --manifest "harvest/manifests/$RUN_ID.json" \
  --expected-base "$BASE_COMMIT" \
  --expected-branch "$(git branch --show-current)"
git diff --check
git status --short
```

After committing the proposal, run the same diff boundary that CI uses:

```bash
pnpm validate:harvest \
  --changed-since "$BASE_COMMIT" \
  --expected-base "$BASE_COMMIT" \
  --expected-branch "$(git branch --show-current)" \
  --require
```

The JSON input contract is `schemas/harvest-proposal-input.schema.json`. A minimal create looks like this; `content` is the complete Markdown file encoded as a JSON string, not a partial patch:

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
      "reason": "Distinct symptom cluster supported by reviewed evidence.",
      "canonicalReview": {
        "queries": ["用户症状原话", "English alias"],
        "matchedArticleIds": [],
        "decision": "create-new",
        "notes": "No existing canonical article covers the same intent."
      },
      "content": "---\nschemaVersion: 2\n...\nstatus: canonical\n---\n\n# Complete article\n"
    }
  ]
}
```

Use `decision: update-existing` for `update`. Its `matchedArticleIds` must include the updated article ID or slug. Use `decision: redirect-to-existing` for `redirect`; both `matchedArticleIds` and the article frontmatter must agree with `canonicalArticleId`.

## Manifest Contract

The machine-readable contract is `schemas/harvest-run.schema.json`.

```json
{
  "schemaVersion": 2,
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
      "reason": "New symptom cluster with an Apple Support source",
      "canonicalReview": {
        "queries": ["用户症状原话", "English alias"],
        "matchedArticleIds": [],
        "decision": "create-new",
        "notes": "No existing canonical article covers the same intent."
      }
    }
  ]
}
```

Rules enforced by `scripts/validate-harvest-run.mjs`:

- `baseCommit` must exist, be an ancestor of the proposal, and match the current PR base when CI supplies it.
- Each path must be normalized, traversal-safe, below `cookbook/`, and end in `.md`. Target or parent symlinks are rejected by the materializer.
- A Harvest PR may only add or modify declared `cookbook/**/*.md` files and add one run manifest. Deletes, renames, type changes, extra manifests, workflow/code/config changes, source logs, reports, indexes, and all other paths fail the specialized guard.
- Every changed Cookbook Markdown file must appear exactly once in the manifest, and every manifest path must be changed by the PR.
- `create` requires a path absent at `baseCommit`, a `null` base hash, and `status: canonical` in the proposed frontmatter.
- `update` and `redirect` require the file to exist at `baseCommit` and require an exact base-content hash.
- `update` and `redirect` cannot change `id`, `slug`, or publication `status`; `update` also cannot change `canonicalArticleId`. Identity migration remains a separate scoped change.
- The proposed hash must match the checked-out file. Identical base and proposed hashes are rejected as meaningless changes.
- `redirect` requires `canonicalArticleId` in both the manifest and article frontmatter.
- Every change requires a reason and canonical review. Its decision must match the action; redirects must record the target among matched IDs.
- v1 `verification: Official` or v2 `verificationLevel: Official` requires at least one HTTPS source on the exact official-content allowlist (`support.apple.com`). `discussions.apple.com`, `discussionschinese.apple.com`, other Apple subdomains, and lookalike domains cannot satisfy this rule even if metadata says `official: true`.
- Duplicate paths fail the run.

Hashes cover the complete raw Markdown file. This is the phase-one substitute for future managed-field conflict detection: it is intentionally stricter and rejects the entire proposal when any human-authored part of the base file changed. That conservative choice prevents automation from overwriting an edit outside a field it intended to manage.

An ordinary human pull request without a changed Harvest manifest skips this specialized guard and continues through the normal content, lint, type, test, and build checks. The manifest requirement is activated for `harvest/*` and `automation/harvest/*` proposal branches.

## Materializer Safety and Idempotency

- Dry-run is the default. It writes only to an operating-system temporary directory for validation, removes that preview, and leaves the repository byte-for-byte unchanged.
- `--write` is accepted only on the exact run branch. There is no force or overwrite option.
- Proposal input is capped at 5 MiB, 20 changes, 512 KiB per article, and 2 MiB total article content. Unknown fields and duplicate paths are rejected.
- The proposal file should remain outside the checkout. Any undeclared tracked or non-ignored untracked repository path causes the run to stop; a later PR still rejects every committed path outside the allowlist.
- Creates must be absent at the base; updates and redirects must exist there. A current target must equal either the exact base bytes or exact proposed bytes. Any third state is treated as an automation/human divergence and is never overwritten.
- No-op changes are omitted. An all-no-op run creates neither articles nor a manifest. Re-running identical input does not rewrite matching files or change their timestamps.
- Articles are atomically replaced, validated, and then the manifest is written last. A failed write is rolled back only while the current bytes still equal what this process wrote; concurrent edits are preserved and reported.
- `generatedAt` and `baseCommit` come from input, so output is deterministic. A run ID and manifest are immutable; different content must use a new run ID after re-reading the latest base.
- The materializer deliberately does not append `sources/daily-harvest-*`, reports, indexes, or summaries. Those cumulative files currently create ordering conflicts and repeated URLs; future run-scoped intelligence artifacts need a separate reviewed contract.

The materializer remains write-limited to the local checkout. Publication is a
separate deterministic step: a repository-limited credential may push only an
automation branch and open a ready PR. GitHub Actions may merge that PR only
after the strict content-quality job succeeds; no automation credential may
bypass the protected `main` ruleset.

Manifest v2 intentionally replaces the pre-generator hash-only v1 contract. v1 manifests are rejected because they do not carry canonical review evidence. No v1 run manifests were persisted in this repository, so there is no data migration; every external producer must update before use.

## Conflict Handling

If `main` advances after collection, CI reports that `baseCommit` no longer matches the PR base. Do not merely replace the commit or hashes in the manifest. Re-read the current canonical article, recompute the proposal, regenerate the manifest, and request review again.

If a base hash differs, treat it as a human-edit conflict. Preserve the current article, reassess the proposed change, and produce a new diff. Never resolve it by forcing an automation version over the repository version.

## Automatic Publication

- Automation-created articles are canonical only after manifest, content, lint, type, test, and build checks pass.
- Updates must preserve human-authored content unless the manifest was generated from that exact file version.
- Duplicate symptoms should update a canonical article or use an explicit redirect proposal; they should not become independent published recipes.
- Human input is corrective: users can report a content Bug, provide ideas, or submit sources without being a publication dependency.

## Repository Settings Required Outside Git

The workflow can detect unsafe proposals, but it cannot stop a token with unrestricted rights from pushing to `main`. `Protect main` is now active remotely and requires PRs plus the exact strict content-quality check, blocks deletion/force pushes, and has no bypass actors. The check was added only after PR #12 registered and passed it:

- require pull requests and the exact `Validate pull request` check context (the GitHub Actions job name; `Content quality / Validate pull request` is only a possible UI display label);
- disallow force pushes and branch deletion;
- require the branch to be up to date before merge;
- do not grant the Harvest credential bypass permission;
- scope the Harvest credential to creating branches and pull requests only where possible.

All listed rules are active, and PR #12 published the workflow source to `main`. New pull requests therefore receive the required check without carrying their own copy of the workflow.
