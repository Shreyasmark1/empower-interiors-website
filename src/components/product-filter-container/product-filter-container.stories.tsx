import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, screen, userEvent } from 'storybook/test'

import { ProductFilterContainer } from './product-filter-container'

const meta = {
  title: 'Furnish/Filter/ProductFilterContainer',
  component: ProductFilterContainer,
  tags: ['autodocs'],
  argTypes: {
    initialFilters: { control: 'object' },
    initialSort: {
      control: 'select',
      options: ['relevance', 'price-asc', 'price-desc', 'newest'],
    },
    initialAssuredOnly: { control: 'boolean' },
  },
  args: {
    initialFilters: {},
    initialSort: 'relevance',
    initialAssuredOnly: false,
  },
} satisfies Meta<typeof ProductFilterContainer>

export default meta
type Story = StoryObj<typeof meta>

export const Mobile375: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile375' },
  },
}

export const Tablet768: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'tablet768' },
  },
}

export const Desktop1440: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop1440' },
  },
}

export const DesktopWithFilters: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop1440' },
  },
  args: {
    initialFilters: { color: ['teal', 'charcoal'], brand: ['casacraft'] },
    initialSort: 'price-desc',
    initialAssuredOnly: true,
  },
}

export const MobileApplyFilterFlow: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile375' },
  },
  play: async () => {
    const filterCell = await screen.findByRole('button', {
      name: '0 Filters Applied',
    })
    await userEvent.click(filterCell)

    const checkbox = await screen.findByRole('checkbox', {
      name: /Casacraft/,
    })
    await userEvent.click(checkbox)
    await userEvent.click(await screen.findByRole('button', { name: 'Apply' }))

    await expect(
      await screen.findByRole('button', { name: '1 Filters Applied' }),
    ).toBeVisible()
  },
}

export const MobileSortFlow: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile375' },
  },
  play: async () => {
    await userEvent.click(
      await screen.findByRole('button', { name: /Relevance/ }),
    )
    await userEvent.click(await screen.findByText('Price: High to Low'))

    await expect(
      await screen.findByRole('button', { name: 'Price: High to Low' }),
    ).toBeVisible()
  },
}

export const DesktopFocusBrandFlow: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop1440' },
  },
  play: async () => {
    await userEvent.click(await screen.findByRole('button', { name: 'Brand' }))

    const checkbox = await screen.findByRole('checkbox', {
      name: /Woodsworth/,
    })
    await userEvent.click(checkbox)
    await userEvent.click(await screen.findByRole('button', { name: 'Apply' }))

    const trigger = await screen.findByRole('combobox', { name: 'Sort by' })
    await userEvent.click(trigger)
    await userEvent.click(await screen.findByText('Price: Low to High'))
    await expect(trigger).toHaveTextContent('Price: Low to High')
  },
}