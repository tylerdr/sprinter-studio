# Architecture Decisions

*Append-only. Never delete entries. To reverse a decision, add a new ADR that supersedes the old one.*

---

## ADR-001: Zod-first truth-labeling schema for portfolio items

**Date:** 2026-08-07
**Status:** Accepted
**Context:** The homepage claimed "One Founder. 19 Ventures. Zero Employees." and "every venture is real" while the underlying `Venture` type had no evidence, relationship, or verification-date fields — the schema itself made overclaiming easy. See `documents/PROMPTS.md` 2026-08-08 00:32–00:48 for the full audit and accepted brief.
**Decision:** Replace `stage`/`status`/`signal` with a zod schema (`app/data/venture.schema.ts`) carrying `relationship` (owned/operated/service-client/experiment), `publicState` (live/in-development/validating/paused/archived), `evidence[]` (typed, empty array legal), `lastVerified` (ISO date, refined to never be in the future), and `listed` (boolean; delisting is never deletion). `publicState: 'live'` is enforced via `superRefine` to require both a `url` and a `live-url` evidence entry.
**Consequences:** Any future venture must clear this schema to render publicly. `scripts/validate-ventures.ts` runs it in CI. The Amble/Sprint/Sail stage concept moved to `app/data/methodology.ts` as pure process narrative (no longer a venture field) since it was being used to imply per-venture pipeline progress the data couldn't support.
**Alternatives considered:** Keeping `stage` as a venture field and just adding evidence — rejected because `stage` was inseparable from the "factory pipeline" framing the audit flagged as the core problem.

---

## ADR-002: All 19 legacy venture entries default to `listed:false`

**Date:** 2026-08-07
**Status:** Accepted
**Context:** Tyler's controlling override (documents/PROMPTS.md 2026-08-08 00:48): "Default every unverified venture to listed:false. Public pages may show only records whose relationship, public state, evidence and lastVerified can be supported by existing repo artifacts or the canonical source ledger." This session had no browser/network access to check any of the 19 URLs, and the canonical SOURCE-LEDGER.md (SprinterVault) contains no entry for any of the 19 (getfoundinchat, aiopsguide, etc.) — only for Cab-O-Matic, Amble, ChatGPT Sites, and mortgageQ.
**Decision:** All 19 legacy entries kept in `app/data/ventures.ts` for history with `listed: false`. Where a screenshot exists in `public/ventures/*.webp`, it's cited as `evidence: [{kind:'screenshot', ...}]` with `capturedAt` set to the actual git commit date the file entered the repo (`2026-07-01`, verified via `git log --diff-filter=A`) — not an invented date. Entries with no screenshot and no URL (roofingreels, sproutparent) or no screenshot/URL evidence at all (ogpreviewtool) get `evidence: []` and `relationship: 'experiment'`. `lastVerified` is set to `2026-08-07` (this review date) for all — the honest state that "this record was checked against available evidence on this date, and the evidence available does not support public listing."
**Consequences:** `/ventures`, the homepage portfolio grid, and `llms.txt` currently show zero listed ventures. This is a correct, intended outcome of the truth-labeling pass, not a bug — see `app/components/home/VenturePortfolio.tsx` and `app/ventures/page.tsx` for the empty-state copy. Re-listing any entry requires an actual live-URL check by a future session with network access, plus updated evidence.
**Alternatives considered:** Trusting the existing screenshots as proof of current "live" status — rejected; a screenshot proves a product was built, not that it's still live today. Guessing at current status from the descriptive copy already in the file — rejected as exactly the "invented evidence" the override forbids.

---

## ADR-003: Founder capability proof kept out of the venture schema

**Date:** 2026-08-07
**Status:** Accepted
**Context:** Override (3) directed conservative use of "verified public-safe proof conservatively, including Cab-O-Matic 19 manufacturers/46 product lines/approximately 4.6M catalog items, Amble architecture, and ChatGPT Sites only where the relationship and evidence are accurately labeled. MortgageQ is a prototype if mentioned." These are `public-safe` in SOURCE-LEDGER.md but none has a confirmed public domain/URL in the accessible source files, so they can't satisfy `venture.schema.ts`'s evidence-URL requirements without inventing one.
**Decision:** Added `app/data/proof.ts` — a separate, non-schema-validated list of founder-level capability proof, rendered in the homepage "What we've actually built" section (`app/components/home/Proof.tsx`). Each entry cites the SprinterVault SOURCE-LEDGER (2026-08-07) as its source rather than a public evidence URL, and is explicitly labeled with its real relationship (Amble is `operated` — a sibling company, not owned by Studio; ChatGPT Sites and mortgageQ are `experiment`).
**Consequences:** This is a second, lighter-weight proof surface alongside the venture portfolio. It intentionally does not go through `scripts/validate-ventures.ts`. If Tyler wants these ledger-cited claims held to the same automated gate, that's a follow-up (see BACKLOG).
**Alternatives considered:** Force-fitting these into `ventures.ts` with a placeholder/invented URL — rejected, explicitly forbidden by the no-invented-evidence rule.

---

## ADR-004: Chat UI and `/api/chat` removed entirely

**Date:** 2026-08-07
**Status:** Accepted
**Context:** Override (1): "Remove the floating Chat UI and /api/chat entirely, then remove AI SDK and motion dependencies only after import verification. The repo and design rules reject a default chat bubble without a strong product job; its ungrounded public endpoint is not a launch dependency."
**Decision:** Deleted `app/components/Chat.tsx` and `app/api/chat/`. Removed `<Chat />` from `app/layout.tsx`. Verified (via repo-wide grep) no remaining imports of `@ai-sdk/*`, `ai`, or `framer-motion` before removing those four packages from `package.json`.
**Consequences:** No AI-answered Q&A surface on the site. `use-reduced-motion.ts` is now consumed only by `Reveal.tsx` (previously also by Chat).
**Alternatives considered:** Keeping chat and grounding it in `listedVentures` (the original Fable-brief PR5 plan) — superseded by Tyler's explicit override, which takes precedence over the earlier brief.

---

## ADR-005: `/co-build` CTA ends in a labeled non-form link, not mailto or GitHub Issues

**Date:** 2026-08-07
**Status:** Accepted
**Context:** Override (2) forbids guessing `CONTACT_EMAIL` or adding a form/vendor, and says the final step "may route to the known Sprinter AI product-wedge surface or remain an explicitly review-gated contact link, but no email/domain destination may be invented." `sprinter.ai` returned 403 in the SOURCE-LEDGER's most recent check (not confirmed publicly live), so routing there risks sending a qualified visitor to a broken page.
**Decision:** `/co-build` ends with a plain-text statement that this is a qualification page, not an open intake, plus a link to `https://github.com/tylerdr` (already used elsewhere in the codebase as a real, verified link) labeled explicitly as "a starting point for a conversation, not a guaranteed response."
**Consequences:** No lead capture exists on the site. This is intentional per the no-go list (no database/form/vendor).
**Alternatives considered:** Linking to `sprinter.ai/product-wedge-review` — rejected because that route/domain isn't confirmed publicly live and Tyler's instructions bar expanding claims about sibling domains beyond existing labeled footer links.

---

## ADR-006: Homepage split into a server component + section components

**Date:** 2026-08-07
**Status:** Accepted
**Context:** `app/page.tsx` was `'use client'` at the top level (640 lines), which blocked route-level `metadata` export and pulled `framer-motion` into every page's client bundle. Next 16.3's `cacheComponents`/`partialPrefetching` only pay off when routes have zero dynamic IO and can fully prerender.
**Decision:** `app/page.tsx` is now a server component composing `app/components/home/*.tsx` server sections. The only client boundaries are `Reveal`, `Pipeline`, and `SiteHeader`'s mobile menu — unchanged from before, just no longer wrapping the whole page. `WhyAIAgents`, `ByTheNumbers`, `ResultsSoFar`, and the standalone `PlaybookCTA` section were cut (banned-claim content or redundant with the Hero's secondary CTA); `HowWeBuild` became `HowWeWork`; `VenturePortfolio` and `PipelineSection` were rebuilt on the new schema; a new `CoBuildSection` was added. `Footer` was extracted to `app/components/Footer.tsx` and now renders on every route (previously homepage-only) so the not-a-fund disclosure is universal.
**Consequences:** Fewer separators/sections (restrained spacing per override 6) — see BACKLOG for the follow-up to verify actual prerendering behavior once `next build` can run.
**Alternatives considered:** Keeping all ten `<Separator>` instances — cut to three (alternating tinted backgrounds instead) since the audit flagged the original rhythm as excessive empty space.

---

## ADR-007: Verification commands could not be executed this session

**Date:** 2026-08-07
**Status:** Superseded by ADR-010 (documented limitation, not a design decision)
**Context:** This session's sandbox denies `npm`, `chmod`, and outbound network commands (`curl`) without an approval this run never received, and `node_modules/` does not exist in this worktree (no prior `npm install`).
**Decision:** All code was written and manually cross-checked (import/usage greps, schema-vs-data field audit, zod-version-safe validators) but `npm run lint`, `npm run typecheck`, `npm run build`, `npm run validate-ventures`, `npm run check-banned-phrases`, and the Playwright suite were not run. The Playwright MCP browser check also could not run (no dev server reachable).
**Consequences:** The next session/reviewer with a working `npm install` must run the full gate list before this branch is considered mergeable. See BACKLOG for the explicit follow-up item.

---

## ADR-008: Homepage proof uses exact relationship and proof-class labels

**Date:** 2026-08-07
**Status:** Accepted; supersedes ADR-003's coarse relationship-label sentence
**Context:** The first implementation labeled Cab-O-Matic `owned`, Amble `operated`, and two builds `experiment`. Those buckets were too coarse for a site whose promise is truth labeling; Cab-O-Matic's controlling relationship is equity partner plus ongoing product and engineering partner, not ownership.
**Decision:** Proof items now carry a separate proof class and exact relationship string. The card renders both, its verification date, and its limitation. The approved classes are capability, product architecture, completed build, and prototype.
**Consequences:** A visitor can distinguish what the work proves from Tyler's relationship to it, without inferring ownership, customers, adoption, or outcomes.

---

## ADR-009: Remove duplicate empty portfolio sections from the homepage

**Date:** 2026-08-07
**Status:** Accepted; narrows ADR-002 and ADR-006
**Context:** With every legacy venture correctly delisted, separate “Portfolio Pipeline” and “Portfolio” homepage sections repeated the same empty state and created large dead zones between proof and the co-build offer.
**Decision:** Keep the complete empty/review state at `/ventures`, but remove both duplicate sections from `/`. The homepage now moves from ledger-cleared proof to method to co-build fit.
**Consequences:** Truth is preserved without making absence the main conversion story. No legacy venture was relisted.

---

## ADR-010: Exact-head local verification completed

**Date:** 2026-08-07
**Status:** Accepted; supersedes ADR-007's sandbox limitation
**Context:** A later controlling session obtained the scoped permissions and installed dependencies needed to run the full gate set.
**Decision:** Exact `next@16.3.0` and `@next/playwright@16.3.0` were verified with lint, typecheck, 19-record venture validation, banned-phrase scanning, production build/start, and Playwright Instant Navigation/browser checks. The final browser suite passed 6 tests with 1 intentional skip because no venture is publicly listed.
**Consequences:** Local exact-head evidence is green. Hosted CI, Vercel preview, and production-domain proof remain separate gates.
