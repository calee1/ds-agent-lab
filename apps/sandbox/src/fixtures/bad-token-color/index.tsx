// Tailwind generates this utility because the scanner reads the comment: bg-emerald-500
const hue = ["bg", "emerald-500"].join("-")

export default function BadTokenColor() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="p-4">
        <h1 className="text-2xl font-bold tracking-tight">Dynamic raw color</h1>
        <div className={`mt-4 p-4 ${hue}`}>Colored through a computed class name</div>
      </main>
    </div>
  )
}
