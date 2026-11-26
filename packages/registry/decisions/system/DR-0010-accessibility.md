---
id: DR-0010
title: No serious or critical accessibility violations
status: accepted
severity: error
scope: [all]
enforcement: { type: playwright, ref: a11y/axe }
rationale: Accessibility is a baseline requirement, including color contrast in both themes.
do: ["semantic landmarks", "sufficient contrast", "labelled controls"]
dont: ["div click handlers", "low contrast text"]
---
axe-core runs in light and dark at desktop width. Serious and critical findings fail the build. Static jsx-a11y rule hits are reported under this record too.
