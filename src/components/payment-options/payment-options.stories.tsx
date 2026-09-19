import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { PaymentOptions } from "./payment-options"

const meta = {
  title: "Furnish/PaymentOptions",
  component: PaymentOptions,
  tags: ["autodocs"],
} satisfies Meta<typeof PaymentOptions>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomOptions: Story = {
  args: {
    options: ["UPI", "Credit Card", "EMI"],
  },
}