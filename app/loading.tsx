export default function Loading() {
  return (
    <main className="min-h-screen">
      <div className="min-h-[90vh] flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto w-full text-center space-y-8" aria-hidden="true">
          <div className="h-4 w-48 bg-surface rounded mx-auto animate-pulse" />
          <div className="h-16 w-full max-w-2xl bg-surface rounded mx-auto animate-pulse" />
          <div className="h-6 w-full max-w-xl bg-surface rounded mx-auto animate-pulse" />
          <div className="flex items-center justify-center gap-4">
            <div className="h-11 w-56 bg-surface rounded-lg animate-pulse" />
            <div className="h-11 w-40 bg-surface rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  )
}
