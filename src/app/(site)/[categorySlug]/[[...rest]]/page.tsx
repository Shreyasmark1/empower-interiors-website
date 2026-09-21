import type { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  ProductListingView,
  productListingService,
} from "@/components/product-listing"

type PageProps = {
  params: Promise<{ categorySlug: string; rest?: string[] }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { categorySlug, rest } = await params
  const listing = await productListingService.getListing(categorySlug, rest)

  if (!listing) {
    return { title: "Category not found | Empower Interiors" }
  }

  const title = `${listing.title} | Empower Interiors`
  const description = `Shop ${listing.title} at Empower Interiors — ${listing.products.length} options with free delivery and expert installation.`

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary", title, description },
  }
}

export default async function CategoryListingPage({ params }: PageProps) {
  const { categorySlug, rest } = await params
  const listing = await productListingService.getListing(categorySlug, rest)

  if (!listing) {
    notFound()
  }

  return <ProductListingView listing={listing} />
}