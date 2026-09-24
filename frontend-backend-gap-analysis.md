# Frontend ↔ Backend Gap Analysis

Goal: make **every** data point the storefront renders come from the backend (DB → API → frontend service → UI), with nothing hardcoded in a mock, constant, or client service.

## 1. How the storefront is fed today

Only **three** things are real backend:

| Name | File | What it is |
|---|---|---|
| Postgres via Drizzle | `src/db/schema.ts`, `src/db/index.ts` | 7 tables: `categories`, `products`, `product_categories`, `variants`, `promotions`, `promotion_targets`, `users` |
| Admin CRUD API | `src/app/api/{products,variants,categories,product-categories,promotions,promotion-targets,auth,images}` | Write/read API for the admin panel only |
| S3 image upload/serve | `src/app/api/images/...` | Upload + proxy |

Everything visible to shoppers is **one of these**:

- **In-memory mock stores** — `mockCatalog` (`src/components/product-listing/services/product-listing.mock.ts`), `mockProductDetailPages` (`src/components/product-detail/services/product-detail.mock.ts`), `navigationSeed` (`src/lib/services/navigation.service.ts`), `heroSeed` (`src/lib/services/hero.service.ts`), `filterGroupsSeed` (`src/lib/services/filter.service.ts`).
- **Derived in mappers** — `fromCatalogProduct`/`toProductDetail` (`src/components/product-detail/services/product-detail.mapper.ts`) invent most rich content (description, availability, shipping, materials, care, delivery, installation) when the slug isn't in the rich mock.
- **Hardcoded component constants** — `SHARED_FEATURES`, `TRUST_POINTS`, `GALLERY_*`, `AVAILABILITY_META`, `DEFAULT_TAXES_TEXT`, `PAYMENT_OPTIONS`, `CONTACT` (`src/components/product-detail/services/product-detail.constants.ts`); the entire homepage (`src/components/home-sections/home-sections.tsx`).
- **Client-side localStorage** — cart, wishlist, and product snapshots (`src/lib/services/cart.service.ts`).
- **Static copies of the mock** — `/api/navigation` and `/api/hero` (`src/app/api/navigation/route.ts`, `src/app/api/hero/route.ts`) just JSON-wrap the in-memory mock services; they are **not** DB-backed.

## 2. What the backend can answer today

`products` (`src/db/schema.ts:53`) has: `id, name, slug, description, thumbnail, min_price, brand_name, mrp_price, short_description, badges (text[]), specifications (jsonb), is_active, is_deleted, created_at, updated_at`.

`variants` (`schema.ts:106`): `id, product_id, name, images (text[]), price, sort_order, is_active, is_deleted`.

`categories` (`schema.ts:19`): self-referencing tree (`parent_id`), `name, slug, description, image, sort_order`.

Relations that exist: product→variants, product→categories (m:n via `product_categories`), category→parent/children, promotion→targets.

**That is the entire grid against which every frontend field below must be checked.**

## 3. Gap analysis by feature

Legend: ✔️ stored → ✔ walkable today · ⚠️ exists but wrong shape/forced into wrong column · ❌ not stored anywhere.

### 3.1 Product detail page — `ProductDetailInfo` (`src/lib/schemas/product-detail.ts`)

The real contract the React tree consumes is `ProductDetailRawSchema` (`product-detail.ts:117`) mapped by `product-detail.mapper.ts`.

| UI field (render location) | Frontend values | Backend status |
|---|---|---|
| `name` | product-info.tsx:87 | ✔️ `products.name` |
| `shortDescription` | product-info.tsx:93 | ✔️ `products.short_description` |
| `brand` — "By X" | product-info.tsx:90 | ✔️ `products.brand_name` |
| `slug` / URL | page, ctas | ✔️ `products.slug` |
| `price`, `wasPrice` (discount %) | product-info.tsx:100–112 | ✔️ `min_price` / `mrp_price` — but **both required** by z. `wasPrice` optional ✔️, `price` ✔️ |
| `priceDisplay`, `emiText` | product-info.tsx:101,124 | ⚠️ `priceDisplay` derived; `emiText` ❌ not stored (mock `emiStarting` only) |
| `roomType` eyebrow ("Living Room Collection") | product-info.tsx:60 | ❌ derived from hardcoded `ROOM_BY_PATH_SEGMENT` (mapper.ts:15) |
| `category`, `categoryPath`, `breadcrumb` | mapper.ts:33–35,141 | ⚠️ category tree exists; **path/room/parentship is not materialized** and page mapper invents it |
| `badges` (`new`/`bestseller`) | product-info.tsx:63–68 | ⚠️ free `text[]`; page only renders those two literal values — no validation, no mapping table |
| `availability` + label + tone | product-info.tsx:126–128 | ❌ no stock column (only `is_active`) |
| `shippingInfo` | product-info.tsx:131 | ❌ hardcoded in mapper |
| `warrantyLabel` | product-cta/trust | ❌ not a DB column (only a mock catalog field) |
| `taxesText` | product-info.tsx:133 | ❌ constant `DEFAULT_TAXES_TEXT` |
| `gallery` (Main/Side/Detail/Lifestyle → 4 slots + thumbnails + lightbox) | product-gallery.tsx:80–206 | ⚠️ only single `thumbnail`; no slots table |
| `variants` (colour picker) | variant-selector.tsx | see §3.2 |
| `has360` / `frames[]` (360° spin) | product-gallery.tsx:60, view-360.tsx | ❌ not stored (mock bool only; frames always `[]`) |
| `has3d` / `modelUrl` (.glb) | view-3d.tsx | ❌ not stored |
| `specifications` (key/value table) | product-tabs.tsx:29–43,145 | ✔️ `specifications` jsonb — but shape is `Record<string,string>` and UI needs ordered `{label,value}[]` |
| `dimensions` (W×D×H+weight grid) | product-tabs.tsx:58–82,147 | ❌ not stored (lives inside spec JSON if at all) |
| `materials` / `careInstructions` / `deliveryInfo` / `installationInfo` (bullet lists) | product-tabs.tsx:148–154 | ❌ not stored; mapper invents all four |
| `descriptionParagraphs` | product-tabs.tsx:136–143 | ❌ mapper **generates** prose from the name when product not in rich mock |
| `features` grid (+ icons) | product-tabs.tsx:84–103,133 | ❌ `SHARED_FEATURES` constant — identical for every product |
| `relatedProducts` | §3.11 | ❌ |
| `rating`/`ratingCount` | — | ❌ (no reviews) |
| Add-to-cart (needs name/image/price) | add-to-cart.tsx, product-cta.tsx | ⚠️ reads `cartService` (localStorage) |
| Pincode check | check-availability.tsx | ❌ hardcoded `ACCEPTED_PINCODES` set (product-detail.service.ts:17) |
| Wishlist toggle | product-info/product-gallery | ❌ localStorage |
| Share / WhatsApp / Enquire links | share-button.tsx, product-cta.tsx:63–85 | ⚠️ `CONTACT` constant; fine as config, not per-product |

### 3.2 Variants & swatches

Frontend `ProductVariant` (`product-detail.ts:46`): `id, name, swatch, images, price?`.

| Field | Status |
|---|---|
| `name` | ✔️ `variants.name` |
| `price` (optional per-variant override) | ✔️ `variants.price` |
| `images` | ✔️ `variants.images` |
| **`swatch`** (the colour HEX) | ❌ **no column** — the only reason `variant-selector.tsx:45` renders nothing real today |
| stable per-product variant id for URL/state | ⚠️ frontend swaps DB id (bigint) for a string id |

Also: the listing card's `colors: {color, swatch}[]` (`src/lib/schemas/catalog.ts:3`) **must equal** the detail page's variants — today it's a separate mock with no guarantee. Filters (colour swatches, §3.4) want the same data third.

### 3.3 Catalog / listing pages & the category tree

Routes: `/seating`, `/seating/sofas`, `/seating/sofas/3-seater`, … served by `(site)/[categorySlug]/[[...rest]]/page.tsx`.

- `productListingService.getListing` (`src/components/product-listing/services/product-listing.service.ts`) matches URLs against the **mock nav tree's group/item `href`s** and filters `mockCatalog` by a synthetic `path` string.
- `categoryPageService.getCategory` (`src/components/category-page/category-page.service.ts`) builds subcategories, promo banners, and **boilerplate SEO FAQs** from the mock nav.
- DB impact:
  - Real tree = `categories` (`parent_id`). Frontend resolves URLs structurally (category → group → item), so either nav becomes a **derived view of categories + nav metadata**, or we add a nav/config table.
  - Product ↔ category link exists (`product_categories`) ✔️ but the frontend needs a materialized **path** (e.g. `Seating/Living Room/Sofas`) — derive by walking `parent_id` — or store `roomType` + expose categories with products.
  - `CatalogProduct` card fields (`catalog.ts:12`): `image ✔️(thumbnail)`, `price ✔️(min_price)`, `wasPrice ✔️(mrp_price)`, `discountPercent Δ`, `rating ❌`, `ratingCount ❌`, `assured ❌`, `warrantyLabel ❌`, `emiStarting ❌`, `colors ❌(needs variants.swatch)`, `brand ✔️`, `path ❌`.

### 3.4 Filters & sort

`filter.service.ts` mock: **Colour** (swatch, count), **Brand** (checkbox, count), **Country of Origin** (checkbox, count) + sort options (relevance/price/newest).

| Facet | Backend source | Status |
|---|---|---|
| Colour | `variants.name` + new `variants.swatch` | ❌ swatch missing |
| Brand | `products.brand_name` (distinct) | ⚠️ derivable, no aggregation endpoint |
| Country of Origin | nothing | ❌ no column |
| Counts per value | needs SQL group-by | ❌ no facet endpoint |
| Dynamic values (checkbox/searchable lists) | — | ❌ fully static seed |

### 3.5 Search

`search.service.ts` tokenizes the query and filters **`mockCatalog`**. Needs a DB query (`ILIKE` on name/brand/category path, or full-text). Suggestion list also comes from the mock. ❌ no endpoint.

### 3.6 Homepage

`home-sections.tsx` is one hardcoded page:

- **Hero** — `hero.service.ts` seed. The `promotions` + `promotion_targets` tables (targetType `homepage`, placement `hero`) already exist and could serve this; hero needs `couponCode` which `promotions` lacks. ⚠️
- **Deals / Fresh Finds** — hardcoded slug lists resolved against `mockCatalog`. Needs: `promotion_targets` (product/category, placement `section`) → resolve to products, or a `isFeatured` flag. ❌
- **Promo tiles, announcement strips, room inspiration, text strip** — static markup + picsum URLs. Improvements enough to need a `banners`/`content_blocks` table if these are to be managed. ❌

### 3.7 Navigation (mega-menu)

`navigation.service.ts` seed: categories → groups (title, image, href, description) → items (label, href, badge, description) + per-category `promoBanners`. DB has only the bare category tree. Needs nav metadata (title/badges/images/descriptions) and banner storage, or a `navigation_config` table. ❌

### 3.8 Reviews

`ReviewSchema` exists (`src/lib/schemas/review.ts`) **but nothing renders it and no table/API exists** (grep for `Review` hits only the schema). `rating`/`ratingCount` on cards would aggregate from reviews. ❌ whole feature.

### 3.9 Cart & Wishlist

`cart.service.ts` is 100% localStorage (product names as keys, snapshots of the product, quantities). So:

- Cart/wishlist vanish per device and per browser; no sync, no user identity, no orders.
- A real backend needs `cart_items(user_id, product_id/variant_id, quantity)`, `wishlist_items(user_id, product_id)`, and (for the future) `orders`. `users` + JWT already exist (`src/lib/auth`).
- Note the **ID mismatch**: frontend keys cart/wishlist by product **name**; DB uses bigint ids.

### 3.10 Pincode / delivery

`productDetailService.checkPincode` (product-detail.service.ts:78) hardcodes 8 pincodes. Needs a `pincode_serviceability(pincode, city, is_serviced, delivery_days?)` table (optionally per product/category), served by an endpoint. ❌

### 3.11 Related / similar

- `relatedProducts` currently ships inside the rich mock only (`product-detail.mock.ts`).
- `getSimilar` scans mock pages + mock related lists, matching on the **innermost category path segment**.
- Needs a `product_related(product_id, related_product_id, sort_order)` table (or keep the "similar" query as category-based SQL). ❌ both are mock-only today.

### 3.12 Admin

`product-form.tsx` (`src/app/admin/products/_components/product-form.tsx`) edits: name, slug, thumbnail, brand, mrp, description, shortDescription, minPrice, badges, specifications (raw JSON), isActive, categories. `variant-form.tsx` edits name/images/price/sortOrder.

- To make the shop dynamic, **admin must be able to enter every per-product field** from §3.1 (roomType, availability, shipping, warranty, emi, taxes, 360/3D flags + frames + model, dimensions, materials/care/delivery/installation, gallery slots, swatch) — otherwise the data has no way in.
- The `ProductCreateSchema`/`ProductUpdateSchema` (`src/lib/schemas/api/product.ts`) currently ban most of these fields at the API boundary.

## 4. Derived ≠ stored

Don't put in the DB what is reliably computed — otherwise admin has to keep two values in sync:

- `priceDisplay` (`₹28,499`) — format from `price` at render.
- `discountPercent` — `(1 − price/mrp) × 100`.
- EMI fallback — `₹(price/24)/month`; only store a custom `emiText` if you want a bespoke line.
- `availabilityLabel`/`availabilityTone` — map in `AVAILABILITY_META` from the stored enum.
- `breadcrumb`/`categoryPath` — build from the category tree walk.
- Gallery **gradients/labels** — UI concern (`GALLERY_GRADIENTS`/`GALLERY_LABELS`).

## 5. Recommended data model changes

New/updated columns and tables needed for a fully dynamic storefront:

**`products` — add columns**
`room_type varchar`, `availability enum('inStock','lowStock') default 'inStock'`, `shipping_info text`, `warranty_label varchar`, `emi_text text null`, `taxes_text text null`, `has_360 boolean default false`, `has_3d boolean default false`, `frames text[] default {}`, `model_url text null`, `dimensions jsonb` (width/depth/height/weight), `materials text[] default {}`, `care_instructions text[] default {}`, `delivery_info text[] default {}`, `installation_info text[] default {}`, `country_of_origin varchar null` (drives the filter facet).

**`variants`** — add `swatch varchar(16)` (HEX).

**New tables**
- `product_images(id, product_id FK, slot varchar /* main|side|detail|lifestyle */, url text, sort_order int)`
- `product_related(product_id FK, related_product_id FK, sort_order int)` (PK = both ids)
- `reviews(id, product_id FK, reviewer, date, rating int 1-5, body, verified bool)`
- `pincode_serviceability(pincode varchar(6), city varchar null, delivery_days int, is_active bool)`
- `cart_items(user_id FK, product_id FK, quantity int, PK(user_id, product_id))`
- `wishlist_items(user_id FK, product_id FK, PK(user_id, product_id))`
- (optional) `banners`/`content_blocks` for homepage strips/tiles/room-inspiration, and a `navigation_config` view/metadata for mega-menu groups/items/badges.

Reuse existing: `promotions` + `promotion_targets` for hero (add `coupon_code`?) and section deals; `categories` tree for paths.

## 6. New/changed API endpoints

| Route | Purpose |
|---|---|
| `GET /api/public/products/[slug]` | full `ProductDetailRaw` + related (aggregates product, images, variants, reviews summary, breadcrumb) |
| `GET /api/public/products` | listing: path/room/category filter, search query, pagination, rating counts |
| `GET /api/public/facets` | filter groups (colour from variants.swatch, brand distinct, country), counts |
| `GET /api/public/navigation` | nav from categories + config |
| `GET /api/public/hero` | hero from promotions (target homepage/hero) |
| `GET/POST /api/pincodes`, `GET /api/pincodes/check?code=` | serviceability |
| `GET /api/products/[id]/reviews`, `POST .../reviews` | reviews (+ rate aggregation) |
| `POST /api/wishlist/toggle`, `GET /api/wishlist` | auth-backed wishlist |
| extend admin `ProductCreate/UpdateSchema`, `VariantSchema` | admit the new fields (§5) |

Every other route follows the existing pattern: thin handler → `handleErrors(() => _get…())`, `requireAuth` on mutations, zod parse in/out.

## 7. Suggested phasing

1. **Data model + admin entry** — §5 schema + migration; extend admin product/variant forms + API schemas so editors can populate everything.
2. **Public detail endpoint + service swap** — `getBySlug` reads the endpoint (mock fallback while DB is empty); `checkPincode` → table; related/similar from SQL.
3. **Catalog plumbing** — materialize path/room from category tree; card fields (rating/assured/emi/warranty/colors) from DB; facets endpoint.
4. **Basket & social** — cart/wishlist move to DB+JWT; reviews table + Reviews tab; search endpoint.
5. **Homepage CMS** — hero from promotions, deals/sections from promotion_targets, banners table; kill remaining static blocks.

## 8. Appendix — key file references

- DB schema: `src/db/schema.ts` (tables at :19, :53, :87, :106, :135, :174, :199)
- Admin CRUD API: `src/app/api/products/route.ts`, `src/app/api/products/[id]/route.ts`, `src/app/api/variants/`, `src/app/api/categories/`, `src/app/api/product-categories/`, `src/app/api/promotions/`, `src/app/api/promotion-targets/`
- Product detail contract: `src/lib/schemas/product-detail.ts` (Raw :117, Display :59)
- Detail mapper/mock/service: `src/components/product-detail/services/{mapper,mock,service,constants}.ts`
- Catalog mock + service: `src/components/product-listing/services/{product-listing.mock,product-listing.service}.ts`, `src/lib/services/search.service.ts`
- Nav/hero/filter mocks: `src/lib/services/{navigation,hero,filter}.service.ts`
- Cart/wishlist: `src/lib/services/cart.service.ts`, `src/components/product-card/product-card.service.ts`
- Category pages: `src/components/category-page/category-page.service.ts`
- Homepage: `src/components/home-sections/home-sections.tsx`
- Admin entry for products/variants: `src/app/admin/products/_components/product-form.tsx`, `src/app/admin/variants/_components/variant-form.tsx`
- API schemas: `src/lib/schemas/api/{product,variant,category,product-category,promotion,promotion-target,auth,common}.ts`