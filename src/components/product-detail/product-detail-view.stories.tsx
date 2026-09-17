import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ProductDetailView } from "./product-detail-view"
import { DINING, SOFA, SOFA_RELATED } from "./product-detail.story-data"

const meta = {
  title: "Furnish/ProductDetail/ProductDetailView",
  component: ProductDetailView,
  tags: ["autodocs"],
  args: {
    product: SOFA,
    related: SOFA_RELATED,
  },
} satisfies Meta<typeof ProductDetailView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const DiningRoomProduct: Story = {
  args: {
    product: DINING,
    related: [],
  },
}