import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { MobileActionBar } from "./mobile-action-bar"
import { SOFA } from "../product-detail.story-data"

const meta = {
  title: "Furnish/ProductDetail/MobileActionBar",
  component: MobileActionBar,
  tags: ["autodocs"],
  args: {
    product: SOFA,
  },
} satisfies Meta<typeof MobileActionBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}