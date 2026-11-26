import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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

export default function SkinDemo() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-screen-xl space-y-6 px-4 py-8">
        {/* Page header */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold tracking-tight">Skin demo</h1>
          <p className="text-sm text-muted-foreground">
            Use the skin switcher in the bottom-right corner to toggle between skins. Each skin
            changes the visual character of the page — colors, borders and typography weight — while
            the layout and component structure stay the same.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge>default</Badge>
            <Badge variant="secondary">wireframe</Badge>
            <Badge variant="outline">branded</Badge>
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
              <Textarea
                id="new-note"
                placeholder="Add a note…"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" type="button">Cancel</Button>
              <Button type="submit">Save</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
