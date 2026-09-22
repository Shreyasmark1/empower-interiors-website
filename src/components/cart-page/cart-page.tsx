"use client"

import Image from "next/image"
import Link from "next/link"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { CartIcon, MinusIcon, PlusIcon, TrashIcon } from "@/lib/icons"
import {
  cartService,
  productHref,
  type CartLine,
} from "@/lib/services/cart.service"
import { toast } from "@/lib/toasts"
import { cn } from "@/lib/utils"

function formatINR(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`
}

function discountPercent(line: CartLine): number {
  const price = line.product.price ?? 0
  if (!line.product.wasPrice || line.product.wasPrice <= price) return 0
  return Math.round((1 - price / line.product.wasPrice) * 100)
}

function QuantityStepper({
  quantity,
  onDecrease,
  onIncrease,
}: {
  quantity: number
  onDecrease: () => void
  onIncrease: () => void
}) {
  return (
    <div className="grid h-10 w-32 grid-cols-[1fr_auto_1fr] overflow-hidden rounded-lg border border-border bg-surface-alt">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={onDecrease}
        className="grid place-items-center text-foreground transition-colors hover:bg-muted disabled:opacity-40"
      >
        <MinusIcon className="size-4" />
      </button>
      <span
        aria-live="polite"
        className="grid min-w-12 place-items-center border-x border-border text-sm font-semibold text-foreground"
      >
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={onIncrease}
        className="grid place-items-center text-foreground transition-colors hover:bg-muted disabled:opacity-40"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  )
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <div className="grid size-20 place-items-center rounded-full bg-plum-5">
        <CartIcon className="size-9 text-brand" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Your cart is empty
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
      </div>
      <Button asChild variant="default" className="mt-2">
        <Link href="/">Continue Shopping</Link>
      </Button>
    </div>
  )
}

const NO_LINES: CartLine[] = []

type CartPageProps = {
  initialLines?: CartLine[]
  className?: string
}

function CartPage({ initialLines = NO_LINES, className }: CartPageProps) {
  const [lines, setLines] = React.useState<CartLine[]>(initialLines)

  React.useEffect(() => {
    if (initialLines.length > 0) return
    const refresh = () => setLines(cartService.getCartLines())
    refresh()
    return cartService.subscribe(refresh)
  }, [initialLines])

  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0)
  const subtotal = lines.reduce(
    (sum, line) => sum + (line.product.price ?? 0) * line.quantity,
    0,
  )
  const savings = lines.reduce((sum, line) => {
    const price = line.product.price ?? 0
    const wasPrice = line.product.wasPrice ?? 0
    return sum + (wasPrice > price ? (wasPrice - price) * line.quantity : 0)
  }, 0)

  function removeLine(name: string) {
    cartService.removeFromCart(name)
    setLines((current) => current.filter((line) => line.product.name !== name))
    toast.success("Removed from your cart")
  }

  function changeQuantity(name: string, quantity: number) {
    cartService.setCartQuantity(name, quantity)
    setLines((current) =>
      quantity < 1
        ? current.filter((line) => line.product.name !== name)
        : current.map((line) =>
            line.product.name === name ? { ...line, quantity } : line,
          ),
    )
  }

  function checkout() {
    toast.info("Checkout is coming soon")
  }

  return (
    <main
      className={cn(
        "mx-auto w-[94%] max-w-6xl px-6 py-10 md:w-[90%] lg:py-14",
        className,
      )}
    >
      <p className="text-[0.6875rem] font-semibold tracking-[0.32em] text-brand-magenta uppercase">
        Empower Interiors
      </p>
      <h1 className="mt-2 text-3xl font-extralight text-foreground lg:text-4xl">
        My Cart
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {itemCount > 0
          ? `${itemCount} ${itemCount === 1 ? "item" : "items"} in your cart`
          : "Review the pieces you’ve saved before checkout."}
      </p>

      {lines.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_20rem]">
          <ul className="space-y-4">
            {lines.map((line) => {
              const product = line.product
              const price = product.price ?? 0
              const wasPrice = product.wasPrice ?? 0
              const discount = discountPercent(line)
              return (
                <li
                  key={product.name}
                  className="flex gap-4 rounded-lg border border-border bg-card p-4 shadow-sm"
                >
                  <Link
                    href={productHref(product)}
                    className="relative aspect-4/5 w-24 shrink-0 overflow-hidden rounded-md bg-plum-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 sm:w-28"
                  >
                    <Image
                      src={product.image ?? ""}
                      alt={product.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        href={productHref(product)}
                        className="line-clamp-2 text-base leading-[22px] font-semibold text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                      >
                        {product.name}
                      </Link>
                      <button
                        type="button"
                        aria-label={`Remove ${product.name} from cart`}
                        onClick={() => removeLine(product.name)}
                        className="grid size-9 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                      >
                        <TrashIcon className="size-5" />
                      </button>
                    </div>

                    {product.brand && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {product.brand}
                      </p>
                    )}

                    <div className="mt-1 flex flex-wrap items-baseline gap-2">
                      {wasPrice > price && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatINR(wasPrice)}
                        </span>
                      )}
                      {discount > 0 && (
                        <span className="text-sm font-medium text-discount">
                          {discount}% off
                        </span>
                      )}
                    </div>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                      <QuantityStepper
                        quantity={line.quantity}
                        onDecrease={() =>
                          changeQuantity(product.name, line.quantity - 1)
                        }
                        onIncrease={() =>
                          changeQuantity(product.name, line.quantity + 1)
                        }
                      />
                      <div className="flex flex-col items-end">
                        <span className="text-lg leading-6 font-bold text-foreground">
                          {formatINR(price * line.quantity)}
                        </span>
                        {wasPrice > price && (
                          <span className="text-xs text-muted-foreground">
                            Save {formatINR((wasPrice - price) * line.quantity)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>

          <aside className="h-fit rounded-lg border border-border bg-card p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold text-foreground">
              Order Summary
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium text-foreground">
                  {formatINR(subtotal)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">You save</dt>
                <dd className="font-medium text-discount">
                  -{formatINR(savings)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3 text-base">
                <dt className="font-semibold text-foreground">Total</dt>
                <dd className="font-bold text-foreground">
                  {formatINR(subtotal)}
                </dd>
              </div>
            </dl>
            <Button variant="default" className="mt-6 w-full" onClick={checkout}>
              Proceed to Checkout
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Free shipping on orders over ₹999
            </p>
          </aside>
        </div>
      )}
    </main>
  )
}

export { CartPage }
export type { CartPageProps }