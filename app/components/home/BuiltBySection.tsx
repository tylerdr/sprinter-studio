import { Reveal } from '@/app/components/Reveal'
import { Github, ExternalLink } from 'lucide-react'

export function BuiltBySection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Reveal className="text-center mb-6">
          <h2 className="text-sm font-mono uppercase tracking-widest text-text-muted">The Builder</h2>
        </Reveal>
        <Reveal className="bg-surface border border-border-subtle rounded-xl p-8 md:p-10 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent-green/10 flex items-center justify-center text-accent-green text-xl font-bold shrink-0" aria-hidden="true">
              T
            </div>
            <div>
              <h3 className="text-lg font-semibold">Tyler Dreher</h3>
              <p className="text-sm text-text-muted">Founder</p>
            </div>
          </div>
          <p className="text-sm text-text-muted leading-relaxed">
            I&apos;ve always been a builder. I trained as a mechanical engineer (Auburn), worked on
            machinery at ExxonMobil, and ran a construction company on the side — and at every one of
            them, the software the work actually needed didn&apos;t exist. So I taught myself to build
            it, and I never stopped.
          </p>
          <p className="text-sm text-text-muted leading-relaxed">
            When I saw how much faster I could build with AI, the question got sharper:{' '}
            <span className="text-foreground font-medium">what if a builder used AI as real leverage —
            with judgment, architecture, and accountability staying human?</span> Sprinter Studio is where
            I test that, product by product, labeled honestly as I go.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a
              href="https://github.com/tylerdr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
            >
              <Github className="w-4 h-4" aria-hidden="true" /> GitHub
            </a>
            <a
              href="https://github.com/tylerdr/sprinter-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" /> View source
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
