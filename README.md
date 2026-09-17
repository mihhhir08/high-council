<p align="center">
  <img src="public/mark.svg" width="72" alt="" />
</p>

<h1 align="center">High Council</h1>

<p align="center">
  Stop Claude from agreeing with you.<br/>
  Convene a council of adversarial agents. Get one committed verdict.
</p>

<p align="center">
  <a href="https://high-council.vercel.app"><strong>high-council.vercel.app</strong></a>
  &nbsp;·&nbsp;
  <a href="#install">Install</a>
  &nbsp;·&nbsp;
  <a href="#the-bench">The bench</a>
  &nbsp;·&nbsp;
  <a href="#why-it-does-not-just-agree">Why it works</a>
</p>

<p align="center">
  <code>/plugin marketplace add mihhhir08/high-council</code><br/>
  <code>/plugin install high-council@high-council</code>
</p>

---

## The problem

```
You:    I think we should rewrite the API in Go.
Claude: Great idea. Go's concurrency model is a natural fit…

You:    Actually, maybe we keep Node and optimise the hot paths.
Claude: That's the pragmatic choice. A rewrite carries real risk…
```

Two approvals. No signal.

## Install

**Claude Code**

```
/plugin marketplace add mihhhir08/high-council
/plugin install high-council@high-council
```

Restart Claude Code, then put something to the council:

```
/council should we rewrite the API in Go or keep Node and optimise?
```

Saying it in plain words works too: *ask the council whether we should…*

**Codex**

Codex reads the same marketplace, but its plugins cannot carry agents, so the
fourteen roles are installed once from a checkout:

```
codex plugin marketplace add mihhhir08/high-council
git clone https://github.com/mihhhir08/high-council
cd high-council && bash codex/install.sh
```

That writes `council_*.toml` into `~/.codex/agents/`. Then ask for it in plain
words: *convene the council on …* — Codex has no slash command for it.

## What comes back

```
Verdict: Keep Node, optimise the three hot paths

Decision     Keep Node. Rewrite the three endpoints carrying 81% of p99 latency.
             Revisit Go only if those three still miss target.
Confidence   78
Your lean    Rewrite in Go — weighted as one input among the seats

Reasons
  1. Three endpoints account for 81% of p99 latency   verified · src/metrics/report.ts:44
  2. No engineer on the team has shipped Go           verified · user-given
  3. Auth holds 2,300 lines of Node session logic     verified · src/auth/session.ts

Minority report
  Advocate: "The team hits Node's ceiling within a year at current growth.
  Every month optimising is a month not spent on the migration you will do
  anyway, under more load, with less time."

What would change this verdict
  - The three optimised endpoints still miss target after two weeks
  - A Go engineer joins
```

Every verdict also carries the Doubter's open points and a two-week prediction
you can check it against. It is saved to `docs/council/` in your project.

## The bench

Four seats sit on every question. Five more are seated only when the question
earns them. One sits in round two and argues with nobody about the idea.

| Seat | Sits | Owns |
|---|---|---|
| **Advocate** | always | The strongest realistic case for your idea. The only seat that sees your reasoning. |
| **Skeptic** | always | The pre-mortem. It is six months later and this failed. Why? |
| **Constraints** | always | What time, money, skills, and the codebase actually allow. |
| **Contrarian** | always | Option C. Questions whether A versus B was ever the right framing. |
| **Engineer** | when earned | Build order, first shippable slice, effort in ranges. |
| **Architect** | when earned | What is hard to undo. Data model, boundaries, lock-in. |
| **Security** | when earned | Threat model, scaled to the stakes. |
| **Business** | when earned | Who pays, how they find it, whether the numbers close. |
| **User Voice** | when earned | Speaks as the person this is for. First person. |
| **Doubter** | round two | Audits the council's reasoning, not the idea. |

Four more roles work behind the bench: a **Clerk** who writes the neutral brief,
a **Researcher** who sources the facts, a **Jury** who verifies every claim, and
a **Chairman** who rules.

## Modes

| Mode | Command | Seats | Rebuttal | Jury | Model calls |
|---|---|---|---|---|---|
| Quick | `/council quick …` | 4 | no | no | ~6 |
| Standard | `/council …` | 4 + up to 3 | yes | yes | 14–18 |
| Full | `/council full …` | 9 | yes | yes | ~25 |

Standard is the default, and the Clerk decides which optional seats the
question earns.

## Why it does not just agree

Seven agents with different moods would still agree with you. The mechanics are
what stop it.

- **Blinding** — your preference is stripped before any seat reads the question.
- **Your idea gets counsel** — the Advocate argues your reasoning at full strength, so it enters through one voice instead of every seat.
- **Commitment** — every seat ends with a position and a confidence number. Hedging is sent back.
- **Steelman first** — each seat opens with the best version of the view it is about to argue against.
- **Rebuttal** — round one is written in isolation, round two answers the strongest objection. Weak arguments die here.
- **Evidence ladder** — your facts, then past verdicts, then the repo, then the web. Unverified claims cannot be a reason.
- **Minority report** — the verdict carries the best argument against itself, intact.
- **Remand** — if the call hinges on something only you know, you get the questions instead of a guess.

<details>
<summary><b>Works without a repo</b></summary>

<br>

The council does not need code. On an empty folder it works from what you tell
it, what the Researcher finds, and any past verdicts. The Clerk asks for
anything only you can answer before spending money on a debate.

</details>

<details>
<summary><b>The decision log</b></summary>

<br>

Every verdict is written to `docs/council/YYYY-MM-DD-<slug>.md`, with the full
debate as an appendix. Future councils read the last five so rulings stay
consistent. Commit them. They become the record of why your project is shaped
the way it is.

</details>

<details>
<summary><b>Cost</b></summary>

<br>

A standard run spawns fourteen to eighteen agents and takes a few minutes.
Seats run on Sonnet, the Chairman on Opus. Use `quick` for anything you would
not spend five minutes on yourself.

</details>

<details>
<summary><b>Configuration</b></summary>

<br>

Every role is one markdown file in `agents/`. Change the frontmatter to change
its model or tools, change the body to change how it argues.

```yaml
---
name: chairman
model: opus        # sonnet, opus, haiku, or inherit
tools: Read
maxTurns: 3
---
```

Add a seat by adding a file and listing it in `skills/council/SKILL.md`.

</details>

<details>
<summary><b>FAQ</b></summary>

<br>

**Can it rule in my favour?**
Yes, and it often does. The Advocate makes sure your case is heard. What it
cannot do is rule for you *because* it was your idea.

**Does it need web access?**
No. The Researcher and Jury say so when web tools are unavailable and work from
the repo and your stated facts.

**Can I use it on a non-technical decision?**
Yes. The Clerk reads the domain and seats the bench accordingly. A career
question seats no Architect.

**Why re-spawn seats for round two instead of continuing them?**
Simpler, and it works on every harness version. Each seat gets its own round
one statement back in the packet.

</details>

---

Design notes live in [docs/design.md](docs/design.md). Issues and pull requests
are welcome — the most useful one is a decision log entry where the council got
it wrong, with what it missed.

MIT licensed. Built by [Mihirsinh Chavda](https://mihirsinhchavda.com).
