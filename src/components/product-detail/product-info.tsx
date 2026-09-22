"use client"

import * as React from "react"
import { Heart } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { productCardService } from "@/components/product-card/product-card.service"
import type { ProductDetailInfo } from "@/lib/schemas"
import { toast } from "@/lib/toasts"
import { cn } from "@/lib/utils"
import { DEFAULT_TAXES_TEXT, TRUST_POINTS } from "./product-detail.constants"
import { CheckAvailability } from "./check-availability"
import { ProductCTA } from "./product-cta"
import { VariantSelector } from "./variant-selector"

type ProductInfoProps = {
  product: ProductDetailInfo
  activeVariantId?: string
  onVariantChange: (id: string) => void
  wishlisted?: boolean
  onWishlistToggle?: () => void
  className?: string
}

function ProductInfo({
  product,
  activeVariantId,
  onVariantChange,
  wishlisted,
  onWishlistToggle,
  className,
}: ProductInfoProps) {
  const [localWished, setLocalWished] = React.useState(false)
  const wished = wishlisted ?? localWished
  const toneClass =
    product.availabilityTone === "green" ? "bg-[#16a34a]" : "bg-amber-500"

  const selectedVariant = product.variants.find((variant) => variant.id === activeVariantId)
  const price = selectedVariant?.price ?? product.price
  const discount = product.wasPrice
    ? Math.round((1 - product.price / product.wasPrice) * 100)
    : 0

  async function handleWishlistToggle() {
    const nowWished = await productCardService.toggleWishlist({
      name: product.name,
      image: product.gallery[0]?.imageSrc ?? "",
      price,
    })
    setLocalWished(nowWished)
    toast.success(nowWished ? "Saved to wishlist" : "Removed from wishlist")
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Eyebrow + title + badges + wishlist */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <p className="text-[0.6875rem] font-semibold tracking-[0.32em] text-brand-magenta uppercase">
            {product.roomType} Collection
          </p>
          <div className="flex items-center gap-1.5">
            {product.badges.includes("new") && (
              <Badge variant="newArrival">New</Badge>
            )}
            {product.badges.includes("bestseller") && (
              <Badge className="bg-brand-magenta text-white">Bestseller</Badge>
            )}
          </div>
          <button
            type="button"
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wished}
            onClick={onWishlistToggle ?? handleWishlistToggle}
            className="ml-auto grid size-9 place-items-center rounded-full transition-all duration-200 hover:bg-plum-5"
          >
            <Heart
              className={cn(
                "size-5 transition-colors",
                wished ? "fill-brand-coral text-brand-coral" : "text-muted-foreground"
              )}
              strokeWidth={1.5}
            />
          </button>
        </div>
        <h1 className="text-[clamp(1.625rem,3vw,2.25rem)] leading-tight font-extralight text-foreground">
          {product.name}
        </h1>
        {product.brand && (
          <p className="text-sm text-muted-foreground">By {product.brand}</p>
        )}
        <p className="mt-1 max-w-[32rem] text-[0.9375rem] leading-relaxed text-muted-foreground">
          {product.shortDescription}
        </p>
      </div>

      {/* Price card */}
      <div className="flex flex-col gap-3 rounded-xl bg-plum-5 p-4">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-4xl font-extralight text-foreground">
            {product.priceDisplay}
          </span>
          {product.wasPrice && (
            <span className="text-base text-muted-foreground line-through">
              {product.wasPrice.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              })}
            </span>
          )}
          {discount > 0 && <Badge variant="discount">{discount}% OFF</Badge>}
        </div>
        {price !== product.price && (
          <p className="text-sm text-foreground">
            Selected variant price:{" "}
            {price.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            })}
          </p>
        )}
        <p className="text-sm font-medium text-brand-magenta">{product.emiText}</p>
        <div className="border-t border-border pt-3">
          <span className="flex items-center gap-2 text-sm font-medium text-foreground">
            <span className={cn("size-2.5 rounded-full", toneClass)} />
            {product.availabilityLabel}
            <span className="text-muted-foreground">
              · Ships in {product.shippingInfo}
            </span>
          </span>
          {product.taxesText || DEFAULT_TAXES_TEXT ? (
            <p className="mt-1 text-[0.6875rem] tracking-[0.12em] text-muted-foreground uppercase">
              {product.taxesText ?? DEFAULT_TAXES_TEXT}
            </p>
          ) : null}
        </div>
      </div>

      <VariantSelector
        variants={product.variants}
        value={activeVariantId}
        onChange={onVariantChange}
      />

      <CheckAvailability className="max-w-72"/>

      <ProductCTA
        name={product.name}
        roomType={product.roomType}
        slug={product.slug}
        image={product.gallery[0]?.imageSrc ?? ""}
        price={price}
        wasPrice={product.wasPrice}
      />

      {/* Trust row */}
      <div className="border-t border-border pt-4">
        <ul className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {TRUST_POINTS.map((point, i) => (
            <li key={point} className="flex items-center gap-2 text-sm">
              {i > 0 && <span className="h-3 w-px bg-border" aria-hidden="true" />}
              <span className="text-muted-foreground">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export { ProductInfo }