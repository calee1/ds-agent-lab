---
id: DR-0017
title: Interactive elements must have visible focus indicators
status: accepted
severity: warn
scope: [all]
enforcement: { type: playwright, ref: keyboard/focus-ring }
rationale: Keyboard users must be able to see which element has focus. The design system's base styles provide focus rings; route code must not suppress them.
do: ["Rely on the skin's default focus ring styles", "Use Tailwind ring utilities (ring-2, ring-ring) if adding a custom interactive element"]
dont: ["outline-none without a ring replacement", "opacity-0 on a focus ring class"]
---
The Playwright check tabs through visible interactive elements (up to 15) and reports any that have neither a computed outline nor a box-shadow after a keyboard Tab press. This catches `outline: none` overrides that were not paired with a ring replacement.

Focus rings are a skin concern: each skin's CSS sets the base `:focus-visible` style. Do not override them in route code.
