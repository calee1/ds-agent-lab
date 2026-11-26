# Wireframe Skin

> Always call `get_skin wireframe` first — the tool returns the authoritative record including radius, cssFile and any skin-specific decision IDs.

## Character

Grayscale palette, `0rem` border radius (square corners), no box shadows, dashed borders on Card and Popover. Useful for reviewing layout and information hierarchy before colour is applied. Intentionally low visual fidelity.

## Supported modes

**Light only.** Dark wireframe is not supported and not validated. If the brief asks for wireframe dark, say it is out of scope.

## What is different from default

| Property | Default | Wireframe |
|----------|---------|-----------|
| Radius | `0.5rem` | `0rem` — square on everything |
| Shadows | component defaults | none (`box-shadow: none !important` on all children) |
| Card / Popover border | solid | dashed |
| Palette | warm neutrals | pure grays (oklch chroma = 0) |

The CSS handles all of this — your route code changes nothing. Write exactly the same code you would for the default skin.

## When to use

- Layout and structure reviews before the branded or default skin is applied
- Briefings, stakeholder walkthroughs, and wireframe documentation
- Automated layout checks where colour is a distraction

## Checklist before submitting

- [ ] Route code is identical to what you would write for the default skin
- [ ] No inline styles, no `shadow-*` overrides in route code — the skin's CSS suppresses them
- [ ] Validator runs only the `wireframe-light` theme (the THEMES list excludes wireframe-dark)
