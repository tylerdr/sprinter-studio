import { buttonVariants } from '@/components/ui/button'
import { Reveal } from '@/app/components/Reveal'
import { CO_BUILD_CRITERIA, NOT_A_FUND_STATEMENT } from '@/app/data/positioning'
import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function CoBuildSection() {
  return (
    <section id="co-build" className="py-24 px-6 bg-surface/50 scroll-mt-24">
      <div className="max-w-2xl mx-auto space-y-8">
        <Reveal className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Propose a product wedge</h2>
          <p className="text-text-muted">{NOT_A_FUND_STATEMENT}</p>
        </Reveal>

        <Reveal delay={0.1} y={15}>
          <ul className="space-y-3">
            {CO_BUILD_CRITERIA.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-text-muted">
                <Check className="w-4 h-4 mt-0.5 shrink-0 text-accent-green" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.2} y={15} className="text-center">
          <Link href="/co-build" className={cn(buttonVariants({ size: 'lg' }), 'bg-accent-green text-background hover:bg-accent-green/90 font-semibold inline-flex items-center gap-2')}>
            See the full fit criteria <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
