import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PromoTile } from "./promo-tile";
import { PromoTileRow } from "./promo-tile-row";

const meta = {
  title: "Furnish/Promos/PromoTile",
  component: PromoTile,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  args: {
    image: "https://picsum.photos/seed/promo-sm/550/159",
    headline: "Comfy Seating",
    ctaText: "Shop now",
    ctaLink: "/seating",
    size: "sm",
  },
} satisfies Meta<typeof PromoTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: { size: "sm" },
};

export const Medium: Story = {
  args: {
    size: "md",
    image: "https://picsum.photos/seed/promo-md/831/263",
    headline: "Monsoon Sale — Up to 40% Off",
  },
};

export const Row: StoryObj<typeof PromoTileRow> = {
  name: "Row (2x sm tiles)",
  render: () => (
    <PromoTileRow
      tiles={[
        {
          image: "https://picsum.photos/seed/promo-a/550/159",
          headline: "New Sofa Collection",
          ctaText: "Shop sofas",
          ctaLink: "/sofas",
        },
        {
          image: "https://picsum.photos/seed/promo-b/550/159",
          headline: "Lighting Sale",
          ctaText: "Shop lighting",
          ctaLink: "/lighting",
        },
        {
          image: "https://picsum.photos/seed/promo-c/550/159",
          headline: "Decor That Inspires",
          ctaText: "Shop decor",
          ctaLink: "/decor",
        },
      ]}
    />
  ),
};
