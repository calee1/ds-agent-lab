import { lazy, Suspense, useEffect, useState } from "react"

type Loader = () => Promise<{ default: React.ComponentType }>

const routes = import.meta.glob("./routes/*/index.tsx") as Record<string, Loader>
const fixtures = import.meta.glob("./fixtures/*/index.tsx") as Record<string, Loader>

function resolve(pathname: string) {
  const slug = pathname.replace(/^\/+|\/+$/g, "") || "home"
  const fixture = slug.match(/^__fixtures\/([\w-]+)$/)
  const loader = fixture ? fixtures[`./fixtures/${fixture[1]}/index.tsx`] : routes[`./routes/${slug}/index.tsx`]
  return loader ? lazy(loader) : null
}

type Skin = "default" | "wireframe" | "branded"
type Mode = "light" | "dark"

function useSkinSwitcher() {
  const [skin, setSkin] = useState<Skin>(() => (localStorage.getItem("skin") as Skin) ?? "default")
  const [mode, setMode] = useState<Mode>(() => (localStorage.getItem("mode") as Mode) ?? "light")

  useEffect(() => {
    document.documentElement.setAttribute("data-skin", skin)
    localStorage.setItem("skin", skin)
  }, [skin])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark")
    localStorage.setItem("mode", mode)
  }, [mode])

  return { skin, setSkin, mode, setMode }
}

function SkinSwitcher({ skin, setSkin, mode, setMode }: {
  skin: Skin; setSkin: (s: Skin) => void
  mode: Mode; setMode: (m: Mode) => void
}) {
  return (
    <div
      style={{
        position: "fixed", bottom: "1rem", right: "1rem", zIndex: 9999,
        display: "flex", gap: "0.375rem", alignItems: "center",
        background: "var(--card)", border: "1px solid var(--border)",
        borderRadius: "var(--radius)", padding: "0.375rem 0.625rem",
        fontSize: "0.75rem", color: "var(--foreground)",
        boxShadow: "0 2px 8px oklch(0 0 0 / 12%)",
      }}
      aria-label="Skin switcher"
    >
      {(["default", "branded"] as Skin[]).map((s) => (
        <button
          key={s}
          onClick={() => setSkin(s)}
          aria-pressed={skin === s}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          style={{
            padding: "0.2rem 0.5rem",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border)",
            background: skin === s ? "var(--primary)" : "transparent",
            color: skin === s ? "var(--primary-foreground)" : "var(--foreground)",
            cursor: "pointer",
            fontFamily: "inherit", fontSize: "inherit",
          }}
        >
          {s}
        </button>
      ))}
      <div style={{ width: "1px", height: "1rem", background: "var(--border)" }} aria-hidden />
      {(["light", "dark"] as Mode[]).map((m) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          aria-pressed={mode === m}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          style={{
            padding: "0.2rem 0.5rem",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border)",
            background: mode === m ? "var(--primary)" : "transparent",
            color: mode === m ? "var(--primary-foreground)" : "var(--foreground)",
            cursor: "pointer",
            fontFamily: "inherit", fontSize: "inherit",
          }}
        >
          {m}
        </button>
      ))}
      <div style={{ width: "1px", height: "1rem", background: "var(--border)" }} aria-hidden />
      <button
        onClick={() => setSkin("wireframe")}
        aria-pressed={skin === "wireframe"}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        style={{
          padding: "0.2rem 0.5rem",
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--border)",
          background: skin === "wireframe" ? "var(--primary)" : "transparent",
          color: skin === "wireframe" ? "var(--primary-foreground)" : "var(--foreground)",
          cursor: "pointer",
          fontFamily: "inherit", fontSize: "inherit",
        }}
      >
        wireframe
      </button>
    </div>
  )
}

export default function App() {
  const { skin, setSkin, mode, setMode } = useSkinSwitcher()
  const hideSwitcher = ["/" , "/hax-demo"].includes(window.location.pathname)
  const Page = resolve(window.location.pathname)
  if (!Page) {
    return (
      <>
        <div className="min-h-screen bg-background text-foreground">
          <main className="mx-auto max-w-screen-xl space-y-2 px-4 py-8">
            <h1 className="text-2xl font-bold tracking-tight">Route not found</h1>
            <p className="text-sm text-muted-foreground">Add src/routes/&lt;slug&gt;/index.tsx.</p>
          </main>
        </div>
        {!hideSwitcher && <SkinSwitcher skin={skin} setSkin={setSkin} mode={mode} setMode={setMode} />}
      </>
    )
  }
  return (
    <>
      <Suspense fallback={null}>
        <Page />
      </Suspense>
      {!hideSwitcher && <SkinSwitcher skin={skin} setSkin={setSkin} mode={mode} setMode={setMode} />}
    </>
  )
}
