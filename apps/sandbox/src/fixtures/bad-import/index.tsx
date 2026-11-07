import { Button as BaseButton } from "@base-ui/react/button"

export default function BadImport() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BaseButton>Direct primitive</BaseButton>
    </div>
  )
}
