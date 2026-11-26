---
id: DR-0016
title: Registry components match approved visual baselines
status: accepted
severity: error
scope: [all]
enforcement: { type: visual, ref: visual/baseline }
rationale: Detects the design system itself drifting, such as a token edit or a shadcn upgrade changing every Button.
do: ["update baselines deliberately with a recorded decision"]
dont: ["accept snapshot updates without review"]
---
Screenshots of the `/gallery` route in light and dark are compared with committed baselines.
