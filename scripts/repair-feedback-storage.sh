#!/usr/bin/env bash
set -euo pipefail

FEEDBACK_DATA_DIR="${FEEDBACK_DATA_DIR:-/var/lib/apple-cookbook}"
FEEDBACK_SERVICE_USER="${FEEDBACK_SERVICE_USER:-applecookbook}"
FEEDBACK_SERVICE_GROUP="${FEEDBACK_SERVICE_GROUP:-$FEEDBACK_SERVICE_USER}"

if (( EUID != 0 )); then
  exec sudo -n env \
    FEEDBACK_DATA_DIR="$FEEDBACK_DATA_DIR" \
    FEEDBACK_SERVICE_USER="$FEEDBACK_SERVICE_USER" \
    FEEDBACK_SERVICE_GROUP="$FEEDBACK_SERVICE_GROUP" \
    bash "$0"
fi

if ! id "$FEEDBACK_SERVICE_USER" >/dev/null 2>&1; then
  echo "Feedback service user does not exist: $FEEDBACK_SERVICE_USER" >&2
  exit 1
fi
if ! getent group "$FEEDBACK_SERVICE_GROUP" >/dev/null 2>&1; then
  echo "Feedback service group does not exist: $FEEDBACK_SERVICE_GROUP" >&2
  exit 1
fi

install -d -o "$FEEDBACK_SERVICE_USER" -g "$FEEDBACK_SERVICE_GROUP" -m 0700 \
  "$FEEDBACK_DATA_DIR" \
  "$FEEDBACK_DATA_DIR/feedback" \
  "$FEEDBACK_DATA_DIR/todos"

chown -R "$FEEDBACK_SERVICE_USER:$FEEDBACK_SERVICE_GROUP" "$FEEDBACK_DATA_DIR"
find "$FEEDBACK_DATA_DIR" -type d -exec chmod 0700 {} +
find "$FEEDBACK_DATA_DIR" -type f -exec chmod 0600 {} +

sudo -n -u "$FEEDBACK_SERVICE_USER" test -w "$FEEDBACK_DATA_DIR/feedback"
sudo -n -u "$FEEDBACK_SERVICE_USER" test -w "$FEEDBACK_DATA_DIR/todos"

echo "Feedback storage permissions repaired for $FEEDBACK_SERVICE_USER:$FEEDBACK_SERVICE_GROUP."
