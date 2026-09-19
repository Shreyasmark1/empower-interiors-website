"use client"

import * as React from "react"
import Link from "next/link"
import { Heart, Minus, Phone, Plus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { productCardService } from "@/components/product-card/product-card.service"
import type { ProductDetailInfo } from "@/lib/schemas"
import { toast } from "@/lib/toasts"
import { cn } from "@/lib/utils"
import {
  buildConsultationHref,
  buildWhatsAppHref,
  CONTACT,
  DEFAULT_TAXES_TEXT,
  TRUST_POINTS,
} from "./product-detail.constants"
import { CheckAvailability } from "./check-availability"
import { VariantSelector } from "./variant-selector"

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

type ProductInfoProps = {
  product: ProductDetailInfo
  activeVariantId?: string
  onVariantChange: (id: string) => void
  className?: string
}

function QuantityStepper({
  value,
  onChange,
}: {
  value: number
  onChange: (next: number) => void
}) {
  return (
    <div className="flex h-12 shrink-0 items-stretch overflow-hidden rounded-lg border border-border bg-surface-alt">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
        className="grid w-11 place-items-center text-muted-foreground transition-colors hover:bg-plum-5 hover:text-foreground disabled:opacity-40"
      >
        <Minus className="size-4" strokeWidth={1.5} />
      </button>
      <span
        aria-live="polite"
        className="grid w-11 place-items-center border-x border-border text-sm font-medium"
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
        className="grid w-11 place-items-center text-muted-foreground transition-colors hover:bg-plum-5 hover:text-foreground"
      >
        <Plus className="size-4" strokeWidth={1.5} />
      </button>
    </div>
  )
}

function ProductInfo({
  product,
  activeVariantId,
  onVariantChange,
  className,
}: ProductInfoProps) {
  const [quantity, setQuantity] = React.useState(1)
  const [wished, setWished] = React.useState(false)
  const toneClass =
    product.availabilityTone === "green" ? "bg-[#16a34a]" : "bg-amber-500"

  const selectedVariant = product.variants.find((variant) => variant.id === activeVariantId)
  const price = selectedVariant?.price ?? product.price
  const discount = product.wasPrice
    ? Math.round((1 - product.price / product.wasPrice) * 100)
    : 0

  async function onAddToCart() {
    await productCardService.addToCart({
      name: product.name,
      image: product.gallery[0]?.imageSrc ?? "",
      price,
      wasPrice: product.wasPrice,
    })
    toast.success(`${product.name} added to your cart`)
  }

  async function onWishlistToggle() {
    const nowWished = await productCardService.toggleWishlist({
      name: product.name,
      image: product.gallery[0]?.imageSrc ?? "",
      price,
    })
    setWished(nowWished)
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
            onClick={onWishlistToggle}
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

      <CheckAvailability />

      {/* CTA stack — sticky bottom bar on mobile, inline on laptop */}
      <div
        className={cn(
          "flex flex-col gap-3 px-6 py-3",
          "sticky bottom-0 z-20 -mx-6 border-t bg-white/92 backdrop-blur-lg",
          "lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none"
        )}
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="flex gap-2">
          <QuantityStepper value={quantity} onChange={setQuantity} />
          <button
            type="button"
            onClick={onAddToCart}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-brand text-white shadow-[0_10px_30px_rgba(87,0,84,0.28)] transition-all duration-200 hover:bg-brand-magenta"
          >
            Add to Cart
          </button>
        </div>
        <a
          href={buildWhatsAppHref(product.name, product.roomType)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#22c55e] text-white shadow-[0_10px_30px_rgba(34,197,94,0.32)] transition-all duration-200 hover:bg-[#16a34a]"
        >
          <WhatsAppIcon className="size-5" />
          Chat on WhatsApp
        </a>
        <div className="flex gap-2">
          <Link
            href={buildConsultationHref(product.slug, product.roomType)}
            className="flex h-12 flex-1 items-center justify-center rounded-lg bg-brand-magenta text-white transition-all duration-200 hover:bg-brand"
          >
            Get Free Consultation
          </Link>
          <a
            href={CONTACT.telHref}
            aria-label={`Call us at ${CONTACT.phoneDisplay}`}
            className="grid h-12 min-w-12 items-center justify-center gap-2 rounded-lg border-[1.5px] border-primary text-primary transition-colors duration-200 hover:bg-[rgba(87,0,84,0.06)]"
          >
            <Phone className="size-5" strokeWidth={1.5} />
          </a>
        </div>
      </div>

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