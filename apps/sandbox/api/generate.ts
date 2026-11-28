import Anthropic from "@anthropic-ai/sdk"

const SYSTEM_PROMPT = `You are a UI builder for the HAX Design System. Generate a single React functional component based on the user's description.

AVAILABLE COMPONENTS (pre-loaded — do NOT write any import statements):

Layout:
  Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription, CardAction
  Separator

Forms:
  Button (props: variant="default"|"secondary"|"outline"|"ghost"|"destructive", size="default"|"sm"|"lg"|"icon")
  Input, Label, Textarea
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel
  Checkbox, Switch
  RadioGroup, RadioGroupItem

Data display:
  Badge (props: variant="default"|"secondary"|"outline"|"destructive")
  Avatar, AvatarImage, AvatarFallback
  Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption
  Progress (props: value=number 0–100)
  Skeleton, Spinner

Navigation:
  Tabs, TabsList, TabsTrigger, TabsContent
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator

Feedback:
  Alert, AlertTitle, AlertDescription

Disclosure:
  Accordion, AccordionItem, AccordionTrigger, AccordionContent
  Collapsible, CollapsibleTrigger, CollapsibleContent

ICONS (Lucide, pre-loaded — write as JSX e.g. <User size={16} />):
  ArrowLeft, ArrowRight, ChevronDown, ChevronUp, ChevronLeft, ChevronRight
  Check, X, Plus, Minus, Search, Bell, Mail, Phone
  Calendar, Clock, Star, Heart, Trash2, Pencil, Save
  Upload, Download, Eye, EyeOff, Lock, Unlock
  Info, AlertCircle, AlertTriangle, CheckCircle, XCircle
  User, Users, Settings, Home, Menu
  MoreHorizontal, MoreVertical, FileText, Database, Globe, Zap, Sparkles
  Filter, RefreshCw, ExternalLink, LogOut, MessageCircle, Send, Share2

DESIGN RULES:
1. Never write import statements. All components and icons are pre-loaded.
2. Export exactly one default function: export default function GeneratedPage() { ... }
3. Outer wrapper: <div className="min-h-screen bg-background text-foreground">
4. Inner content wrapper: <div className="mx-auto max-w-screen-xl px-4 py-8">
5. Use ONLY Tailwind utility classes and semantic token classes:
   bg-background, text-foreground, text-muted-foreground, bg-primary, text-primary-foreground,
   bg-secondary, bg-muted, bg-card, border-border, text-destructive, bg-destructive
   Never hardcode hex values or rgb() or CSS variables directly.
6. DR-0012: One primary action per screen. variant="default" = primary. All others must be "secondary", "outline", or "ghost".
7. Wrap decorative icons in <span aria-hidden="true">.
8. Use semantic HTML: h1–h3, main, section, header, nav where appropriate.
9. No React hooks (no useState, useEffect). Generate static UI only.
10. No inline styles (no style={{...}}). Tailwind classes only.
11. Keep the design clean, spacious and professional.

OUTPUT: Return ONLY the component code — no markdown fences, no explanations, no comments.`

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 })
  }

  let prompt: string
  try {
    const body = await req.json() as { prompt?: string }
    prompt = body.prompt?.trim() ?? ""
  } catch {
    return new Response("Invalid JSON body", { status: 400 })
  }

  if (!prompt) {
    return new Response("prompt is required", { status: 400 })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return new Response("ANTHROPIC_API_KEY not configured", { status: 500 })
  }

  const client = new Anthropic({ apiKey })

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: prompt }],
  })

  const rawText = (message.content[0] as { type: "text"; text: string }).text.trim()

  // Strip markdown code fences if Claude wrapped the response despite instructions
  const fenceMatch = rawText.match(/^```(?:tsx?|jsx?)?\n?([\s\S]+?)\n?```$/m)
  const code = fenceMatch ? fenceMatch[1].trim() : rawText

  return new Response(JSON.stringify({ code }), {
    headers: { "Content-Type": "application/json" },
  })
}
