import fs from "node:fs"
import path from "node:path"
import { lintFiles, type Violation } from "./lint.ts"
import { renderedChecks } from "./rendered.ts"
import { buildReport, writeReport, type Report } from "./report.ts"
import { buildSandbox, sandboxDir, startPreview } from "./server.ts"

const args = process.argv.slice(2)
const fixture = args.includes("--fixture")
const skipBuild = args.includes("--skip-build")
const name = args.find((a) => !a.startsWith("--"))
if (!name) {
  console.error("usage: validate <route-slug> [--fixture] [--skip-build]")
  process.exit(2)
}

const srcDir = path.join(sandboxDir, "src", fixture ? "fixtures" : "routes", name)
if (!fs.existsSync(srcDir)) {
  console.error(`No such ${fixture ? "fixture" : "route"}: ${srcDir}`)
  process.exit(2)
}
const routePath = fixture ? `/__fixtures/${name}` : `/${name}`

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : /\.(tsx?|jsx?)$/.test(e.name) ? [path.join(dir, e.name)] : []))
}

const layers: Report["layers"] = []
let violations: Violation[] = []
let screenshots: string[] = []

const staticViolations = lintFiles(walk(srcDir)).map((v) => ({ ...v, file: path.relative(sandboxDir, v.file) }))
violations = violations.concat(staticViolations)
layers.push({ name: "static (eslint)", status: staticViolations.some((v) => v.severity === "error") ? "fail" : "pass", detail: `${staticViolations.length} finding(s)` })

if (skipBuild) {
  layers.push({ name: "typecheck + build", status: "skipped" })
} else {
  const build = buildSandbox()
  layers.push({ name: "typecheck + build", status: build.ok ? "pass" : "fail", detail: build.output })
  if (!build.ok) console.error(build.output)
}

if (layers.every((l) => l.status !== "fail") || fixture) {
  const buildOk = layers.find((l) => l.name === "typecheck + build")?.status !== "fail"
  if (buildOk) {
    const server = await startPreview()
    try {
      const reportDir = path.resolve(import.meta.dirname, "../../../reports", name)
      const r = await renderedChecks(server.url, routePath, name, path.join(reportDir, "screenshots"))
      violations = violations.concat(r.violations)
      screenshots = r.screenshots
      layers.push({ name: "rendered (playwright + axe)", status: r.violations.some((v) => v.severity === "error") ? "fail" : "pass", detail: `${r.violations.length} finding(s)` })
    } finally {
      server.stop()
    }
  }
} else {
  layers.push({ name: "rendered (playwright + axe)", status: "skipped", detail: "earlier layer failed" })
}

const report = buildReport(name, layers, violations, screenshots)
const outDir = path.resolve(import.meta.dirname, "../../../reports", name)
writeReport(report, outDir)
console.log(fs.readFileSync(path.join(outDir, "report.md"), "utf8"))
process.exit(report.passed ? 0 : 1)
