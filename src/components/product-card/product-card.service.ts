import type { ProductCardProps } from "./product-card"

type AddToCartResult = Promise<{ ok: boolean; productId: string }>

const CART_KEYS: Record<"added" | "wishlist", string> = {
  added: "empower.cart.productIds",
  wishlist: "empower.wishlist.productIds",
}

function readIds(key: string): string[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

function writeIds(key: string, ids: string[]) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(key, JSON.stringify(ids))
}

export const productCardService = {
  async addToCart(product: ProductCardProps): AddToCartResult {
    const productId = product.name
    const ids = Array.from(new Set([...readIds(CART_KEYS.added), productId]))
    writeIds(CART_KEYS.added, ids)
    return Promise.resolve({ ok: true, productId })
  },

  async toggleWishlist(product: ProductCardProps): Promise<boolean> {
    const productId = product.name
    const ids = readIds(CART_KEYS.wishlist)
    const wished = ids.includes(productId)
    writeIds(
      CART_KEYS.wishlist,
      wished ? ids.filter((id) => id !== productId) : [...ids, productId]
    )
    return Promise.resolve(!wished)
  },
}