"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { HugeiconsIcon, WishlistIcon } from "@/lib/icons";

export type DealsProduct = {
  image: string;
  name: string;
  price: number;
  originalPrice: number;
  discountPercent?: number;
  wishlisted?: boolean;
  onWishlistToggle?: () => void;
};

function discountFrom(price: number, originalPrice: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round((1 - price / originalPrice) * 100);
}

function ProductCard({
  image,
  name,
  price,
  originalPrice,
  discountPercent,
  wishlisted = false,
  onWishlistToggle,
  className,
}: DealsProduct & { className?: string }) {
  const discount = discountPercent ?? discountFrom(price, originalPrice);

  return (
    <div className={cn("group flex h-full w-full flex-col", className)}>
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-surface-alt">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 16vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />

        {/* Wishlist button */}
        <button
          type="button"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          onClick={(e) => {
            e.preventDefault();
            onWishlistToggle?.();
          }}
          className="absolute bottom-2 right-2 z-10 grid size-8 place-items-center rounded-full bg-gray-300 shadow-md transition-transform duration-200 hover:scale-110"
        >
          <HugeiconsIcon
            icon={WishlistIcon}
            strokeWidth={2}
            className={cn(
              "size-4",
              wishlisted ? "text-primary fill-primary" : "text-muted-foreground",
            )}
          />
        </button>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1.5 pt-3">
        <h3 className="truncate text-sm font-medium text-foreground">{name}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-foreground">₹{price}</span>
          <span className="text-sm font-normal text-muted-foreground line-through">
            ₹{originalPrice}
          </span>
          <span className="text-sm font-bold text-discount">{discount}% OFF</span>
        </div>
      </div>
    </div>
  );
}

export { ProductCard };
