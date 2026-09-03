import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn, userEvent, within } from 'storybook/test'

import type { Product } from '@/lib/schemas'
import { ProductCard } from './product-card'

const product: Product = {
  id: 'p1',
  name: 'Arcadia Lounge Chair',
  category: 'Seating',
  price: 18499,
  wasPrice: 22999,
  status: 'inStock',
}

const meta = {
  title: 'Demos/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  args: {
    product,
  },
} satisfies Meta<typeof ProductCard>

export default meta
type Story = StoryObj<typeof meta>

export const InStock: Story = {
  render: () => (
    <div className="w-[280px]">
      <ProductCard product={product} />
    </div>
  ),
}

export const NewArrival: Story = {
  render: () => (
    <div className="w-[280px]">
      <ProductCard
        product={{ ...product, id: 'p2', name: 'Bora Oak Dining Table', wasPrice: undefined, status: 'newArrival' }}
      />
    </div>
  ),
}

export const SoldOut: Story = {
  render: () => (
    <div className="w-[280px]">
      <ProductCard
        product={{ ...product, id: 'p3', name: 'Mira Velvet Sofa', wasPrice: undefined, status: 'soldOut' }}
      />
    </div>
  ),
}

const onAddSpy = fn()

export const AddToCart: Story = {
  render: () => (
    <div className="w-[280px]">
      <ProductCard product={product} onAdd={onAddSpy} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Add to Cart' }))
    await expect(onAddSpy).toHaveBeenCalledWith(product)
  },
}

export const ProductGrid: Story = {
  name: 'Responsive grid (1/2/3/4 cols)',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div
      style={{ width: '100%', minHeight: '100vh', padding: '24px' }}
      className="bg-(--bg-page)"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ProductCard product={product} />
        <ProductCard
          product={{ ...product, id: 'p4', name: 'Lumen Floor Lamp', price: 7499, status: 'inStock' }}
        />
        <ProductCard
          product={{ ...product, id: 'p5', name: 'Nova Sideboard', price: 28999, status: 'newArrival' }}
        />
        <ProductCard
          product={{ ...product, id: 'p6', name: 'Halo Pendant Light', price: 9999, wasPrice: undefined, status: 'soldOut' }}
        />
      </div>
    </div>
  ),
}