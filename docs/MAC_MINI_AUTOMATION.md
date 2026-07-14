# Mac mini Codex Automation

Apple Cookbook uses the Mac mini for AI work and the Alibaba Cloud ECS host only
for the website, persistent feedback data, and production deployment. The Mac
mini reuses the locally saved ChatGPT/Codex login; this path does not require an
OpenAI API key.

## Runtime split

- The Codex app automation runs one routine Harvest cycle every two hours.
- `scripts/mac-feedback-watcher.sh` polls GitHub for open Issues carrying `P0`,
  `feedback-intake`, and `content-bug`. Polling does not call a model.
- A durable website submission dispatches `sync-feedback-intake.yml`. That
  workflow copies the ECS feedback record into a GitHub Issue without exposing
  the reporter name.
- The watcher invokes `codex exec` only after a new content Bug appears.
- If Codex finds no justified content change, the watcher records its conclusion
  on the Issue, applies `needs-human-review`, and requests an immediate feedback
  sync instead of treating the report as finally resolved.
- Codex works in a dedicated clean checkout and can change only
  `cookbook/*.md` and `indexes/*.md`.
- A deterministic publisher runs validation, creates the Harvest manifest,
  pushes a `harvest/*` branch, and opens a ready PR after Codex exits.
- Content-quality CI merges and deploys only after every check passes.

## Security boundary

The watcher explicitly removes API-key and GitHub-token environment variables
from the Codex process. It runs Codex with `workspace-write`, approvals disabled,
shell network access disabled, user config ignored, and an ephemeral session.
The untrusted Issue JSON is evidence, never instructions.

Keep the Mac login and `~/.codex` private. The saved Codex authentication is a
credential. The dedicated worker checkout must never process pull-request heads
or arbitrary branches; every run resets to `origin/main`.

## Prerequisites

1. Install and sign in to the ChatGPT or Codex Mac app.
2. Confirm `/Applications/ChatGPT.app/Contents/Resources/codex login status`
   reports a ChatGPT login.
3. Install GitHub CLI and run `gh auth login` with permission to create labels,
   branches, pull requests, Issue comments, and workflow runs for this repo.
4. Keep the Mac mini awake and connected to the internet.
5. Configure the ECS website service with a fine-grained
   `APPLE_COOKBOOK_GITHUB_TOKEN` limited to Actions write for this repository so
   a durable submission can dispatch feedback synchronization immediately.

No OpenAI API key is needed.

## Install the watcher

From the trusted main checkout:

```bash
chmod +x scripts/mac-feedback-watcher.sh scripts/install-mac-feedback-watcher.sh
bash scripts/install-mac-feedback-watcher.sh
```

The installer creates a per-user LaunchAgent named
`fun.wuxiela.apple-cookbook-feedback-watcher`. It starts at login and macOS
restarts it if it exits.

Check status:

```bash
launchctl print "gui/$(id -u)/fun.wuxiela.apple-cookbook-feedback-watcher"
```

Read diagnostics:

```bash
tail -n 100 "$HOME/Library/Logs/Apple Cookbook/feedback-watcher-error.log"
```

Worker state and private task logs live below:

```text
~/Library/Application Support/Apple Cookbook Codex/
```

Do not publish that directory or attach it to a public Issue.

## Issue states

- `codex-processing`: the Mac mini has claimed the Bug.
- `codex-published`: a ready automatic publication PR exists; the two-hour
  automation follows CI, deployment, and production verification.
- `codex-failed`: processing stopped without publication. Inspect the private
  Mac log, correct the cause, then remove this label to retry.
- `needs-human-review`: Codex found no justified content change. The watcher
  removes `codex-processing`, posts a structured conclusion, closes the Issue so
  it is not claimed again, and leaves the final validity decision to an
  administrator.

The feedback synchronization workflow recognizes `needs-human-review` on the
latest Issue for a Feedback ID. While that ID still has its ECS synced marker,
the workflow keeps the record in `feedback/inbox.jsonl`, changes its status to
`needs_review`, and saves `automationReview` with the `no_content_change`
outcome, review time, conclusion, and Issue URL. Removing the synced marker
while re-queuing an item is the human-decision boundary: a stale closed Issue
cannot move that item back to review. Closed Issues without
`needs-human-review` keep the existing resolved/archive behavior.

When verification creates a PR, the Issue remains open until the production
result is verified.

## Stop or restart

Stop without deleting state:

```bash
launchctl bootout \
  "gui/$(id -u)/fun.wuxiela.apple-cookbook-feedback-watcher"
```

Restart after reinstalling or updating:

```bash
bash scripts/install-mac-feedback-watcher.sh
```

Stopping this watcher does not lose feedback. The ECS inbox remains the source
of truth and the three-hour GitHub synchronization schedule remains a fallback.
