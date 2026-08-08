'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center space-y-4 max-w-md">
        <p className="text-sm font-mono text-accent-orange uppercase tracking-wider">Error</p>
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="text-text-muted">This page failed to render. Try again, or come back later.</p>
        <Button onClick={() => reset()} className="bg-accent-green text-background hover:bg-accent-green/90">
          Try again
        </Button>
      </div>
    </main>
  )
}
