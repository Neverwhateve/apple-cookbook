#!/usr/bin/env bash
set -euo pipefail

LABEL="fun.wuxiela.apple-cookbook-feedback-watcher"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
LOG_DIR="$HOME/Library/Logs/Apple Cookbook"
USER_DOMAIN="gui/$(id -u)"

CODEX_BIN=""
for candidate in \
  /Applications/ChatGPT.app/Contents/Resources/codex \
  /Applications/Codex.app/Contents/Resources/codex; do
  if [[ -x "$candidate" ]]; then CODEX_BIN="$candidate"; break; fi
done

if [[ -z "$CODEX_BIN" ]]; then
  echo "请先安装或打开 ChatGPT/Codex Mac 应用。" >&2
  exit 1
fi
if ! command -v gh >/dev/null 2>&1; then
  echo "缺少 GitHub CLI（gh）。" >&2
  exit 1
fi

"$CODEX_BIN" login status
gh auth status --hostname github.com

mkdir -p "$HOME/Library/LaunchAgents" "$LOG_DIR"
chmod 700 "$LOG_DIR"

escaped_repo="$(printf '%s' "$REPO_DIR" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g')"
escaped_home="$(printf '%s' "$HOME" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g')"

temp_plist="$(mktemp "$HOME/Library/LaunchAgents/.$LABEL.XXXXXX")"
cat > "$temp_plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>$LABEL</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>$escaped_repo/scripts/mac-feedback-watcher.sh</string>
  </array>
  <key>WorkingDirectory</key>
  <string>$escaped_repo</string>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>30</integer>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>$escaped_home</string>
  </dict>
  <key>StandardOutPath</key>
  <string>$escaped_home/Library/Logs/Apple Cookbook/feedback-watcher.log</string>
  <key>StandardErrorPath</key>
  <string>$escaped_home/Library/Logs/Apple Cookbook/feedback-watcher-error.log</string>
</dict>
</plist>
PLIST

plutil -lint "$temp_plist" >/dev/null
chmod 600 "$temp_plist"
mv "$temp_plist" "$PLIST"

launchctl bootout "$USER_DOMAIN/$LABEL" >/dev/null 2>&1 || true
launchctl bootstrap "$USER_DOMAIN" "$PLIST"
launchctl kickstart -k "$USER_DOMAIN/$LABEL"

echo "Mac mini 内容 Bug 监听器已启动。"
echo "状态：launchctl print $USER_DOMAIN/$LABEL"
echo "日志：$LOG_DIR/feedback-watcher-error.log"
