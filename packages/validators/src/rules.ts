import fs from "node:fs"
import path from "node:path"

const registryDist = path.resolve(import.meta.dirname, "../../registry/dist")
const tokens = JSON.parse(fs.readFileSync(path.join(registryDist, "tokens.json"), "utf8"))
const SPACING = new Set<string>(tokens.spacingScale)

const PALETTE =
  "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose"
const COLOR_PREFIX = "bg|text|border|ring|fill|stroke|from|via|to|outline|divide|decoration|accent|caret|placeholder"
const RAW_COLOR = new RegExp(`^(?:${COLOR_PREFIX})-(?:(?:${PALETTE})-\\d{2,3}|white|black|\\[(?:#|rgb|hsl|oklch|color:).*)`)
const SPACING_UTIL = /^(?:-?(?:p|px|py|pt|pb|pl|pr|ps|pe|m|mx|my|mt|mb|ml|mr|ms|me|gap|gap-x|gap-y|space-x|space-y|size))-(\d+(?:\.\d+)?)$/

const ALLOWED_IMPORTS = [/^react$/, /^react-dom(\/.*)?$/, /^lucide-react$/, /^recharts$/, /^@\//, /^\.{1,2}(\/|$)/]

/** Split a Tailwind class into [variants, utility], ignoring colons inside brackets. */
function splitClass(cls: string): string {
  let depth = 0
  let last = -1
  for (let i = 0; i < cls.length; i++) {
    const c = cls[i]
    if (c === "[") depth++
    else if (c === "]") depth--
    else if (c === ":" && depth === 0) last = i
  }
  return cls.slice(last + 1).replace(/^!/, "")
}

function classIssues(raw: string): { ruleId: string; message: string }[] {
  const issues: { ruleId: string; message: string }[] = []
  for (const token of raw.split(/\s+/).filter(Boolean)) {
    const util = splitClass(token)
    if (RAW_COLOR.test(util)) {
      issues.push({ ruleId: "ds/no-raw-colors", message: `Raw color class "${token}". Use a semantic token (e.g. bg-background, text-muted-foreground).` })
      continue
    }
    if (/\[/.test(util) && !/^[a-z-]+-\[var\(--[\w-]+\)\]$/.test(util)) {
      issues.push({ ruleId: "ds/no-arbitrary-values", message: `Arbitrary value "${token}". Use the Tailwind scale or a token.` })
      continue
    }
    const m = util.replace(/^-/, "").match(SPACING_UTIL)
    if (m && !SPACING.has(m[1])) {
      issues.push({ ruleId: "ds/spacing-scale", message: `Spacing value "${token}" is off the scale (${m[1]}).` })
    }
  }
  return issues
}

const CLASS_FNS = new Set(["cn", "clsx", "cva", "twMerge"])

function collectStrings(node: any, out: { value: string; node: any }[]) {
  if (!node) return
  switch (node.type) {
    case "Literal":
      if (typeof node.value === "string") out.push({ value: node.value, node })
      break
    case "TemplateLiteral":
      for (const q of node.quasis) out.push({ value: q.value.cooked ?? "", node: q })
      for (const e of node.expressions) collectStrings(e, out)
      break
    case "ConditionalExpression":
      collectStrings(node.consequent, out)
      collectStrings(node.alternate, out)
      break
    case "LogicalExpression":
      collectStrings(node.right, out)
      break
    case "ArrayExpression":
      node.elements.forEach((e: any) => collectStrings(e, out))
      break
    case "JSXExpressionContainer":
      collectStrings(node.expression, out)
      break
    case "CallExpression":
      if (node.callee.type === "Identifier" && CLASS_FNS.has(node.callee.name)) node.arguments.forEach((a: any) => collectStrings(a, out))
      break
  }
}

const jsxName = (n: any): string => (n.type === "JSXIdentifier" ? n.name : n.type === "JSXMemberExpression" ? `${jsxName(n.object)}.${n.property.name}` : "")
const attr = (el: any, name: string) => el.attributes.find((a: any) => a.type === "JSXAttribute" && a.name.name === name)

const noClassIssues = (ruleId: string) => ({
  meta: { type: "problem", schema: [] },
  create(context: any) {
    function check(strings: { value: string; node: any }[]) {
      for (const s of strings) {
        for (const issue of classIssues(s.value)) {
          if (issue.ruleId === ruleId) context.report({ node: s.node, message: issue.message })
        }
      }
    }
    return {
      JSXAttribute(node: any) {
        if (node.name.name !== "className" || !node.value) return
        const out: { value: string; node: any }[] = []
        collectStrings(node.value, out)
        check(out)
      },
      CallExpression(node: any) {
        if (node.callee.type !== "Identifier" || !CLASS_FNS.has(node.callee.name)) return
        const out: { value: string; node: any }[] = []
        node.arguments.forEach((a: any) => collectStrings(a, out))
        check(out)
      },
    }
  },
})

export const rules: Record<string, any> = {
  "no-raw-colors": noClassIssues("ds/no-raw-colors"),
  "no-arbitrary-values": noClassIssues("ds/no-arbitrary-values"),
  "spacing-scale": noClassIssues("ds/spacing-scale"),

  "no-inline-style": {
    meta: { type: "problem", schema: [] },
    create: (context: any) => ({
      JSXAttribute(node: any) {
        if (node.name.name === "style") context.report({ node, message: "Inline style is not allowed. Use Tailwind classes." })
      },
    }),
  },

  "no-raw-form-elements": {
    meta: { type: "problem", schema: [] },
    create: (context: any) => ({
      JSXOpeningElement(node: any) {
        const name = jsxName(node.name)
        if (["button", "input", "select", "textarea"].includes(name)) {
          const map: Record<string, string> = { button: "Button", input: "Input", select: "Select", textarea: "Textarea" }
          context.report({ node, message: `Raw <${name}>. Use <${map[name]}> from @/components/ui.` })
        }
      },
    }),
  },

  "allowed-imports": {
    meta: { type: "problem", schema: [] },
    create: (context: any) => ({
      ImportDeclaration(node: any) {
        const src = String(node.source.value)
        if (!ALLOWED_IMPORTS.some((r) => r.test(src))) {
          context.report({ node, message: `Import "${src}" is not an approved dependency. Use components from @/components/ui.` })
        }
      },
    }),
  },

  "control-label": {
    meta: { type: "problem", schema: [] },
    create(context: any) {
      const controls: any[] = []
      const labelFor = new Set<string>()
      return {
        JSXOpeningElement(node: any) {
          const name = jsxName(node.name)
          if (name === "Label") {
            const f = attr(node, "htmlFor")
            if (f?.value?.type === "Literal") labelFor.add(String(f.value.value))
          }
          if (["Input", "Textarea", "Checkbox", "Switch", "SelectTrigger"].includes(name)) controls.push(node)
        },
        "Program:exit"() {
          for (const node of controls) {
            if (attr(node, "aria-label") || attr(node, "aria-labelledby")) continue
            const id = attr(node, "id")
            const idVal = id?.value?.type === "Literal" ? String(id.value.value) : null
            if (!idVal || !labelFor.has(idVal)) {
              context.report({ node, message: `<${jsxName(node.name)}> has no accessible label. Add <Label htmlFor="..."> with a matching id, or aria-label.` })
            }
          }
        },
      }
    },
  },

  "icon-button-label": {
    meta: { type: "problem", schema: [] },
    create: (context: any) => ({
      JSXElement(node: any) {
        const open = node.openingElement
        if (jsxName(open.name) !== "Button") return
        const size = attr(open, "size")
        const sizeVal = size?.value?.type === "Literal" ? String(size.value.value) : ""
        if (!sizeVal.startsWith("icon")) return
        if (attr(open, "aria-label") || attr(open, "aria-labelledby")) return
        context.report({ node: open, message: "Icon-only Button needs aria-label." })
      },
    }),
  },
}

export const plugin = { rules }
export { classIssues }
