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
| `packages/registry` | Component API generated from the source, tokens from `index.css`, decision records (`decisions/`), patterns and curated overlays. |
| `packages/mcp-server` | MCP tools over the registry. `.mcp.json` registers it as `ds-registry`. |
| `packages/validators` | Lint rules, Playwright and axe checks, visual baselines, report builder. |
| `.claude/` | `ui-builder` and `ui-reviewer` agents and the `/build-ui` command. |

## Commands

```bash
pnpm dev                       # run the sandbox
pnpm registry:build            # regenerate the registry after changing components, tokens or decisions
pnpm validate <slug>           # full pipeline for apps/sandbox/src/routes/<slug>
pnpm visual                    # compare /gallery against baselines (add --update to re-record)
```

Tests (run per package): `pnpm --filter @ds/validators test`, `pnpm --filter @ds/mcp-server test`.

## Building a UI with agents

Open Claude Code in this folder and run `/build-ui <description of the page>`. The builder reads the registry and decision records, the validators check the result, and a read-only reviewer judges what automation cannot. A page is presented only when everything passes, within 3 repair rounds.
