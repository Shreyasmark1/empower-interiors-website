"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { ProductCard, type DealsProduct } from "@/components/deals";
import { DealsCTA } from "@/components/deals";

export type { DealsProduct } from "@/components/deals";

type FreshFindsProps = {
  title?: string;
  products: DealsProduct[];
  className?: string;
};

function freshKey(product: DealsProduct): string {
  return `${product.image}::${product.name}`;
}

function FreshFinds({ title = "Fresh Finds at Empower", products, className }: FreshFindsProps) {
  const [wishlisted, setWishlisted] = useState<Set<string>>(
    () => new Set(products.filter((p) => p.wishlisted).map((p) => freshKey(p))),
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
        {title}
      </h2>

      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:snap-none lg:grid-cols-6 lg:gap-x-4 lg:overflow-visible lg:pb-0">
        {products.map((product, i) => {
          const key = freshKey(product);
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
          heading="Shop All Fresh Finds"
          scriptLine1="Fresh"
          scriptLine2="Finds"
          ctaText="View All"
          ctaLink="/fresh"
          className="w-40 shrink-0 snap-start sm:w-48 lg:w-full"
        />
      </div>
    </section>
  );
}

export { FreshFinds };
