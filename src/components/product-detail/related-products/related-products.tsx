"use client"

import * as React from "react"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { ProductCard, type DealsProduct } from "@/components/deals"
import { productCardService } from "@/components/product-card"
import type { ProductDetailInfo } from "@/lib/schemas"
import { toast } from "@/lib/toasts"
import { cn } from "@/lib/utils"
import { productDetailService } from "../services/product-detail.service"

export type RelatedProduct = {
  slug: string
  name: string
  brand?: string
  category: string
  categoryPath: string[]
  price: number
  wasPrice?: number
  discountPercent?: number
  image?: string
}

type RelatedProductsProps = {
  product: ProductDetailInfo
  related: RelatedProduct[]
  className?: string
}

type Mode = "related" | "similar"

function imageFallback(slug: string): string {
  return `https://picsum.photos/seed/${slug}/560/700`
}

function toDealsProduct(item: RelatedProduct): DealsProduct {
  return {
    image: item.image ?? imageFallback(item.slug),
    name: item.name,
    price: item.price,
    originalPrice: item.wasPrice ?? item.price,
    ...(item.discountPercent != null ? { discountPercent: item.discountPercent } : {}),
  }
}

function RelatedProducts({ product, related, className }: RelatedProductsProps) {
  const [viewportRef, embla] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  })
  const [mode, setMode] = React.useState<Mode>("related")
  const [similar, setSimilar] = React.useState<RelatedProduct[]>([])
  const [similarLoaded, setSimilarLoaded] = React.useState(false)
  const [wished, setWished] = React.useState<Set<string>>(new Set())

  async function toggleWish(item: RelatedProduct) {
    const nowWished = await productCardService.toggleWishlist(toDealsProduct(item))
    setWished((prev) => {
      const next = new Set(prev)
      if (nowWished) next.add(item.slug)
      else next.delete(item.slug)
      return next
    })
    toast.success(nowWished ? "Saved to wishlist" : "Removed from wishlist")
  }

  const items = mode === "related" ? related : similar
  const roomHref = `/products?room=${encodeURIComponent(product.roomType)}`
  const loading = mode === "similar" && !similarLoaded

  React.useEffect(() => {
    if (mode !== "similar" || similarLoaded) return

    let stale = false
    productDetailService
      .getSimilar(product.slug, product.categoryPath ?? [])
      .then((result) => {
        if (stale) return
        setSimilar(result)
      })
      .finally(() => {
        if (!stale) setSimilarLoaded(true)
      })
    return () => {
      stale = true
    }
  }, [mode, similarLoaded, product.slug, product.categoryPath])

  return (
    <section className={cn("border-t border-border bg-coral-10", className)}>
      <div className="mx-auto w-[94%] max-w-[1280px] py-16 md:w-[90%] lg:py-24">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[0.6875rem] font-semibold tracking-[0.32em] text-brand-magenta uppercase">
              Inspired Selections
            </p>
            <h2 className="mt-2 text-2xl font-extralight text-foreground lg:text-3xl">
              Recommended · Complete The Space
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {/* <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-1 rounded-full bg-brand-magenta px-3 py-1.5 text-xs font-semibold text-white"
            >
              <Percent className="size-3.5" strokeWidth={1.5} />
              Up to {Math.max(maxDiscount, 30)}% off
            </motion.span> */}
          </div>
        </div>

        {/* Toggle + arrows */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-full bg-white/60 p-1">
            {(
              [
                { id: "related", label: "Related" },
                { id: "similar", label: "Similar" },
              ] as const
            ).map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setMode(option.id)}
                aria-pressed={mode === option.id}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-200",
                  mode === option.id
                    ? "bg-brand-magenta text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          {items.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous products"
                onClick={() => embla?.scrollPrev()}
                className="grid size-10 place-items-center rounded-full border border-border bg-white text-foreground transition-colors hover:bg-plum-5"
              >
                <ArrowLeft className="size-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                aria-label="Next products"
                onClick={() => embla?.scrollNext()}
                className="grid size-10 place-items-center rounded-full border border-border bg-white text-foreground transition-colors hover:bg-plum-5"
              >
                <ArrowRight className="size-4" strokeWidth={1.5} />
              </button>
            </div>
          )}
        </div>

        {/* Carousel */}
        {loading ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Loading similar pieces…
          </p>
        ) : items.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No similar pieces found.
          </p>
        ) : (
          <div ref={viewportRef} className="overflow-hidden">
            <div className="-ml-4 flex *:ml-4 *:min-w-0">
              {items.slice(0, 8).map((item) => (
                <div
                  key={item.slug}
                  className="shrink-0 basis-[min(78vw,280px)] lg:basis-[240px]"
                >
                  <Link href={`/products/${item.slug}`} className="block h-full">
                    <ProductCard
                      className="h-full"
                      {...toDealsProduct(item)}
                      wishlisted={wished.has(item.slug)}
                      onWishlistToggle={() => toggleWish(item)}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA row */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={roomHref}
            className="flex h-12 w-full items-center justify-center rounded-lg bg-primary px-8 text-white transition-all duration-200 hover:bg-brand-hover sm:w-auto"
          >
            Explore all {product.roomType} pieces
          </Link>
          <Link
            href="/products"
            className="flex h-12 w-full items-center justify-center rounded-lg border-[1.5px] border-primary bg-transparent px-8 text-primary transition-colors duration-200 hover:bg-[rgba(87,0,84,0.06)] sm:w-auto"
          >
            View all products
          </Link>
        </div>
      </div>
    </section>
  )
}

export { RelatedProducts }