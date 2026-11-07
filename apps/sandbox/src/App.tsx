import { lazy, Suspense } from "react"

type Loader = () => Promise<{ default: React.ComponentType }>

const routes = import.meta.glob("./routes/*/index.tsx") as Record<string, Loader>
const fixtures = import.meta.glob("./fixtures/*/index.tsx") as Record<string, Loader>

function resolve(pathname: string) {
  const slug = pathname.replace(/^\/+|\/+$/g, "") || "home"
  const fixture = slug.match(/^__fixtures\/([\w-]+)$/)
  const loader = fixture ? fixtures[`./fixtures/${fixture[1]}/index.tsx`] : routes[`./routes/${slug}/index.tsx`]
  return loader ? lazy(loader) : null
}

export default function App() {
  const Page = resolve(window.location.pathname)
  if (!Page) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <main className="mx-auto max-w-screen-xl space-y-2 px-4 py-8">
          <h1 className="text-2xl font-bold tracking-tight">Route not found</h1>
          <p className="text-sm text-muted-foreground">Add src/routes/&lt;slug&gt;/index.tsx.</p>
        </main>
      </div>
    )
  }
  return (
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  )
}
