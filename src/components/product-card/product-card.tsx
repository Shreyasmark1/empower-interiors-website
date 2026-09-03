"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@/lib/schemas"
import { CartIcon } from "@/lib/icons"
import { cn } from "@/lib/utils"
import { cartService } from "./product-card.service"

function ProductCard({
  product,
  onAdd,
  className,
}: {
  product: Product
  onAdd?: (product: Product) => void
  className?: string
}) {
  const handleAdd = () => {
    if (onAdd) {
      onAdd(product)
      return
    }
    void cartService.addToCart({ productId: product.id })
  }
  return (
    <Card className={cn("h-full", className)}>
      <div className="aspect-[4/5] w-full bg-plum-5" />
      <CardContent className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="category">{product.category}</Badge>
          {product.status === "soldOut" && <Badge variant="soldOut">Sold Out</Badge>}
          {product.status === "newArrival" && <Badge variant="newArrival">New Arrival</Badge>}
        </div>
        <h4 className="text-lg leading-[26px] font-medium text-foreground">
          {product.name}
        </h4>
        <div className="flex items-baseline gap-2">
          <span className="text-lg leading-[26px] font-medium text-foreground">
            ₹{product.price}
          </span>
          {product.wasPrice && (
            <span className="text-sm leading-[22px] text-muted-foreground line-through">
              ₹{product.wasPrice}
            </span>
          )}
        </div>
        <Button
          variant="accent"
          disabled={product.status === "soldOut"}
          className="mt-1"
          onClick={handleAdd}
        >
          <CartIcon />
          {product.status === "soldOut" ? "Sold Out" : "Add to Cart"}
        </Button>
      </CardContent>
    </Card>
  )
}

export { ProductCard }