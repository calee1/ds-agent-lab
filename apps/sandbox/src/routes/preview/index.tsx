import { useEffect, useRef, useState } from "react"
import React from "react"
import ReactDOM from "react-dom/client"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription, CardAction } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from "@/components/ui/table"
import { Alert, AlertTitle, AlertDescription, AlertAction } from "@/components/ui/alert"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import {
  ArrowLeft, ArrowRight, ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  Check, X, Plus, Minus, Search, Bell, Mail, Phone,
  Calendar, Clock, Star, Heart, Trash2, Pencil, Save,
  Upload, Download, Eye, EyeOff, Lock, Unlock,
  Info, AlertCircle, AlertTriangle, CheckCircle, XCircle,
  User, Users, Settings, Home, Menu,
  MoreHorizontal, MoreVertical, FileText, Database, Globe, Zap, Sparkles,
  Filter, RefreshCw, ExternalLink, LogOut, MessageCircle, Send, Share2,
} from "lucide-react"

const DS_COMPONENTS = {
  Button,
  Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription, CardAction,
  Badge, Input, Label, Textarea,
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,
  Checkbox, Switch,
  RadioGroup, RadioGroupItem,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption,
  Alert, AlertTitle, AlertDescription, AlertAction,
  Avatar, AvatarImage, AvatarFallback,
  Separator, Progress, Skeleton, Spinner,
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
  Collapsible, CollapsibleTrigger, CollapsibleContent,
}

const ICONS = {
  ArrowLeft, ArrowRight, ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  Check, X, Plus, Minus, Search, Bell, Mail, Phone,
  Calendar, Clock, Star, Heart, Trash2, Pencil, Save,
  Upload, Download, Eye, EyeOff, Lock, Unlock,
  Info, AlertCircle, AlertTriangle, CheckCircle, XCircle,
  User, Users, Settings, Home, Menu,
  MoreHorizontal, MoreVertical, FileText, Database, Globe, Zap, Sparkles,
  Filter, RefreshCw, ExternalLink, LogOut, MessageCircle, Send, Share2,
}

const DS_KEYS = Object.keys(DS_COMPONENTS).join(", ")
const ICON_KEYS = Object.keys(ICONS).join(", ")

export default function Preview() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reactRootRef = useRef<ReactDOM.Root | null>(null)
  const pendingCodeRef = useRef<string | null>(null)
  const [babelLoaded, setBabelLoaded] = useState(false)

  function renderCode(code: string) {
    if (!containerRef.current) return
    try {
      const wrapped = `const { ${DS_KEYS} } = window.__DS__;\nconst { ${ICON_KEYS} } = window.__ICONS__;\n${code}`
      const babel = (window as unknown as { Babel: { transform: (code: string, opts: object) => { code: string } } }).Babel
      const result = babel.transform(wrapped, {
        presets: [["react", { runtime: "classic" }], "env"],
        filename: "generated.tsx",
      })
      const moduleObj: { exports: { default?: React.ComponentType } } = { exports: {} }
      // eslint-disable-next-line no-new-func
      new Function("module", "exports", "React", result.code)(moduleObj, moduleObj.exports, React)
      const Component = moduleObj.exports.default
      if (!Component) throw new Error("No default export in generated code")
      reactRootRef.current?.unmount()
      reactRootRef.current = ReactDOM.createRoot(containerRef.current)
      reactRootRef.current.render(React.createElement(Component))
    } catch (err) {
      if (containerRef.current) {
        containerRef.current.innerHTML = `<div style="padding:1.5rem;color:var(--destructive);font-family:monospace;font-size:0.875rem;white-space:pre-wrap">${String(err)}</div>`
      }
    }
  }

  useEffect(() => {
    ;(window as unknown as Record<string, unknown>).__DS__ = DS_COMPONENTS
    ;(window as unknown as Record<string, unknown>).__ICONS__ = ICONS

    const script = document.createElement("script")
    script.src = "https://unpkg.com/@babel/standalone@7.26.0/babel.min.js"
    script.async = true
    script.onload = () => setBabelLoaded(true)
    document.head.appendChild(script)

    function handleMessage(event: MessageEvent) {
      if (!event.data || (event.data as { type?: string }).type !== "render") return
      const code = (event.data as { code: string }).code
      if ((window as unknown as { Babel?: unknown }).Babel) {
        renderCode(code)
      } else {
        pendingCodeRef.current = code
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  useEffect(() => {
    if (babelLoaded && pendingCodeRef.current) {
      renderCode(pendingCodeRef.current)
      pendingCodeRef.current = null
    }
  }, [babelLoaded])

  return <div ref={containerRef} className="min-h-screen bg-background text-foreground" />
}
