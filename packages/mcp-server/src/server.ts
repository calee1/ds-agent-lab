import fs from "node:fs"
import path from "node:path"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"
import { lintCode } from "../../validators/src/lint.ts"

const dist = path.resolve(import.meta.dirname, "../../registry/dist")
const read = <T>(rel: string): T => JSON.parse(fs.readFileSync(path.join(dist, rel), "utf8"))

type Index = { components: { slug: string; name: string; exports: string[] }[] }
type Decision = { id: string; title: string; status: string; severity: string; scope: string[]; enforcement: { type: string; ref: string }; rationale: string; do: string[]; dont: string[]; body: string }
type Pattern = { slug: string; title: string; summary: string; body: string }

const text = (value: unknown) => ({ content: [{ type: "text" as const, text: typeof value === "string" ? value : JSON.stringify(value, null, 2) }] })
const fail = (message: string) => ({ ...text(message), isError: true })

export function createServer() {
  const server = new McpServer({ name: "ds-registry", version: "0.1.0" })

  server.registerTool(
    "list_components",
    { description: "List every design system component with its exported part names. Start here, then call get_component.", inputSchema: {} },
    async () => text(read<Index>("index.json").components),
  )

  server.registerTool(
    "get_component",
    {
      description: "Full API for one component: import line, parts, variants and defaults, props, usage guidance, accessibility notes and related decision records.",
      inputSchema: { name: z.string().describe('Slug or name, e.g. "button" or "alert-dialog"') },
    },
    async ({ name }) => {
      const slug = name.toLowerCase().replace(/\s+/g, "-")
      const file = path.join(dist, "components", `${slug}.json`)
      if (!fs.existsSync(file)) {
        const known = read<Index>("index.json").components.map((c) => c.slug).join(", ")
        return fail(`Unknown component "${name}". Available: ${known}`)
      }
      return text(read(`components/${slug}.json`))
    },
  )

  server.registerTool(
    "get_tokens",
    { description: "Design tokens: semantic color names (light and dark values), radius, fonts, and the allowed spacing, font size and weight scales.", inputSchema: {} },
    async () => text(read("tokens.json")),
  )

  server.registerTool(
    "search_decisions",
    {
      description: "Search design decision records (rules the build is validated against). Filter by free text, scope (component slug or 'all'), or severity.",
      inputSchema: {
        query: z.string().optional(),
        scope: z.string().optional(),
        severity: z.enum(["error", "warn"]).optional(),
      },
    },
    async ({ query, scope, severity }) => {
      const q = query?.toLowerCase()
      const hits = read<Decision[]>("decisions.json").filter(
        (d) =>
          d.status === "accepted" &&
          (!severity || d.severity === severity) &&
          (!scope || d.scope.includes(scope) || d.scope.includes("all")) &&
          (!q || [d.id, d.title, d.rationale, d.body, ...d.do, ...d.dont].join(" ").toLowerCase().includes(q)),
      )
      return text(hits.map(({ id, title, severity, scope, enforcement, rationale, do: doList, dont, body }) => ({ id, title, severity, scope, enforcement, rationale, do: doList, dont, body })))
    },
  )

  server.registerTool(
    "get_pattern",
    {
      description: "Get a composed UI recipe by slug (e.g. form-field, page-layout, confirm-destructive). Omit name to list patterns.",
      inputSchema: { name: z.string().optional() },
    },
    async ({ name }) => {
      const patterns = read<Pattern[]>("patterns.json")
      if (!name) return text(patterns.map((p) => ({ slug: p.slug, title: p.title, summary: p.summary })))
      const p = patterns.find((x) => x.slug === name)
      return p ? text(`# ${p.title}\n\n${p.body}`) : fail(`Unknown pattern "${name}". Available: ${patterns.map((x) => x.slug).join(", ")}`)
    },
  )

  server.registerTool(
    "validate_code",
    {
      description: "Run the static design system lint rules on a TSX snippet. Returns violations mapped to decision record ids. Does not run rendered checks; use the validate CLI for those.",
      inputSchema: { code: z.string().describe("Full TSX source of a route or component") },
    },
    async ({ code }) => {
      const violations = lintCode(code, "snippet.tsx")
      return text({ ok: !violations.some((v) => v.severity === "error"), violations })
    },
  )

  return server
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.filename)) {
  await createServer().connect(new StdioServerTransport())
}
