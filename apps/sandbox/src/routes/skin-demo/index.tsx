import { useState, useEffect } from "react"
import {
  Home, Search, Settings, Bell, Menu, X, ChevronRight, ChevronDown,
  Plus, Pencil, Trash2, Check, User, Mail, Lock, Eye, Download,
  LogOut, Calendar, ArrowRight, ArrowLeft,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  CodeBlock, CodeBlockActions, CodeBlockContent, CodeBlockCopyButton,
  CodeBlockHeader, CodeBlockLine, CodeBlockTitle,
} from "@/components/ui/code-block"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Popover, PopoverContent, PopoverDescription, PopoverHeader,
  PopoverTitle, PopoverTrigger,
} from "@/components/ui/popover"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Sheet, SheetClose, SheetContent, SheetDescription,
  SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toaster, toast } from "@/components/ui/toast"
import { Toggle } from "@/components/ui/toggle"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// ── Static data ──────────────────────────────────────────────────────────────

const stats = [
  { value: "2,847", label: "Active users", trend: "+12%" },
  { value: "98.4%", label: "Uptime (last 30d)", trend: "+0.2%" },
  { value: "143", label: "Open tickets", trend: "-8%" },
]

const activityRows = [
  { name: "Redesign tokens", status: "In progress", owner: "Alex", date: "Nov 25" },
  { name: "Gallery baseline", status: "Done", owner: "Sam", date: "Nov 24" },
  { name: "Wireframe skin", status: "Done", owner: "Alex", date: "Nov 23" },
  { name: "Branded skin", status: "Review", owner: "Jordan", date: "Nov 22" },
  { name: "Accessibility audit", status: "Planned", owner: "Sam", date: "Nov 20" },
]

type StatusVariant = "default" | "secondary" | "outline"

function statusVariant(status: string): StatusVariant {
  if (status === "Done") return "default"
  if (status === "In progress") return "secondary"
  return "outline"
}

const codeSnippet = `function greet(name: string) {
  return \`Hello, \${name}!\`;
}`

// ── Foundations data ─────────────────────────────────────────────────────────

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
] as const

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
] as const

const CHART_SWATCHES = [
  { token: "chart-1", bgClass: "bg-chart-1" },
  { token: "chart-2", bgClass: "bg-chart-2" },
  { token: "chart-3", bgClass: "bg-chart-3" },
  { token: "chart-4", bgClass: "bg-chart-4" },
  { token: "chart-5", bgClass: "bg-chart-5" },
] as const

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
] as const

// ── Types ────────────────────────────────────────────────────────────────────

type Skin = "default" | "branded" | "wireframe"
type Mode = "light" | "dark"

// ── Inline skin switcher ──────────────────────────────────────────────────────

function SkinSwitcherInline({
  skin, setSkin, mode, setMode,
}: {
  skin: Skin; setSkin: (s: Skin) => void
  mode: Mode; setMode: (m: Mode) => void
}) {
  const btn = (active: boolean) => ({
    padding: "0.2rem 0.5rem",
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--border)",
    background: active ? "var(--primary)" : "transparent",
    color: active ? "var(--primary-foreground)" : "var(--foreground)",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: "inherit",
  })

  const sep = (
    <div style={{ width: "1px", height: "1rem", background: "var(--border)" }} aria-hidden />
  )

  return (
    <div
      style={{
        display: "flex", gap: "0.25rem", alignItems: "center",
        background: "var(--card)", border: "1px solid var(--border)",
        borderRadius: "var(--radius)", padding: "0.375rem 0.625rem",
        fontSize: "0.75rem", color: "var(--foreground)",
        flexShrink: 0,
      }}
      aria-label="Skin switcher"
    >
      {/* Branded group */}
      <button style={btn(skin === "branded")} onClick={() => setSkin("branded")} aria-pressed={skin === "branded"} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50">Branded</button>
      <button style={btn(skin === "branded" && mode === "light")} onClick={() => { setSkin("branded"); setMode("light") }} aria-pressed={skin === "branded" && mode === "light"} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50">light</button>
      <button style={btn(skin === "branded" && mode === "dark")} onClick={() => { setSkin("branded"); setMode("dark") }} aria-pressed={skin === "branded" && mode === "dark"} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50">dark</button>
      {sep}
      {/* Basic group */}
      <button style={btn(skin === "default")} onClick={() => setSkin("default")} aria-pressed={skin === "default"} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50">Basic</button>
      <button style={btn(skin === "default" && mode === "light")} onClick={() => { setSkin("default"); setMode("light") }} aria-pressed={skin === "default" && mode === "light"} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50">light</button>
      <button style={btn(skin === "default" && mode === "dark")} onClick={() => { setSkin("default"); setMode("dark") }} aria-pressed={skin === "default" && mode === "dark"} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50">dark</button>
      {sep}
      {/* Wireframe */}
      <button style={btn(skin === "wireframe")} onClick={() => setSkin("wireframe")} aria-pressed={skin === "wireframe"} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50">Wireframe</button>
    </div>
  )
}

// ── Page component ───────────────────────────────────────────────────────────

export default function SkinDemo() {
  const [skin, setSkinState] = useState<Skin>(
    () => (localStorage.getItem("skin") as Skin) ?? "branded"
  )
  const [mode, setModeState] = useState<Mode>(
    () => (localStorage.getItem("mode") as Mode) ?? "light"
  )

  const setSkin = (s: Skin) => {
    setSkinState(s)
    document.documentElement.setAttribute("data-skin", s)
    localStorage.setItem("skin", s)
  }

  const setMode = (m: Mode) => {
    setModeState(m)
    document.documentElement.classList.toggle("dark", m === "dark")
    localStorage.setItem("mode", m)
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-skin", skin)
    document.documentElement.classList.toggle("dark", mode === "dark")

    const resetSkin = () => localStorage.setItem("skin", "branded")
    window.addEventListener("pagehide", resetSkin)
    return () => window.removeEventListener("pagehide", resetSkin)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />
      <div className="mx-auto max-w-screen-xl space-y-6 px-4 py-6">

        {/* Page header */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" render={<a href="/" />}>
                <ArrowLeft size={16} />
                Back
              </Button>
              <h1 className="text-2xl font-bold tracking-tight">HAX Design System — Skins</h1>
            </div>
            <SkinSwitcherInline skin={skin} setSkin={setSkin} mode={mode} setMode={setMode} />
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Use the skin switcher to toggle between skins. Each skin changes the visual character
            of the page — colors, borders and typography — while the layout and component
            structure stay the same.
          </p>
        </div>

        {/* Main tabs */}
        <Tabs defaultValue="components">
          <TabsList>
            <TabsTrigger value="components" className="text-foreground dark:text-foreground">Components</TabsTrigger>
            <TabsTrigger value="foundations" className="text-foreground dark:text-foreground">Foundations</TabsTrigger>
          </TabsList>

          {/* ── Components tab ── */}
          <TabsContent value="components" className="mt-6 space-y-10">

            {/* Stats row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="pt-6">
                    <div className="space-y-1">
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <Badge variant="secondary">{stat.trend}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Activity table */}
            <Card>
              <CardHeader>
                <CardTitle>Recent activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activityRows.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>
                            <Badge variant={statusVariant(row.status)}>{row.status}</Badge>
                          </TableCell>
                          <TableCell>{row.owner}</TableCell>
                          <TableCell>{row.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Compose card */}
            <Card>
              <CardHeader>
                <CardTitle>New note</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-note">Note</Label>
                  <Textarea id="new-note" placeholder="Add a note…" rows={3} />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" type="button">Cancel</Button>
                  <Button type="submit">Save</Button>
                </div>
              </CardContent>
            </Card>

            {/* ── Badges ── */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Badges</h2>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="ghost">Ghost</Badge>
                <Badge variant="link">Link</Badge>
              </div>
            </section>

            {/* ── Buttons ── */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Buttons</h2>
              <Card>
                <CardContent className="space-y-4 pt-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Variants</p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="secondary" type="button">Secondary</Button>
                      <Button variant="outline" type="button">Outline</Button>
                      <Button variant="ghost" type="button">Ghost</Button>
                      <Button variant="link" type="button">Link</Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Sizes</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button variant="outline" size="xs" type="button">XS</Button>
                      <Button variant="outline" size="sm" type="button">SM</Button>
                      <Button variant="outline" size="default" type="button">Default size</Button>
                      <Button variant="outline" size="lg" type="button">LG</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* ── Form controls ── */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Form controls</h2>
              <Card>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="demo-input">Text input</Label>
                    <Input id="demo-input" type="text" placeholder="Type something…" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demo-textarea">Textarea</Label>
                    <Textarea id="demo-textarea" placeholder="Write a longer message…" rows={3} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demo-select">Select</Label>
                    <Select defaultValue="apple">
                      <SelectTrigger id="demo-select">
                        <SelectValue placeholder="Choose an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="cherry">Cherry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="demo-checkbox" />
                    <Label htmlFor="demo-checkbox">Accept terms and conditions</Label>
                  </div>
                  <fieldset className="space-y-2">
                    <legend className="text-sm font-medium">Preferred contact</legend>
                    <RadioGroup defaultValue="email" className="mt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="email" id="radio-email" />
                        <Label htmlFor="radio-email">Email</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="phone" id="radio-phone" />
                        <Label htmlFor="radio-phone">Phone</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="post" id="radio-post" />
                        <Label htmlFor="radio-post">Post</Label>
                      </div>
                    </RadioGroup>
                  </fieldset>
                  <div className="flex items-center gap-2">
                    <Switch id="demo-switch" />
                    <Label htmlFor="demo-switch">Enable notifications</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demo-otp">Verification code</Label>
                    <InputOTP maxLength={6} id="demo-otp">
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* ── Feedback ── */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Feedback</h2>
              <div className="space-y-4">
                <Alert>
                  <AlertTitle>Heads up!</AlertTitle>
                  <AlertDescription>
                    This is a default alert for informational messages.
                  </AlertDescription>
                </Alert>
                <Progress value={60}>
                  <ProgressLabel>Upload progress</ProgressLabel>
                  <ProgressValue />
                </Progress>
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Spinner />
                      <span className="text-sm text-muted-foreground">Loading…</span>
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-4/5" />
                      <Skeleton className="h-4 w-3/5" />
                    </div>
                  </CardContent>
                </Card>
                <div>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() =>
                      toast.add({ title: "Toast triggered", description: "The toast system is working." })
                    }
                  >
                    Show toast
                  </Button>
                </div>
              </div>
            </section>

            {/* ── Overlays ── */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Overlays</h2>
              <div className="flex flex-wrap gap-2">
                <Dialog>
                  <DialogTrigger render={<Button variant="outline" type="button" />}>
                    Open dialog
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Dialog title</DialogTitle>
                      <DialogDescription>
                        This is an example dialog. It traps focus until dismissed.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" type="button">Cancel</Button>
                      <Button type="button">Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Sheet>
                  <SheetTrigger render={<Button variant="outline" type="button" />}>
                    Open sheet
                  </SheetTrigger>
                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>Sheet title</SheetTitle>
                      <SheetDescription>
                        Content slides in from the right edge of the screen.
                      </SheetDescription>
                    </SheetHeader>
                    <SheetFooter>
                      <SheetClose render={<Button variant="outline" type="button" />}>
                        Close
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
                <Popover>
                  <PopoverTrigger render={<Button variant="outline" type="button" />}>
                    Open popover
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverHeader>
                      <PopoverTitle>Popover title</PopoverTitle>
                      <PopoverDescription>
                        A floating card anchored to its trigger.
                      </PopoverDescription>
                    </PopoverHeader>
                  </PopoverContent>
                </Popover>
                <HoverCard>
                  <HoverCardTrigger render={<Button variant="outline" type="button" />}>
                    Hover card
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <p className="text-sm">This card appears on hover. It is useful for preview content.</p>
                  </HoverCardContent>
                </HoverCard>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger render={<Button variant="outline" type="button" />}>
                      Tooltip trigger
                    </TooltipTrigger>
                    <TooltipContent>This is a tooltip</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="outline" type="button" />}>
                    Dropdown menu
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Log out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </section>

            {/* ── Navigation ── */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Navigation</h2>
              <div className="space-y-6">
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview" className="text-foreground dark:text-foreground">Overview</TabsTrigger>
                    <TabsTrigger value="analytics" className="text-foreground dark:text-foreground">Analytics</TabsTrigger>
                    <TabsTrigger value="settings" className="text-foreground dark:text-foreground">Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="mt-4">
                    <p className="text-sm text-muted-foreground">Overview tab content goes here.</p>
                  </TabsContent>
                  <TabsContent value="analytics" className="mt-4">
                    <p className="text-sm text-muted-foreground">Analytics tab content goes here.</p>
                  </TabsContent>
                  <TabsContent value="settings" className="mt-4">
                    <p className="text-sm text-muted-foreground">Settings tab content goes here.</p>
                  </TabsContent>
                </Tabs>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Components</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Gallery</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                    <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink href="#" isActive>3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink href="#">4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink href="#">5</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationNext href="#" /></PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </section>

            {/* ── Data display ── */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Data display</h2>
              <div className="space-y-6">
                <Accordion defaultValue={["item-1"]}>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is a design system?</AccordionTrigger>
                    <AccordionContent>
                      A design system is a collection of reusable components guided by clear standards
                      that ensure consistency across a product.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I use the token system?</AccordionTrigger>
                    <AccordionContent>
                      Reference semantic token classes like <code>bg-background</code> and{" "}
                      <code>text-foreground</code> in your Tailwind classes.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Can I add custom skins?</AccordionTrigger>
                    <AccordionContent>
                      Yes — add a skin JSON file to <code>packages/registry/skins/</code> and rebuild
                      the registry with <code>pnpm registry:build</code>.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Collapsible>
                  <CollapsibleTrigger render={<Button variant="outline" type="button" />}>
                    Toggle collapsible
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="rounded-md border border-border bg-muted p-4">
                      <p className="text-sm">Hidden content revealed when expanded.</p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar><AvatarImage src="" alt="Alex" /><AvatarFallback className="text-foreground">AX</AvatarFallback></Avatar>
                    <Avatar><AvatarImage src="" alt="Sam" /><AvatarFallback className="text-foreground">SM</AvatarFallback></Avatar>
                    <Avatar><AvatarImage src="" alt="Jordan" /><AvatarFallback className="text-foreground">JD</AvatarFallback></Avatar>
                  </div>
                  <AvatarGroup>
                    <Avatar><AvatarFallback className="text-foreground">AX</AvatarFallback></Avatar>
                    <Avatar><AvatarFallback className="text-foreground">SM</AvatarFallback></Avatar>
                    <Avatar><AvatarFallback className="text-foreground">JD</AvatarFallback></Avatar>
                    <AvatarGroupCount className="text-foreground">+5</AvatarGroupCount>
                  </AvatarGroup>
                </div>
                <ScrollArea className="h-40 rounded-md border border-border">
                  <div className="p-4 space-y-2">
                    {Array.from({ length: 15 }, (_, i) => (
                      <p key={i} className="text-sm text-muted-foreground">
                        Scroll area item {i + 1} — keep scrolling to see more content.
                      </p>
                    ))}
                  </div>
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
                <div className="space-y-3">
                  <p className="text-sm">Content above the separator</p>
                  <Separator />
                  <p className="text-sm">Content below the separator</p>
                </div>
              </div>
            </section>

            {/* ── Misc ── */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Misc</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Keyboard shortcuts</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <KbdGroup><Kbd className="text-foreground">⌘</Kbd><Kbd className="text-foreground">K</Kbd></KbdGroup>
                    <KbdGroup><Kbd className="text-foreground">Ctrl</Kbd><Kbd className="text-foreground">Shift</Kbd><Kbd className="text-foreground">P</Kbd></KbdGroup>
                    <KbdGroup><Kbd className="text-foreground">Alt</Kbd><Kbd className="text-foreground">F4</Kbd></KbdGroup>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Toggle</p>
                  <div className="flex flex-wrap gap-2">
                    <Toggle className="text-foreground">Bold</Toggle>
                    <Toggle variant="outline" defaultPressed className="text-foreground">Italic</Toggle>
                    <Toggle variant="outline" className="text-foreground">Underline</Toggle>
                  </div>
                </div>
                <CodeBlock>
                  <CodeBlockHeader>
                    <CodeBlockTitle>example.ts</CodeBlockTitle>
                    <CodeBlockActions>
                      <CodeBlockCopyButton value={codeSnippet} />
                    </CodeBlockActions>
                  </CodeBlockHeader>
                  <CodeBlockContent>
                    {codeSnippet.split("\n").map((line, i) => (
                      <CodeBlockLine key={i}>{line}</CodeBlockLine>
                    ))}
                  </CodeBlockContent>
                </CodeBlock>
              </div>
            </section>

          </TabsContent>

          {/* ── Foundations tab ── */}
          <TabsContent value="foundations" className="mt-6 space-y-10">

            {/* Typography */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Typography</h2>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {TYPOGRAPHY_ROWS.map((row) => (
                      <div key={row.codeStr} className="flex items-baseline gap-4 px-4 py-2">
                        <span className="w-28 shrink-0 text-xs text-muted-foreground">{row.label}</span>
                        <span className={`${row.sampleClass} flex-1 min-w-0 truncate`}>The quick brown fox</span>
                        <code className="shrink-0 text-xs text-muted-foreground whitespace-nowrap">{row.codeStr}</code>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Colors */}
            <section>
              <h2 className="text-lg font-semibold mb-6">Colors</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-base font-medium mb-4">Skin palette</h3>
                  <div className="flex flex-wrap gap-4">
                    {SKIN_SWATCHES.map((swatch) => (
                      <div key={swatch.token} className="flex flex-col items-center gap-1">
                        <div className={`w-12 h-12 rounded-md border border-border ${swatch.bgClass}`} />
                        <span className="text-xs text-muted-foreground">{swatch.token}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-medium mb-4">Alerts palette</h3>
                  <div className="space-y-2">
                    <Alert variant="default">
                      <AlertTitle>Default</AlertTitle>
                      <AlertDescription>Informational message</AlertDescription>
                    </Alert>
                    <Alert variant="destructive">
                      <AlertTitle>Destructive</AlertTitle>
                      <div className="text-sm text-foreground mt-1">Something went wrong</div>
                    </Alert>
                    <div role="alert" className="rounded-lg border border-success bg-card p-4">
                      <p className="text-sm font-medium text-success">Success</p>
                      <p className="text-sm text-muted-foreground mt-1">Operation completed successfully</p>
                    </div>
                    <div role="alert" className="rounded-lg border border-warning bg-card p-4">
                      <p className="text-sm font-medium text-warning">Warning</p>
                      <p className="text-sm text-muted-foreground mt-1">Please review before continuing</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-medium mb-4">Data viz palette</h3>
                  <div className="flex flex-wrap gap-4">
                    {CHART_SWATCHES.map((swatch) => (
                      <div key={swatch.token} className="flex flex-col items-center gap-1">
                        <div className={`w-12 h-12 rounded-md border border-border ${swatch.bgClass}`} />
                        <span className="text-xs text-muted-foreground">{swatch.token}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Icons */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Icons</h2>
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-2">
                {ICONS.map(({ Icon, name }) => (
                  <div key={name} className="flex flex-col items-center gap-1 p-2">
                    <Icon className="size-5 text-foreground" aria-hidden="true" />
                    <span className="text-xs text-muted-foreground text-center">{name}</span>
                  </div>
                ))}
              </div>
            </section>

          </TabsContent>
        </Tabs>

      </div>
    </div>
  )
}
