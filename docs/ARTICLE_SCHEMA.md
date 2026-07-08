# Markdown Article Schema

Apple Cookbook articles are Obsidian-compatible Markdown files with YAML frontmatter.

Article bodies must remain in Markdown. Do not store article bodies in a database.

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
  - https://support.apple.com/example
community_sources: []
status: seed
popular: true
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
- `official_sources`: Official Apple URLs.
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
