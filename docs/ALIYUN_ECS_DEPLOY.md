# Deploy on Alibaba Cloud ECS

This deployment keeps the Next.js server running on ECS so the feedback form can write submissions to a persistent directory.

## Target Architecture

- ECS in a mainland China region.
- Nginx terminates HTTPS and proxies to Next.js on `127.0.0.1:3000`.
- Next.js runs as a `systemd` service.
- Feedback data is stored outside the app release directory at `/var/lib/apple-cookbook`.

## DNS

Add an A record for the subdomain, for example:

```text
cookbook.example.com -> ECS public IPv4
```

Use a domain that is already filed through Alibaba Cloud ICP. Keep the ICP number visible in the site footer if required for the public site.

## Server Packages

Install Node.js 22 or 24, pnpm, Git, and Nginx on the ECS instance.

For Alibaba Cloud Linux / CentOS-like images:

```bash
sudo dnf install -y git nginx
corepack enable
corepack prepare pnpm@11.7.0 --activate
```

If Node.js is not already available, install it with your preferred Node version manager or the NodeSource package source before enabling pnpm.

## First Deploy

```bash
sudo mkdir -p /opt/apple-cookbook /var/lib/apple-cookbook
sudo chown -R $USER:$USER /opt/apple-cookbook /var/lib/apple-cookbook

git clone https://github.com/Neverwhateve/apple-cookbook.git /opt/apple-cookbook
cd /opt/apple-cookbook

pnpm install --frozen-lockfile
pnpm build
cp -R public .next/standalone/public
mkdir -p .next/standalone/.next
cp -R .next/static .next/standalone/.next/static
```

## systemd Service

Create `/etc/systemd/system/apple-cookbook.service`:

```ini
[Unit]
Description=Apple Cookbook
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/apple-cookbook/.next/standalone
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=HOSTNAME=127.0.0.1
Environment=APPLE_COOKBOOK_DATA_DIR=/var/lib/apple-cookbook
Environment=APPLE_COOKBOOK_ADMIN_TOKEN=replace-with-a-long-random-token
Environment=APPLE_COOKBOOK_ADMIN_USERNAME=admin
Environment=APPLE_COOKBOOK_ADMIN_PASSWORD=replace-with-a-long-random-password
Environment=APPLE_COOKBOOK_GITHUB_TOKEN=replace-with-an-actions-write-token
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=5
User=applecookbook
Group=applecookbook

[Install]
WantedBy=multi-user.target
```

Create the service user and start the app:

```bash
sudo useradd --system --home /opt/apple-cookbook --shell /sbin/nologin applecookbook
sudo chown -R applecookbook:applecookbook /opt/apple-cookbook /var/lib/apple-cookbook
sudo systemctl daemon-reload
sudo systemctl enable --now apple-cookbook
sudo systemctl status apple-cookbook
```

## Nginx

Create `/etc/nginx/conf.d/apple-cookbook.conf` and replace `cookbook.example.com`:

```nginx
server {
    listen 80;
    server_name cookbook.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Then reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Add HTTPS with Alibaba Cloud SSL Certificates or Certbot, then update the Nginx server block to listen on `443 ssl`.

## Updating the Site

```bash
cd /opt/apple-cookbook
bash scripts/deploy-ecs.sh
```

## GitHub Actions Auto Deploy

The repository includes `.github/workflows/deploy-aliyun-ecs.yml`. It runs on every push to `main`:

1. Validate the project on GitHub Actions with `pnpm lint` and `pnpm build`.
2. SSH into ECS.
3. Stash local changes in `/opt/apple-cookbook` so server-side edits cannot block deploys.
4. Pull `main` in `/opt/apple-cookbook`.
5. Run `scripts/deploy-ecs.sh --skip-pull`.
6. Verify the local ECS service and public production URL respond successfully.

Add these repository secrets in GitHub:

```text
ALIYUN_ECS_HOST=your ECS public IP or domain
ALIYUN_ECS_USER=deploy user on ECS
ALIYUN_ECS_SSH_KEY=private SSH key for that user
ALIYUN_ECS_PORT=22
```

Optional repository variables:

```text
APP_DIR=/opt/apple-cookbook
SERVICE_NAME=apple-cookbook
LOCAL_HEALTH_URL=http://127.0.0.1:3000
PRODUCTION_URL=https://cookbook.wuxiela.fun
```

The ECS deploy user must be able to update the checkout and restart the service. One practical setup is:

```bash
sudo chown -R deploy:deploy /opt/apple-cookbook
sudo visudo
```

Add a narrow passwordless sudo rule, replacing `deploy` if your user is different:

```text
deploy ALL=(root) NOPASSWD: /bin/systemctl restart apple-cookbook, /bin/systemctl status apple-cookbook, /usr/bin/systemctl restart apple-cookbook, /usr/bin/systemctl status apple-cookbook
```

## Feedback Files

Feedback submissions are written to:

```text
/var/lib/apple-cookbook/feedback/inbox.jsonl
/var/lib/apple-cookbook/feedback/archive.jsonl
/var/lib/apple-cookbook/feedback/synced-github-issues.txt
/var/lib/apple-cookbook/todos/daily-work.md
/var/lib/apple-cookbook/article-edits/pending/*.json
/var/lib/apple-cookbook/article-edits/submitted/*.json
```

`inbox.jsonl` is the source of truth. `daily-work.md` is a rebuildable projection for human review; losing that projection must not be treated as losing the original submission.

Administrator article edits are stored as full-file, hash-bound proposals under `article-edits/pending/`. They are deliberately outside both the Git checkout and `.next/standalone`, so a restart or deployment cannot discard an edit. `publish-admin-article-edit.yml` applies one proposal to a clean `main` checkout, runs content validation, creates a Harvest manifest and ready pull request, and moves the proposal to `submitted/` after the pull request exists. The existing content-quality workflow then validates, merges, and deploys it.

All writers, including `.github/workflows/sync-feedback-intake.yml`, acquire the mkdir-style lock at `/var/lib/apple-cookbook/feedback/.queue.lock`. Do not add a maintenance script that edits inbox, archive, or synced IDs without the same lock. Individual replacements use a same-directory temporary file followed by atomic `rename`.

Back up `/var/lib/apple-cookbook` regularly. Take a queue snapshot under the shared lock so inbox and archive are from the same logical point in time. The data directory is intentionally outside the Git checkout so deploys do not overwrite submissions.

The current design serializes a single ECS data directory; it is not a multi-host transaction store. Move to SQLite on one host or an external database before running multiple writable application hosts. On Vercel, the file-backed form returns an explicit not-saved error rather than writing to ephemeral `/tmp`.

To start feedback synchronization immediately after submission, configure `APPLE_COOKBOOK_GITHUB_TOKEN` with a fine-grained GitHub token limited to Actions write access for this repository. The app dispatches `sync-feedback-intake.yml` only after the feedback record is durably stored. If dispatch fails, the record remains safe and the scheduled workflow is the fallback.

The same token dispatches `publish-admin-article-edit.yml` after an administrator submits an article change. Its scheduled fallback checks the pending proposal directory, so a temporary GitHub API failure does not lose the edit.

The publisher workflow also requires the repository Actions secret `ADMIN_ARTICLE_EDIT_PUBLISH_TOKEN`. Use a dedicated fine-grained personal access token with repository Contents and Pull requests write access. The workflow fails closed when this secret is absent and never falls back to `github.token`: pull requests opened with the automatic workflow token do not trigger another `pull_request` workflow, so that fallback would prevent the content-quality and auto-publish jobs from running. The workflow continues to use the checkout credential only for pushing its dedicated `harvest/admin-edit-*` branch.

## Admin Feedback Queue

The P0 feedback review page is available at:

```text
https://cookbook.wuxiela.fun/admin/feedback
https://cookbook.wuxiela.fun/admin/articles
```

Set either the legacy `APPLE_COOKBOOK_ADMIN_USERNAME` and `APPLE_COOKBOOK_ADMIN_PASSWORD` pair, or the preferred `APPLE_COOKBOOK_ADMIN_ACCOUNTS_BASE64` multi-account credential list, plus `APPLE_COOKBOOK_ADMIN_TOKEN` in the systemd service before using this page in production. The token is the cookie session secret and must be a unique high-entropy value of at least 43 characters; production authentication fails closed when the credential list or token is missing. The deployment workflow reads the multi-account list and session token from GitHub Actions secrets, keeping passwords out of the checkout and workflow logs.

AI no-change decisions appear in a dedicated human-review queue. Confirming a report as valid removes its old sync marker and creates a fresh P0 intake on the next synchronization run. Choosing direct article editing records a durable proposal instead; required article sections remain locked, while optional H2 sections can be removed in the editor.
