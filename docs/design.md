# High Council — design notes

Why the council is shaped the way it is. Written before the build, kept current.

## Problem

Claude agrees with whatever direction the user proposes. Tell it A, it agrees.
Tell it B, it agrees. The user gets no signal and no better outcome.

## Goal

A Claude Code plugin, `/council <idea>`, that returns one committed verdict on
an idea, decision, or direction. The verdict must be grounded in evidence,
survive a rebuttal round, and carry its own strongest counterargument.

## Anti-sycophancy mechanics (the actual fix)

1. **Blinding.** A clerk rewrites the request into a neutral brief and seals
   the user's preference in a separate note. Only the Advocate and the
   Chairman ever see the sealed note.
2. **Commitment.** Every seat ends with a position and a confidence number.
   Hedging is rejected.
3. **Evidence ladder.** Claims are checked against, in order: facts the user
   supplied, past verdicts, the repo if one exists, web search if enabled.
   No source is mandatory. Unverified claims are weighted down, not dropped.
4. **Rebuttal round.** Round one is written in parallel and in isolation.
   Round two, each seat must answer the strongest point against it.
5. **Steelman first.** Every seat states the strongest opposing view before
   its own.
6. **Remand.** If the decision hinges on something only the user knows, the
   Chairman returns questions instead of a guess.

## Roles

### Before debate

| Role | Job | Tools | Model |
|---|---|---|---|
| Clerk | Classify question, write neutral brief, seal user preference, pick optional seats, draft up to 3 intake questions | none | sonnet |
| Researcher | Build a fact sheet: prior art, existing solutions, relevant numbers, with sources | WebSearch, WebFetch, Read, Grep, Glob | sonnet |

### Seats

| Seat | Core? | Owns | Tools |
|---|---|---|---|
| Advocate | yes | Strongest realistic case for the user's idea. Gets the sealed note. | none |
| Skeptic | yes | Pre-mortem. "Six months later it failed. Why?" | none |
| Constraints | yes | What time, money, skills, and the codebase actually allow | Read, Grep, Glob |
| Contrarian | yes | Option C nobody asked about | none |
| Engineer | optional | How it gets built, in what order, how long | Read, Grep, Glob |
| Architect | optional | Decisions that are hard to reverse: data model, boundaries, scale, lock-in | Read, Grep, Glob |
| Security | optional | Threat model, data exposure, auth, abuse | Read, Grep, Glob |
| Business | optional | Growth and monetization | none |
| User Voice | optional | Who it is for and whether they want it | none |
| Doubter | round two only | Assumptions made without evidence, confidence not earned. Doubts the council, not the idea. | none |

### After debate

| Role | Job | Tools | Model |
|---|---|---|---|
| Jury | Extract every factual claim, mark Verified / Contradicted / Unverified with source | Read, Grep, Glob, WebSearch | sonnet |
| Chairman | Rule on verified claims. Fixed verdict format or remand. | none | opus |

Seat models default to sonnet. Users can edit any agent file.

## Modes

| Mode | Invocation | Seats | Research | Round two | Jury | Approx calls |
|---|---|---|---|---|---|---|
| quick | `/council quick <idea>` | 4 core | no | no | no | 6 |
| standard | `/council <idea>` | 4 core + up to 3 clerk-picked | yes | yes | yes | 14–18 |
| full | `/council full <idea>` | all 9 | yes | yes | yes | 25 |

Doubter sits in round two of standard and full.

## Pipeline (standard)

1. Orchestrator (the main session, driven by `skills/council/SKILL.md`)
   reads the last five verdict headers from `docs/council/` if present, and
   notes whether a repo exists.
2. Clerk → brief, sealed note, domain, optional seats, intake questions.
3. If intake questions exist, ask the user via AskUserQuestion. Append answers
   to the brief as **Given facts**.
4. Researcher → fact sheet.
5. Round one: all seats spawned in parallel. Input: brief + fact sheet + given
   facts + past verdict headers. Advocate also gets the sealed note.
6. Round two: all seats spawned again with the full packet of opening
   statements. Doubter joins. Each seat answers the strongest point against it
   and revises its confidence.
7. Jury → claim ledger.
8. Chairman → verdict. Input: everything, including the sealed note.
9. Orchestrator writes `docs/council/YYYY-MM-DD-<slug>.md` and prints the
   verdict.

Round two re-spawns seats with the packet instead of continuing the round-one
agent. Simpler and works on every harness version.

## Blinding rules for the orchestrator

- Forward the sealed note to the Advocate and the Chairman only.
- Never quote the user's original phrasing to any other seat.
- Never add the orchestrator's own opinion to any packet.
- Do not summarise or soften the verdict. Print it as the Chairman wrote it.

## Statement format (every seat, both rounds)

```
## <Seat> — Round <n>
**Steelman of the opposing view:** two sentences
**Position:** one sentence, committed
**Confidence:** 0–100
**Arguments:**
- <argument> [cited: <source> | unverified]
**What would change my mind:** one or two lines
```

Round two adds `**Answering the strongest point against me:**` and
`**Revised confidence:**`.

## Verdict format

```
# Verdict: <title>
**Decision:** A / B / C / neither, in one sentence
**Confidence:** 0–100
**User's stated lean:** <from sealed note> — weighted as one input
**Reasons:**
1. <reason> (verified: <source>)
2. …
3. …
**Minority report:** the strongest argument against this decision, intact
**Doubter's open points:** each assumption flagged, answered
**What would change this verdict:** two or three observable things
**Prediction:** what you should see in two weeks if right, and if wrong
```

Or:

```
# Remand: <title>
The council cannot rule without the following from you:
1. …
Answer and re-run `/council`.
```

## Decision log

`docs/council/YYYY-MM-DD-<slug>.md` in the current working directory.
Frontmatter: date, question, mode, decision, confidence. Body: verdict, then
an appendix with the claim ledger and every statement. Future councils read
the last five headers so decisions stay consistent.

## Repo layout

```
high-council/
  .claude-plugin/plugin.json        manifest
  .claude-plugin/marketplace.json   single-plugin marketplace, source "./"
  skills/council/SKILL.md           orchestrator, exposed as /council
  agents/*.md                       one file per role
  docs/design.md                    these notes
  app/, public/                     landing page (Next.js, deployed on Vercel)
  README.md, LICENSE
```

## Install

```
/plugin marketplace add mihhhir08/high-council
/plugin install high-council@high-council
```

## Out of scope

Hooks, MCP servers, any runtime code. The plugin is markdown only.

## Testing

Manual. Run `/council quick` on a known-bad idea and confirm the verdict says
no. Run on a known-good idea and confirm it says yes with a real minority
report. Run with a strong stated preference and confirm non-Advocate seats
show no sign of it. Validate the manifest with `claude plugin validate .`.
