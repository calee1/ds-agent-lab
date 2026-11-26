---
description: Build a UI route from a brief, validate it against the design system, and present it only if it passes all three gates.
argument-hint: <short description of the page to build>
---

Build this UI: $ARGUMENTS

Run the loop below. The cap is strict: **at most 3 repair rounds in total** across all gates. Each repair counts as one round regardless of which gate triggered it.

1. Choose a kebab-case route slug from the brief. Confirm `apps/sandbox/src/routes/<slug>` does not exist yet.
2. Launch the `ui-builder` agent with the slug and the brief.
3. Run `pnpm validate <slug>`. If it exits non-zero, launch `ui-builder` again with the path to `reports/<slug>/report.md` and the instruction to fix every error. Return to step 3. **Count this as a repair round.**
4. When the automated report passes, launch the `ui-reviewer` agent with the slug, the brief and `reports/<slug>/report.json`. Parse its JSON verdict.
5. Launch the `ui-accessibility` agent with the slug, the brief and `reports/<slug>/report.json`. Parse its JSON verdict.
6. If **either** the reviewer or the accessibility agent returned `fail`:
   - Launch `ui-builder` with the combined failing items from both verdicts and the instruction to fix them.
   - Return to step 3 (re-run validators first, then both agents on the same new code). **Count this as a repair round.**
7. Present the result only when all three gates pass on the **same** final code:
   - the route path (`/<slug>`) and how to run it (`pnpm dev`)
   - the final screenshots (desktop light and dark, mobile)
   - a table of every decision record with its result, including reviewer- and accessibility-judged ones
   - how many repair rounds were used
8. If you hit the cap, do not present the page as done. Show the outstanding failures with their DR ids or check ids and say which gate failed.

**Gate summary:**
| Gate | Tool | What it checks |
|------|------|----------------|
| 1. Automated | `pnpm validate <slug>` | Lint, typecheck, Playwright (axe, token colors, focus rings, layout) |
| 2. Reviewer | `ui-reviewer` agent | Reviewer-enforced DRs, brief completeness, visual quality |
| 3. Accessibility | `ui-accessibility` agent | Escape key behavior, focus restoration, tab trap, tab order |

Gates 2 and 3 always run together and must both pass on the same code. If either fails, re-run all three gates after the fix.

Never edit the registry, validators, decision records or `src/components/ui` to make a build pass. If you think a rule is wrong, say so and stop.
