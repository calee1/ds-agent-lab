import { spawn, spawnSync, type ChildProcess } from "node:child_process"
import path from "node:path"

export const sandboxDir = path.resolve(import.meta.dirname, "../../../apps/sandbox")
const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm"

export function buildSandbox(): { ok: boolean; output: string } {
  const run = (args: string[]) => spawnSync(pnpm, args, { cwd: sandboxDir, encoding: "utf8", shell: process.platform === "win32" })
  const tsc = run(["exec", "tsc", "-b"])
  if (tsc.status !== 0) return { ok: false, output: `tsc failed:\n${tsc.stdout}${tsc.stderr}` }
  const vite = run(["exec", "vite", "build"])
  return { ok: vite.status === 0, output: vite.status === 0 ? "" : `vite build failed:\n${vite.stdout}${vite.stderr}` }
}

export async function startPreview(port = 4173): Promise<{ url: string; stop: () => void }> {
  const proc: ChildProcess = spawn(pnpm, ["exec", "vite", "preview", "--port", String(port), "--strictPort"], { cwd: sandboxDir, shell: process.platform === "win32", stdio: "ignore" })
  const url = `http://localhost:${port}`
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(url)
      if (r.ok) break
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 250))
  }
  return {
    url,
    stop: () => {
      if (process.platform === "win32" && proc.pid) spawnSync("taskkill", ["/pid", String(proc.pid), "/T", "/F"])
      else proc.kill()
    },
  }
}
