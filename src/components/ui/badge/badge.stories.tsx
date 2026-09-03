import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Badge } from './badge'
import { SparklesIcon } from '@/lib/icons'

const meta = {
  title: 'Furnish/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'category',
        'discount',
        'inStock',
        'soldOut',
        'newArrival',
        'secondary',
        'outline',
      ],
    },
  },
  args: {
    children: 'Badge',
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Category: Story = {
  args: { variant: 'category', children: 'Seating' },
}

export const Discount: Story = {
  args: { variant: 'discount', children: '20% Off' },
}

export const InStock: Story = {
  args: { variant: 'inStock', children: 'In Stock' },
}

export const SoldOut: Story = {
  args: { variant: 'soldOut', children: 'Sold Out' },
}

export const NewArrival: Story = {
  args: { variant: 'newArrival', children: 'New Arrival' },
}

export const WithIcon: Story = {
  name: 'In Stock with icon',
  args: {
    variant: 'inStock',
    children: (
      <>
        <SparklesIcon />
        Verified
      </>
    ),
  },
}

export const VariantGrid: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-4">
      <Badge variant="category">Seating</Badge>
      <Badge variant="discount">20% Off</Badge>
      <Badge variant="inStock">In Stock</Badge>
      <Badge variant="soldOut">Sold Out</Badge>
      <Badge variant="newArrival">New Arrival</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
}