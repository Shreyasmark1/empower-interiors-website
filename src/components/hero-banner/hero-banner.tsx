import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type HeroBannerProps = {
  desktopImage: string;
  tabletImage?: string;
  mobileImage?: string;
  headline: string;
  subtext?: string;
  ctaText: string;
  ctaLink: string;
  className?: string;
};

function HeroBanner({
  desktopImage,
  tabletImage,
  mobileImage,
  headline,
  subtext,
  ctaText,
  ctaLink,
  className,
}: HeroBannerProps) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col overflow-hidden bg-background",
        className,
      )}
    >
      <div className="relative aspect-[4/1] w-full sm:aspect-[1907/226] lg:aspect-[1907/226]">
        {/* Mobile image (below sm) */}
        {mobileImage ? (
          <Image
            src={mobileImage}
            alt={headline}
            fill
            priority
            className="object-cover sm:hidden"
            sizes="100vw"
          />
        ) : null}
        {/* Tablet / default image */}
        <Image
          src={tabletImage ?? desktopImage}
          alt={headline}
          fill
          priority
          className="object-cover max-sm:hidden sm:block"
          sizes="100vw"
        />

        {/* Gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent sm:bg-gradient-to-r sm:from-black/65 sm:via-black/35 sm:to-black/20" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-md lg:max-w-xl">
            <h2 className="mb-2 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
              {headline}
            </h2>
            {subtext ? (
              <p className="mb-5 max-w-sm text-sm text-white/90 sm:mb-7 sm:text-base">
                {subtext}
              </p>
            ) : null}
            <Link
              href={ctaLink}
              className="inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand shadow-lg transition-colors hover:bg-white/90"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export { HeroBanner };
