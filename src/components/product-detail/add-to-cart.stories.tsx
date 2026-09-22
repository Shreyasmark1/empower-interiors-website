import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { AddToCart } from "./add-to-cart"

const meta = {
  title: "Furnish/ProductDetail/AddToCart",
  component: AddToCart,
  parameters: {
    layout: "padded",
  },
  args: {
    product: {
      name: "Lem Velvet 3 Seater Sofa in Teal Blue Colour",
      image: "",
      price: 89900,
      wasPrice: 114900,
    },
  },
} satisfies Meta<typeof AddToCart>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NarrowRail: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
}