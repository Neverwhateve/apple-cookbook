#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/apple-cookbook}"
BRANCH="${BRANCH:-main}"
SERVICE_NAME="${SERVICE_NAME:-apple-cookbook}"
SKIP_PULL="${SKIP_PULL:-0}"
LOCAL_HEALTH_URL="${LOCAL_HEALTH_URL:-http://127.0.0.1:3000}"

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

if [[ ! -d .next/standalone ]]; then
  echo "Missing .next/standalone. Set output: \"standalone\" in next.config.ts before deploying to ECS." >&2
  exit 1
fi

rm -rf .next/standalone/public .next/standalone/cookbook
cp -R public .next/standalone/public
cp -R cookbook .next/standalone/cookbook
mkdir -p .next/standalone/.next/static
cp -R .next/static/. .next/standalone/.next/static/

sudo systemctl restart "$SERVICE_NAME"
sudo systemctl --no-pager --full status "$SERVICE_NAME"

for attempt in {1..10}; do
  if curl --fail --silent --show-error --max-time 5 "$LOCAL_HEALTH_URL" >/dev/null; then
    echo "Local health check passed: $LOCAL_HEALTH_URL"
    exit 0
  fi

  sleep 2
done

echo "Local health check failed: $LOCAL_HEALTH_URL" >&2
exit 1
