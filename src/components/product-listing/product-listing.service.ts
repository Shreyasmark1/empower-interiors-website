import { navigationService } from "@/lib/services/navigation.service"
import { ProductListingSchema, type ProductListing } from "@/lib/schemas"

import { mockCatalog } from "./product-listing.mock"

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function collectProducts(path: string) {
  return mockCatalog.filter(
    (product) => product.path === path || product.path.startsWith(`${path}/`),
  )
}

const HOME_CRUMB = { label: "Home", href: "/" }

export const productListingService = {
  async getListing(
    categorySlug: string,
    rest: string[] = [],
  ): Promise<ProductListing | null> {
    const categories = await navigationService.getNavigation()
    const category = categories.find((c) => c.slug === categorySlug)
    if (!category) return null

    const segments = rest.filter(Boolean)
    const basePath = `/${category.slug}`
    const categoryCrumb = { label: category.name, href: basePath }

    if (segments.length === 0) {
      return ProductListingSchema.parse({
        breadcrumb: [HOME_CRUMB, categoryCrumb],
        title: category.name,
        description: category.description,
        subcategories: category.groups.map((group) => ({
          label: group.title,
          href: group.href ?? `${basePath}/${slugify(group.title)}`,
          imageUrl: group.imageUrl,
        })),
        products: collectProducts(basePath),
      })
    }

    const requestedPath = `${basePath}/${segments.join("/")}`

    const group = category.groups.find((g) => g.href === requestedPath)
    if (group) {
      return ProductListingSchema.parse({
        breadcrumb: [HOME_CRUMB, categoryCrumb, { label: group.title, href: requestedPath }],
        title: group.title,
        description: group.description ?? category.description,
        subcategories: group.items.map((item) => ({
          label: item.label,
          href: item.href,
        })),
        products: collectProducts(requestedPath),
      })
    }

    const item = category.groups
      .flatMap((g) => g.items)
      .find((i) => i.href === requestedPath)

    if (item) {
      const parentGroup = category.groups.find((g) =>
        g.items.some((i) => i.id === item.id),
      )

      const breadcrumb = [HOME_CRUMB, categoryCrumb]
      if (parentGroup) {
        breadcrumb.push({
          label: parentGroup.title,
          href: parentGroup.href ?? `${basePath}/${slugify(parentGroup.title)}`,
        })
      }
      breadcrumb.push({ label: item.label, href: requestedPath })

      return ProductListingSchema.parse({
        breadcrumb,
        title: item.label,
        description: item.description ?? parentGroup?.description ?? category.description,
        subcategories: [],
        products: collectProducts(requestedPath),
      })
    }

    return null
  },
}