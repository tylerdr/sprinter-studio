# Prompts Log

*Verbatim record of Tyler's instructions. Append-only, newest first. Do not edit or paraphrase existing entries.*


---

## 2026-08-08 00:48 UTC

**Tyler's exact words:**
> You are the sole non-Fable implementation writer for sprinter.studio in this exact isolated worktree. You are not alone in the broader codebase: do not revert or overwrite others, do not touch another repository, and preserve the existing modified documents/PROMPTS.md record. Read AGENTS.md, CLAUDE.md and every mandated HANDOFF/BACKLOG/DECISIONS/SPEC file, then read the complete Fable controller brief at /Users/td/.claude/plans/you-are-fable-5-zany-quokka.md. Also read the canonical SOURCE-LEDGER.md, PORTFOLIO-NARRATIVE.md, AUDIT.md, OFFERS-AND-CAMPAIGNS.md, and CUTOVER-CHECKLIST.md under /Users/td/code/SprinterVault/10-C-Suite/Tai-Chief/30-Outputs/deliverables/sprinter-portfolio-brand-revenue-system-2026-08-07. Implement the accepted brief on branch feat/portfolio-brand-next16-20260807 with these controlling overrides: (1) Remove the floating Chat UI and /api/chat entirely, then remove AI SDK and motion dependencies only after import verification. The repo and design rules reject a default chat bubble without a strong product job; its ungrounded public endpoint is not a launch dependency. (2) Do not guess CONTACT_EMAIL and do not add a form/vendor. Create an internal /co-build route for Propose a product wedge; its final next step may route to the known Sprinter AI product-wedge surface or remain an explicitly review-gated contact link, but no email/domain destination may be invented. (3) Default every unverified venture to listed:false. Public pages may show only records whose relationship, public state, evidence and lastVerified can be supported by existing repo artifacts or the canonical source ledger. Separate portfolio, client/co-build, and experiment relationships; never imply ownership. Use verified public-safe proof conservatively, including Cab-O-Matic 19 manufacturers/46 product lines/approximately 4.6M catalog items, Amble architecture, and ChatGPT Sites only where the relationship and evidence are accurately labeled. MortgageQ is a prototype if mentioned. (4) Explicitly say services-backed and not a fund; remove venture-count headlines, zero-employees, autonomous/24-7, portfolio-odds, all-real/live, MRR target, value-while-sleeping, and open-source claims from HTML, metadata, JSON-LD, OG, llms, tests, and docs. (5) Keep one feature branch/one eventual PR; organize Fable's seven PR steps as reviewable commits later, not seven PRs now. (6) Upgrade to exact stable Next 16.3.0, enable only cacheComponents and partialPrefetching, server-render the page shell, add /ventures and /co-build, proper 404/error/loading shells, accessible fixed-header/mobile behavior, restrained spacing, and @next/playwright instant() tests. (7) Update all mandatory repo handoff/decision/spec/backlog/changelog docs accurately. Run whatever scoped commands are available, but prioritize a coherent compiling diff. Do not commit, stage, push, open/modify PRs, deploy, submit forms, change domains/Vercel, use credentials, create a fund/legal offer, or communicate externally. At the end report changed files, commands/tests actually executed, proof rows excluded, and unresolved gates truthfully.

**Classified as:** `pending-review`
**Spec impact:** pending


---

## 2026-08-08 00:41 UTC

**Tyler's exact words:**
> <task-notification>
<task-id>a96aa5861e2e30070</task-id>
<tool-use-id>toolu_01DbNyEVCbhQvJASqnMuDj6E</tool-use-id>
<output-file>/private/tmp/claude-501/-Users-td-code-github-tylerdr-sprinter-studio/14f284cb-72f3-4b69-ac7e-22a4808cecae/tasks/a96aa5861e2e30070.output</output-file>
<status>completed</status>
<summary>Agent "Design implementation plan" finished</summary>
<note>A task-notification fires each time this agent stops with no live background children of its own. The user can send it another message and resume it, so the same task-id may notify more than once.</note>
<result>I have enough context from the audit plus direct reads of `app/data/ventures.ts`, `package.json`, `next.config.ts`, and `.github/workflows/ci.yml`. Here is the plan.

---

# Repositioning + Modernization Plan — sprinter.studio

Canonical positioning (single source of truth, used everywhere): **"A truth-labeled, services-backed venture portfolio. We build and operate our own products, take on selective client work, and co-build with domain insiders who bring distribution, cash, a real wedge, and clean IP. We are not a fund."**

---

## A. Safe portfolio schema

**Decision: zod-first schema, type derived via `z.infer`, in a new server-only file. `ventures.ts` keeps the data and imports the type.**

New file `app/data/venture.schema.ts` (imported only by the validation script and server components, so zod never enters the client bundle):

```ts
import { z } from 'zod'

export const RELATIONSHIPS = ['owned', 'operated', 'service-client', 'experiment'] as const
export const PUBLIC_STATES = ['live', 'in-development', 'validating', 'paused', 'archived'] as const
export const EVIDENCE_KINDS = ['live-url', 'screenshot', 'repo', 'testimonial', 'press', 'changelog'] as const

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(d =&gt; d &lt;= new Date().toISOString().slice(0, 10), 'lastVerified cannot be in the future')

export const evidenceSchema = z.object({
  kind: z.enum(EVIDENCE_KINDS),
  url: z.string().url(),          // for 'screenshot': site-relative path allowed via union with z.string().startsWith('/ventures/')
  label: z.string().optional(),
  capturedAt: isoDate,
})

export const metricSchema = z.object({
  label: z.string(),
  value: z.string(),
  asOf: isoDate,
  evidenceUrl: z.string().url(),  // a metric without evidence is not a metric
})

export const ventureSchema = z.object({
  slug: z.string(),
  name: z.string(),
  domain: z.string(),
  description: z.string(),
  relationship: z.enum(RELATIONSHIPS),
  publicState: z.enum(PUBLIC_STATES),
  archetype: z.enum(['saas', 'marketplace', 'service', 'content', 'tool', 'infra']),
  listed: z.boolean(),            // delisting = listed:false, never deletion
  url: z.string().url().optional(),
  icp: z.string().optional(),
  monetization: z.string().optional(),
  evidence: z.array(evidenceSchema),   // empty array is legal and honest
  metrics: z.array(metricSchema).optional(),  // omitted for ALL 19 at migration
  lastVerified: isoDate,
  featured: z.boolean().optional(),
  screenshot: z.string().optional(),
}).superRefine((v, ctx) =&gt; {
  if (v.publicState === 'live' &amp;&amp; !v.evidence.some(e =&gt; e.kind === 'live-url'))
    ctx.addIssue({ code: 'custom', message: `${v.slug}: 'live' requires live-url evidence` })
  if (v.publicState === 'live' &amp;&amp; !v.url)
    ctx.addIssue({ code: 'custom', message: `${v.slug}: 'live' requires url` })
})

export type Venture = z.infer&lt;typeof ventureSchema&gt;
```

**Removed fields:** `stage` (replaced by `publicState`; amble/sprint/sail survives only as process narrative in /playbook), free-form `status` (app/data/ventures.ts:8 — the source of 'Live · DNS pending' theater), and `signal` (pure editorializing: "Math works" energy at the card level). `monetization` and `icp` stay — they describe a model, not a claim.

**Migration of the 19 entries (no invented evidence):**
- `evidence` for live sites = one `live-url` entry (capturedAt = the actual day the writer loads the URL during migration) plus one `screenshot` entry only where a real file exists in `public/ventures/`. `lastVerified` = migration day, only for ventures actually checked that day. `metrics` omitted for all 19.
- **Live (pending URL check on migration day):** getfoundinchat, aiopsguide, aibizblueprint, shreddify, protocolrank, ohioelectricityrates, shotfreetrt, sprinter-studio — `relationship: 'owned'`, `publicState: 'live'`. If any URL fails to resolve when checked, it becomes `paused` and gets no live-url evidence.
- **In development (owned):** winemakeros, everymcp, portcoaudit, and — critically — **cimreader** (ventures.ts:171 'Live · DNS pending') and **sprinteragent** (:228 'DNS propagating'): a site you can't reach is not live.
- **Validating (owned):** hireagentbuilders, roofrainmaker (promote to `live` only if URL verifies).
- **Experiment, paused:** alivelongevity (:271 'Reactivation test') — `relationship: 'experiment'`; delist if URL is dead.
- **Delisted (`listed: false`):** ogpreviewtool (no url, no screenshot, "revenue-blocked" — zero verifiable evidence), roofingreels and sproutparent (ideas with no URL are not public ventures). They stay in the file for history; `listedVentures = ventures.filter(v =&gt; v.listed)` becomes the only export the UI touches.

**CI validation:** yes — `scripts/validate-ventures.ts` runs `ventureSchema.array().parse(ventures)` via `node --experimental-strip-types` (Node 22, no tsx needed). Hard-fail on shape and live-requires-evidence; console **warning** (not failure) when `lastVerified` &gt; 90 days old, so unrelated PRs never rot-fail.

**"Not a fund" disclosure lives in `app/data/positioning.ts`** (canonical sentence + `CONTACT_EMAIL` constant) and is rendered in exactly three places: the Footer (every page, once Footer moves to a shared component), the homepage Co-build section, and `app/llms.txt/route.ts`. One string, three render sites — no drift.

---

## B. Homepage section/copy contract

| Section (page.tsx lines) | Verdict |
|---|---|
| Hero :16-89 | **Rewrite.** H1 replaces "One Founder. {N} Ventures. Zero Employees." (:34-39) with the truth-labeled portfolio positioning; no counts. Primary CTA becomes "Propose a product wedge" (anchor to new co-build section); secondary stays /playbook. |
| StageDistribution :91-126 | **Cut as standalone**; its factual remnant (state badges/filter legend) folds into VenturePortfolio. |
| ByTheNumbers :128-153 | **Cut** ("24/7 Agent Uptime" :132 is unfalsifiable theater; any number section without `metrics` evidence is banned). |
| WhyAIAgents :155-215 | **Cut entirely** (:166 burn straw man, :175 "Math works in your favor", :188 "dozens"). |
| HowWeBuild :217-284 | **Rewrite** as "How we work": services-funded, human-led with AI leverage; no autonomy claims. |
| PipelineSection :286-301 | **Keep**, copy audit only. |
| VenturePortfolio :303-368 | **Rebuild** on new schema: each card shows relationship badge, publicState badge, evidence links, "Last verified {date}". Links to new /ventures index. |
| ResultsSoFar :370-409 | **Cut** (:372-375, :386 "every step logged"). |
| PlaybookCTA :411-429 | **Keep, drop "open source"** (no LICENSE exists; adding one is Tyler's call, not the writer's). |
| FollowTheBuild :431-467 | **Keep** if links are real; delete any dead ones. |
| **Co-build (NEW)** | Criteria list (domain insider, distribution, cash, real wedge, clean IP), the not-a-fund sentence, and the CTA. |
| FAQ :493-514, :568-612 | **Rewrite** ("dozens of ventures" :497) and regenerate FAQPage JSON-LD :590-604 from the same data — JSON-LD must never be hand-edited separately again. |
| Footer :469-491 | **Keep + extract** to shared component with disclosure line; sibling links (:481-483) stay as plain labeled links. |

**"Propose a product wedge" mechanism — decision: structured `mailto:`.** No backend exists, no Supabase in the repo (CLAUDE.md notwithstanding), and a GitHub issue template makes confidential business proposals public. A `mailto:` with pre-filled subject and a body template ("Your domain / Your distribution / The wedge / Why you / IP status") is zero-infra and honest, with the plain email address rendered next to the button for clients that block mailto. Address comes from `CONTACT_EMAIL` in positioning.ts — **the writer must confirm the address with Tyler before shipping** (likely tyler@justhireai.com, but do not guess). A hosted form is a fast follow, out of scope.

---

## C. Route architecture for Next 16.3

**Yes — kill the top-level `'use client'` on app/page.tsx.** Split into a server `page.tsx` composing sections from `app/components/home/*.tsx`. Sections are server components; `Reveal` stays a leaf client component receiving server children via composition (the client boundary is Reveal, Pipeline, Chat, and SiteHeader's menu — nothing else). This is what makes `cacheComponents: true` worth enabling: every route here has zero dynamic IO, so all pages become fully prerendered static shells and `partialPrefetching` gets real shells to prefetch.

**Files to add:**
- `app/loading.tsx` — header spacer + hero-shaped skeleton (dimension-matched, no spinners; that's what "meaningful" means: no CLS on instant nav).
- `app/ventures/page.tsx` (**new index route**) + `app/ventures/loading.tsx` (card-grid skeleton).
- `app/ventures/[slug]/loading.tsx` (detail skeleton), `generateStaticParams` over `listedVentures`, and replace the soft-404 (:37-48) with `notFound()`; delete the noindex-less not-found branch in `generateMetadata` :16-32.
- `app/playbook/loading.tsx`.
- `app/not-found.tsx`, `app/error.tsx` (client boundary), `app/global-error.tsx`.
- `app/sitemap.ts`: derive `lastModified` from each venture's `lastVerified` (kills the hardcoded 2026-07-01 at :4); add `/ventures`.

**cacheComponents implications:** route handlers are outside cacheComponents scope — no change needed for llms.txt, which is static-by-default (no dynamic APIs); optionally `export const revalidate = 86400`. The chat route **drops `runtime = 'edge'`** (see E) — edge runtime is the odd one out in Next 16's direction and blocks nothing we need. `next.config.ts` gains exactly `cacheComponents: true` and `partialPrefetching: true`, nothing else.

**`@next/playwright` `instant()` assertions per route:**
- `/`: H1 equals the new positioning headline; link "Propose a product wedge" visible; portfolio section heading present; **negative assertions** — page text contains none of: "Zero Employees", "Math works in your favor", "24/7", "autonomous", "dozens".
- `/ventures`: card count equals `listedVentures.length`; every card shows a relationship badge and a "Last verified" date.
- `/ventures/getfoundinchat`: name, state badge, at least one evidence link. `/ventures/nonexistent`: 404 status + not-found content (regression-locks the soft-404 fix).
- `/playbook`: H1 renders; no "$50K MRR", no "AI Agents Run Everything", no "in real time".

Belt-and-suspenders: a plain grep script (`scripts/check-banned-phrases.sh`) over `app/` for the banned-phrase list runs in CI too — it catches source-level regressions Playwright can't see (OG images, llms.txt, JSON-LD, system prompts).

---

## D. PR sequence (each independently green)

1. **PR1 — CI gates.** Rewrite `.github/workflows/ci.yml`: lint, `tsc --noEmit` (add `typecheck` script), `next build`. Keep the docs check. Everything after this ships under real gates.
2. **PR2 — Truth schema + data migration.** `venture.schema.ts` (zod dep added), `positioning.ts`, migrated `ventures.ts` per section A, `scripts/validate-ventures.ts` + CI step, and the *minimum* consumer updates to compile (VenturePortfolio, Pipeline, `[slug]` page, stageConfig → stateConfig).
3. **PR3 — Homepage + playbook copy overhaul.** Section cuts/rewrites per B, co-build section + mailto CTA, playbook MRR-ladder and autonomy sections rewritten, FAQ + FAQPage JSON-LD regenerated.
4. **PR4 — Metadata/OG/llms/chat truth pass + phrase gate.** layout.tsx metadata + Organization JSON-LD (:54-92), both opengraph-image.tsx rewrites (and remove the conflicting `openGraph.images: "/og.png"` at layout.tsx:34 — the file-convention image wins), llms.txt route rewrite, chat fix per E. Lands `check-banned-phrases.sh` in CI — the gate ships the moment the last banned phrase dies, locking the truth work before platform churn begins.
5. **PR5 — Next 16.3 platform.** `npm install next@latest` (+ eslint-config-next), config flags, server/client split of page.tsx, all shells/not-found/error files, `notFound()` fix, new /ventures index, sitemap fix.
6. **PR6 — Playwright.** `@next/playwright` + `instant()` suite per C, CI job added. Final gate state: lint + typecheck + validate-ventures + banned-phrases + build + Playwright.
7. **PR7 — Polish (optional, last).** Remove dead deps gray-matter/next-mdx-remote, fix SiteHeader overlap on /playbook and venture pages, make Reveal use the reactive `use-reduced-motion` hook, Chat a11y (focus trap, Escape, aria-live, dvh clamp).

Truth (2–4) strictly precedes platform (5–6); PR1 protects everything.

---

## E. Chat: **keep and fix** (in PR4)

A chat grounded on the truth-labeled data actively supports the repositioning; removing it is easier but wastes a real differentiator. The fix, all in `app/api/chat/route.ts` + `Chat.tsx`:
- Drop `runtime = 'edge'` (node default).
- zod-validate the body: max 20 messages, max 2,000 chars/message, role whitelist — replaces the raw `req.json()` at :27; server-enforced, not just the client-side cap at Chat.tsx:11.
- Ground the system prompt by serializing `listedVentures` (name, relationship, publicState, lastVerified, url) into it at request time — deletes the hardcoded "We own 19+ ventures" (:41-52). Prompt instructs: answer only from provided data, state the not-a-fund line when asked about investing, never claim revenue or autonomy.
- Cost bound instead of infra: `maxOutputTokens` cap + the input caps above. For rate limiting with zero infra, configure a Vercel WAF rate-limit rule on `/api/chat` in the dashboard (ops task for Tyler, noted in the PR description — not code).
- Replace the bare `catch` at :57 with a typed 4xx/5xx JSON response per `.claude/rules/api.md`.
- UI: `maxLength` on the input and a one-line disclaimer under the panel: "AI assistant — may be wrong. Trust the evidence links, not the chat."

---

## F. No-go list for the writer

1. Never invent evidence, metrics, testimonials, screenshots, revenue, or user counts. Empty `evidence` arrays and omitted `metrics` are the correct state. Only files already in `public/ventures/` may be cited as screenshots.
2. Never backdate or forward-date `lastVerified`; it is only ever the day you personally loaded the URL.
3. Never delete venture entries — delist with `listed: false`.
4. Never reintroduce banned phrases anywhere (source, JSON-LD, OG images, llms.txt, chat prompt): "zero employees", venture counts in headlines, "24/7", "autonomous", "Math works in your favor", "dozens", "every venture is real", "AI Venture Factory", dollar-MRR targets, "in real time".
5. No experimental flags beyond `cacheComponents` and `partialPrefetching`; no React Compiler, no other canary features.
6. No `runtime = 'edge'` anywhere; the chat route loses it and nothing gains it.
7. Do not touch, claim, or expand sibling domains (sprinter.ai, sprinterconsulting.com, amble.so) beyond the existing labeled footer links.
8. No database, Supabase, or third-party form/analytics vendors in this scope — the CTA is mailto only.
9. Do not add a LICENSE or claim "open source" — that's Tyler's decision; drop the claim instead.
10. Do not guess the contact email — confirm with Tyler before wiring the CTA.
11. Every PR must pass lint + typecheck + build (and, once landed, validate-ventures + banned-phrases + Playwright) before merge — no stacking broken PRs.

---

### Critical Files for Implementation
- /Users/td/code/github/tylerdr/sprinter-studio/app/data/ventures.ts
- /Users/td/code/github/tylerdr/sprinter-studio/app/page.tsx
- /Users/td/code/github/tylerdr/sprinter-studio/app/layout.tsx
- /Users/td/code/github/tylerdr/sprinter-studio/app/api/chat/route.ts
- /Users/td/code/github/tylerdr/sprinter-studio/.github/workflows/ci.yml</result>
<usage><subagent_tokens>18603</subagent_tokens><tool_uses>2</tool_uses><duration_ms>180651</duration_ms></usage>
</task-notification>

**Classified as:** `pending-review`
**Spec impact:** pending


---

## 2026-08-08 00:37 UTC

**Tyler's exact words:**
> <task-notification>
<task-id>ac6a7ebd0f013d053</task-id>
<tool-use-id>toolu_019RZBwnrv6mgXGh53pL5R5C</tool-use-id>
<output-file>/private/tmp/claude-501/-Users-td-code-github-tylerdr-sprinter-studio/14f284cb-72f3-4b69-ac7e-22a4808cecae/tasks/ac6a7ebd0f013d053.output</output-file>
<status>completed</status>
<summary>Agent "Audit chat, API, UX behavior" finished</summary>
<note>A task-notification fires each time this agent stops with no live background children of its own. The user can send it another message and resume it, so the same task-id may notify more than once.</note>
<result># sprinter-studio — Exploration Report

Repo: `/Users/td/code/github/tylerdr/sprinter-studio` · Next.js 16.1.6 (app router), React 19, Tailwind v4, shadcn/ui, Vercel AI SDK v6. No test suite, no `lib/supabase/`, no `zod` dependency (`/Users/td/code/github/tylerdr/sprinter-studio/package.json:11-42`).

---

## 1. `app/api/*` route handlers

Only **two** route handlers exist.

### A. `/Users/td/code/github/tylerdr/sprinter-studio/app/api/chat/route.ts` (63 lines)

| Aspect | Finding |
|---|---|
| Runtime | `export const runtime = 'edge'` (line 6), `maxDuration = 30` (line 7) |
| Input validation | **None.** `const { messages } = await req.json()` at line 27, passed straight to `convertToModelMessages(messages)` at line 29. No Zod, no shape check, no length cap, no message-count cap, no role sanitization. |
| Rate limiting | **None.** No IP throttle, no origin check, no auth, no bot check. Public unmetered LLM endpoint. |
| Error shape | `{ error: 'Chat not configured' }` 500 (lines 32-35) and `{ error: 'Chat unavailable' }` 500 (lines 58-61). Bare `catch {}` at line 57 — **no logging, error swallowed entirely**. Both failures are 500 even when the cause is a malformed client payload (should be 400). |
| Provider cascade | `resolveModel()` lines 9-23: `ANTHROPIC_API_KEY` → `anthropic('claude-3-5-haiku-20241022')`; else `OPENAI_API_KEY` → `openai('gpt-5-mini')`; else `GOOGLE_GENERATIVE_AI_API_KEY \|\| GEMINI_API_KEY` → `google('gemini-2.0-flash-lite')`; else `null`. |
| Secrets | Server-only `process.env` reads (lines 10, 14, 18) — the only `process.env` usage in the whole app. No `NEXT_PUBLIC_` leakage. No `.env*` file committed. Key **presence** is used as the routing signal, so a present-but-invalid key still selects the provider and fails at request time (this is exactly what `Chat.tsx` line 24's "invalid x-api-key" comment is papering over). |
| Streaming | `createUIMessageStreamResponse({ stream: streamText({...}).toUIMessageStream() })` lines 38-56. `maxOutputTokens: 500` (line 54). No `abortSignal` wired to `req.signal`, so a client disconnect does not cancel the upstream generation (billed anyway). |
| Ordering bug | `convertToModelMessages` (line 29) runs **before** the `if (!model)` guard (line 31), so unconfigured deployments still parse untrusted input first. |

**System prompt, verbatim** (`app/api/chat/route.ts:41-52`):

```
You are the Sprinter Studio assistant. Sprinter Studio is an AI-native venture studio building a growing constellation of vertical software businesses.

We run on the Amble → Sprint → Sail methodology:
- Amble: Ideate and validate (divergent thinking, scoring, ICP definition)
- Sprint: Build and deploy (focused execution, shipping incrementally)
- Sail: Grow and scale (distribution, growth loops, revenue optimization)

We own 19+ ventures across SaaS, marketplace, content, tools, and services verticals.
The studio is run by Tyler Dreher (founder) with AI agents handling execution.

Answer questions about our methodology, ventures, and AI venture studio model.
Be direct, confident, and genuinely helpful. Keep responses concise unless detail is needed.
```

Claims the model is instructed to make, worth flagging:
- **"We own 19+ ventures"** (line 48) — hardcoded, drifts from data. `ventures` currently has exactly 19 entries (`app/data/ventures.ts:17-290`); every other surface derives from `ventures.length`. "own" is also a stronger relationship claim than the data supports (e.g. `ogpreviewtool` is "Launched · revenue-blocked", `sproutparent`/`roofingreels` are "Ideating" with no URL).
- **"a growing constellation of vertical software businesses"** (line 41) — unevidenced growth/profitability framing.
- **"AI agents handling execution"** / **"AI-native venture studio"** (lines 41, 49) — the autonomous-factory framing.
- **"Be direct, confident"** (line 52) — no grounding constraint, no venture data injected into context, no "don't speculate / don't invent metrics" guardrail. The model has **no access to `ventures.ts`**, so any specific venture answer is hallucinated from the 12-line prompt.
- No refusal boundaries, no scope fence, no PII/abuse instruction, no "you are not a financial/investment adviser" disclaimer.

**Violates the repo's own API rules** at `/Users/td/code/github/tylerdr/sprinter-studio/.claude/rules/api.md:6-10`: "Always validate input with Zod at the route boundary — never trust raw request.json()", "Return consistent error shapes: `{ error: string, code?: string }`" (no `code` emitted), "Rate limit sensitive endpoints", "Log errors with context before returning error responses".

### B. `/Users/td/code/github/tylerdr/sprinter-studio/app/llms.txt/route.ts` (39 lines)
`GET` only, `revalidate = 3600` (line 3). Builds a plain-text LLM discovery doc from `ventures`. No input, no secrets. Notable content: line 9 asserts *"One founder + AI agents building {N} software ventures in public — zero employees. Every venture is real: live, in build, or in validation."* — the "zero employees" / "every venture is real" claims. Line 32 explicitly cross-links siblings: `'- Sibling sites: https://sprinter.ai, https://sprinterconsulting.com, https://amble.so'`.

---

## 2. Chat UI

Single component: `/Users/td/code/github/tylerdr/sprinter-studio/app/components/Chat.tsx` (179 lines), mounted globally in `/Users/td/code/github/tylerdr/sprinter-studio/app/layout.tsx:104` — renders on **every route** including `/playbook` and all 19 venture pages.

- **Surface:** floating FAB, `fixed bottom-4 right-4 z-50` (line 162); panel `fixed bottom-20 right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)]` (line 69) with `h-[480px]` card (line 71).
- **Suggested prompts: none exist.** There are no prompt chips/starters anywhere in the codebase (grep for `suggested|starter|examplePrompt` returns nothing). The only prompt affordances are:
  - Empty state, `Chat.tsx:89-91`: `"Ask about our ventures, methodology, or the AI venture studio model."`
  - Input placeholder, `Chat.tsx:138`: `"Ask about Sprinter Studio..."`
  - `aria-label`, `Chat.tsx:139`: `"Ask about Sprinter Studio"`
- **Disclaimers: none.** No "AI-generated, may be inaccurate", no "not investment advice", no data-handling/privacy notice, no link to a policy. The status dot (line 74) reads as a live-service indicator.
- **Abuse protections:**
  - `MAX_MESSAGES = 20` (line 11) enforced **client-side only** (line 48), state resets on refresh (line 131: `"Message limit reached for this session. Refresh to start over."`). Trivially bypassed — the API route has no equivalent.
  - **No `maxLength` on the input** (lines 135-142). Unbounded single-message payload straight to the model.
  - No paste guard, no debounce, no honeypot, no CSRF/origin check.
- **Graceful degradation:** `onError` at lines 22-37 does substring matching on the error message (`'api'`, `'key'`, `'401'`, `'403'`, `'configured'`, `'unavailable'`, `'invalid'`) to flip `chatAvailable` and show `"Chat coming soon. Check back later!"` (line 85). Because `'api'` and `'invalid'` are extremely broad substrings, most genuine runtime failures also get masked as "coming soon". Otherwise: `"Something went wrong. Try again."` (line 122).
- **A11y of the chat** (mixed):
  - Good: `aria-label` on close (line 77), send (line 146), and FAB (line 169); `aria-expanded` + `aria-controls="sprinter-chat-panel"` (lines 170-171) matching `id` at line 62; `aria-label` on the raw input (line 139).
  - Missing: no `aria-modal`, no focus trap, **no Escape-to-close**, no focus move into the panel on open, no focus return to the FAB on close, no `aria-live` region on the message list (screen readers get no announcement of streamed replies), no `aria-busy`/status text for the spinner (line 117 is a bare icon).
  - `role="dialog"` (line 63) on a non-modal popover with none of the dialog contract implemented.
  - `scrollIntoView({ behavior: 'smooth' })` (line 43) ignores `prefers-reduced-motion` even though the hook is already imported in this file.
- **Raw element vs shadcn:** `&lt;input&gt;` at line 135 is a raw HTML input — violates `.claude/rules/components.md:5` ("never raw `&lt;button&gt;`, `&lt;input&gt;`, `&lt;select&gt;`") and `CLAUDE.md:22`. Buttons correctly use `components/ui/button`.
- **Mobile:** panel is `h-[480px]` + `bottom-20` (80px) = 560px of required height. On landscape phones and small viewports this overflows the top of the screen with no `max-h-[...dvh]` clamp. FAB also sits over footer/venture-card content at `z-50`.

---

## 3. Behavioral UX — the fail-open scroll reveal

`/Users/td/code/github/tylerdr/sprinter-studio/app/components/Reveal.tsx` (130 lines), introduced by commit `52bcb8a fix: fail-open scroll reveal (content never animation-gated)`.

How it works (documented at lines 8-17):
1. **Server HTML ships fully visible** — no `opacity:0` in SSR output. React never renders a hidden frame; hiding is applied imperatively in `useEffect` (`hide()`, lines 54-57).
2. **Early bail-outs** (lines 46-52): no ref, no `IntersectionObserver`, **or `matchMedia('(prefers-reduced-motion: reduce)').matches`** → returns immediately, content stays static and visible. Reduced-motion handling is correct and fail-safe.
3. **Above-fold elements** (`getBoundingClientRect().top &lt; window.innerHeight - 40`, line 71) stay static unless `immediate` is passed (hero only). `immediate` path double-rAFs into `show()` (lines 74-82).
4. **Below-fold elements** get `hide()` (line 85), an `IntersectionObserver` with `rootMargin: '0px 0px -60px 0px'` (lines 91-96), **plus a 2500 ms `FALLBACK_REVEAL_MS` timer** (lines 5, 111) that reveals everything for inert contexts (audits, screenshots, JS crawlers).
5. Real user input (`pointerdown`, `pointermove`, `wheel`, `touchstart`, `keydown` — lines 89, 113-115, `once: true, passive: true`) **cancels** the fallback so the observer drives the entrance. Bare `scroll` is deliberately excluded (comment lines 87-88) because hash nav / scroll restoration / capture tooling fire it programmatically.
6. Cleanup calls `teardown()` + `reset()` removing inline styles (lines 63-67, 117-120).

Residual risks:
- Content **is** still gated for real interacting users: after any pointer move, a below-fold `Reveal` stays at `opacity:0` until it intersects. If the observer never fires (e.g. an element inside `overflow-x-auto`, or a CSS/JS error after hide), content is permanently invisible with no second safety net.
- `matchMedia` is read once at mount (line 49) and is not reactive — toggling OS reduced-motion mid-session leaves elements animated. `app/hooks/use-reduced-motion.ts` (a reactive `useSyncExternalStore` implementation) exists but is **only consumed by `Chat.tsx:19`**, not by `Reveal`.
- Effect deps `[delay, duration, immediate, x, y]` (line 121) — re-running teardown/reset on any prop change is fine, but the observer is recreated.
- 47 `Reveal` instances on the homepage → 47 separate `IntersectionObserver`s + 47 timers + 47×5 window listeners.

Other motion: `framer-motion` is used **only** in `Chat.tsx` (lines 9, 61-68, 161-165), correctly guarded by `prefersReducedMotion` for `initial`, `whileHover`, `whileTap`. `app/globals.css:104-108` gates `scroll-behavior: smooth` behind `prefers-reduced-motion: no-preference` — correct. `Pipeline.tsx:19` uses `hover:scale-[1.02] transition-all` with **no** reduced-motion guard.

---

## 4. Accessibility

**Missing entirely:**
- **No skip link** anywhere (grep for `skip` returns zero hits in `app/` and `components/`).
- **No `id` on `&lt;main&gt;`** (`app/page.tsx:616`, `app/playbook/page.tsx:23`, `app/ventures/[slug]/page.tsx:56`), so there is no skip target either.
- **No `scroll-mt-*` anywhere**, while a 64px `fixed` header exists — see §5.
- No `&lt;h1&gt;` on the homepage above the hero image? — there is one (`app/page.tsx:34`), fine.

**Heading hierarchy, `app/page.tsx`:**
- `h1` line 34 (hero) — single, correct.
- `h2`s: 183 (Why AI Agents), 246 (How We Build), 291 (Live Pipeline), 308 (Portfolio Snapshot), 384 (Results So Far), 416 (Playbook CTA), 437 (Follow the Build), 573 (FAQ).
- `h3`s: 264 (phase titles), 584 (FAQ questions), `Pipeline.tsx:58` (stage labels).
- **Skip: `BuiltBySection` (lines 516-566) contains an `h3` "Tyler Dreher" at line 526 with no enclosing `h2`** — h2→h3 gap; the founder section has no accessible heading of its own.
- `ByTheNumbers` (lines 128-153), `StageDistribution` (91-126), `VenturePortfolio` cards, and `ResultsSoFar` items are **entirely headless** — stat values are `&lt;p&gt;` (line 142), venture names are bare `&lt;Link&gt;` (line 336). Screen-reader users get no section landmarks or heading outline for the portfolio.

**Icon buttons / aria:**
- `SiteHeader.tsx:59-67` — raw `&lt;button&gt;` (violates `.claude/rules/components.md:5`) but correctly has `aria-expanded`, `aria-controls="studio-mobile-nav"`, and a dynamic `aria-label` ("Close menu"/"Open menu"). 44×44 target (`h-11 w-11`). **No Escape handler, no focus trap, no focus return** on the mobile menu; body scroll lock is present (lines 17-24).
- `Chat.tsx:77, 146, 169` — all icon buttons labeled. See §2 for the dialog gaps.
- Decorative SVGs correctly `aria-hidden`: `PlaybookDiagram.tsx:58, 87`, `page.tsx:19, 74, 78, 82, 119`, playbook `Check` icons lines 81-85, 126-131.
- `role="img"` + `aria-label` used well: `page.tsx:107` (stage distribution bar), `PlaybookDiagram.tsx:82` (full methodology description).

**Keyboard:** zero `onKeyDown`, zero `tabIndex`, zero `autoFocus`, zero `aria-live` in the entire codebase. `PlaybookDiagram.tsx:82-86` is a scrollable region (`overflow-x-auto` + `min-w-[560px]`) with **no `tabIndex={0}`** — keyboard-only users cannot scroll it to see the Sail phase on mobile.

**Focus styling:** only via `buttonVariants` (`components/ui/button.tsx:8` — `focus-visible:ring-2 ring-ring ring-offset-2`) and the chat input's `focus:ring-1` (`Chat.tsx:140`, uses `focus:` not `focus-visible:`). The many bare `&lt;Link&gt;`/`&lt;a&gt;` elements (`page.tsx:336, 351, 355, 479-486, 546, 554`; `SiteHeader.tsx:35, 42, 45, 48, 76, 83, 90`; `Pipeline.tsx:17`) rely on the UA default outline; `app/globals.css:96` applies `outline-ring/50` globally to `*` which is a low-contrast focus indicator on a `#0a0a0a` background.

**Raw `&lt;button&gt;`/`&lt;a&gt;`/`&lt;input&gt;` inventory** (all deviate from `CLAUDE.md:22` "never raw HTML elements"):
- `&lt;button&gt;`: `app/components/SiteHeader.tsx:59`
- `&lt;input&gt;`: `app/components/Chat.tsx:135`
- `&lt;a&gt;`: `app/page.tsx:355, 451, 481, 482, 483, 484, 545, 553`; `app/components/SiteHeader.tsx:48, 90`; `app/ventures/[slug]/page.tsx:137`
- `components/ui/dialog.tsx` and `components/ui/sheet.tsx` are installed but **completely unused** — the chat popover and mobile menu both hand-roll what `Dialog`/`Sheet` would give for free (focus trap, Escape, `aria-modal`, inert background).

---

## 5. Mobile / responsive

**Fixed-header overlap (real bug).** `SiteHeader` is `fixed top-0 ... h-16` = 64px (`SiteHeader.tsx:27-34`), but no page reserves space for it:
- `app/playbook/page.tsx:23` — `&lt;main className="min-h-screen py-12 px-6"&gt;` → 48px top padding. The "← Back to Home" link at line 25 renders **under the fixed header** and is unclickable (header is `z-50`, full-width, and intercepts pointer events even when `bg-transparent`).
- `app/ventures/[slug]/page.tsx:56` — same `py-12`; the "Back to Pipeline" button at lines 58-64 is under the header.
- Homepage escapes only because the hero is `min-h-[90vh] flex items-center` (`page.tsx:18`).
- Combined with no `scroll-mt-*`, the `#pipeline` anchor (`page.tsx:288`) lands the section top 64px under the header (masked by `py-24`, so cosmetic there).

**Dead `h-full` (layout bug).** `Reveal` renders a plain wrapper div with only the passed `className` (`Reveal.tsx:125-129`). In `HowWeBuild` (`page.tsx:258-259`) and `VenturePortfolio` (`page.tsx:316-317`) the `Reveal` is the grid item and the `Card` inside carries `h-full` — but the `Reveal` div has no `h-full`, so `h-full` resolves against auto height and is **inert**. Cards in those grids do not equalize height. Same for `CardContent`'s `h-full flex flex-col` at `page.tsx:333` and the `mt-auto` push at line 350.

**Horizontal overflow.** `PlaybookDiagram.tsx:86` — `w-full min-w-[560px]` inside `overflow-x-auto`. On a 375px viewport the diagram requires a horizontal swipe (keyboard-inaccessible, see §4) on both `/playbook` (line 43) and the homepage (line 253).

**Hidden on mobile.** `page.tsx:272` `hidden md:flex` (decorative `ArrowRight` between phase cards — fine). `SiteHeader.tsx:41` `hidden md:flex` desktop nav / line 60 `md:hidden` toggle — correct pairing. No content is lost.

**Spacing system.** Ad-hoc, not tokenized. Homepage sections are uniformly `py-24` (`page.tsx:180, 243, 288, 305, 381, 413, 433, 518, 570`) with two exceptions — `py-16` (line 137, `ByTheNumbers`) and `py-12` (line 471, footer) — plus a `&lt;Separator&gt;` between **every** section (`page.tsx:619-635`, ten separators). Result: ~192px of vertical gap plus a rule between every block, with several low-density sections (`PlaybookCTA` lines 411-429 is `py-24` around three elements; `FollowTheBuild` lines 431-467 is `py-24` around a single button). Playbook uses a different scale — a `Section` wrapper hardcoded to `py-16` (`app/playbook/page.tsx:18`) — so the two pages' rhythms don't match. No `py-*` scale is centralized; every value is inline.

**Chat panel on short viewports:** see §2 (`h-[480px]` + `bottom-20`, no `dvh` clamp).

---

## 6. Cross-site boundaries — every external link

No `justhire` or `openclaw` references in shipped code. `openclaw` appears once in agent config only: `CLAUDE.md:66` (`~/openclaw/workspace/workspace-ventures/ai-ventures/ventures/sprinter.studio/STATUS.md`).

**Rendered outbound links (all have `target="_blank" rel="noopener noreferrer"`):**

| File:line | Destination | Context |
|---|---|---|
| `app/page.tsx:481` | `https://sprinter.ai` | Footer nav, "Sprinter AI" |
| `app/page.tsx:482` | `https://sprinterconsulting.com` | Footer nav, "Consulting" |
| `app/page.tsx:483` | `https://amble.so` | Footer nav, "Amble" |
| `app/page.tsx:484` | `https://github.com/tylerdr/sprinter-studio` | Footer nav, "GitHub" |
| `app/page.tsx:452` | `https://github.com/tylerdr/sprinter-studio` | "Star on GitHub" CTA |
| `app/page.tsx:546` | `https://github.com/tylerdr` | Founder bio, "GitHub" |
| `app/page.tsx:554` | `https://github.com/tylerdr/sprinter-studio` | Founder bio, "View source" |
| `app/page.tsx:355` | `{venture.url}` (dynamic) | Portfolio card "Live" link |
| `app/components/SiteHeader.tsx:49` | `https://github.com/tylerdr/sprinter-studio` | Desktop nav |
| `app/components/SiteHeader.tsx:91` | `https://github.com/tylerdr/sprinter-studio` | Mobile nav |
| `app/ventures/[slug]/page.tsx:137-141` | `{venture.url}` (dynamic) | "Visit Live Site" CTA |

**Non-rendered / metadata cross-references:**
- `app/llms.txt/route.ts:32` — `'- Sibling sites: https://sprinter.ai, https://sprinterconsulting.com, https://amble.so'` (only place the sibling relationship is named, and it names it to LLM crawlers).
- `app/llms.txt/route.ts:24, 28-31` — self + GitHub source links.
- `app/layout.tsx:25, 31, 59, 60, 83` — `https://sprinter.studio` (metadataBase, OG, JSON-LD).
- `app/layout.tsx:66` — JSON-LD `founder.url = "https://github.com/tylerdr"`.
- `app/layout.tsx:69` — JSON-LD `sameAs: ["https://github.com/tylerdr/sprinter-studio"]` (GitHub only; siblings deliberately absent from `sameAs`).
- `app/sitemap.ts:7`, `app/ventures/[slug]/page.tsx:27`, `public/robots.txt` — self-canonical.

**Venture outbound domains** (`app/data/ventures.ts`) — 16 of 19 have a `url`, each surfaced as a live external link: `getfoundinchat.com:27`, `aiopsguide.com:42`, `aibizblueprint.com:57`, `shreddify.com:72`, `protocolrank.com:86`, `ohioelectricityrates.com:100`, `sprinter.studio:128`, `winemakeros.com:142`, `everymcp.com:157`, `cimreader.com:172`, `portcoaudit.com:187`, `hireagentbuilders.com:201`, `shotfreetrt.com:215`, `sprinteragent.com:229`, `roofrainmaker.com:243`, `alivelongevity.com:272`. Three have no `url`: `ogpreviewtool` (line 107), `roofingreels` (253), `sproutparent` (279). Several linked ones self-describe as not-actually-live — `cimreader` "Live · DNS pending" (171), `sprinteragent` "Live · DNS propagating" (228), `alivelongevity` "Reactivation test" (271) — while the homepage claims *"Every venture below is real — live, in build, or in validation"* (`page.tsx:49`).

**Boundary observations:** the sibling links (`sprinter.ai`, `sprinterconsulting.com`, `amble.so`) appear **only** in the footer nav and llms.txt, with no relationship labeling, no `rel="me"`, and no presence in JSON-LD `sameAs`. `amble.so` shares a name with the "Amble" methodology phase used ~40 times across the site (`api/chat/route.ts:44`, `page.tsx:220`, `playbook/page.tsx:51-90`, `PlaybookDiagram.tsx:13`, `data/ventures.ts:293`), so a footer link labeled "Amble" is genuinely ambiguous between "the phase" and "a separate property".

---

## 7. `hooks/` directory

**There is no top-level `hooks/` directory.** The only hooks directory is `/Users/td/code/github/tylerdr/sprinter-studio/app/hooks/`, containing exactly one file:

- `/Users/td/code/github/tylerdr/sprinter-studio/app/hooks/use-reduced-motion.ts` (21 lines) — `useReducedMotion()` via `useSyncExternalStore`. Subscribes to `matchMedia('(prefers-reduced-motion: reduce)')` change events (lines 7-11); server snapshot returns `false` so the first client render matches SSR (lines 18-19, with the reasoning documented at lines 14-15). Correct and reactive. **Consumed only by `app/components/Chat.tsx:19`** — `Reveal.tsx:49` re-implements the check inline and non-reactively.

---

## Notable cross-cutting findings

1. **`app/api/chat/route.ts` violates three of six rules in the repo's own `.claude/rules/api.md`** (Zod, rate limiting, error logging) and the system prompt hardcodes `19+` where every other surface derives from `ventures.length`.
2. **`components/ui/dialog.tsx` and `components/ui/sheet.tsx` are installed and unused** while two hand-rolled overlays (chat panel, mobile menu) each lack Escape, focus trap, and focus restoration.
3. **All four `documents/*.md` files are unfilled scaffolding templates** — `SPEC.md`, `DECISIONS.md`, `HANDOFF.md`, `BACKLOG.md` still contain `[Task name]`, `YYYY-MM-DD`, `ADR-001: [Decision Name]` placeholders. Only `documents/PROMPTS.md` has real content (currently modified in the working tree, containing the 2026-08-08 scoping instruction).
4. **`next.config.ts` is empty** (`/Users/td/code/github/tylerdr/sprinter-studio/next.config.ts:3-5` — `const nextConfig: NextConfig = { /* config options here */ }`). No security headers, no CSP, no image domain policy — relevant given `dangerouslySetInnerHTML` JSON-LD injection at `app/layout.tsx:98` and `app/page.tsx:594`.
5. `app/sitemap.ts:4` hardcodes `lastModified = new Date('2026-07-01')` for every URL.
6. `AGENTS.md` is a symlink → `CLAUDE.md`.</result>
<usage><subagent_tokens>74913</subagent_tokens><tool_uses>33</tool_uses><duration_ms>246400</duration_ms></usage>
</task-notification>

**Classified as:** `pending-review`
**Spec impact:** pending


---

## 2026-08-08 00:35 UTC

**Tyler's exact words:**
> <task-notification>
<task-id>a41ecf20c90dbffc8</task-id>
<tool-use-id>toolu_01NatiGQtruRCKvUYLwvYmXt</tool-use-id>
<output-file>/private/tmp/claude-501/-Users-td-code-github-tylerdr-sprinter-studio/14f284cb-72f3-4b69-ac7e-22a4808cecae/tasks/a41ecf20c90dbffc8.output</output-file>
<status>completed</status>
<summary>Agent "Map routes and SEO surfaces" finished</summary>
<note>A task-notification fires each time this agent stops with no live background children of its own. The user can send it another message and resume it, so the same task-id may notify more than once.</note>
<result># Route &amp; Discovery/SEO Surface Map — sprinter-studio

Repo: `/Users/td/code/github/tylerdr/sprinter-studio` (Next.js 16 App Router, no `src/`, no `middleware.ts`)

---

## 1. Routes under `app/`

The entire routable surface is 5 entries. There are **no** `loading.tsx`, `error.tsx`, `global-error.tsx`, `not-found.tsx`, `template.tsx`, `default.tsx`, or `middleware.ts` files anywhere in the repo.

| Route | File | Renders/returns | Static params | notFound() |
|---|---|---|---|---|
| `/` | `/Users/td/code/github/tylerdr/sprinter-studio/app/page.tsx` | `'use client'` (line 1) marketing homepage: Hero, ByTheNumbers, WhyAIAgents, HowWeBuild, PipelineSection (`id="pipeline"`), VenturePortfolio, ResultsSoFar, PlaybookCTA, BuiltBySection, FollowTheBuild, FAQSection, Footer | n/a | no |
| `/playbook` | `/Users/td/code/github/tylerdr/sprinter-studio/app/playbook/page.tsx` | Server component, static content page (Amble/Sprint/Sail phases, gates, revenue targets, constellation model) | n/a | no |
| `/ventures/[slug]` | `/Users/td/code/github/tylerdr/sprinter-studio/app/ventures/[slug]/page.tsx` | Async server component; looks up `ventures.find(v =&gt; v.slug === slug)`; renders venture card + prev/next nav | ✅ `generateStaticParams` line 12 (all 19 slugs) | ❌ **no** — renders inline "Venture not found" JSX at lines 37-48 |
| `/llms.txt` | `/Users/td/code/github/tylerdr/sprinter-studio/app/llms.txt/route.ts` | `GET` returning `text/plain; charset=utf-8`, `export const revalidate = 3600` (line 3) | n/a | no |
| `/api/chat` | `/Users/td/code/github/tylerdr/sprinter-studio/app/api/chat/route.ts` | `POST` only; `runtime = 'edge'` (line 6), `maxDuration = 30` (line 7); Anthropic → OpenAI → Google fallback chain; returns `createUIMessageStreamResponse`; 500 JSON on no-key or throw | n/a | n/a |

Non-route files under `app/`: `components/` (Chat, Pipeline, PlaybookDiagram, Reveal, SiteHeader), `data/ventures.ts`, `hooks/use-reduced-motion.ts`, `globals.css`, `favicon.ico`.

`/api/chat` client: `app/components/Chat.tsx:21` uses `useChat({...})` with **no explicit transport/api option** — relies on the AI SDK default endpoint `/api/chat`, which matches. Rendered globally from `app/layout.tsx` (`&lt;Chat /&gt;` in body).

Route handler model IDs (`app/api/chat/route.ts:11,15,19`): `claude-3-5-haiku-20241022`, `gpt-5-mini`, `gemini-2.0-flash-lite`.

---

## 2. Metadata

### Root layout — `/Users/td/code/github/tylerdr/sprinter-studio/app/layout.tsx:18-51`
- `title.default`: `"Sprinter Studio | The AI Venture Factory"`; `title.template`: `"%s | Sprinter Studio"` (lines 19-22)
- `description` (23-24): `"One founder. An army of AI agents. A growing constellation of vertical software businesses. Watch us build in public."`
- `metadataBase` (25): `new URL("https://sprinter.studio")`
- `alternates.canonical` (26): `"/"`
- `openGraph` (27-35): title/description as above (short variant), `url: "https://sprinter.studio"`, `siteName: "Sprinter Studio"`, `type: "website"`, `images: [{ url: "/og.png", width: 1200, height: 630 }]`
- `twitter` (36-42): `card: "summary_large_image"`, same title/description, `images: ["/og.png"]`
- `robots` (43-46): `{ index: true, follow: true }`
- No `icons`, no `alternates.languages`, no `verification`, no `authors`/`keywords`.

### `/playbook` — `app/playbook/page.tsx:12-16`
- `title: 'The Playbook'` → resolves to `The Playbook | Sprinter Studio`
- `description: 'The Amble → Sprint → Sail methodology. How one founder and AI agents build a growing constellation of vertical software businesses.'`
- `alternates: { canonical: '/playbook' }`
- **No `openGraph`, no `twitter` override.**

### `/ventures/[slug]` — `app/ventures/[slug]/page.tsx:16-32` (`generateMetadata`)
- Not-found branch (line 19-20): `return { title: 'Venture Not Found' }` — no `robots: { index: false }`.
- Found branch: `title: venture.name`, `description: venture.description`, `alternates.canonical: /ventures/${slug}`, `openGraph: { title: '${name} | Sprinter Studio', description, url: 'https://sprinter.studio/ventures/${slug}', type: 'website' }`.
- **No `twitter` override.**

### OG images (file convention)
- `/Users/td/code/github/tylerdr/sprinter-studio/app/opengraph-image.tsx` — root, `ImageResponse` 1200×630, `alt = 'Sprinter Studio — The AI Venture Factory'` (line 4). Renders headline `One Founder. / {ventures.length} Ventures. Zero Employees.` and subhead *"A real venture factory where AI agents build, deploy, and grow software companies around the clock."*
- `/Users/td/code/github/tylerdr/sprinter-studio/app/ventures/[slug]/opengraph-image.tsx` — per-venture, `alt = 'Sprinter Studio venture'` (line 4), has its own `generateStaticParams` (line 10), stage-colored accent, falls back to `'Sprinter Studio'` + *"The AI venture factory for a live portfolio of AI-native ventures."* for unknown slugs.
- No `twitter-image.tsx` anywhere. No `icon.tsx`/`apple-icon.tsx` (only `app/favicon.ico`).
- Static `public/og.png` also exists and is what `metadata.openGraph.images` / `twitter.images` point at.

---

## 3. JSON-LD / structured data

Two locations only.

### `app/layout.tsx:54-92` — injected via `&lt;script type="application/ld+json"&gt;` inside `&lt;head&gt;` (lines 96-99), array of two nodes.

**Organization** (56-78):
```
"@type": "Organization", name: "Sprinter Studio", url: "https://sprinter.studio",
logo: "https://sprinter.studio/og.png",
description: "AI-native venture studio that uses autonomous AI agents to build, deploy,
              and operate a growing portfolio of vertical software businesses.",
founder: { "@type": "Person", name: "Tyler Dreher", url: "https://github.com/tylerdr" },
sameAs: ["https://github.com/tylerdr/sprinter-studio"],
knowsAbout: ["AI agents","Venture studio","SaaS","Software development","Startup automation"]
```

**WebSite** (80-90):
```
"@type": "WebSite", name: "Sprinter Studio", url: "https://sprinter.studio",
description: "One founder. An army of AI agents. A growing constellation of vertical software businesses.",
publisher: { "@type": "Organization", name: "Sprinter Studio" }
```
Note: the `WebSite` node has **no `potentialAction`/SearchAction**, and `Organization` has no `ItemList`/`subOrganization`/`owns` linking the 19 ventures.

### `app/page.tsx:590-604` — **FAQPage**, built from `faqItems` (`app/page.tsx:493-514`)
```
"@type": "FAQPage", mainEntity: [{ "@type":"Question", name, acceptedAnswer:{"@type":"Answer", text} }]
```
Claims embedded in the FAQ answers (also rendered as visible text at `app/page.tsx:580-589`):
- (`:497`) *"An AI venture studio uses **autonomous AI agents** to build, launch, and operate multiple software businesses simultaneously… AI agents handle coding, content, SEO, outreach, and operations **24/7** — letting a single founder run **dozens of ventures** at once."*
- (`:507`) *"The public pipeline tracks every venture across six archetypes… New ventures enter the pipeline regularly as the factory accelerates."*
- (`:512`) *"Yes. The playbook is published openly… Read it at **/playbook**."*

**Venture detail pages have zero structured data** — no `SoftwareApplication`, `Product`, `WebPage`, or `BreadcrumbList` despite having prev/next nav and a live-URL CTA.

---

## 4. sitemap / robots / llms.txt

### `/Users/td/code/github/tylerdr/sprinter-studio/app/sitemap.ts`
- `const lastModified = new Date('2026-07-01')` — **hardcoded, shared by every entry** (line 4).
- Entries: `https://sprinter.studio` (`daily`, priority `1`), `/playbook` (`weekly`, `0.9`), then all 19 `/ventures/{slug}` (`weekly`, `0.7`).
- Total 21 URLs. `/llms.txt` is not listed (conventional).

### robots
- **No `app/robots.ts`.** Static `/Users/td/code/github/tylerdr/sprinter-studio/public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://sprinter.studio/sitemap.xml
```
Correct and consistent with the sitemap route.

### `/llms.txt` — `app/llms.txt/route.ts`, verbatim key claims
Line 9 (the `&gt;` summary line):
&gt; `One founder + AI agents building ${ventures.length} software ventures in public — zero employees. Every venture is real: live, in build, or in validation. The methodology (Amble → Sprint → Sail) is open source.`

Line 24:
&gt; `Ventures only advance through gates (build-ready, launch) with real market data. Full playbook: https://sprinter.studio/playbook`

Line 32:
&gt; `- Sibling sites: https://sprinter.ai, https://sprinterconsulting.com, https://amble.so`

Venture lines (13-16) emit `- {name} ({domain}) — {description} [{Stage}: {status}]`, so raw statuses leak into the LLM-facing doc verbatim, e.g. `Launched · revenue-blocked`, `Live · DNS pending`, `Live · DNS propagating`, `Validating · concierge v1`, `Reactivation test`, `Ideating`.

---

## 5. Config, deps, scripts

### `/Users/td/code/github/tylerdr/sprinter-studio/next.config.ts` — **empty**
```ts
const nextConfig: NextConfig = {
  /* config options here */
};
```
No `images.remotePatterns`, no `redirects()`, no `headers()` (so no security headers / no cache-control tuning), no `output`, no `trailingSlash`.

### Scripts (`package.json:5-10`)
`dev: next dev` · `build: next build` · `start: next start` · `lint: eslint`. **No `test` script** (and no test files/framework in the repo). Husky hooks exist (`.husky/pre-commit`, `.husky/commit-msg` + commitlint).

### Dependencies (exact ranges)
`next ^16.1.6` · `react ^19.2.3` · `react-dom ^19.2.3` · `tailwindcss ^4.2.1` (+`@tailwindcss/postcss ^4.2.1`, `tw-animate-css ^1.4.0`) · `typescript ^5.9.3` · `eslint-config-next 16.1.6` (pinned) · `eslint ^9`
AI SDK: `ai ^6.0.116` · `@ai-sdk/react ^3.0.118` · `@ai-sdk/anthropic ^3.0.58` · `@ai-sdk/openai ^3.0.41` · `@ai-sdk/google ^3.0.43`
UI: `@base-ui/react ^1.2.0` · `@radix-ui/react-slot ^1.2.4` · `shadcn ^4.0.5` · `class-variance-authority ^0.7.1` · `clsx ^2.1.1` · `tailwind-merge ^3.5.0` · `lucide-react ^0.577.0` · `framer-motion ^12.35.2`
Other: `@vercel/analytics ^1.6.1` · `gray-matter ^4.0.3` · `next-mdx-remote ^6.0.0`

Note: `gray-matter` and `next-mdx-remote` are installed but **not imported anywhere** in `app/`, `components/`, or `lib/` — dead deps (no MDX/blog route exists).

CI (`.github/workflows/ci.yml`) only verifies that `documents/SPEC.md|BACKLOG.md|HANDOFF.md` exist. **It does not run `next build`, `lint`, or typecheck** — so route/metadata regressions are unguarded.

---

## 6. Route-correctness &amp; SEO smells

**High impact**

1. **Soft 404 on unknown venture slugs** — `app/ventures/[slug]/page.tsx:37-48` returns "Venture not found" markup instead of calling `notFound()`. With `generateStaticParams` present but `dynamicParams` left at its default (`true`), `/ventures/anything` renders on demand with **HTTP 200**. Combined with `generateMetadata`'s `{ title: 'Venture Not Found' }` (line 20) that carries **no `robots: { index: false }`**, unlimited junk URLs are indexable. Fix is `notFound()` + a `not-found.tsx`, or `export const dynamicParams = false`.
2. **OG image conflict on `/` (and every non-venture route)** — `app/opengraph-image.tsx` (file convention) and `metadata.openGraph.images: ["/og.png"]` (`app/layout.tsx:34`) both target the same field. File-based metadata wins, so the static `public/og.png` is effectively dead for OG while still being the `Organization.logo` (`app/layout.tsx:60`).
3. **Twitter card never matches OG.** No `twitter-image.tsx` exists and neither `/playbook` nor `/ventures/[slug]` overrides `twitter`. Every page therefore shares the root Twitter card (title `"Sprinter Studio | The AI Venture Factory"`, image `/og.png`) while OG shows a generated, page-specific image. Venture shares on X show the studio-level card, not the venture.
4. **`/playbook` inherits the homepage's `openGraph.url`** — `app/layout.tsx:31` sets `url: "https://sprinter.studio"` and `app/playbook/page.tsx:12-16` doesn't override `openGraph`. So `/playbook`'s `og:url` points at `/` and conflicts with its own `&lt;link rel="canonical" href="/playbook"&gt;`. Its `og:title`/`og:description` are also the studio boilerplate, not the page's.

**Medium**

5. **No `not-found.tsx`, `error.tsx`, `global-error.tsx`, or `loading.tsx` anywhere.** Any true 404 or render throw falls to Next's unstyled defaults, breaking the dark theme and dropping `SiteHeader`/`Chat`.
6. **`sitemap.ts` `lastModified` is a frozen literal** (`app/sitemap.ts:4`, `2026-07-01`) applied to all 21 URLs — already ~5 weeks stale as of today, and it contradicts the homepage's `changeFrequency: 'daily'`. It also won't move when `app/data/ventures.ts` changes.
7. **No `/ventures` index route.** `app/ventures/` contains only `[slug]/`. Nothing links to `/ventures`, but it's a natural crawl/entry target and would 404; the "Back to Pipeline" links (`app/ventures/[slug]/page.tsx:41`, `:59`, and `app/playbook/page.tsx` CTA) all point to the fragment `/#pipeline` instead.
8. **Root `alternates.canonical: "/"` cascades** (`app/layout.tsx:26`). Today all three page types override it, but any new route added without an explicit canonical silently self-canonicals to the homepage.
9. **Hardcoded venture count drifts from data.** `app/api/chat/route.ts:38` states *"We own 19+ ventures across SaaS, marketplace, content, tools, and services verticals"* as a literal string, while every other surface derives from `ventures.length` (currently exactly 19: 7 sail / 9 sprint / 3 amble). Also, `app/page.tsx:131` and `:374` hardcode `'6'` business archetypes; the `Venture['archetype']` union (`app/data/ventures.ts:11`) does have 6 members, so that one is currently accurate but uncoupled. `app/api/chat/route.ts` also lists the archetypes as 5 verticals, contradicting the "six archetypes" FAQ claim at `app/page.tsx:507`.

**Low / claim-accuracy**

10. **`ventures.length`-driven claims are the load-bearing marketing numbers** and appear in four independent surfaces: `app/page.tsx:36` (`{ventures.length} Ventures.` + `Zero Employees.` at `:38`), `app/opengraph-image.tsx` (`One Founder. / {n} Ventures. Zero Employees.`), `app/llms.txt/route.ts:9`, and `app/page.tsx:372`. Adding an `archived` or `revenue` stage venture (both exist in the union at `app/data/ventures.ts:6`) would inflate the public count, since `ventures.length` is unfiltered while `Pipeline`/`StageDistribution` only render `amble|sprint|sail` (`app/components/Pipeline.tsx:10`, `app/page.tsx:99`) — so the headline count and the visible pipeline count can silently diverge.
11. **"Every venture is real: live, in build, or in validation"** (`app/llms.txt/route.ts:9`) and *"Every venture below is real — live, in build, or in validation"* (`app/page.tsx:49`) are contradicted by the same file's own data: 3 ventures have **no `url`** and statuses `Ideating` / `Ideating` / `Launched · revenue-blocked` (`roofingreels`, `sproutparent`, `ogpreviewtool` — `app/data/ventures.ts:97-118, 255-280`), plus `alivelongevity` at `Reactivation test`. `ogpreviewtool` is marked `stage: 'sail'` with status `Launched` yet has no live URL, so its detail page renders no "Visit Live Site" button.
12. **Unverifiable/absolute claims in indexable copy**: *"autonomous AI agents build, deploy, and grow software companies around the clock"* (`app/page.tsx:49`, mirrored in the Organization JSON-LD `description` at `app/layout.tsx:61-62`), `24/7 Agent Uptime` (`app/page.tsx:132`), `Total human employees: 0` (`app/page.tsx:375`), *"Idea to deployed MVP in 1–3 days"* (`app/page.tsx:163`, `:373`), and *"The playbook is open source"* (`app/page.tsx:417`, `app/llms.txt/route.ts:9`) — the repo is public but no license file exists, so "open source" is unbacked.
13. `app/page.tsx` is `'use client'` at the top level, so the homepage can never export route `metadata`; it relies entirely on the root layout's defaults. The FAQ JSON-LD still SSRs correctly, but this blocks page-specific `/` metadata and forces the whole marketing page into the client bundle (including `framer-motion`).
14. `Organization.sameAs` lists only the repo URL (`app/layout.tsx:68-70`), omitting the three sibling properties that `app/llms.txt/route.ts:32` and the footer (`app/page.tsx`) do advertise (`sprinter.ai`, `sprinterconsulting.com`, `amble.so`) — a missed entity-consolidation signal.
15. All 15 `screenshot` paths in `app/data/ventures.ts` resolve to real files in `public/ventures/` — verified, no broken image references.</result>
<usage><subagent_tokens>53457</subagent_tokens><tool_uses>20</tool_uses><duration_ms>170734</duration_ms></usage>
</task-notification>

**Classified as:** `pending-review`
**Spec impact:** pending


---

## 2026-08-08 00:32 UTC

**Tyler's exact words:**
> You are Fable 5, the read-only portfolio design controller for sprinter.studio only. Read AGENTS.md, CLAUDE.md, HANDOFF, BACKLOG, DECISIONS, SPEC, venture data, metadata, JSON-LD, OG, llms, chat, and route sources. Canonical role: a truth-labeled services-backed venture portfolio plus selective co-build for domain insiders with distribution, cash, a real wedge, and clean IP; explicitly not a fund. Remove autonomous high-volume venture-factory theater, zero-employee, venture-count, portfolio-odds, all-real/live, and unevidenced MRR claims. Every public item needs accurate relationship, public state, evidence, and last-verified date; do not invent proof. CTA: Propose a product wedge. Audit behavioral UX, empty spacing, accessibility, mobile, SEO/discovery, route correctness, chat risk, cross-site boundaries, and current code. Return an exact implementation and final-review brief for one non-Fable writer: file ownership, safe portfolio schema, section/copy contract, Next 16.3 upgrade, Cache Components, Partial Prefetching, meaningful route shells, @next/playwright instant tests, lint/typecheck/build/browser gates, and explicit no-go choices. Cite current file paths and lines. Do not edit, create worktrees, dispatch, push, modify PRs, deploy, submit forms, change domains, or communicate externally.

**Classified as:** `pending-review`
**Spec impact:** pending

*Tyler's input is scarce and valuable. Exact words are preserved so scope never gets lost or misremembered.*

---

## YYYY-MM-DD HH:MM UTC — [brief topic]

**Tyler's exact words:**
> [paste verbatim]

**Context:** [Session branch / what was happening when this came in]
**Action taken:** [How the agent responded / what it built]
**Spec impact:** [Did this update SPEC.md? Which section?]

---
