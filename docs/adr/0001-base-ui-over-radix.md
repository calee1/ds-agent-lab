# ADR 0001 — Use Base UI (via shadcn base-nova) instead of bare Radix UI

**Date:** 2026-11-25  
**Status:** Accepted

## Context

The sandbox needs accessible, unstyled primitives that shadcn can wrap. Two viable options were Radix UI (the original shadcn default) and Base UI (the newer MUI-backed library that shadcn's `base-nova` style targets).

## Decision

Use Base UI through shadcn's `base-nova` style. Component source lives in `src/components/ui/` and is never imported directly in route code (DR-0005).

## Reasons

- **shadcn alignment**: `base-nova` is shadcn's actively developed style targeting Base UI; Radix-based styles are in maintenance mode upstream.
- **API consistency**: Base UI components expose a single `data-slot` attribute pattern that the registry's `build.ts` relies on for introspection.
- **No lock-in**: Route code imports only through `@/components/ui/*`, so the primitive library is an implementation detail that can be swapped without touching routes.

## Consequences

- `@base-ui/react` is a package dependency of the component layer, explicitly listed in DR-0005's `dont` for route imports.
- Radix-flavored shadcn examples from the internet may not apply directly — always install via `pnpm dlx shadcn@latest add <name>` with style `base-nova`.
- Some Base UI APIs differ from Radix (e.g. `Accordion` has no `type`/`collapsible` props); always check the installed component source before using props from docs.
