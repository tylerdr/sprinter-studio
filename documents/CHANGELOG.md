# Changelog

*Append-only, newest first. Never edit old entries.*

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
