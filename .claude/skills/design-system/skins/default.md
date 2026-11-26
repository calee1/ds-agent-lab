# Default Skin

> Always call `get_skin default` first — the tool returns the authoritative record including any skin-specific decision IDs.

## Character

Neutral neutral-gray palette, standard `0.5rem` border radius, system sans-serif font, no extra shadows. This is the right choice when the brief does not specify a visual treatment, or when the page should blend into any host application.

## Supported modes

Light and dark. The validator runs both; your page must look correct in both without any mode-specific code in the route.

## What you do not need to change

Nothing. The default skin is the base layer. All Tailwind semantic classes (`bg-background`, `text-foreground`, `border-border`, etc.) map to this skin's tokens unless a different `data-skin` is active.

## Checklist before submitting

- [ ] No hard-coded hex or oklch values in route code
- [ ] No `bg-gray-*`, `text-gray-*`, or other palette classes — only semantic ones
- [ ] Looks correct in both light and dark (run `pnpm validate <slug>` which checks both)
