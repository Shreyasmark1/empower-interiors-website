import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { HeaderActions } from "./header-actions"

const meta = {
  title: "Furnish/HeaderActions",
  component: HeaderActions,
  tags: ["autodocs"],
} satisfies Meta<typeof HeaderActions>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithCounts: Story = {
  args: {
    cartCount: 3,
    wishlistCount: 5,
  },
}
