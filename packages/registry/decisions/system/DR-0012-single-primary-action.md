---
id: DR-0012
title: One primary Button per view
status: accepted
severity: warn
scope: [button]
enforcement: { type: playwright, ref: ui/single-primary }
rationale: Two competing primary actions dilute the main task.
do: ["one default-variant Button, others outline or ghost"]
dont: ["several default-variant Buttons side by side"]
---
Counts visible `data-slot="button"` elements with the default variant outside dialogs. Dialog footers may have their own primary.
