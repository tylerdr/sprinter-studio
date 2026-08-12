export default function Loading() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto space-y-10" aria-hidden="true">
        <div className="space-y-4">
          <div className="h-10 w-48 bg-surface rounded animate-pulse" />
          <div className="h-5 w-full max-w-2xl bg-surface rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 bg-surface border border-border-subtle rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </main>
  )
}
