import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SearchWithDropdown } from "./search-bar";

const meta = {
  title: "Furnish/SearchWithDropdown",
  component: SearchWithDropdown,
  tags: ["autodocs"],
  args: {
    recentSearches: ["Linen sofa", "Oak dining table", "Velvet chair"],
    popularSearches: ["Modular", "Scandinavian", "Reclaimed wood", "Marmoleum"],
    suggestions: [
      "Modern Sofa",
      "Reclaimed Wood Dining Table",
      "Velvet Accent Chair",
      "Marble Coffee Table",
      "Modular Storage",
      "Modern Desk",
    ],
    categories: [
      { name: "Seating", count: 128 },
      { name: "Tables", count: 96 },
      { name: "Lighting", count: 74 },
      { name: "Storage", count: 63 },
    ],
  },
} satisfies Meta<typeof SearchWithDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EmptyState: Story = {};

export const WithImages: Story = {
  args: {
    categories: [
      { name: "Seating", count: 128, image: "https://picsum.photos/seed/seating/80" },
      { name: "Tables", count: 96, image: "https://picsum.photos/seed/tables/80" },
      { name: "Lighting", count: 74, image: "https://picsum.photos/seed/lighting/80" },
      { name: "Storage", count: 63, image: "https://picsum.photos/seed/storage/80" },
    ],
  },
};

export const WithNoRecent: Story = {
  args: {
    recentSearches: [],
  },
};
