# Session Handoff

*Overwritten at the end of each coding session. If this file is current, start here.*

**Session date:** 2026-08-07
**Agent:** Claude Code
**Branch:** feat/portfolio-brand-next16-20260807
**Status:** `blocked` — code complete, verification gates not run (sandbox had no `npm`/network access)

---

## What was completed this session
- [x] Truth-labeling schema (`app/data/venture.schema.ts`, zod) + migrated `app/data/ventures.ts` (all 19 legacy entries → `listed:false`, see ADR-002)
- [x] `app/data/positioning.ts`, `app/data/proof.ts` (founder capability proof, see ADR-003), `app/data/methodology.ts`
- [x] `scripts/validate-ventures.ts`, `scripts/check-banned-phrases.sh`
- [x] Removed Chat UI + `/api/chat` + `@ai-sdk/*`/`ai`/`framer-motion` deps (ADR-004)
- [x] Homepage split into server `app/page.tsx` + `app/components/home/*.tsx` (ADR-006)
- [x] New `/ventures` index and `/co-build` routes (ADR-005 for the CTA mechanism)
- [x] `notFound()` fix on `/ventures/[slug]`, `dynamicParams = false`, `generateStaticParams` over `listedVentures`
- [x] `app/{loading,not-found,error,global-error}.tsx` + per-route `loading.tsx` (ventures, ventures/[slug], playbook, co-build)
- [x] Metadata/JSON-LD truth pass in `app/layout.tsx`; both `opengraph-image.tsx` rewrites; `llms.txt` rewrite; `sitemap.ts` fix (lastModified from `lastVerified`, added `/ventures` + `/co-build`)
- [x] `/playbook` rewrite (cut MRR ladder, "AI Agents Run Everything", "while you sleep", "in real time")
- [x] `package.json` → Next 16.3.0 + `eslint-config-next` 16.3.0 + `zod`; `next.config.ts` → `cacheComponents` + `partialPrefetching` + `exposeTestingApiInProductionBuild`; dropped dead deps `gray-matter`/`next-mdx-remote`
- [x] a11y/chrome: skip link, fixed-header overlap fix (`pt-32` on non-home mains), `Reveal.tsx` now uses the reactive `useReducedMotion()` hook, `BuiltBySection` heading-hierarchy fix, mobile menu Escape-to-close
- [x] `playwright.config.ts` + `e2e/*.test.ts` using `@next/playwright`'s `instant()`; `.github/workflows/ci.yml` rewritten (lint, typecheck, validate-ventures, check-banned-phrases, build, Playwright)
- [x] Documents updated (this file, BACKLOG, DECISIONS ADR-001–007, SPEC, CHANGELOG)

## Pick up here (priority order)
- [ ] **Run the verification gates** — `npm install`, then `npm run lint`, `npm run typecheck`, `npm run validate-ventures`, `npm run check-banned-phrases`, `npm run build`, `npm run test:e2e`. None of these ran this session (sandbox denied `npm`/network/`curl`; `node_modules/` doesn't exist in this worktree). Fix whatever they surface — the diff was hand-checked but not compiler-checked.
- [ ] Playwright MCP browser check (CLAUDE.md requires visual verification before any UI task is "done") — not done this session, no reachable dev server.
- [ ] Verify `cacheComponents` validation passes on every route once `next build` can actually run — the brief assumes zero dynamic IO makes every route prerenderable, but this is unverified against real Next 16.3.0 behavior.
- [ ] Re-list any of the 19 delisted ventures once a session with network access confirms `url` resolves and adds real evidence (see ADR-002). Right now `/ventures`, the homepage portfolio grid, and `llms.txt` correctly show zero listed items.
- [ ] Tyler: confirm/adjust `app/data/proof.ts` wording (Cab-O-Matic/Amble/ChatGPT Sites/mortgageQ) against the source ledger — it's conservative but not Tyler-reviewed line by line.
- [ ] Tyler: decide whether `/co-build`'s current non-form ending (link to `github.com/tylerdr`, see ADR-005) is the right permanent answer or a placeholder until a real intake exists.
- [ ] This branch has uncommitted changes only — nothing was committed, staged, or pushed per explicit instruction. Review the diff, then commit/PR when ready.

## Important context for next session
- The controlling instruction for this session is `documents/PROMPTS.md` 2026-08-08 00:48 UTC (Tyler's 7 numbered overrides) — it supersedes the earlier Fable brief at `/Users/td/.claude/plans/you-are-fable-5-zany-quokka.md` wherever they conflict (chat removal, co-build CTA, listed:false default, one branch/no PRs).
- `documents/PROMPTS.md` is append-only and was **not** touched beyond the mandated end-of-session append — its prior modified state was preserved as instructed.
- `node_modules/` did not exist at session start and could not be created (`npm install` requires approval this session never received). Every file was written and cross-checked by hand/grep, not by a compiler.
- All 19 legacy ventures are `listed:false` by design — this is correct, not a partial migration. See ADR-002 before changing it.

## Decisions made this session
- ADR-001 through ADR-007 — see `documents/DECISIONS.md` for full records (schema design, delisting default, proof.ts, chat removal, co-build CTA, homepage split, unrun verification).

## Tech debt created this session
- TD-001: Verification gates (lint/typecheck/build/validate-ventures/banned-phrases/Playwright) never executed — see BACKLOG.
- TD-002: `app/data/proof.ts` isn't schema-validated or covered by `scripts/validate-ventures.ts` — intentional (ADR-003) but worth a lighter-weight validator if the list grows.
- TD-003: `/co-build`'s CTA has no real intake mechanism — see BACKLOG and ADR-005.

## Files changed this session
See `git status`/`git diff` on `feat/portfolio-brand-next16-20260807` — full list also in `documents/CHANGELOG.md`.
