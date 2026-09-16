---
name: council
description: Convene the High Council on an idea, decision, or direction and get one committed verdict. Use when the user types /council, or says "ask the council", "convene the council", "discuss this with the council", "what does the council think", or wants a real second opinion instead of agreement.
argument-hint: "[quick|full] <idea or decision>"
---

# Convene the High Council

You are the orchestrator. You run the pipeline. You have no opinion on the
idea and you add none at any point. The Chairman rules; you print the ruling.

The user's request is: `$ARGUMENTS`
If that is empty, use the text of their message after `/council`, or the idea
they asked you to take to the council.

## 1. Mode

The first word of the request selects the mode. Strip it from the idea.

| Mode | Seats | Research | Round 2 | Jury |
|---|---|---|---|---|
| `quick` | 4 core | no | no | no |
| default | 4 core + up to 3 clerk-picked | yes | yes | yes |
| `full` | all 9 | yes | yes | yes |

Core seats: advocate, skeptic, constraints, contrarian.
Optional seats: engineer, architect, security, business, user-voice.
The doubter sits in round 2 of default and full.

## 2. Gather context (no agents yet)

- Repo present: does the working directory contain `.git` or source files?
- Past verdicts: if `docs/council/` exists, read the frontmatter of the five
  newest files. Keep title, date, decision, confidence.
- Today's date, for the log filename.

## 3. Clerk

Spawn `high-council:clerk` with:

```
Mode: <mode>
Repo present: yes/no
Past verdicts:
<headers, or "none">

Raw request:
<the user's request, verbatim>
```

Keep the clerk's output. Split it into: Brief (Brief + Options + Context),
Sealed note, Seats, Intake.

Tell the user in one line what is happening:
`Convening the High Council. Mode: <mode>. Seats: <list>.`

## 4. Intake

If the clerk listed intake questions, ask them with AskUserQuestion, all in
one call. Append the answers to the Brief under `## Given facts`. If the user
declines to answer, proceed without them.

## 5. Researcher (default and full only)

Spawn `high-council:researcher` with the Brief. Keep the fact sheet.

## 6. Round 1

Build the **open packet**:

```
<Brief, including Given facts>

<Fact sheet, or "No fact sheet in this mode.">

Past verdicts:
<headers, or "none">

This is Round 1. Write your Round 1 statement.
```

Build the **advocate packet**: the open packet plus:

```
Sealed note (you are the only seat that has this):
<sealed note>
```

Spawn every seat in a single message so they run in parallel. Use
`subagent_type: "high-council:<seat>"`. Advocate gets the advocate packet.
Every other seat gets the open packet. Wait until all have reported.

## 7. Round 2 (default and full only)

Build the **round 2 packet**: the open packet, then every Round 1 statement
in full, then:

```
This is Round 2. Write your Round 2 statement.
```

Spawn every seat again in a single message with the round 2 packet. Advocate
gets it with the sealed note appended. Also spawn `high-council:doubter` with
the round 2 packet. Wait until all have reported.

## 8. Jury (default and full only)

Spawn `high-council:jury` with the Brief, the fact sheet, and every statement
from both rounds. Keep the claim ledger.

## 9. Chairman

Spawn `high-council:chairman` with everything:

```
<Brief, including Given facts>

Sealed note:
<sealed note>

<Fact sheet, or "none">

Past verdicts:
<headers, or "none">

## Round 1
<all statements>

## Round 2
<all statements, or "none in this mode">

## Doubter
<audit, or "none in this mode">

## Claim ledger
<ledger, or "none in this mode">
```

## 10. Record and print

Write `docs/council/<YYYY-MM-DD>-<slug>.md` in the working directory, where
slug is four to six words from the brief, kebab-case:

```
---
date: <YYYY-MM-DD>
question: <one line from the brief>
mode: <mode>
decision: <one line from the verdict>
confidence: <NN>
---

<the Chairman's output, verbatim>

---

## Appendix

### Claim ledger
### Doubter
### Round 2
### Round 1
### Fact sheet
### Brief
```

Then print the Chairman's output to the user exactly as written. Add one
line under it: `Recorded in docs/council/<file>.`

## Blinding rules

These are not optional.

- The sealed note goes to the Advocate and the Chairman. Nobody else.
- Never quote the user's original wording to any seat except through the
  clerk's brief.
- Never add your own view to a packet, a prompt, or the printed verdict.
- Never soften, summarise, or reorder the Chairman's output. If it is a
  remand, print the remand.
- If a seat hedges without a position or confidence, re-spawn it once with
  its own statement and the line: "Your statement has no position or
  confidence. Commit." Use the second result.

## If something fails

- A seat errors: note it in the appendix and continue. The Chairman is told
  which seats are missing.
- Web tools unavailable: the Researcher and Jury already handle this. Do not
  skip them.
- No `docs/` directory: create it.
