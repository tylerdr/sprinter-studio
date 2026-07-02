import { ventures, stageConfig } from '@/app/data/ventures'

export const revalidate = 3600

export function GET() {
  const lines: string[] = [
    '# Sprinter Studio',
    '',
    `> One founder + AI agents building ${ventures.length} software ventures in public — zero employees. Every venture is real: live, in build, or in validation. The methodology (Amble → Sprint → Sail) is open source.`,
    '',
    '## Ventures',
    '',
    ...ventures.map(
      (v) =>
        `- ${v.name} (${v.domain}) — ${v.description} [${stageConfig[v.stage].label}: ${v.status}]`,
    ),
    '',
    '## Playbook',
    '',
    'Amble → Sprint → Sail — the stage-gate methodology behind every venture:',
    '- Amble (ideate & validate): divergent exploration; score ideas, define ICP, validate demand. No code until the signal is clear.',
    '- Sprint (build & deploy): focused execution; ship an MVP in days, with AI agents doing the heavy lifting.',
    '- Sail (grow & scale): distribution and growth loops; optimize for revenue, automate everything that moves.',
    'Ventures only advance through gates (build-ready, launch) with real market data. Full playbook: https://sprinter.studio/playbook',
    '',
    '## Links',
    '',
    '- Home: https://sprinter.studio/',
    '- Playbook: https://sprinter.studio/playbook',
    ...ventures.map((v) => `- ${v.name}: https://sprinter.studio/ventures/${v.slug}`),
    '- Source (built in public): https://github.com/tylerdr/sprinter-studio',
    '- Sibling sites: https://sprinter.ai, https://sprinterconsulting.com, https://amble.so',
    '',
  ]

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
