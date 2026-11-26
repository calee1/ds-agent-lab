# Shadcn Baseline

Records the state of `apps/sandbox/src/components/ui/` at each baseline tag so upgrades can be diffed against it.

## baseline-v1

| Field | Value |
|---|---|
| Tag | `baseline-v1` |
| Date | 2026-11-25 |
| shadcn CLI | 4.23.1 (`pnpm dlx shadcn@latest`) |
| Style | `base-nova` |
| Icon library | lucide-react |
| Tailwind | v4 |

### Components (66)

accordion, alert, alert-dialog, aspect-ratio, attachment, avatar, badge, breadcrumb,
bubble, button, button-group, calendar, card, carousel, chart, checkbox, code-block,
collapsible, combobox, command, context-menu, dialog, direction, drawer, dropdown-menu,
empty, field, hover-card, input, input-group, input-otp, item, kbd, label, marker,
menubar, message, message-scroller, native-select, navigation-menu, pagination, popover,
progress, questionnaire, radio-group, resizable, scroll-area, select, separator, sheet,
sidebar, skeleton, slider, spinner, switch, table, tabs, textarea, toast, toggle,
toggle-group, tooltip, trace

### New dependencies added

| Package | Purpose |
|---|---|
| `input-otp` | OTP input primitive |
| `react-resizable-panels` | Resizable panel layout |
| `shiki` | Syntax highlighting (code-block) |
| `react-day-picker` | Calendar picker |
| `date-fns` | Date utilities for calendar |
| `embla-carousel-react` | Carousel primitive |

### DR-0005 note

These packages are **component-internal** dependencies (used inside `src/components/ui/`).
Route code must still import only through `@/components/ui/*` per DR-0005.
`@base-ui/react` is listed in DR-0005's `dont` for routes; this remains unchanged — Base UI is consumed by the shadcn wrappers, not by routes directly.

## Upgrade path

To incorporate a future shadcn release:
1. Run `pnpm dlx shadcn@latest add --all --diff` (or `--dry-run`) to preview changes.
2. Review each overwrite against local modifications.
3. Create a new branch, apply, rebuild the registry, run validators and visual tests.
4. Tag `baseline-v2` after PR merges.
