#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Stopping Next.js dev server and related processes..."

# Kill next dev server on port 3000
PID=$(lsof -ti:3000 2>/dev/null || true)
if [ -n "$PID" ]; then
  echo "Killing Next.js dev server (PID: $PID)..."
  kill "$PID" 2>/dev/null || true
else
  echo "No process found on port 3000."
fi

# Kill mini-services (bun processes in mini-services/)
if [ -d "$SCRIPT_DIR/mini-services" ]; then
  for service_dir in "$SCRIPT_DIR/mini-services"/*; do
    if [ -d "$service_dir" ]; then
      service_name=$(basename "$service_dir")
      PID=$(lsof -ti:"$(grep -o '"port":[0-9]*' "$service_dir/package.json" 2>/dev/null | head -1 | grep -o '[0-9]*')" 2>/dev/null || true)
      if [ -n "$PID" ]; then
        echo "Stopping mini-service $service_name (PID: $PID)..."
        kill "$PID" 2>/dev/null || true
      fi
    fi
  done
fi

# Kill any remaining bun processes from this project
BUN_PIDS=$(pgrep -f "bun run dev" 2>/dev/null | head -5 || true)
if [ -n "$BUN_PIDS" ]; then
  echo "Killing remaining bun dev processes..."
  echo "$BUN_PIDS" | xargs kill 2>/dev/null || true
fi

echo "Done."
