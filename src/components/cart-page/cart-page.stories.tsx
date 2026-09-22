import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { CartPage } from "./cart-page"
import type { CartLine } from "@/lib/services/cart.service"

const sampleLines: CartLine[] = [
  {
    product: {
      name: "Lem Velvet 3 Seater Sofa in Teal Blue Colour",
      slug: "lem-velvet-3-seater-sofa",
      brand: "Casacraft",
      image: "https://picsum.photos/seed/lem-velvet/260/320",
      price: 28499,
      wasPrice: 55999,
      rating: 4.8,
      ratingCount: 421,
    },
    quantity: 1,
  },
  {
    product: {
      name: "Lennox L-Shaped Sofa in Beige",
      slug: "lennox-l-shaped-sofa",
      brand: "Casacraft",
      image: "https://picsum.photos/seed/lennox/260/320",
      price: 41999,
      wasPrice: 69999,
      rating: 4.6,
      ratingCount: 288,
    },
    quantity: 2,
  },
  {
    product: {
      name: "Ceramic Vase Trio in Matte Ivory",
      slug: "ceramic-vase-trio",
      brand: "Empower Studio",
      image: "https://picsum.photos/seed/vase-trio/260/320",
      price: 2499,
      wasPrice: 3999,
      rating: 4.2,
      ratingCount: 54,
    },
    quantity: 1,
  },
]

const meta = {
  title: "Furnish/CartPage",
  component: CartPage,
  tags: ["autodocs"],
  args: {
    initialLines: sampleLines,
  },
} satisfies Meta<typeof CartPage>

export default meta
type Story = StoryObj<typeof meta>

export const WithItems: Story = {}

export const Empty: Story = {
  args: {
    initialLines: [],
  },
}