import { mockCatalog } from "@/components/product-listing"
import {
  ProductListingSchema,
  type CatalogProduct,
  type ProductListing,
} from "@/lib/schemas"

const HOME_CRUMB = { label: "Home", href: "/" }

function tokenize(query: string): string[] {
  return query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
}

function productMatchHaystack(product: CatalogProduct): string {
  return [
    product.name,
    product.brand ?? "",
    product.path,
    ...(product.colors ?? []).map((variant) => variant.color),
  ]
    .join(" ")
    .toLowerCase()
}

function matchesAllTokens(product: CatalogProduct, tokens: string[]): boolean {
  const haystack = productMatchHaystack(product)
  return tokens.every((token) => haystack.includes(token))
}

export const searchService = {
  getSearchResults(query: string): ProductListing {
    const tokens = tokenize(query)
    const trimmed = query.trim()

    const products = tokens.length
      ? mockCatalog.filter((product) => matchesAllTokens(product, tokens))
      : []

    return ProductListingSchema.parse({
      breadcrumb: [HOME_CRUMB, { label: "Search", href: "/search" }],
      title: tokens.length > 0 ? `Results for "${trimmed}"` : "Search",
      description:
        tokens.length > 0
          ? `${products.length} ${
              products.length === 1 ? "result" : "results"
            } matching "${trimmed}"`
          : "Type a keyword to find your piece.",
      subcategories: [],
      products,
    })
  },

  getSuggestionProducts(): { label: string; slug: string }[] {
    return mockCatalog.map((product) => ({
      label: product.name,
      slug: product.slug,
    }))
  },
}