import { Card, CardContent } from '@/components/ui/card'
import { PlaybookDiagram, PhaseGlyph } from '@/app/components/PlaybookDiagram'
import { Reveal } from '@/app/components/Reveal'
import { ArrowRight } from 'lucide-react'

const phases = [
  {
    phase: 'amble' as const,
    title: 'Amble',
    subtitle: 'Ideate & Validate',
    description: 'Divergent exploration. Score ideas, define ICP, and validate demand before writing code.',
    color: '#ff6600',
  },
  {
    phase: 'sprint' as const,
    title: 'Sprint',
    subtitle: 'Build & Deploy',
    description: 'Focused execution with AI as leverage. Architecture, scope, and acceptance decisions stay human.',
    color: '#0066ff',
  },
  {
    phase: 'sail' as const,
    title: 'Sail',
    subtitle: 'Grow & Scale',
    description: 'Distribution and growth loops, with revenue evidence tracked honestly — never assumed.',
    color: '#00ff88',
  },
]

export function HowWeWork() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Work</h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Services-funded and human-led, with AI as leverage — not a substitute for judgment. One person
            is accountable for every wedge, every build, and every claim on this site.
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
                      <ArrowRight className="w-4 h-4 text-text-muted" aria-hidden="true" />
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
