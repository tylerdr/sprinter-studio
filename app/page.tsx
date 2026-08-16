'use client'

import { Pipeline } from '@/app/components/Pipeline'
import { PlaybookDiagram, PhaseGlyph } from '@/app/components/PlaybookDiagram'
import { Reveal } from '@/app/components/Reveal'
import { stageConfig } from '@/app/data/ventures'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
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
    body: 'The studio does not get unlimited founder attention because an idea is interesting. Experiments must fit around the work customers already trust Sprinter to deliver.',
    icon: ShieldCheck,
  },
  {
    title: 'AI accelerates the work; humans remain accountable.',
    body: 'Agents can research, draft, code, test, and operate bounded workflows. Product judgment, safety, prioritization, and the decision to ship or stop remain human responsibilities.',
    icon: Workflow,
  },
  {
    title: 'A deployed site is evidence of execution, not a business.',
    body: 'The pipeline deliberately includes sketches, prototypes, tools, services, and live properties. Stage and status matter more than the number of entries.',
    icon: FlaskConical,
  },
] as const

const lessons = [
  {
    title: 'Distribution is the gate.',
    body: 'AI makes software cheaper to produce. It does not make attention, trust, access to buyers, or a painful workflow appear. Experiments without a credible path to demand should stop quickly.',
  },
  {
    title: 'Domain access beats generic cleverness.',
    body: 'The strongest product opportunities come from operators who know the exceptions, economics, language, and buying process of a real industry — not from another horizontal AI wrapper.',
  },
  {
    title: 'Reuse should compound, not sameness.',
    body: 'Shared components, integrations, evaluation patterns, and operating infrastructure should make each build faster. The product still has to reflect the specific workflow and user.',
  },
  {
    title: 'Kill decisions are part of the output.',
    body: 'A small experiment that invalidates a weak idea is useful. Keeping every property alive to inflate the portfolio would turn the build log into theater.',
  },
] as const

const routes = [
  {
    eyebrow: 'Multi-company owner',
    title: 'Need an AI operating partner across a portfolio?',
    body: 'Sprinter AI works with family offices, PE firms, holding companies, and their operators to create portfolio context, prioritize opportunities, and move the right work into use.',
    href: 'https://sprinter.ai',
    cta: 'See the portfolio offer',
  },
  {
    eyebrow: 'Operating company',
    title: 'Have one workflow that needs to be fixed?',
    body: 'Sprinter Consulting audits the workflow, builds the system, and stays through adoption for established non-tech businesses.',
    href: 'https://sprinterconsulting.com',
    cta: 'See the execution practice',
  },
  {
    eyebrow: 'Builder or collaborator',
    title: 'Interested in the method and the code?',
    body: 'Read the public playbook, inspect the repository, and follow the experiments as their status changes — including the ones that stop.',
    href: 'https://github.com/tylerdr/sprinter-studio',
    cta: 'Open the repository',
  },
] as const

const faqItems = [
  {
    question: 'Is every pipeline entry a company?',
    answer:
      'No. The pipeline is an experiment ledger. It includes ideas, prototypes, tools, service concepts, content properties, infrastructure, and live products. The displayed stage and status are the claim; the entry count is not a valuation or operating-company count.',
  },
  {
    question: 'Do autonomous agents run the ventures without people?',
    answer:
      'No. AI agents can perform substantial bounded work, but people choose the problems, approve consequential decisions, review quality, own customer relationships, and decide what receives further investment. The studio explores higher-leverage operating models without pretending accountability disappeared.',
  },
  {
    question: 'Why publish experiments that may fail?',
    answer:
      'Because the learning is useful and public status creates discipline. The studio is more credible when it records weak signals, blocked monetization, paused work, and kill decisions rather than presenting every deployment as a success.',
  },
  {
    question: 'Can Sprinter build a venture with me?',
    answer:
      'Only selectively. The default business is cash-paid AI operating-partner and implementation work. A venture partnership requires unusual domain access, a clear owner, credible distribution, aligned economics, and a reason the opportunity should outrank existing commitments.',
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
            Sprinter R&amp;D · public build log
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
            A public record of what we are testing, shipping, and{' '}
            <span className="text-accent-green">stopping.</span>
          </h1>
        </Reveal>

        <Reveal
          as="p"
          immediate
          duration={0.6}
          delay={0.18}
          className="mt-8 text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed"
        >
          Sprinter Studio documents experiments in agent-assisted product
          development. Entries range from raw hypotheses to live properties.
          They are not all companies, and shipping one is not proof of demand.
          The point is to learn quickly, tell the truth about status, and reuse
          what survives in Sprinter&apos;s client work and validated products.
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
            Client delivery and validated products come first. A studio
            experiment earns more attention only through reusable learning,
            qualified demand, strategic leverage, or revenue.
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
              A transparent R&amp;D surface: hypotheses, prototypes, live
              properties, operating notes, reusable infrastructure, and the
              evidence used to decide what advances.
            </p>
          </div>
          <div className="border border-border-subtle bg-background p-7 md:p-9">
            <div className="flex items-center gap-3">
              <XCircle className="w-5 h-5 text-text-muted" />
              <h2 className="text-xl font-semibold">What this is not</h2>
            </div>
            <p className="mt-5 text-text-muted leading-relaxed">
              A claim that Sprinter operates dozens of mature companies, a
              substitute for customer proof, or an invitation to fund every
              idea. Volume is not the thesis. Better judgment and reusable
              capability are.
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
            The studio is useful only when it makes Sprinter more focused.
          </h2>
          <p className="mt-5 text-lg text-text-muted leading-relaxed">
            Cheap software production can create an expensive attention
            problem. These rules keep experimentation from becoming the
            business strategy.
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
  return (
    <section id="pipeline" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-3xl mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-accent-green">
            Experiment ledger
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
            Current entries, with their actual stage and status.
          </h2>
          <p className="mt-5 text-text-muted leading-relaxed">
            Inclusion means the experiment is recorded, not endorsed. Open an
            entry to see the audience, monetization hypothesis, current signal,
            and public site where one exists.
          </p>
        </Reveal>

        <Pipeline />
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
            Looking for Sprinter, not the lab?
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
            Go to the surface built for the decision you need to make.
          </h2>
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
            Tyler is a mechanical engineer turned software founder. Sprinter
            Studio is where he makes the evolving build system visible: the
            hypotheses, the automation, the product judgment, and the decision
            to keep or stop. AI expands the amount of work the system can do;
            it does not replace responsibility for the result.
          </p>
          <div className="flex flex-wrap items-center gap-5 pt-2">
            <a
              href="https://tylerdreher.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent-green hover:text-accent-green/80 inline-flex items-center gap-1.5"
            >
              About Tyler <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/tylerdr/sprinter-studio"
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
            Follow the experiments. Hire the focused operating company.
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-text-muted leading-relaxed">
            The studio makes the learning visible. Sprinter AI and Sprinter
            Consulting are where that capability is applied to real operating
            priorities.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://sprinter.ai"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-accent-green text-background hover:bg-accent-green/90 font-semibold inline-flex items-center gap-2',
              )}
            >
              Portfolio AI operating partner <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://sprinterconsulting.com"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'border-border-subtle hover:bg-surface inline-flex items-center gap-2',
              )}
            >
              Operating-company execution <ArrowRight className="w-4 h-4" />
            </a>
          </div>
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
          <span className="text-text-muted text-sm ml-2">Public build log</span>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-muted">
          <Link href="#pipeline" className="hover:text-foreground transition-colors">
            Experiment ledger
          </Link>
          <Link href="/playbook" className="hover:text-foreground transition-colors">
            Playbook
          </Link>
          <a
            href="https://sprinter.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Sprinter AI
          </a>
          <a
            href="https://sprinterconsulting.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Consulting
          </a>
          <a
            href="https://ambleideation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Amble
          </a>
          <a
            href="https://github.com/tylerdr/sprinter-studio"
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
    <main className="min-h-screen">
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
