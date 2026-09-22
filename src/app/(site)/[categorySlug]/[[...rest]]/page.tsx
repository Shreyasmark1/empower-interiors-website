import type { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  CategoryView,
  categoryPageService,
} from "@/components/category-page"
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
  const segments = rest ?? []

  if (segments.length === 0) {
    const category = await categoryPageService.getCategory(categorySlug)

    if (!category) {
      return { title: "Category not found | Empower Interiors" }
    }

    const title = `${category.title} | Empower Interiors`
    const description =
      category.description ??
      `Explore ${category.title} at Empower Interiors.`

    return {
      title,
      description,
      openGraph: { title, description, type: "website" },
      twitter: { card: "summary", title, description },
    }
  }

  const listing = await productListingService.getListing(
    categorySlug,
    segments,
  )

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
  const segments = rest ?? []

  // Top-level category — landing page with its collections
  if (segments.length === 0) {
    const category = await categoryPageService.getCategory(categorySlug)

    if (!category) {
      notFound()
    }

    return <CategoryView category={category} />
  }

  // Group / item paths — product listing as before
  const listing = await productListingService.getListing(
    categorySlug,
    segments,
  )

  if (!listing) {
    notFound()
  }

  return <ProductListingView listing={listing} />
}
