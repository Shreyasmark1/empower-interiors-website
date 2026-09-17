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
}