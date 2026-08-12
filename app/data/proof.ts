/**
 * Founder-level capability proof — not portfolio "ventures." These are
 * conservative, public-safe claims sourced directly from the canonical
 * source/claim ledger (SprinterVault, sprinter-portfolio-brand-revenue-
 * system-2026-08-07/SOURCE-LEDGER.md, dated 2026-08-07). They intentionally
 * skip the venture schema (no domain/url is confirmed for several of these)
 * rather than force-fitting evidence that doesn't exist. Do not add a row
 * here without a matching `public-safe` line in that ledger.
 */

export interface ProofItem {
  id: string
  name: string
  proofClass: 'Capability' | 'Product architecture' | 'Completed build' | 'Prototype'
  relationship: string
  description: string
  note: string
  href?: string
  verifiedAt: string
}

export const proofItems: ProofItem[] = [
  {
    id: 'cab-o-matic',
    name: 'Cab-O-Matic',
    proofClass: 'Capability',
    relationship: 'Equity partner + ongoing product and engineering partner',
    description:
      'A vertical SaaS product for cabinet pricing, quoting, and manufacturer-data operations — spanning 19 manufacturers, 46 product lines, and approximately 4.6M catalog items.',
    note: 'Customer names, screenshots, and outcomes remain permission-gated; scale figures are ledger-verified.',
    verifiedAt: '2026-08-07',
  },
  {
    id: 'amble',
    name: 'Amble',
    proofClass: 'Product architecture',
    relationship: 'Founder + product builder',
    description:
      'A multi-tenant operating system with a permissioned context and entity graph, tasks, workstreams, evidence, approvals, decisions, dashboards, and agent/MCP interaction.',
    note: 'A sibling product — not presented as a Sprinter Studio venture.',
    href: 'https://ambleideation.com',
    verifiedAt: '2026-08-07',
  },
  {
    id: 'chatgpt-sites-family-planner',
    name: 'ChatGPT Sites family planner',
    proofClass: 'Completed build',
    relationship: 'Product builder',
    description:
      'A family-planning product build created on the ChatGPT Sites surface.',
    note: 'Built on OpenAI’s ChatGPT Sites platform. No OpenAI employment or endorsement is implied.',
    verifiedAt: '2026-08-07',
  },
  {
    id: 'mortgageq',
    name: 'mortgageQ',
    proofClass: 'Prototype',
    relationship: 'Research-prototype builder',
    description:
      'A prototype applying structured lender-program research across 50+ wholesale lenders.',
    note: 'Prototype stage only — no live product, customer, adoption, savings, or revenue outcome is claimed.',
    verifiedAt: '2026-08-07',
  },
]
