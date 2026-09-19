import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn, screen, userEvent } from 'storybook/test'

import { DesktopFilterBar } from './desktop-filter-bar'

const meta = {
  title: 'Furnish/Filter/DesktopFilterBar',
  component: DesktopFilterBar,
  tags: ['autodocs'],
  args: {
    sortValue: 'relevance',
    isAssuredOnly: false,
    onOpenFilterCategory: fn(),
    onSortChange: fn(),
    onToggleAssured: fn(),
  },
} satisfies Meta<typeof DesktopFilterBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SortedByPriceHighLow: Story = {
  args: { sortValue: 'price-desc' },
}

export const AssuredOn: Story = {
  args: { isAssuredOnly: true },
}

export const Interactions: Story = {
  args: {
    onOpenFilterCategory: fn(),
    onSortChange: fn(),
    onToggleAssured: fn(),
  },
  play: async ({ args }) => {
    await userEvent.click(await screen.findByRole('button', { name: 'Brand' }))
    await expect(args.onOpenFilterCategory).toHaveBeenCalledWith('brand')

    await userEvent.click(
      await screen.findByRole('switch', { name: 'Assured only' }),
    )
    await expect(args.onToggleAssured).toHaveBeenCalledWith(true)

    await userEvent.click(screen.getByRole('combobox'))
    const option = await screen.findByText('Price: High to Low')
    await userEvent.click(option)
    await expect(args.onSortChange).toHaveBeenCalledWith('price-desc')
  },
}