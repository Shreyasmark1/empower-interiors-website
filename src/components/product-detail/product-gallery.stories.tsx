import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ProductGallery } from "./product-gallery"
import { SOFA } from "./product-detail.story-data"

const meta = {
  title: "Furnish/ProductDetail/ProductGallery",
  component: ProductGallery,
  tags: ["autodocs"],
  args: {
    productName: SOFA.name,
    images: SOFA.gallery,
  },
} satisfies Meta<typeof ProductGallery>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithMoreSlides: Story = {
  args: {
    images: [...SOFA.gallery, SOFA.gallery[0]],
  },
}