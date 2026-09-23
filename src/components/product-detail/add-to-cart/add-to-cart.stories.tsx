import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"

import { cartService } from "@/lib/services/cart.service"

import { AddToCart } from "./add-to-cart"

const sampleProduct = {
  name: "Lem Velvet 3 Seater Sofa in Teal Blue Colour",
  image: "",
  price: 89900,
  wasPrice: 114900,
}

function SeedCart({
  quantity,
  children,
}: {
  quantity: number
  children: React.ReactNode
}) {
  React.useEffect(() => {
    cartService.addToCart(sampleProduct)
    cartService.setCartQuantity(sampleProduct.name, quantity)
  }, [quantity])

  return <>{children}</>
}

const meta = {
  title: "Furnish/ProductDetail/AddToCart",
  component: AddToCart,
  parameters: {
    layout: "padded",
  },
  args: {
    product: sampleProduct,
  },
} satisfies Meta<typeof AddToCart>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const InCart: Story = {
  render: () => (
    <SeedCart quantity={2}>
      <AddToCart product={sampleProduct} />
    </SeedCart>
  ),
}

export const NarrowRail: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
}