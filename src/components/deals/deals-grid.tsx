"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { ProductCard, type DealsProduct } from "./product-card";
import { DealsCTA } from "./deals-cta";

export type { DealsProduct } from "./product-card";

type DealsGridProps = {
  sectionTitle: string;
  products: DealsProduct[];
  cta?: {
    heading?: string;
    scriptLine1?: string;
    scriptLine2?: string;
    ctaText?: string;
    ctaLink?: string;
  };
  className?: string;
};

function dealKey(product: DealsProduct): string {
  return `${product.image}::${product.name}`;
}

function DealsGrid({ sectionTitle, products, cta, className }: DealsGridProps) {
  const [wishlisted, setWishlisted] = useState<Set<string>>(
    () =>
      new Set(
        products
          .filter((p) => p.wishlisted)
          .map((p) => dealKey(p)),
      ),
  );

  const toggleWishlist = (key: string) => {
    setWishlisted((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <section className={cn("w-full", className)}>
      {/* Section title */}
      <h2 className="mb-6 text-center text-bold text-3xl bg-(image:--bg-hero-gradient) text-transparent bg-clip-text sm:text-4xl">
        {sectionTitle}
      </h2>

      {/* Grid: 6 equal columns on desktop, horizontal scroll on smaller screens */}
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:snap-none lg:grid-cols-6 lg:gap-x-4 lg:overflow-visible lg:pb-0">
        {products.map((product, i) => {
          const key = dealKey(product);
          return (
            <ProductCard
              key={key + i}
              {...product}
              wishlisted={wishlisted.has(key) || product.wishlisted}
              onWishlistToggle={() => toggleWishlist(key)}
              className="w-40 shrink-0 snap-start sm:w-48 lg:w-full"
            />
          );
        })}
        <DealsCTA
          {...cta}
          className="w-40 shrink-0 snap-start sm:w-48 lg:w-full"
        />
      </div>
    </section>
  );
}

export { DealsGrid };
