import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ToastDemo } from '@/components/toast-demo'
import { Toaster } from './sonner'

const meta = {
  title: 'Furnish/Toast',
  component: ToastDemo,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
} satisfies Meta<typeof ToastDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {}

export const TriggerSuccess: Story = {
  name: 'Trigger a success toast',
  render: () => <ToastDemo />,
}