# ds-agent-lab

A test bed for agents that build UI from a design system and get validated before results are shown. shadcn/ui (Base UI flavor) is the test design system.

## Setup

Requires Node 24+ and pnpm 9.

```bash
pnpm install
```

`pnpm install` also generates the registry (`packages/registry/dist`). Playwright needs a browser once per machine:

```bash
pnpm --filter @ds/validators exec playwright install chromium
```

## What is in here

| Path | Purpose |
|---|---|
| `apps/sandbox` | Vite + React + TS + Tailwind v4 + shadcn app. Agent-built pages live in `src/routes/<slug>`. `src/fixtures` holds deliberate good and bad pages that test the validators. |
| `packages/registry` | Component API generated from the source, tokens from CSS, decision records (`decisions/system/`, `decisions/skins/`), patterns, overlays and skin metadata (`skins/`). |
| `packages/mcp-server` | MCP tools over the registry (`.mcp.json` registers it as `ds-registry`): `list_components`, `get_component`, `get_tokens`, `search_decisions`, `get_pattern`, `validate_code`, `list_skins`, `get_skin`. |
| `packages/validators` | Lint rules, Playwright and axe checks, keyboard focus checks, visual baselines, report builder. |
| `.claude/agents/` | `ui-builder` (builds routes), `ui-reviewer` (judges reviewer-enforced DRs and visual quality), `ui-accessibility` (judges keyboard patterns). |
| `.claude/commands/` | `/build-ui` command — orchestrates all three gates. |
| `.claude/skills/design-system/` | MCP-first skill guide for agents: tool call order, import rules, skin guidance. |

## Commands

```bash
pnpm dev                       # run the sandbox
pnpm registry:build            # regenerate the registry after changing components, tokens or decisions
pnpm validate <slug>           # full pipeline for apps/sandbox/src/routes/<slug>
pnpm visual                    # compare /gallery against baselines (add --update to re-record)
```

Tests (run per package): `pnpm --filter @ds/validators test`, `pnpm --filter @ds/mcp-server test`.

## Skins

The sandbox supports three visual treatments set via `data-skin` on `<html>`:

| Skin | Modes | Character |
|------|-------|-----------|
| `default` | light, dark | Neutral grays, standard radius |
| `wireframe` | light only | Grayscale, square corners, dashed cards |
| `branded` | light, dark | Oceanic teal, Nunito, 1 rem radius, elevated shadows |

## Building a UI with agents

Open Claude Code in this folder and run `/build-ui <description of the page>`. The builder reads the registry and decision records, then three gates check the result:

1. **Automated** — lint, typecheck, Playwright (axe, token colors, keyboard focus rings, layout)
2. **Reviewer** — reviewer-enforced decision records, brief completeness, visual quality
3. **Accessibility** — Escape key behavior, focus restoration, tab trap, tab order

A page is presented only when all three gates pass on the same code, within 3 repair rounds total.
