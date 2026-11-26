import assert from "node:assert/strict"
import path from "node:path"
import { after, before, test } from "node:test"
import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js"

let client: Client

before(async () => {
  client = new Client({ name: "test", version: "0.0.0" })
  await client.connect(new StdioClientTransport({ command: process.execPath, args: [path.resolve(import.meta.dirname, "../src/server.ts")] }))
})
after(() => client.close())

const call = async (name: string, args: Record<string, unknown> = {}) => {
  const r = (await client.callTool({ name, arguments: args })) as { isError?: boolean; content: { text: string }[] }
  return { isError: !!r.isError, data: r.content[0].text }
}

test("lists all eight tools", async () => {
  const { tools } = await client.listTools()
  assert.deepEqual(tools.map((t) => t.name).sort(), ["get_component", "get_pattern", "get_skin", "get_tokens", "list_components", "list_skins", "search_decisions", "validate_code"])
})

test("get_component returns Button variants matching source", async () => {
  const { data } = await call("get_component", { name: "button" })
  const c = JSON.parse(data)
  assert.deepEqual(c.variants.variant, ["default", "outline", "secondary", "ghost", "destructive", "link"])
  assert.equal(c.defaultVariants.size, "default")
  assert.match(c.import, /@\/components\/ui\/button/)
})

test("get_component rejects unknown names with the available list", async () => {
  const r = await call("get_component", { name: "nope" })
  assert.ok(r.isError)
  assert.match(r.data, /Available:.*button/)
})

test("get_tokens exposes semantic colors", async () => {
  const t = JSON.parse((await call("get_tokens")).data)
  assert.ok(t.semanticColorClasses.includes("muted-foreground"))
})

test("search_decisions filters by scope and severity", async () => {
  const hits = JSON.parse((await call("search_decisions", { scope: "button", severity: "error" })).data)
  assert.ok(hits.some((d: { id: string }) => d.id === "DR-0008"))
  assert.ok(hits.every((d: { severity: string }) => d.severity === "error"))
})

test("validate_code maps violations to decision records", async () => {
  const bad = `export default () => <div style={{ color: "red" }} className="bg-gray-100 mt-[13px]"><button>x</button></div>`
  const r = JSON.parse((await call("validate_code", { code: bad })).data)
  assert.equal(r.ok, false)
  const ids = new Set(r.violations.map((v: { drId: string }) => v.drId))
  for (const id of ["DR-0001", "DR-0002", "DR-0003", "DR-0004"]) assert.ok(ids.has(id), `missing ${id}`)
})

test("validate_code passes clean code", async () => {
  const good = `import { Button } from "@/components/ui/button"\nexport default () => <div className="bg-background p-4"><Button>Save</Button></div>`
  assert.equal(JSON.parse((await call("validate_code", { code: good })).data).ok, true)
})

test("get_pattern lists and fetches", async () => {
  const list = JSON.parse((await call("get_pattern")).data)
  assert.ok(list.some((p: { slug: string }) => p.slug === "form-field"))
  assert.match((await call("get_pattern", { name: "form-field" })).data, /htmlFor/)
})

test("list_skins returns all three skins", async () => {
  const skins = JSON.parse((await call("list_skins")).data)
  const slugs = skins.map((s: { slug: string }) => s.slug)
  assert.deepEqual(slugs.sort(), ["branded", "default", "wireframe"])
})

test("list_skins summary has no cssFile or font fields", async () => {
  const skins = JSON.parse((await call("list_skins")).data)
  for (const s of skins) {
    assert.ok(!("cssFile" in s), `${s.slug} summary should not expose cssFile`)
    assert.ok(!("font" in s), `${s.slug} summary should not expose font`)
  }
})

test("get_skin returns full wireframe record (light only, square radius)", async () => {
  const s = JSON.parse((await call("get_skin", { slug: "wireframe" })).data)
  assert.deepEqual(s.modes, ["light"])
  assert.equal(s.radius, "0rem")
  assert.ok(s.cssFile.includes("wireframe"))
})

test("get_skin returns full branded record (both modes, Nunito)", async () => {
  const s = JSON.parse((await call("get_skin", { slug: "branded" })).data)
  assert.deepEqual(s.modes, ["light", "dark"])
  assert.equal(s.font, "Nunito Variable")
  assert.equal(s.radius, "1rem")
})

test("get_skin rejects unknown slug with available list", async () => {
  const r = await call("get_skin", { slug: "nope" })
  assert.ok(r.isError)
  assert.match(r.data, /Available:.*default/)
})
