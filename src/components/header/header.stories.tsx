import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Header } from "./header"

const meta = {
  title: "Furnish/Header",
  component: Header,
  tags: ["autodocs"],
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
