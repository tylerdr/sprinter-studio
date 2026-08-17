'use client'

import { Pipeline, VentureList } from '@/app/components/Pipeline'
import { PlaybookDiagram, PhaseGlyph } from '@/app/components/PlaybookDiagram'
import { Reveal } from '@/app/components/Reveal'
import {
  activeVentures,
  archivedVentures,
  getVenturesByTrack,
  stageConfig,
  trackConfig,
} from '@/app/data/ventures'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { outbound } from '@/lib/links'
import { cn } from '@/lib/utils'
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  FlaskConical,
  Github,
  ShieldCheck,
  Workflow,
  XCircle,
  Zap,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const stages = [
  {
    key: 'amble',
    title: 'Amble',
    subtitle: 'Question and validate',
    description:
      'A problem, audience, or distribution hypothesis under investigation. An entry here may never become software.',
  },
  {
    key: 'sprint',
    title: 'Sprint',
    subtitle: 'Build the smallest test',
    description:
      'A bounded implementation intended to answer a specific question. Shipping is not the same as finding demand.',
  },
  {
    key: 'sail',
    title: 'Sail',
    subtitle: 'Earn continued investment',
    description:
      'A live property with enough usage, revenue, strategic value, or reusable learning to justify continued work.',
  },
] as const

const operatingRules = [
  {
    title: 'Client work and validated products come first.',
    body: 'The Studio does not receive unlimited founder attention because an idea is interesting. Experiments must support current client delivery, validated products, reusable capability, qualified demand, or unusually valuable learning.',
    icon: ShieldCheck,
  },
  {
    title: 'AI accelerates the work; humans remain accountable.',
    body: 'Agents can research, draft, code, test, and operate bounded workflows. Product judgment, safety, prioritization, customer relationships, and the decision to ship or stop remain human responsibilities.',
    icon: Workflow,
  },
  {
    title: 'A deployed property is evidence of execution, not a business.',
    body: 'The ledger includes hypotheses, prototypes, tools, services, infrastructure, and live properties. Stage, evidence, and the next decision matter more than the number of entries.',
    icon: FlaskConical,
  },
] as const

const lessons = [
  {
    title: 'Distribution is the gate.',
    body: 'AI makes software cheaper to produce. It does not manufacture trust, access to buyers, or a painful workflow. Experiments without a credible path to demand should stop quickly.',
  },
  {
    title: 'Domain access beats generic cleverness.',
    body: 'The strongest opportunities come from people who understand the exceptions, economics, language, and buying process of real work.',
  },
  {
    title: 'Reuse should compound, not create sameness.',
    body: 'Shared integrations, evaluation patterns, context structures, and operating infrastructure should make future delivery faster while each workflow remains specific to its user.',
  },
  {
    title: 'Stop decisions are part of the output.',
    body: 'A small experiment that invalidates a weak idea is useful. Keeping every property alive to inflate the portfolio would turn the ledger into theater.',
  },
] as const

const routes = [
  {
    eyebrow: 'One executive · $2,500',
    title: 'Turn three recurring executive tasks into reliable AI workflows.',
    body: 'The Executive AI Accelerator is two private 60-minute working sessions over one week using Claude Cowork, ChatGPT, Copilot, Gemini, or another approved tool. No workshop, new platform, or integration project.',
    href: outbound.executiveAccelerator,
    cta: 'See the Executive AI Accelerator',
  },
  {
    eyebrow: 'Five leaders · $10,000',
    title: 'Give five leaders private AI acceleration without organizing a workshop.',
    body: 'Each management-company or operating-company executive schedules individually and works on the responsibilities they actually own. The sponsor receives an aggregate opportunity readout, not employee surveillance.',
    href: outbound.portfolioAccelerator,
    cta: 'See the five-leader portfolio pack',
  },
  {
    eyebrow: 'Implementation-ready workflow',
    title: 'Has real use already revealed a workflow worth setting up or building?',
    body: 'Sprinter Consulting is the execution backend for a named workflow with a real owner, repeated demand, suitable access, clear human-review boundaries, and defensible implementation economics.',
    href: outbound.consulting,
    cta: 'See the execution practice',
  },
] as const

const faqItems = [
  {
    question: 'What is the difference between the two tracks?',
    answer:
      'A partner incubation is a new product Sprinter incubates with a named partner who brings the domain and the demand. An internal experiment is a product Sprinter starts on its own bench, published while it is still unproven. Every entry on this site sits in exactly one track and is labeled with it. No partner incubation is published yet, so everything currently in the ledger is an internal experiment.',
  },
  {
    question: 'Is every ledger entry a company?',
    answer:
      'No. The ledger includes ideas, prototypes, tools, service concepts, content properties, infrastructure, and live products. The displayed track, stage, status, and evidence are the claim; the entry count is not company scale.',
  },
  {
    question: 'Do autonomous agents run these products without people?',
    answer:
      'No. AI agents can perform substantial bounded work, but people choose the problems, approve consequential decisions, review quality, own customer relationships, and decide what receives further investment.',
  },
  {
    question: 'Why publish experiments that may fail?',
    answer:
      'Because the learning can be useful and public status creates discipline. The Studio is more credible when it records weak signals, paused work, blocked monetization, and stop decisions rather than presenting every deployment as a success.',
  },
  {
    question: 'Can Sprinter build a venture with me?',
    answer:
      'Only selectively. The default business is paid executive AI enablement and earned workflow implementation. A venture partnership requires unusual domain access, a clear owner, credible distribution, aligned economics, and a reason the opportunity should outrank existing commitments.',
  },
]

function Hero() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden px-6 pt-24 flex items-center">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/hero-texture.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/45 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,255,136,0.06)_0%,_transparent_70%)]" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center py-20">
        <Reveal immediate duration={0.6} y={28}>
          <p className="text-sm md:text-base font-mono text-accent-green mb-5 tracking-wider uppercase">
            The venture studio of Sprinter · partner incubations · internal
            experiments
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
            <span className="text-accent-green">Two tracks, one bench:</span>{' '}
            products we build with partners, and experiments we run ourselves.
          </h1>
        </Reveal>

        <Reveal
          as="p"
          immediate
          duration={0.6}
          delay={0.18}
          className="mt-7 text-lg md:text-xl text-foreground max-w-3xl mx-auto leading-relaxed"
        >
          Published while unproven — a public record of what we are testing,
          shipping, and stopping.
        </Reveal>

        <Reveal
          as="p"
          immediate
          duration={0.6}
          delay={0.26}
          className="mt-6 text-base md:text-lg text-text-muted max-w-3xl mx-auto leading-relaxed"
        >
          Sprinter Studio incubates products with partners, runs internal
          experiments, and says plainly which track each one is in — including
          the ones that get stopped. Entries range from raw hypotheses to live
          properties. They are not all companies, and shipping one is not proof
          of demand.
        </Reveal>

        <Reveal
          immediate
          duration={0.6}
          delay={0.34}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="#pipeline"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'bg-accent-green text-background hover:bg-accent-green/90 font-semibold',
            )}
          >
            Read the experiment ledger
          </Link>
          <Link
            href="/playbook"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'border-border-subtle hover:bg-surface',
            )}
          >
            Read the build method
          </Link>
        </Reveal>

        <Reveal
          immediate
          duration={0.6}
          delay={0.5}
          y={0}
          className="mt-8 mx-auto max-w-3xl border border-border-subtle bg-surface/70 px-5 py-4 text-left"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-accent-green">
            Current operating rule
          </p>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            Executive enablement, cash-flowing client work, and validated product
            obligations come first. Studio work earns attention only when it
            supports those priorities or answers an unusually valuable question
            cheaply.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function WhatThisIs() {
  return (
    <section className="py-20 px-6 bg-surface/45">
      <div className="max-w-6xl mx-auto">
        <Reveal className="grid gap-6 md:grid-cols-2">
          <div className="border border-accent-green/25 bg-background p-7 md:p-9">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent-green" />
              <h2 className="text-xl font-semibold">What this is</h2>
            </div>
            <p className="mt-5 text-text-muted leading-relaxed">
              A venture studio working in the open, in two labeled tracks:
              products incubated with partners, and experiments run on
              Sprinter&apos;s own bench — with the evidence used to decide what
              advances.
            </p>
          </div>
          <div className="border border-border-subtle bg-background p-7 md:p-9">
            <div className="flex items-center gap-3">
              <XCircle className="w-5 h-5 text-text-muted" />
              <h2 className="text-xl font-semibold">What this is not</h2>
            </div>
            <p className="mt-5 text-text-muted leading-relaxed">
              Another commercial offer, a claim that Sprinter operates dozens of
              mature companies, a substitute for customer proof, or permission
              to keep every idea alive.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function OperatingRules() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-accent-green">
            The constraints
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
            The Studio is useful only when it makes Sprinter more focused.
          </h2>
          <p className="mt-5 text-lg text-text-muted leading-relaxed">
            Cheap software production can create an expensive attention problem.
            These rules keep experimentation subordinate to the commercial
            business and real customer obligations.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {operatingRules.map((rule, index) => {
            const Icon = rule.icon
            return (
              <Reveal key={rule.title} delay={index * 0.08}>
                <Card className="h-full bg-surface border-border-subtle">
                  <CardContent className="pt-7 space-y-4">
                    <Icon className="w-6 h-6 text-accent-green" />
                    <h3 className="text-xl font-semibold leading-snug">
                      {rule.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {rule.body}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function TrackHeading({
  track,
  count,
}: {
  track: 'partner' | 'internal'
  count: number
}) {
  const config = trackConfig[track]
  return (
    <div className="max-w-3xl">
      <div className="flex flex-wrap items-baseline gap-3">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {config.plural}
        </h3>
        <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
          {count} {count === 1 ? 'entry' : 'entries'}
        </span>
      </div>
      <p className="mt-3 text-text-muted leading-relaxed">{config.definition}</p>
    </div>
  )
}

function Method() {
  return (
    <section className="py-24 px-6 bg-surface/35">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center max-w-3xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-widest text-accent-green">
            How to read the stages
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
            A stage is a confidence label, not a trophy.
          </h2>
          <p className="mt-5 text-text-muted leading-relaxed">
            Amble → Sprint → Sail is a decision framework. Work can move
            forward, move backward, pause, or stop as new evidence appears.
          </p>
        </Reveal>

        <Reveal y={0} className="mt-12">
          <PlaybookDiagram variant="compact" />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {stages.map((stage, index) => {
            const config = stageConfig[stage.key]
            return (
              <Reveal key={stage.key} delay={index * 0.1}>
                <Card className="bg-background border-border-subtle h-full">
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <PhaseGlyph phase={stage.key} className="w-8 h-8 shrink-0" />
                      <div>
                        <h3
                          className="text-xl font-semibold"
                          style={{ color: config.hex }}
                        >
                          {stage.title}
                        </h3>
                        <p className="text-sm text-text-muted">
                          {stage.subtitle}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {stage.description}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function PipelineSection() {
  const partnerVentures = getVenturesByTrack('partner').filter(
    (venture) => venture.stage !== 'archived',
  )
  const internalVentures = activeVentures.filter(
    (venture) => venture.track === 'internal',
  )

  return (
    <section id="pipeline" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-3xl mb-14">
          <p className="font-mono text-xs uppercase tracking-widest text-accent-green">
            Experiment ledger
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
            Current entries, with their track, stage, and status.
          </h2>
          <p className="mt-5 text-text-muted leading-relaxed">
            Inclusion means the work is recorded, not endorsed. Open an entry to
            see the audience, monetization hypothesis, current signal, and what
            remains unproven.
          </p>
        </Reveal>

        <Reveal id="partner-incubations" className="scroll-mt-24">
          <TrackHeading track="partner" count={partnerVentures.length} />
          {partnerVentures.length === 0 ? (
            <p className="mt-6 border border-border-subtle bg-surface/70 px-5 py-4 text-sm leading-relaxed text-text-muted">
              No partner incubation is published yet. When one is, it appears
              here with the partner named. Nothing below is a partner product.
            </p>
          ) : (
            <div className="mt-6">
              <VentureList ventures={partnerVentures} />
            </div>
          )}
        </Reveal>

        <Reveal
          id="internal-experiments"
          className="mt-16 scroll-mt-24"
          y={0}
        >
          <TrackHeading track="internal" count={internalVentures.length} />
        </Reveal>

        <div className="mt-8">
          <Pipeline />
        </div>

        {archivedVentures.length > 0 && (
          <Reveal className="mt-16" y={0}>
            <div className="max-w-3xl">
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Stopped and archived
              </h3>
              <p className="mt-3 text-text-muted leading-relaxed">
                Recorded decisions that are no longer an active commercial path.
                The learning stays public.
              </p>
            </div>
            <div className="mt-6 grid gap-2 md:grid-cols-3">
              <VentureList ventures={archivedVentures} />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

function Lessons() {
  return (
    <section className="py-24 px-6 bg-surface/40">
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-accent-green">
            What the work keeps teaching us
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
            The useful output is the pattern, not the property count.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-px border border-border-subtle bg-border-subtle md:grid-cols-2">
          {lessons.map((lesson, index) => (
            <Reveal key={lesson.title} delay={index * 0.06}>
              <article className="h-full bg-background p-7 md:p-9">
                <p className="font-mono text-xs text-accent-green">
                  0{index + 1}
                </p>
                <h3 className="mt-4 text-2xl font-semibold">
                  {lesson.title}
                </h3>
                <p className="mt-4 text-text-muted leading-relaxed">
                  {lesson.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CommercialRoutes() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center max-w-3xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-widest text-accent-green">
            Looking for Sprinter, not the studio?
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
            Start with one executive, not a transformation program.
          </h2>
          <p className="mt-5 text-text-muted leading-relaxed">
            The Studio makes the build method visible. Sprinter is where that
            capability is applied to real executive work and implementation-ready
            workflows.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {routes.map((route, index) => (
            <Reveal key={route.href} delay={index * 0.08}>
              <Card className="h-full bg-surface border-border-subtle">
                <CardContent className="flex h-full flex-col pt-7">
                  <p className="font-mono text-xs uppercase tracking-widest text-accent-green">
                    {route.eyebrow}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold leading-snug">
                    {route.title}
                  </h3>
                  <p className="mt-4 text-sm text-text-muted leading-relaxed">
                    {route.body}
                  </p>
                  <a
                    href={route.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto pt-7 text-sm text-accent-green hover:text-accent-green/80 inline-flex items-center gap-1.5"
                  >
                    {route.cta}
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function BuiltBySection() {
  return (
    <section className="py-24 px-6 bg-surface/40">
      <div className="max-w-3xl mx-auto">
        <Reveal className="border border-border-subtle bg-background p-8 md:p-10 space-y-5">
          <p className="font-mono text-xs uppercase tracking-widest text-accent-green">
            The accountable human
          </p>
          <h2 className="text-3xl font-bold">Built under Tyler Dreher&apos;s direction.</h2>
          <p className="text-text-muted leading-relaxed">
            Tyler is a mechanical engineer turned software founder. Studio makes
            the evolving build system visible: the hypotheses, automation,
            product judgment, and decisions to continue or stop. AI expands the
            amount of work the system can do; it does not replace responsibility
            for the result.
          </p>
          <div className="flex flex-wrap items-center gap-5 pt-2">
            <a
              href={outbound.tyler}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent-green hover:text-accent-green/80 inline-flex items-center gap-1.5"
            >
              About Tyler <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href={outbound.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted hover:text-foreground inline-flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" /> View source
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
      <div className="max-w-3xl mx-auto">
        <Reveal className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
        </Reveal>

        <div className="mt-10 border-t border-border-subtle">
          {faqItems.map((item) => (
            <details key={item.question} className="group border-b border-border-subtle py-5">
              <summary className="cursor-pointer list-none flex items-start justify-between gap-5 text-lg font-semibold">
                {item.question}
                <span className="text-accent-green group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="pt-4 pb-2 text-text-muted leading-relaxed">
                {item.answer}
              </p>
            </details>
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
            }).replace(/</g, '\\u003c'),
          }}
        />
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="py-24 px-6 border-t border-border-subtle">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <Zap className="w-8 h-8 text-accent-green mx-auto" />
          <h2 className="mt-5 text-3xl md:text-5xl font-bold tracking-tight">
            Follow the experiments. Start with one executive and real work.
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-text-muted leading-relaxed">
            The commercial front door is the $2,500 Executive AI Accelerator:
            two private 60-minute calls and three repeatable Claude or ChatGPT
            workflows. Deeper setup or implementation comes only after real use
            earns it.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={outbound.executiveAccelerator}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-accent-green text-background hover:bg-accent-green/90 font-semibold inline-flex items-center gap-2',
              )}
            >
              Executive AI Accelerator — $2,500
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={outbound.portfolioAccelerator}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'border-border-subtle hover:bg-surface inline-flex items-center gap-2',
              )}
            >
              Five-leader portfolio pack — $10,000
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <a
            href={outbound.consulting}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex text-sm text-text-muted hover:text-foreground"
          >
            Have an implementation-ready workflow? Sprinter Consulting builds it.
          </a>
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
          <span className="text-text-muted text-sm ml-2">
            The venture studio of Sprinter
          </span>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-muted">
          <Link href="#pipeline" className="hover:text-foreground transition-colors">
            Experiment ledger
          </Link>
          <Link href="/playbook" className="hover:text-foreground transition-colors">
            Playbook
          </Link>
          <a
            href={outbound.executiveAccelerator}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Executive AI Accelerator
          </a>
          <a
            href={outbound.portfolioAccelerator}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Portfolio accelerator
          </a>
          <a
            href={outbound.consulting}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Sprinter Consulting — the execution practice of Sprinter
          </a>
          <a
            href={outbound.amble}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Amble — the company brain
          </a>
          <a
            href={outbound.tyler}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Founded by Tyler Dreher
          </a>
          <a
            href={outbound.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors flex items-center gap-1"
          >
            <Github className="w-4 h-4" /> GitHub
          </a>
        </nav>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <main id="main" className="min-h-screen">
      <Hero />
      <WhatThisIs />
      <Separator className="bg-border-subtle" />
      <OperatingRules />
      <Separator className="bg-border-subtle" />
      <Method />
      <Separator className="bg-border-subtle" />
      <PipelineSection />
      <Separator className="bg-border-subtle" />
      <Lessons />
      <Separator className="bg-border-subtle" />
      <CommercialRoutes />
      <Separator className="bg-border-subtle" />
      <BuiltBySection />
      <Separator className="bg-border-subtle" />
      <FAQSection />
      <FinalCta />
      <Footer />
    </main>
  )
}
