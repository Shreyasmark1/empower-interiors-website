import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ProductCard } from "./product-card"

const meta = {
  title: "Furnish/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text" },
    brand: { control: "text" },
    image: { control: "text" },
    price: { control: "number" },
    wasPrice: { control: "number" },
    discountPercent: { control: "number" },
    rating: { control: "number" },
    ratingCount: { control: "number" },
    assured: { control: "boolean" },
    warrantyLabel: { control: "text" },
    emiStarting: { control: "text" },
    wishlisted: { control: "boolean" },
    onWishlistToggle: { action: "wishlist-toggled" },
  },
  args: {
    name: "Lem Velvet 3 Seater Sofa in Teal Blue Colour",
    brand: "By Casacraft from Pepperfry",
    image: "https://picsum.photos/seed/product-sofa/420/520",
    price: 28499,
    wasPrice: 55999,
    rating: 5,
    ratingCount: 421,
    assured: true,
    warrantyLabel: "12-Month Warranty Available",
    emiStarting: "₹1,369/month",
    colors: [
      { color: "Teal Blue", swatch: "#0f766e" },
      { color: "Rust", swatch: "#c2410c" },
      { color: "Charcoal", swatch: "#374151" },
      { color: "Burgundy", swatch: "#7f1d1d" },
      { color: "Moss", swatch: "#3f6212" },
      { color: "Blush", swatch: "#db2777" },
    ],
    wishlisted: false,
  },
} satisfies Meta<typeof ProductCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Wishlisted: Story = {
  args: {
    wishlisted: true,
  },
}

export const NoWarranty: Story = {
  args: {
    warrantyLabel: undefined,
  },
}

export const NotAssured: Story = {
  args: {
    assured: false,
  },
}

export const NoDiscount: Story = {
  args: {
    wasPrice: undefined,
    discountPercent: 0,
  },
}

export const LongName: Story = {
  args: {
    name: "Premium Teal Velvet Upholstered 3 Seater Lounge Sofa with Solid Oak Wood Frame and Silver Legs",
  },
}

export const OnlyTwoColors: Story = {
  args: {
    colors: [
      { color: "Teal Blue", swatch: "#0f766e" },
      { color: "Rust", swatch: "#c2410c" },
    ],
  },
}