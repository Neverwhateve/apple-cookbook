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
3. Search Xiaohongshu and other community sources for high-frequency causes that official articles may omit or underweight.
4. Compare multiple independent community reports before accepting a workaround.
5. Label every solution by verification level.
6. Include when not to use a workaround.
7. Include clear escalation criteria.

## Operating Cadence

- Source harvest and article review work should continue every 3 hours.
- Every 3-hour loop must include a community reality check, especially Xiaohongshu searches in customer language, to catch practical causes that official Apple articles do not make obvious. Example: when researching "Find My cannot see someone else's location", also check whether Messages/iMessage setup, Send & Receive identity, or contact/account mismatch appears repeatedly as a cause.
- Treat Xiaohongshu findings as discovery and prioritization signals unless the post body is accessible and corroborated. Keep official Apple guidance first, but add well-supported community causes as clearly labeled unofficial or likely branches.
- GitHub publication is batched once per week on Wednesday.
- Wednesday source harvests still follow the 3-hour cadence; they do not each trigger a GitHub publication.
- Between Wednesday releases, keep harvested notes, drafts, and updates local and reviewable.

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
   - Designed for Vercel deployment.
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

## Folders

- `cookbook/`: Canonical Obsidian-compatible troubleshooting articles.
- `templates/`: Reusable article templates.
- `sources/`: Source notes and research logs.
- `feedback/inbox.jsonl`: Structured website submissions for automation.
- `todos/daily-work.md`: Human-readable daily review checklist generated from submissions.
- `indexes/`: Tag, device, feature, and symptom indexes.
- `src/`: Next.js website and Markdown indexing code.
- `schemas/`: Machine-readable content contracts.

## Local Development

Use the bundled Codex Node runtime if system Node is unavailable.

```bash
pnpm install
pnpm dev
```

In this Codex workspace, Node is available at:

```bash
PATH="/Users/calvinchen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" /Users/calvinchen/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/pnpm dev
```
