---
id: DR-0002
title: No arbitrary Tailwind values
status: accepted
severity: error
scope: [all]
enforcement: { type: eslint, ref: ds/no-arbitrary-values }
rationale: Arbitrary values bypass the scale, so layouts drift from the system and cannot be changed centrally.
do: ["mt-4", "w-full", "max-w-screen-xl"]
dont: ["mt-[13px]", "w-[347px]", "text-[17px]"]
---
Use the Tailwind scale. The only bracket form allowed is a token reference such as `w-[var(--sidebar-width)]`. Variant selectors like `[&_svg]:size-4` are fine because they sit before the utility.
