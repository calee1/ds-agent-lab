# ds-agent-lab

Test bed for agents that build UI from a design system (shadcn/ui, Base UI flavor) and are validated before results are shown.

## Layout
- `apps/sandbox`: Vite + React + TS + Tailwind v4 + shadcn. Agent-built pages live in `src/routes/<slug>/index.tsx`. `src/fixtures/*` are deliberate good/bad pages used to test the validators, served at `/__fixtures/<name>`.
- `packages/registry`: source of truth. `pnpm registry:build` regenerates `dist/` and `apps/sandbox/public/registry/` from the component source, `index.css` tokens, `decisions/*.md`, `patterns/*.md` and `overlays/*.json`. `node src/build.ts --check` fails on drift.
- `packages/mcp-server`: MCP tools over the registry (`.mcp.json` registers it as `ds-registry`).
- `packages/validators`: lint rules, Playwright/axe checks, report builder. `pnpm validate <slug>` or `pnpm validate <name> --fixture`.

## Rules for agents
- Build only through the registry. Use `/build-ui <brief>`.
- Do not edit decision records, validators or `src/components/ui` to make something pass.
- After changing a component, token or decision record, run `pnpm registry:build`, then the tests in `packages/validators` and `packages/mcp-server`.
