import {
  Home,
  Search,
  Settings,
  Bell,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Plus,
  Pencil,
  Trash2,
  Check,
  User,
  Mail,
  Lock,
  Eye,
  Download,
  LogOut,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";

// ── Typography ──────────────────────────────────────────────────────────────

const TYPOGRAPHY_ROWS = [
  { label: "4xl / bold",    sampleClass: "text-4xl font-bold",    codeStr: "text-4xl font-bold" },
  { label: "4xl / normal",  sampleClass: "text-4xl font-normal",  codeStr: "text-4xl font-normal" },
  { label: "3xl / bold",    sampleClass: "text-3xl font-bold",    codeStr: "text-3xl font-bold" },
  { label: "3xl / normal",  sampleClass: "text-3xl font-normal",  codeStr: "text-3xl font-normal" },
  { label: "2xl / bold",    sampleClass: "text-2xl font-bold",    codeStr: "text-2xl font-bold" },
  { label: "2xl / normal",  sampleClass: "text-2xl font-normal",  codeStr: "text-2xl font-normal" },
  { label: "xl / bold",     sampleClass: "text-xl font-bold",     codeStr: "text-xl font-bold" },
  { label: "xl / normal",   sampleClass: "text-xl font-normal",   codeStr: "text-xl font-normal" },
  { label: "lg / bold",     sampleClass: "text-lg font-bold",     codeStr: "text-lg font-bold" },
  { label: "lg / normal",   sampleClass: "text-lg font-normal",   codeStr: "text-lg font-normal" },
  { label: "base / bold",   sampleClass: "text-base font-bold",   codeStr: "text-base font-bold" },
  { label: "base / normal", sampleClass: "text-base font-normal", codeStr: "text-base font-normal" },
  { label: "sm / bold",     sampleClass: "text-sm font-bold",     codeStr: "text-sm font-bold" },
  { label: "sm / normal",   sampleClass: "text-sm font-normal",   codeStr: "text-sm font-normal" },
  { label: "xs / bold",     sampleClass: "text-xs font-bold",     codeStr: "text-xs font-bold" },
  { label: "xs / normal",   sampleClass: "text-xs font-normal",   codeStr: "text-xs font-normal" },
] as const;

// ── Skin palette swatches ───────────────────────────────────────────────────

const SKIN_SWATCHES = [
  { token: "background",         bgClass: "bg-background" },
  { token: "foreground",         bgClass: "bg-foreground" },
  { token: "card",               bgClass: "bg-card" },
  { token: "primary",            bgClass: "bg-primary" },
  { token: "primary-foreground", bgClass: "bg-primary-foreground" },
  { token: "secondary",          bgClass: "bg-secondary" },
  { token: "muted",              bgClass: "bg-muted" },
  { token: "muted-foreground",   bgClass: "bg-muted-foreground" },
  { token: "accent",             bgClass: "bg-accent" },
  { token: "destructive",        bgClass: "bg-destructive" },
  { token: "border",             bgClass: "bg-border" },
  { token: "ring",               bgClass: "bg-ring" },
] as const;

// ── Chart palette swatches ──────────────────────────────────────────────────

const CHART_SWATCHES = [
  { token: "chart-1", bgClass: "bg-chart-1" },
  { token: "chart-2", bgClass: "bg-chart-2" },
  { token: "chart-3", bgClass: "bg-chart-3" },
  { token: "chart-4", bgClass: "bg-chart-4" },
  { token: "chart-5", bgClass: "bg-chart-5" },
] as const;

// ── Icon grid ───────────────────────────────────────────────────────────────

const ICONS = [
  { Icon: Home,         name: "Home" },
  { Icon: Search,       name: "Search" },
  { Icon: Settings,     name: "Settings" },
  { Icon: Bell,         name: "Bell" },
  { Icon: Menu,         name: "Menu" },
  { Icon: X,            name: "X" },
  { Icon: ChevronRight, name: "ChevronRight" },
  { Icon: ChevronDown,  name: "ChevronDown" },
  { Icon: Plus,         name: "Plus" },
  { Icon: Pencil,       name: "Pencil" },
  { Icon: Trash2,       name: "Trash2" },
  { Icon: Check,        name: "Check" },
  { Icon: User,         name: "User" },
  { Icon: Mail,         name: "Mail" },
  { Icon: Lock,         name: "Lock" },
  { Icon: Eye,          name: "Eye" },
  { Icon: Download,     name: "Download" },
  { Icon: LogOut,       name: "LogOut" },
  { Icon: Calendar,     name: "Calendar" },
  { Icon: ArrowRight,   name: "ArrowRight" },
] as const;

// ── Page ────────────────────────────────────────────────────────────────────

export default function FoundationsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-screen-xl px-4 py-8">

        {/* Back link */}
        <a
          href="/skin-demo"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Skins
        </a>

        {/* Page title */}
        <h1 className="text-2xl font-bold tracking-tight mt-4 mb-10">
          Foundations
        </h1>

        <div className="space-y-10">

          {/* ── Section 1: Typography ──────────────────────────────────── */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Typography</h2>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {TYPOGRAPHY_ROWS.map((row) => (
                    <div
                      key={row.codeStr}
                      className="flex items-baseline gap-4 px-4 py-2"
                    >
                      <span className="w-28 shrink-0 text-xs text-muted-foreground">
                        {row.label}
                      </span>
                      <span className={`${row.sampleClass} flex-1 min-w-0 truncate`}>
                        The quick brown fox
                      </span>
                      <code className="shrink-0 text-xs text-muted-foreground whitespace-nowrap">
                        {row.codeStr}
                      </code>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* ── Section 2: Colors ─────────────────────────────────────── */}
          <section>
            <h2 className="text-lg font-semibold mb-6">Colors</h2>

            <div className="space-y-8">

              {/* 2a: Skin palette */}
              <div>
                <h3 className="text-base font-medium mb-4">Skin palette</h3>
                <div className="flex flex-wrap gap-4">
                  {SKIN_SWATCHES.map((swatch) => (
                    <div
                      key={swatch.token}
                      className="flex flex-col items-center gap-1"
                    >
                      <div
                        className={`w-12 h-12 rounded-md border border-border ${swatch.bgClass}`}
                      />
                      <span className="text-xs text-muted-foreground">
                        {swatch.token}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2b: Alerts palette */}
              <div>
                <h3 className="text-base font-medium mb-4">Alerts palette</h3>
                <div className="space-y-2">
                  <Alert variant="default">
                    <AlertTitle>Default</AlertTitle>
                    <AlertDescription>Informational message</AlertDescription>
                  </Alert>

                  <Alert variant="destructive">
                    <AlertTitle>Destructive</AlertTitle>
                    {/* plain div avoids data-slot="alert-description" and its opacity-reduced color */}
                    <div className="text-sm text-foreground mt-1">Something went wrong</div>
                  </Alert>

                  <div
                    role="alert"
                    className="rounded-lg border border-border bg-card p-4"
                  >
                    <p className="text-sm font-medium text-foreground">Success</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Operation completed successfully
                    </p>
                  </div>

                  <div
                    role="alert"
                    className="rounded-lg border border-border bg-card p-4"
                  >
                    <p className="text-sm font-medium text-foreground">Warning</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Please review before continuing
                    </p>
                  </div>
                </div>
              </div>

              {/* 2c: Data viz palette */}
              <div>
                <h3 className="text-base font-medium mb-4">Data viz palette</h3>
                <div className="flex flex-wrap gap-4">
                  {CHART_SWATCHES.map((swatch) => (
                    <div
                      key={swatch.token}
                      className="flex flex-col items-center gap-1"
                    >
                      <div
                        className={`w-12 h-12 rounded-md border border-border ${swatch.bgClass}`}
                      />
                      <span className="text-xs text-muted-foreground">
                        {swatch.token}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* ── Section 3: Icons ──────────────────────────────────────── */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Icons</h2>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-2">
              {ICONS.map(({ Icon, name }) => (
                <div
                  key={name}
                  className="flex flex-col items-center gap-1 p-2"
                >
                  <Icon className="size-5 text-foreground" aria-hidden="true" />
                  <span className="text-xs text-muted-foreground text-center">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
