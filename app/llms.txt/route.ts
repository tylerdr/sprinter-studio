import {
  archivedVentures,
  getVenturesByTrack,
  stageConfig,
  trackConfig,
  ventures,
  type Venture,
} from '@/app/data/ventures'

export const revalidate = 3600

function entry(venture: Venture) {
  return `- ${venture.name} (${venture.domain}) — ${venture.description} [${stageConfig[venture.stage].label}: ${venture.status}]`
}

export function GET() {
  const partner = getVenturesByTrack('partner').filter(
    (venture) => venture.stage !== 'archived',
  )
  const internal = getVenturesByTrack('internal').filter(
    (venture) => venture.stage !== 'archived',
  )

  const lines: string[] = [
    '# Sprinter Studio',
    '',
    '> Sprinter Studio is the venture studio of Sprinter: products incubated with partners and internal experiments, each clearly labeled as one or the other — a public record of what is being tested, shipped, and stopped. Studio is not itself a commercial offer: the Sprinter front door is the Executive AI Accelerator at https://sprinter.ai/executive-ai-accelerator.',
    '',
    '## Current commercial routing',
    '',
    '- Executive AI Accelerator, $2,500: https://sprinter.ai/executive-ai-accelerator',
    '- Portfolio Executive AI Accelerator, $10,000 for five individually scheduled leaders: https://sprinter.ai/portfolio-executive-ai-accelerator',
    '- Workflow setup and implementation after the need is proven: https://sprinterconsulting.com',
    '- Founder background and writing: https://tylerdreher.com',
    '',
    'The Executive AI Accelerator is the default first purchase: one executive, two private 60-minute working sessions over one week, and three repeatable Claude Cowork, ChatGPT, Copilot, Gemini, or other approved AI workflows. No workshop cohort, Sprinter platform, integration, or long-term contract is required.',
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
    ...ventures.map(
      (venture) =>
        `- ${venture.name}: https://sprinter.studio/ventures/${venture.slug}`,
    ),
    '- Source: https://github.com/tylerdr/sprinter-studio',
    '',
    '## Related properties',
    '',
    '- Sprinter — private executive AI enablement and portfolio acceleration: https://sprinter.ai',
    '- Sprinter Consulting — implementation after a workflow earns it: https://sprinterconsulting.com',
    '- Amble — shared context and reusable operating capability: https://ambleideation.com',
    '- Tyler Dreher — founder, writing, and selected work: https://tylerdreher.com',
    '',
  ]

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
