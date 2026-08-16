import {
  archivedVentures,
  getVenturesByTrack,
  stageConfig,
  trackConfig,
  ventures,
  type Venture,
} from '@/app/data/ventures'

export const revalidate = 3600

function entry(v: Venture) {
  return `- ${v.name} (${v.domain}) — ${v.description} [${stageConfig[v.stage].label}: ${v.status}]`
}

export function GET() {
  const partner = getVenturesByTrack('partner').filter(
    (v) => v.stage !== 'archived',
  )
  const internal = getVenturesByTrack('internal').filter(
    (v) => v.stage !== 'archived',
  )

  const lines: string[] = [
    '# Sprinter Studio',
    '',
    '> Sprinter Studio is the venture studio of Sprinter: products incubated with partners and internal experiments, each clearly labeled as one or the other — a public record of what is being tested, shipped, and stopped. Commercial training and workflow offers live at https://sprinter.ai.',
    '',
    `## ${trackConfig.partner.plural}`,
    '',
    trackConfig.partner.definition,
    '',
    ...(partner.length
      ? partner.map(entry)
      : [
          'No partner incubation is published yet. When one is, it is listed here with the partner named.',
        ]),
    '',
    `## ${trackConfig.internal.plural}`,
    '',
    trackConfig.internal.definition,
    '',
    ...internal.map(entry),
    '',
    '## Stopped and archived',
    '',
    'Recorded decisions that are no longer an active commercial path. The learning stays public.',
    '',
    ...(archivedVentures.length
      ? archivedVentures.map(entry)
      : ['- None recorded yet.']),
    '',
    '## How to read a stage',
    '',
    'Amble → Sprint → Sail is a confidence label, not a trophy. Work can advance, revise, pause, or stop as evidence changes.',
    '- Amble: a question or hypothesis under investigation. No build commitment.',
    '- Sprint: a bounded implementation intended to answer one consequential question. Shipping is not the gate; evidence is.',
    '- Sail: a live property with an explicit reason to continue — repeated use, qualified demand, revenue, or strategic reuse. Sail does not imply meaningful revenue or a self-sustaining company.',
    '- Archived: a recorded decision that no longer deserves active attention.',
    'A public URL is evidence of execution, not of demand. Full method: https://sprinter.studio/playbook',
    '',
    '## Links',
    '',
    '- Home: https://sprinter.studio/',
    '- Playbook: https://sprinter.studio/playbook',
    ...ventures.map((v) => `- ${v.name}: https://sprinter.studio/ventures/${v.slug}`),
    '- Source (built in public): https://github.com/tylerdr/sprinter-studio',
    '',
    '## Related properties',
    '',
    '- Sprinter — practical AI training and workflows: https://sprinter.ai',
    '- Sprinter Consulting — the execution practice of Sprinter: https://sprinterconsulting.com',
    '- Amble — the company brain: https://ambleideation.com',
    '- Tyler Dreher — founder of Sprinter: https://tylerdreher.com',
    '',
  ]

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
