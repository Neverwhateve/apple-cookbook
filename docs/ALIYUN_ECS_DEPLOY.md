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
git pull --ff-only
pnpm install --frozen-lockfile
pnpm build
rm -rf .next/standalone/public .next/standalone/.next/static
cp -R public .next/standalone/public
mkdir -p .next/standalone/.next
cp -R .next/static .next/standalone/.next/static
sudo systemctl restart apple-cookbook
```

## Feedback Files

Feedback submissions are written to:

```text
/var/lib/apple-cookbook/feedback/inbox.jsonl
/var/lib/apple-cookbook/todos/daily-work.md
```

Back up `/var/lib/apple-cookbook` regularly. It is intentionally outside the Git checkout so deploys do not overwrite submissions.
