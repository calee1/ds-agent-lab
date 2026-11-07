import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-screen-xl space-y-6 px-4 py-8">
        <h1 className="text-2xl font-bold tracking-tight">Design system sandbox</h1>
        <p className="text-sm text-muted-foreground">Agent-built routes live under src/routes.</p>
        <Button>Primary action</Button>
      </div>
    </div>
  )
}
