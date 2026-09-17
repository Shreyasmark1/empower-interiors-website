import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ListingHeader } from "./listing-header"

const meta = {
  title: "Furnish/ListingHeader",
  component: ListingHeader,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ListingHeader>

export default meta
type Story = StoryObj<typeof meta>

export const WithDescription: Story = {
  args: {
    title: "3-Seater Sofas",
    description:
      "Spacious three-seater sofas built for family time — firm support, stain-resistant fabrics and a choice of leg finishes.",
  },
}

export const TitleOnly: Story = {
  args: {
    title: "Seating",
  },
}