---
id: DR-0009
title: No horizontal page overflow at any supported width
status: accepted
severity: error
scope: [all]
enforcement: { type: playwright, ref: layout/no-h-overflow }
rationale: Sideways scrolling on a phone is a broken layout.
do: ["flex-wrap", "min-w-0", "overflow-x-auto on wide tables"]
dont: ["fixed widths wider than the viewport"]
---
Checked at 375, 768 and 1280 px in both themes. Only tables, code and diagrams may be wider, inside their own scroll container.
