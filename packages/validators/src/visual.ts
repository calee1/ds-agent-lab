import fs from "node:fs"
import path from "node:path"
import { chromium } from "playwright"
import pixelmatch from "pixelmatch"
import { PNG } from "pngjs"
import type { Violation } from "./lint.ts"

const root = path.resolve(import.meta.dirname, "../../..")
export const baselineDir = path.join(root, "baselines")
const decisions: { id: string; severity: "error" | "warn"; enforcement: { ref: string } }[] = JSON.parse(fs.readFileSync(path.join(root, "packages/registry/dist/decisions.json"), "utf8"))
const dr = decisions.find((d) => d.enforcement.ref === "visual/baseline")!

export const MAX_DIFF_RATIO = 0.001

export function diffImages(a: Buffer, b: Buffer): { ratio: number; diff?: Buffer } {
  const pa = PNG.sync.read(a)
  const pb = PNG.sync.read(b)
  if (pa.width !== pb.width || pa.height !== pb.height) return { ratio: 1 }
  const diff = new PNG({ width: pa.width, height: pa.height })
  const changed = pixelmatch(pa.data, pb.data, diff.data, pa.width, pa.height, { threshold: 0.1 })
  return { ratio: changed / (pa.width * pa.height), diff: PNG.sync.write(diff) }
}

export async function visualChecks(baseUrl: string, update = false): Promise<Violation[]> {
  const violations: Violation[] = []
  const outDir = path.join(root, "reports/_visual")
  fs.mkdirSync(baselineDir, { recursive: true })
  fs.mkdirSync(outDir, { recursive: true })
  const browser = await chromium.launch()
  try {
    for (const theme of ["light", "dark"] as const) {
      const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, colorScheme: theme, reducedMotion: "reduce" })
      await context.addInitScript((t: string) => {
        const apply = () => document.documentElement?.classList.toggle("dark", t === "dark")
        apply()
        document.addEventListener("DOMContentLoaded", apply)
      }, theme)
      const page = await context.newPage()
      await page.goto(`${baseUrl}/gallery`, { waitUntil: "networkidle" })
      await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}" })
      await page.evaluate(() => document.fonts.ready)
      const shot = await page.screenshot({ fullPage: true })
      const file = path.join(baselineDir, `gallery-${theme}.png`)
      const where = `gallery @desktop/${theme}`
      if (update) {
        fs.writeFileSync(file, shot)
      } else if (!fs.existsSync(file)) {
        violations.push({ drId: dr.id, ruleId: "visual/baseline", severity: dr.severity, file: where, line: 0, message: "No baseline. Run `pnpm visual --update` after reviewing the gallery." })
      } else {
        const { ratio, diff } = diffImages(fs.readFileSync(file), shot)
        if (ratio > MAX_DIFF_RATIO) {
          if (diff) fs.writeFileSync(path.join(outDir, `gallery-${theme}-diff.png`), diff)
          fs.writeFileSync(path.join(outDir, `gallery-${theme}-actual.png`), shot)
          violations.push({ drId: dr.id, ruleId: "visual/baseline", severity: dr.severity, file: where, line: 0, message: `${(ratio * 100).toFixed(2)}% of pixels differ from the baseline (limit ${MAX_DIFF_RATIO * 100}%). See reports/_visual.` })
        }
      }
      await context.close()
    }
  } finally {
    await browser.close()
  }
  return violations
}
