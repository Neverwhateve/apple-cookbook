# Apple Cookbook

Apple Cookbook is a long-term Apple troubleshooting knowledge base for Apple Retail Specialists, Creatives, and Technical Specialists.

The goal is to create a practical troubleshooting encyclopedia that helps Apple employees solve customer problems faster by combining official Apple guidance, carefully verified community reports, and real-world troubleshooting experience.

## Core Rules

- Prioritize accuracy.
- Prefer official Apple solutions.
- Clearly label community solutions as unofficial.
- Never present an unofficial workaround as an official Apple recommendation.
- Search by customer language, not only by feature name.
- Merge duplicates into one canonical article.
- Update existing articles when new information appears.

## Source Priority

1. Apple Support China (`support.apple.com/zh-cn`)
2. Apple Support Community
3. Apple Platform Security Documentation
4. Apple Developer Documentation
5. Apple Release Notes
6. Reddit
7. Xiaohongshu
8. MacRumors Forums
9. StackExchange Ask Different
10. Other trusted technical blogs

## Verification Levels

- Official
- Verified
- Likely
- Experimental
- Unknown

## Article Workflow

1. Start from customer symptoms and exact user language.
2. Check official Apple China sources first.
3. Compare multiple independent community reports before accepting a workaround.
4. Label every solution by verification level.
5. Include when not to use a workaround.
6. Include clear escalation criteria.

## Operating Cadence

- Source harvest and article review work should continue every 1 hour.
- Every completed automated cycle should open or update a `harvest/<run-id>` draft pull request; automation must not push content directly to `main`.
- Each Harvest proposal must include the base commit and full-file content hashes described in `docs/HARVEST_WORKFLOW.md`.
- Feedback questions and submitted links are P0 intake and must be handled before routine source harvest work.
- When multiple priority levels exist, resolve items in priority order before moving to the next level.
- The expected final `main` ruleset is versioned in `.github/rulesets/main.json`; Phase 1 is active remotely (PR required, deletion/force-push blocked, no bypass). `pnpm audit:github-governance` remains read-only and reports drift until the content-quality check is safely added. See `docs/GITHUB_GOVERNANCE.md`.

## Architecture

Apple Cookbook has three layers:

1. **Knowledge Repository**
   - Obsidian-compatible Markdown in `cookbook/`.
   - One troubleshooting article per Markdown file.
   - YAML frontmatter powers search, routing, tags, related articles, and future AI workflows.
   - Article bodies are never stored in a database.

2. **GitHub Repository**
   - Git provides full revision history.
   - Future production changes should be proposed through pull requests.
   - AI agents should update Markdown, metadata, indexes, and source logs in reviewable commits.

3. **Public Website**
   - Next.js App Router, TypeScript, Tailwind CSS.
   - Static knowledge pages remain Vercel-compatible.
   - The writable feedback/admin workflow requires the documented persistent ECS data directory; file feedback fails closed on Vercel instead of acknowledging `/tmp` data as saved.
   - Search is the primary navigation surface.

## Frontmatter Contract

Every article must include:

```yaml
title:
slug:
device: []
category:
tags: []
aliases: []
verification:
difficulty:
updated:
official_sources: []
community_sources: []
status:
popular:
```

This is the legacy v1 contract. New structured content may use Article Schema v2 through the non-breaking dual-read adapter. Networking Wi-Fi, Mac Mail, and iPad onscreen keyboard are the first three manually reviewed migration pilots; Mac System Data is the first native v2 canonical. See `docs/ARTICLE_SCHEMA_V2.md` and do not bulk-migrate existing articles.

## Folders

- `cookbook/`: Canonical Obsidian-compatible troubleshooting articles.
- `templates/`: Reusable article templates.
- `sources/`: Source notes and research logs.
- `feedback/inbox.jsonl`: Local-development feedback source of truth; production stores the same file outside the checkout through `APPLE_COOKBOOK_DATA_DIR`.
- `todos/daily-work.md`: Rebuildable human-readable projection generated from feedback submissions.
- `indexes/`: Tag, device, feature, and symptom indexes.
- `src/`: Next.js website and Markdown indexing code.
- `schemas/`: Machine-readable content contracts.
- `.github/rulesets/main.json`: Reviewable expected policy for `main`; it is never applied automatically.

## Local Development

Use the bundled Codex Node runtime if system Node is unavailable.

```bash
pnpm install
pnpm dev
pnpm verify
pnpm preview:content-v2
pnpm feedback:doctor
pnpm feedback:verify -- --snapshot /path/to/feedback-snapshot
pnpm audit:github-governance
```

The GitHub governance audit currently exits with drift because the active Phase-1 ruleset intentionally omits the not-yet-registered `Validate pull request` check. Publish the workflow and its complete dependency closure in a PR; after that PR's check succeeds, add the required context to ruleset ID `18863035` before merging. Feedback backups are deliberately opt-in; follow `docs/FEEDBACK_RECOVERY.md` and store snapshots outside both the checkout and live data directory.

In this Codex workspace, Node is available at:

```bash
PATH="/Users/calvinchen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" /Users/calvinchen/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/pnpm dev
```
