import type { Metadata } from "next"

import { ProductListingView } from "@/components/product-listing"
import { searchService } from "@/lib/services/search.service"

type PageProps = {
  searchParams: Promise<{ q?: string }>
}

function normalizeQuery(raw?: string): string {
  return raw?.trim() ?? ""
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { q } = await searchParams
  const query = normalizeQuery(q)

  const title = query
    ? `Results for "${query}" | Empower Interiors`
    : "Search | Empower Interiors"
  const description = query
    ? `Shop ${query} at Empower Interiors — search results across sofas, beds, dining, lighting and more.`
    : "Search products, categories, and more at Empower Interiors."

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary", title, description },
  }
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams
  const query = normalizeQuery(q)

  const listing = searchService.getSearchResults(query)

  const isPrompt = query.length === 0
  const hasNoResults = !isPrompt && listing.products.length === 0

  return (
    <ProductListingView
      listing={listing}
      emptyTitle={
        isPrompt
          ? "Search our catalogue"
          : hasNoResults
            ? `No results found for "${query}"`
            : undefined
      }
      emptyDescription={
        isPrompt
          ? "Type a keyword above to find your piece."
          : hasNoResults
            ? `We couldn't find any matches for "${query}". Try a different keyword.`
            : undefined
      }
    />
  )
}