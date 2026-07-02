'use client'

import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Pipeline } from '@/app/components/Pipeline'
import { PlaybookDiagram, PhaseGlyph } from '@/app/components/PlaybookDiagram'
import { Reveal } from '@/app/components/Reveal'
import { featuredVentures, ventures, stageConfig } from '@/app/data/ventures'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Zap, Github, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/hero-texture.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,255,136,0.05)_0%,_transparent_70%)]" />
      </div>
      <div className="relative max-w-4xl mx-auto text-center space-y-8">
        <Reveal immediate duration={0.6} y={30}>
          <p className="text-sm md:text-base font-mono text-accent-green mb-4 tracking-wider uppercase">The AI Venture Factory</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            One Founder.{' '}
            <span className="text-accent-green">{ventures.length} Ventures.</span>
            <br />
            Zero Employees.
          </h1>
        </Reveal>

        <Reveal
          as="p"
          immediate
          duration={0.6}
          delay={0.2}
          className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto"
        >
          Sprinter Studio is a real venture factory where autonomous AI agents build, deploy, and grow software companies around the clock. Every venture below is real — live, in build, or in validation.
        </Reveal>

        <Reveal
          immediate
          duration={0.6}
          delay={0.4}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="#pipeline" className={cn(buttonVariants({ size: 'lg' }), 'bg-accent-green text-background hover:bg-accent-green/90 font-semibold')}>
            See the Venture Pipeline
          </Link>
          <Link href="/playbook" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'border-border-subtle hover:bg-surface')}>
            How We Build This Fast
          </Link>
        </Reveal>

        <Reveal
          immediate
          duration={0.6}
          delay={0.6}
          y={0}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-4 font-mono text-xs uppercase tracking-widest text-text-muted"
        >
          <span className="inline-flex items-center gap-2">
            <span className="h-1 w-1 bg-accent-orange" aria-hidden="true" />
            SaaS · SEO · Services · Marketplaces
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1 w-1 bg-accent-blue" aria-hidden="true" />
            Agents shipping around the clock
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1 w-1 bg-accent-green" aria-hidden="true" />
            Built in public
          </span>
        </Reveal>
      </div>
    </section>
  )
}

function StageDistribution() {
  const stages = ['amble', 'sprint', 'sail'] as const
  const distribution = stages.map((stage) => ({
    stage,
    label: stageConfig[stage].label,
    hex: stageConfig[stage].hex,
    count: ventures.filter((v) => v.stage === stage).length,
  }))
  const total = distribution.reduce((sum, d) => sum + d.count, 0)

  return (
    <div className="max-w-3xl mx-auto space-y-2.5">
      <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-widest text-text-muted">
        <span>Pipeline by stage</span>
        <span>N = {total}</span>
      </div>
      <div className="flex h-1.5 gap-px" role="img" aria-label={distribution.map((d) => `${d.label}: ${d.count}`).join(', ')}>
        {distribution.map((d) => (
          <div
            key={d.stage}
            className="opacity-80"
            style={{ width: `${(d.count / total) * 100}%`, backgroundColor: d.hex }}
          />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
        {distribution.map((d) => (
          <span key={d.stage} className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-text-muted">
            <span className="h-1.5 w-1.5" style={{ backgroundColor: d.hex }} aria-hidden="true" />
            {d.label} {d.count}
          </span>
        ))}
      </div>
    </div>
  )
}

function ByTheNumbers() {
  const stats = [
    { value: `${ventures.length}`, label: 'Ventures in Pipeline' },
    { value: '6', label: 'Business Archetypes' },
    { value: '24/7', label: 'Agent Uptime' },
    { value: '1', label: 'Human Founder' },
  ]

  return (
    <section className="py-16 px-6 bg-surface/50">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1} y={15} className="text-center space-y-1">
              <p className="text-3xl md:text-4xl font-bold font-mono text-accent-green">{stat.value}</p>
              <p className="text-sm text-text-muted">{stat.label}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3} y={0}>
          <StageDistribution />
        </Reveal>
      </div>
    </section>
  )
}

function WhyAIAgents() {
  const comparisons = [
    {
      traditional: 'Hire a team of 5–10 to launch one product',
      studio: `One founder + AI agents run ${ventures.length} ventures at once`,
    },
    {
      traditional: '6–12 months from idea to MVP',
      studio: 'Idea to deployed MVP in 1–3 days',
    },
    {
      traditional: '$50K–$500K burn before first revenue signal',
      studio: 'Near-zero marginal cost per venture',
    },
    {
      traditional: 'Kill decisions based on gut feel',
      studio: 'Stage-gate model: real market data before any kill',
    },
    {
      traditional: 'One bet. Hope it works.',
      studio: 'Portfolio of bets. Math works in your favor.',
    },
  ]

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Why AI Agents Change the Math
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Traditional startups bet everything on one idea with a big team and a long runway.
            We run dozens of experiments simultaneously at near-zero cost — and only scale what works.
          </p>
        </Reveal>

        <div className="space-y-3">
          {comparisons.map((row, i) => (
            <Reveal
              key={i}
              delay={i * 0.08}
              x={-10}
              y={0}
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              <div className="bg-surface border border-border-subtle rounded-lg px-5 py-3 flex items-center gap-3">
                <span className="text-red-400/70 text-lg shrink-0">✕</span>
                <p className="text-sm text-text-muted">{row.traditional}</p>
              </div>
              <div className="bg-surface border border-accent-green/20 rounded-lg px-5 py-3 flex items-center gap-3">
                <span className="text-accent-green text-lg shrink-0">✓</span>
                <p className="text-sm text-foreground">{row.studio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowWeBuild() {
  const phases = [
    {
      phase: 'amble',
      title: 'Amble',
      subtitle: 'Ideate & Validate',
      description: 'Divergent exploration. Score ideas, define ICP, validate demand. No code until the signal is clear.',
      color: '#ff6600',
    },
    {
      phase: 'sprint',
      title: 'Sprint',
      subtitle: 'Build & Deploy',
      description: 'Focused execution. Ship an MVP in days, not months. AI agents handle the heavy lifting.',
      color: '#0066ff',
    },
    {
      phase: 'sail',
      title: 'Sail',
      subtitle: 'Grow & Scale',
      description: 'Distribution and growth loops. Optimize for revenue. Automate everything that moves.',
      color: '#00ff88',
    },
  ] as const

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Build</h2>
          <p className="text-text-muted max-w-xl mx-auto">
            Three phases. One methodology. Repeatable venture creation at AI speed.
          </p>
        </Reveal>

        <Reveal y={0} className="mb-12">
          <PlaybookDiagram variant="compact" />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {phases.map((phase, i) => (
            <Reveal key={phase.title} delay={i * 0.15} y={30}>
              <Card className="bg-surface border-border-subtle h-full">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <PhaseGlyph phase={phase.phase} className="w-8 h-8 shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold" style={{ color: phase.color }}>
                        {phase.title}
                      </h3>
                      <p className="text-sm text-text-muted">{phase.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed">{phase.description}</p>
                  {i < 2 && (
                    <div className="hidden md:flex justify-end pt-2">
                      <ArrowRight className="w-4 h-4 text-text-muted" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function PipelineSection() {
  return (
    <section id="pipeline" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Pipeline</h2>
          <p className="text-text-muted">
            Where every venture stands across the factory right now.
          </p>
        </Reveal>

        <Pipeline />
      </div>
    </section>
  )
}

function VenturePortfolio() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        <Reveal className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Portfolio Snapshot</h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            A mix of launched assets, active builds, and fresh bets moving through the factory right now.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {featuredVentures.map((venture, index) => (
            <Reveal key={venture.slug} delay={index * 0.06}>
              <Card className={cn('bg-surface border-border-subtle overflow-hidden', venture.screenshot && 'h-full')}>
                {venture.screenshot && (
                  <div className="relative w-full aspect-[16/10] border-b border-border-subtle overflow-hidden">
                    <div
                      className="absolute inset-x-0 top-0 h-1 z-10"
                      style={{ backgroundColor: stageConfig[venture.stage].hex }}
                    />
                    <Image
                      src={venture.screenshot}
                      alt={`${venture.name} screenshot`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <CardContent className={cn('space-y-4', venture.screenshot ? 'pt-4 h-full flex flex-col' : 'pt-6')}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link href={`/ventures/${venture.slug}`} className="text-lg font-semibold hover:text-accent-green transition-colors">
                        {venture.name}
                      </Link>
                      <p className="text-sm text-text-muted">{venture.domain}</p>
                    </div>
                    <Badge variant="outline" className="border-border-subtle text-text-muted shrink-0">
                      {venture.stage}
                    </Badge>
                  </div>

                  <p className="text-sm text-text-muted leading-relaxed">{venture.description}</p>
                  {venture.icp && <p className="text-xs text-text-muted"><span className="text-foreground font-medium">ICP:</span> {venture.icp}</p>}
                  {venture.monetization && <p className="text-xs text-text-muted"><span className="text-foreground font-medium">Monetization:</span> {venture.monetization}</p>}

                  <div className={cn('flex items-center justify-between gap-3 pt-2', venture.screenshot && 'mt-auto')}>
                    <Link href={`/ventures/${venture.slug}`} className="text-sm text-accent-green hover:text-accent-green/80 inline-flex items-center gap-1">
                      View venture <ArrowRight className="w-4 h-4" />
                    </Link>
                    {venture.url && (
                      <a href={venture.url} target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted hover:text-foreground inline-flex items-center gap-1">
                        Live <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ResultsSoFar() {
  const results = [
    { metric: 'Ventures in the pipeline', value: `${ventures.length}`, detail: 'Live, in build, or in validation — each with its own domain, repo, and AI operator' },
    { metric: 'Time from idea to live MVP', value: '1–3 days', detail: 'Not weeks. Not months. Days — including deploy and SEO basics' },
    { metric: 'Business archetypes covered', value: '6', detail: 'SaaS, SEO/affiliate, services, marketplaces, consumer apps, infrastructure' },
    { metric: 'Total human employees', value: '0', detail: 'One founder sets direction. AI agents handle everything else.' },
    { metric: 'Stages in the methodology', value: '3', detail: 'Amble → Sprint → Sail — every venture moves through the same stage gates' },
    { metric: 'Stack shared across ventures', value: '1', detail: 'Same Sprinter Platform foundation reused venture to venture, not rebuilt from zero' },
  ]

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <Reveal className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Results So Far</h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            We don&apos;t hide behind &ldquo;stealth mode.&rdquo; Here&apos;s what the factory has actually produced — built in the open, every step logged.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((item, i) => (
            <Reveal
              key={item.metric}
              delay={i * 0.08}
              y={15}
              className="bg-surface border border-border-subtle rounded-lg p-5 space-y-1.5"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold font-mono text-accent-green">{item.value}</span>
                <span className="text-sm font-medium text-foreground">{item.metric}</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">{item.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function PlaybookCTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <Reveal className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            The playbook is open source.
          </h2>
          <p className="text-text-muted max-w-lg mx-auto">
            Amble → Sprint → Sail. The exact methodology we use to go from raw idea to deployed, in-market product in days — not months.
          </p>
          <Link href="/playbook" className={cn(buttonVariants({ size: 'lg' }), 'bg-accent-green text-background hover:bg-accent-green/90 font-semibold inline-flex items-center gap-2')}>
            Read the Playbook <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

function FollowTheBuild() {
  return (
    <section className="py-24 px-6 bg-surface/50">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <Reveal className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Follow the Build
          </h2>
          <p className="text-text-muted max-w-lg mx-auto">
            This is a live experiment. New ventures launch regularly. Failures are documented publicly.
            Follow along as we prove (or disprove) whether one founder + AI agents can build
            a growing constellation of vertical software businesses.
          </p>
        </Reveal>

        <Reveal
          delay={0.15}
          y={15}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="https://github.com/tylerdr/sprinter-studio"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: 'lg', variant: 'outline' }), 'border-border-subtle hover:bg-surface inline-flex items-center gap-2')}
          >
            <Github className="w-5 h-5" /> Star on GitHub
          </a>
        </Reveal>

        <Reveal as="p" delay={0.3} y={0} className="text-xs text-text-muted">
          Every commit, every launch, every kill decision — all in public.
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border-subtle py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-accent-green" />
          <span className="font-semibold">sprinter.studio</span>
          <span className="text-text-muted text-sm ml-2">Built by Sprinter Studio</span>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-muted">
          <Link href="#pipeline" className="hover:text-foreground transition-colors">Pipeline</Link>
          <Link href="/playbook" className="hover:text-foreground transition-colors">Playbook</Link>
          <a href="https://sprinter.ai" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Sprinter AI</a>
          <a href="https://sprinterconsulting.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Consulting</a>
          <a href="https://amble.so" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Amble</a>
          <a href="https://github.com/tylerdr/sprinter-studio" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1">
            <Github className="w-4 h-4" /> GitHub
          </a>
        </nav>
      </div>
    </footer>
  )
}

const faqItems = [
  {
    question: 'What is an AI venture studio?',
    answer:
      'An AI venture studio uses autonomous AI agents to build, launch, and operate multiple software businesses simultaneously. Instead of hiring teams for each product, AI agents handle coding, content, SEO, outreach, and operations 24/7 — letting a single founder run dozens of ventures at once.',
  },
  {
    question: 'How does the Amble → Sprint → Sail methodology work?',
    answer:
      'Amble is the ideation phase: exploring ideas, scoring them, and validating demand before writing any code. Sprint is focused build: shipping an MVP in days using AI agents. Sail is growth: deploying distribution playbooks (SEO, outreach, content) to drive revenue. Ventures only advance through stage gates with real data.',
  },
  {
    question: 'How many ventures does Sprinter Studio run?',
    answer:
      'The public pipeline tracks every venture across six archetypes: SEO/affiliate sites, productized services, SaaS tools, marketplaces, consumer apps, and infrastructure products. New ventures enter the pipeline regularly as the factory accelerates.',
  },
  {
    question: 'Can I use the Sprinter Studio playbook for my own projects?',
    answer:
      'Yes. The playbook is published openly. It covers the full methodology — from idea scoring and ICP definition through MVP deployment and growth loops. Read it at /playbook.',
  },
]

function BuiltBySection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Reveal className="bg-surface border border-border-subtle rounded-xl p-8 md:p-10 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent-green/10 flex items-center justify-center text-accent-green text-xl font-bold shrink-0">
              T
            </div>
            <div>
              <h3 className="text-lg font-semibold">Tyler Dreher</h3>
              <p className="text-sm text-text-muted">Founder &amp; Sole Operator</p>
            </div>
          </div>
          <p className="text-sm text-text-muted leading-relaxed">
            I&apos;ve always been a builder. I trained as a mechanical engineer (Auburn), worked on
            machinery at ExxonMobil, and ran a construction company on the side — and at every one of
            them, the software the work actually needed didn&apos;t exist. So I taught myself to build
            it, and I never stopped.
          </p>
          <p className="text-sm text-text-muted leading-relaxed">
            When I saw how much faster I could build with AI, the question got bigger:{' '}
            <span className="text-foreground font-medium">what if you ran a venture studio like a
            factory — and staffed the floor with AI agents instead of people?</span> Sprinter Studio
            is the experiment. I set direction, make the hard calls, and let the system compound —
            building toward a growing constellation of vertical software businesses that get better
            every week.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a
              href="https://github.com/tylerdr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href="https://github.com/tylerdr/sprinter-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> View source
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function FAQSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto space-y-10">
        <Reveal className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
          <p className="text-text-muted">
            How the factory works — in plain language.
          </p>
        </Reveal>

        <div className="space-y-6">
          {faqItems.map((item, i) => (
            <Reveal key={i} delay={i * 0.08} y={15}>
              <Card className="bg-surface border-border-subtle">
                <CardContent className="pt-6 space-y-2">
                  <h3 className="text-lg font-semibold">{item.question}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{item.answer}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqItems.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ByTheNumbers />
      <Separator className="bg-border-subtle" />
      <WhyAIAgents />
      <Separator className="bg-border-subtle" />
      <HowWeBuild />
      <Separator className="bg-border-subtle" />
      <PipelineSection />
      <Separator className="bg-border-subtle" />
      <VenturePortfolio />
      <Separator className="bg-border-subtle" />
      <ResultsSoFar />
      <Separator className="bg-border-subtle" />
      <PlaybookCTA />
      <Separator className="bg-border-subtle" />
      <BuiltBySection />
      <Separator className="bg-border-subtle" />
      <FollowTheBuild />
      <Separator className="bg-border-subtle" />
      <FAQSection />
      <Footer />
    </main>
  )
}
