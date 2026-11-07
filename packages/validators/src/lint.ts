import fs from "node:fs"
import path from "node:path"
import { Linter } from "eslint"
import * as parser from "@typescript-eslint/parser"
import jsxA11y from "eslint-plugin-jsx-a11y"
import { plugin } from "./rules.ts"

export type Violation = {
  drId: string
  ruleId: string
  severity: "error" | "warn"
  file: string
  line: number
  message: string
}

const decisionsPath = path.resolve(import.meta.dirname, "../../registry/dist/decisions.json")
const decisions: { id: string; severity: "error" | "warn"; enforcement: { type: string; ref: string } }[] = JSON.parse(fs.readFileSync(decisionsPath, "utf8"))
const byRef = new Map(decisions.filter((d) => d.status !== "superseded").map((d) => [d.enforcement.ref, d]))
const A11Y_DR = decisions.find((d) => d.enforcement.ref === "a11y/axe")

const ds = "ds"
const ruleConfig: Record<string, any> = {}
for (const id of Object.keys(plugin.rules)) ruleConfig[`${ds}/${id}`] = "error"
for (const id of ["alt-text", "anchor-is-valid", "aria-props", "aria-role", "aria-proptypes", "role-has-required-aria-props", "no-autofocus", "heading-has-content", "html-has-lang", "click-events-have-key-events", "no-static-element-interactions"]) {
  ruleConfig[`jsx-a11y/${id}`] = "error"
}

const linter = new Linter({ configType: "flat" })
const config: any[] = [
  {
    files: ["**/*.tsx", "**/*.ts"],
    languageOptions: { parser, parserOptions: { ecmaFeatures: { jsx: true }, sourceType: "module" } },
    plugins: { ds: plugin, "jsx-a11y": jsxA11y },
    rules: ruleConfig,
  },
]

export function lintCode(code: string, file = "snippet.tsx"): Violation[] {
  const messages = linter.verify(code, config, { filename: "lint-target.tsx" })
  return messages.map((m) => {
    const ruleId = m.ruleId ?? "parse-error"
    const dr = ruleId.startsWith("jsx-a11y/") ? A11Y_DR : byRef.get(ruleId)
    return {
      drId: dr?.id ?? "UNMAPPED",
      ruleId,
      severity: dr?.severity ?? "error",
      file,
      line: m.line,
      message: m.message,
    }
  })
}

export function lintFiles(files: string[]): Violation[] {
  return files.flatMap((f) => lintCode(fs.readFileSync(f, "utf8"), f))
}
