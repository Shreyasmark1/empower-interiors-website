import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Truck } from "lucide-react"

import { BenefitsStrip } from "./benefits-strip"

const meta = {
  title: "Furnish/BenefitsStrip",
  component: BenefitsStrip,
  tags: ["autodocs"],
} satisfies Meta<typeof BenefitsStrip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SingleItem: Story = {
  args: {
    items: [
      {
        title: "Free Delivery",
        description: "White-glove delivery to your door.",
        icon: Truck,
      },
    ],
  },
}