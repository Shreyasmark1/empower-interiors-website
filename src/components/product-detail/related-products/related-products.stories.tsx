import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { RelatedProducts } from "./related-products"
import { SOFA, SOFA_RELATED } from "../product-detail.story-data"

const meta = {
  title: "Furnish/ProductDetail/RelatedProducts",
  component: RelatedProducts,
  tags: ["autodocs"],
  args: {
    product: SOFA,
    related: SOFA_RELATED,
  },
} satisfies Meta<typeof RelatedProducts>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SingleItem: Story = {
  args: {
    related: SOFA_RELATED.slice(0, 1),
  },
}

export const EmptyRendersNothing: Story = {
  args: {
    related: [],
  },
}