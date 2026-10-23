# Portfolio and share audit — 2026-10-23

Compared all 32 public Tai Durden project profiles with their linked sites, then checked Recovery Wellness Longevity, Hybrid Marks, AdsInChat and SurveyClose. Ran the production OG Fixer /api/preview audit for all 38 product/root URLs, including Studio and Sprinter Agent and BrandKit's contract audit for the 32 public reference contracts plus six source-observed drafts. Raw audit evidence lives in the local 2026-10-23/portfolio-share-audit task folder.

## Portfolio changes

Added BrandKit Express, PlayDays, Potential Pools, SpecSprint, SpotBundle, UIProof, Recovery Wellness Longevity, AdsInChat and SurveyClose to Sail. Added the explicitly requested Hybrid Marks as Sprint: it is a live prototype on its Vercel hostname, with a custom domain pending. Added no Vercel-only projects from Tai's catalog unless explicitly requested. Ohio Electricity Rates remains Retired; earlier restored Sail projects remain Sail. The ledger now has 30 entries: 29 active, 18 Sail, one retired.

Descriptions follow the current live product when Tai's reference is stale. SpecSprint now leads with its industrial drawing catalog pilot, SurveyClose is an offline open-text survey coding toolkit, and AdsInChat is an independent offline ad-test planner. Status does not claim commercial traction.

## Share repairs

Missing cards: Hybrid Marks, HireAgentBuilders, and SpecSprint's industrial homepage. Non-contract proportions: AdsInChat and SurveyClose. Repairs add dedicated 1200×630 typography cards in each existing site's palette with explicit social metadata. Existing on-page imagery stays unchanged. HireAgentBuilders also receives an initials favicon.

Studio project pages use project-specific Twitter images and descriptions. Long venture names use smaller type in the generated OG card.

## BrandKit findings

All 38 contracts are structurally valid. Public reference contracts and newly observed contracts do not establish owner-approved identity, logo rights, palette, typography or contrast evidence. Those remain explicit unknowns, not approved brand kits. New observed drafts retain first-party source URLs and the OG Fixer observations. Tai/BrandKit's SpecSprint description is stale relative to the industrial homepage; live product copy takes precedence.

CreditLatch has missing metadata but only a Vercel address and is not being added to Studio. Brighter Postpartum also uses a Vercel address and an unusually wide share image. These are outside the custom-domain additions. Existing reachable non-1200×630 images elsewhere are reported at their actual dimensions; validity does not mean full brand approval.

## Validation

Studio lint, TypeScript, SEO contract and production build passed. React review: metadata remains server-side, no client dependencies or effects added, card text stays accessible via metadata alt text. Individual site build/tests and production OG Fixer rechecks accompany the deployment. No DNS or mail configuration changes.

## Published verification

All 30 Studio detail pages return HTTP 200 and reachable, decodable 1200×630 Open Graph and Twitter images. Studio root also passes. SpecSprint, HireAgentBuilders and SurveyClose card repairs are live and re-audited. AdsInChat and Hybrid Marks fixes are merged and live. Hybrid Marks deployed prebuilt; AdsInChat required a remote rebuild after a prebuilt missing-file error, and used one explicitly authorized paid queue override. Sprinter Agent was also found without a card; its repair is live, with an OG Fixer score of 100 and both images verified. Raw evidence and current release status are recorded in the local portfolio-share-audit/REPORT.md.
