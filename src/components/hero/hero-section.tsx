"use client";

import { useEffect, useState } from "react";

import { Container } from "@/components/ui/container";
import { PrimaryHeroBanner } from "./primary-hero-banner";
import { SecondaryHeroCarousel } from "./secondary-hero-carousel";
import type { HeroData } from "@/lib/schemas/hero";

function HeroSection() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/hero")
      .then((r) => r.json())
      .then((data: HeroData) => {
        if (!cancelled) setHeroData(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (!heroData) return null;

  return (
    <section>
      <Container>
        {/* Mobile: stacked */}
        <div className="flex flex-col gap-4 px-4 lg:hidden">
          <PrimaryHeroBanner banner={heroData.primary} />
          <SecondaryHeroCarousel slides={heroData.carousel} />
        </div>

        {/* Desktop: side by side — no gap */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:items-stretch">
          <div className="col-span-8">
            <PrimaryHeroBanner banner={heroData.primary} />
          </div>
          <div className="col-span-4">
            <SecondaryHeroCarousel slides={heroData.carousel} />
          </div>
        </div>
      </Container>
    </section>
  );
}

export { HeroSection };
