import { buttonVariants } from '@/components/ui/button'
import { Reveal } from '@/app/components/Reveal'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { NOT_A_FUND_STATEMENT } from '@/app/data/positioning'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/hero-texture.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,255,136,0.05)_0%,_transparent_70%)]" />
      </div>
      <div className="relative max-w-4xl mx-auto text-center space-y-8">
        <Reveal immediate duration={0.6} y={30}>
          <p className="text-sm md:text-base font-mono text-accent-green mb-4 tracking-wider uppercase">Truth-Labeled Portfolio</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            A venture portfolio,{' '}
            <span className="text-accent-green">labeled honestly.</span>
          </h1>
        </Reveal>

        <Reveal
          as="p"
          immediate
          duration={0.6}
          delay={0.2}
          className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto"
        >
          We build and operate our own products, take on selective client work, and co-build with domain
          insiders who bring distribution, cash, a real wedge, and clean IP.
        </Reveal>

        <Reveal
          as="p"
          immediate
          duration={0.6}
          delay={0.3}
          className="text-sm text-text-muted/80 max-w-xl mx-auto"
        >
          {NOT_A_FUND_STATEMENT}
        </Reveal>

        <Reveal
          immediate
          duration={0.6}
          delay={0.4}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/co-build" className={cn(buttonVariants({ size: 'lg' }), 'bg-accent-green text-background hover:bg-accent-green/90 font-semibold')}>
            Propose a product wedge
          </Link>
          <Link href="/playbook" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'border-border-subtle hover:bg-surface')}>
            Read the Playbook
          </Link>
        </Reveal>

        <Reveal
          immediate
          duration={0.6}
          delay={0.6}
          y={0}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-4 font-mono text-xs uppercase tracking-widest text-text-muted"
        >
          <span className="inline-flex items-center gap-2">
            <span className="h-1 w-1 bg-accent-orange" aria-hidden="true" />
            Owned products
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1 w-1 bg-accent-blue" aria-hidden="true" />
            Client work
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1 w-1 bg-accent-green" aria-hidden="true" />
            Selective co-build
          </span>
        </Reveal>
      </div>
    </section>
  )
}
