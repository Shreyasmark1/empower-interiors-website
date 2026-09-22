"use client"

import * as React from "react"
import { Minus, Plus, ShoppingCart } from "lucide-react"

import { productCardService } from "@/components/product-card/product-card.service"
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

  async function onAdd() {
    setOpen(true)
    await productCardService.addToCart(product)
    toast.success(`${product.name} added to your cart`)
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
            disabled={quantity <= 1}
            onClick={() => setQuantity((current) => current - 1)}
            className="grid h-full flex-1 place-items-center transition-all duration-200 hover:bg-brand-hover active:bg-brand-hover disabled:opacity-50"
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
            onClick={() => setQuantity((current) => current + 1)}
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