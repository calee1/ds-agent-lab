import { Database, Cpu, CheckCircle, Eye, Sparkles, Palette, Shield, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-screen-xl px-4 py-16 space-y-20">

        {/* Section 1 — Hero */}
        <section className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Human-AI eXperience</p>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">HAX Design System</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            An agent-driven design system where every UI is built by AI, validated by rules, and always on-brand.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button render={<a href="/skin-demo" />}>View skins &amp; components</Button>
            <Button variant="outline" render={<a href="/foundations" />}>Browse foundations</Button>
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
              <Button variant="secondary" render={<a href="/skin-demo" />}>View skins &amp; components</Button>
              <Button variant="outline" render={<a href="/foundations" />}>Browse foundations</Button>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
