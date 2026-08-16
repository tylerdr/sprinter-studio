/**
 * Canonical outbound destinations for sprinter.studio.
 *
 * Every cross-domain link ships the studio's UTM pair, so keep the links here
 * rather than hard-coding bare URLs in components.
 */
const UTM = '?utm_source=studio&utm_medium=site'

export const outbound = {
  skillsCheck: `https://sprinter.ai/ai-skills-check${UTM}`,
  workshop: `https://sprinter.ai/ai-productivity-workshop${UTM}`,
  portfolioPack: `https://sprinter.ai/portfolio-ai-training-pack${UTM}`,
  consulting: `https://sprinterconsulting.com${UTM}`,
  tyler: `https://tylerdreher.com${UTM}`,
  amble: `https://ambleideation.com${UTM}`,
  github: 'https://github.com/tylerdr/sprinter-studio',
} as const
