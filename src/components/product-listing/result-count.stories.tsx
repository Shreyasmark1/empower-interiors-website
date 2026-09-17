import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ResultCount } from "./result-count"

const meta = {
  title: "Furnish/ResultCount",
  component: ResultCount,
  tags: ["autodocs"],
  args: {
    start: 1,
    end: 40,
    total: 650,
    title: "3 Seater Sofas",
  },
} satisfies Meta<typeof ResultCount>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SinglePage: Story = {
  args: { start: 1, end: 12, total: 12, title: "Accent Chairs" },
}

export const SingleResult: Story = {
  args: { start: 1, end: 1, total: 1, title: "Ceramic Vase" },
}

export const LastPage: Story = {
  args: { start: 641, end: 650, total: 650, title: "3 Seater Sofas" },
}