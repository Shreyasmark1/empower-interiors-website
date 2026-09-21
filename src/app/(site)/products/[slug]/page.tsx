import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProductDetailView } from "@/components/product-detail"
import { productDetailService } from "@/components/product-detail"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const data = await productDetailService.getBySlug(slug)

  if (!data) {
    return { title: "Product not found | Empower Interiors" }
  }

  const title = `${data.product.name} | Empower Interiors`

  return {
    title,
    description: data.product.shortDescription,
    openGraph: {
      title,
      description: data.product.shortDescription,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description: data.product.shortDescription,
    },
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params
  const data = await productDetailService.getBySlug(slug)

  if (!data) {
    notFound()
  }

  return <ProductDetailView product={data.product} related={data.related} />
}