#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/apple-cookbook}"
BRANCH="${BRANCH:-main}"
SERVICE_NAME="${SERVICE_NAME:-apple-cookbook}"
SKIP_PULL="${SKIP_PULL:-0}"

if [[ "${1:-}" == "--skip-pull" ]]; then
  SKIP_PULL="1"
fi

cd "$APP_DIR"

if [[ "$SKIP_PULL" != "1" ]]; then
  git fetch origin "$BRANCH"
  git checkout "$BRANCH"
  git pull --ff-only origin "$BRANCH"
fi

corepack enable
pnpm install --frozen-lockfile
pnpm build

rm -rf .next/standalone/public .next/standalone/.next/static
cp -R public .next/standalone/public
mkdir -p .next/standalone/.next
cp -R .next/static .next/standalone/.next/static

sudo systemctl restart "$SERVICE_NAME"
sudo systemctl --no-pager --full status "$SERVICE_NAME"
