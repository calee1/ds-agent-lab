---
id: DR-0014
title: Pages use the standard layout wrapper and type hierarchy
status: accepted
severity: warn
scope: [all]
enforcement: { type: reviewer, ref: review/page-layout }
rationale: A shared page frame and heading scale make pages feel related.
do: ["min-h-screen bg-background wrapper", "max-w-screen-xl mx-auto px-4 py-8 space-y-6", "h1 text-2xl font-bold tracking-tight"]
dont: ["custom page chrome", "multiple h1 elements", "skipping heading levels"]
---
See the `page-layout` pattern. The reviewer checks structure and heading order.
