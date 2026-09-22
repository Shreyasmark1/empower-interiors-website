import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CategoryCard } from "./category-card";

const meta = {
  title: "Furnish/CategoryCard",
  component: CategoryCard,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof CategoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "3-Seater Sofas",
    imageUrl: "https://picsum.photos/seed/3-seater/400/400",
    href: "/seating/sofas/3-seater",
  },
};

export const Clickable: Story = {
  args: {
    title: "Sofa Cum Beds",
    imageUrl: "https://picsum.photos/seed/sofa-cum-beds/400/400",
    onClick: () => undefined,
  },
};