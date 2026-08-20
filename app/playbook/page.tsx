import { PlaybookDiagram, PhaseGlyph } from '@/app/components/PlaybookDiagram'
import { stageConfig } from '@/app/data/ventures'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ArrowRight, Check, CircleStop, RotateCcw, ShieldCheck } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Amble → Sprint → Sail Playbook',
  description:
    'The evidence-gated method Sprinter Studio uses to question, test, ship, continue, pause, or stop AI product experiments while keeping humans accountable.',
  alternates: { canonical: '/playbook' },
}

function Section({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return <section className={`py-16 ${className}`}>{children}</section>
}

const principles = [
  {
    title: 'A stage is a confidence label.',
    body: 'Amble, Sprint, and Sail describe what has been learned and what decision is next. They are not badges of company maturity.',
  },
  {
    title: 'The smallest useful test wins.',
    body: 'The purpose of a Sprint is to answer a consequential question with the least code, capital, and attention required — not to make the demo look complete.',
  },
  {
    title: 'Humans remain accountable.',
    body: 'AI agents can research, draft, code, test, monitor, and operate bounded tasks. People own safety, product judgment, customer relationships, and consequential decisions.',
  },
  {
    title: 'Stopping is a valid output.',
    body: 'A fast, well-instrumented invalidation is more valuable than keeping a weak property alive to inflate the portfolio.',
  },
]

const ambleGate = [
  'A named user and painful job, not a broad market category',
  'Direct access to people who experience or buy around the problem',
  'A credible distribution path that does not depend on generic virality',
  'A falsifiable value and monetization hypothesis',
  'A bounded test that can answer the next question without a full product',
  'An explicit reason the experiment deserves attention over current commitments',
]

const sprintGate = [
  'One primary question and explicit acceptance criteria',
  'A real workflow, test user, or buyer rather than synthetic feedback alone',
  'Instrumentation for usage, errors, quality, and the intended value signal',
  'Security, access, data handling, and human-review boundaries defined',
  'An owner for the test and a date for the advance, revise, pause, or stop decision',
  'Evidence that determines the next investment before the build begins',
]

const sailGate = [
  'Repeated use, qualified demand, revenue, strategic reuse, or another explicit reason to continue',
  'A distribution motion with an accountable owner and measurable inputs',
  'Reliability, support, and data risks appropriate to the product’s actual stakes',
  'Economics that justify continued attention, even if the reason is internal leverage rather than SaaS revenue',
  'A resourcing decision based on demand and risk — not an arbitrary MRR vanity threshold',
  'A scheduled review where the work can still be narrowed, paused, archived, or stopped',
]

const decisions = [
  {
    title: 'Advance',
    body: 'The current hypothesis has enough evidence to justify the next bounded investment.',
    icon: ArrowRight,
  },
  {
    title: 'Revise',
    body: 'The problem remains credible, but the audience, workflow, offer, or test must change.',
    icon: RotateCcw,
  },
  {
    title: 'Pause',
    body: 'The opportunity may be real, but timing, access, distribution, capital, or higher-priority work blocks responsible progress.',
    icon: CircleStop,
  },
  {
    title: 'Stop or archive',
    body: 'The evidence does not justify more attention, or the experiment is no longer strategically useful. Record the learning and release the bandwidth.',
    icon: ShieldCheck,
  },
]

export default function PlaybookPage() {
  return (
    <main id="main" className="min-h-screen px-6 pt-28 pb-24 lg:pb-16">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-sm text-text-muted hover:text-foreground transition-colors"
        >
          ← Back to the studio
        </Link>

        <Section>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-chalk-green mb-4">
            § 00 — The playbook
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-medium mb-6 tracking-tight">
            Amble → Sprint → Sail is a decision system.
          </h1>
          <p className="text-lg text-text-muted leading-relaxed">
            AI makes it easier to produce software. That increases the need for
            judgment, constraints, distribution, evidence, and honest stop
            rules. This playbook is how Sprinter Studio turns an idea into the
            next responsible decision.
          </p>
          <p className="text-lg text-text-muted leading-relaxed mt-4">
            Work can advance, move backward, pause, or stop at every stage. The
            method is useful only when the label changes with the evidence.
          </p>
          <div className="mt-12">
            <PlaybookDiagram />
          </div>
        </Section>

        <Separator className="bg-border-subtle" />

        <Section>
          <h2 className="text-2xl md:text-4xl font-display font-medium mb-8">
            The four rules underneath the stages
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {principles.map((principle) => (
              <Card key={principle.title} className="bg-surface border-border-subtle">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm text-text-muted leading-relaxed">
                    {principle.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Separator className="bg-border-subtle" />

        <Section>
          <div className="flex items-center gap-3 mb-6">
            <PhaseGlyph phase="amble" className="w-9 h-9 shrink-0" />
            <div>
              <h2
                className="text-2xl md:text-3xl font-display font-medium"
                style={{ color: stageConfig.amble.hex }}
              >
                Phase 1: Amble
              </h2>
              <p className="text-text-muted">Question before building</p>
            </div>
          </div>

          <div className="space-y-6 text-text-muted leading-relaxed">
            <p>
              Amble is structured exploration. The job is to understand the
              user, workflow, stakes, buyer, alternatives, and path to demand.
              Research can narrow the search, but direct operator and buyer
              access matters more than a polished market-size slide.
            </p>

            <Card className="bg-surface border-border-subtle">
              <CardContent className="pt-6 space-y-3">
                <h3 className="font-semibold text-foreground">Useful activities</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span style={{ color: stageConfig.amble.hex }}>→</span> Observe or map the current workflow and its exceptions
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: stageConfig.amble.hex }}>→</span> Interview users, buyers, partners, and people who tried alternatives
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: stageConfig.amble.hex }}>→</span> Define the value, risk, owner, and distribution hypothesis
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: stageConfig.amble.hex }}>→</span> Test demand with a conversation, service, prototype, or manual concierge flow
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: stageConfig.amble.hex }}>→</span> Write the failure conditions before writing the product scope
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-surface-raised border-border-subtle">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-foreground mb-3">
                  Gate 1: deserves a bounded Sprint
                </h3>
                <ul className="space-y-2 text-sm">
                  {ambleGate.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check
                        className="w-4 h-4 mt-0.5 shrink-0"
                        style={{ color: stageConfig.amble.hex }}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Separator className="bg-border-subtle" />

        <Section>
          <div className="flex items-center gap-3 mb-6">
            <PhaseGlyph phase="sprint" className="w-9 h-9 shrink-0" />
            <div>
              <h2
                className="text-2xl md:text-3xl font-display font-medium"
                style={{ color: stageConfig.sprint.hex }}
              >
                Phase 2: Sprint
              </h2>
              <p className="text-text-muted">Build the smallest credible test</p>
            </div>
          </div>

          <div className="space-y-6 text-text-muted leading-relaxed">
            <p>
              Sprint is focused implementation around one question. AI agents
              can accelerate research, scaffolding, coding, content, tests, and
              operations, but the test still needs a human owner, real users,
              explicit safety boundaries, and evidence that determines what
              happens next.
            </p>

            <Card className="bg-surface border-border-subtle">
              <CardContent className="pt-6 space-y-3">
                <h3 className="font-semibold text-foreground">Useful activities</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span style={{ color: stageConfig.sprint.hex }}>→</span> Define the workflow, inputs, outputs, owner, and human-review points
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: stageConfig.sprint.hex }}>→</span> Build only the path required to test the primary hypothesis
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: stageConfig.sprint.hex }}>→</span> Instrument usage, errors, quality, latency, and value signals
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: stageConfig.sprint.hex }}>→</span> Put the system in front of the intended user or buyer
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: stageConfig.sprint.hex }}>→</span> Record what is still manual, fragile, unsafe, or unproven
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-surface-raised border-border-subtle">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-foreground mb-3">
                  Gate 2: evidence justifies continued operation
                </h3>
                <ul className="space-y-2 text-sm">
                  {sprintGate.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check
                        className="w-4 h-4 mt-0.5 shrink-0"
                        style={{ color: stageConfig.sprint.hex }}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Separator className="bg-border-subtle" />

        <Section>
          <div className="flex items-center gap-3 mb-6">
            <PhaseGlyph phase="sail" className="w-9 h-9 shrink-0" />
            <div>
              <h2
                className="text-2xl md:text-3xl font-display font-medium"
                style={{ color: stageConfig.sail.hex }}
              >
                Phase 3: Sail
              </h2>
              <p className="text-text-muted">Earn continued investment</p>
            </div>
          </div>

          <div className="space-y-6 text-text-muted leading-relaxed">
            <p>
              Sail begins when a property is live and has a reason to continue.
              That reason may be revenue, repeated usage, qualified demand,
              strategic distribution, or reusable internal capability. A live
              URL alone is not enough.
            </p>

            <Card className="bg-surface border-border-subtle">
              <CardContent className="pt-6 space-y-3">
                <h3 className="font-semibold text-foreground">Useful activities</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span style={{ color: stageConfig.sail.hex }}>→</span> Run the most credible distribution channel consistently
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: stageConfig.sail.hex }}>→</span> Improve activation, retention, willingness to pay, and operating reliability
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: stageConfig.sail.hex }}>→</span> Automate bounded work only after the process is understood
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: stageConfig.sail.hex }}>→</span> Track support burden, quality, risk, revenue, and strategic reuse
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: stageConfig.sail.hex }}>→</span> Revisit whether this work still outranks other uses of attention
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-surface-raised border-border-subtle">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-foreground mb-3">
                  Gate 3: responsible continued investment
                </h3>
                <ul className="space-y-2 text-sm">
                  {sailGate.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check
                        className="w-4 h-4 mt-0.5 shrink-0"
                        style={{ color: stageConfig.sail.hex }}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Separator className="bg-border-subtle" />

        <Section>
          <h2 className="text-2xl md:text-4xl font-display font-medium mb-4">
            Every review ends in a decision
          </h2>
          <p className="text-text-muted leading-relaxed max-w-2xl">
            “Keep working on it” is not a decision. Each review names the next
            state, the evidence behind it, the owner, and the next review date.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {decisions.map((decision) => {
              const Icon = decision.icon
              return (
                <Card key={decision.title} className="bg-surface border-border-subtle">
                  <CardContent className="pt-6">
                    <Icon className="w-5 h-5 text-chalk-green" />
                    <h3 className="mt-4 text-lg font-semibold text-foreground">
                      {decision.title}
                    </h3>
                    <p className="mt-2 text-sm text-text-muted leading-relaxed">
                      {decision.body}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Section>

        <Separator className="bg-border-subtle" />

        <Section>
          <h2 className="text-2xl md:text-4xl font-display font-medium mb-6">
            What should compound across experiments
          </h2>
          <div className="space-y-5 text-text-muted leading-relaxed">
            <p>
              The studio should not reuse generic product assumptions. It should
              reuse the expensive, non-differentiating infrastructure and the
              quality patterns learned from real work.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ['Evaluation and quality', 'Test harnesses, human-review patterns, acceptance criteria, observability, and failure analysis.'],
                ['Identity and access', 'Authentication, roles, permissions, audit history, secrets, and least-privilege connector patterns.'],
                ['Data and integrations', 'Reliable connectors, ingestion, structured context, queues, retries, and source provenance.'],
                ['Product operations', 'Analytics, feedback capture, support workflows, release discipline, documentation, and cost visibility.'],
              ].map(([title, body]) => (
                <Card key={title} className="bg-surface border-border-subtle">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                    <p className="text-sm">{body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Section>

        <Separator className="bg-border-subtle" />

        <section className="py-16 text-center space-y-6">
          <h2 className="text-2xl md:text-4xl font-display font-medium">
            Read the method against the actual ledger.
          </h2>
          <p className="text-text-muted max-w-lg mx-auto">
            Every entry should make its current stage, evidence, and open
            questions visible — especially when the next decision is to stop.
          </p>
          <Link
            href="/#pipeline"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'font-semibold inline-flex items-center gap-2',
            )}
          >
            View the experiment ledger <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </main>
  )
}
