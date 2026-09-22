import { cartService } from "@/lib/services/cart.service"
import type { ProductCardProps } from "./product-card"

type AddToCartResult = Promise<{ ok: boolean; productId: string }>

export const productCardService = {
  async addToCart(product: ProductCardProps): AddToCartResult {
    const productId = product.name
    cartService.addToCart(product)
    return { ok: true, productId }
  },

  async toggleWishlist(product: ProductCardProps): Promise<boolean> {
    return cartService.toggleWishlist(product)
  },
}