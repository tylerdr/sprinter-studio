import { z } from 'zod'

/**
 * Truth-labeling schema for public portfolio items. `listed:false` is the
 * safe default — a venture only becomes `listed:true` once its relationship,
 * public state, and evidence are backed by something checkable (a repo
 * artifact or the canonical source/claim ledger). Never invent evidence to
 * satisfy this schema; an empty `evidence` array is a legal, honest state.
 */

export const RELATIONSHIPS = ['owned', 'operated', 'service-client', 'experiment'] as const
export const PUBLIC_STATES = ['live', 'in-development', 'validating', 'paused', 'archived'] as const
export const EVIDENCE_KINDS = ['live-url', 'screenshot', 'repo', 'testimonial', 'press', 'changelog'] as const

export type Relationship = (typeof RELATIONSHIPS)[number]
export type PublicState = (typeof PUBLIC_STATES)[number]
export type EvidenceKind = (typeof EVIDENCE_KINDS)[number]

const isoDate = z
  .string()
  .refine((d) => /^\d{4}-\d{2}-\d{2}$/.test(d), 'must be an ISO date (YYYY-MM-DD)')
  .refine((d) => d <= new Date().toISOString().slice(0, 10), 'date cannot be in the future')

/** Absolute http(s) URL, validated without relying on a specific zod version's `.url()`. */
const httpUrl = z.string().refine((v) => {
  try {
    const parsed = new URL(v)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}, 'must be an absolute http(s) URL')

/** Absolute URL or a site-relative path (for screenshots checked into the repo). */
const evidenceUrl = z
  .string()
  .refine((v) => v.startsWith('/') || /^https?:\/\//.test(v), 'must be an absolute URL or a site-relative path')

export const evidenceSchema = z.object({
  kind: z.enum(EVIDENCE_KINDS),
  url: evidenceUrl,
  label: z.string().optional(),
  capturedAt: isoDate,
})

export const metricSchema = z.object({
  label: z.string(),
  value: z.string(),
  asOf: isoDate,
  evidenceUrl: evidenceUrl,
})

export const ventureSchema = z
  .object({
    slug: z.string(),
    name: z.string(),
    domain: z.string(),
    description: z.string(),
    relationship: z.enum(RELATIONSHIPS),
    publicState: z.enum(PUBLIC_STATES),
    archetype: z.enum(['saas', 'marketplace', 'service', 'content', 'tool', 'infra']),
    listed: z.boolean(),
    url: httpUrl.optional(),
    icp: z.string().optional(),
    monetization: z.string().optional(),
    evidence: z.array(evidenceSchema),
    metrics: z.array(metricSchema).optional(),
    lastVerified: isoDate,
    featured: z.boolean().optional(),
    screenshot: z.string().optional(),
  })
  .superRefine((v, ctx) => {
    if (v.publicState === 'live' && !v.evidence.some((e) => e.kind === 'live-url')) {
      ctx.addIssue({ code: 'custom', message: `${v.slug}: 'live' requires live-url evidence` })
    }
    if (v.publicState === 'live' && !v.url) {
      ctx.addIssue({ code: 'custom', message: `${v.slug}: 'live' requires a url` })
    }
  })

export type Venture = z.infer<typeof ventureSchema>
