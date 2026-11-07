---
id: DR-0005
title: Only approved imports in route code
status: accepted
severity: error
scope: [all]
enforcement: { type: eslint, ref: ds/allowed-imports }
rationale: Importing UI primitives or other UI kits directly sidesteps the design system and its decisions.
do: ["@/components/ui/*", "lucide-react", "react", "@/lib/utils"]
dont: ["@base-ui/react", "@radix-ui/*", "react-bootstrap", "@mui/*"]
---
Route code may import React, lucide-react, recharts, the `@/` alias and relative files only.
