import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import { PlaybookDiagram, PhaseGlyph } from '@/app/components/PlaybookDiagram'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Playbook',
  description: 'The Amble → Sprint → Sail methodology — how we validate, build, and evaluate software products.',
  alternates: { canonical: '/playbook' },
  openGraph: {
    title: 'The Playbook | Sprinter Studio',
    description: 'The Amble → Sprint → Sail methodology — how we validate, build, and evaluate software products.',
    url: 'https://sprinter.studio/playbook',
    type: 'website',
  },
}

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <section className={`py-16 ${className}`}>{children}</section>
}

export default function PlaybookPage() {
  return (
    <main id="main-content" className="min-h-screen pt-32 pb-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm text-text-muted hover:text-foreground transition-colors">
          ← Back to Home
        </Link>

        <Section>
          <Badge variant="outline" className="border-accent-green/40 text-accent-green mb-4">
            The Playbook
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">The Anti-Hustle Thesis</h1>
          <p className="text-lg text-text-muted leading-relaxed">
            Most founders go all-in on one idea and burn out betting everything on a single outcome. We
            build fewer, more deliberate wedges — with AI as leverage, not a replacement for judgment.
          </p>
          <p className="text-lg text-text-muted leading-relaxed mt-4">
            This is the Amble → Sprint → Sail methodology: a repeatable framework for validating, building,
            and evaluating software products honestly — including when to stop.
          </p>
          <div className="mt-12">
            <PlaybookDiagram />
          </div>
        </Section>

        <Separator className="bg-border-subtle" />

        <Section>
          <div className="flex items-center gap-3 mb-6">
            <PhaseGlyph phase="amble" className="w-9 h-9 shrink-0" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#ff6600' }}>Phase 1: Amble</h2>
              <p className="text-text-muted">Ideate & Validate</p>
            </div>
          </div>

          <div className="space-y-6 text-text-muted leading-relaxed">
            <p>
              Amble is divergent thinking. Walk slowly, observe widely, collect ideas without judgment.
              The name is intentional — you&apos;re not sprinting yet. You&apos;re exploring the landscape of opportunity.
            </p>

            <Card className="bg-surface border-border-subtle">
              <CardContent className="pt-6 space-y-3">
                <h3 className="font-semibold text-foreground">Activities</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><span style={{ color: '#ff6600' }}>→</span> Idea scoring against a standardized rubric</li>
                  <li className="flex items-start gap-2"><span style={{ color: '#ff6600' }}>→</span> ICP (Ideal Customer Profile) definition</li>
                  <li className="flex items-start gap-2"><span style={{ color: '#ff6600' }}>→</span> Competitive landscape mapping</li>
                  <li className="flex items-start gap-2"><span style={{ color: '#ff6600' }}>→</span> Demand validation (search volume, community signals, pain indicators)</li>
                  <li className="flex items-start gap-2"><span style={{ color: '#ff6600' }}>→</span> Revenue model hypothesis</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-surface-raised border-border-subtle">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-foreground mb-3">Gate 1: Build-Ready Checklist</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#ff6600' }} aria-hidden="true" /> Clear ICP with validated pain point</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#ff6600' }} aria-hidden="true" /> Revenue model defined (how it makes money day 1)</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#ff6600' }} aria-hidden="true" /> Competitive advantage articulated</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#ff6600' }} aria-hidden="true" /> MVP scope defined (what ships in the first sprint)</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#ff6600' }} aria-hidden="true" /> Domain secured</li>
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
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#0066ff' }}>Phase 2: Sprint</h2>
              <p className="text-text-muted">Build & Deploy</p>
            </div>
          </div>

          <div className="space-y-6 text-text-muted leading-relaxed">
            <p>
              Sprint is focused execution. The idea has passed validation — now build it. AI accelerates
              scaffolding, coding, and content; architecture, scope, and acceptance decisions stay human.
            </p>

            <Card className="bg-surface border-border-subtle">
              <CardContent className="pt-6 space-y-3">
                <h3 className="font-semibold text-foreground">Activities</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><span style={{ color: '#0066ff' }}>→</span> Project scaffolding (AI-assisted)</li>
                  <li className="flex items-start gap-2"><span style={{ color: '#0066ff' }}>→</span> Feature build in priority order</li>
                  <li className="flex items-start gap-2"><span style={{ color: '#0066ff' }}>→</span> SEO foundation + content strategy</li>
                  <li className="flex items-start gap-2"><span style={{ color: '#0066ff' }}>→</span> Testing and QA</li>
                  <li className="flex items-start gap-2"><span style={{ color: '#0066ff' }}>→</span> Deployment to production</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-surface-raised border-border-subtle">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-foreground mb-3">Gate 2: Launch Checklist</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#0066ff' }} aria-hidden="true" /> Core features functional and tested</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#0066ff' }} aria-hidden="true" /> Landing page with clear value proposition</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#0066ff' }} aria-hidden="true" /> Payment integration (if applicable)</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#0066ff' }} aria-hidden="true" /> Analytics and monitoring in place</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#0066ff' }} aria-hidden="true" /> SEO basics configured</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#0066ff' }} aria-hidden="true" /> Deployed to production domain</li>
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
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#00ff88' }}>Phase 3: Sail</h2>
              <p className="text-text-muted">Grow & Scale</p>
            </div>
          </div>

          <div className="space-y-6 text-text-muted leading-relaxed">
            <p>
              Sail is where a product earns its keep. It&apos;s live — now find distribution, build growth
              loops, and track revenue evidence honestly rather than assuming it.
            </p>

            <Card className="bg-surface border-border-subtle">
              <CardContent className="pt-6 space-y-3">
                <h3 className="font-semibold text-foreground">Activities</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><span style={{ color: '#00ff88' }}>→</span> Distribution channel activation (SEO, content, partnerships)</li>
                  <li className="flex items-start gap-2"><span style={{ color: '#00ff88' }}>→</span> Growth loop design and implementation</li>
                  <li className="flex items-start gap-2"><span style={{ color: '#00ff88' }}>→</span> Revenue optimization and pricing experiments</li>
                  <li className="flex items-start gap-2"><span style={{ color: '#00ff88' }}>→</span> Operational support, with AI handling routine work under human review</li>
                  <li className="flex items-start gap-2"><span style={{ color: '#00ff88' }}>→</span> Metrics tracking and iteration</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Separator className="bg-border-subtle" />

        <Section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">The Constellation Model</h2>
          <div className="space-y-6 text-text-muted leading-relaxed">
            <p>
              Traditional founders go all-in on one bet. We aim to build a constellation instead — a small
              set of products that share infrastructure and lessons learned. Each one is evaluated on its
              own evidence, not on the size of the portfolio.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-surface border-border-subtle">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-2">Own & Operate Deliberately</h3>
                  <p className="text-sm">No exit-driven timelines. Build sustainably and let evidence, not urgency, set the pace.</p>
                </CardContent>
              </Card>
              <Card className="bg-surface border-border-subtle">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-2">AI as Leverage</h3>
                  <p className="text-sm">AI accelerates execution. Judgment, approval, and accountability stay with a person.</p>
                </CardContent>
              </Card>
              <Card className="bg-surface border-border-subtle">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-2">Team Growth Is Evidence-Gated</h3>
                  <p className="text-sm">Hiring or expanding capacity happens when evidence justifies it — not on a fixed schedule.</p>
                </CardContent>
              </Card>
              <Card className="bg-surface border-border-subtle">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-2">Shared Infrastructure</h3>
                  <p className="text-sm">Common tooling, deployment, and monitoring reused product to product.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Section>

        <Separator className="bg-border-subtle" />

        <section className="py-16 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">See It in Action</h2>
          <p className="text-text-muted max-w-lg mx-auto">
            Review the truth-labeled public portfolio and each item&apos;s evidence state.
          </p>
          <Link href="/ventures" className={cn(buttonVariants({ size: 'lg' }), 'bg-accent-green text-background hover:bg-accent-green/90 font-semibold inline-flex items-center gap-2')}>
            View the portfolio <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </main>
  )
}
