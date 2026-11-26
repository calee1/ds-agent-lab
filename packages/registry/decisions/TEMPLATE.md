---
id: DR-XXXX
title: Short imperative title
status: proposed
severity: error   # error | warn
scope: [all]      # [all] | [routes] | [components]
# skin: wireframe  # omit for system-wide rules; set to skin slug for skin-specific ones
enforcement: { type: eslint, ref: ds/rule-ref }   # type: eslint | playwright | visual | reviewer
rationale: One sentence explaining why this rule exists.
do: ["correct example"]
dont: ["incorrect example"]
---
Longer explanation if needed. What breaks without this rule, edge cases, etc.
