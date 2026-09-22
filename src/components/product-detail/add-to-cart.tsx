"use client"

import * as React from "react"
import { Minus, Plus, ShoppingCart } from "lucide-react"

import { cartService } from "@/lib/services/cart.service"
import { toast } from "@/lib/toasts"
import { cn } from "@/lib/utils"

type AddToCartProduct = {
  name: string
  image: string
  price: number
  wasPrice?: number
}

type AddToCartProps = {
  product: AddToCartProduct
  className?: string
}

function AddToCart({ product, className }: AddToCartProps) {
  const [open, setOpen] = React.useState(false)
  const [quantity, setQuantity] = React.useState(1)

  React.useEffect(() => {
    const sync = () => {
      const line = cartService
        .getCartLines()
        .find((item) => item.product.name === product.name)
      setOpen(Boolean(line))
      setQuantity(line ? line.quantity : 1)
    }
    sync()
    return cartService.subscribe(sync)
  }, [product.name])

  async function onAdd() {
    cartService.addToCart(product)
    setOpen(true)
    setQuantity(1)
    toast.success(`${product.name} added to your cart`)
  }

  function onDecrease() {
    const next = quantity - 1
    if (next < 1) {
      cartService.removeFromCart(product.name)
      setOpen(false)
      setQuantity(1)
      toast.success(`${product.name} removed from your cart`)
      return
    }
    cartService.setCartQuantity(product.name, next)
    setQuantity(next)
  }

  function onIncrease() {
    const next = quantity + 1
    cartService.setCartQuantity(product.name, next)
    setQuantity(next)
  }

  return (
    <div
      className={cn(
        "flex h-12 w-full overflow-hidden rounded-lg bg-primary text-white",
        className
      )}
    >
      {open ? (
        <>
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={onDecrease}
            className="grid h-full flex-1 place-items-center transition-all duration-200 hover:bg-brand-hover active:bg-brand-hover"
          >
            <Minus className="size-4" strokeWidth={2} />
          </button>
          <span
            aria-live="polite"
            className="grid h-full w-12 shrink-0 place-items-center border-x border-white/30 text-sm font-medium"
          >
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={onIncrease}
            className="grid h-full flex-1 place-items-center transition-all duration-200 hover:bg-brand-hover active:bg-brand-hover"
          >
            <Plus className="size-4" strokeWidth={2} />
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={onAdd}
          className="flex h-full w-full items-center justify-center gap-2 text-sm font-medium transition-all duration-200 hover:bg-brand-hover active:bg-brand-hover"
        >
          <ShoppingCart className="size-4" strokeWidth={1.5} />
          Add
        </button>
      )}
    </div>
  )
}

export { AddToCart }
export type { AddToCartProduct }