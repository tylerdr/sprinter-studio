import { listedVentures, stateConfig, relationshipConfig } from '@/app/data/ventures'
import { POSITIONING_STATEMENT, NOT_A_FUND_STATEMENT } from '@/app/data/positioning'
import { cacheLife } from 'next/cache'

async function buildBody() {
  'use cache'
  cacheLife('hours')

  const ventureLines =
    listedVentures.length > 0
      ? listedVentures.map(
          (v) =>
            `- ${v.name} (${v.domain}) — ${v.description} [${relationshipConfig[v.relationship].label}, ${stateConfig[v.publicState].label}, last verified ${v.lastVerified}]`,
        )
      : ['(No portfolio items are listed publicly right now — see https://sprinter.studio/ventures for review state.)']

  const lines: string[] = [
    '# Sprinter Studio',
    '',
    `> ${POSITIONING_STATEMENT} ${NOT_A_FUND_STATEMENT}`,
    '',
    '## Ventures',
    '',
    ...ventureLines,
    '',
    '## Playbook',
    '',
    'Amble → Sprint → Sail — the stage-gate methodology behind every build:',
    '- Amble (ideate & validate): divergent exploration; score ideas, define ICP, validate demand before writing code.',
    '- Sprint (build & deploy): focused execution with AI as leverage; architecture and scope stay human.',
    '- Sail (grow & scale): distribution and growth loops, with revenue evidence tracked honestly.',
    'Ventures only advance through gates (build-ready, launch) with real market data. Full playbook: https://sprinter.studio/playbook',
    '',
    '## Co-build',
    '',
    'Selective co-build for domain insiders with distribution, cash, a real wedge, and clean IP. Fit criteria: https://sprinter.studio/co-build',
    '',
    '## Links',
    '',
    '- Home: https://sprinter.studio/',
    '- Ventures: https://sprinter.studio/ventures',
    '- Co-build: https://sprinter.studio/co-build',
    '- Playbook: https://sprinter.studio/playbook',
    ...listedVentures.map((v) => `- ${v.name}: https://sprinter.studio/ventures/${v.slug}`),
    '- Source: https://github.com/tylerdr/sprinter-studio',
    '- Sibling sites (separate properties): https://sprinter.ai, https://sprinterconsulting.com, https://amble.so',
    '',
  ]

  return lines.join('\n')
}

export async function GET() {
  return new Response(await buildBody(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
