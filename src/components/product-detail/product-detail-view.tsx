"use client";

import * as React from "react";
import { motion } from "motion/react";

import { BenefitsStrip } from "@/components/benefits-strip";
import { PaymentOptions } from "@/components/payment-options";
import { SuggestProduct } from "@/components/suggest-product";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import type { GalleryImage, ProductDetailInfo } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { pageMotion } from "./product-detail.constants";
import { ProductGallery } from "./product-gallery";
import { ProductInfo } from "./product-info";
import { ProductTabs } from "./product-tabs";
import { RelatedProducts, type RelatedProduct } from "./related-products";

type ProductDetailViewProps = {
  product: ProductDetailInfo;
  related: RelatedProduct[];
  className?: string;
};

function variantImages(
  product: ProductDetailInfo,
  variantId?: string,
): GalleryImage[] {
  const variant = product.variants.find((item) => item.id === variantId);
  if (!variant || variant.images.length === 0) return product.gallery;

  return variant.images.map((src, i) => {
    const base = product.gallery[i % product.gallery.length];
    return {
      id: `${variant.id}-${i}`,
      gradient:
        base?.gradient ??
        "linear-gradient(135deg, oklch(0.7 0.18 310) 0%, oklch(0.46 0.14 330) 100%)",
      imageSrc: src,
      label: base?.label ?? "View",
    };
  });
}

function ProductDetailView({
  product,
  related,
  className,
}: ProductDetailViewProps) {
  const [activeVariantId, setActiveVariantId] = React.useState<
    string | undefined
  >(product.variants[0]?.id);
  const images = variantImages(product, activeVariantId);

  return (
    <motion.div
      {...pageMotion}
      className={cn("bg-[oklch(1_0_0)] pb-24 lg:pb-0", className)}
    >
      {/* Breadcrumb */}

      <div className="mx-auto w-[94%] max-w-7xl md:w-[90%] flex justify-start sm:justify-center">
        {product.breadcrumb ? (
          <Breadcrumb items={product.breadcrumb} className="py-3" />
        ) : null}
      </div>

      {/* Hero grid — gallery pinned, info rail scrolls */}
      <div className="mx-auto w-[94%] max-w-7xl md:w-[90%]">
        <div className="grid grid-cols-1 gap-10 pt-2 pb-16 lg:grid-cols-[55fr_45fr] lg:items-start lg:gap-16 lg:pt-2 lg:pb-20">
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
  );
}

export { ProductDetailView };
