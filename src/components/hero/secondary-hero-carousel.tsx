"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { HeroBanner } from "@/lib/schemas/hero";

type SecondaryHeroCarouselProps = {
  slides: HeroBanner[];
};

function SecondaryHeroCarousel({ slides }: SecondaryHeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (slides.length === 0) return null;

  return (
    <div className="relative h-full">
      <div
        className="h-full overflow-hidden rounded-2xl mx-2 lg:rounded-none "
        ref={emblaRef}
      >
        <div className="flex h-full">
          {slides.map((slide, i) => (
            <div key={slide.id} className="relative min-w-0 flex-[0_0_100%]">
              <div className="relative aspect-[16/10] h-full w-full">
                <Image
                  src={slide.imageUrl}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Floating badge */}
                {slide.badgeText ? (
                  <div className="absolute left-3 top-3 z-10 rounded-full bg-pink-600 px-3 py-1 text-[10px] font-bold text-white shadow-[0_0_15px_rgba(219,39,119,0.5)]">
                    {slide.badgeText}
                  </div>
                ) : null}

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <h3 className="mb-1 text-lg font-bold text-white">
                    {slide.title}
                  </h3>
                  {slide.subtitle ? (
                    <p className="mb-3 text-xs text-white/90">
                      {slide.subtitle}
                    </p>
                  ) : null}
                  <div>
                    <Link
                      href={slide.ctaUrl}
                      className="inline-flex items-center rounded-md bg-white px-4 py-2 text-xs font-semibold text-brand transition-colors hover:bg-white/90"
                    >
                      {slide.ctaText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots — overlay on image */}
      <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => emblaApi?.scrollTo(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              selectedIndex === i ? "w-6 bg-white" : "w-2 bg-white/50",
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export { SecondaryHeroCarousel };
