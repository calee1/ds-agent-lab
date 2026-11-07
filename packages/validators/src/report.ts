import fs from "node:fs"
import path from "node:path"
import type { Violation } from "./lint.ts"

const registryDist = path.resolve(import.meta.dirname, "../../registry/dist")
const decisions: { id: string; title: string; severity: string; enforcement: { type: string } }[] = JSON.parse(fs.readFileSync(path.join(registryDist, "decisions.json"), "utf8"))

export type Report = {
  target: string
  generatedAt: string
  layers: { name: string; status: "pass" | "fail" | "skipped"; detail?: string }[]
  violations: Violation[]
  screenshots: string[]
  reviewerPending: string[]
  passed: boolean
}

export function buildReport(target: string, layers: Report["layers"], violations: Violation[], screenshots: string[]): Report {
  const reviewerPending = decisions.filter((d) => d.enforcement.type === "reviewer").map((d) => d.id)
  const passed = layers.every((l) => l.status !== "fail") && !violations.some((v) => v.severity === "error")
  return { target, generatedAt: new Date().toISOString(), layers, violations, screenshots, reviewerPending, passed }
}

export function reportMarkdown(r: Report): string {
  const lines = [`# Validation report: ${r.target}`, "", `Result: **${r.passed ? "PASS" : "FAIL"}**`, "", "| Layer | Status |", "|---|---|"]
  for (const l of r.layers) lines.push(`| ${l.name} | ${l.status}${l.detail ? ` (${l.detail.split("\n")[0]})` : ""} |`)
  lines.push("", "## Decisions", "", "| DR | Title | Severity | Result |", "|---|---|---|---|")
  for (const d of decisions) {
    if (d.enforcement.type === "reviewer") {
      lines.push(`| ${d.id} | ${d.title} | ${d.severity} | reviewer pending |`)
      continue
    }
    if (d.enforcement.type === "visual") {
      lines.push(`| ${d.id} | ${d.title} | ${d.severity} | separate: run pnpm visual |`)
      continue
    }
    const hits = r.violations.filter((v) => v.drId === d.id)
    lines.push(`| ${d.id} | ${d.title} | ${d.severity} | ${hits.length ? `FAIL (${hits.length})` : "pass"} |`)
  }
  if (r.violations.length) {
    lines.push("", "## Violations", "")
    for (const v of r.violations) lines.push(`- [${v.severity}] ${v.drId} ${v.ruleId} ${v.file}${v.line ? `:${v.line}` : ""}: ${v.message}`)
  }
  if (r.screenshots.length) {
    lines.push("", "## Screenshots", "")
    for (const s of r.screenshots) lines.push(`- ${s}`)
  }
  return lines.join("\n") + "\n"
}

export function writeReport(r: Report, outDir: string) {
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, "report.json"), JSON.stringify(r, null, 2))
  fs.writeFileSync(path.join(outDir, "report.md"), reportMarkdown(r))
}
