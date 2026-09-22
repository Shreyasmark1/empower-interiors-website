import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ProductListingView } from "./product-listing"
import { mockCatalog } from "./product-listing.mock"

const meta = {
  title: "Furnish/ProductListing",
  component: ProductListingView,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ProductListingView>

export default meta
type Story = StoryObj<typeof meta>

const threeSeaterProducts = mockCatalog
  .filter((product) => product.path === "/seating/sofas/3-seater")
  .slice(0, 12)

export const LeafCategory: Story = {
  args: {
    listing: {
      breadcrumb: [
        { label: "Home", href: "/" },
        { label: "Seating", href: "/seating" },
        { label: "Sofas", href: "/seating/sofas" },
        { label: "3 Seater Sofas", href: "/seating/sofas/3-seater" },
      ],
      title: "3 Seater Sofas",
      description:
        "Spacious three-seater sofas built for family time — firm support, stain-resistant fabrics and a choice of leg finishes.",
      subcategories: [],
      products: threeSeaterProducts,
    },
  },
}

export const WithSubcategories: Story = {
  args: {
    listing: {
      breadcrumb: [
        { label: "Home", href: "/" },
        { label: "Seating", href: "/seating" },
        { label: "Sofas", href: "/seating/sofas" },
      ],
      title: "Sofas",
      description:
        "Sofas in every shape and size — from compact two-seaters to sprawling L-shaped loungers, in fabrics that survive daily life.",
      subcategories: [
        { label: "3-Seater Sofas", href: "/seating/sofas/3-seater" },
        { label: "2-Seater Sofas", href: "/seating/sofas/2-seater" },
        { label: "L-Shaped Sofas", href: "/seating/sofas/l-shaped" },
        { label: "Recliners", href: "/seating/sofas/recliners" },
      ],
      products: threeSeaterProducts.slice(0, 6),
    },
  },
}

export const Paginated: Story = {
  args: {
    listing: {
      breadcrumb: [
        { label: "Home", href: "/" },
        { label: "Seating", href: "/seating" },
        { label: "3 Seater Sofas", href: "/seating/sofas/3-seater" },
      ],
      title: "3 Seater Sofas",
      description:
        "Spacious three-seater sofas built for family time — firm support, stain-resistant fabrics and a choice of leg finishes.",
      subcategories: [],
      products: threeSeaterProducts,
    },
  },
}

export const Empty: Story = {
  args: {
    listing: {
      breadcrumb: [
        { label: "Home", href: "/" },
        { label: "Decor", href: "/decor" },
        { label: "Clocks", href: "/decor/wall/clocks" },
      ],
      title: "Wall Clocks",
      subcategories: [],
      products: [],
    },
  },
}

export const SearchEmptyResults: Story = {
  args: {
    listing: {
      breadcrumb: [
        { label: "Home", href: "/" },
        { label: "Search", href: "/search" },
      ],
      title: 'Results for "xyz"',
      description: '0 results matching "xyz"',
      subcategories: [],
      products: [],
    },
    emptyTitle: 'No results found for "xyz"',
    emptyDescription:
      'We couldn\'t find any matches for "xyz". Try a different keyword.',
  },
}