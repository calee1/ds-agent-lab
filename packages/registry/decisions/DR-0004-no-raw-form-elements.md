---
id: DR-0004
title: Use design system components, not raw form elements
status: accepted
severity: error
scope: [button, input, select, textarea]
enforcement: { type: eslint, ref: ds/no-raw-form-elements }
rationale: The components carry focus rings, invalid states, sizing and accessibility behavior. Raw elements lose all of it.
do: ["<Button>", "<Input>", "<Textarea>", "<Select>"]
dont: ["<button>", "<input>", "<select>", "<textarea>"]
---
Import the component from `@/components/ui/*`. Check the registry before building a custom one.
