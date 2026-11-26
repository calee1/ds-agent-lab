# Branded Skin

> Always call `get_skin branded` first — the tool returns the authoritative record including radius, font, cssFile and any skin-specific decision IDs.

## Character

Oceanic teal primary (`oklch ~0.52 0.16 185`), seafoam secondary, **Nunito Variable** font, `1rem` border radius (more rounded than default), layered card box-shadows. Use for marketing pages, landing pages, onboarding flows, and any page where the brand personality should be front and centre.

## Supported modes

Light and dark. Dark mode uses a deep ocean background (`oklch ~0.13`) with a brighter teal primary. The validator runs both; your page must look correct in both.

## What is different from default

| Property | Default | Branded |
|----------|---------|---------|
| Primary | neutral accent | teal (`--primary`) |
| Secondary | muted gray | seafoam green |
| Radius | `0.5rem` | `1rem` — more rounded |
| Font | system sans | Nunito Variable |
| Card shadow | none | layered teal-tinted shadow (light) / deep shadow (dark) |

Your route code does not set any of these. Write skin-agnostic code using semantic tokens; the CSS layer applies the branded values when `data-skin="branded"` is active.

## Guidance

- Prefer `bg-primary text-primary-foreground` for strong calls to action — the teal shows best here
- `bg-secondary` gives the seafoam fill for softer accents
- Do not add your own `shadow-*` classes — the skin's card shadow is intentional; adding more will compound them
- The Nunito font loads from `@fontsource-variable/nunito` which is already in the sandbox; you do not need to import it

## Checklist before submitting

- [ ] No hard-coded color values in route code
- [ ] No explicit `font-family` or `shadow-*` overrides that would fight the skin
- [ ] Looks correct in both branded-light and branded-dark (both are in THEMES and run by the validator)
