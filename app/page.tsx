'use client'

import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Pipeline } from '@/app/components/Pipeline'
import { featuredVentures, ventures } from '@/app/data/ventures'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Zap, Github, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,255,136,0.05)_0%,_transparent_70%)]" />
      <div className="relative max-w-4xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm md:text-base font-mono text-accent-green mb-4 tracking-wider uppercase">Sprinter Studio</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            We Build Companies{' '}
            <span className="text-accent-green">While You Sleep</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto"
        >
          One founder and autonomous AI agents running {ventures.length}+ software ventures 24/7. No team. No investors. Just the factory.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="#pipeline" className={cn(buttonVariants({ size: 'lg' }), 'bg-accent-green text-background hover:bg-accent-green/90 font-semibold')}>
            See the Live Pipeline
          </Link>
          <Link href="/playbook" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'border-border-subtle hover:bg-surface')}>
            Read the Playbook
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-4"
        >
          <Badge variant="outline" className="border-border-subtle text-text-muted px-4 py-1.5">
            {ventures.length}+ ventures in pipeline
          </Badge>
          <Badge variant="outline" className="border-border-subtle text-text-muted px-4 py-1.5">
            Agents ship 24/7
          </Badge>
          <Badge variant="outline" className="border-border-subtle text-text-muted px-4 py-1.5">
            Built in public
          </Badge>
        </motion.div>
      </div>
    </section>
  )
}

function HowWeBuild() {
  const phases = [
    {
      icon: '🌀',
      title: 'Amble',
      subtitle: 'Ideate & Validate',
      description: 'Divergent exploration. Score ideas, define ICP, validate demand. No code until the signal is clear.',
      color: '#ff6600',
    },
    {
      icon: '🎯',
      title: 'Sprint',
      subtitle: 'Build & Deploy',
      description: 'Focused execution. Ship an MVP in days, not months. AI agents handle the heavy lifting.',
      color: '#0066ff',
    },
    {
      icon: '⛵',
      title: 'Sail',
      subtitle: 'Grow & Scale',
      description: 'Distribution and growth loops. Optimize for revenue. Automate everything that moves.',
      color: '#00ff88',
    },
  ]

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Build</h2>
          <p className="text-text-muted max-w-xl mx-auto">
            Three phases. One methodology. Repeatable venture creation at AI speed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Card className="bg-surface border-border-subtle h-full">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{phase.icon}</span>
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
            </motion.div>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Pipeline</h2>
          <p className="text-text-muted">
            Real-time view of every venture across the factory.
          </p>
        </motion.div>

        <Pipeline />
      </div>
    </section>
  )
}

function VenturePortfolio() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Portfolio Snapshot</h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            A mix of launched assets, active builds, and fresh bets moving through the factory right now.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {featuredVentures.map((venture, index) => (
            <motion.div
              key={venture.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <Card className="bg-surface border-border-subtle h-full">
                <CardContent className="pt-6 space-y-4 h-full flex flex-col">
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

                  <div className="mt-auto flex items-center justify-between gap-3 pt-2">
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
            </motion.div>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            The playbook is open source.
          </h2>
          <p className="text-text-muted max-w-lg mx-auto">
            Amble → Sprint → Sail. The exact methodology we use to go from raw idea to deployed, revenue-generating product in days — not months.
          </p>
          <Link href="/playbook" className={cn(buttonVariants({ size: 'lg' }), 'bg-accent-green text-background hover:bg-accent-green/90 font-semibold inline-flex items-center gap-2')}>
            Read the Playbook <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
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
        <nav className="flex items-center gap-6 text-sm text-text-muted">
          <Link href="#pipeline" className="hover:text-foreground transition-colors">Pipeline</Link>
          <Link href="/playbook" className="hover:text-foreground transition-colors">Playbook</Link>
          <a href="https://github.com/tylerdr/sprinter-studio" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1">
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
      <Separator className="bg-border-subtle" />
      <HowWeBuild />
      <Separator className="bg-border-subtle" />
      <PipelineSection />
      <Separator className="bg-border-subtle" />
      <VenturePortfolio />
      <Separator className="bg-border-subtle" />
      <PlaybookCTA />
      <Footer />
    </main>
  )
}
