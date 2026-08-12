export default function Loading() {
  return (
    <main className="min-h-screen pt-32 pb-12 px-6">
      <div className="max-w-3xl mx-auto space-y-6" aria-hidden="true">
        <div className="h-4 w-24 bg-surface rounded animate-pulse" />
        <div className="h-6 w-32 bg-surface rounded-full animate-pulse" />
        <div className="h-12 w-full max-w-lg bg-surface rounded animate-pulse" />
        <div className="h-24 w-full bg-surface rounded animate-pulse" />
        <div className="h-40 w-full bg-surface rounded-xl animate-pulse mt-8" />
      </div>
    </main>
  )
}
