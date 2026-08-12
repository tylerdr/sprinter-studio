# Session Handoff

*Overwritten at the end of each coding session. If this file is current, start here.*

**Session date:** 2026-08-11
**Agent:** Claude Code (Fable controller + one delegated writer + one independent reviewer)
**Branch:** feat/portfolio-brand-next16-20260807 (PR #3 → dev, draft)
**Status:** `green locally` — CI repair pushed as `4e1c724`; hosted CI run 31567925173 was in progress at session end

---

## What was completed this session
- [x] Diagnosed and fixed the exact-head CI failure on PR #3: `pnpm/action-setup@v4` threw "Multiple versions of pnpm specified" because `ci.yml` set `version: 10.33.3` while `package.json` `packageManager` is `pnpm@10.33.3+sha512…` — the action compares raw strings and never strips the hash, so they could never match.
- [x] Repair (commit `4e1c724`, 1 file, 2 deletions): removed the `with:/version:` input from the pnpm setup step so `packageManager` is authoritative. Independent reviewer (non-author) APPROVED after verifying the action's source and empirically confirming `pnpm install "pnpm@10.33.3+sha512…" --no-lockfile` resolves to 10.33.3.
- [x] Ran the full verification gate locally, all passing (closes T001): `pnpm install --frozen-lockfile` ✓, `lint` ✓, `typecheck` ✓, `validate-ventures` ✓ (19 records), `check-banned-phrases` ✓, `build` ✓ (11/11 routes prerender, Cache Components clean — also resolves T006's build-side question), `test:e2e` ✓ (6 passed, 1 skipped — the listed-venture detail test auto-skips because zero ventures are `listed:true` by design, ADR-002). T007 also resolved: deps install cleanly from the lockfile.

## Pick up here (priority order)
- [ ] **Confirm hosted CI goes green** on run 31567925173 (head `4e1c724`) — the `build-and-test` job has never completed on CI hardware; most likely flake point is the e2e step's `webServer` doing a second full build inside its 180s timeout (pre-existing, see BACKLOG T008).
- [ ] T002: Playwright MCP visual check of all routes — still not done (no UI changes this session, so not triggered, but required before any UI task is "done").
- [ ] T003–T005, OQ001/OQ002 unchanged — venture re-listing evidence pass and Tyler reviews of proof.ts / co-build CTA.
- [ ] PR #3 remains a **draft** and was intentionally not marked ready, merged, or deployed — that is Tyler's call.

## Important context for next session
- This session was scoped strictly to the CI repair: no product copy/UI, no dependency changes, no force-push. Only `.github/workflows/ci.yml` (repair) and `documents/` (protocol) changed.
- The `documents/PROMPTS.md` entry dated 2026-08-12 05:41 UTC captures the controlling instruction for this session.
- Local environment note: pnpm 10.33.3 is on PATH and `node_modules/` is populated in this worktree — future sessions can run all gates directly.

## Decisions made this session
- None requiring an ADR — the fix implements the already-proven diagnosis with the smallest change; `packageManager` as single source of pnpm-version truth removes the drift class rather than papering over it.

## Tech debt created this session
- T008 (new, pre-existing behavior surfaced by review): CI builds twice — the dedicated `Build` step and again inside Playwright's `webServer.command` — doubling build time and adding timeout/flake risk on cold runners.

## Files changed this session
- `.github/workflows/ci.yml` — commit `4e1c724`
- `documents/HANDOFF.md`, `documents/CHANGELOG.md`, `documents/BACKLOG.md`, `documents/PROMPTS.md` — session protocol
