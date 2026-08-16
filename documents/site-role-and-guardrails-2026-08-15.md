# Sprinter Studio role and guardrails

**Decision date:** 2026-08-16 · **Revised:** 2026-08-16 (D5 two-track identity folded in)

## One job

`sprinter.studio` is **Sprinter Studio — the venture studio of Sprinter**, working in the open. It incubates new products in two clearly separated tracks and publishes the record: hypotheses, prototypes, live properties, reusable patterns, and the evidence used to advance, revise, pause, archive, or stop them.

It is not the master Sprinter company site, the first commercial offer, or a substitute for customer proof.

## The two tracks (D5 — canon, not a suggestion)

Every entry on the site sits under exactly one of these, labeled on its card. No unlabeled third bucket, no entry listed twice.

| Track | Definition |
| --- | --- |
| **Partner incubations** | New products Sprinter incubates with a named partner who brings the domain and the demand. |
| **Internal experiments** | Products Sprinter starts on its own bench, published while they are still unproven. |

No partner incubation is published today. The section ships with an explicit empty state rather than borrowing an internal experiment to fill it — and the site says so in the ledger, the FAQ, `llms.txt`, and the chat prompt. **When a partner incubation is added, the partner must be named.**

Any graduation sentence is scoped to internal experiments only, or omitted: nothing ratified says Sprinter carries a partner-built product into its own portfolio.

## Portfolio role

| Need | Destination |
| --- | --- |
| Understand Tyler's judgment, worldview, and selected proof | `tylerdreher.com` |
| See whether individual AI use is occasional, productive, or repeatable | `sprinter.ai/ai-skills-check` |
| Train one operating team using its existing AI tools and real work | `sprinter.ai/ai-productivity-workshop` |
| Give five operating companies the same practical AI baseline | `sprinter.ai/portfolio-ai-training-pack` |
| Set up or implement a named workflow that has earned deeper help | `sprinterconsulting.com` |
| Follow public experiments, build method, and technical learning | `sprinter.studio` |

## The commercial routing rule

The studio should not ask a visitor to understand an AI Operating Partner category, portfolio diagnostic, custom platform, or transformation mandate before Sprinter has earned trust.

The default commercial route is:

1. Free AI Skills Check
2. $2,500 AI Productivity Workshop
3. $10,000 five-company Portfolio AI Training Pack
4. Optional setup, adoption support, or implementation only when the work earns it

A workflow goes directly to Sprinter Consulting only when the buyer can name the workflow, owner, repeated demand, system boundary, approval boundary, and evidence required for implementation.

## Claims retired

The following framing is intentionally removed:

- “One Founder. 19 Ventures. Zero Employees.” — and any “no employees” framing
- “The AI Venture Factory” as the master identity (or anywhere at all)
- A fixed 1–3 day idea-to-MVP claim
- “AI agents run everything”
- “The venture runs itself” at an arbitrary revenue threshold
- Near-zero marginal-cost or 24/7 autonomous-operation claims
- The number of pipeline entries as proof of business scale
- A public URL as proof of demand, revenue, reliability, or a standalone company
- PortCo Audit as a standalone offer or brand
- Sprinter AI leading with a broad operating-partner mandate

These claims optimized for novelty at the expense of trust. A serious buyer or investor would reasonably interpret them as lack of focus, hidden support burden, or an attempt to count experiments as companies.

## New positioning

> **H1:** Two tracks, one bench: products we build with partners, and experiments we run ourselves.
>
> **Subline:** Published while unproven — a public record of what we are testing, shipping, and stopping.

Supporting contract:

- A stage is a confidence label, not a trophy.
- A pipeline entry may be an idea, prototype, tool, service, content property, infrastructure component, or active product.
- AI accelerates bounded work; humans remain accountable.
- Paid client work and validated products come first.
- The simple Sprinter workshop is the normal commercial front door.
- Experiments earn continued attention through reusable learning, qualified demand, strategic leverage, or revenue.
- Stop decisions are part of the output.

## Public status standard

Every experiment record should answer:

1. What is it?
2. Who is it intended for?
3. What is the current stage?
4. What is the current status?
5. What monetization model is only a hypothesis?
6. What real signal exists today?
7. What is still unproven?
8. What evidence would advance, revise, pause, or stop it?
9. Does it support the current commercial funnel or distract from it?

Avoid “promising,” “strong fit,” “clear ROI,” “launch-ready,” and similar language unless the page also states the evidence behind the judgment.

## Stage definitions

### Amble

A question or hypothesis under investigation. No build commitment.

### Sprint

A bounded implementation intended to answer one consequential question. Shipping is not the gate; evidence is.

### Sail

A live property with a reason to continue: repeated use, qualified demand, revenue, strategic reuse, or another explicit source of value. Sail does not imply meaningful revenue or a self-sustaining company.

### Archived

A recorded experiment, offer, or property that no longer deserves active attention. Its learning remains visible; it is not presented as a current commercial path.

## PortCo Audit decision

The standalone PortCo Audit offer is retired.

The concept asked a sponsor to buy and understand a new diagnostic before Sprinter had established a simple, familiar first purchase. Relevant demand now routes to:

- one $2,500 company workshop;
- the $10,000 five-company Portfolio AI Training Pack;
- or Sprinter Consulting after a specific workflow has earned implementation.

The old property may remain in the ledger as an archived decision, but it must not compete with the current offer.

## Operating priority

The studio is subordinate to the commercial business and validated product obligations. It should consume founder attention only when the experiment:

- supports workshop sales, active client delivery, or a validated product;
- creates a reusable component or operating pattern;
- has unusually strong domain access and distribution;
- generates qualified demand or revenue;
- or answers a strategic question cheaply enough to justify the interruption.

Everything else stays in Amble, pauses, or stops.

## Commercial CTA standard

Every cross-domain link appends `?utm_source=studio&utm_medium=site`. Keep the URLs in `lib/links.ts` rather than hard-coding them in components.

The site may use these calls to action:

- **Start with the free AI Skills Check** → `https://sprinter.ai/ai-skills-check` *(the primary top-of-funnel CTA)*
- **Start with the workshop** → `https://sprinter.ai/ai-productivity-workshop`
- **Train five companies** → `https://sprinter.ai/portfolio-ai-training-pack`
- **Implement a proven workflow** → `https://sprinterconsulting.com`
- **Understand the founder** → `https://tylerdreher.com`
- **Inspect the method/code** → the Studio playbook or GitHub repository

Do not use generic “Work with Sprinter” copy when the exact destination can be named.

## Publishing checklist

- [x] Homepage and playbook use the same evidence-gated language
- [x] Every entry is labeled with its track, and the two tracks are visibly separated
- [x] Header routes commercial visitors to the free AI Skills Check first
- [x] Mobile navigation exposes the skills check, workshop, portfolio pack, and implementation backend
- [x] Every pipeline record has an honest current status
- [x] PortCo Audit is labeled archived, consolidated, and **visible** in a Stopped and archived section
- [x] Health-related experiments use careful scope and claims language
- [x] `ambleideation.com` is the canonical Amble link, labeled `Amble — the company brain` (D4)
- [x] Metadata describes the venture studio, not an autonomous venture factory
- [x] Open Graph images (root and per-experiment) match the positioning; the stale static `public/og.png` is deleted so the dynamic route is the one that renders
- [x] `llms.txt` and the chat system prompt carry the same framing as the pages
- [ ] Mobile navigation and experiment detail pages are verified in a browser
- [ ] Existing indexed title/description changes are monitored after launch
- [x] Studio does not become a fifth commercial offer

## What comes next

The next improvement is not more experiments. It is a better operating ledger:

- last meaningful evidence date;
- decision owner;
- current question;
- next gate;
- support burden;
- revenue or qualified-demand state;
- strategic reuse;
- and explicit pause/archive history.

That would make the studio a genuinely useful proof of judgment instead of a gallery of domains.
