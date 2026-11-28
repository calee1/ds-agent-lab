import { useEffect, useRef, useState } from "react"
import { Sparkles, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { CodeBlock, CodeBlockContent, CodeBlockHeader, CodeBlockTitle, CodeBlockActions, CodeBlockCopyButton } from "@/components/ui/code-block"

type GenState = "idle" | "loading" | { code: string } | { error: string }

export default function HaxDemo() {
  useEffect(() => {
    const prev = document.documentElement.getAttribute("data-skin") ?? "default"
    document.documentElement.setAttribute("data-skin", "branded")
    return () => document.documentElement.setAttribute("data-skin", prev)
  }, [])

  const [prompt, setPrompt] = useState("")
  const [state, setState] = useState<GenState>("idle")
  const iframeRef = useRef<HTMLIFrameElement>(null)

  function postCode(code: string) {
    iframeRef.current?.contentWindow?.postMessage({ type: "render", code }, "*")
  }

  function handleIframeLoad() {
    if (typeof state === "object" && "code" in state) {
      postCode((state as { code: string }).code)
    }
  }

  async function handleGenerate() {
    if (!prompt.trim() || state === "loading") return
    setState("loading")
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })
      if (!res.ok) throw new Error(await res.text())
      const { code } = await res.json() as { code: string }
      setState({ code })
    } catch (err) {
      setState({ error: (err as Error).message })
    }
  }

  const hasCode = typeof state === "object" && "code" in state
  const hasError = typeof state === "object" && "error" in state

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-screen-xl px-4">

        <header className="py-4">
          <Button variant="ghost" render={<a href="/" />}>
            <ArrowLeft size={16} />
            Back
          </Button>
        </header>

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
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. A data table showing monthly revenue by region with a CSV export button"
                  className="min-h-32 resize-none"
                  aria-label="Describe the UI you want to build"
                />
                <Button
                  className="w-full"
                  onClick={handleGenerate}
                  disabled={state === "loading" || !prompt.trim()}
                >
                  {state === "loading" ? (
                    <>
                      <span aria-hidden="true"><Loader2 size={16} className="animate-spin" /></span>
                      Generating…
                    </>
                  ) : (
                    <>
                      <span aria-hidden="true"><Sparkles size={16} /></span>
                      Generate demo
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Gate 1 (lint) and Gates 2–3 (build + Playwright) run locally via{" "}
                  <code className="font-mono">pnpm validate</code>.
                </p>
              </div>
            </section>

            <section aria-label="Demo output">
              {state === "idle" && (
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
              )}

              {state === "loading" && (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                    <span aria-hidden="true" className="text-muted-foreground">
                      <Loader2 size={32} className="animate-spin" />
                    </span>
                    <p className="text-sm text-muted-foreground">Generating your UI…</p>
                  </CardContent>
                </Card>
              )}

              {hasError && (
                <Card>
                  <CardContent className="flex flex-col gap-3 py-6">
                    <Badge variant="destructive" className="w-fit">Generation failed</Badge>
                    <p className="text-sm text-muted-foreground font-mono">
                      {(state as { error: string }).error}
                    </p>
                  </CardContent>
                </Card>
              )}

              {hasCode && (
                <div className="space-y-4">
                  <CodeBlock>
                    <CodeBlockHeader>
                      <CodeBlockTitle>Generated component</CodeBlockTitle>
                      <CodeBlockActions>
                        <CodeBlockCopyButton value={(state as { code: string }).code} />
                      </CodeBlockActions>
                    </CodeBlockHeader>
                    <CodeBlockContent>{(state as { code: string }).code}</CodeBlockContent>
                  </CodeBlock>

                  <div className="rounded-lg border border-border overflow-hidden">
                    <div className="px-3 py-2 border-b border-border bg-muted flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Live preview</span>
                      <Badge variant="secondary" className="text-xs">Gate 1 pending — run pnpm validate locally</Badge>
                    </div>
                    <iframe
                      ref={iframeRef}
                      src="/preview"
                      onLoad={handleIframeLoad}
                      title="Generated UI preview"
                      className="w-full"
                      style={{ height: "500px", border: "none", display: "block" }}
                    />
                  </div>
                </div>
              )}
            </section>

          </div>
        </main>

      </div>
    </div>
  )
}
