import { ogSize, renderOgCard } from '@/lib/og-card'

export const alt =
  'Sprinter Studio — partner incubations and internal experiments, published while unproven'
export const size = ogSize
export const contentType = 'image/png'

export default async function Image() {
  return renderOgCard({
    eyebrow: 'SPRINTER STUDIO — THE PUBLIC LEDGER',
    lead: ['Partner incubations and', 'internal experiments,'],
    rest: 'published while unproven.',
    sub: 'Every entry shows its track, stage, status, and what is still unproven, including the work we stop.',
  })
}
