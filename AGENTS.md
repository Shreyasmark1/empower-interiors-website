<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Code organization (project convention)

Design spec: `furnish-design-system.md` (single source of truth for tokens/decisions). Implementation checklist: `design-system-checklist.md`.

### Feature folders
Every component and route lives in its own folder, with its storybook story colocated:

```
src/components/ui/button/
  button.tsx           # component
  button.stories.tsx   # story (colocated)
  index.ts             # barrel: export * from "./button"
src/components/product-card/
  product-card.tsx
  product-card.stories.tsx
  product-card.service.ts   # ONLY when the component performs a data action/API call
  index.ts
src/app/<route>/
  page.tsx
  page.stories.tsx          # optional page stories
```

Consumers import via the folder barrel: `@/components/ui/button`, `@/components/product-card`.

### Data layer
- UI components never call the backend directly. Any data fetch or action goes through a colocated `*.service.ts` in the same feature folder (promote to `src/lib/services/` once shared by multiple features).
- Services own the transport (fetch/axios), validate inputs and outputs with zod (`.parse`), and return typed promises. Backend not decided yet → services are backed by an in-memory mock store; swapping to real API later only touches the service, never the UI.
- Types come exclusively from zod, in one place: `src/lib/schemas/` (`index.ts` re-exports). Component/service code uses `z.infer<>` types — no hand-authored interfaces for domain objects.
- Derivation rule: `XBaseSchema` = creation payload (no `id`); `XSchema = XBaseSchema.extend({ id })` = entity + update payload; export `CreateX`, `X`, `UpdateX` inferred types.
