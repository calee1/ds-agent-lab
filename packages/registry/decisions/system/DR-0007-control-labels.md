---
id: DR-0007
title: Every form control has an accessible label
status: accepted
severity: error
scope: [input, textarea, checkbox, switch, select]
enforcement: { type: eslint, ref: ds/control-label }
rationale: Unlabeled controls fail screen readers and make click targets smaller.
do: ["<Label htmlFor=\"email\">Email</Label><Input id=\"email\" />", "<Input aria-label=\"Search\" />"]
dont: ["<Input placeholder=\"Email\" />"]
---
Pair each control `id` with a `Label htmlFor`, or give it `aria-label` when a visible label is wrong for the design. Placeholders are not labels.
