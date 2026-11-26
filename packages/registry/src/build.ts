import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { Node, Project, SyntaxKind, TypeFormatFlags, type SourceFile } from "ts-morph"
import { ComponentSchema, DecisionSchema, SkinSchema, TokensSchema } from "./schema.ts"
import type { Component, Decision, Skin, Tokens } from "./schema.ts"

const root = path.resolve(import.meta.dirname, "..")
const sandbox = path.resolve(root, "../../apps/sandbox")
const uiDir = path.join(sandbox, "src/components/ui")
const outDir = path.join(root, "dist")
const check = process.argv.includes("--check")

const project = new Project({ tsConfigFilePath: path.join(sandbox, "tsconfig.app.json"), skipAddingFilesFromTsConfig: true })
fs.readdirSync(uiDir).filter((f) => f.endsWith(".tsx")).forEach((f) => project.addSourceFileAtPath(path.join(uiDir, f)))

const pascal = (s: string) => s.split("-").map((p) => p[0].toUpperCase() + p.slice(1)).join(" ")
const stripQuotes = (s: string) => s.replace(/^["'`]|["'`]$/g, "")

function extractCva(sf: SourceFile) {
  const variants: Record<string, string[]> = {}
  const defaults: Record<string, string> = {}
  for (const call of sf.getDescendantsOfKind(SyntaxKind.CallExpression)) {
    if (call.getExpression().getText() !== "cva") continue
    const cfg = call.getArguments()[1]
    if (!cfg || !Node.isObjectLiteralExpression(cfg)) continue
    const v = cfg.getProperty("variants")
    if (v && Node.isPropertyAssignment(v)) {
      const init = v.getInitializer()
      if (init && Node.isObjectLiteralExpression(init)) {
        for (const group of init.getProperties()) {
          if (!Node.isPropertyAssignment(group)) continue
          const gi = group.getInitializer()
          if (gi && Node.isObjectLiteralExpression(gi)) {
            variants[stripQuotes(group.getName())] = gi.getProperties().filter(Node.isPropertyAssignment).map((p) => stripQuotes(p.getName()))
          }
        }
      }
    }
    const d = cfg.getProperty("defaultVariants")
    if (d && Node.isPropertyAssignment(d)) {
      const init = d.getInitializer()
      if (init && Node.isObjectLiteralExpression(init)) {
        for (const p of init.getProperties()) if (Node.isPropertyAssignment(p)) defaults[p.getName()] = stripQuotes(p.getInitializer()?.getText() ?? "")
      }
    }
  }
  return { variants, defaults }
}

const KEEP_FROM_LIB = new Set(["className", "children", "disabled", "type", "value", "defaultValue", "id", "htmlFor", "placeholder", "rows"])

function extractProps(sf: SourceFile) {
  const out: Component["props"] = {}
  for (const fn of sf.getFunctions()) {
    const name = fn.getName()
    if (!name || !/^[A-Z]/.test(name)) continue
    const param = fn.getParameters()[0]
    if (!param) continue
    const type = param.getType()
    const props = []
    for (const sym of type.getProperties()) {
      const decls = sym.getDeclarations()
      const fromLib = decls.length > 0 && decls.every((d) => /node_modules[\\/](@types[\\/]react|typescript)|lib\.dom/.test(d.getSourceFile().getFilePath()))
      if (fromLib && !KEEP_FROM_LIB.has(sym.getName())) continue
      const ptype = sym.getTypeAtLocation(param).getText(param, TypeFormatFlags.NoTruncation).replace(/import\("[^"]*"\)\.?/g, "")
      const short = ptype.length > 120 ? ptype.slice(0, 117) + "..." : ptype
      const doc = sym.compilerSymbol.getDocumentationComment(undefined).map((d) => d.text).join(" ").trim()
      props.push({ name: sym.getName(), type: short, required: !sym.isOptional(), description: doc || undefined })
    }
    out[name] = props
  }
  return out
}

function buildComponents(): Component[] {
  const components: Component[] = []
  for (const sf of project.getSourceFiles()) {
    const slug = path.basename(sf.getFilePath(), ".tsx")
    const exports = [...sf.getExportedDeclarations().keys()].filter((n) => /^[A-Z]/.test(n))
    const slots = [
      ...new Set(
        sf
          .getDescendantsOfKind(SyntaxKind.JsxAttribute)
          .filter((a) => a.getNameNode().getText() === "data-slot")
          .map((a) => (a.getInitializer()?.getText() ?? "").replace(/^[{"']+|[}"']+$/g, "")),
      ),
    ]
    const { variants, defaults } = extractCva(sf)
    const overlayPath = path.join(root, "overlays", `${slug}.json`)
    const overlay = fs.existsSync(overlayPath) ? JSON.parse(fs.readFileSync(overlayPath, "utf8")) : {}
    components.push(
      ComponentSchema.parse({
        name: pascal(slug),
        slug,
        file: `src/components/ui/${slug}.tsx`,
        install: `pnpm dlx shadcn@latest add ${slug}`,
        import: `import { ${exports.join(", ")} } from "@/components/ui/${slug}"`,
        exports,
        slots,
        variants,
        defaultVariants: defaults,
        props: extractProps(sf),
        ...overlay,
      }),
    )
  }
  return components.sort((a, b) => a.slug.localeCompare(b.slug))
}

function parseVars(block: string) {
  const vars: Record<string, string> = {}
  for (const m of block.matchAll(/--([\w-]+):\s*([^;]+);/g)) vars[m[1]] = m[2].trim()
  return vars
}

function buildTokens(): Tokens {
  // Read from split skin files instead of the monolithic index.css
  const defaultCss = fs.readFileSync(path.join(sandbox, "src/styles/skins/default.css"), "utf8")
  const foundationsCss = fs.readFileSync(path.join(sandbox, "src/styles/foundations.css"), "utf8")
  // :root or [data-skin="default"] block = light tokens
  const rootBlock = defaultCss.match(/:root[^{]*\{([\s\S]*?)\n\}/)?.[1] ?? ""
  // .dark block = dark tokens
  const darkBlock = defaultCss.match(/\.dark[^{]*\{([\s\S]*?)\n\}/)?.[1] ?? ""
  const themeBlock = foundationsCss.match(/@theme inline\s*\{([\s\S]*?)\n\s*\}/)?.[1] ?? ""
  const light = parseVars(rootBlock)
  const dark = parseVars(darkBlock)
  const theme = parseVars(themeBlock)
  const colors: Tokens["colors"] = {}
  for (const k of Object.keys(light)) if (k !== "radius") colors[k] = { light: light[k], dark: dark[k] }
  const semanticColorClasses = Object.keys(theme).filter((k) => k.startsWith("color-")).map((k) => k.slice(6)).sort()
  const radius = Object.fromEntries(Object.entries(theme).filter(([k]) => k.startsWith("radius-")))
  radius.base = light.radius
  const fonts = Object.fromEntries(Object.entries(theme).filter(([k]) => k.startsWith("font-")))
  return TokensSchema.parse({
    colors,
    semanticColorClasses,
    radius,
    fonts,
    spacingScale: ["0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "5", "6", "7", "8", "9", "10", "11", "12", "14", "16", "20", "24", "28", "32", "36", "40", "44", "48", "52", "56", "60", "64", "72", "80", "96", "px"],
    fontSizeScale: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"],
    fontWeights: ["normal", "medium", "semibold", "bold"],
  })
}

function buildDecisions(): Decision[] {
  const base = path.join(root, "decisions")
  const files: { file: string; skin?: string }[] = []

  // System-wide rules
  const systemDir = path.join(base, "system")
  if (fs.existsSync(systemDir)) {
    for (const f of fs.readdirSync(systemDir).filter((f) => f.endsWith(".md")).sort())
      files.push({ file: path.join(systemDir, f) })
  } else {
    // Fallback: flat decisions/ for backwards compat during migration
    for (const f of fs.readdirSync(base).filter((f) => f.endsWith(".md")).sort())
      files.push({ file: path.join(base, f) })
  }

  // Skin-specific rules: decisions/skins/<skin>/*.md
  const skinsDir = path.join(base, "skins")
  if (fs.existsSync(skinsDir)) {
    for (const skin of fs.readdirSync(skinsDir).sort()) {
      const skinDir = path.join(skinsDir, skin)
      if (!fs.statSync(skinDir).isDirectory()) continue
      for (const f of fs.readdirSync(skinDir).filter((f) => f.endsWith(".md")).sort())
        files.push({ file: path.join(skinDir, f), skin })
    }
  }

  return files.map(({ file, skin }) => {
    const { data, content } = matter(fs.readFileSync(file, "utf8"))
    return DecisionSchema.parse({ ...data, skin: data.skin ?? skin, body: content.trim() })
  })
}

function buildSkins(decisions: Decision[]): Skin[] {
  const skinsDir = path.join(root, "skins")
  if (!fs.existsSync(skinsDir)) return []
  return fs
    .readdirSync(skinsDir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => {
      const data = JSON.parse(fs.readFileSync(path.join(skinsDir, f), "utf8"))
      const skinDecisions = decisions.filter((d) => d.skin === data.slug).map((d) => d.id)
      return SkinSchema.parse({ ...data, decisions: skinDecisions })
    })
}

function buildPatterns() {
  const dir = path.join(root, "patterns")
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md")).sort().map((f) => {
    const { data, content } = matter(fs.readFileSync(path.join(dir, f), "utf8"))
    return { slug: f.replace(/\.md$/, ""), title: data.title ?? f, summary: data.summary ?? "", body: content.trim() }
  })
}

const components = buildComponents()
const tokens = buildTokens()
const decisions = buildDecisions()
const patterns = buildPatterns()
const skins = buildSkins(decisions)

if (new Set(decisions.map((d) => d.id)).size !== decisions.length) throw new Error("Duplicate decision id")
for (const c of components) {
  for (const id of c.relatedDecisions) if (!decisions.some((d) => d.id === id)) throw new Error(`${c.slug} references unknown ${id}`)
}

const files: Record<string, unknown> = {
  "index.json": {
    components: components.map((c) => ({ slug: c.slug, name: c.name, exports: c.exports })),
    decisions: decisions.map((d) => ({ id: d.id, title: d.title, severity: d.severity })),
    patterns: patterns.map((p) => ({ slug: p.slug, title: p.title })),
    skins: skins.map((s) => ({ slug: s.slug, name: s.name, modes: s.modes })),
  },
  "tokens.json": tokens,
  "decisions.json": decisions,
  "patterns.json": patterns,
  "skins.json": skins,
  "components.json": components,
  ...Object.fromEntries(components.map((c) => [`components/${c.slug}.json`, c])),
}

let drift = false
for (const [rel, data] of Object.entries(files)) {
  const target = path.join(outDir, rel)
  const text = JSON.stringify(data, null, 2) + "\n"
  if (check) {
    if (!fs.existsSync(target) || fs.readFileSync(target, "utf8") !== text) {
      console.error(`DRIFT: ${rel}`)
      drift = true
    }
  } else {
    fs.mkdirSync(path.dirname(target), { recursive: true })
    fs.writeFileSync(target, text)
  }
}
if (check && drift) process.exit(1)
if (!check) {
  const publicDir = path.join(sandbox, "public/registry")
  fs.rmSync(publicDir, { recursive: true, force: true })
  fs.cpSync(outDir, publicDir, { recursive: true })
}
console.log(`${check ? "checked" : "wrote"} ${components.length} components, ${decisions.length} decisions, ${patterns.length} patterns, ${skins.length} skins`)
