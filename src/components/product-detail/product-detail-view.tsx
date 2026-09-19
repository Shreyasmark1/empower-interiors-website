"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowLeft, ChevronRight } from "lucide-react"

import { BenefitsStrip } from "@/components/benefits-strip"
import { PaymentOptions } from "@/components/payment-options"
import { SuggestProduct } from "@/components/suggest-product"
import type { GalleryImage, ProductDetailInfo } from "@/lib/schemas"
import { cn } from "@/lib/utils"
import { NAVBAR_HEIGHT, pageMotion } from "./product-detail.constants"
import { ProductGallery } from "./product-gallery"
import { ProductInfo } from "./product-info"
import { ProductTabs } from "./product-tabs"
import { RelatedProducts, type RelatedProduct } from "./related-products"

type ProductDetailViewProps = {
  product: ProductDetailInfo
  related: RelatedProduct[]
  className?: string
}

function variantImages(product: ProductDetailInfo, variantId?: string): GalleryImage[] {
  const variant = product.variants.find((item) => item.id === variantId)
  if (!variant || variant.images.length === 0) return product.gallery

  return variant.images.map((src, i) => {
    const base = product.gallery[i % product.gallery.length]
    return {
      id: `${variant.id}-${i}`,
      gradient: base?.gradient ?? "linear-gradient(135deg, oklch(0.7 0.18 310) 0%, oklch(0.46 0.14 330) 100%)",
      imageSrc: src,
      label: base?.label ?? "View",
    }
  })
}

function ProductDetailView({ product, related, className }: ProductDetailViewProps) {
  const roomHref = `/products?room=${encodeURIComponent(product.roomType)}`
  const [activeVariantId, setActiveVariantId] = React.useState<string | undefined>(
    product.variants[0]?.id
  )
  const images = variantImages(product, activeVariantId)

  return (
    <motion.div
      {...pageMotion}
      className={cn("bg-[oklch(1_0_0)] pb-24 lg:pb-0", className)}
      style={{ paddingTop: NAVBAR_HEIGHT }}
    >
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="mx-auto flex w-[94%] max-w-[1280px] items-center gap-2 py-3 text-[0.8125rem] font-light md:w-[90%]">
          <Link
            href="/products"
            className="flex items-center gap-1.5 text-brand-magenta transition-colors hover:text-brand"
          >
            <ArrowLeft className="size-3.5" />
            All Products
          </Link>
          <ChevronRight className="size-3.5 text-muted-foreground" />
          <Link href={roomHref} className="text-muted-foreground transition-colors hover:text-foreground">
            {product.roomType}
          </Link>
          <ChevronRight className="size-3.5 text-muted-foreground" />
          <span className="truncate text-muted-foreground/80">{product.name}</span>
        </div>
      </div>

      {/* Hero grid — gallery pinned, info rail scrolls */}
      <div className="mx-auto w-[94%] max-w-[1280px] md:w-[90%]">
        <div className="grid grid-cols-1 gap-10 pt-8 pb-16 lg:grid-cols-[55fr_45fr] lg:items-start lg:gap-16 lg:pt-12 lg:pb-20">
          <div className="lg:sticky lg:top-[calc(var(--navbar-height-compact)+1.5rem)] lg:self-start">
            <ProductGallery
              images={images}
              productName={product.name}
              has360={product.has360}
              has3d={product.has3d}
              frames={product.frames}
              modelUrl={product.modelUrl}
            />
          </div>

          <div className="flex flex-col gap-8 px-6 lg:px-10">
            <ProductInfo
              product={product}
              activeVariantId={activeVariantId}
              onVariantChange={setActiveVariantId}
            />
            <PaymentOptions />
            <BenefitsStrip />
            <ProductTabs product={product} />
          </div>
        </div>
      </div>

      {/* Related */}
      <RelatedProducts product={product} related={related} />

      <SuggestProduct />
    </motion.div>
  )
}

export { ProductDetailView }