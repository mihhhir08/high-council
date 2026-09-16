<p align="center">
  <img src="site/mark.svg" width="72" alt="" />
</p>

<h1 align="center">High Council</h1>

<p align="center">
  Stop Claude from agreeing with you.<br/>
  Convene a council of adversarial agents. Get one committed verdict.
</p>

<p align="center">
  <code>/plugin marketplace add mihhhir08/high-council</code>
</p>

---

## The problem

```
You:    I think we should rewrite the API in Go.
Claude: Great idea. Go's concurrency model is a natural fit…

You:    Actually, maybe we keep Node and optimise the hot paths.
Claude: That's the pragmatic choice. A rewrite carries real risk…
```

Both answers are fluent. Neither is a decision. You walk away with two
approvals and no signal.

## What High Council does

```
/council should we rewrite the API in Go or keep Node and optimise?
```

A clerk strips your preference out of the question. Four to nine seats argue
it in parallel, blind to each other and blind to what you hoped to hear. They
rebut each other. A jury checks every factual claim against your repo, your
stated facts, and the web. A chairman rules, and has to show you the strongest
argument against the ruling.

```
# Verdict: Keep Node, optimise the three hot paths

**Decision:** Keep Node. Profile and rewrite the three endpoints that carry
81% of p99 latency. Revisit Go only if those three still miss target.
**Confidence:** 78

**User's stated lean:** Rewrite in Go — weighted as one input among the seats

**Reasons:**
1. Three endpoints account for 81% of p99 latency (verified: src/metrics/report.ts:44)
2. No engineer on the team has shipped Go to production (verified: user-given)
3. The auth middleware has 2,300 lines of Node-specific session logic with no
   tests (verified: src/auth/session.ts, jury count)

**Minority report:**
Advocate: "The team is going to hit Node's ceiling within a year at current
growth. Every month spent optimising is a month not spent on the migration
you will do anyway, and you will do it under more load with less time."

**Doubter's open points:**
1. "Current growth" was assumed, not stated — unresolved, priced into confidence
2. Hot-path share was measured last quarter — resolved, metrics file is dated this month
3. Skeptic assumed rewrite takes 6 months without a source — unresolved, not load-bearing

**What would change this verdict:**
- The three optimised endpoints still miss target after two weeks
- A Go engineer joins

**Prediction:**
- If right: p99 on those endpoints drops below target by week two
- If wrong: profiling shows latency is spread across many endpoints, not three

Recorded in docs/council/2026-09-16-rewrite-api-go-or-node.md
```

Example output, shortened.

## Install

```
/plugin marketplace add mihhhir08/high-council
/plugin install high-council@high-council
```

Restart Claude Code. Then:

```
/council <idea, decision, or direction>
```

## Modes

| Mode | Command | Seats | Research | Rebuttal | Jury | Model calls |
|---|---|---|---|---|---|---|
| Quick | `/council quick …` | 4 | no | no | no | ~6 |
| Standard | `/council …` | 4 + up to 3 | yes | yes | yes | 14–18 |
| Full | `/council full …` | 9 | yes | yes | yes | ~25 |

Standard is the default. The clerk picks which optional seats the question
earns. Full seats everyone whether the question earns it or not.

You can also just say it: "ask the council whether we should…"

## The bench

| Seat | Sits | Owns |
|---|---|---|
| **Advocate** | always | The strongest realistic case for your idea. The only seat that sees your reasoning. |
| **Skeptic** | always | The pre-mortem. It is six months later and this failed. Why? |
| **Constraints** | always | What time, money, skills, and the codebase actually allow. Reads your repo. |
| **Contrarian** | always | Option C. Questions whether A versus B was ever the right framing. |
| **Engineer** | when earned | Build order, first shippable slice, effort in ranges. |
| **Architect** | when earned | What is hard to undo: data model, boundaries, dependencies, lock-in. |
| **Security** | when earned | Threat model, scaled to the stakes. Says when it does not decide the question. |
| **Business** | when earned | Who pays, how they find it, whether the numbers close. |
| **User Voice** | when earned | Speaks as the person this is for. First person. |
| **Doubter** | round two | Audits the council's reasoning. Assumptions without evidence, confidence not earned. |

Behind the bench:

| Role | Job |
|---|---|
| **Clerk** | Rewrites your request into a neutral brief. Seals your preference in a note only the Advocate and Chairman can open. Asks up to three questions only you can answer. |
| **Researcher** | Prior art, existing solutions, numbers, and what has already failed. Every line sourced. |
| **Jury** | Pulls every factual claim from the debate and marks it Verified, Contradicted, or Unverified. |
| **Chairman** | Rules on verified claims only. Must write a minority report the losing side would sign. |

## Why it does not just agree with you

Seven agents with different moods would still agree with you. These are the
mechanics that stop it.

- **Blinding.** The clerk strips your preference before any seat reads the
  question. Only the Advocate and the Chairman see it, and the Chairman has to
  state how it was weighted.
- **Your idea gets counsel.** The Advocate receives your full reasoning and
  argues it at full strength. You know things about your situation the
  council cannot. That knowledge enters through one voice instead of
  contaminating every seat.
- **Commitment.** Every seat ends with a position and a confidence number.
  A seat that hedges is sent back.
- **Steelman first.** Every seat opens with the strongest version of the view
  it is about to argue against.
- **Rebuttal.** Round one is written in isolation. In round two each seat
  must answer the strongest point against it. Weak arguments die here.
- **Evidence ladder.** Your stated facts, then past verdicts, then the repo,
  then the web. The jury checks claims against whatever exists. Unverified
  claims can lower confidence but cannot be a reason.
- **Minority report.** The verdict carries the best argument against itself,
  intact. You never follow a ruling without seeing what it overrode.
- **Remand.** If the decision hinges on something only you know, the Chairman
  returns the questions instead of a guess.

## Works without a repo

The council does not need code. On an empty folder it works from what you
tell it, what the Researcher finds, and past verdicts. The clerk asks for
anything only you can answer before spending money on a debate.

## Decision log

Every verdict is written to `docs/council/YYYY-MM-DD-<slug>.md` in your
project, with the full debate as an appendix. Future councils read the last
five so rulings stay consistent. Commit them. They are the record of why your
project is shaped the way it is.

## Cost

A standard run spawns fourteen to eighteen agents. Seats run on Sonnet. The
Chairman runs on Opus. Expect a standard run to take a few minutes and cost
accordingly. Use `quick` for anything you would not spend five minutes on
yourself.

## Configuration

Every role is one markdown file in `agents/`. Edit the frontmatter to change
its model or tools. Edit the body to change how it argues.

```yaml
---
name: chairman
model: opus        # sonnet, opus, haiku, or inherit
tools: Read
maxTurns: 3
---
```

Add a seat by adding a file and listing it in `skills/council/SKILL.md`.

## FAQ

**Can it rule in my favour?**
Yes, and it often will. The Advocate makes sure your case is heard. What it
cannot do is rule in your favour because it was your idea.

**Why re-spawn seats for round two instead of continuing them?**
Simpler, and it works on every harness version. Each seat gets its own round
one statement back in the packet.

**Does it need web access?**
No. The Researcher and Jury say when web tools are unavailable and work from
the repo and your stated facts.

**Can I run it on a non-technical decision?**
Yes. The clerk classifies the domain and seats the bench accordingly. A career
question seats no Architect.

## Contributing

Issues and pull requests welcome. The most useful contribution is a decision
log entry where the council got it wrong, with what it missed.

## License

MIT. See [LICENSE](LICENSE).
