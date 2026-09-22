import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ProductCTA } from "./product-cta"

const meta = {
  title: "Furnish/ProductDetail/ProductCTA",
  component: ProductCTA,
  parameters: {
    layout: "padded",
  },
  args: {
    name: "Lem Velvet 3 Seater Sofa in Teal Blue Colour",
    roomType: "Living Room",
    slug: "lem-velvet-3-seater-sofa-in-teal-blue-colour",
    image: "",
    price: 89900,
    wasPrice: 114900,
  },
} satisfies Meta<typeof ProductCTA>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MobileSticky: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
}