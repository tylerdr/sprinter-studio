# sprinter-studio — Agent Guide

> Keep this file under 100 lines. It's a map, not a manual. Point to documents/ for depth.

---

## Stack
- Next.js 16.3.0 (app router, `cacheComponents`+`partialPrefetching`), TypeScript, zod, shadcn/ui, Tailwind v4
- Vercel hosting. No Supabase, no database, no AI SDK — static/public marketing + portfolio site only.

## Commands
```bash
npm run dev                  # start local dev server
npm run build                # build
npm run typecheck            # tsc --noEmit
npm run lint                 # lint
npm run validate-ventures    # zod-validate app/data/ventures.ts
npm run check-banned-phrases # grep gate for venture-factory/autonomy claims
npm run test:e2e             # Playwright (@next/playwright instant() suite)
```

## Code Standards
- **UI components:** Always use shadcn/ui — never raw HTML elements
- **Theming:** CSS variables (no hardcoded colors)
- **TypeScript:** Strict mode, no `any`
- **Accessibility:** All interactive elements must be keyboard navigable
- **Logging:** No `console.log` in production code

## Git Workflow
- Feature branch → PR → merge (never push to main directly)
- Branch naming: `feature/description`, `fix/description`, `chore/description`
- PRs must pass: lint + typecheck + build

## Key Docs
Always read these at session start for non-trivial tasks:
- `documents/HANDOFF.md` — where we left off, what's next
- `documents/BACKLOG.md` — current tasks and priorities
- `documents/DECISIONS.md` — decisions already made (don't re-debate)
- `documents/SPEC.md` — product vision and feature definitions

## Architecture
- `app/data/venture.schema.ts` (zod) is the truth-labeling contract for portfolio items; `app/data/ventures.ts` holds the data and derived exports (`listedVentures`, `stateConfig`, `relationshipConfig`). `listed:false` is the safe default — see `documents/DECISIONS.md` ADR-001/ADR-002.
- `app/data/positioning.ts` is the single source for canonical positioning/not-a-fund copy; reused by the homepage, `/co-build`, `llms.txt`, and root metadata — never hand-duplicate that copy.
- `app/page.tsx` is a server component composing `app/components/home/*.tsx` sections. Client boundaries are limited to `Reveal`, `Pipeline`, and `SiteHeader`'s mobile menu.
- `app/data/methodology.ts` holds the Amble → Sprint → Sail process narrative (used by `/playbook` and the homepage) — it's process copy only, not a per-venture field.
- No lead-capture form/database/vendor anywhere; `/co-build` is qualification copy only (ADR-005).

---

## Session Protocol

### At session start (for any non-trivial task):
1. Read `documents/HANDOFF.md` to orient
2. Read `documents/BACKLOG.md` for priorities
3. Check `documents/DECISIONS.md` before major architectural choices
4. Capture Tyler's prompt: if Tyler's opening message includes new scope/direction, **append to `documents/PROMPTS.md` first** before doing any work

### At session end (mandatory, no exceptions):
1. **`documents/HANDOFF.md`** — overwrite with current state: what's done, what's next, key context
2. **`documents/CHANGELOG.md`** — append what shipped this session
3. **`documents/BACKLOG.md`** — check off completed items, add new debt/questions
4. **`documents/SPEC.md`** — update if scope changed this session
5. **Venture STATUS.md** — write 3-5 bullet summary to the venture workspace at:
   `~/openclaw/workspace/workspace-ventures/ai-ventures/ventures/sprinter.studio/STATUS.md`
6. Commit all `documents/` changes: `git add documents/ && git commit -m "docs: session handoff YYYY-MM-DD"`
