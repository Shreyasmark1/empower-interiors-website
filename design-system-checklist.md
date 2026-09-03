# Furnish Design System — Implementation Checklist

Single source of truth: [`furnish-design-system.md`](furnish-design-system.md). Every item references the spec section and the edit point from §17.

## 1. Tokens (`src/app/globals.css`)
- [x] Canvas/surface swapped: page `--bg-page` = `#FDFBFD`, surface/card `--bg-surface` = `#FFFFFF` (§2/§14)
- [x] Brand colors as `:root` vars (§2)
- [x] Supporting colors (`--input-border`, `--placeholder`, `--disabled-*`, `--error`, `--success-*`, `--soldout-bg`, `--category-tag-bg`, code colors) (§2)
- [x] Gradients as `@theme --gradient-*` tokens → `bg-gradient-*` utilities (brand / hero / surface / dark-overlay) (§3)
- [x] Typography roles tokens (implied by `@theme` + HTML roles) (§4)
- [x] Spacing scale `--spacing-*` (2xs–4xl) (§5)
- [x] Radius `--radius-*`: sm 4 / md 8 / lg 12 / xl 16 (§6)
- [x] Shadows `--shadow-sm/md/lg` plum-tinted (§7)
- [x] Semantic shadcn bridge in `:root` + `@theme inline` (§2)
- [x] `.dark` block kept but inert (light-theme-only for now)

## 2. Fonts (`src/app/layout.tsx`)
- [x] `Roboto` + `Roboto_Mono` via `next/font/google` → vars `--font-roboto` / `--font-roboto-mono` (§4)
- [x] `@theme inline` maps `--font-sans` / `--font-mono` / `--font-heading`

## 3. Icons (`src/lib/icons.ts` + `components.json`)
- [x] `iconLibrary: "hugeicons"` in `components.json`
- [x] Canonical `src/lib/icons.ts`: aliases + `iconConfig` sizes + `Font/gap` grid (§11)
- [x] Toast icon map + `HugeiconsIcon` renderer for the sonner addon
- [x] `@hugeicons/react`, `@hugeicons/core-free-icons`, `hugeicons-react` declared as direct deps
- [x] No component imports icons from `hugeicons-react` directly — all go through `@/lib/icons` (§17)

## 4. Code organization (feature folders)
- [x] Every component/story in its own folder with a barrel: `src/components/ui/<name>/<name>.tsx` + `<name>.stories.tsx` + `index.ts`
- [x] Feature components under `src/components/<name>/` (product-card, review-card, skeleton-card, toast-demo)
- [x] Data/action components colocate `*.service.ts` (owns API/mock transport, zod-validated)
- [x] No `demos/` grab-bag; each demo is a first-class feature folder

## 5. Data layer & types
- [x] `zod` dependency added
- [x] Single source of truth: `src/lib/schemas/` (product, cart, review; `index.ts` re-exports)
- [x] Base-for-create pattern: `XBaseSchema` (no `id`) → `CreateX`; `XSchema = XBaseSchema.extend({ id })` → `X` / `UpdateX`
- [x] Components use `z.infer<>` types only (no hand-authored domain interfaces)
- [x] `product-card.service.ts`: mock-backed `listProducts` / `addToCart` / `getCartItems`, all payloads `.parse()`d, return typed promises (swap to real API later touches only the service)
- [x] ProductCard add-to-cart flows through the service (overridable `onAdd` seam for stories/tests); showcase wires service → zod → toast end-to-end

## 6. shadcn components (`src/components/ui/`)
- [x] `button` — h-11, min-w 120px, rounded-md, 15px/600; variants default/outline/accent/ghost/destructive; sizes default/icon (§8)
- [x] `badge` — variants category/discount/inStock/soldOut/newArrival (+shadcn defaults) (§9)
- [x] `card` — rounded-md, `border-border`, `shadow-sm`, `--card-spacing` padding (§5/§6/§7)
- [x] `skeleton` — `bg-plum-10` fill (§16)
- [x] `input` — h-11, `--input-border`, 2px focus/error with padding offset, disabled states (§10)
- [x] `label` — shadcn default (§10)
- [x] `sonner` — icons via `@/lib/icons`, `.cn-toast` timing/shadow
- [x] `search-input` (custom) — icon + 12px gap (§10)
- [x] `quantity-stepper` (custom) — 3-cell divider layout, `#570054` cells (§10)

## 7. Section A demo components (`src/components/<name>/`)
- [x] `product-card` — §16 card anatomy, badges, accent action (§8), responsive grid
- [x] `skeleton-card` — mirrors product-card dims (§16)
- [x] `review-card` — 16px coral stars, verified-purchase badge (§16/§9)
- [x] `toast-demo` — success/info/warning/error triggers
- [x] `src/app/showcase/page.tsx` — renders all demos + form elements
- [x] `<Toaster />` mounted in root layout

## 8. Storybook
- [x] Init: `@storybook/nextjs-vite` framework, `@tailwindcss/vite` in `viteFinal`
- [x] `preview.tsx` imports `globals.css`, page-bg decorator, Furnish backgrounds
- [x] `preview-head.html` loads Roboto + Roboto Mono Google CDN (next/font unavailable in SB)
- [x] `@storybook/addon-a11y`, `addon-docs`, `addon-vitest` enabled; example stories removed
- [x] Stories: Button, Badge, Card, Input, SearchInput, QuantityStepper, Skeleton, Toast, ProductCard, ReviewCard (variant grids, states, interactions)
- [x] Interaction tests via `storybook/test` (input typing, stepper +/-, add-to-cart callback)

## 9. Verification
- [x] `pnpm lint` — clean
- [x] `pnpm build` — passes, no CSS warnings
- [x] `pnpm build-storybook` — passes, no CSS warnings

## Notes
- `storybook-static` output ignored; logs ignored via `*.log`; `eslint.config.mjs` ignores SB/test build outputs.
- `lucide-react` remains in deps only as an unused shadcn-install leftover — safe to prune later.
- Vitest config (`vitest.config.ts`) added by the SB init for the vitest addon.