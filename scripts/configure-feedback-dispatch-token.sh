#!/usr/bin/env bash
set -euo pipefail

SERVICE_NAME="${SERVICE_NAME:-apple-cookbook}"
RUNTIME_ENV_FILE="${RUNTIME_ENV_FILE:-/etc/apple-cookbook/runtime.env}"
SYSTEMD_DROP_IN_DIR="${SYSTEMD_DROP_IN_DIR:-/etc/systemd/system/${SERVICE_NAME}.service.d}"
SYSTEMCTL_BIN="${SYSTEMCTL_BIN:-$(command -v systemctl)}"

if [[ ! "$SERVICE_NAME" =~ ^[A-Za-z0-9_.@-]+$ ]]; then
  echo "Invalid service name." >&2
  exit 1
fi

if (( EUID != 0 )); then
  exec sudo -n env \
    SERVICE_NAME="$SERVICE_NAME" \
    RUNTIME_ENV_FILE="$RUNTIME_ENV_FILE" \
    SYSTEMD_DROP_IN_DIR="$SYSTEMD_DROP_IN_DIR" \
    SYSTEMCTL_BIN="$SYSTEMCTL_BIN" \
    bash "$0"
fi

token=""
IFS= read -r token || true

if [[ -z "$token" ]]; then
  echo "APPLE_COOKBOOK_GITHUB_TOKEN is empty." >&2
  exit 1
fi

if IFS= read -r _; then
  echo "APPLE_COOKBOOK_GITHUB_TOKEN must be a single line." >&2
  exit 1
fi

if [[ ! "$token" =~ ^[A-Za-z0-9_]+$ ]]; then
  echo "APPLE_COOKBOOK_GITHUB_TOKEN contains unsupported characters." >&2
  exit 1
fi

runtime_dir=$(dirname "$RUNTIME_ENV_FILE")
install -d -o root -g root -m 0700 "$runtime_dir"
install -d -o root -g root -m 0755 "$SYSTEMD_DROP_IN_DIR"

runtime_temp=$(mktemp "$runtime_dir/.runtime.env.XXXXXX")
drop_in_temp=$(mktemp "$SYSTEMD_DROP_IN_DIR/.feedback-dispatch.XXXXXX")

cleanup() {
  rm -f "$runtime_temp" "$drop_in_temp"
}
trap cleanup EXIT

if [[ -f "$RUNTIME_ENV_FILE" ]]; then
  while IFS= read -r line || [[ -n "$line" ]]; do
    if [[ "$line" != APPLE_COOKBOOK_GITHUB_TOKEN=* ]]; then
      printf '%s\n' "$line"
    fi
  done < "$RUNTIME_ENV_FILE" > "$runtime_temp"
fi
printf 'APPLE_COOKBOOK_GITHUB_TOKEN=%s\n' "$token" >> "$runtime_temp"
chown root:root "$runtime_temp"
chmod 0600 "$runtime_temp"
mv -f "$runtime_temp" "$RUNTIME_ENV_FILE"

printf '[Service]\nEnvironmentFile=%s\n' "$RUNTIME_ENV_FILE" > "$drop_in_temp"
chown root:root "$drop_in_temp"
chmod 0644 "$drop_in_temp"
mv -f "$drop_in_temp" "$SYSTEMD_DROP_IN_DIR/feedback-dispatch.conf"

"$SYSTEMCTL_BIN" daemon-reload

echo "Immediate feedback synchronization credential configured for $SERVICE_NAME."
