import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Button } from './button'
import { CartIcon } from '@/lib/icons'

const meta = {
  title: 'Furnish/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'accent', 'ghost', 'destructive'],
    },
    size: { control: 'select', options: ['default', 'icon'] },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { variant: 'default', children: 'Add to Cart' },
}

export const AccentCta: Story = {
  args: { variant: 'accent', children: 'Shop Now' },
}

export const Outline: Story = {
  args: { variant: 'outline', children: 'View Product' },
}

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Dismiss' },
}

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Remove' },
}

export const WithIcon: Story = {
  args: {
    variant: 'accent',
    children: (
      <>
        <CartIcon />
        Add to Cart
      </>
    ),
  },
}

export const IconOnly: Story = {
  name: 'Icon Only (nav)',
  args: {
    variant: 'ghost',
    size: 'icon',
    'aria-label': 'Open cart',
    children: <CartIcon />,
  },
}

export const Loading: Story = {
  args: {
    variant: 'default',
    disabled: true,
    children: 'Processing…',
  },
}

export const Disabled: Story = {
  args: { variant: 'accent', disabled: true, children: 'Sold Out' },
}

export const VariantGrid: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-4">
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="accent">Accent CTA</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
}