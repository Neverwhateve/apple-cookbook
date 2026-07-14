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

accounts_base64=""
session_token=""
IFS= read -r accounts_base64 || true
IFS= read -r session_token || true

if [[ -z "$accounts_base64" || -z "$session_token" ]]; then
  echo "Administrator accounts and session token are required." >&2
  exit 1
fi

if IFS= read -r _; then
  echo "Administrator credentials must contain exactly two lines." >&2
  exit 1
fi

if [[ ! "$accounts_base64" =~ ^[A-Za-z0-9+/]+={0,2}$ ]] || (( ${#accounts_base64} > 8192 )); then
  echo "Administrator account payload is invalid." >&2
  exit 1
fi

if (( ${#session_token} < 43 )); then
  echo "Administrator session token is too short." >&2
  exit 1
fi

runtime_dir=$(dirname "$RUNTIME_ENV_FILE")
install -d -o root -g root -m 0700 "$runtime_dir"
install -d -o root -g root -m 0755 "$SYSTEMD_DROP_IN_DIR"

runtime_temp=$(mktemp "$runtime_dir/.runtime.env.XXXXXX")
drop_in_temp=$(mktemp "$SYSTEMD_DROP_IN_DIR/.admin-accounts.XXXXXX")

cleanup() {
  rm -f "$runtime_temp" "$drop_in_temp"
}
trap cleanup EXIT

if [[ -f "$RUNTIME_ENV_FILE" ]]; then
  while IFS= read -r line || [[ -n "$line" ]]; do
    if [[ "$line" != APPLE_COOKBOOK_ADMIN_ACCOUNTS_BASE64=* && "$line" != APPLE_COOKBOOK_ADMIN_TOKEN=* ]]; then
      printf '%s\n' "$line"
    fi
  done < "$RUNTIME_ENV_FILE" > "$runtime_temp"
fi

printf 'APPLE_COOKBOOK_ADMIN_ACCOUNTS_BASE64=%s\n' "$accounts_base64" >> "$runtime_temp"
printf 'APPLE_COOKBOOK_ADMIN_TOKEN=%s\n' "$session_token" >> "$runtime_temp"
chown root:root "$runtime_temp"
chmod 0600 "$runtime_temp"
mv -f "$runtime_temp" "$RUNTIME_ENV_FILE"

printf '[Service]\nEnvironmentFile=%s\n' "$RUNTIME_ENV_FILE" > "$drop_in_temp"
chown root:root "$drop_in_temp"
chmod 0644 "$drop_in_temp"
mv -f "$drop_in_temp" "$SYSTEMD_DROP_IN_DIR/admin-accounts.conf"

"$SYSTEMCTL_BIN" daemon-reload

echo "Administrator account configuration updated for $SERVICE_NAME."
