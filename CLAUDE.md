## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## API docs baseline (docs/api.md, docs/api/*.md)

`docs/api.md` starts with an HTML comment block (`docs-baseline`) recording the git commit,
package version, and date the API docs were last verified against source - see that block for
the exact format and the `git diff <commit>..HEAD -- src/` command it documents.

Rules:
- Whenever you write or update these API docs, record (or update) that baseline block with the
  commit you verified against - so a later session can diff from a known point instead of
  re-reading everything from scratch.
- Before trusting/updating the docs, diff `src/` (and `test/**/*.spec.ts` for examples) between
  the recorded commit and `HEAD` to see what actually changed, then update only the affected
  doc section(s) - don't regenerate everything unless the diff is broad enough to warrant it.
- After updating, bump `git-commit`/`package-version`/`date` in the baseline block to the new
  `HEAD` (only once the docs are verified accurate as of that commit).

## Before every push

Run these in order before any `git push`, and push only if every step passes:

1. `rman deps` - check for newer dependency versions.
2. If it lists any update, `rman deps -u` to apply it.
3. `rman ci` - clean install: deletes `node_modules` and the lockfile and reinstalls from scratch
   (pnpm, per `packageManager`).
4. Checks: `npm run compile`, `rman lint`, `rman check`, `rman build`.
5. Tests: `npm run citest`.
6. Commit any dependency/lockfile changes these produced, then push.

If an upgrade or the clean install breaks a check or a test, stop and report instead of pushing.
