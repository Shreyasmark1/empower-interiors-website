import { type HeroData, HeroDataSchema } from "@/lib/schemas/hero";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const heroSeed: HeroData = {
  primary: {
    id: "hero-primary-1",
    title: "Summer Collection",
    subtitle: "Transform your living space with our curated designer picks",
    imageUrl: "https://picsum.photos/seed/hero-primary/800/500",
    mobileImageUrl: "https://picsum.photos/seed/hero-primary-mobile/400/500",
    ctaText: "Shop Now",
    ctaUrl: "/collections/summer",
    badgeText: "UPTO 70% OFF",
    couponCode: "WWFD1K",
  },
  carousel: [
    {
      id: "hero-slide-1",
      title: "New Arrivals",
      subtitle: "Discover the latest in home decor",
      imageUrl: "https://picsum.photos/seed/hero-slide-1/600/400",
      ctaText: "Explore",
      ctaUrl: "/collections/new",
      badgeText: "Grab now!",
    },
    {
      id: "hero-slide-2",
      title: "Monsoon Sale",
      subtitle: "Up to 50% off on select furniture",
      imageUrl: "https://picsum.photos/seed/hero-slide-2/600/400",
      ctaText: "Shop Sale",
      ctaUrl: "/sale",
      badgeText: "Limited Time",
    },
    {
      id: "hero-slide-3",
      title: "Lighting Fest",
      subtitle: "Brighten every corner of your home",
      imageUrl: "https://picsum.photos/seed/hero-slide-3/600/400",
      ctaText: "View Collection",
      ctaUrl: "/lighting",
    },
  ],
};

let heroCache: HeroData | null = null;

export const heroService = {
  async getHeroData(): Promise<HeroData> {
    if (heroCache) {
      return heroCache;
    }

    await delay(200);

    heroCache = HeroDataSchema.parse(heroSeed);
    return heroCache;
  },
};
