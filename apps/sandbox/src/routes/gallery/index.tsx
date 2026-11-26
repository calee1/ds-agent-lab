import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"

const buttonVariants = ["default", "outline", "secondary", "ghost", "destructive", "link"] as const
const badgeVariants = ["default", "secondary", "destructive", "outline"] as const

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  )
}

export default function Gallery() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-screen-xl space-y-6 px-4 py-8">
        <h1 className="text-2xl font-bold tracking-tight">Component gallery</h1>
        <p className="text-sm text-muted-foreground">
          Visual baseline for the design system — baseline-v1, shadcn 4.23.1, style base-nova.
        </p>

        <Section title="Buttons" description="Every variant and size.">
          <div className="flex flex-wrap gap-2">
            {buttonVariants.map((v) => (
              <Button key={v} variant={v}>{v}</Button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">sm</Button>
            <Button>default</Button>
            <Button size="lg">lg</Button>
            <Button disabled>disabled</Button>
          </div>
        </Section>

        <Section title="Badges">
          <div className="flex flex-wrap gap-2">
            {badgeVariants.map((v) => (
              <Badge key={v} variant={v}>{v}</Badge>
            ))}
          </div>
        </Section>

        <Section title="Form controls">
          <div className="space-y-2">
            <Label htmlFor="g-input">Input</Label>
            <Input id="g-input" placeholder="Placeholder" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="g-textarea">Textarea</Label>
            <Textarea id="g-textarea" placeholder="Longer text" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="g-check" defaultChecked />
            <Label htmlFor="g-check">Checkbox</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="g-switch" defaultChecked />
            <Label htmlFor="g-switch">Switch</Label>
          </div>
          <RadioGroup defaultValue="a" className="flex gap-4">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="a" id="g-r1" />
              <Label htmlFor="g-r1">Option A</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="b" id="g-r2" />
              <Label htmlFor="g-r2">Option B</Label>
            </div>
          </RadioGroup>
          <div className="space-y-2">
            <Label>Slider</Label>
            <Slider defaultValue={[40]} max={100} />
          </div>
        </Section>

        <Section title="Toggle">
          <div className="flex gap-2">
            <Toggle>Bold</Toggle>
            <Toggle variant="outline">Outline</Toggle>
            <Toggle pressed>Pressed</Toggle>
          </div>
        </Section>

        <Section title="Feedback and status">
          <Alert>
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>Alert description text.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Something went wrong.</AlertDescription>
          </Alert>
          <Progress value={60} />
          <div className="flex items-center gap-3">
            <Spinner />
            <span className="text-sm text-muted-foreground">Loading…</span>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </Section>

        <Section title="Avatar">
          <div className="flex gap-3">
            <Avatar>
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>CD</AvatarFallback>
            </Avatar>
          </div>
        </Section>

        <Section title="Accordion">
          <Accordion>
            <AccordionItem value="a">
              <AccordionTrigger>Panel one</AccordionTrigger>
              <AccordionContent>Content for panel one.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>Panel two</AccordionTrigger>
              <AccordionContent>Content for panel two.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </Section>

        <Section title="Tabs">
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3" disabled>Disabled</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">Content for tab 1.</TabsContent>
            <TabsContent value="tab2">Content for tab 2.</TabsContent>
          </Tabs>
        </Section>

        <Section title="Breadcrumb">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/gallery">Gallery</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Baseline</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Section>

        <Section title="Keyboard shortcut">
          <div className="flex items-center gap-2 text-sm">
            Press <Kbd>⌘</Kbd><Kbd>K</Kbd> to open command palette
          </div>
        </Section>

        <Section title="Separator and table">
          <Separator />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Ada</TableCell>
                <TableCell>Engineer</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Grace</TableCell>
                <TableCell>Admiral</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>
      </main>
    </div>
  )
}
