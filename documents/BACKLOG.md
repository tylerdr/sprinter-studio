# Backlog

*Single source of truth for what's next. Coding agents update at session end. Tyler can add at any time.*

---

## Active Sprint
- [ ] T009: Confirm hosted CI goes green on PR #3 head `4e1c724` (run 31567925173 was in progress at 2026-08-11 session end) — `build-and-test` has never completed on CI hardware. `HIGH`
- [ ] T002: Playwright MCP visual check of `/`, `/ventures`, `/ventures/[slug]`, `/co-build`, `/playbook`, 404 — required by CLAUDE.md before any UI task is "done"; not done 2026-08-07. `HIGH`
- [ ] T003: Live-URL check + real evidence for the 8 "in-development" legacy ventures with a URL (getfoundinchat, aiopsguide, aibizblueprint, shreddify, protocolrank, ohioelectricityrates, winemakeros, everymcp, cimreader, portcoaudit, hireagentbuilders, shotfreetrt, sprinteragent, roofrainmaker) so any can move to `listed:true`. `HIGH`

## Next Up
- [ ] T004: Tyler review of `app/data/proof.ts` wording against SOURCE-LEDGER.md line by line.
- [ ] T005: Decide `/co-build`'s permanent CTA mechanism (currently a labeled github.com/tylerdr link, not a form — see DECISIONS ADR-005).
- [ ] T006: Verify Next 16.3.0 `cacheComponents` validation via the dev overlay / `instantInsights` — the `next build` side is confirmed clean (2026-08-11: 11/11 routes prerender), dev-overlay check still pending.

## Tech Debt
- [ ] TD001: `app/data/proof.ts` is not zod-validated or covered by `scripts/validate-ventures.ts` (intentional per ADR-003 — these aren't schema-shaped ventures) — consider a lightweight validator if the proof list grows.
- [ ] TD002: `components/ui/dialog.tsx` and `components/ui/sheet.tsx` are installed and unused (pre-existing, out of this session's scope).
- [ ] TD003: `SiteHeader`'s mobile menu button and a handful of `<a>`s are still raw HTML elements per the original audit — not touched this session beyond the header nav links and Escape-to-close; a full shadcn conversion is separate work.
- [ ] TD004: `public/og.png` is now unreferenced (file-convention `opengraph-image.tsx` wins) — safe to delete, left in place this session.
- [ ] T008: CI builds the app twice — the dedicated `Build` step and again inside Playwright's `webServer.command` (`pnpm build && next start`) — doubling CI time and risking the 180s webServer timeout on cold runners. Surfaced 2026-08-11 by review; pre-existing.

## Open Questions (blocking work)
- [ ] OQ001: Should any of the 19 delisted ventures be permanently retired (never re-checked) vs. pending a future live-URL verification pass? — blocks T003.

## Open Questions (non-blocking)
- [ ] OQ002: Should `app/data/proof.ts` items eventually get real public evidence URLs (e.g., a Cab-O-Matic marketing page) so they can move into the schema-validated venture list instead of the separate narrative surface?

## Completed
- [x] T001: Full verification gate ran and passed 2026-08-11 — install (frozen lockfile), lint, typecheck, validate-ventures (19 records), check-banned-phrases, build (11/11 prerendered), e2e (6 passed, 1 by-design skip — zero `listed:true` ventures per ADR-002).
- [x] T007: Version pins resolve — `pnpm install --frozen-lockfile` clean 2026-08-11; `@next/playwright` instant() suite executes.
- [x] T-2026-08-11-A: CI pnpm version-conflict repair — removed `version` input from `pnpm/action-setup@v4` so `packageManager` is authoritative; commit `4e1c724` on PR #3 — done 2026-08-11.
- [x] T-2026-08-07-A: Truth-labeled portfolio rebuild — schema, data migration, chat removal, homepage/playbook rewrite, /ventures + /co-build routes, discovery-surface truth pass, Next 16.3.0 config, Playwright scaffold, CI rewrite — done 2026-08-07 (code only; see T001/T002 for unrun verification).
