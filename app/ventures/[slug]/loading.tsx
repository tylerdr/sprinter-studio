export default function Loading() {
  return (
    <main className="min-h-screen pt-32 pb-12 px-6">
      <div className="max-w-3xl mx-auto space-y-8" aria-hidden="true">
        <div className="h-8 w-40 bg-surface rounded animate-pulse" />
        <div className="bg-surface border border-border-subtle rounded-xl p-6 space-y-4">
          <div className="h-6 w-32 bg-surface-raised rounded animate-pulse" />
          <div className="h-10 w-2/3 bg-surface-raised rounded animate-pulse" />
          <div className="h-64 w-full bg-surface-raised rounded-lg animate-pulse" />
          <div className="h-24 w-full bg-surface-raised rounded animate-pulse" />
        </div>
      </div>
    </main>
  )
}
