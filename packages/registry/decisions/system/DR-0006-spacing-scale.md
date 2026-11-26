---
id: DR-0006
title: Spacing stays on the scale
status: accepted
severity: error
scope: [all]
enforcement: { type: eslint, ref: ds/spacing-scale }
rationale: A consistent spacing rhythm is what makes pages read as one system.
do: ["p-4", "gap-6", "space-y-2"]
dont: ["p-13", "gap-15", "mt-17"]
---
Padding, margin, gap and size utilities use values from `tokens.json` `spacingScale`.
