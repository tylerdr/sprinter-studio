# Prompts Log

*Verbatim record of Tyler's instructions. Append-only, newest first. Do not edit or paraphrase existing entries.*

*Tyler's input is scarce and valuable. Exact words are preserved so scope never gets lost or misremembered.*

---

## 2026-08-19 06:47 UTC — Finish and cut over the five portfolio sites

**Tyler's exact words:**
> finish fixing all and cutting them over once fully validated on vercel deploy domains.

**Context:** Isolated branch `fix/production-cutover-20260818`; current public and Vercel state is being reconciled after the August 12 stopping-point handoff.
**Action taken:** Started a five-site source, browser, CI, Vercel, DNS, rollback, and proof-safety audit before implementation or cutover.
**Spec impact:** Pending exact-head audit; no product-scope decision recorded yet.

## YYYY-MM-DD HH:MM UTC — [brief topic]

**Tyler's exact words:**
> [paste verbatim]

**Context:** [Session branch / what was happening when this came in]
**Action taken:** [How the agent responded / what it built]
**Spec impact:** [Did this update SPEC.md? Which section?]

---

## 2026-10-23 — live links and current portfolio
Tyler: Update sprinter.studio to reflect project status using taidurden.com. Move Ohio to Retired; restore OG Fixer, AI Biz Blueprint, AI Ops Guide, and CIM Reader to Sail; add Peaked Labs to Sail. Update cross-site links to the correct live domains.

## 2026-10-23 — expand live portfolio and share assets
Tyler: Add other Tai Durden projects that are live on real domains, including recoverywellnesslongevity.com, Hybrid Marks and recent launches. Run OG Fixer and BrandKit on all of them and ensure valid share images.

## 2026-10-23 21:59 UTC — recent launches on both portfolio sites

**Tyler's exact words:**
> Where are we at on Scope Your SaaS? Let's make sure that's been added to Ty Durden's site and the Sprinter Studio site, as well as all the other new recent ones that we've launched: Wellness Recovery Longevity, Scope Your SaaS, the SOP stuff, any that has a domain, ads in chat, any other new ones, and recommend what's next up as a revenue driver using our existing domains, what we should build. It can be fully agent fulfilled.

**Source:** Tyler, Sentinel_5ae08d43eb7c8191a447d14944903ea1; trusted user evidence supplied by the coordinating task.
**Context:** Isolated branch `chore/recent-venture-listings-20261023`, based on `8e84884fc1aaec506cdd37de299bfdccb7aa26f4`. Root confirmed one implementer and no active competing writer. Existing site-owner work is recorded in merged PRs #17 and #18.
**Action:** Add only the three verified missing Studio records: Scope Your SaaS, ClosePilot SOP and CloseKit. Preserve all 30 existing records, the current design and runtime settings. Root owns independent review and any remote publication.
**Spec impact:** Record these as Sprint experiments with current capability and checkout limitations; a public listing does not establish paid fulfillment or demand.

## 2026-11-23 — Sprinter web family, Phase 1 (Studio = Prove)

**Source:** Tyler, via the coordinating session for the four-site Sprinter web family. Shared brief: `SprinterVault/35-Sources/processed/2026-11-23-sprinter-web-family-brief.md` (authoritative).
**Direction:** Make sprinter.ai, sprinterconsulting.com, sprinterdataworks.com and sprinter.studio read as one credible AI-leader brand family. Phase 1 keeps each site's visual identity (no logo, palette or font changes) and fixes copy, SEO/AEO/GEO and cross-linking, then ships to production. Studio's role is **Prove**: the venture studio and public experiment ledger, not a commercial offer.
**Studio scope:** shorter first screen that says what this is in one read; "Work with Sprinter" routing to the right family offer instead of only the Executive AI Accelerator; shared "The Sprinter family" footer with the canonical one-liners; entity graph per the brief; llms.txt with Sprinter Dataworks; explicit AI-crawler robots rules; breadcrumbs and per-page OG. Ledger entries keep their evidence and boundaries; no new claims.
**Spec impact:** Commercial routing revision recorded in `site-role-and-guardrails-2026-08-15.md`.
