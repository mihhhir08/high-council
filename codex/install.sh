#!/usr/bin/env bash
# Installs the council's roles as Codex agents.
#
# Codex plugins can ship skills, MCP servers and hooks, but not agents, so the
# fourteen roles have to be copied into your Codex agents directory once.
# Re-run it after updating the plugin to pick up changed roles.
set -euo pipefail

src="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/agents"
dest="${CODEX_HOME:-$HOME/.codex}/agents"

if [ ! -d "$src" ]; then
  echo "error: $src not found. Run this from a checkout of the high-council repo." >&2
  exit 1
fi

mkdir -p "$dest"

count=0
for f in "$src"/council_*.toml; do
  cp "$f" "$dest/"
  count=$((count + 1))
done

echo "Installed $count council agents to $dest"
echo
echo "Next:"
echo "  1. Codex enables subagents by default. If you have turned them off, set"
echo "     agents.enabled = true in ~/.codex/config.toml."
echo "  2. Full mode seats nine agents at once. If you plan to use it, raise"
echo "     agents.max_concurrent_threads_per_session to 10 in the [agents] table."
echo "  3. Ask Codex: convene the council on <your idea>"
