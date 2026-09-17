#!/usr/bin/env node
// Generates Codex agent definitions from the markdown roles in agents/.
//
// Claude Code reads agents/*.md directly. Codex wants one TOML file per agent
// in ~/.codex/agents/, with different field names and no tool allowlist. Rather
// than maintain fourteen roles twice, this derives the TOML from the markdown
// so the two can never drift.
//
//   node scripts/build-codex-agents.mjs

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "agents");
const outDir = join(root, "codex", "agents");

/** Pull the YAML frontmatter and body out of an agent file. */
function parse(md, file) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${file}: no frontmatter`);
  const meta = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1).replace(/\\"/g, '"');
    meta[kv[1]] = v;
  }
  return { meta, body: m[2].trim() };
}

const quote = (s) => `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

/**
 * Codex resolves an agent by its `name`, and a name matching a built-in
 * (default, worker, explorer) would shadow it. Namespacing avoids that and
 * keeps the bench greppable in a prompt.
 */
const codexName = (file) => `council_${basename(file, ".md").replace(/-/g, "_")}`;

// Claude models do not map onto Codex model ids one-for-one, and hardcoding an
// id that gets retired would break every agent. Reasoning effort is stable and
// expresses the same intent: the chairman thinks harder than the seats.
const effortFor = (model) => (model === "opus" ? "high" : "medium");

// Two manifests describe this plugin: .claude-plugin/plugin.json for Claude
// Code and plugin.json at the root for the portable format Codex reads. A
// version bump that touches only one of them is the obvious way to break an
// install, so fail the build instead.
const claudeManifest = JSON.parse(readFileSync(join(root, ".claude-plugin", "plugin.json"), "utf8"));
const portableManifest = JSON.parse(readFileSync(join(root, "plugin.json"), "utf8"));
if (claudeManifest.version !== portableManifest.version) {
  throw new Error(
    `version mismatch: .claude-plugin/plugin.json is ${claudeManifest.version}, plugin.json is ${portableManifest.version}`,
  );
}

mkdirSync(outDir, { recursive: true });

const files = readdirSync(srcDir).filter((f) => f.endsWith(".md")).sort();
const written = [];

for (const file of files) {
  const { meta, body } = parse(readFileSync(join(srcDir, file), "utf8"), file);
  if (body.includes("'''")) throw new Error(`${file}: body contains ''' and cannot be a TOML literal string`);

  const toml = [
    `# Generated from agents/${file} by scripts/build-codex-agents.mjs — do not edit by hand.`,
    `name = ${quote(codexName(file))}`,
    `description = ${quote(meta.description ?? "")}`,
    `model_reasoning_effort = ${quote(effortFor(meta.model))}`,
    // Every council role reads and argues. None of them write; the orchestrator
    // records the verdict. Read-only makes that a sandbox guarantee, not a promise.
    `sandbox_mode = "read-only"`,
    `developer_instructions = '''`,
    body,
    `'''`,
    "",
  ].join("\n");

  const out = `${codexName(file)}.toml`;
  writeFileSync(join(outDir, out), toml);
  written.push(out);
}

console.log(`Wrote ${written.length} Codex agents to codex/agents/`);
for (const w of written) console.log(`  ${w}`);
