import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProductCard } from "./product-card";

const meta = {
  title: "Furnish/Deals/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
  argTypes: {
    image: { control: "text" },
    name: { control: "text" },
    price: { control: "number" },
    originalPrice: { control: "number" },
    discountPercent: { control: "number" },
    wishlisted: { control: "boolean" },
    onWishlistToggle: { action: "wishlist-toggled" },
  },
  args: {
    image: "https://picsum.photos/seed/deal-sofa/370/370",
    name: "Linen Armchair",
    price: 1299,
    originalPrice: 1899,
    wishlisted: false,
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HighDiscount: Story = {
  args: {
    price: 437,
    originalPrice: 1899,
  },
};

export const LowDiscount: Story = {
  args: {
    price: 1899,
    originalPrice: 2299,
  },
};

export const Wishlisted: Story = {
  args: {
    wishlisted: true,
  },
};

export const NotWishlisted: Story = {
  args: {
    wishlisted: false,
  },
};

export const LongProductName: Story = {
  args: {
    name: "Premium Velvet Upholstered Accent Lounge Chair with Oak Wood Legs",
  },
};
