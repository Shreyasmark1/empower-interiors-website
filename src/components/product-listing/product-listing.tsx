"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { ListingLink, ProductListing } from "@/lib/schemas";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { Pagination } from "@/components/ui/pagination";
import { ProductCard } from "@/components/product-card";

import { ListingHeader } from "@/components/listing-header";
import { ProductFilterContainer } from "@/components/product-filter-container";
import { ResultCount } from "./result-count";

const PAGE_SIZE = 20;

type ProductListingViewProps = {
  listing: ProductListing;
  className?: string;
  emptyTitle?: string;
  emptyDescription?: string;
};

function SubcategoryChip({ item }: { item: ListingLink }) {
  return (
    <Link
      href={item.href}
      className="group flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2 shadow-sm transition-shadow hover:border-brand hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
    >
      {item.imageUrl ? (
        <span className="relative size-10 shrink-0 overflow-hidden rounded-md bg-plum-5">
          <Image
            src={item.imageUrl}
            alt={item.label}
            fill
            sizes="40px"
            className="object-cover"
          />
        </span>
      ) : null}
      <span className="text-sm font-medium text-foreground transition-colors group-hover:text-brand">
        {item.label}
      </span>
    </Link>
  );
}

function ProductListingView({
  listing,
  className,
  emptyTitle,
  emptyDescription,
}: ProductListingViewProps) {
  const [page, setPage] = useState(1);
  const [wishlisted, setWishlisted] = useState<Set<string>>(new Set());

  const total = listing.products.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageProducts = listing.products.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );
  const start = startIndex + 1;
  const end = Math.min(startIndex + PAGE_SIZE, total);

  function toggleWishlist(slug: string) {
    setWishlisted((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  }

  function handlePageChange(nextPage: number) {
    setPage(nextPage);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div className={cn("flex flex-col bg-background", className)}>
      {/* Breadcrumb */}
      <Container className="flex justify-center">
        <Breadcrumb items={listing.breadcrumb} className="py-3" />
      </Container>

      <Container className="flex justify-center max-w-full">
        <ListingHeader
          title={listing.title}
          description={listing.description}
        />
      </Container>
  <ProductFilterContainer />

      {listing.subcategories.length > 0 ? (
        <Container className="pt-4 pb-6">
          {/* Subcategories contained in the current node */}
          <div className="flex flex-wrap gap-2.5">
            {listing.subcategories.map((sub) => (
              <SubcategoryChip key={sub.href} item={sub} />
            ))}
          </div>
        </Container>
      ) : null}

      {/* Products — full-width canvas band */}
      <div className="bg-muted">
        <Container className="py-6 md:py-8">
          {total > 0 ? (
            <>
              <ResultCount
                className="mb-6"
                start={start}
                end={end}
                total={total}
                title={listing.title}
              />
              <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                {pageProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                  >
                    <ProductCard
                      className="rounded-xl border border-border bg-card shadow-sm transition-shadow duration-200 hover:shadow-lg"
                      name={product.name}
                      brand={product.brand}
                      image={product.image}
                      price={product.price}
                      wasPrice={product.wasPrice}
                      discountPercent={product.discountPercent}
                      rating={product.rating}
                      ratingCount={product.ratingCount}
                      assured={product.assured}
                      warrantyLabel={product.warrantyLabel}
                      emiStarting={product.emiStarting}
                      colors={product.colors}
                      wishlisted={wishlisted.has(product.slug)}
                      onWishlistToggle={() => toggleWishlist(product.slug)}
                    />
                  </Link>
                ))}
              </div>

              <Pagination
                className="mt-6"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border py-16 text-center">
              <p className="text-base font-medium text-foreground">
                {emptyTitle ?? `No products yet in ${listing.title}`}
              </p>
              <p className="text-sm text-muted-foreground">
                {emptyDescription ??
                  "We are adding new pieces here soon. Explore other collections meanwhile."}
              </p>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

export { ProductListingView };
export type { ProductListingViewProps };
