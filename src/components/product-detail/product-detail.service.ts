import { mockProductDetailPages } from "./product-detail.mock"
import {
  toProductDetail,
  toRelatedProductCard,
} from "./product-detail.mapper"
import { ProductDetailRawSchema } from "@/lib/schemas"

export type ProductDetailPage = {
  product: ReturnType<typeof toProductDetail>
  related: ReturnType<typeof toRelatedProductCard>[]
}

type SimilarProduct = ReturnType<typeof toRelatedProductCard>

const ACCEPTED_PINCODES = new Set([
  "575001",
  "575002",
  "575003",
  "560001",
  "560034",
  "400001",
  "110001",
  "700001",
])

function innermost(path: string[] | undefined, fallback: string[]): string {
  return path?.length ? path[path.length - 1] : fallback[fallback.length - 1]
}

export const productDetailService = {
  async getBySlug(slug: string): Promise<ProductDetailPage | null> {
    const raw = mockProductDetailPages.find((page) => page.slug === slug)
    if (!raw) return null

    const parsed = ProductDetailRawSchema.parse(raw)
    return {
      product: toProductDetail(parsed),
      related: parsed.relatedProducts.map(toRelatedProductCard),
    }
  },

  async getSimilar(slug: string, categoryPath: string[]): Promise<SimilarProduct[]> {
    const needle = innermost(categoryPath, [])

    const candidates = mockProductDetailPages.flatMap((page) =>
      [page, ...page.relatedProducts].map((entry) => ({
        raw: entry,
        sourceIsPage: entry === page,
      }))
    )

    const matches = candidates.filter(({ raw }) => {
      if (raw.slug === slug) return false
      const path = raw.categoryPath?.length ? raw.categoryPath : [raw.category, raw.roomType]
      return innermost(path, []) === needle
    })

    const unique = new Map<string, SimilarProduct>()
    for (const { raw, sourceIsPage } of matches) {
      const card = toRelatedProductCard(raw)
      if (!unique.has(card.slug) || sourceIsPage) unique.set(card.slug, card)
    }

    return Array.from(unique.values()).slice(0, 8)
  },

  async checkPincode(pincode: string): Promise<{ ok: boolean; message: string }> {
    const clean = pincode.trim()
    if (!/^\d{6}$/.test(clean)) {
      return { ok: false, message: "Enter a valid 6-digit pincode" }
    }
    const ok = ACCEPTED_PINCODES.has(clean)
    return ok
      ? { ok: true, message: "We deliver to this pincode" }
      : { ok: false, message: "Delivery not available here yet" }
  },
}