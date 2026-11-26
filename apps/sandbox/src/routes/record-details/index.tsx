import { useState } from "react"
import { ChevronDown, SquarePen, CirclePlus, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

// Simple accordion item using Button for the trigger
function AccordionItem({
  title,
  defaultOpen = false,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children?: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-border">
      <Button
        type="button"
        variant="ghost"
        className="flex w-full items-center justify-between py-4 text-sm font-medium text-foreground h-auto"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </Button>
      {open && children && (
        <div className="pb-6">{children}</div>
      )}
    </div>
  )
}

// Date field group using Checkbox for radio-like selection
function DateFieldGroup({
  legend,
  selectId,
  textId,
  placeholder,
}: {
  legend: string
  selectId: string
  textId: string
  placeholder: string
}) {
  const [mode, setMode] = useState<"select" | "enter">("select")
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-foreground">{legend}</p>
      <div className="pl-4 space-y-2">
        <div className="flex items-center gap-3">
          <Checkbox
            id={selectId}
            checked={mode === "select"}
            onCheckedChange={() => setMode("select")}
            aria-label="Select a date option"
          />
          <Label htmlFor={selectId} className="text-sm font-normal cursor-pointer">
            Select a date
          </Label>
          <div className="relative ml-2">
            <Input
              id={`${selectId}-date`}
              placeholder={placeholder}
              className="pl-9 w-56"
              aria-label={placeholder}
              disabled={mode !== "select"}
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox
            id={textId}
            checked={mode === "enter"}
            onCheckedChange={() => setMode("enter")}
            aria-label="Enter a date or period option"
          />
          <Label htmlFor={textId} className="text-sm font-normal cursor-pointer">
            Enter a date or period
          </Label>
        </div>
        <Textarea
          id={`${textId}-text`}
          placeholder="Enter information..."
          rows={3}
          disabled={mode !== "enter"}
          className={mode !== "enter" ? "opacity-50" : ""}
          aria-label="Date or period text entry"
        />
      </div>
    </div>
  )
}

// Data grid cell
function DataCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className="text-sm text-foreground">{children}</span>
    </div>
  )
}

export default function RecordDetails() {
  const [activeVersion, setActiveVersion] = useState<"published" | "draft">("published")

  return (
    <div className="min-h-screen bg-muted text-foreground">
      <div className="mx-auto max-w-screen-xl space-y-6 px-10 pt-10 pb-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm">
            <li>
              <a href="/home" className="text-foreground underline hover:text-muted-foreground">Home</a>
            </li>
            <li className="text-foreground" aria-hidden="true">&gt;</li>
            <li>
              <a href="/search" className="text-foreground underline hover:text-muted-foreground">Search</a>
            </li>
            <li className="text-foreground" aria-hidden="true">&gt;</li>
            <li className="text-foreground font-medium no-underline" aria-current="page">
              Sample Record Details
            </li>
          </ol>
        </nav>

        {/* H1 */}
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Sample Record Details
        </h1>

        <Separator />

        {/* Locality Section */}
        <section aria-labelledby="locality-heading" className="space-y-4">
          <h2 id="locality-heading" className="text-3xl font-semibold text-foreground">
            Locality
          </h2>
          <Card className="bg-card border border-border shadow-sm">
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <DataCell label="Record Name">Sample Record</DataCell>
                <DataCell label="Country">Exampleland</DataCell>
                <DataCell label="State/Province">North Region</DataCell>
                <DataCell label="Population">1,234,567</DataCell>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <DataCell label="County/Parish">-</DataCell>
                <DataCell label="City">-</DataCell>
                <DataCell label="Team Contact">
                  <a href="/contacts/edit" className="underline text-foreground hover:text-muted-foreground text-sm">
                    Edit Contact
                  </a>
                </DataCell>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Record Information Section */}
        <section aria-labelledby="record-info-heading" className="space-y-4">
          <h2 id="record-info-heading" className="text-3xl font-semibold text-foreground">
            Record Information
          </h2>
          <Card className="bg-card border border-border shadow-sm">
            <CardContent className="p-6 space-y-4">
              {/* Publishing Details Accordion (collapsed) */}
              <AccordionItem title="Publishing Details" />

              {/* Version + Publish row */}
              <div className="flex flex-wrap items-center justify-end gap-3">
                <p className="text-sm italic text-muted-foreground">
                  Last updated by Sample User 1/1/2000 12:00 PM UTC
                </p>
                <div className="flex items-center rounded-md border border-border overflow-hidden">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className={`rounded-none rounded-l-md text-sm ${
                      activeVersion === "published"
                        ? "underline font-medium text-foreground bg-background"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setActiveVersion("published")}
                  >
                    Published Version
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className={`flex items-center gap-1 rounded-none rounded-r-md text-sm ${
                      activeVersion === "draft"
                        ? "bg-secondary text-secondary-foreground"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setActiveVersion("draft")}
                  >
                    <SquarePen className="h-3.5 w-3.5" />
                    Draft Version
                  </Button>
                </div>
                <Button variant="default" size="sm">Publish</Button>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="documents" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="special">Requirements</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="training">Training</TabsTrigger>
                  <TabsTrigger value="certifications">Certifications</TabsTrigger>
                  <TabsTrigger value="approval">Approval</TabsTrigger>
                </TabsList>

                <TabsContent value="documents" className="space-y-4 pt-4">
                  <h3 className="text-2xl font-semibold text-foreground">Documents</h3>

                  {/* Source Details Accordion - expanded */}
                  <AccordionItem title="Source Details" defaultOpen>
                    <div className="border-b border-border pb-6 space-y-6">
                      {/* Source subsection */}
                      <div className="space-y-3">
                        <h4 className="text-lg font-medium text-foreground">Source</h4>
                        <Separator />
                        <div className="max-w-xl space-y-4">
                          <div className="space-y-1.5">
                            <Label htmlFor="source-info" className="text-sm font-medium">
                              Source Information
                            </Label>
                            <Textarea
                              id="source-info"
                              rows={3}
                              defaultValue="Information lorum ipsum text is super important to add here for notes its two lines."
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="source-link" className="text-sm font-medium">
                              Source Information Link
                            </Label>
                            <Textarea
                              id="source-link"
                              rows={3}
                              defaultValue="https://example.com"
                            />
                          </div>
                          <DateFieldGroup
                            legend="What is the effective date?"
                            selectId="eff-select"
                            textId="eff-enter"
                            placeholder="Select an effective date..."
                          />
                          <DateFieldGroup
                            legend="What is the enforcement date?"
                            selectId="enf-select"
                            textId="enf-enter"
                            placeholder="Select an enforcement date..."
                          />
                          <Button variant="outline" size="sm">
                            <CirclePlus className="h-4 w-4 mr-1" />
                            Add Source Information
                          </Button>
                        </div>
                      </div>

                      {/* Guideline subsection */}
                      <div className="space-y-3">
                        <h4 className="text-lg font-medium text-foreground">Guideline</h4>
                        <Separator />
                        <div className="max-w-xl space-y-4">
                          <div className="space-y-1.5">
                            <Label htmlFor="guideline-info" className="text-sm font-medium">
                              Guideline Information
                            </Label>
                            <Textarea id="guideline-info" rows={3} />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="guideline-link" className="text-sm font-medium">
                              Guideline Information Link
                            </Label>
                            <Textarea
                              id="guideline-link"
                              rows={3}
                              defaultValue="https://example.com"
                            />
                          </div>
                          <Button variant="outline" size="sm">
                            <CirclePlus className="h-4 w-4 mr-1" />
                            Add Guideline Information
                          </Button>
                        </div>
                      </div>

                      {/* Help FAQ subsection */}
                      <div className="space-y-3">
                        <h4 className="text-lg font-medium text-foreground">Help FAQ</h4>
                        <Separator />
                        <div className="max-w-xl space-y-4">
                          <div className="space-y-1.5">
                            <Label htmlFor="faq-info" className="text-sm font-medium">
                              Help FAQ Information
                            </Label>
                            <Textarea id="faq-info" rows={3} />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="faq-link" className="text-sm font-medium">
                              Help FAQ Information Link
                            </Label>
                            <Textarea
                              id="faq-link"
                              rows={3}
                              defaultValue="https://example.com"
                            />
                          </div>
                          <Button variant="outline" size="sm">
                            <CirclePlus className="h-4 w-4 mr-1" />
                            Add Help FAQ Information
                          </Button>
                        </div>
                      </div>

                      {/* Action row */}
                      <div className="flex gap-2">
                        <Button variant="secondary">Save Draft</Button>
                        <Button variant="ghost">Cancel</Button>
                      </div>
                    </div>
                  </AccordionItem>

                  {/* More accordion items - collapsed */}
                  <AccordionItem title="Organization" />
                  <AccordionItem title="Contact Details" />
                  <AccordionItem title="Media Details" />
                  <AccordionItem title="Additional Details" />
                </TabsContent>

                <TabsContent value="special">
                  <p className="text-sm text-muted-foreground pt-4">Requirements content</p>
                </TabsContent>
                <TabsContent value="training">
                  <p className="text-sm text-muted-foreground pt-4">Training content</p>
                </TabsContent>
                <TabsContent value="certifications">
                  <p className="text-sm text-muted-foreground pt-4">Certifications content</p>
                </TabsContent>
                <TabsContent value="approval">
                  <p className="text-sm text-muted-foreground pt-4">Approval content</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
