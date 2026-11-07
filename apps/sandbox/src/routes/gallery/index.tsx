import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

const buttonVariants = ["default", "outline", "secondary", "ghost", "destructive", "link"] as const
const badgeVariants = ["default", "secondary", "destructive", "outline"] as const

export default function Gallery() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-screen-xl space-y-6 px-4 py-8">
        <h1 className="text-2xl font-bold tracking-tight">Component gallery</h1>
        <p className="text-sm text-muted-foreground">Visual baseline for the design system. Changes here must be reviewed.</p>

        <Card>
          <CardHeader>
            <CardTitle>Buttons and badges</CardTitle>
            <CardDescription>Every variant.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {buttonVariants.map((v) => (
                <Button key={v} variant={v}>
                  {v}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm">sm</Button>
              <Button>default</Button>
              <Button size="lg">lg</Button>
              <Button disabled>disabled</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {badgeVariants.map((v) => (
                <Badge key={v} variant={v}>
                  {v}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Form controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feedback and data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTitle>Heads up</AlertTitle>
              <AlertDescription>Alert description text.</AlertDescription>
            </Alert>
            <Progress value={60} />
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
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
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
