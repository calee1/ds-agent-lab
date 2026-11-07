---
description: Build a UI route from a brief, validate it against the design system, and present it only if it passes.
argument-hint: <short description of the page to build>
---

Build this UI: $ARGUMENTS

Run the loop below. The caps are strict: at most 3 repair rounds in total across all steps.

1. Choose a kebab-case route slug from the brief. Confirm `apps/sandbox/src/routes/<slug>` does not exist yet.
2. Launch the `ui-builder` agent with the slug and the brief.
3. Run `pnpm validate <slug>`. If it exits non-zero, launch `ui-builder` again with the path to `reports/<slug>/report.md` and the instruction to fix every error. Go back to step 3. Count this as a repair round.
4. When the automated report passes, launch the `ui-reviewer` agent with the slug, the brief and `reports/<slug>/report.json`. Parse its JSON verdict.
5. If the verdict is `fail`, launch `ui-builder` with the reviewer's failing decisions and `fix` text, then return to step 3. Count this as a repair round.
6. Present the result only when the automated report passes and the reviewer verdict is `pass`:
   - the route path (`/<slug>`) and how to run it (`pnpm dev`)
   - the final screenshots (desktop light and dark, mobile)
   - a table of every decision record with its result, including the reviewer-judged ones
   - how many repair rounds were used
7. If you hit the cap, do not present the page as done. Show the outstanding failures with their DR ids and say which layer failed.

Never edit the registry, validators, decision records or `src/components/ui` to make a build pass. If you think a rule is wrong, say so and stop.
