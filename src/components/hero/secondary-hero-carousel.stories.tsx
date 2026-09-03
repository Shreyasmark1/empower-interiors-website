import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SecondaryHeroCarousel } from "./secondary-hero-carousel";

const meta = {
  title: "Furnish/Hero/SecondaryHeroCarousel",
  component: SecondaryHeroCarousel,
  tags: ["autodocs"],
} satisfies Meta<typeof SecondaryHeroCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slides: [
      {
        id: "slide-1",
        title: "New Arrivals",
        subtitle: "Discover the latest in home decor",
        imageUrl: "https://picsum.photos/seed/hero-slide-1/600/400",
        ctaText: "Explore",
        ctaUrl: "/collections/new",
        badgeText: "Grab now!",
      },
      {
        id: "slide-2",
        title: "Monsoon Sale",
        subtitle: "Up to 50% off on select furniture",
        imageUrl: "https://picsum.photos/seed/hero-slide-2/600/400",
        ctaText: "Shop Sale",
        ctaUrl: "/sale",
        badgeText: "Limited Time",
      },
      {
        id: "slide-3",
        title: "Lighting Fest",
        subtitle: "Brighten every corner of your home",
        imageUrl: "https://picsum.photos/seed/hero-slide-3/600/400",
        ctaText: "View Collection",
        ctaUrl: "/lighting",
      },
    ],
  },
};

export const TwoSlides: Story = {
  args: {
    slides: [
      {
        id: "slide-a",
        title: "Festival Deal",
        subtitle: "Exclusive offers on premium furniture",
        imageUrl: "https://picsum.photos/seed/hero-slide-1/600/400",
        ctaText: "Shop Now",
        ctaUrl: "/festival",
        badgeText: "Hot Deal",
      },
      {
        id: "slide-b",
        title: "Clearance Sale",
        subtitle: "Last chance to grab your favourites",
        imageUrl: "https://picsum.photos/seed/hero-slide-2/600/400",
        ctaText: "Grab Now",
        ctaUrl: "/clearance",
      },
    ],
  },
};
