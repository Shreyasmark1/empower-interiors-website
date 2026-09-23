import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Logo } from "./logo"

const meta = {
  title: "Furnish/Logo",
  component: Logo,
  tags: ["autodocs"],
} satisfies Meta<typeof Logo>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: "text-2xl",
  },
}

export const Large: Story = {
  args: {
    className: "text-5xl",
  },
}
