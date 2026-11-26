import fs from "node:fs"
import path from "node:path"
import AxeBuilder from "@axe-core/playwright"
import { chromium, type Page } from "playwright"
import type { Violation } from "./lint.ts"

const registryDist = path.resolve(import.meta.dirname, "../../registry/dist")
const tokens = JSON.parse(fs.readFileSync(path.join(registryDist, "tokens.json"), "utf8"))
const decisions: { id: string; severity: "error" | "warn"; enforcement: { ref: string } }[] = JSON.parse(fs.readFileSync(path.join(registryDist, "decisions.json"), "utf8"))
const dr = (ref: string) => decisions.find((d) => d.enforcement.ref === ref)!

export const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 800 },
] as const
export const MODES = ["light", "dark"] as const
export const SKINS = ["default", "wireframe", "branded"] as const
/** Supported skin × mode combos — wireframe is light-only */
export const THEMES = ["default-light", "default-dark", "wireframe-light", "branded-light", "branded-dark"] as const as unknown as readonly string[]

export type RenderedResult = { violations: Violation[]; screenshots: string[] }

function make(ref: string, ruleId: string, file: string, message: string): Violation {
  const d = dr(ref)
  return { drId: d.id, ruleId, severity: d.severity, file, line: 0, message }
}

async function keyboardFocusIssues(page: Page): Promise<string[]> {
  // Reset to a known starting point
  await page.evaluate(() => { (document.body as HTMLElement).focus?.() })
  const issues: string[] = []
  for (let i = 0; i < 15; i++) {
    await page.keyboard.press("Tab")
    const result = await page.evaluate((): string | null => {
      const el = document.activeElement as HTMLElement | null
      if (!el || el === document.body || el === document.documentElement) return null
      const s = getComputedStyle(el)
      const hasOutline = parseFloat(s.outlineWidth) > 0 && s.outlineStyle !== "none"
      const hasRing = s.boxShadow !== "none" && s.boxShadow !== ""
      if (!hasOutline && !hasRing) {
        const id = el.id ? `#${el.id}` : ""
        const label = el.getAttribute("aria-label")?.slice(0, 20) ?? el.textContent?.trim().slice(0, 20) ?? ""
        return `${el.tagName.toLowerCase()}${id}${label ? `(${label})` : ""}`
      }
      return "ok"
    })
    if (result === null) break
    if (result !== "ok") issues.push(`${result} has no visible focus indicator`)
  }
  return issues.slice(0, 5)
}

async function tokenColorIssues(page: Page): Promise<string[]> {
  const names = Object.keys(tokens.colors)
  return page.evaluate((names: string[]) => {
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = 1
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!
    const rgba = (css: string) => {
      ctx.clearRect(0, 0, 1, 1)
      ctx.fillStyle = "#000"
      ctx.fillStyle = css
      ctx.fillRect(0, 0, 1, 1)
      const d = ctx.getImageData(0, 0, 1, 1).data
      return [d[0], d[1], d[2], d[3]]
    }
    const rootStyle = getComputedStyle(document.documentElement)
    const palette = new Set<string>()
    for (const n of names) {
      const v = rootStyle.getPropertyValue(`--${n}`).trim()
      if (!v) continue
      const [r, g, b, a] = rgba(v)
      if (a === 255) palette.add(`${r},${g},${b}`)
    }
    const issues = new Set<string>()
    const label = (el: Element) => `${el.tagName.toLowerCase()}${el.className && typeof el.className === "string" ? "." + el.className.split(/\s+/).slice(0, 3).join(".") : ""}`
    const check = (el: Element, prop: string, css: string) => {
      const [r, g, b, a] = rgba(css)
      if (a < 255) return
      if (!palette.has(`${r},${g},${b}`)) issues.add(`${label(el)} ${prop}: rgb(${r}, ${g}, ${b}) is not a token color`)
    }
    const all = Array.from(document.body.querySelectorAll("*")).slice(0, 2000)
    for (const el of all) {
      const cs = getComputedStyle(el)
      const rect = el.getBoundingClientRect()
      if (cs.display === "none" || cs.visibility === "hidden" || rect.width === 0 || rect.height === 0) continue
      if (["SCRIPT", "STYLE", "SVG", "PATH"].includes(el.tagName.toUpperCase())) continue
      const hasText = Array.from(el.childNodes).some((n) => n.nodeType === 3 && (n.textContent ?? "").trim())
      if (hasText) check(el, "color", cs.color)
      if (cs.backgroundColor !== "rgba(0, 0, 0, 0)") check(el, "background-color", cs.backgroundColor)
      if (parseFloat(cs.borderTopWidth) > 0 && cs.borderTopStyle !== "none") check(el, "border-color", cs.borderTopColor)
    }
    return Array.from(issues).slice(0, 10)
  }, names)
}

export async function renderedChecks(baseUrl: string, routePath: string, label: string, shotDir: string): Promise<RenderedResult> {
  const violations: Violation[] = []
  const screenshots: string[] = []
  const seen = new Set<string>()
  const push = (v: Violation) => {
    const key = `${v.ruleId}|${v.message}`
    if (!seen.has(key)) {
      seen.add(key)
      violations.push(v)
    }
  }
  fs.mkdirSync(shotDir, { recursive: true })
  const browser = await chromium.launch()
  try {
    for (const theme of THEMES) {
      const [skin, mode] = theme.split("-") as [string, string]
      const isDark = mode === "dark"
      for (const vp of VIEWPORTS) {
        const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, colorScheme: isDark ? "dark" : "light" })
        await context.addInitScript(({ skin, isDark }: { skin: string; isDark: boolean }) => {
          const apply = () => {
            document.documentElement?.classList.toggle("dark", isDark)
            document.documentElement?.setAttribute("data-skin", skin)
          }
          apply()
          document.addEventListener("readystatechange", apply)
          document.addEventListener("DOMContentLoaded", apply)
        }, { skin, isDark })
        const page = await context.newPage()
        const where = `${label} @${vp.name}/${theme}`
        const consoleErrors: string[] = []
        page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()))
        page.on("pageerror", (e) => consoleErrors.push(String(e.message)))
        page.on("requestfailed", (r) => consoleErrors.push(`request failed: ${r.url()}`))
        page.on("response", (r) => r.status() >= 400 && consoleErrors.push(`HTTP ${r.status()}: ${r.url()}`))
        await page.goto(baseUrl + routePath, { waitUntil: "networkidle" })
        await page.waitForTimeout(150)

        for (const e of consoleErrors) push(make("runtime/no-console-errors", "runtime/no-console-errors", where, e))

        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
        if (overflow > 0) push(make("layout/no-h-overflow", "layout/no-h-overflow", where, `Page scrolls horizontally by ${overflow}px.`))

        if (vp.name === "desktop") {
          const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()
          for (const v of axe.violations.filter((x) => x.impact === "serious" || x.impact === "critical")) {
            push(make("a11y/axe", `axe/${v.id}`, where, `${v.help} (${v.nodes.length} node${v.nodes.length === 1 ? "" : "s"}, ${v.nodes[0]?.target.join(" ")})`))
          }
          for (const msg of await tokenColorIssues(page)) push(make("theme/token-colors", "theme/token-colors", where, msg))
          for (const msg of await keyboardFocusIssues(page)) push(make("keyboard/focus-ring", "keyboard/focus-ring", where, msg))

          const primaries = await page.evaluate(
            () => Array.from(document.querySelectorAll('[data-slot="button"]')).filter((el) => /(^|\s)bg-primary(\s|$)/.test(el.className) && !el.closest('[role="dialog"],[role="alertdialog"]')).length,
          )
          if (primaries > 1) push(make("ui/single-primary", "ui/single-primary", where, `${primaries} default-variant Buttons in one view.`))
        }

        const shot = path.join(shotDir, `${vp.name}-${theme}.png`)
        await page.screenshot({ path: shot, fullPage: true })
        screenshots.push(shot)
        await context.close()
      }
    }
  } finally {
    await browser.close()
  }
  return { violations, screenshots }
}
