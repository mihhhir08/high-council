import type { CSSProperties } from "react";
import Interactions from "./interactions";

/** Lets a style object carry CSS custom properties without a cast at every call site. */
type Style = CSSProperties & Record<`--${string}`, string | number>;

const REPO = "https://github.com/mihhhir08/high-council";

function Mark() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
      <circle cx="32" cy="32" r="29" />
      <circle cx="32" cy="16" r="4.5" fill="currentColor" stroke="none" />
      <g fill="currentColor" stroke="none">
        <circle cx="13.5" cy="38" r="2.6" />
        <circle cx="18.5" cy="45.5" r="2.6" />
        <circle cx="25" cy="50" r="2.6" />
        <circle cx="32" cy="51.5" r="2.6" />
        <circle cx="39" cy="50" r="2.6" />
        <circle cx="45.5" cy="45.5" r="2.6" />
        <circle cx="50.5" cy="38" r="2.6" />
      </g>
    </svg>
  );
}

export default function Page() {
  return (
    <>
      <Interactions />

      <nav>
        <div className="wrap">
          <a className="brand" href="#">
            <Mark />
            High Council
          </a>
          <div className="navlinks">
            <a href="#how">How it rules</a>
            <a href="#bench">The bench</a>
            <a href="#verdict">A verdict</a>
            <a href="#install">Install</a>
            <a className="gh" href={REPO} target="_blank" rel="noopener">
              GitHub ↗
            </a>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="wrap">
          <div>
            <div className="eyebrow rv" style={{ "--i": 0 } as Style}>
              A plugin for Claude Code
            </div>
            <h1 className="rv" style={{ "--i": 1, marginTop: "1.4rem" } as Style}>
              Stop Claude from <em>agreeing</em> with you.
            </h1>
            <p className="lede rv" style={{ "--i": 2 } as Style}>
              Convene a council of adversarial agents on any idea. Blinded seats argue it, a jury
              checks the facts, and a chairman hands down one committed verdict, with the strongest
              case against it attached.
            </p>
            <div className="install rv" style={{ "--i": 3 } as Style}>
              <code id="c0">/plugin marketplace add mihhhir08/high-council</code>
              <button data-copy="c0" aria-label="Copy install command">
                Copy
              </button>
            </div>
            <p className="meta rv" style={{ "--i": 4 } as Style}>
              MIT · Markdown only · No runtime · Works on an empty folder
            </p>
          </div>
          <div className="rv" style={{ "--i": 2 } as Style}>
            <div
              className="transcript"
              aria-label="A transcript showing Claude agreeing with two opposite directions"
            >
              <div className="head">
                <span>claude · session</span>
                <span>14:02</span>
              </div>
              <div className="line you">I think we should rewrite the API in Go.</div>
              <div className="line ai">
                Great call. Go&apos;s concurrency model is a natural fit for this workload…
                <span className="tag">agreed</span>
              </div>
              <div className="gap" />
              <div className="line you">Actually, let&apos;s keep Node and optimise the hot paths.</div>
              <div className="line ai">
                That&apos;s the pragmatic choice. A rewrite carries real risk…
                <span className="tag">agreed</span>
              </div>
              <div className="gap" />
              <div className="line you">
                <span className="cursor" aria-hidden="true" />
              </div>
              <div className="stamp">
                Two approvals<b>No signal</b>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="how">
        <div className="wrap docket">
          <div className="sticky">
            <div className="eyebrow rv">How it rules</div>
            <h2 className="rv" style={{ marginTop: "1rem" }}>
              Six stages. <br />
              One ruling.
            </h2>
            <p className="rv">
              Every stage exists to remove a way the answer could bend toward what you hoped to
              hear.
            </p>
          </div>
          <ol className="steps">
            <li className="rv">
              <span className="n">§ 01</span>
              <div>
                <h3>
                  The Clerk seals <em>your preference</em>
                </h3>
                <p>
                  Your request is rewritten into a neutral brief. What you lean toward, and why,
                  goes into a sealed note that only two roles can open. If something only you can
                  answer would flip the verdict, the Clerk asks before anyone spends a token.
                </p>
              </div>
            </li>
            <li className="rv">
              <span className="n">§ 02</span>
              <div>
                <h3>
                  The Researcher puts <em>facts on the table</em>
                </h3>
                <p>
                  Prior art, existing solutions, numbers, and what has already been tried and
                  failed. Every line sourced. Absence reported. The council debates from evidence,
                  not from memory.
                </p>
                <div className="only">Standard and full</div>
              </div>
            </li>
            <li className="rv">
              <span className="n">§ 03</span>
              <div>
                <h3>
                  Round one, <em>in isolation</em>
                </h3>
                <p>
                  Every seat writes at the same time and sees nobody else. Each opens by
                  steelmanning the view it is about to argue against, then commits to a position and
                  a confidence number. Hedging is sent back.
                </p>
              </div>
            </li>
            <li className="rv">
              <span className="n">§ 04</span>
              <div>
                <h3>
                  Round two, <em>rebuttal</em>
                </h3>
                <p>
                  Each seat reads the bench and must answer the single strongest point against it.
                  Not the easiest one. The Doubter joins here to audit everyone&apos;s reasoning for
                  assumptions that were never earned.
                </p>
                <div className="only">Standard and full</div>
              </div>
            </li>
            <li className="rv">
              <span className="n">§ 05</span>
              <div>
                <h3>
                  The Jury checks <em>every claim</em>
                </h3>
                <p>
                  Every factual claim from both rounds is pulled out and marked Verified,
                  Contradicted, or Unverified against your stated facts, past verdicts, your repo,
                  and the web. Opinions are not claims. Gaps are reported as gaps.
                </p>
                <div className="only">Standard and full</div>
              </div>
            </li>
            <li className="rv">
              <span className="n">§ 06</span>
              <div>
                <h3>
                  The Chairman <em>rules</em>
                </h3>
                <p>
                  On verified claims only. The verdict states your lean and how it was weighted,
                  carries a minority report the losing side would sign, answers the Doubter, and
                  makes a two-week prediction you can check. Or it remands with the questions that
                  would decide it.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="chamber" id="bench">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow rv">The bench</div>
              <h2 className="rv" style={{ marginTop: "1rem" }}>
                Ten seats. <br />
                One job each.
              </h2>
            </div>
            <p className="rv">
              Four sit on every question. Five are seated when the Clerk decides the question earns
              them. One sits only in round two, and argues with nobody about the idea.
            </p>
          </div>
          <div className="bench">
            <div className="seat rv">
              <span className="rn">SEAT I</span>
              <h3>Advocate</h3>
              <p>
                The strongest realistic case for your idea. The only seat that reads your reasoning,
                so what you know cannot be lost.
              </p>
              <span className="sits">Always</span>
            </div>
            <div className="seat rv">
              <span className="rn">SEAT II</span>
              <h3>Skeptic</h3>
              <p>
                The pre-mortem. It is six months later and this failed. Writes the post-mortem,
                ranked by likelihood times damage.
              </p>
              <span className="sits">Always</span>
            </div>
            <div className="seat rv">
              <span className="rn">SEAT III</span>
              <h3>Constraints</h3>
              <p>
                What time, money, skills, and the codebase actually allow. Reads your repo and cites
                the line.
              </p>
              <span className="sits">Always</span>
            </div>
            <div className="seat rv">
              <span className="rn">SEAT IV</span>
              <h3>Contrarian</h3>
              <p>
                Option C. Asks whether A versus B was ever the right question, and prices the
                alternative honestly.
              </p>
              <span className="sits">Always</span>
            </div>
            <div className="seat rv opt">
              <span className="rn">SEAT V</span>
              <h3>Engineer</h3>
              <p>
                Build order, the first slice a real person could use, effort in ranges with the
                assumption each range rests on.
              </p>
              <span className="sits">When earned</span>
            </div>
            <div className="seat rv opt">
              <span className="rn">SEAT VI</span>
              <h3>Architect</h3>
              <p>
                What costs a year to undo. Data model, boundaries, the dependencies you marry, the
                scale you design for.
              </p>
              <span className="sits">When earned</span>
            </div>
            <div className="seat rv opt">
              <span className="rn">SEAT VII</span>
              <h3>Security</h3>
              <p>
                Assets, actors, entry points, worst credible outcome. Scaled to the stakes. Says
                when it does not decide the question.
              </p>
              <span className="sits">When earned</span>
            </div>
            <div className="seat rv opt">
              <span className="rn">SEAT VIII</span>
              <h3>Business</h3>
              <p>
                Who pays, why they switch, how they find it, whether the numbers close. Says when it
                is not a business question.
              </p>
              <span className="sits">When earned</span>
            </div>
            <div className="seat rv opt">
              <span className="rn">SEAT IX</span>
              <h3>User Voice</h3>
              <p>
                Speaks as the person this is for. What they tolerate today, whether they would
                notice, try, and keep it.
              </p>
              <span className="sits">When earned</span>
            </div>
            <div className="seat rv r2">
              <span className="rn">SEAT X</span>
              <h3>Doubter</h3>
              <p>
                Doubts the council, not the idea. Assumptions without evidence, confidence not
                earned, seats that contradict each other.
              </p>
              <span className="sits">Round two</span>
            </div>
          </div>
          <div className="behind">
            <div className="rv">
              <h4>Clerk</h4>
              <p>Neutral brief. Sealed note. Seat selection. Intake.</p>
            </div>
            <div className="rv">
              <h4>Researcher</h4>
              <p>Sourced fact sheet before anyone argues.</p>
            </div>
            <div className="rv">
              <h4>Jury</h4>
              <p>Claim ledger. Verified, contradicted, unverified.</p>
            </div>
            <div className="rv">
              <h4>Chairman</h4>
              <p>One ruling. Minority report attached.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="verdict">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow rv">What you get</div>
              <h2 className="rv" style={{ marginTop: "1rem" }}>
                A ruling you can <br />
                hold it to.
              </h2>
            </div>
            <p className="rv">
              Every verdict is written to your project as a dated file, with the full debate as an
              appendix. Future councils read the last five, so rulings stay consistent.
            </p>
          </div>
          <article className="doc rv" aria-label="Example verdict">
            <div className="top">
              <div>
                <span className="mono">
                  Verdict · docs/council/2026-09-16-rewrite-api-go-or-node.md
                </span>
                <h3>Keep Node. Optimise the three hot paths.</h3>
              </div>
              <div className="seal" aria-label="User's stated lean: Go">
                <span>User&apos;s lean</span>
                <b>Go</b>
                <span>weighted as one input</span>
              </div>
            </div>
            <div className="grid">
              <div>
                <span className="k">Decision</span>
                <p className="decision">
                  Keep Node. Profile and rewrite the three endpoints that carry 81% of p99 latency.
                  Revisit Go only if those three still miss target.
                </p>
              </div>
              <div className="conf">
                <span className="k">Confidence</span>
                <div className="big">
                  78<small>/100</small>
                </div>
              </div>
            </div>
            <div className="block">
              <span className="k">Reasons</span>
              <ol>
                <li>
                  Three endpoints account for 81% of p99 latency{" "}
                  <span className="v">verified · src/metrics/report.ts:44</span>
                </li>
                <li>
                  No engineer on the team has shipped Go to production{" "}
                  <span className="v">verified · user-given</span>
                </li>
                <li>
                  Auth middleware carries 2,300 lines of Node-specific session logic with no tests{" "}
                  <span className="v">verified · src/auth/session.ts</span>
                </li>
              </ol>
            </div>
            <div className="block">
              <span className="k">Minority report</span>
              <p className="minority">
                &ldquo;The team will hit Node&apos;s ceiling within a year at current growth. Every
                month spent optimising is a month not spent on the migration you will do anyway,
                under more load, with less time.&rdquo;
                <span>Advocate · round two</span>
              </p>
            </div>
            <div className="block">
              <span className="k">Doubter&apos;s open points</span>
              <ol>
                <li>
                  &ldquo;Current growth&rdquo; was assumed, not stated{" "}
                  <span className="v">unresolved · priced into confidence</span>
                </li>
                <li>
                  Hot-path share measured last quarter{" "}
                  <span className="v">resolved · metrics file dated this month</span>
                </li>
                <li>
                  Skeptic&apos;s six-month rewrite estimate has no source{" "}
                  <span className="v">unresolved · not load-bearing</span>
                </li>
              </ol>
            </div>
            <div className="block two">
              <div>
                <span className="k">What would change this</span>
                <ul>
                  <li>The three optimised endpoints still miss target after two weeks</li>
                  <li>A Go engineer joins</li>
                </ul>
              </div>
              <div>
                <span className="k">Prediction</span>
                <ul>
                  <li>Right: p99 on those endpoints drops below target by week two</li>
                  <li>Wrong: profiling shows latency spread across many endpoints, not three</li>
                </ul>
              </div>
            </div>
            <div className="foot">Consistency with past verdicts · no relevant prior verdict</div>
          </article>
          <p className="caption">
            Example verdict, shortened. Standard mode, six seats, two rounds.
          </p>
        </div>
      </section>

      <section id="why">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow rv">Why it does not just agree</div>
              <h2 className="rv" style={{ marginTop: "1rem" }}>
                Personas are <br />
                not the fix.
              </h2>
            </div>
            <p className="rv">
              Seven agents with different moods would still agree with you. These six mechanics are
              what stop it. Each one closes a door the answer could have bent through.
            </p>
          </div>
          <div className="mech">
            <div className="rv">
              <span className="num">i.</span>
              <h3>Blinding</h3>
              <p>
                The Clerk strips your preference before any seat reads the question. Only the
                Advocate and the Chairman see it, and the Chairman must say how it was weighted.
              </p>
            </div>
            <div className="rv">
              <span className="num">ii.</span>
              <h3>Your idea gets counsel</h3>
              <p>
                You know things about your situation the council cannot. That knowledge enters
                through the Advocate at full strength instead of leaking into every seat.
              </p>
            </div>
            <div className="rv">
              <span className="num">iii.</span>
              <h3>Commitment</h3>
              <p>
                Every seat ends with a position and a number. &ldquo;It depends&rdquo; is not a
                position. A seat that hedges is sent back once, then its second answer stands.
              </p>
            </div>
            <div className="rv">
              <span className="num">iv.</span>
              <h3>Steelman first</h3>
              <p>
                Every statement opens with the strongest version of the view it is about to argue
                against. Two sentences its best defender would sign.
              </p>
            </div>
            <div className="rv">
              <span className="num">v.</span>
              <h3>Evidence ladder</h3>
              <p>
                Your stated facts, then past verdicts, then the repo, then the web. Unverified
                claims can lower confidence. They cannot be a reason.
              </p>
            </div>
            <div className="rv">
              <span className="num">vi.</span>
              <h3>Remand</h3>
              <p>
                If the decision hinges on something only you know, the Chairman returns the
                questions instead of a guess. A confident wrong answer is the worst outcome, so it
                is not allowed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="modes">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow rv">Modes</div>
              <h2 className="rv" style={{ marginTop: "1rem" }}>
                Spend what the <br />
                question is worth.
              </h2>
            </div>
            <p className="rv">
              A standard run is fourteen to eighteen model calls and a few minutes. Use quick for
              anything you would not spend five minutes on yourself.
            </p>
          </div>
          <div className="tbl rv">
            <table>
              <thead>
                <tr>
                  <th>Mode</th>
                  <th>Command</th>
                  <th>Seats</th>
                  <th>Research</th>
                  <th>Rebuttal</th>
                  <th>Jury</th>
                  <th>Calls</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Quick</td>
                  <td>
                    <code>/council quick …</code>
                  </td>
                  <td>4 core</td>
                  <td>—</td>
                  <td>—</td>
                  <td>—</td>
                  <td>~6</td>
                </tr>
                <tr>
                  <td>Standard</td>
                  <td>
                    <code>/council …</code>
                  </td>
                  <td>4 + up to 3</td>
                  <td>yes</td>
                  <td>yes</td>
                  <td>yes</td>
                  <td>14–18</td>
                </tr>
                <tr>
                  <td>Full</td>
                  <td>
                    <code>/council full …</code>
                  </td>
                  <td>all 9</td>
                  <td>yes</td>
                  <td>yes</td>
                  <td>yes</td>
                  <td>~25</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="note rv">
            Seats run on Sonnet, the Chairman on Opus. Every role is one markdown file. Change a
            model, a tool, or how a seat argues by editing it.
          </p>
        </div>
      </section>

      <section className="get" id="install">
        <div className="wrap">
          <div className="eyebrow rv">Install</div>
          <h2 className="rv">
            Two commands. <br />
            Then <em>/council</em>.
          </h2>
          <div className="cmds">
            <div className="cmd rv">
              <span className="s">01</span>
              <code id="c1">/plugin marketplace add mihhhir08/high-council</code>
              <button data-copy="c1" aria-label="Copy">
                Copy
              </button>
            </div>
            <div className="cmd rv">
              <span className="s">02</span>
              <code id="c2">/plugin install high-council@high-council</code>
              <button data-copy="c2" aria-label="Copy">
                Copy
              </button>
            </div>
            <div className="cmd rv">
              <span className="s">03</span>
              <code id="c3">/council should we rewrite the API in Go or keep Node?</code>
              <button data-copy="c3" aria-label="Copy">
                Copy
              </button>
            </div>
          </div>
          <p className="after rv">
            Restart Claude Code after installing. No repo required. Or just say it:{" "}
            <code>ask the council whether we should…</code>
          </p>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <span>
            High Council · MIT ·{" "}
            <a href={REPO} target="_blank" rel="noopener">
              github.com/mihhhir08/high-council
            </a>
          </span>
          <span>Built for Claude Code. Not affiliated with Anthropic.</span>
        </div>
      </footer>
    </>
  );
}
