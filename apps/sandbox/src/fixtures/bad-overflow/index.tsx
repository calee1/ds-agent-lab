export default function BadOverflow() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex w-max gap-4">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="w-64 shrink-0 bg-card p-4 text-card-foreground">
            Card {i + 1}
          </div>
        ))}
      </div>
    </div>
  )
}
