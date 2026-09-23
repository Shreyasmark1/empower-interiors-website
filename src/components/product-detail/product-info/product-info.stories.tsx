import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ProductInfo } from "./product-info"
import { DINING, SOFA } from "../product-detail.story-data"

const meta = {
  title: "Furnish/ProductDetail/ProductInfo",
  component: ProductInfo,
  tags: ["autodocs"],
  args: {
    product: SOFA,
    activeVariantId: SOFA.variants[0]?.id,
    onVariantChange: () => {},
  },
} satisfies Meta<typeof ProductInfo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LowStock: Story = {
  args: {
    product: DINING,
  },
}