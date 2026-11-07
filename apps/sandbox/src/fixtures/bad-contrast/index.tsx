export default function BadContrast() {
  return (
    <div className="min-h-screen bg-background">
      <main className="p-4">
        <h1 className="text-2xl font-bold tracking-tight text-muted">Barely visible heading</h1>
        <p className="text-sm text-muted">This text has almost no contrast against the page.</p>
      </main>
    </div>
  )
}
