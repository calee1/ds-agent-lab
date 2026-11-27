import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@/components/ui/code-block";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "@/components/ui/toast";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// --- Static data ---

const stats = [
  { value: "2,847", label: "Active users", trend: "+12%" },
  { value: "98.4%", label: "Uptime (last 30d)", trend: "+0.2%" },
  { value: "143", label: "Open tickets", trend: "-8%" },
];

const activityRows = [
  { name: "Redesign tokens", status: "In progress", owner: "Alex", date: "Nov 25" },
  { name: "Gallery baseline", status: "Done", owner: "Sam", date: "Nov 24" },
  { name: "Wireframe skin", status: "Done", owner: "Alex", date: "Nov 23" },
  { name: "Branded skin", status: "Review", owner: "Jordan", date: "Nov 22" },
  { name: "Accessibility audit", status: "Planned", owner: "Sam", date: "Nov 20" },
];

type StatusVariant = "default" | "secondary" | "outline";

function statusVariant(status: string): StatusVariant {
  if (status === "Done") return "default";
  if (status === "In progress") return "secondary";
  return "outline";
}

const codeSnippet = `function greet(name: string) {
  return \`Hello, \${name}!\`;
}`;

// --- Page component ---

export default function SkinDemo() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />
      <div className="mx-auto max-w-screen-xl space-y-10 px-4 py-8">

        {/* Page header */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold tracking-tight">HAX Design System — Skins</h1>
          <p className="text-sm text-muted-foreground">
            Use the skin switcher in the bottom-right corner to toggle between skins. Each skin
            changes the visual character of the page — colors, borders and typography — while
            the layout and component structure stay the same.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/foundations"
              className="text-sm font-medium underline underline-offset-4 hover:text-primary"
            >
              Foundations
            </a>
            <span className="text-sm font-medium text-muted-foreground">Component gallery</span>
          </div>
        </div>

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

        {/* ── Section 1: Badges ── */}
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

        {/* ── Section 2: Buttons ── */}
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

        {/* ── Section 3: Form controls ── */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Form controls</h2>
          <Card>
            <CardContent className="space-y-6 pt-6">

              {/* Input */}
              <div className="space-y-2">
                <Label htmlFor="demo-input">Text input</Label>
                <Input id="demo-input" type="text" placeholder="Type something…" />
              </div>

              {/* Textarea */}
              <div className="space-y-2">
                <Label htmlFor="demo-textarea">Textarea</Label>
                <Textarea id="demo-textarea" placeholder="Write a longer message…" rows={3} />
              </div>

              {/* Select */}
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

              {/* Checkbox */}
              <div className="flex items-center gap-2">
                <Checkbox id="demo-checkbox" />
                <Label htmlFor="demo-checkbox">Accept terms and conditions</Label>
              </div>

              {/* RadioGroup */}
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

              {/* Switch */}
              <div className="flex items-center gap-2">
                <Switch id="demo-switch" />
                <Label htmlFor="demo-switch">Enable notifications</Label>
              </div>

              {/* InputOTP */}
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

        {/* ── Section 4: Feedback ── */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Feedback</h2>
          <div className="space-y-4">

            {/* Alerts */}
            <Alert>
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                This is a default alert for informational messages.
              </AlertDescription>
            </Alert>

            {/* Progress */}
            <Progress value={60}>
              <ProgressLabel>Upload progress</ProgressLabel>
              <ProgressValue />
            </Progress>

            {/* Spinner + Skeleton */}
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

            {/* Toast trigger */}
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

        {/* ── Section 5: Overlays ── */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Overlays</h2>
          <div className="flex flex-wrap gap-2">

            {/* Dialog */}
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

            {/* Sheet */}
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

            {/* Popover */}
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

            {/* HoverCard */}
            <HoverCard>
              <HoverCardTrigger render={<Button variant="outline" type="button" />}>
                Hover card
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm">This card appears on hover. It is useful for preview content.</p>
              </HoverCardContent>
            </HoverCard>

            {/* Tooltip */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger render={<Button variant="outline" type="button" />}>
                  Tooltip trigger
                </TooltipTrigger>
                <TooltipContent>This is a tooltip</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* DropdownMenu */}
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

        {/* ── Section 6: Navigation ── */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Navigation</h2>
          <div className="space-y-6">

            {/* Tabs */}
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

            {/* Breadcrumb */}
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

            {/* Pagination */}
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">5</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

          </div>
        </section>

        {/* ── Section 7: Data display ── */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Data display</h2>
          <div className="space-y-6">

            {/* Accordion */}
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

            {/* Collapsible */}
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

            {/* Avatar + AvatarGroup */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="" alt="Alex" />
                  <AvatarFallback className="text-foreground">AX</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="" alt="Sam" />
                  <AvatarFallback className="text-foreground">SM</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="" alt="Jordan" />
                  <AvatarFallback className="text-foreground">JD</AvatarFallback>
                </Avatar>
              </div>
              <AvatarGroup>
                <Avatar>
                  <AvatarFallback className="text-foreground">AX</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback className="text-foreground">SM</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback className="text-foreground">JD</AvatarFallback>
                </Avatar>
                <AvatarGroupCount className="text-foreground">+5</AvatarGroupCount>
              </AvatarGroup>
            </div>

            {/* ScrollArea */}
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

            {/* Separator */}
            <div className="space-y-3">
              <p className="text-sm">Content above the separator</p>
              <Separator />
              <p className="text-sm">Content below the separator</p>
            </div>

          </div>
        </section>

        {/* ── Section 8: Misc ── */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Misc</h2>
          <div className="space-y-6">

            {/* Kbd */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Keyboard shortcuts</p>
              <div className="flex flex-wrap items-center gap-3">
                <KbdGroup>
                  <Kbd className="text-foreground">⌘</Kbd>
                  <Kbd className="text-foreground">K</Kbd>
                </KbdGroup>
                <KbdGroup>
                  <Kbd className="text-foreground">Ctrl</Kbd>
                  <Kbd className="text-foreground">Shift</Kbd>
                  <Kbd className="text-foreground">P</Kbd>
                </KbdGroup>
                <KbdGroup>
                  <Kbd className="text-foreground">Alt</Kbd>
                  <Kbd className="text-foreground">F4</Kbd>
                </KbdGroup>
              </div>
            </div>

            {/* Toggle + ToggleGroup */}
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Toggle</p>
              <div className="flex flex-wrap gap-2">
                <Toggle className="text-foreground">Bold</Toggle>
                <Toggle variant="outline" defaultPressed className="text-foreground">Italic</Toggle>
                <Toggle variant="outline" className="text-foreground">Underline</Toggle>
              </div>
            </div>

            {/* CodeBlock */}
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

      </div>
    </div>
  );
}
