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
- Site services perform HTTP via the shared transport `@/lib/api/client` (`apiGet`/`apiPost`, throws `ApiClientError`), then validate inputs/outputs with zod (`.parse`) and return typed promises. Single-file services stay flat (`*.service.ts`); a feature with mock/mapper/constants files uses a nested `services/` subfolder (see `product-listing`, `product-detail`). Backend not decided yet → services are backed by an in-memory mock store; swapping to real API later only touches the service, never the UI.
- Types come exclusively from zod, in one place: `src/lib/schemas/` (`index.ts` re-exports). Component/service code uses `z.infer<>` types — no hand-authored interfaces for domain objects.
- Derivation rule: `XBaseSchema` = creation payload (no `id`); `XSchema = XBaseSchema.extend({ id })` = entity + update payload; export `CreateX`, `X`, `UpdateX` inferred types.

### Backend API layer (routes under `src/app/api/`)
- Request/response zod schemas for the HTTP API live in `src/lib/schemas/api/<group>.ts` (`auth.ts`, `category.ts`, `product.ts`, `variant.ts`, `promotion.ts`, `promotion-target.ts`, `product-category.ts`, `common.ts`). **No barrel/`index.ts` in `api/`** — routes import the individual files directly, e.g. `import { CategoryCreateSchema } from "@/lib/schemas/api/category"`.
- Per entity: `XCreateSchema` (no `id`) and `XUpdateSchema` (`id` required, every field optional, **no defaults** so partial updates never touch omitted columns).
- POST routes follow the upsert rule: if the request body contains `id` → update, otherwise create.
- Route handlers stay thin. Each exported `GET`/`POST` calls `handleErrors(() => _getX(request))` / `handleErrors(() => _postX(request))`; the logic lives in `_getX` / `_postX` / `_getXById` functions that throw `ApiError(status, message)` (funneled by `handleErrors`). Mutating `_postX` handlers call `requireAuth(request)` (defense-in-depth behind `src/proxy.ts`, which already enforces a valid JWT on every non-GET `/api/*` request except `/api/auth/*`).
- Shared helpers live in `src/lib/api/` (`http.ts`: `ok`/`err`/`ApiError`/`handleErrors`; `request.ts`: `readJsonBody`/`pickDefined`/`isUniqueViolation`). Per-entity upsert queries live in the route file, not a shared crud helper.
