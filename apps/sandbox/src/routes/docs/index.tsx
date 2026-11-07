import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Component = { slug: string; name: string; exports: string[]; variants: Record<string, string[]>; import: string }
type Decision = { id: string; title: string; severity: "error" | "warn"; enforcement: { type: string; ref: string }; rationale: string }
type Tokens = { colors: Record<string, { light: string; dark?: string }> }

export default function Docs() {
  const [components, setComponents] = useState<Component[]>([])
  const [decisions, setDecisions] = useState<Decision[]>([])
  const [tokens, setTokens] = useState<Tokens | null>(null)

  useEffect(() => {
    void Promise.all(["components", "decisions", "tokens"].map((f) => fetch(`/registry/${f}.json`).then((r) => r.json()))).then(([c, d, t]) => {
      setComponents(c)
      setDecisions(d)
      setTokens(t)
    })
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-screen-xl space-y-8 px-4 py-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Design system registry</h1>
          <p className="text-sm text-muted-foreground">Generated from the component source. Agents read the same data through the MCP server.</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Components</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {components.map((c) => (
              <Card key={c.slug}>
                <CardHeader>
                  <CardTitle>{c.name}</CardTitle>
                  <CardDescription>{c.exports.length} parts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {Object.entries(c.variants).map(([group, values]) => (
                    <div key={group} className="flex flex-wrap items-center gap-1">
                      <span className="text-sm font-medium">{group}</span>
                      {values.map((v) => (
                        <Badge key={v} variant="secondary">
                          {v}
                        </Badge>
                      ))}
                    </div>
                  ))}
                  <p className="text-sm text-muted-foreground">{c.exports.join(", ")}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Decision records</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Decision</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Enforced by</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {decisions.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium">{d.id}</TableCell>
                    <TableCell>{d.title}</TableCell>
                    <TableCell>
                      <Badge variant={d.severity === "error" ? "default" : "secondary"}>{d.severity}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {d.enforcement.type}: {d.enforcement.ref}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Color tokens</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Token</TableHead>
                  <TableHead>Light</TableHead>
                  <TableHead>Dark</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(tokens?.colors ?? {}).map(([name, v]) => (
                  <TableRow key={name}>
                    <TableCell className="font-medium">{name}</TableCell>
                    <TableCell className="text-muted-foreground">{v.light}</TableCell>
                    <TableCell className="text-muted-foreground">{v.dark ?? "same"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </main>
    </div>
  )
}
