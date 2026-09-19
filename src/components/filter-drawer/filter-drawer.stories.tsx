import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn, userEvent, within } from 'storybook/test'

import { FilterDrawer } from './filter-drawer'

const meta = {
  title: 'Furnish/Filter/FilterDrawer',
  component: FilterDrawer,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    activeCategory: {
      control: 'select',
      options: [undefined, 'color', 'brand', 'country'],
    },
    selectedFilters: { control: 'object' },
  },
  args: {
    isOpen: true,
    activeCategory: undefined,
    selectedFilters: {},
    onClose: fn(),
    onApply: fn(),
    onClearAll: fn(),
  },
} satisfies Meta<typeof FilterDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Closed: Story = {
  args: { isOpen: false },
}

export const FocusedOnBrand: Story = {
  args: { activeCategory: 'brand' },
}

export const WithSelections: Story = {
  args: {
    selectedFilters: {
      color: ['teal', 'charcoal'],
      brand: ['casacraft'],
    },
  },
}

export const SearchFilters: Story = {
  args: {
    activeCategory: 'brand',
    selectedFilters: {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const search = await canvas.findByPlaceholderText('Search brand')
    await userEvent.type(search, 'wood')
    const row = await canvas.findByText('Woodsworth')
    await expect(row).toBeVisible()
    await expect(canvas.queryByText('Slumberland')).toBeNull()
  },
}

export const ApplySelection: Story = {
  args: {
    activeCategory: 'brand',
    selectedFilters: {},
    onApply: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const checkbox = await canvas.findByRole('checkbox', {
      name: /Casacraft/,
    })
    await userEvent.click(checkbox)

    await userEvent.click(await canvas.findByRole('button', { name: 'Apply' }))
    await expect(args.onApply).toHaveBeenCalledWith({ brand: ['casacraft'] })
  },
}

export const ClearAll: Story = {
  args: {
    selectedFilters: { color: ['teal'], brand: ['casacraft'] },
    onClearAll: fn(),
    onApply: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(
      await canvas.findByRole('button', { name: 'Clear All' }),
    )
    await expect(args.onClearAll).toHaveBeenCalled()

    await userEvent.click(await canvas.findByRole('button', { name: 'Apply' }))
    await expect(args.onApply).toHaveBeenCalledWith({})
  },
}