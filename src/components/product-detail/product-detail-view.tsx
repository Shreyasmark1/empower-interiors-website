"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import type { ProductDetailInfo } from "@/lib/schemas"
import { NAVBAR_HEIGHT, pageMotion } from "./product-detail.constants"
import { ProductGallery } from "./product-gallery"
import { ProductInfo } from "./product-info"
import { ProductTabs } from "./product-tabs"
import { ProductFeatures } from "./product-features"
import { RelatedProducts, type RelatedProduct } from "./related-products"
import { MobileActionBar } from "./mobile-action-bar"

type ProductDetailViewProps = {
  product: ProductDetailInfo
  related: RelatedProduct[]
  className?: string
}

function ProductDetailView({ product, related, className }: ProductDetailViewProps) {
  const roomHref = `/products?room=${encodeURIComponent(product.roomType)}`

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

      {/* Hero grid */}
      <div className="mx-auto w-[94%] max-w-[1280px] md:w-[90%]">
        <div className="grid grid-cols-1 gap-10 pt-8 pb-16 lg:grid-cols-[58fr_42fr] lg:gap-16 lg:pt-12 lg:pb-20">
          <ProductGallery images={product.gallery} productName={product.name} />
          <div className="lg:sticky lg:top-[calc(var(--navbar-height-compact)+1.5rem)] lg:self-start">
            <ProductInfo product={product} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mx-auto w-[94%] max-w-[1280px] pb-16 md:w-[90%] lg:pb-24">
        <ProductTabs product={product} />
      </div>

      {/* Features */}
      <ProductFeatures features={product.features} />

      {/* Related */}
      <RelatedProducts related={related} roomType={product.roomType} />

      <MobileActionBar product={product} />
    </motion.div>
  )
}

export { ProductDetailView }