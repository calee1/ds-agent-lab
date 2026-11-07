import { useEffect } from "react"

export default function BadConsole() {
  useEffect(() => {
    console.error("fixture: deliberate console error")
  }, [])
  return (
    <div className="min-h-screen bg-background text-foreground">
      <h1 className="text-2xl font-bold tracking-tight">Console error</h1>
    </div>
  )
}
