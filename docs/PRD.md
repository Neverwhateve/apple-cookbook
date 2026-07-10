# Apple Cookbook Product Requirement Document

Last Updated: 2026-07-09

## Product Vision

Apple Cookbook is a long-term Apple troubleshooting knowledge platform for Apple Retail employees.

It is not a blog, documentation mirror, or bookmark collection. It is a practical diagnosis-first encyclopedia that helps Specialists, Creatives, and Technical Specialists solve customer problems faster while clearly separating official Apple guidance from community-verified unofficial workarounds.

The product should feel closer to Apple Developer Documentation, Notion, and Raycast than a traditional wiki:

- Fast to search
- Easy to scan
- Beautiful but quiet
- Structured for thousands of articles
- Portable through Markdown
- Friendly to future AI agents
- Designed for real Retail troubleshooting

Primary product promise:

> A Retail employee can type how a customer describes a problem, find the canonical troubleshooting recipe in seconds, understand why the issue happens, and know the fastest safe next step.

## User Personas

### Retail Specialist

Needs:

- Quickly understand common customer issues
- Avoid over-troubleshooting
- Explain issues in plain customer language
- Know when to involve Technical Specialists or Apple Support

Success looks like:

- Finds the right article in under 10 seconds
- Can explain the likely cause clearly
- Knows the official recommendation
- Knows when not to continue troubleshooting

### Technical Specialist

Needs:

- Fast diagnosis order
- Clear escalation and repair boundaries
- Known issue patterns across devices and services
- Confidence levels for unofficial workarounds

Success looks like:

- Confirms likely cause quickly
- Avoids unnecessary resets, restores, and repair intake
- Understands hardware vs software vs account-service boundaries
- Can document or update cases consistently

### Creative

Needs:

- Explain features and workflows clearly
- Troubleshoot customer setup issues
- Connect related Apple ecosystem features

Success looks like:

- Teaches customers why a feature behaves a certain way
- Finds related issues across Continuity, iCloud, Family Sharing, and privacy settings

### Future AI Agent

Needs:

- Predictable article schema
- Canonical slugs and metadata
- Source traceability
- Duplicate detection signals
- Clear official/community separation

Success looks like:

- Creates draft articles safely
- Updates existing canonical articles instead of creating duplicates
- Adds source references and freshness metadata
- Suggests related articles without corrupting the knowledge base

## Information Architecture

The product should support multiple navigation paths because Retail questions rarely begin with the correct feature name.

Primary navigation:

- Global search

Secondary navigation:

- Categories
- Devices
- Tags
- Recently updated
- Popular searches
- Popular recipes
- Related articles

Core category groups:

- iPhone
- iPad
- Mac
- Apple Watch
- AirPods
- Apple TV
- HomePod
- Vision Pro
- Apple ID
- iCloud
- Continuity
- Family Sharing
- Networking
- Accessibility
- Retail Cases

Article discovery should support:

- Customer wording
- Apple feature names
- Error messages
- Device names
- Service names
- Chinese and English aliases
- Related problem chains

Example relationship:

Location Sharing not working -> Find My -> Family Sharing -> Apple ID -> Privacy -> Network

## Knowledge Architecture

Markdown is the source of truth.

Requirements:

- Each article is an individual Markdown file.
- Article bodies are never stored in a database.
- Markdown must be Obsidian-compatible.
- YAML frontmatter powers search, routing, filters, related articles, and future AI workflows.
- Sources must be preserved as structured metadata.
- Official and unofficial solutions must be separated.
- Duplicate topics must be merged into canonical articles over time.

Verification levels:

- Official
- Verified
- Likely
- Experimental
- Unknown

Source priority:

1. Apple Support China (`support.apple.com/zh-cn`)
2. Apple Support Community
3. Apple Platform Security Documentation
4. Apple Developer Documentation
5. Apple Release Notes
6. Reddit
7. Xiaohongshu
8. MacRumors Forums
9. StackExchange Ask Different
10. Trusted technical blogs

Knowledge quality rules:

- Official Apple guidance is preferred.
- Official Apple Support citations should use Apple China pages when available.
- Community workarounds are always labeled unofficial.
- Community reports require repeated independent confirmation before being marked Verified.
- Unsafe or obsolete suggestions should be documented as rejected, not silently ignored.
- Every article should teach diagnosis, not only list steps.

## Article Structure

Every article follows the same structure.

Required sections:

1. Title
2. Problem Summary
3. Symptoms
4. Possible Causes
5. Official Apple Solution
6. Community Verified Workarounds
7. Retail Troubleshooting Flow
8. Escalation Guidance
9. Related Problems
10. Tags
11. Metadata

Required frontmatter:

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

Article writing rules:

- Be concise.
- Use bullets and checklists.
- Avoid long paragraphs.
- Rank possible causes by probability.
- Explain why the issue happens.
- Include common customer wording.
- Include the fastest Retail troubleshooting order.
- Include when not to use a workaround.
- Include when to stop and escalate.

## Repository Structure

Target structure:

```text
/
  cookbook/
    iPhone/
    iPad/
    Mac/
    Apple Watch/
    AirPods/
    Apple TV/
    HomePod/
    Vision Pro/
    Apple ID/
    iCloud/
    Continuity/
    Family Sharing/
    Networking/
    Accessibility/
    Retail Cases/
  docs/
    PRD.md
    PHASES.md
    ARTICLE_SCHEMA.md
  templates/
    article-template.md
  sources/
    source-log-template.md
  indexes/
    tags.md
  public/
  src/
```

Repository principles:

- `cookbook/` contains canonical knowledge.
- `docs/` contains product, architecture, and process documents.
- `templates/` contains reusable authoring templates.
- `sources/` contains research logs and source review notes.
- `indexes/` contains manually curated or generated index references.
- `src/` contains the public website application.
- Generated build output and dependencies are ignored by Git.

Git principles:

- Every meaningful change should be committed.
- Production updates should eventually happen through pull requests.
- Future AI agents should create reviewable diffs, not mutate production invisibly.

## Search Strategy

Search is the primary navigation.

Search should think like a customer, not like a feature index.

Supported query types:

- Natural language symptoms
- Exact error messages
- Feature names
- Device names
- Settings names
- Chinese aliases
- English aliases
- Common shorthand
- Related symptoms

Searchable fields:

- Title
- Slug
- Category
- Tags
- Aliases
- Symptoms
- Problem summary
- Article body
- Official source titles or URLs
- Community source titles or URLs

Example search behavior:

- Query: "My wife's location cannot be seen"
- Expected result: Location Sharing Not Working in Find My

- Query: "老婆位置看不到"
- Expected result: Location Sharing Not Working in Find My

- Query: "AirDrop keeps waiting"
- Expected result: AirDrop Keeps Waiting or Cannot Find Device

Phase 1 search:

- Local full-text search over parsed Markdown and metadata.
- Fuzzy matching through aliases and weighted fields.

Future search:

- Semantic search
- AI query rewriting
- Duplicate suggestion
- Search analytics
- Popular search tracking
- Multi-language expansion

## UI Principles

The interface should feel Apple-inspired:

- Minimal
- Elegant
- Fast
- Quiet
- Typography-led
- High contrast
- Responsive
- Beautiful in both light and dark mode

Interaction principles:

- Search first.
- Articles must be easy to scan.
- Metadata should support confidence, not distract.
- Source links should be visible but secondary.
- Official and unofficial sections must be visually and structurally distinct.
- Avoid clutter, heavy cards, decorative graphics, and blog-like layouts.

Reading experience:

- Clear title
- Short summary
- Fast jump to Retail flow
- Visible verification level
- Visible last updated date
- Related articles near the article
- Tags available for cross-navigation

Dark mode:

- Should be first-class, not an afterthought.
- Preserve readability and source hierarchy.
- Avoid low-contrast gray-on-black text.

## Future AI Integration

AI should assist knowledge management, not replace source verification.

Future AI capabilities:

- Create draft articles from official sources
- Import Apple Support pages into structured Markdown drafts
- Suggest aliases based on customer language
- Suggest related articles
- Detect duplicate topics
- Merge overlapping articles
- Flag stale articles
- Compare official recommendations with community workarounds
- Summarize root causes
- Recommend troubleshooting recipes from natural language queries

AI safety rules:

- AI-generated articles begin as drafts.
- Official source claims require citations.
- Community workarounds require explicit unofficial labeling.
- AI must not invent Apple policy.
- AI must not present unofficial solutions as official.
- AI should preserve revision history through Git.

Ingestion workflow concept:

1. Collect source URL.
   - Prefer Apple China URLs (`support.apple.com/zh-cn`) for official Apple Support sources.
2. Extract article title, symptoms, steps, supported systems, and date.
3. Create or update a draft Markdown file.
4. Compare with existing articles for duplicates.
5. Add aliases based on customer wording.
6. Mark verification level.
7. Submit as a pull request for review.

Operational cadence:

- Run source harvest and article review work every 3 hours.
- Batch GitHub publication once per week on Wednesday.
- Wednesday source harvests still follow the 3-hour cadence; they do not each trigger a GitHub publication.
- Keep interim source notes, drafts, and article updates local until the weekly GitHub publication window.

## Technology Stack

Foundation stack:

- Markdown for article content
- YAML frontmatter for metadata
- Git for revision history
- GitHub for collaboration and pull requests
- Next.js App Router for the website
- TypeScript for maintainability
- Tailwind CSS for styling
- Vercel for deployment

Design constraints:

- No proprietary content database for article bodies.
- No rich text editor requirement in Phase 1.
- No advanced AI ingestion before the foundation is stable.
- No community scraping pipeline before official-source handling is designed.

Potential future stack additions:

- Search index generation
- Vector embeddings
- Scheduled freshness checks
- GitHub Actions validation
- Source import scripts
- Duplicate detection scripts
- AI-assisted review tools

## Development Roadmap

### Phase 1: Foundation

Goal:

Build the stable base of the platform.

Scope:

- Initialize repository
- Define folder structure
- Define Markdown schema
- Create article template
- Build Apple-inspired UI
- Implement full-text search
- Support dark mode
- Support categories and tags

Exit criteria:

- The app can render Markdown articles from `cookbook/`.
- Search works across metadata and article content.
- Categories and tags are navigable.
- The product can be deployed to Vercel.
- The repository is clean and maintainable.

### Phase 2: Knowledge Management

Goal:

Make the knowledge base easier to maintain as articles grow.

Scope:

- Build stronger article indexing
- Auto-generate navigation
- Improve related articles
- Show recently updated articles
- Add popular searches
- Add metadata validation

Exit criteria:

- New articles automatically appear in the right navigation surfaces.
- Missing metadata is caught before deployment.
- Related articles are useful and explainable.

### Phase 3: AI Pipeline

Goal:

Design safe automated ingestion.

Scope:

- Import Apple Support articles into draft Markdown
- Detect duplicate topics
- Merge overlapping articles
- Track freshness
- Preserve source attribution

Exit criteria:

- AI-created content enters as drafts.
- Official source imports are traceable.
- Duplicate detection prevents article sprawl.

### Phase 4: Community Knowledge

Goal:

Add carefully verified unofficial knowledge.

Scope:

- Support unofficial solution records
- Record confidence levels
- Store multiple solution paths
- Compare official and community recommendations
- Track risks and when not to use workarounds

Exit criteria:

- Community knowledge is useful but never confused with official Apple guidance.

### Phase 5: Retail Intelligence

Goal:

Make articles deeply useful for real Retail troubleshooting.

Scope:

- Retail Troubleshooting Flow
- Customer wording examples
- Common Retail scenarios
- Escalation guidance
- Repair decision trees

Exit criteria:

- Articles help employees decide what to do first, what to skip, and when to stop.

### Phase 6: AI Assistant

Goal:

Turn Apple Cookbook into an Apple troubleshooting assistant.

Scope:

- Natural language search
- Recipe recommendations
- Solution summaries
- Root cause explanations
- Guided troubleshooting

Exit criteria:

- Users can describe a customer issue naturally and receive relevant, source-grounded troubleshooting guidance.
