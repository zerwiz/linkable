#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Stopping Next.js dev server and related processes..."

# Check if we're running as root
if [ "$(id -u)" -eq 0 ]; then
  echo "WARNING: Script is running as root. Proceeding with caution."
fi

# Kill next dev server on port 3000
PID=$(lsof -ti:3000 2>/dev/null || true)
if [ -n "$PID" ]; then
  echo "Killing Next.js dev server (PID: $PID)..."
  kill "$PID" 2>/dev/null || true

  # If kill fails (root-owned process), check and warn
  if ! kill -0 "$PID" 2>/dev/null; then
    echo "Successfully stopped process $PID."
  else
    echo "WARNING: Process $PID is owned by root. You may need to use 'sudo kill -9 $PID'."
  fi
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

        # Check if mini-service process is still running
        if kill -0 "$PID" 2>/dev/null; then
          echo "WARNING: Mini-service $service_name (PID: $PID) is owned by root. You may need to use 'sudo kill -9 $PID'."
        fi
      fi
    fi
  done
fi

# Kill any remaining bun processes from this project
BUN_PIDS=$(pgrep -f "bun run dev" 2>/dev/null | head -5 || true)
if [ -n "$BUN_PIDS" ]; then
  echo "Killing remaining bun dev processes..."
  echo "$BUN_PIDS" | xargs kill 2>/dev/null || true

  # Check if any processes are still running
  REMAINING_PIDS=$(echo "$BUN_PIDS" | xargs kill -0 2>/dev/null | grep -o '[0-9]*' || true)
  if [ -n "$REMAINING_PIDS" ]; then
    echo "WARNING: Some bun processes are still running and owned by root. You may need to use 'sudo kill -9 $REMAINING_PIDS'."
  fi
fi

echo "Done."
echo ""
echo "Note: If the Next.js server was started with sudo or is owned by root,"
echo "you may need to use 'sudo kill -9 <PID>' to stop it."
echo "To verify, run: ps aux | grep 'node dist/server'"
