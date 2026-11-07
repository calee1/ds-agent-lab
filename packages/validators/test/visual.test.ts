import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import { after, before, test } from "node:test"
import { PNG } from "pngjs"
import { buildSandbox, startPreview } from "../src/server.ts"
import { baselineDir, diffImages, MAX_DIFF_RATIO, visualChecks } from "../src/visual.ts"

let server: Awaited<ReturnType<typeof startPreview>>
before(async () => {
  assert.ok(buildSandbox().ok)
  server = await startPreview(4175)
})
after(() => server?.stop())

test("gallery matches committed baselines", async () => {
  assert.deepEqual(await visualChecks(server.url), [])
})

test("a changed component is reported as a DR-0016 violation", () => {
  const original = fs.readFileSync(path.join(baselineDir, "gallery-light.png"))
  const png = PNG.sync.read(original)
  for (let y = 100; y < 220; y++) for (let x = 20; x < 420; x++) {
    const i = (png.width * y + x) << 2
    png.data[i] = 255
    png.data[i + 1] = 0
    png.data[i + 2] = 0
  }
  const { ratio } = diffImages(original, PNG.sync.write(png))
  assert.ok(ratio > MAX_DIFF_RATIO, `ratio ${ratio} should exceed the limit`)
})

test("identical images produce zero diff", () => {
  const original = fs.readFileSync(path.join(baselineDir, "gallery-dark.png"))
  assert.equal(diffImages(original, original).ratio, 0)
})
