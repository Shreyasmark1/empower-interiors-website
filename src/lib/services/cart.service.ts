import { mockCatalog } from "@/components/product-listing"
import type { CatalogProductVariant } from "@/lib/schemas"

export type CartLineProduct = {
  name: string
  slug?: string
  brand?: string
  image?: string
  price?: number
  wasPrice?: number
  rating?: number
  ratingCount?: number
  assured?: boolean
  warrantyLabel?: string
  emiStarting?: string
  colors?: CatalogProductVariant[]
}

export type CartLine = {
  product: CartLineProduct
  quantity: number
}

const CART_KEY = "empower.cart.productIds"
const CART_QUANTITIES_KEY = "empower.cart.quantities"
const WISHLIST_KEY = "empower.wishlist.productIds"
const SNAPSHOTS_KEY = "empower.productSnapshots"

const listeners = new Set<() => void>()

function emitChange() {
  for (const listener of Array.from(listeners)) listener()
}

export function subscribeToCart(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (
      event.key === CART_KEY ||
      event.key === CART_QUANTITIES_KEY ||
      event.key === WISHLIST_KEY ||
      event.key === SNAPSHOTS_KEY
    ) {
      emitChange()
    }
  })
}

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeJSON(key: string, value: unknown) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(key, JSON.stringify(value))
}

function readIds(key: string): string[] {
  const value = readJSON<string[]>(key, [])
  return Array.isArray(value)
    ? value.filter((id): id is string => typeof id === "string")
    : []
}

function writeIds(key: string, ids: string[]) {
  writeJSON(key, Array.from(new Set(ids)))
  emitChange()
}

function readQuantities(): Record<string, number> {
  const value = readJSON<Record<string, number>>(CART_QUANTITIES_KEY, {})
  return value && typeof value === "object" ? value : {}
}

type SnapshotMap = Record<string, CartLineProduct>

function readSnapshots(): SnapshotMap {
  const value = readJSON<SnapshotMap>(SNAPSHOTS_KEY, {})
  return value && typeof value === "object" ? value : {}
}

function resolveProduct(name: string): CartLineProduct | null {
  const catalog = mockCatalog.find((product) => product.name === name)
  if (catalog) return catalog
  return readSnapshots()[name] ?? null
}

export function productHref(product: CartLineProduct): string {
  return product.slug ? `/products/${product.slug}` : "/"
}

export const cartService = {
  subscribe: subscribeToCart,

  addToCart(product: CartLineProduct): void {
    const snapshots = readSnapshots()
    writeJSON(SNAPSHOTS_KEY, { ...snapshots, [product.name]: product })
    const ids = readIds(CART_KEY)
    if (!ids.includes(product.name)) {
      writeIds(CART_KEY, [...ids, product.name])
    }
  },

  removeFromCart(productName: string): void {
    writeIds(
      CART_KEY,
      readIds(CART_KEY).filter((id) => id !== productName),
    )
    const quantities = readQuantities()
    if (productName in quantities) {
      const next = { ...quantities }
      delete next[productName]
      writeJSON(CART_QUANTITIES_KEY, next)
      emitChange()
    }
  },

  setCartQuantity(productName: string, quantity: number): void {
    const safeQuantity = Math.min(99, Math.floor(quantity))
    if (safeQuantity < 1) {
      cartService.removeFromCart(productName)
      return
    }
    writeJSON(CART_QUANTITIES_KEY, {
      ...readQuantities(),
      [productName]: safeQuantity,
    })
    emitChange()
  },

  clearCart(): void {
    writeIds(CART_KEY, [])
    writeJSON(CART_QUANTITIES_KEY, {})
    emitChange()
  },

  toggleWishlist(product: CartLineProduct): boolean {
    const snapshots = readSnapshots()
    writeJSON(SNAPSHOTS_KEY, { ...snapshots, [product.name]: product })
    const ids = readIds(WISHLIST_KEY)
    const wished = ids.includes(product.name)
    writeIds(
      WISHLIST_KEY,
      wished ? ids.filter((id) => id !== product.name) : [...ids, product.name],
    )
    return !wished
  },

  removeFromWishlist(productName: string): void {
    writeIds(
      WISHLIST_KEY,
      readIds(WISHLIST_KEY).filter((id) => id !== productName),
    )
  },

  getCartLines(): CartLine[] {
    const quantities = readQuantities()
    return readIds(CART_KEY)
      .map((name) => {
        const product = resolveProduct(name)
        return product ? { product, quantity: quantities[name] ?? 1 } : null
      })
      .filter((line): line is CartLine => line !== null)
  },

  getWishlistProducts(): CartLineProduct[] {
    return readIds(WISHLIST_KEY)
      .map((name) => resolveProduct(name))
      .filter((product): product is CartLineProduct => product !== null)
  },

  getCartCount(): number {
    if (typeof window === "undefined") return 0
    const quantities = readQuantities()
    return readIds(CART_KEY).reduce(
      (sum, name) => sum + (quantities[name] ?? 1),
      0,
    )
  },

  getWishlistCount(): number {
    if (typeof window === "undefined") return 0
    return readIds(WISHLIST_KEY).length
  },
}