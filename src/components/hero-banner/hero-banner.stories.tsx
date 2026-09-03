import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { HeroBanner } from "./hero-banner";

const desktopImage =
  "https://picsum.photos/seed/hero-desktop/1907/226";
const tabletImage = "https://picsum.photos/seed/hero-tablet/1676/214";
const mobileImage = "https://picsum.photos/seed/hero-mobile/800/400";

const meta = {
  title: "Furnish/Promos/HeroBanner",
  component: HeroBanner,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    desktopImage,
    tabletImage,
    mobileImage,
    headline: "Upgrade Your Space This Season",
    subtext:
      "Discover handpicked furniture and decor — thoughtfully curated for every room in your home.",
    ctaText: "Shop the collection",
    ctaLink: "/shop",
  },
} satisfies Meta<typeof HeroBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoSubtext: Story = {
  args: {
    subtext: undefined,
    headline: "Big Mid-Year Sale is Here",
    ctaText: "Shop sale",
  },
};

export const DesktopOnly: Story = {
  args: {
    tabletImage: undefined,
    mobileImage: undefined,
  },
};
