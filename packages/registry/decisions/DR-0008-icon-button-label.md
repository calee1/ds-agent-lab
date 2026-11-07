---
id: DR-0008
title: Icon-only buttons need an aria-label
status: accepted
severity: error
scope: [button]
enforcement: { type: eslint, ref: ds/icon-button-label }
rationale: A button with only an icon has no name for assistive technology.
do: ["<Button size=\"icon\" aria-label=\"Add item\"><Plus /></Button>"]
dont: ["<Button size=\"icon\"><Plus /></Button>"]
---
Applies to every Button with a `size` starting with `icon`.
