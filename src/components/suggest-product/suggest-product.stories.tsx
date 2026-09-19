import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { SuggestProduct } from "./suggest-product"

const meta = {
  title: "Furnish/SuggestProduct",
  component: SuggestProduct,
  tags: ["autodocs"],
} satisfies Meta<typeof SuggestProduct>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}