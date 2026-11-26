---
id: DR-0001
title: Use semantic color tokens only
status: accepted
severity: error
scope: [all]
enforcement: { type: eslint, ref: ds/no-raw-colors }
rationale: Semantic tokens flip correctly between light and dark and keep brand changes to one file.
do: ["bg-background", "text-muted-foreground", "border-border"]
dont: ["text-blue-500", "bg-gray-100", "bg-[#fff]"]
---
All color classes must come from the token set in tokens.json (`semanticColorClasses`).
