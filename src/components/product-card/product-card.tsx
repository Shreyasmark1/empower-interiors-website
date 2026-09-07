"use client"

import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon, StarIcon, WishlistIcon } from "@/lib/icons"
import { cn } from "@/lib/utils"

export type ProductVariant = {
  color: string
  swatch: string
}

export type ProductCardProps = {
  name: string
  brand?: string
  image: string
  price: number
  wasPrice?: number
  discountPercent?: number
  rating?: number
  ratingCount?: number
  assured?: boolean
  warrantyLabel?: string
  emiStarting?: string
  colors?: ProductVariant[]
  wishlisted?: boolean
  onWishlistToggle?: () => void
  className?: string
}

function discountFrom(price: number, wasPrice?: number): number {
  if (!wasPrice || wasPrice <= price) return 0
  return Math.round((1 - price / wasPrice) * 100)
}

function formatINR(value: number): string {
  return value.toLocaleString("en-IN")
}

function ProductCard({
  name,
  brand,
  image,
  price,
  wasPrice,
  discountPercent,
  rating,
  ratingCount,
  assured = false,
  warrantyLabel,
  emiStarting,
  colors = [],
  wishlisted = false,
  onWishlistToggle,
  className,
}: ProductCardProps) {
  const discount = discountPercent ?? discountFrom(price, wasPrice)

  return (
    <div className={cn("group flex h-full w-full flex-col gap-3", className)}>
      {/* Media */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-plum-5">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 16vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />

        <button
          type="button"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          onClick={(e) => {
            e.preventDefault()
            onWishlistToggle?.()
          }}
          className="absolute right-2 bottom-2 z-10 grid size-10 place-items-center rounded-full bg-surface-alt shadow-md transition-transform duration-200 hover:scale-110"
        >
          <HugeiconsIcon
            icon={WishlistIcon}
            strokeWidth={2}
            className={cn(
              "size-5",
              wishlisted ? "text-brand-coral fill-brand-coral" : "text-muted-foreground"
            )}
          />
        </button>
      </div>

      {/* Variant indicator */}
      {colors.length > 0 && (
        <div className="flex items-center gap-1.5">
          <div className="flex -space-x-1.5">
            {colors.slice(0, 3).map((variant) => (
              <span
                key={variant.color}
                title={variant.color}
                className="size-4 rounded-full border border-border"
                style={{ backgroundColor: variant.swatch }}
              />
            ))}
          </div>
          <span className="text-xs leading-[18px] text-muted-foreground">
            +{colors.length} more colors
          </span>
        </div>
      )}

      {/* Metadata */}
      <div className="flex flex-col gap-1">
        <h3 className="line-clamp-2 min-h-11 text-base leading-[22px] font-semibold text-foreground">
          {name}
        </h3>
        {brand && (
          <p className="text-sm leading-[22px] text-muted-foreground">{brand}</p>
        )}
      </div>

      {/* Badges & social proof */}
      <div className="flex flex-wrap items-center gap-1.5">
        {rating != null && (
          <span className="inline-flex items-center gap-1 rounded-full bg-discount px-2 py-0.5 text-[11px] font-semibold text-white">
            {rating.toFixed(1)}★
          </span>
        )}
        {ratingCount != null && (
          <span className="text-xs leading-[18px] text-muted-foreground">
            ({ratingCount.toLocaleString("en-IN")})
          </span>
        )}
        {assured && (
          <Badge variant="newArrival">Assured</Badge>
        )}
      </div>

      {warrantyLabel && (
        <p className="text-xs leading-[18px] text-muted-foreground">{warrantyLabel}</p>
      )}

      {/* Pricing */}
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-xl leading-[28px] font-bold text-foreground">
            ₹{formatINR(price)}
          </span>
          {wasPrice && (
            <span className="text-sm leading-[22px] text-muted-foreground line-through">
              ₹{formatINR(wasPrice)}
            </span>
          )}
          {discount > 0 && (
            <span className="text-sm leading-[22px] font-medium text-discount">
              ({discount}% off)
            </span>
          )}
        </div>
        {emiStarting && (
          <p className="text-sm leading-[22px] text-muted-foreground">
            EMI starting from {emiStarting}
          </p>
        )}
      </div>
    </div>
  )
}

export { ProductCard }