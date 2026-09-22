"use client"

import Link from "next/link"
import * as React from "react"

import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { CartIcon, HugeiconsIcon, WishlistIcon } from "@/lib/icons"
import {
  cartService,
  productHref,
  type CartLineProduct,
} from "@/lib/services/cart.service"
import { toast } from "@/lib/toasts"
import { cn } from "@/lib/utils"

const NO_PRODUCTS: CartLineProduct[] = []

type WishlistPageProps = {
  initialProducts?: CartLineProduct[]
  className?: string
}

function WishlistPage({
  initialProducts = NO_PRODUCTS,
  className,
}: WishlistPageProps) {
  const [products, setProducts] = React.useState<CartLineProduct[]>(
    initialProducts,
  )

  React.useEffect(() => {
    if (initialProducts.length > 0) return
    const refresh = () => setProducts(cartService.getWishlistProducts())
    refresh()
    return cartService.subscribe(refresh)
  }, [initialProducts])

  function removeProduct(product: CartLineProduct) {
    cartService.removeFromWishlist(product.name)
    setProducts((current) =>
      current.filter((item) => item.name !== product.name),
    )
    toast.success("Removed from wishlist")
  }

  function moveToCart(product: CartLineProduct) {
    cartService.addToCart(product)
    cartService.removeFromWishlist(product.name)
    setProducts((current) =>
      current.filter((item) => item.name !== product.name),
    )
    toast.success("Moved to your cart")
  }

  return (
    <main
      className={cn(
        "mx-auto w-[94%] max-w-7xl px-6 py-10 md:w-[90%] lg:py-14",
        className,
      )}
    >
      <p className="text-[0.6875rem] font-semibold tracking-[0.32em] text-brand-magenta uppercase">
        Empower Interiors
      </p>
      <h1 className="mt-2 text-3xl font-extralight text-foreground lg:text-4xl">
        My Wishlist
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {products.length > 0
          ? `${products.length} ${products.length === 1 ? "piece" : "pieces"} saved for later`
          : "Save the pieces you love and find them here."}
      </p>

      {products.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <div className="grid size-20 place-items-center rounded-full bg-plum-5">
            <HugeiconsIcon
              icon={WishlistIcon}
              strokeWidth={2}
              className="size-9 text-brand"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Your wishlist is empty
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Tap the heart on any product to save it here.
            </p>
          </div>
          <Button asChild variant="default" className="mt-2">
            <Link href="/">Explore Collection</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <div
              key={product.name}
              className="flex flex-col rounded-xl border border-border bg-card p-2 shadow-sm transition-shadow duration-200 hover:shadow-lg"
            >
              <Link
                href={productHref(product)}
                className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                <ProductCard
                  name={product.name}
                  brand={product.brand}
                  image={product.image ?? ""}
                  price={product.price ?? 0}
                  wasPrice={product.wasPrice}
                  rating={product.rating}
                  ratingCount={product.ratingCount}
                  assured={product.assured}
                  warrantyLabel={product.warrantyLabel}
                  emiStarting={product.emiStarting}
                  colors={product.colors}
                  wishlisted
                  onWishlistToggle={() => removeProduct(product)}
                />
              </Link>
              <Button
                variant="outline"
                className="mt-2 h-10 w-full"
                onClick={() => moveToCart(product)}
              >
                <CartIcon className="size-4" />
                Move to Cart
              </Button>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export { WishlistPage }
export type { WishlistPageProps }