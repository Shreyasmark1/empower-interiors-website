import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { PromoBanner } from './promo-banner'

const meta = {
  title: 'Furnish/PromoBanner',
  component: PromoBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PromoBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SingleText: Story = {
  args: {
    texts: ['Free shipping on orders over ₹999'],
  },
}

export const Fast: Story = {
  name: 'Fast cycle (3s)',
  args: {
    interval: 3000,
  },
}