#!/usr/bin/env bash
# Grep gate for venture-factory theater phrases banned from public copy.
# Scoped to app/ so it catches source, JSON-LD, OG images, and llms.txt —
# surfaces Playwright's instant() assertions can't see (image source, route
# handler text). See documents/DECISIONS.md for the banned-phrase ADR.
set -euo pipefail

cd "$(dirname "$0")/.."

PHRASES=(
  "zero employees"
  "Zero Employees"
  "24/7"
  "autonomous"
  "Math works in your favor"
  "dozens of ventures"
  "every venture is real"
  "AI Venture Factory"
  "in real time"
  "open source"
  "while you sleep"
  "around the clock"
  "AI Agents Run Everything"
  "portfolio of bets"
)

found=0

for phrase in "${PHRASES[@]}"; do
  matches=$(grep -rniF "$phrase" app --include="*.ts" --include="*.tsx" || true)
  if [ -n "$matches" ]; then
    echo "Banned phrase found: \"$phrase\""
    echo "$matches"
    echo
    found=1
  fi
done

if [ "$found" -eq 1 ]; then
  echo "check-banned-phrases: FAILED"
  exit 1
fi

echo "check-banned-phrases: OK — no banned phrases found in app/"
