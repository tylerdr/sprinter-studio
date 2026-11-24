# Session Handoff

2026-11-23 — Sprinter web family Phase 1: Studio as "Prove"

## Current state

- Branch `feature/web-family-phase1`, merged to main through a PR after gates pass. The shared brief is `SprinterVault/35-Sources/processed/2026-11-23-sprinter-web-family-brief.md`, and it is authoritative. Design artifact: https://claude.ai/artifact/NMhA3yLeBKBSZk875hmvVp
- Studio is the **Prove** member of the family: Sprinter AI (Build), Sprinter Consulting (Advise), Sprinter Dataworks (Data) and Sprinter Studio (Prove). It is a record, not an offer.
- **First screen:** the H1 is "Partner incubations and internal experiments, published while unproven." It keeps the two-track canon (D5). The lede is one sentence, and a "This is a record, not an offer" line routes to `#working-with-sprinter`.
- **Routing:**
  - The header and drawer CTA is "Work with Sprinter", which links to the on-page router. Clicks are tracked as `route_click`.
  - The router has three cards: Advise (accelerator first, then the five-leader pack, then Consulting), Build (Product Wedge Review) and Data (Dataworks, canonical one-liner only).
  - Partner incubation stays the Studio's only door.
  - The revision is recorded in `documents/site-role-and-guardrails-2026-08-15.md`.
- **Footer:** "The Sprinter family" uses the canonical one-liners verbatim. They live in `lib/links.ts` under `family`. Amble and tylerdreher.com sit in a `related` row.
- **Entity graph** (`app/layout.tsx`):
  - Founder `https://sprinter.ai/#founder`.
  - Parent stub `https://sprinter.ai/#organization`.
  - The Studio, Consulting and Dataworks orgs each declare `parentOrganization`. Siblings are never `sameAs`.
  - /playbook and every venture page carry a BreadcrumbList.
  - There is no Service, Offer or Product schema, because the Studio has no offers.
- **GEO:**
  - robots.txt has a named allow group for the major AI crawlers, and `/api/` is still disallowed.
  - llms.txt has "The Sprinter family" block and the Dataworks route.
- **Ledger:** `app/data/ventures.ts` is unchanged, with 33 records.
- **Repo hooks repaired:** lint-staged and commitlint were added as exact-pinned dev dependencies, with a lint-staged config. Commits now pass the husky hooks without bypassing them.

## Validation

- `quality:seo`, typecheck, lint, `next build` (78 pages) and Playwright: 18 passed, 4 skipped by project.
- Desktop at 1440 and mobile at 390 screenshots of the hero, router, footer and mobile menu. Neither width scrolls sideways.
- After merge, the coordinating report records the production SHA check and the live re-audit.

## Next owner actions

- **Sitemap `lastmod`:** add a real `reviewedAt` per ledger record before emitting it. The SEO contract forbids a deploy-time date.
- **Siblings:**
  - sprinter.ai and sprinterconsulting.com llms.txt should add Dataworks.
  - sprinterdataworks.com should add the family footer.
  - Consulting accelerator titles are over 60 characters.
  - Notes are in the coordinating session's shared notes folder.
- **Build script:** `package.json` calls `pnpm`, but the repo locks with npm.
- **Phase 2:** the masterbrand (logo, palette, fonts) is a separate track. Don't change the visual identity before it.
