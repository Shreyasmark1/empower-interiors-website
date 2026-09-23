import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ProductTabs } from "./product-tabs"
import { SOFA } from "../product-detail.story-data"

const meta = {
  title: "Furnish/ProductDetail/ProductTabs",
  component: ProductTabs,
  tags: ["autodocs"],
  args: {
    product: SOFA,
  },
} satisfies Meta<typeof ProductTabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}