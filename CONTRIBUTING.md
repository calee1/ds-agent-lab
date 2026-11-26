# Contributing

This repo is public. Never commit secrets or private or client material.

## Workflow
1. Open an issue that says what "done" looks like.
2. Update `main` and branch from it: `git switch main`, `git pull`, `git switch -c type/short-name`.
   Types: `feat`, `fix`, `docs`, `ci`, `chore`.
3. Make small commits, one topic each.
4. Push: `git push -u origin type/short-name`.
5. Open a pull request. Write `Closes #<issue>` so merging closes the issue.
6. Wait for CI, review **Files changed**, then merge with a merge commit.
7. Delete the branch, then run `git switch main` and `git pull`.

## Checks to run locally
```bash
pnpm install
pnpm --filter sandbox build
pnpm --filter @ds/mcp-server test
pnpm --filter @ds/validators test
pnpm visual
```

CI skips the baseline comparison because the committed screenshots depend on the operating system that made them.
