import { buildSandbox, startPreview } from "./server.ts"
import { visualChecks } from "./visual.ts"

const update = process.argv.includes("--update")
const build = buildSandbox()
if (!build.ok) {
  console.error(build.output)
  process.exit(1)
}
const server = await startPreview()
try {
  const violations = await visualChecks(server.url, update)
  if (update) console.log("Baselines updated. Review baselines/*.png before committing.")
  for (const v of violations) console.log(`[${v.severity}] ${v.drId} ${v.file}: ${v.message}`)
  if (!update && violations.length === 0) console.log("Visual baselines match.")
  process.exitCode = violations.some((v) => v.severity === "error") ? 1 : 0
} finally {
  server.stop()
}
