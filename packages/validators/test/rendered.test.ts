import assert from "node:assert/strict"
import path from "node:path"
import { after, before, test } from "node:test"
import { renderedChecks } from "../src/rendered.ts"
import { buildSandbox, startPreview } from "../src/server.ts"

let server: Awaited<ReturnType<typeof startPreview>>
const shots = path.resolve(import.meta.dirname, "../../../reports/_test")

before(async () => {
  const build = buildSandbox()
  assert.ok(build.ok, build.output)
  server = await startPreview(4174)
})
after(() => server?.stop())

const run = async (name: string) => {
  const r = await renderedChecks(server.url, `/__fixtures/${name}`, name, path.join(shots, name))
  return [...new Set(r.violations.map((v) => v.drId))].sort()
}

test("good-page passes every rendered check", async () => {
  assert.deepEqual(await run("good-page"), [])
})

const expectations: Record<string, string> = {
  "bad-overflow": "DR-0009",
  "bad-contrast": "DR-0010",
  "bad-token-color": "DR-0011",
  "bad-multi-primary": "DR-0012",
  "bad-console": "DR-0015",
}

for (const [name, dr] of Object.entries(expectations)) {
  test(`${name} fails with ${dr}`, async () => {
    const ids = await run(name)
    assert.ok(ids.includes(dr), `expected ${dr} in ${JSON.stringify(ids)}`)
  })
}
