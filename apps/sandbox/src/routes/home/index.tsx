import { useEffect, useState } from "react"
import { Database, Cpu, CheckCircle, Eye, Sparkles, Palette, Shield, Layers, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  useEffect(() => {
    const prev = document.documentElement.getAttribute("data-skin") ?? "default"
    document.documentElement.setAttribute("data-skin", "branded")
    return () => document.documentElement.setAttribute("data-skin", prev)
  }, [])

  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"))

  const toggleDark = () => {
    const next = !dark
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("mode", next ? "dark" : "light")
    setDark(next)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-screen-xl px-4">

        {/* Top bar — light/dark toggle */}
        <header className="flex justify-end py-4">
          <Button
            variant="ghost"
            onClick={toggleDark}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span aria-hidden="true">{dark ? <Sun size={16} /> : <Moon size={16} />}</span>
          </Button>
        </header>

        <main className="pb-16 space-y-20">

          {/* Section 1 — Hero */}
          <section className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Human-AI eXperience</p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">HAX Design System</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              An agent-driven design system where every UI is built by AI, validated by rules, and always on-brand.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Button render={<a href="/hax-demo" />}>HAX demo</Button>
              <Button variant="secondary" render={<a href="/skin-demo" />}>Skins &amp; components</Button>
            </div>
            <div className="mt-12 flex justify-center">
              <img
                src="/hax-illustration.webp"
                alt="Robots and a designer collaborate around a laptop, building UI together with the HAX Design system"
                className="w-full max-w-md rounded-xl"
              />
            </div>
          </section>

          {/* Section 2 — What is HAX? */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">What is HAX?</h2>
            <p className="text-muted-foreground">
              HAX (Human-AI eXperience) is a design system built for AI-first workflows. Agents read a registry of
              tokens, decision records and patterns, then generate validated UI — no hand-coding required.
            </p>
            <p className="text-muted-foreground">
              Every agent-built page passes the same gates as hand-crafted work: static lint, Playwright/axe
              accessibility checks, a reviewer agent that enforces decision records, and a keyboard-accessibility
              agent. If any gate fails, the builder revises before you ever see the result.
            </p>
          </section>

          {/* Section 3 — How it works */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
            <div className="flex justify-center">
              <img
                src="/hax-pipeline.png"
                alt="Architecture diagram: the design system repository feeds tokens and a validated component API into Decision records and Skill plus skins. The Builder agent reads these and generates UI, which passes through a Review gate with Reviewer and Accessibility agents before being presented to you. Failed reviews loop back to the Builder agent."
                className="w-full max-w-3xl rounded-lg border border-border"
              />
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              <Card className="w-full sm:w-44 text-center">
                <CardContent className="pt-6 flex flex-col items-center gap-2">
                  <span aria-hidden="true" className="text-foreground">
                    <Database size={24} />
                  </span>
                  <Badge variant="secondary">01</Badge>
                  <p className="text-sm font-medium">Registry</p>
                  <p className="text-xs text-muted-foreground">
                    Tokens, decision records, component API and patterns in one place.
                  </p>
                </CardContent>
              </Card>

              <Card className="w-full sm:w-44 text-center">
                <CardContent className="pt-6 flex flex-col items-center gap-2">
                  <span aria-hidden="true" className="text-foreground">
                    <Cpu size={24} />
                  </span>
                  <Badge variant="secondary">02</Badge>
                  <p className="text-sm font-medium">Builder agent</p>
                  <p className="text-xs text-muted-foreground">
                    Reads the registry and generates a route from your brief.
                  </p>
                </CardContent>
              </Card>

              <Card className="w-full sm:w-44 text-center">
                <CardContent className="pt-6 flex flex-col items-center gap-2">
                  <span aria-hidden="true" className="text-foreground">
                    <CheckCircle size={24} />
                  </span>
                  <Badge variant="secondary">03</Badge>
                  <p className="text-sm font-medium">Automated gates</p>
                  <p className="text-xs text-muted-foreground">
                    ESLint, Playwright and axe validate every generated page.
                  </p>
                </CardContent>
              </Card>

              <Card className="w-full sm:w-44 text-center">
                <CardContent className="pt-6 flex flex-col items-center gap-2">
                  <span aria-hidden="true" className="text-foreground">
                    <Eye size={24} />
                  </span>
                  <Badge variant="secondary">04</Badge>
                  <p className="text-sm font-medium">Reviewer agent</p>
                  <p className="text-xs text-muted-foreground">
                    Checks decision records and visual quality.
                  </p>
                </CardContent>
              </Card>

              <Card className="w-full sm:w-44 text-center">
                <CardContent className="pt-6 flex flex-col items-center gap-2">
                  <span aria-hidden="true" className="text-foreground">
                    <Sparkles size={24} />
                  </span>
                  <Badge variant="secondary">05</Badge>
                  <p className="text-sm font-medium">Shipped to you</p>
                  <p className="text-xs text-muted-foreground">
                    Only pages that pass all three gates reach production.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 4 — Design pillars */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Built on strong foundations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6 space-y-2">
                  <span aria-hidden="true" className="text-foreground">
                    <Palette size={20} />
                  </span>
                  <p className="font-medium">Semantic tokens</p>
                  <p className="text-sm text-muted-foreground">
                    Colors, radius and spacing defined once, applied everywhere. Skins swap the palette without
                    touching components.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 space-y-2">
                  <span aria-hidden="true" className="text-foreground">
                    <Shield size={20} />
                  </span>
                  <p className="font-medium">Decision records</p>
                  <p className="text-sm text-muted-foreground">
                    17 rules enforced automatically — from color contrast to focus rings and destructive-action
                    confirmations.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 space-y-2">
                  <span aria-hidden="true" className="text-foreground">
                    <Layers size={20} />
                  </span>
                  <p className="font-medium">Three skins, two modes</p>
                  <p className="text-sm text-muted-foreground">
                    Default, branded and wireframe × light and dark — all validated across every combination.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 5 — Footer CTA */}
          <section>
            <div className="text-center py-16 space-y-6">
              <h2 className="text-2xl font-semibold">Ready to explore?</h2>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button render={<a href="/hax-demo" />}>HAX demo</Button>
                <Button variant="secondary" render={<a href="/skin-demo" />}>Skins &amp; components</Button>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  )
}
