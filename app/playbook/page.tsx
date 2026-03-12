import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Playbook | Sprinter Studio',
  description: 'The Amble → Sprint → Sail methodology. How one founder and AI agents build a constellation of profitable software businesses.',
}

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <section className={`py-16 ${className}`}>{children}</section>
}

export default function PlaybookPage() {
  return (
    <main className="min-h-screen py-12 px-6">
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
            Most founders burn out chasing one idea. We build many — systematically, sustainably, with AI doing the heavy lifting.
            The goal isn&apos;t to work harder. It&apos;s to build a machine that creates value while you sleep.
          </p>
          <p className="text-lg text-text-muted leading-relaxed mt-4">
            This is the Amble → Sprint → Sail methodology: a repeatable framework for
            validating, building, and scaling software ventures at AI speed.
          </p>
        </Section>

        <Separator className="bg-border-subtle" />

        <Section>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🌀</span>
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
                  <li>✅ Clear ICP with validated pain point</li>
                  <li>✅ Revenue model defined (how it makes money day 1)</li>
                  <li>✅ Competitive advantage articulated</li>
                  <li>✅ MVP scope defined (what ships in the first sprint)</li>
                  <li>✅ Domain secured</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Separator className="bg-border-subtle" />

        <Section>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎯</span>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#0066ff' }}>Phase 2: Sprint</h2>
              <p className="text-text-muted">Build & Deploy</p>
            </div>
          </div>

          <div className="space-y-6 text-text-muted leading-relaxed">
            <p>
              Sprint is focused execution. The idea has passed validation — now ship it.
              AI agents handle scaffolding, coding, content, and deployment. Human input is strategic, not tactical.
            </p>

            <Card className="bg-surface border-border-subtle">
              <CardContent className="pt-6 space-y-3">
                <h3 className="font-semibold text-foreground">Activities</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><span style={{ color: '#0066ff' }}>→</span> Project scaffolding (AI-generated codebase)</li>
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
                  <li>✅ Core features functional and tested</li>
                  <li>✅ Landing page with clear value proposition</li>
                  <li>✅ Payment integration (if applicable)</li>
                  <li>✅ Analytics and monitoring in place</li>
                  <li>✅ SEO basics configured</li>
                  <li>✅ Deployed to production domain</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Separator className="bg-border-subtle" />

        <Section>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⛵</span>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#00ff88' }}>Phase 3: Sail</h2>
              <p className="text-text-muted">Grow & Scale</p>
            </div>
          </div>

          <div className="space-y-6 text-text-muted leading-relaxed">
            <p>
              Sail is where ventures earn their keep. The product is live — now find distribution,
              build growth loops, and optimize for revenue. The target: escape velocity at $10K MRR.
            </p>

            <Card className="bg-surface border-border-subtle">
              <CardContent className="pt-6 space-y-3">
                <h3 className="font-semibold text-foreground">Activities</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><span style={{ color: '#00ff88' }}>→</span> Distribution channel activation (SEO, content, partnerships)</li>
                  <li className="flex items-start gap-2"><span style={{ color: '#00ff88' }}>→</span> Growth loop design and implementation</li>
                  <li className="flex items-start gap-2"><span style={{ color: '#00ff88' }}>→</span> Revenue optimization and pricing experiments</li>
                  <li className="flex items-start gap-2"><span style={{ color: '#00ff88' }}>→</span> Automation of operations (AI agents for support, content, monitoring)</li>
                  <li className="flex items-start gap-2"><span style={{ color: '#00ff88' }}>→</span> Metrics tracking and iteration</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-surface-raised border-border-subtle">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-foreground mb-3">Revenue Targets</h3>
                <div className="space-y-2 text-sm">
                  <p><strong className="text-foreground">Traction:</strong> First paying customer</p>
                  <p><strong className="text-foreground">Validation:</strong> $1K MRR — the venture works</p>
                  <p><strong className="text-foreground">Escape Velocity:</strong> $10K MRR — consider hiring humans</p>
                  <p><strong className="text-foreground">Scale:</strong> $50K+ MRR — the venture runs itself</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Separator className="bg-border-subtle" />

        <Section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">The Constellation Model</h2>
          <div className="space-y-6 text-text-muted leading-relaxed">
            <p>
              Traditional founders go all-in on one bet. We build a constellation — a portfolio of
              ventures that share infrastructure, learnings, and AI capabilities. Each venture is a star
              in the constellation, contributing to the whole.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-surface border-border-subtle">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-2">Own & Operate Forever</h3>
                  <p className="text-sm">No exit-driven timelines. Build sustainably, compound returns over decades.</p>
                </CardContent>
              </Card>
              <Card className="bg-surface border-border-subtle">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-2">AI Agents Run Everything</h3>
                  <p className="text-sm">Operations, support, content, monitoring — agents handle the day-to-day.</p>
                </CardContent>
              </Card>
              <Card className="bg-surface border-border-subtle">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-2">Human Team at Escape Velocity</h3>
                  <p className="text-sm">Only hire when a venture hits $10K+ MRR and needs humans to unlock the next level.</p>
                </CardContent>
              </Card>
              <Card className="bg-surface border-border-subtle">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-2">Shared Infrastructure</h3>
                  <p className="text-sm">Common tooling, deployment, monitoring, and AI capabilities across all ventures.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Section>

        <Separator className="bg-border-subtle" />

        <section className="py-16 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">See It in Action</h2>
          <p className="text-text-muted max-w-lg mx-auto">
            Watch ventures move through Amble → Sprint → Sail in real time.
          </p>
          <Link href="/#pipeline" className={cn(buttonVariants({ size: 'lg' }), 'bg-accent-green text-background hover:bg-accent-green/90 font-semibold inline-flex items-center gap-2')}>
            View the Pipeline <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </main>
  )
}
