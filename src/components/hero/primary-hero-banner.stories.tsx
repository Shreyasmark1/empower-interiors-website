import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PrimaryHeroBanner } from "./primary-hero-banner";

const meta = {
  title: "Furnish/Hero/PrimaryHeroBanner",
  component: PrimaryHeroBanner,
  tags: ["autodocs"],
} satisfies Meta<typeof PrimaryHeroBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    banner: {
      id: "hero-1",
      title: "Summer Collection",
      subtitle: "Transform your living space with our curated designer picks",
      imageUrl: "https://picsum.photos/seed/hero-primary/800/500",
      ctaText: "Shop Now",
      ctaUrl: "/collections/summer",
      badgeText: "UPTO 70% OFF",
      couponCode: "WWFD1K",
    },
  },
};

export const WithoutCoupon: Story = {
  args: {
    banner: {
      id: "hero-2",
      title: "New Arrivals",
      subtitle: "Discover the latest in home decor",
      imageUrl: "https://picsum.photos/seed/hero-primary/800/500",
      ctaText: "Explore",
      ctaUrl: "/collections/new",
      badgeText: "Just In",
    },
  },
};

export const Minimal: Story = {
  args: {
    banner: {
      id: "hero-3",
      title: "Lighting Fest",
      imageUrl: "https://picsum.photos/seed/hero-primary/800/500",
      ctaText: "View Collection",
      ctaUrl: "/lighting",
    },
  },
};
