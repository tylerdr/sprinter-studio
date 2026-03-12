export interface Venture {
  slug: string
  name: string
  domain: string
  description: string
  stage: 'amble' | 'sprint' | 'sail' | 'revenue' | 'archived'
  archetype: 'saas' | 'marketplace' | 'service' | 'content' | 'tool' | 'infra'
  status: string
  url?: string
}

export const ventures: Venture[] = [
  // SAIL (launched, generating traction)
  { slug: 'getfoundinchat', name: 'GetFoundInChat', domain: 'getfoundinchat.com', description: 'GEO/LLMO optimization for businesses who want to get cited by AI chatbots', stage: 'sail', archetype: 'service', status: 'Launched', url: 'https://getfoundinchat.com' },
  { slug: 'aiopsguide', name: 'AI Ops Guide', domain: 'aiopsguide.com', description: 'Comprehensive guide to AI operations for engineering teams', stage: 'sail', archetype: 'content', status: 'Launched', url: 'https://aiopsguide.com' },
  { slug: 'aibizblueprint', name: 'AI Biz Blueprint', domain: 'aibizblueprint.com', description: 'AI business strategy frameworks and playbooks for founders', stage: 'sail', archetype: 'content', status: 'Launched', url: 'https://aibizblueprint.com' },
  { slug: 'shreddify', name: 'Shreddify', domain: 'shreddify.com', description: 'AI-powered guitar learning and tab generation', stage: 'sail', archetype: 'saas', status: 'Launched', url: 'https://shreddify.com' },
  { slug: 'protocolrank', name: 'ProtocolRank', domain: 'protocolrank.com', description: 'SEO rank tracking and protocol optimization', stage: 'sail', archetype: 'tool', status: 'Launched', url: 'https://protocolrank.com' },
  { slug: 'ohioelectricityrates', name: 'Ohio Electricity Rates', domain: 'ohioelectricityrates.com', description: 'Rate comparison tool for Ohio energy consumers', stage: 'sail', archetype: 'tool', status: 'Launched', url: 'https://ohioelectricityrates.com' },
  { slug: 'ogpreviewtool', name: 'OG Preview Tool', domain: 'ogpreviewtool.com', description: 'Preview how your links look on social media platforms', stage: 'sail', archetype: 'tool', status: 'Launched - revenue-blocked' },

  // SPRINT (building, validating)
  { slug: 'sprinter-studio', name: 'Sprinter Studio', domain: 'sprinter.studio', description: 'The AI venture factory dashboard — this site', stage: 'sprint', archetype: 'infra', status: 'Building MVP', url: 'https://sprinter.studio' },
  { slug: 'winemakeros', name: 'WinemakerOS', domain: 'winemakeros.com', description: 'AI-powered winery management platform', stage: 'sprint', archetype: 'saas', status: 'Building → Launch-Ready' },
  { slug: 'everymcp', name: 'EveryMCP', domain: 'everymcp.com', description: 'Directory and marketplace for MCP (Model Context Protocol) servers', stage: 'sprint', archetype: 'marketplace', status: 'Building' },
  { slug: 'cimreader', name: 'CIM Reader', domain: 'cimreader.com', description: 'AI CIM analysis for PE analysts — turns 3hr CIM review into 10 minutes', stage: 'sprint', archetype: 'tool', status: 'Live, needs domain DNS' },
  { slug: 'portcoaudit', name: 'PortCo Audit', domain: 'portcoaudit.com', description: 'AI audit of portfolio companies to identify AI transformation opportunities', stage: 'sprint', archetype: 'service', status: 'Build-now validate' },
  { slug: 'hireagentbuilders', name: 'Hire Agent Builders', domain: 'hireagentbuilders.com', description: 'Marketplace connecting companies with AI agent development talent', stage: 'sprint', archetype: 'marketplace', status: 'Validation - concierge v1' },
  { slug: 'shotfreetrt', name: 'ShotFree TRT', domain: 'shotfreetrt.com', description: 'Alternative TRT optimization resource and community', stage: 'sprint', archetype: 'content', status: 'Live' },
  { slug: 'sprinteragent', name: 'Sprinter Agent', domain: 'sprinteragent.com', description: 'AI agent infrastructure and deployment platform', stage: 'sprint', archetype: 'infra', status: 'Live, DNS propagating' },
  { slug: 'roofrainmaker', name: 'Roof Rainmaker', domain: 'roofrainmaker.com', description: 'AI-powered website + lead gen system for roofing contractors', stage: 'sprint', archetype: 'service', status: 'Sprint → approaching Sail' },

  // AMBLE (ideating, validating)
  { slug: 'roofingreels', name: 'Roofing Reels', domain: 'roofingreels.com', description: 'Turn job site photos into viral social content for roofers', stage: 'amble', archetype: 'saas', status: 'Ideating' },
  { slug: 'alivelongevity', name: 'Alive Longevity', domain: 'alivelongevity.com', description: 'AI-powered longevity optimization and biomarker tracking', stage: 'amble', archetype: 'saas', status: 'Reactivation test' },
  { slug: 'sproutparent', name: 'Sprout Parent', domain: 'sproutparent.com', description: 'AI parenting assistant and child development tracker', stage: 'amble', archetype: 'saas', status: 'Ideating' },
]

export const stageConfig = {
  amble: { label: 'Amble', color: 'text-accent-orange', bg: 'bg-accent-orange/10', border: 'border-accent-orange/30', hex: '#ff6600' },
  sprint: { label: 'Sprint', color: 'text-accent-blue', bg: 'bg-accent-blue/10', border: 'border-accent-blue/30', hex: '#0066ff' },
  sail: { label: 'Sail', color: 'text-accent-green', bg: 'bg-accent-green/10', border: 'border-accent-green/30', hex: '#00ff88' },
  revenue: { label: 'Revenue', color: 'text-accent-green', bg: 'bg-accent-green/10', border: 'border-accent-green/30', hex: '#00ff88' },
  archived: { label: 'Archived', color: 'text-text-muted', bg: 'bg-text-muted/10', border: 'border-text-muted/30', hex: '#888888' },
} as const

export function getVenturesByStage(stage: Venture['stage']) {
  return ventures.filter(v => v.stage === stage)
}
