# Apple Cookbook Phases

Apple Cookbook should be built in deliberate phases. Do not add advanced AI or ingestion features until the foundation remains clean, searchable, and easy to maintain.

## Phase 1: Foundation

Status: Active

Goals:

- Initialize the Git repository.
- Design the folder structure.
- Define the Markdown article schema.
- Create a beautiful Apple-inspired UI.
- Implement full-text search.
- Support dark mode.
- Support categories and tags.

Acceptance criteria:

- Articles live as portable Markdown under `cookbook/`.
- Every article uses the required YAML frontmatter.
- The website builds from Markdown files, not a database.
- Search covers title, aliases, tags, category, excerpt, and article body.
- Category and tag pages are generated from article metadata.
- Dark mode works without changing article content.
- Generated files and dependencies are excluded from Git.

## Phase 2: Knowledge Management

Status: Planned

Goals:

- Strengthen article indexing.
- Auto-generate navigation.
- Improve related articles.
- Show recently updated articles.
- Track popular searches.

## Phase 3: AI Pipeline

Status: Planned

Goals:

- Design automated knowledge ingestion.
- Create scripts that import Apple Support articles into draft Markdown files.
- Detect duplicate topics.
- Merge overlapping articles.
- Track article freshness.

## Phase 4: Community Knowledge

Status: Planned

Goals:

- Add support for unofficial solutions.
- Record confidence levels.
- Store multiple solution paths.
- Compare official and community recommendations.

## Phase 5: Retail Intelligence

Status: Planned

Goals:

- Build Retail Troubleshooting Flow.
- Add customer wording examples.
- Add common Retail scenarios.
- Add escalation guidance.
- Add repair decision trees.

## Phase 6: AI Assistant

Status: Planned

Goals:

- Build natural language search.
- Recommend Cookbook recipes.
- Summarize solutions.
- Explain root causes.
- Become an Apple troubleshooting assistant.

