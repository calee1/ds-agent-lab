---
id: DR-0003
title: No inline styles
status: accepted
severity: error
scope: [all]
enforcement: { type: eslint, ref: ds/no-inline-style }
rationale: Inline styles skip theming, responsive variants and dark mode.
do: ["className=\"p-4\""]
dont: ["style={{ padding: 16 }}"]
---
Style only through Tailwind classes and `cn()`.
