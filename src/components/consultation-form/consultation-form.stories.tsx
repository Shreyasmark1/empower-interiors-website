import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ConsultationForm } from "./consultation-form"

const meta = {
  title: "Furnish/ConsultationForm",
  component: ConsultationForm,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof ConsultationForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}