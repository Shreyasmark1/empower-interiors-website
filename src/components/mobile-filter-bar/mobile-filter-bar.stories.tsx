import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn, screen, userEvent } from 'storybook/test'

import { MobileFilterBar } from './mobile-filter-bar'

const meta = {
  title: 'Furnish/Filter/MobileFilterBar',
  component: MobileFilterBar,
  tags: ['autodocs'],
  argTypes: {
    appliedCount: { control: { type: 'number', min: 0 } },
    currentSort: { control: 'text' },
  },
  args: {
    appliedCount: 0,
    currentSort: 'Relevance',
    onOpenSort: fn(),
    onOpenFilter: fn(),
    onOpenCategories: fn(),
  },
} satisfies Meta<typeof MobileFilterBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithActiveFilters: Story = {
  args: { appliedCount: 3, currentSort: 'Price: Low to High' },
}

export const SingleFilter: Story = {
  args: { appliedCount: 1 },
}

export const Interactions: Story = {
  args: {
    appliedCount: 2,
    currentSort: 'Newest Arrival',
    onOpenSort: fn(),
    onOpenFilter: fn(),
    onOpenCategories: fn(),
  },
  play: async ({ args }) => {
    await userEvent.click(
      await screen.findByRole('button', { name: /Categories/ }),
    )
    await expect(args.onOpenCategories).toHaveBeenCalled()

    await userEvent.click(await screen.findByRole('button', { name: /Newest/ }))
    await expect(args.onOpenSort).toHaveBeenCalled()

    await userEvent.click(
      await screen.findByRole('button', { name: '2 Filters Applied' }),
    )
    await expect(args.onOpenFilter).toHaveBeenCalled()
  },
}