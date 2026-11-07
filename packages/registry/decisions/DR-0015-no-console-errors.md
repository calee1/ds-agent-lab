---
id: DR-0015
title: Pages load without console errors
status: accepted
severity: error
scope: [all]
enforcement: { type: playwright, ref: runtime/no-console-errors }
rationale: Console errors usually point to broken props, missing keys or failed requests.
do: ["clean console on load"]
dont: ["React warnings", "uncaught exceptions", "404 requests"]
---
Any `console.error`, page error or failed request during load fails the check.
