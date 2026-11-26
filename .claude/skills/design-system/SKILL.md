# Design System Skill

This sandbox uses **shadcn `base-nova`** (Base UI primitives) with a two-axis skin system. Everything you need is in the registry MCP server (`ds-registry`). Read from it; never copy tokens or APIs into your code.

## MCP tools — call in this order

| Step | Tool | When |
|------|------|------|
| 1 | `get_pattern` (no arg) | Always — read `page-layout` before writing a single line |
| 2 | `search_decisions` `severity:"error"` | Always — these are the rules you are validated against |
| 3 | `list_components` | Once per session to see what exists |
| 4 | `get_component <slug>` | For every component you plan to use — Base UI APIs differ from Radix |
| 5 | `get_tokens` | Only when you need a color name or scale value |
| 6 | `list_skins` | When the brief mentions a visual treatment or skin |
| 7 | `get_skin <slug>` | For the full skin record: modes, radius, font, skin-specific DRs |
| 8 | `validate_code` | Before writing the file to disk — fix until `ok: true` |

## Import rules (DR-0005)

```ts
// Allowed
import { X } from "@/components/ui/<slug>"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { Chart } from "recharts"

// Never
import * from "@base-ui/react"      // DR-0005
import * from "@radix-ui/react-*"   // DR-0005
```

## Token rules (DR-0001, DR-0002, DR-0003)

- Use Tailwind semantic classes: `bg-background`, `text-muted-foreground`, `border-border`
- Never: `style={{ color: "..." }}`, `bg-gray-100`, `mt-[13px]`
- Radius: `rounded-sm` / `rounded-md` / `rounded-lg` — do not hard-code `rounded-[Xrem]`

## Controls (DR-0004, DR-0007, DR-0008)

- Never use raw `<button>`, `<input>`, `<select>`, `<textarea>` — always a UI component
- Every control needs a visible `<Label>` or an `aria-label`
- Icon-only buttons must have `aria-label`
- Delete / remove / reset must open an `<AlertDialog>`

## Skin selection

Call `list_skins` to see what is available, then `get_skin <slug>` for details. Skin guidance lives in the skin-specific files next to this one:

- [`skins/default.md`](skins/default.md) — neutral palette, all-purpose
- [`skins/wireframe.md`](skins/wireframe.md) — grayscale, layout reviews, **light only**
- [`skins/branded.md`](skins/branded.md) — oceanic teal, Nunito, light + dark

The skin is set by `data-skin` on `<html>` — your route code does not set it. Write skin-agnostic code; the CSS layer does the rest. The only exception is when a skin-specific DR (returned by `get_skin`) restricts what you can do.

## Validation

After building, run `pnpm validate <slug>` from the repo root. Read `reports/<slug>/report.md`. Fix every `error`, then as many `warn` as possible. Do not edit `src/components/ui`, decision records, or validators to make something pass.
