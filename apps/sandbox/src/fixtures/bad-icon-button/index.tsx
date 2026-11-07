import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BadIconButton() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Button size="icon">
        <Plus />
      </Button>
    </div>
  )
}
