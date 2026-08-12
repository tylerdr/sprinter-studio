# Changelog

*Append-only, newest first. Never edit old entries.*

---

## 2026-08-11 — CI pnpm version-conflict repair (Claude Code session)

**Branch:** feat/portfolio-brand-next16-20260807 (PR #3 → dev, draft) — pushed `4e1c724`
**Tyler's prompt:** Replacement controller for stuck session 33ab3e27; fix the proven exact-head CI failure with the smallest scoped repair. Full text: `documents/PROMPTS.md` 2026-08-12 05:41 UTC.

**Shipped:**
- `.github/workflows/ci.yml` — removed the `version: 10.33.3` input from `pnpm/action-setup@v4` (2 deletions). The action's version check compares the raw `packageManager` string (`pnpm@10.33.3+sha512…`) against the input and never strips the corepack hash, so any coexistence fails with "Multiple versions of pnpm specified" and skips every validation step. `packageManager` is now the single source of pnpm-version truth.

**Verification:** all local gates ran and passed — install (frozen lockfile), lint, typecheck, validate-ventures (19 records), check-banned-phrases, build (11/11 routes prerender), e2e (6 passed, 1 by-design skip). Independent non-author reviewer APPROVED after source-level and empirical verification. Hosted CI run 31567925173 in progress at session end.

**Decisions:** none (no ADR — smallest correct fix for an already-proven diagnosis)
**Follow-up / tech debt created:** T008 — CI builds the app twice (dedicated Build step + Playwright `webServer.command`); T001/T006-build-side/T007 closed.

---

## 2026-08-07 — Truth-labeled portfolio rebuild (Claude Code session)

**Branch:** feat/portfolio-brand-next16-20260807 (not committed/pushed this session)
**Tyler's prompt:** Implement the accepted Fable brief with 7 controlling overrides — remove Chat/`/api/chat`, no invented contact email or form, default all unverified ventures to `listed:false`, state services-backed/not-a-fund and remove venture-factory/autonomy/MRR claims, one branch (commits not PRs), upgrade to Next 16.3.0 with `cacheComponents`+`partialPrefetching` and add `/ventures`+`/co-build`+shells+Playwright, update all mandatory docs. Full text: `documents/PROMPTS.md` 2026-08-08 00:48 UTC.

**Shipped:**
- `app/data/venture.schema.ts`, `app/data/positioning.ts`, `app/data/proof.ts`, `app/data/methodology.ts` — new truth-labeling data layer
- `app/data/ventures.ts` — migrated to the new schema; all 19 legacy entries `listed:false` (ADR-002)
- `scripts/validate-ventures.ts`, `scripts/check-banned-phrases.sh` — new CI gates
- Removed `app/components/Chat.tsx`, `app/api/chat/`, and the `@ai-sdk/*`/`ai`/`framer-motion` deps
- `app/page.tsx` + `app/components/home/*.tsx` — homepage split into server component + sections
- `app/ventures/page.tsx`, `app/co-build/page.tsx` — new routes
- `app/ventures/[slug]/page.tsx` — real `notFound()`, `dynamicParams = false`
- `app/{loading,not-found,error,global-error}.tsx` + per-route loading shells
- `app/layout.tsx`, `app/opengraph-image.tsx`, `app/ventures/[slug]/opengraph-image.tsx`, `app/llms.txt/route.ts`, `app/sitemap.ts` — discovery-surface truth pass
- `app/playbook/page.tsx` — removed MRR ladder and autonomy claims
- `next.config.ts`, `package.json` — Next 16.3.0, `cacheComponents`+`partialPrefetching`, dropped dead deps
- `playwright.config.ts`, `e2e/*.test.ts`, `.github/workflows/ci.yml` — Playwright + full CI gate list
- `app/components/Reveal.tsx`, `app/components/SiteHeader.tsx`, `app/layout.tsx` — a11y/chrome polish (reactive reduced-motion, skip link, header-overlap fix, Escape-to-close)

**Decisions:** ADR-001 through ADR-007 (see `documents/DECISIONS.md`)
**Follow-up / tech debt created:** TD001–TD004, T001–T007 (see `documents/BACKLOG.md`) — most critically, verification gates (lint/typecheck/build/tests) never ran this session; sandbox denied `npm`/network access.

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
