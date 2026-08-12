import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center space-y-4 max-w-md">
        <p className="text-sm font-mono text-accent-green uppercase tracking-wider">404</p>
        <h1 className="text-3xl font-bold">Page not found</h1>
        <p className="text-text-muted">
          The link may be old, or this page may have moved.
        </p>
        <Link href="/" className={cn(buttonVariants({ variant: 'outline' }), 'border-border-subtle hover:bg-surface')}>
          Back to home
        </Link>
      </div>
    </main>
  )
}
