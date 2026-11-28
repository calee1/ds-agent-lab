---
id: DR-0012
title: One primary action per view
status: accepted
severity: warn
scope: [button]
enforcement: { type: playwright, ref: ui/single-primary }
rationale: Two competing primary actions dilute the main task. The same primary action may appear more than once (e.g. a hero CTA repeated in a footer) — both instances use the default variant because they represent identical intent.
do: ["use default-variant for the page's primary action", "repeat the same default-variant Button for the same action in multiple locations (hero + footer)", "use outline or ghost for secondary actions"]
dont: ["two default-variant Buttons with different hrefs or different onClick targets on the same page", "competing primary actions that ask the user to choose between two destinations"]
---
Counts distinct primary actions, not distinct primary Button elements. Multiple default-variant Buttons are allowed when they all share the same destination or trigger the same action. Dialog footers may have their own primary.
