# ds-agent-lab

Test bed for agents that build UI from a design system (shadcn/ui, Base UI flavor) and are validated before results are shown.

## Layout
- `apps/sandbox`: Vite + React + TS + Tailwind v4 + shadcn. Agent-built pages live in `src/routes/<slug>/index.tsx`. `src/fixtures/*` are deliberate good/bad pages used to test the validators, served at `/__fixtures/<name>`.
- `packages/registry`: source of truth. `pnpm registry:build` regenerates `dist/` and `apps/sandbox/public/registry/` from the component source, CSS token files, `decisions/system/*.md`, `decisions/skins/<skin>/*.md`, `patterns/*.md`, `overlays/*.json` and `skins/*.json`. `node src/build.ts --check` fails on drift.
- `packages/mcp-server`: MCP tools over the registry (`.mcp.json` registers it as `ds-registry`).
- `packages/validators`: lint rules, Playwright/axe/keyboard checks, report builder. `pnpm validate <slug>` or `pnpm validate <name> --fixture`.
- `.claude/agents/`: `ui-builder` (builds routes), `ui-reviewer` (reviewer-enforced DRs + visual), `ui-accessibility` (keyboard patterns).
- `.claude/commands/build-ui.md`: `/build-ui` command — three-gate orchestrator.
- `.claude/skills/design-system/`: MCP-first skill guide for agents.

## Rules for agents
- Build only through the registry. Use `/build-ui <brief>`.
- Do not edit decision records, validators or `src/components/ui` to make something pass.
- After changing a component, token or decision record, run `pnpm registry:build`, then the tests in `packages/validators` and `packages/mcp-server`.
