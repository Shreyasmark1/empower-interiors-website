import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Breadcrumb } from "./breadcrumb"

const meta = {
  title: "Furnish/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Seating", href: "/seating" },
      { label: "Sofas", href: "/seating/sofas" },
      { label: "3 Seater Sofas", href: "/seating/sofas/3-seater" },
    ],
  },
}

export const Short: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Dining", href: "/dining" },
    ],
  },
}

export const LongTrail: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Dining", href: "/dining" },
      { label: "Dining Storage", href: "/dining/storage" },
      { label: "Bar Cabinets", href: "/dining/storage/bar-cabinets" },
    ],
  },
}