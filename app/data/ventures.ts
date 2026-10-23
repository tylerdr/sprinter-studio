export interface Venture {
  slug: string
  name: string
  domain: string
  description: string
  stage: 'amble' | 'sprint' | 'sail' | 'revenue' | 'archived'
  /**
   * D5: every entry sits in exactly one track.
   * 'partner'  — incubated with a named partner who brings the domain and the demand.
   * 'internal' — started on Sprinter's own bench, published while still unproven.
   */
  track: 'partner' | 'internal'
  archetype: 'saas' | 'marketplace' | 'service' | 'content' | 'tool' | 'infra'
  status: string
  url?: string
  icp?: string
  monetization?: string
  signal?: string
  featured?: boolean
  screenshot?: string
  /** D22a: a niche brand with its own offers, backed by Sprinter but not a Sprinter offer. */
  standaloneBrand?: boolean
}

export const ventures: Venture[] = [
  // SAIL: live properties that have earned continued observation or work.
  // Sail does not imply meaningful revenue, durable demand, or a standalone company.
  {
    slug: 'getfoundinchat',
    name: 'GetFoundInChat',
    domain: 'getfoundinchat.com',
    description: 'A service offer focused on how businesses appear in AI-generated answers.',
    stage: 'sail',
    track: 'internal',
    archetype: 'service',
    status: 'Live offer · validating demand',
    url: 'https://getfoundinchat.com',
    icp: 'B2B companies exploring visibility in ChatGPT, Perplexity, Gemini, and Claude.',
    monetization: 'Service packages or bounded optimization sprints.',
    signal: 'Public offer and delivery hypothesis exist; repeatable demand still needs evidence.',
    featured: true,
    screenshot: '/ventures/getfoundinchat.webp',
    standaloneBrand: true,
  },
  {
    slug: 'shreddify',
    name: 'Shreddify',
    domain: 'shreddify.com',
    description: 'A fitness goal and progress app for turning observations into a practical plan.',
    stage: 'sail',
    track: 'internal',
    archetype: 'saas',
    status: 'Live product · traction unverified',
    url: 'https://shreddify.com',
    icp: 'People tracking fitness goals and changes over time.',
    monetization: 'Consumer subscription hypothesis.',
    signal: 'A consumer fitness product; retention and willingness to pay remain to be measured.',
  },
  {
    slug: 'protocolrank',
    name: 'ProtocolRank',
    domain: 'protocolrank.com',
    description: 'An educational research project comparing health protocols and the evidence behind their claims.',
    stage: 'sail',
    track: 'internal',
    archetype: 'content',
    status: 'Live tool · monetization test',
    url: 'https://protocolrank.com',
    icp: 'People researching protocols, evidence quality, and uncertainty.',
    monetization: 'Research and media business-model hypothesis.',
    signal: 'Educational comparisons support research; they do not establish treatment outcomes.',
  },
  {
    slug: 'ohioelectricityrates',
    name: 'Ohio Electricity Rates',
    domain: 'ohioelectricityrates.com',
    description: 'A rate-comparison and local-search experiment for Ohio energy consumers.',
    stage: 'archived',
    track: 'internal',
    archetype: 'tool',
    status: 'Retired · no active investment',

    icp: 'Ohio consumers comparing electricity suppliers and rates.',
    monetization: 'Lead generation, affiliate, or local-search hypothesis.',
    signal: 'Retired by Tyler in October 2026. Kept in the ledger as a record of the electricity-comparison experiment.',
    screenshot: '/ventures/ohioelectricityrates.webp',
  },
  {
    slug: 'portcoaudit',
    name: 'PortCo Audit',
    domain: 'portcoaudit.com',
    description: 'PortCoAudit AI: board-ready AI EBITDA roadmaps for private-equity operating teams, across portfolio companies in 10 business days.',
    stage: 'sail',
    track: 'internal',
    archetype: 'service',
    status: 'Live offer · validating demand',
    url: 'https://portcoaudit.com',
    icp: 'Private equity firms, family offices, holding companies, and portfolio operators.',
    monetization: 'Paid workshop qualifier into a fixed-fee portfolio audit.',
    signal: 'A public offer exists; repeatable demand still needs evidence.',
    screenshot: '/ventures/portcoaudit.webp',
    standaloneBrand: true,
  },

  // SPRINT: bounded builds intended to answer a specific question.
  {
    slug: 'sprinter-studio',
    name: 'Sprinter Studio',
    domain: 'sprinter.studio',
    description: 'The public site of the venture studio itself: two labeled tracks, the evidence behind each stage change, and the decisions to stop.',
    stage: 'sprint',
    track: 'internal',
    archetype: 'infra',
    status: 'Live public record · in active build',
    url: 'https://sprinter.studio',
    icp: 'Builders, potential incubation partners, and prospects evaluating how Sprinter experiments and learns.',
    monetization: 'Trust and learning surface that routes commercial demand to the focused Sprinter sites.',
    signal: 'Useful only if the record remains honest and reinforces focus rather than portfolio theater.',
    featured: true,
  },
  {
    slug: 'winemakeros',
    name: 'WinemakerOS',
    domain: 'winemakeros.com',
    description: 'Winemaking calculators, planning utilities, and reference tools for winery workflows.',
    stage: 'sprint',
    track: 'internal',
    archetype: 'saas',
    status: 'Prototype · launch readiness unverified',
    url: 'https://winemakeros.com',
    icp: 'Small and midsize wineries evaluating better operational tooling.',
    monetization: 'Winery-specific subscription software hypothesis.',
    signal: 'Domain specificity is promising; operator validation and distribution are still required.',
    featured: true,
    screenshot: '/ventures/winemakeros.webp',
  },
  {
    slug: 'everymcp',
    name: 'EveryMCP',
    domain: 'everymcp.com',
    description: 'A directory and marketplace hypothesis for Model Context Protocol servers.',
    stage: 'sprint',
    track: 'internal',
    archetype: 'marketplace',
    status: 'Prototype · validating discovery demand',
    url: 'https://everymcp.com',
    icp: 'Developers and AI builders looking for MCP servers and integrations.',
    monetization: 'Listings, sponsorships, premium discovery, or marketplace hypothesis.',
    signal: 'Category activity exists; differentiated utility and durable acquisition remain unproven.',
    featured: true,
    screenshot: '/ventures/everymcp.webp',
  },
  {
    slug: 'hireagentbuilders',
    name: 'Hire Agent Builders',
    domain: 'hireagentbuilders.com',
    description: 'A concierge and marketplace hypothesis for matching companies with AI agent builders.',
    stage: 'sprint',
    track: 'internal',
    archetype: 'marketplace',
    status: 'Concierge validation · not yet a marketplace',
    url: 'https://hireagentbuilders.com',
    icp: 'Teams that need qualified AI implementation talent.',
    monetization: 'Placement fee, referral, or marketplace hypothesis.',
    signal: 'Demand and supply quality must be validated manually before software investment.',
    screenshot: '/ventures/hireagentbuilders.webp',
  },
  {
    slug: 'shotfreetrt',
    name: 'ShotFree TRT',
    domain: 'shotfreetrt.com',
    description: 'A content-property experiment about alternatives and questions around TRT delivery.',
    stage: 'sprint',
    track: 'internal',
    archetype: 'content',
    status: 'Live content property · editorial validation',
    url: 'https://shotfreetrt.com',
    icp: 'Adults researching TRT delivery options and questions to discuss with qualified clinicians.',
    monetization: 'Content, referral, or partnership hypothesis subject to health-content safeguards.',
    signal: 'Niche search intent may exist; accuracy, safety, and responsible monetization are non-negotiable gates.',
    screenshot: '/ventures/shotfreetrt.webp',
  },
  {
    slug: 'sprinteragent',
    name: 'Sprinter Agent',
    domain: 'sprinteragent.com',
    description: 'An infrastructure experiment for deploying and operating bounded AI-agent workflows.',
    stage: 'sprint',
    track: 'internal',
    archetype: 'infra',
    status: 'Prototype · internal reuse test',
    url: 'https://sprinteragent.com',
    icp: 'Builders and companies evaluating production AI-agent infrastructure.',
    monetization: 'Infrastructure subscription or enterprise tooling hypothesis.',
    signal: 'The strongest near-term value may be internal reuse rather than a standalone product.',
    screenshot: '/ventures/sprinteragent.webp',
  },
  {
    slug: 'roofrainmaker',
    name: 'Roof Rainmaker',
    domain: 'roofrainmaker.com',
    description: 'A website, lead-capture, and follow-up service hypothesis for roofing contractors.',
    stage: 'sprint',
    track: 'internal',
    archetype: 'service',
    status: 'Live service concept · validating demand',
    url: 'https://roofrainmaker.com',
    icp: 'Roofing contractors that need a stronger website and inbound follow-up system.',
    monetization: 'Setup fees plus recurring marketing or automation support.',
    signal: 'Clear buyer and outbound route exist; repeatable acquisition and delivery economics need proof.',
    featured: true,
    screenshot: '/ventures/roofrainmaker.webp',
  },

  // AMBLE: questions and hypotheses under investigation. No build commitment.
  {
    slug: 'roofingreels',
    name: 'Roofing Reels',
    domain: 'roofingreels.com',
    description: 'Turn roofing job photos and videos into short project-proof and sales videos.',
    stage: 'sprint',
    track: 'internal',
    archetype: 'saas',
    status: 'Video product · active development',
    icp: 'Roofers with job photos but no consistent content workflow.',
    monetization: 'Possible subscription or service add-on.',
    signal: 'A standalone video product that also supports Roof Rainmaker’s proof workflow.',
    url: 'https://roofingreels.com',
  },
  {
    slug: 'alivelongevity',
    name: 'Alive Longevity',
    domain: 'alivelongevity.com',
    description: 'A content and product hypothesis around longevity education and personal data organization.',
    stage: 'amble',
    track: 'internal',
    archetype: 'saas',
    status: 'Reactivation hypothesis · safeguards required',
    url: 'https://alivelongevity.com',
    icp: 'Adults interested in organizing health information and discussing goals with qualified professionals.',
    monetization: 'Content, software, or professional-directory hypotheses subject to health and claims safeguards.',
    signal: 'Audience interest may exist; trustworthy sourcing, scope boundaries, and responsible monetization come first.',
    screenshot: '/ventures/alivelongevity.webp',
  },
  {
    slug: 'sproutparent',
    name: 'Sprout Parent',
    domain: 'sproutparent.com',
    description: 'A hypothesis for lightweight parenting organization and developmental-reference tools.',
    stage: 'amble',
    track: 'internal',
    archetype: 'saas',
    status: 'Hypothesis · no build commitment',
    icp: 'Parents seeking organization and age-appropriate reference material.',
    monetization: 'Consumer subscription or membership hypothesis.',
    signal: 'Personal relevance is not market evidence; safety, trust, and demand must be validated first.',
  },

  // Reactivated products: current public sites, reviewed October 2026.
  {
    slug: 'aiopsguide',
    name: 'AI Ops Guide',
    domain: 'aiopsguide.com',
    description: 'An operations assessment that turns documented processes into prioritized AI workflows and an implementation plan.',
    stage: 'sail',
    track: 'internal',
    archetype: 'service',
    status: 'Live product · active development',
    icp: 'Operating leaders deciding where AI automation should start.',
    monetization: 'One-time operations blueprint or assessment.',
    signal: 'The self-serve blueprint site is live; customer outcomes and repeatable demand remain to be measured.',
    url: 'https://aiopsguide.com',
  },
  {
    slug: 'aibizblueprint',
    name: 'AI Biz Blueprint',
    domain: 'aibizblueprint.com',
    description: 'A planning tool for mapping a business and designing how people and AI share the work.',
    stage: 'sail',
    track: 'internal',
    archetype: 'tool',
    status: 'Live planning tool · active development',
    icp: 'Founders and operators evaluating AI-native business models.',
    monetization: 'One-time workflow blueprint hypothesis.',
    signal: 'The business-mapping product is live; adoption and paid demand remain to be measured.',
    url: 'https://aibizblueprint.com',
  },
  {
    slug: 'ogfixer',
    name: 'OG Fixer',
    domain: 'ogfixer.com',
    description: 'Inspect Open Graph metadata and simulate how a link appears when shared.',
    stage: 'sail',
    track: 'internal',
    archetype: 'tool',
    status: 'Live tool · active development',
    icp: 'Marketers and developers validating social-share cards.',
    monetization: 'Free preview checks with a paid workflow hypothesis.',
    signal: 'The metadata and share-card tool is live at ogfixer.com.',
    url: 'https://ogfixer.com',
  },
  {
    slug: 'cimreader',
    name: 'CIM Reader',
    domain: 'cimreader.vercel.app',
    description: 'AI-assisted CIM screening with source-linked figures, business summaries, and questions for diligence.',
    stage: 'sail',
    track: 'internal',
    archetype: 'tool',
    status: 'Live screening tool · active development',
    icp: 'PE analysts, family offices, and independent sponsors reviewing CIMs.',
    monetization: 'Usage-based document screening hypothesis.',
    signal: 'The product is live on its Vercel address; cimreader.com is not currently resolving.',
    url: 'https://cimreader.vercel.app',
  },
  {
    slug: 'peakedlabs',
    name: 'Peaked Labs',
    domain: 'peakedlabs.com',
    description: 'A directory for researching and comparing TRT and peptide clinics, with provider details and pricing context.',
    stage: 'sail',
    track: 'internal',
    archetype: 'tool',
    status: 'Live directory · active development',
    url: 'https://peakedlabs.com',
    icp: 'People comparing health and wellness providers.',
    monetization: 'Directory sponsorship hypothesis.',
    signal: 'The provider directory is live. Listings support research and are not medical endorsements.',
  },
  {
    slug: "brandkit",
    name: "BrandKit Express",
    domain: "www.brandkitexpress.com",
    description: "Brand rules, design tokens, and identity exports for people and the agents they direct.",
    stage: "sail",
    track: "internal",
    archetype: "tool",
    status: "Live project · active development",
    url: "https://www.brandkitexpress.com",
    signal: "Public site and share assets checked in October 2026. Commercial traction is not implied by launch status.",
  },
  {
    slug: "playdays",
    name: "PlayDays",
    domain: "ourplaydays.com",
    description: "Activity ideas and practical plans that help families spend time together.",
    stage: "sail",
    track: "internal",
    archetype: "tool",
    status: "Live project · active development",
    url: "https://ourplaydays.com",
    signal: "Public site and share assets checked in October 2026. Commercial traction is not implied by launch status.",
  },
  {
    slug: "potentialpools",
    name: "PotentialPools",
    domain: "potentialpools.com",
    description: "New-homeowner signals and acquisition workflows for pool-service businesses.",
    stage: "sail",
    track: "internal",
    archetype: "saas",
    status: "Live project · active development",
    url: "https://potentialpools.com",
    signal: "Public site and share assets checked in October 2026. Commercial traction is not implied by launch status.",
  },
  {
    slug: "specsprint",
    name: "SpecSprint",
    domain: "specsprint.ai",
    description: "A human-reviewed PDF-to-attribute catalog pilot that helps industrial equipment teams find relevant past drawings.",
    stage: "sail",
    track: "internal",
    archetype: "tool",
    status: "Live project · active development",
    url: "https://specsprint.ai",
    signal: "Public site and share assets checked in October 2026. Commercial traction is not implied by launch status.",
  },
  {
    slug: "spotbundle",
    name: "SpotBundle",
    domain: "spotbundle.com",
    description: "Launch-distribution planning, channel research, and submission assets for software products.",
    stage: "sail",
    track: "internal",
    archetype: "service",
    status: "Live project · active development",
    url: "https://spotbundle.com",
    signal: "Public site and share assets checked in October 2026. Commercial traction is not implied by launch status.",
  },
  {
    slug: "uiproof",
    name: "UIProof",
    domain: "uiproof.com",
    description: "Commit-linked visual and functional reports for reviewing software changes and reproducing defects.",
    stage: "sail",
    track: "internal",
    archetype: "tool",
    status: "Live project · active development",
    url: "https://uiproof.com",
    signal: "Public site and share assets checked in October 2026. Commercial traction is not implied by launch status.",
  },
  {
    slug: "recovery-wellness-longevity",
    name: "Recovery Wellness Longevity",
    domain: "recoverywellnesslongevity.com",
    description: "Equipment economics, research context, and operating guides for recovery and wellness businesses.",
    stage: "sail",
    track: "internal",
    archetype: "content",
    status: "Live project · active development",
    url: "https://recoverywellnesslongevity.com",
    signal: "Public site and share assets checked in October 2026. Commercial traction is not implied by launch status.",
  },
  {
    slug: "hybrid-marks",
    name: "Hybrid Marks",
    domain: "hybrid-marks-sprinter.vercel.app",
    description: "Strength and endurance benchmarks with a browser tracker for comparing a baseline and retest.",
    stage: "sprint",
    track: "internal",
    archetype: "tool",
    status: "Live prototype · custom domain pending",
    url: "https://hybrid-marks-sprinter.vercel.app",
    signal: "Public site and share assets checked in October 2026. Commercial traction is not implied by launch status.",
  },
  {
    slug: "adsinchat",
    name: "AdsInChat",
    domain: "adsinchat.com",
    description: "An offline ChatGPT ad-test planner with editable text drafts, tracking links, a budget calculator, and a first-week plan.",
    stage: "sail",
    track: "internal",
    archetype: "tool",
    status: "Live project · active development",
    url: "https://adsinchat.com",
    signal: "Public site and share assets checked in October 2026. Commercial traction is not implied by launch status.",
  },
  {
    slug: "surveyclose",
    name: "SurveyClose",
    domain: "surveyclose.com",
    description: "An offline toolkit for coding open-text survey responses into themes and exporting source-linked evidence.",
    stage: "sail",
    track: "internal",
    archetype: "tool",
    status: "Live project · active development",
    url: "https://surveyclose.com",
    signal: "Public site and share assets checked in October 2026. Commercial traction is not implied by launch status.",
  },
]

export const trackConfig = {
  partner: {
    label: 'Partner incubation',
    plural: 'Partner incubations',
    definition:
      'New products Sprinter incubates with a named partner who brings the domain and the demand.',
  },
  internal: {
    label: 'Internal experiment',
    plural: 'Internal experiments',
    definition:
      "Products Sprinter starts on its own bench, published while they are still unproven.",
  },
} as const

/** D22a §3 copy for entries marked `standaloneBrand`. */
export const standaloneBrandConfig = {
  label: 'Standalone brand · backed by Sprinter',
  note: 'Its offers and prices are its own; they are not Sprinter offers.',
} as const

/**
 * Stage colors follow the D19 chalk grammar: chalk-green for shipped and
 * earning (Sail/Revenue), chalk-amber for in-build (Sprint), chalk-3 for
 * queued and archived (Amble/Archived). chalk-3 text must stay ≥ 12px.
 */
export const stageConfig = {
  amble: { label: 'Amble', hex: '#837d70' },
  sprint: { label: 'Sprint', hex: '#e2c185' },
  sail: { label: 'Sail', hex: '#8fd8ab' },
  revenue: { label: 'Revenue', hex: '#8fd8ab' },
  archived: { label: 'Retired', hex: '#837d70' },
} as const

export function getVenturesByStage(stage: Venture['stage']) {
  return ventures.filter((venture) => venture.stage === stage)
}

export function getVenturesByTrack(track: Venture['track']) {
  return ventures.filter((venture) => venture.track === track)
}

/** Entries still under active investigation — excludes stopped/archived records. */
export const activeVentures = ventures.filter(
  (venture) => venture.stage !== 'archived',
)

export const archivedVentures = ventures.filter(
  (venture) => venture.stage === 'archived',
)

/** Entries rendered in the Amble -> Sprint -> Sail stage columns. */
export const pipelineVentures = ventures.filter(
  (venture) => venture.track === 'internal' && venture.stage !== 'archived',
)

export const featuredVentures = ventures.filter((venture) => venture.featured)
