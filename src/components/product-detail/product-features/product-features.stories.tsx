import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ProductFeatures } from "./product-features"
import { SOFA } from "../product-detail.story-data"

const meta = {
  title: "Furnish/ProductDetail/ProductFeatures",
  component: ProductFeatures,
  tags: ["autodocs"],
  args: {
    features: SOFA.features,
  },
} satisfies Meta<typeof ProductFeatures>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}