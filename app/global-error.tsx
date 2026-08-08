'use client'

import { useEffect } from 'react'
import './globals.css'

export default function GlobalError({
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
    <html lang="en" className="dark">
      <body className="antialiased bg-background text-foreground">
        <main className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center space-y-4 max-w-md">
            <p className="text-sm font-mono uppercase tracking-wider" style={{ color: '#ff6600' }}>
              Critical error
            </p>
            <h1 className="text-3xl font-bold">The site failed to load</h1>
            <p className="text-text-muted">Try refreshing the page.</p>
            <button
              onClick={() => reset()}
              className="rounded-lg px-6 py-2 font-medium bg-accent-green text-background hover:bg-accent-green/90"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  )
}
