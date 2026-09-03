import Image from "next/image";
import Link from "next/link";

import type { HeroBanner } from "@/lib/schemas/hero";

type PrimaryHeroBannerProps = {
  banner: HeroBanner;
};

function PrimaryHeroBanner({ banner }: PrimaryHeroBannerProps) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      {/* Badge */}
      {/* {banner.badgeText ? (
        <div className="absolute right-4 top-4 z-10 rounded-full bg-pink-600 px-4 py-2 text-xs font-bold text-white shadow-[0_0_20px_rgba(219,39,119,0.5)]">
          {banner.badgeText}
        </div>
      ) : null} */}

      {/* Image */}
      <div className="relative aspect-[16/10] w-full flex-1">
        <Image
          src={banner.imageUrl}
          alt={banner.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 58vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Content overlay */}
      {/* <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
        <h2 className="mb-1 text-2xl font-bold text-white sm:text-3xl">
          {banner.title}
        </h2>
        {banner.subtitle ? (
          <p className="mb-4 max-w-sm text-sm text-white/90">
            {banner.subtitle}
          </p>
        ) : null}
        <div>
          <Link
            href={banner.ctaUrl}
            className="inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-white/90"
          >
            {banner.ctaText}
          </Link>
        </div>
      </div> */}

      {/* Coupon bar */}
      {/* {banner.couponCode ? (
        <div className="absolute bottom-0 left-0 right-0 border-t border-dashed border-white/30 bg-black/50 px-5 py-2.5 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs text-white/90">
            <span>Use Code:</span>
            <span className="rounded border border-dashed border-white/50 bg-white/10 px-2 py-0.5 font-bold tracking-wide text-white">
              {banner.couponCode}
            </span>
          </div>
        </div>
      ) : null} */}
    </div>
  );
}

export { PrimaryHeroBanner };
