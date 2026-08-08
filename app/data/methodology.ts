/**
 * The Amble → Sprint → Sail methodology, kept as process narrative only
 * (see documents/DECISIONS.md). It no longer tags individual ventures —
 * portfolio items use `publicState` from venture.schema.ts instead.
 */

export const PHASES = ['amble', 'sprint', 'sail'] as const
export type Phase = (typeof PHASES)[number]

export const phaseConfig: Record<Phase, { name: string; phase: string; sub: string; hex: string }> = {
  amble: { name: 'AMBLE', phase: 'PHASE 01', sub: 'IDEATE & VALIDATE', hex: '#ff6600' },
  sprint: { name: 'SPRINT', phase: 'PHASE 02', sub: 'BUILD & DEPLOY', hex: '#0066ff' },
  sail: { name: 'SAIL', phase: 'PHASE 03', sub: 'GROW & SCALE', hex: '#00ff88' },
}
