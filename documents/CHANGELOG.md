# Changelog

*Append-only, newest first. Never edit old entries.*

---

## 2026-09-13 — Revenue-coherence S3: dead domains leave "Live" (Claude Code session)

**Branch:** fix/revenue-coherence-2026-09-13 → PR (not merged)
**Prompt:** review-2026-09-13 revenue-coherence S3 — the ledger must not mark dead domains "Live"; re-verify every venture domain.

**Shipped:**
- `app/data/ventures.ts` — AI Biz Blueprint (HTTPS fails, HTTP serves a parking lander), OG Preview Tool (no DNS), and CIM Reader (HTTPS 200 is a parking lander) → archived with Offline statuses; no outbound link, screenshot, or featured flag (the AI Ops Guide pattern). Every other linked domain serves its own site.
- `e2e/site.spec.ts` — "live destinations" test now covers every archived record and asserts no entry that links its own domain is archived or offline.

**Open for Tyler:** CIM Reader was a featured Sprint entry; restore it when cimreader.com serves the prototype again. sproutparent.com (Amble, unlinked) returns Vercel DEPLOYMENT_NOT_FOUND.

---

## 2026-09-13 — Re-review polish + D21 ledger truth (Claude Code session)

**Branch:** polish/review-2026-09-13 → PR (not merged)
**Tyler's prompt:** D21 — add a partner-incubation inquiry route; PortCo Audit is not retired; clean up venture entries whose screenshots contradict their status.

**Shipped:**
- `app/components/PlaybookDiagram.tsx` — vertical mobile layout; the rail draws downward (stroke-dashoffset), gates/nodes pop in order, static under reduce
- `app/globals.css` — walking marker hidden at rest (visibility), so it never shows as a stray dot
- `app/page.tsx` — one hero caveat sentence; §02 partner empty state carries "Propose a partner incubation" (mailto hi@sprinter.ai, `outbound_click`, placement `partner-incubation-inquiry`) instead of repeating §01
- `app/components/SiteHeader.tsx` — drawer drops the duplicate Consulting link; the roster keeps the footer's label
- `app/data/ventures.ts` — PortCo Audit → Sail, live offer at portcoaudit.com; AI Ops Guide → archived, "Offline · domain parked" (HTTPS fails, HTTP serves a parking lander), no outbound link or screenshot
- `app/ventures/[slug]/page.tsx` — screenshots carry a caption: figures are the property's own marketing claims
- `app/llms.txt/route.ts`, `app/api/chat/route.ts` — partner inquiry route
- `e2e/site.spec.ts` — partner CTA, diagram layout + hidden marker, live-only venture links

**Open for Tyler:** portcoaudit.com sells a $2,500 workshop qualifier (competes with the Accelerator); aiopsguide.com is registered (Namecheap, expires 2027-08-29) but parked.

---

## 2026-08-20 — Builder's board rebrand (Claude Code session)

**Branch:** brand/builders-board-2026-08-20 — NOT merged, NOT pushed (main auto-deploys to sprinter.studio; orchestrator runs gates and merge)
**Tyler's prompt:** D19 — one black "builder's chalkboard" brand across sprinter.ai, sprinterconsulting.com, and sprinter.studio; studio gets the most personality (chalk-green + chalk-amber, accent-filled primary buttons) but stays luxury/minimal; clean up instruction-leak copy.

**Shipped (on the branch):**
- `app/globals.css` — board/chalk/hairline/chalk-green/chalk-amber tokens replace the neon terminal palette; grain overlay; chalk-grid texture; 4px radius
- `app/layout.tsx` — Fraunces as `--font-display`; themeColor #0e0d0b
- `app/components/Reveal.tsx` — scroll reveal is transform-only; opacity never touched (fixes blank full-page screenshots)
- `app/page.tsx` — § eyebrows, Fraunces headlines, hairline rows; "CURRENT OPERATING RULE" box and "What this is not" card rewritten per BRAND.md §4
- `app/playbook/page.tsx`, `app/ventures/[slug]/page.tsx`, both opengraph images, `Pipeline`, `PlaybookDiagram`, `SiteHeader`, `SiteFooter`, `Chat`, `components/ui/*`, `app/data/ventures.ts` stageConfig — recolored to the chalk grammar

**Decisions:** D19 (orchestration/brand-2026-08-20/BRAND.md); identity guards (venture-studio title, two tracks, Organization JSON-LD, Amble→Sprint→Sail, accelerator facts) verified intact
**Follow-up / tech debt created:** `public/hero-texture.webp` now unused; e2e + build must run before merge (not run here — shared-box memory policy)

---

## YYYY-MM-DD — [Brief description] (Claude Code / Codex session)

**Branch:** feature/name → merged to main (PR #N)
**Tyler's prompt:** "[verbatim or close paraphrase of the instruction that kicked this off]"

**Shipped:**
- `path/to/file.ts` — [what it does]
- `path/to/other.ts` — [what it does]

**Decisions:** ADR-001
**Follow-up / tech debt created:** [Any items added to BACKLOG.md]

---

## 2026-10-23
Refreshed project stages, restored four products, added Peaked Labs, retired Ohio, corrected obsolete project descriptions, and routed accelerator links to the live Consulting domain.

## 2026-10-23 — portfolio expansion and share cards

Added ten current ventures, accurate live-product descriptions, project-specific Twitter cards and long-title handling. Audited 36 project URLs through OG Fixer and 36 BrandKit contracts; documented approval gaps.

Production verification: all 30 Studio detail pages and both share-image declarations pass. Expanded product audits to 38 URLs including Studio and Sprinter Agent.

## 2026-10-23 — three recent-launch listings (local preparation)

Added Scope Your SaaS, ClosePilot SOP and CloseKit as internal Sprint records with verified destinations and explicit capability/checkout limitations from the approved coordinating-task packet. Preserved all 30 previous records; the ledger now contains 33 entries, 32 active. Shared page, metadata and sitemap rendering required no changes.

Lint, typecheck, SEO contract, record-preservation checks and independent source review pass. The normal build is blocked locally by Google Fonts network access; a clearly labeled build using bundled-font test responses passed. Desktop/mobile checks passed for the ledger, three detail pages, navigation, copy, links and metadata; six declared social-image responses are valid 1200×630 PNGs; sitemap contains 35 URLs. See `HANDOFF.md` for validation limits and local artifacts.

Prepared on `chore/recent-venture-listings-20261023`; not remotely published, merged or deployed by this task. Normal Vercel build and exact-deployment verification remain with the coordinating task.
