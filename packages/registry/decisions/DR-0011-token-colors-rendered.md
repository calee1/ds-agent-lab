---
id: DR-0011
title: Rendered colors resolve to design tokens
status: accepted
severity: error
scope: [all]
enforcement: { type: playwright, ref: theme/token-colors }
rationale: Lint catches class names, but computed styles catch colors that arrive through other paths such as CSS or library defaults.
do: ["colors that come from --background, --foreground, --primary and friends"]
dont: ["hard-coded rgb or hex values"]
---
For text, background and border colors on visible elements, the computed value must match a token color in the active theme (alpha variants allowed).
