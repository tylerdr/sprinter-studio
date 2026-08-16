import { Reveal } from '@/app/components/Reveal'
import { ArrowUpRight, Building2, Factory, Lightbulb } from 'lucide-react'

const routes = [
  {
    icon: Building2,
    eyebrow: 'Multi-company owner',
    title: 'Portfolio AI Operating Partner',
    body: 'Family offices, PE firms, holding companies, and multi-company owners: score portfolio readiness and review the 90-day launch at sprinter.ai.',
    href: 'https://sprinter.ai/portfolio-ai-scorecard',
    label: 'Score portfolio readiness',
  },
  {
    icon: Factory,
    eyebrow: 'One operating company',
    title: 'AI execution inside the workflow',
    body: 'Owners and operators with one expensive workflow: start with the Workflow Leak Scorecard or paid AI Opportunity Audit at Sprinter Consulting.',
    href: 'https://sprinterconsulting.com/scorecard',
    label: 'Score the workflow leaks',
  },
  {
    icon: Lightbulb,
    eyebrow: 'Domain expert with distribution',
    title: 'Pressure-test a product wedge',
    body: 'A domain insider with a named workflow, customer access, cash for the first bounded build, and clean IP can use the Product Wedge Review at sprinter.ai.',
    href: 'https://sprinter.ai/product-wedge-review',
    label: 'Review the product wedge',
  },
] as const

export function CommercialRoutes() {
  return (
    <section className="py-24 px-6 bg-surface/50 border-y border-border-subtle">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-accent-green">The correct commercial door</p>
          <h2 className="text-3xl md:text-5xl font-bold">This log builds trust. The commercial sites convert the work.</h2>
          <p className="text-text-muted leading-relaxed">
            Sprinter Studio should never make a serious buyer decode which experiment is secretly the offer. Choose the route that matches the operating need.
          </p>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-3">
          {routes.map((route, index) => {
            const Icon = route.icon
            return (
              <Reveal key={route.title} delay={index * 0.08} y={20}>
                <a
                  href={route.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-xl border border-border-subtle bg-background p-7 transition-colors hover:border-accent-green/60"
                >
                  <div className="flex items-start justify-between gap-4">
                    <Icon className="w-6 h-6 text-accent-green" aria-hidden="true" />
                    <ArrowUpRight className="w-4 h-4 text-text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-green" aria-hidden="true" />
                  </div>
                  <p className="mt-7 font-mono text-[10px] uppercase tracking-widest text-text-muted">{route.eyebrow}</p>
                  <h3 className="mt-3 text-2xl font-semibold">{route.title}</h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-text-muted">{route.body}</p>
                  <span className="mt-7 font-mono text-xs uppercase tracking-wider text-accent-green">
                    {route.label}
                  </span>
                </a>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
