# ADR 0002 — Two-axis skin system: mode × treatment

**Date:** 2026-11-25  
**Status:** Accepted

## Context

The sandbox needs to support multiple visual treatments (default, wireframe, branded) alongside light and dark mode. Several approaches were considered:

1. One CSS class per full combination (`dark-wireframe`, `light-branded`, …)
2. A single `data-theme` attribute encoding both axes (`theme="wireframe-dark"`)
3. Two independent axes: a `.dark` class for mode and a `data-skin` attribute for treatment

## Decision

Use two independent axes:
- **Mode**: `.dark` class on `<html>` — toggled by the skin switcher and the validator
- **Treatment**: `data-skin="<slug>"` attribute on `<html>` — values: `default`, `wireframe`, `branded`

CSS is composed via descendant selectors: `[data-skin="wireframe"]` for the skin, `[data-skin="wireframe"].dark` for its dark variant.

## Reasons

- **Independent concerns**: mode and treatment vary separately; a user might want wireframe in both light and dark (or just light, as decided for wireframe).
- **CSS cascade works naturally**: `[data-skin="branded"].dark` overrides `[data-skin="branded"]` without specificity fights.
- **Validator loop is explicit**: `rendered.ts` lists supported combos (`THEMES`) rather than auto-generating a full cartesian product, so unsupported combos (wireframe-dark) are simply not tested.
- **No component forks**: anything tokens can't express (box-shadow suppression, dashed borders) is CSS scoped to the skin selector — no duplicate component files.

## Consequences

- Each new skin requires entries in `THEMES` in `rendered.ts` for each supported mode.
- Skin-specific decision records live in `decisions/skins/<skin>/` and carry a `skin` frontmatter field.
- The `SkinSwitcher` component in `App.tsx` must be updated when new skins are added.
- Visual baselines multiply: each new supported combo adds 3 screenshots (mobile/tablet/desktop) per validated route.
