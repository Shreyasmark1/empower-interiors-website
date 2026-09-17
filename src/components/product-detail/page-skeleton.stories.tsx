import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { PageSkeleton } from "./page-skeleton"

const meta = {
  title: "Furnish/ProductDetail/PageSkeleton",
  component: PageSkeleton,
  tags: ["autodocs"],
  args: {
    variant: "detail",
  },
} satisfies Meta<typeof PageSkeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Detail: Story = {}

export const Generic: Story = {
  args: {
    variant: "generic",
  },
}