# sprinter-studio — Product Spec

**Last updated:** 2026-08-07 (session: truth-labeled portfolio rebuild)
**Version:** 0.2

---

## Overview
Sprinter Studio is the public site for a truth-labeled, services-backed venture portfolio. It shows what
Tyler Dreher owns, operates, takes on as client work, or is running as an experiment — each item labeled
with a relationship, a public state, evidence, and a last-verified date — and offers a narrow, qualification-
gated path for domain insiders to propose a co-build. It is explicitly not a fund.

## Problem
The previous version of this site made claims ("One Founder. 19 Ventures. Zero Employees.", "autonomous AI
agents... around the clock", "every venture is real") that the underlying data directly contradicted (no
evidence fields, several ventures with no URL, statuses like "Ideating" and "DNS pending"). A site that
oversells its own portfolio is a liability for a services/co-build business whose credibility depends on
buyers trusting its claims.

## Target Users (ICP)
- Domain insiders with real distribution, cash, a specific product wedge, and clean IP, evaluating a
  co-build relationship.
- Potential clients or collaborators evaluating whether Tyler's build track record is credible.
- Search/LLM crawlers indexing the site's claims (`llms.txt`, JSON-LD) — must not be fed anything the
  human-facing copy wouldn't also say.

## Core Features

### Feature 1: Truth-labeled venture portfolio
- **Description:** Every portfolio item carries `relationship`, `publicState`, `evidence[]`, and
  `lastVerified`, validated by a zod schema (`app/data/venture.schema.ts`). Only `listed:true` items render
  publicly, on the homepage grid, `/ventures`, and `/ventures/[slug]`.
- **Acceptance criteria:**
  - [x] `listed:false` is the default; delisting is never deletion.
  - [x] `publicState: 'live'` requires both a `url` and `live-url` evidence entry (schema-enforced).
  - [x] Empty `evidence` arrays are legal and render as "No public evidence attached yet."
  - [x] `scripts/validate-ventures.ts` fails CI on schema violations, warns on stale (`lastVerified` > 90 days).
- **Status:** `shipped` (code); verification gates unrun this session — see BACKLOG T001.

### Feature 2: Co-build qualification
- **Description:** `/co-build` states fit criteria and disqualifiers for a selective co-build relationship;
  no open lead-capture form.
- **Acceptance criteria:**
  - [x] No invented contact email or third-party form vendor.
  - [x] Explicitly labeled as review-gated, not a guaranteed-response funnel.
- **Status:** `shipped`, pending Tyler review of the CTA mechanism (DECISIONS ADR-005).

### Feature 3: Founder capability proof
- **Description:** `app/data/proof.ts` — conservative, ledger-cited proof of what Tyler has actually built
  (Cab-O-Matic, Amble, ChatGPT Sites family planner, mortgageQ prototype), rendered separately from the
  venture schema since none has a confirmed public evidence URL in the accessible source files.
- **Acceptance criteria:**
  - [x] Every claim traceable to SOURCE-LEDGER.md's `public-safe` rows.
  - [x] Relationship labeled accurately (Amble is `operated`, a sibling company, not owned by Studio).
- **Status:** `shipped`, pending Tyler line-by-line review (BACKLOG T004).

## Non-Goals
- No fund, capital raise, or portfolio-returns framing anywhere on the site.
- No lead-capture form, database, or third-party form vendor.
- No AI chat surface (removed this session — see DECISIONS ADR-004).
- No venture-count headlines, autonomy/24-7 claims, or unevidenced MRR targets.

## Technical Architecture
- **Stack:** Next.js 16.3.0 (app router), TypeScript strict, Tailwind v4, shadcn/ui, zod, Vercel hosting.
  **No Supabase, no AI SDK, no database** — CLAUDE.md's "Supabase" stack note is stale; corrected below.
- **Auth:** None — fully static/public site, no user accounts.
- **Key patterns:** Server components by default; `Reveal`, `Pipeline`, and `SiteHeader`'s mobile menu are
  the only client boundaries. `cacheComponents` + `partialPrefetching` enabled in `next.config.ts` (Next
  16.3 Instant Navigation) — unverified against a real build this session.
- **Data model:** `app/data/venture.schema.ts` (zod) + `app/data/ventures.ts` (data + derived exports:
  `listedVentures`, `featuredVentures`, `stateConfig`, `relationshipConfig`). `app/data/positioning.ts` is
  the single source for the canonical positioning/not-a-fund copy, reused across the homepage, `/co-build`,
  `llms.txt`, and metadata.
- **See:** `documents/DECISIONS.md` for ADR-001 through ADR-007.

## Open Questions
Unresolved product decisions. Agents should NOT unilaterally resolve these.
- [ ] OQ001: Should delisted ventures ever be permanently retired vs. always eligible for re-verification?
- [ ] OQ002: Is the `github.com/tylerdr` link the permanent `/co-build` next step, or a placeholder for a
      future real intake mechanism?

## Scope Additions Log
*Verbatim or close-paraphrase of Tyler's scope changes, not yet incorporated above.*

| Date | Input | Status |
|------|-------|--------|
| 2026-08-08 | Tyler's 7 controlling overrides on the Fable brief (chat removal, no invented contact email, listed:false default, services-backed/not-a-fund, one branch, Next 16.3.0 + a11y/spacing, doc updates) — see `documents/PROMPTS.md` 00:48 UTC | incorporated |
