export default function Loading() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto space-y-12" aria-hidden="true">
        <div className="space-y-4">
          <div className="h-10 w-full max-w-md bg-surface rounded animate-pulse" />
          <div className="h-5 w-full max-w-lg bg-surface rounded animate-pulse" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-5 w-full bg-surface rounded animate-pulse" />
          ))}
        </div>
      </div>
    </main>
  )
}
