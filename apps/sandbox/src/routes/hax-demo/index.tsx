import { useEffect } from "react"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function HaxDemo() {
  useEffect(() => {
    const prev = document.documentElement.getAttribute("data-skin") ?? "default"
    document.documentElement.setAttribute("data-skin", "branded")
    return () => document.documentElement.setAttribute("data-skin", prev)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-screen-xl px-4">

        <main className="pb-16">
          <div className="max-w-2xl mx-auto space-y-8">

            <section className="text-center space-y-3">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                What do you want to build today?
              </h1>
              <p className="text-muted-foreground">
                Describe a UI and the HAX ecosystem will generate, validate and render a live demo.
              </p>
            </section>

            <section aria-label="Build prompt">
              <div className="space-y-3">
                <Textarea
                  placeholder="e.g. A data table showing monthly revenue by region with a CSV export button"
                  className="min-h-32 resize-none"
                  aria-label="Describe the UI you want to build"
                />
                <Button
                  className="w-full"
                  disabled
                  aria-disabled="true"
                >
                  Generate demo
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Live generation coming soon.
                </p>
              </div>
            </section>

            <section aria-label="Demo output">
              <Card>
                <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                  <span aria-hidden="true" className="text-muted-foreground">
                    <Sparkles size={32} />
                  </span>
                  <p className="text-sm text-muted-foreground">
                    Your generated demo will appear here.
                  </p>
                </CardContent>
              </Card>
            </section>

          </div>
        </main>

      </div>
    </div>
  )
}
