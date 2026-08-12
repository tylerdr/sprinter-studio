import { buttonVariants } from '@/components/ui/button'
import { Reveal } from '@/app/components/Reveal'
import { Github } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FollowTheBuild() {
  return (
    <section className="py-24 px-6 bg-surface/50">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <Reveal className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Follow the Build
          </h2>
          <p className="text-text-muted max-w-lg mx-auto">
            This is a working portfolio, updated as evidence changes. Source is public on GitHub.
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
            <Github className="w-5 h-5" aria-hidden="true" /> Star on GitHub
          </a>
        </Reveal>
      </div>
    </section>
  )
}
