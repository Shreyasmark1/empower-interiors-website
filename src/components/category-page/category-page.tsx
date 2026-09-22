"use client";

import { useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { CategoryPage } from "@/lib/schemas";
import { mockCatalog } from "@/components/product-listing";
import { ProductCard, type DealsProduct } from "@/components/deals";
import { AnnouncementStrip } from "@/components/announcement-strip";
import { CategoryCard } from "@/components/category-card";
import { CategorySeoSection } from "@/components/category-seo";
import { PromoTile } from "@/components/promo-tile";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { ListingHeader } from "@/components/listing-header";

const COLS = 6;
const INITIAL_ROWS = 2;
const INITIAL_VISIBLE = COLS * INITIAL_ROWS;

type CategoryViewProps = {
  category: CategoryPage;
  className?: string;
};

function fallbackImage(href: string): string {
  return `https://picsum.photos/seed/${href
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}/400/400`;
}

function wideBannerUrl(imageUrl: string): string {
  const seed = imageUrl.match(/\/seed\/([^/]+)\//)?.[1];
  return seed ? `https://picsum.photos/seed/${seed}/1676/153` : imageUrl;
}

type RelatedRowItem = DealsProduct & { slug: string };

function CategoryView({ category, className }: CategoryViewProps) {
  const [showAll, setShowAll] = useState(false);
  const [wishlisted, setWishlisted] = useState<Set<string>>(new Set());

  const visibleCards = showAll
    ? category.subcategories
    : category.subcategories.slice(0, INITIAL_VISIBLE);
  const hasMore = category.subcategories.length > INITIAL_VISIBLE;

  const relatedProducts: RelatedRowItem[] = mockCatalog
    .filter(
      (product) =>
        product.path === `/${category.slug}` ||
        product.path.startsWith(`/${category.slug}/`),
    )
    .slice(0, 6)
    .map((product) => ({
      slug: product.slug,
      image: product.image,
      name: product.name,
      price: product.price,
      originalPrice: product.wasPrice ?? product.price,
      ...(product.discountPercent != null
        ? { discountPercent: product.discountPercent }
        : {}),
    }));

  const secondBanner =
    category.promoBanners[1] ?? category.promoBanners[0];

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
    <div className={cn("flex flex-col bg-background", className)}>
      {/* Breadcrumb — identical to the product listing */}
      <Container className="flex justify-center">
        <Breadcrumb items={category.breadcrumb} className="py-3" />
      </Container>

      {/* Header — title + description exactly as the product listing */}
      <Container className="flex justify-center max-w-full">
        <ListingHeader
          title={category.title}
          description={category.description}
        />
      </Container>

      {/* Promo banner — single, full width, directly below the description */}
      {category.promoBanners.length > 0 ? (
        <Container className="pb-2">
            <AnnouncementStrip
              src={wideBannerUrl(category.promoBanners[0].imageUrl)}
              alt={category.promoBanners[0].title}
              width={1676}
              height={300}
            />
          </Container>
      ) : null}

      {/* Subcategories — 6 cols; "Click more" expands to additional rows */}
      <div className="bg-muted">
        <Container className="py-6 md:py-8">
          <h2 className="flex text-brand-magenta justify-center text-2xl pb-4">Shop By Category</h2>
          {visibleCards.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
              {visibleCards.map((card) => (
                <CategoryCard
                  key={card.href}
                  title={card.name}
                  imageUrl={card.imageUrl ?? fallbackImage(card.href)}
                  href={card.href}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border py-16 text-center">
              <p className="text-base font-medium text-foreground">
                Nothing here yet in {category.title}
              </p>
              <p className="text-sm text-muted-foreground">
                We are adding new collections here soon.
              </p>
            </div>
          )}

          {hasMore ? (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand transition-colors hover:text-brand-magenta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                {showAll ? "Show less" : "Click more"}
              </button>
            </div>
          ) : null}
        </Container>
      </div>

      {/* Promo banners — two clickable tiles, no CTA */}
      {category.promoBanners.length > 0 ? (
        <Container className="pb-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {category.promoBanners.slice(0, 2).map((banner) => (
              <PromoTile
                key={banner.title}
                image={banner.imageUrl}
                headline={banner.title}
                ctaLink={banner.ctaUrl}
                size="md"
              />
            ))}
          </div>
        </Container>
      ) : null}

      {/* Related products — a single row of products worth exploring */}
      {relatedProducts.length > 0 ? (
        <Container className="pb-8">
          <h2 className="mb-6 flex justify-center pb-4 text-2xl text-brand-magenta">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {relatedProducts.map((product) => {
              const key = `${product.image}::${product.name}`;
              return (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="block"
                >
                  <ProductCard
                    {...product}
                    wishlisted={wishlisted.has(key)}
                    onWishlistToggle={() => toggleWishlist(key)}
                  />
                </Link>
              );
            })}
          </div>
        </Container>
      ) : null}

      {/* Second announcement strip */}
      {category.promoBanners.length > 0 ? (
        <Container className="pb-8">
          <AnnouncementStrip
            src={wideBannerUrl(secondBanner.imageUrl)}
            alt={secondBanner.title}
            width={1676}
            height={300}
          />
        </Container>
      ) : null}

      {/* SEO — FAQ + related description */}
      <CategorySeoSection title={category.title} seo={category.seo} />
    </div>
  );
}

export { CategoryView };
export type { CategoryViewProps };
