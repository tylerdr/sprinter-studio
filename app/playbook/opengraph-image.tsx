import { ogSize, renderOgCard } from '@/lib/og-card'

export const alt = 'The Amble → Sprint → Sail playbook — Sprinter Studio'
export const size = ogSize
export const contentType = 'image/png'

export default async function Image() {
  return renderOgCard({
    eyebrow: 'THE PLAYBOOK — AMBLE → SPRINT → SAIL',
    lead: ['A stage is a confidence', 'label, not a trophy.'],
    rest: 'Stopping is a valid output.',
    sub: 'The evidence gates Sprinter Studio uses to advance, revise, pause, or stop AI product experiments.',
  })
}
