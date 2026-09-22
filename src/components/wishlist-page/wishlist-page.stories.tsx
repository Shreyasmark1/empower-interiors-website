import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { WishlistPage } from "./wishlist-page"
import type { CartLineProduct } from "@/lib/services/cart.service"

const sampleProducts: CartLineProduct[] = [
  {
    name: "Lem Velvet 3 Seater Sofa in Teal Blue Colour",
    slug: "lem-velvet-3-seater-sofa",
    brand: "Casacraft",
    image: "https://picsum.photos/seed/lem-velvet/420/520",
    price: 28499,
    wasPrice: 55999,
    rating: 4.8,
    ratingCount: 421,
    assured: true,
    warrantyLabel: "12-Month Warranty Available",
    emiStarting: "₹1,369/month",
    colors: [
      { color: "Teal Blue", swatch: "#0f766e" },
      { color: "Charcoal", swatch: "#374151" },
      { color: "Burgundy", swatch: "#7f1d1d" },
    ],
  },
  {
    name: "Rustic Sheesham Wood 6 Seater Dining Table",
    slug: "rustic-wood-dining-table",
    brand: "Woodsworth",
    image: "https://picsum.photos/seed/dining-table/420/520",
    price: 32999,
    wasPrice: 52999,
    rating: 4.6,
    ratingCount: 267,
    assured: true,
  },
  {
    name: "Ashwood Open Bookshelf",
    slug: "ashwood-open-bookshelf",
    brand: "Woodsworth",
    image: "https://picsum.photos/seed/bookshelf/420/520",
    price: 11499,
    wasPrice: 16999,
    rating: 4.4,
    ratingCount: 88,
  },
  {
    name: "Ceramic Vase Trio in Matte Ivory",
    slug: "ceramic-vase-trio",
    brand: "Empower Studio",
    image: "https://picsum.photos/seed/vase-trio/420/520",
    price: 2499,
    wasPrice: 3999,
    rating: 4.2,
    ratingCount: 54,
  },
]

const meta = {
  title: "Furnish/WishlistPage",
  component: WishlistPage,
  tags: ["autodocs"],
  args: {
    initialProducts: sampleProducts,
  },
} satisfies Meta<typeof WishlistPage>

export default meta
type Story = StoryObj<typeof meta>

export const WithItems: Story = {}

export const Empty: Story = {
  args: {
    initialProducts: [],
  },
}