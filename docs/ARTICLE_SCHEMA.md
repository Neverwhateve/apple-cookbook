# Markdown Article Schema

Apple Cookbook articles are Obsidian-compatible Markdown files with YAML frontmatter.

Article bodies must remain in Markdown. Do not store article bodies in a database.

This document describes the legacy v1 contract. New structured content uses the additive v2 contract in [`ARTICLE_SCHEMA_V2.md`](./ARTICLE_SCHEMA_V2.md). The controlled v1 Official migration is documented there; new or materially revised articles must use v2.

## Required Frontmatter

```yaml
title: Location Sharing Not Working in Find My
slug: location-sharing-not-working
device:
  - iPhone
category: Find My
tags:
  - Find My
  - Location Sharing
aliases:
  - My wife's location cannot be seen
verification: Official
difficulty: Moderate
updated: 2026-07-08
official_sources:
  - https://support.apple.com/zh-cn/example
community_sources: []
status: seed
popular: false
```

The machine-readable schema lives at `schemas/article.schema.json`.

## Field Rules

- `title`: Human-readable article title.
- `slug`: Stable URL segment. Use lowercase words separated by hyphens.
- `device`: One or more affected Apple devices.
- `category`: Primary knowledge area. Should match a folder under `cookbook/`.
- `tags`: Searchable feature, system, account, network, privacy, repair, and accessory labels.
- `aliases`: Customer wording in English, Chinese, and common shorthand.
- `verification`: One of `Official`, `Verified`, `Likely`, `Experimental`, `Unknown`.
- `difficulty`: One of `Quick`, `Moderate`, `Advanced`.
- `updated`: ISO date.
- `official_sources`: Official Apple URLs. Prefer Apple China URLs (`support.apple.com/zh-cn`) for support articles and localized Apple guides.
- `community_sources`: Community URLs. These must never be presented as official.
- `status`: One of `seed`, `draft`, `reviewed`, `canonical`.
- `popular`: Boolean used for homepage highlighting.

## Required Body Sections

Use the template at `templates/article-template.md`.

Every article must include:

- Symptoms
- Possible Causes
- Official Apple Solution
- Community Verified Workarounds
- Retail Troubleshooting Flow
- Escalation
- Related Problems
- Tags
- Metadata
