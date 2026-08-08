import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Reveal } from '@/app/components/Reveal'
import { proofItems } from '@/app/data/proof'

export function Proof() {
  return (
    <section className="py-20 px-6 bg-surface/50">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">What we&apos;ve actually built</h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Conservative, ledger-verified capability proof — not a portfolio card. Relationship is labeled
            per item; customer identity, screenshots, and outcomes stay permission-gated until they clear
            publication review.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {proofItems.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08} y={15}>
              <Card className="bg-surface border-border-subtle h-full">
                <CardContent className="pt-6 space-y-3 h-full flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold">
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent-green transition-colors">
                          {item.name}
                        </a>
                      ) : (
                        item.name
                      )}
                    </h3>
                    <Badge variant="outline" className="border-border-subtle text-text-muted shrink-0">
                      {item.proofClass}
                    </Badge>
                  </div>
                  <p className="text-xs font-medium text-foreground/80">{item.relationship}</p>
                  <p className="text-sm text-text-muted leading-relaxed">{item.description}</p>
                  <div className="mt-auto pt-2 space-y-1">
                    <p className="text-xs text-text-muted/80">{item.note}</p>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted/70">
                      Verified {item.verifiedAt}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
