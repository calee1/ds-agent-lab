import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import { test } from "node:test"
import { lintCode } from "../src/lint.ts"

const fixtures = path.resolve(import.meta.dirname, "../../../apps/sandbox/src/fixtures")
const load = (name: string) => fs.readFileSync(path.join(fixtures, name, "index.tsx"), "utf8")
const drIds = (name: string) => [...new Set(lintCode(load(name), `${name}.tsx`).map((v) => v.drId))].sort()

test("good-page has no static violations", () => {
  assert.deepEqual(lintCode(load("good-page"), "good-page.tsx"), [])
})

const expectations: Record<string, string> = {
  "bad-raw-color": "DR-0001",
  "bad-arbitrary": "DR-0002",
  "bad-inline-style": "DR-0003",
  "bad-raw-form": "DR-0004",
  "bad-import": "DR-0005",
  "bad-spacing": "DR-0006",
  "bad-no-label": "DR-0007",
  "bad-icon-button": "DR-0008",
}

for (const [name, dr] of Object.entries(expectations)) {
  test(`${name} fails with ${dr}`, () => {
    const ids = drIds(name)
    assert.ok(ids.includes(dr), `expected ${dr} in ${JSON.stringify(ids)}`)
    assert.ok(!ids.includes("UNMAPPED"), "every violation must map to a decision record")
  })
}

test("sandbox ui components themselves are not linted as route code", () => {
  assert.ok(lintCode(`import { Button } from "@/components/ui/button"\nexport default () => <Button>ok</Button>`).length === 0)
})

test("variant prefixes and token arbitrary values are allowed", () => {
  const code = `export default () => <div className="[&_svg]:size-4 w-[var(--sidebar-width)] hover:bg-muted dark:bg-card" />`
  assert.deepEqual(lintCode(code), [])
})
