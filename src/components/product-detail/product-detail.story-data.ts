import { mockProductDetailPages } from "./services/product-detail.mock"
import { toProductDetail, toRelatedProductCard } from "./services/product-detail.mapper"

export const SOFA = toProductDetail(mockProductDetailPages[0])
export const DINING = toProductDetail(mockProductDetailPages[1])
export const SOFA_RELATED =
  mockProductDetailPages[0].relatedProducts.map(toRelatedProductCard)