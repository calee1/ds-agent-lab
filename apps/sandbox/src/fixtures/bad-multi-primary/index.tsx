import { Button } from "@/components/ui/button"

export default function BadMultiPrimary() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="flex gap-2 p-4">
        <Button>Save</Button>
        <Button>Publish</Button>
        <Button>Share</Button>
      </main>
    </div>
  )
}
