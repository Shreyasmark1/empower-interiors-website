import {
  AVAILABILITY_META,
  GALLERY_GRADIENTS,
  GALLERY_LABELS,
  SHARED_FEATURES,
} from "./product-detail.constants"
import type {
  GalleryImage,
  ProductDetailInfo,
  ProductDetailRaw,
  RelatedProductRaw,
  CatalogProduct,
} from "@/lib/schemas"

const ROOM_BY_PATH_SEGMENT: Record<string, string> = {
  seating: "Living Room",
  dining: "Dining Room",
  lighting: "Living Room",
  storage: "Bedroom",
  decor: "Home Decor",
  bedding: "Bedroom",
}

function titleCase(value: string): string {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

export function fromCatalogProduct(product: CatalogProduct): ProductDetailRaw {
  const segments = product.path.split("/").filter(Boolean)
  const category = segments[0] ? titleCase(segments[0]) : "Collection"
  const roomType = ROOM_BY_PATH_SEGMENT[segments[0]] ?? category
  const categoryPath = segments.map(titleCase)
  const priceDisplay = `₹${product.price.toLocaleString("en-IN")}`
  const emiText = product.emiStarting
    ? `EMI starting from ${product.emiStarting}`
    : `EMI starting from ₹${Math.round(product.price / 24).toLocaleString("en-IN")}/month`

  return {
    slug: product.slug,
    name: product.name,
    shortDescription: `${product.name} — a ${category.toLowerCase()} classic from Empower Interiors, priced for everyday living.`,
    description: `${product.name} brings effortless style to your ${roomType.toLowerCase()}.\n\nCrafted with a durable, easy-to-maintain finish, it pairs clean lines with everyday comfort. Order online and we will deliver it fully assembled, ready to place.`,
    brand: product.brand,
    category,
    roomType,
    price: product.price,
    wasPrice: product.wasPrice,
    priceDisplay,
    emiText,
    availability: "inStock",
    shippingInfo: "Ships in 4-6 days",
    warrantyLabel: product.warrantyLabel,
    imageMain: product.image,
    imageSide: product.image,
    imageDetail: product.image,
    imageLifestyle: product.image,
    variants: (product.colors ?? []).map((variant, index) => ({
      id: `${product.slug}-${index}`,
      name: variant.color,
      swatch: variant.swatch,
      images: [],
    })),
    badges: [],
    categoryPath,
    taxesText: "Inclusive of all taxes",
    has360: false,
    has3d: false,
    frames: [],
    modelUrl: undefined,
    specifications: {
      Brand: product.brand ?? "Empower Studio",
      Warranty: product.warrantyLabel ?? "12-Month Warranty Available",
      Assembly: "Free doorstep installation",
      Delivery: "Ships fully assembled",
    },
    materials: `${category} piece in a hard-wearing, easy-to-clean finish\nStable, kiln-dried frame built for daily use`,
    careInstructions:
      "Wipe with a clean, dry cloth\nBlot spills immediately with a soft cloth\nAvoid direct sunlight to prevent fading",
    deliveryInfo:
      "Free delivery across Mangalore, Bangalore and all metro cities\nShips fully assembled in custom packaging",
    installationInfo:
      "Two-person installation team arrives within your chosen window\nPackaging removed and recycled on site",
    relatedProducts: [],
  }
}

function splitBullets(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
}

function toGallery(raw: ProductDetailRaw): GalleryImage[] {
  const slots = ["imageMain", "imageSide", "imageDetail", "imageLifestyle"] as const

  return slots.map((slot, i) => ({
    id: slot,
    gradient: GALLERY_GRADIENTS[i],
    imageSrc: raw[slot],
    label: GALLERY_LABELS[i],
  }))
}

export function toProductDetail(raw: ProductDetailRaw): ProductDetailInfo {
  return {
    slug: raw.slug,
    name: raw.name,
    shortDescription: raw.shortDescription,
    brand: raw.brand,
    category: raw.category,
    roomType: raw.roomType,
    descriptionParagraphs: raw.description.split(/\n\s*\n/),
    price: raw.price,
    wasPrice: raw.wasPrice,
    priceDisplay: raw.priceDisplay,
    emiText: raw.emiText,
    availability: raw.availability,
    availabilityTone: AVAILABILITY_META[raw.availability].tone,
    availabilityLabel: AVAILABILITY_META[raw.availability].label,
    shippingInfo: raw.shippingInfo,
    warrantyLabel: raw.warrantyLabel,
    gallery: toGallery(raw),
    variants: raw.variants.map((variant) => ({
      id: variant.id,
      name: variant.name,
      swatch: variant.swatch,
      images: variant.images,
      ...(variant.price != null ? { price: variant.price } : {}),
    })),
    badges: raw.badges,
    categoryPath: raw.categoryPath?.length ? raw.categoryPath : [raw.category, raw.roomType],
    taxesText: raw.taxesText,
    has360: raw.has360,
    has3d: raw.has3d,
    frames: raw.frames,
    modelUrl: raw.modelUrl,
    breadcrumb: [
      { label: "Home", href: "/" },
      ...(raw.categoryPath?.length ? raw.categoryPath : [raw.category, raw.roomType]).map(
        (label) => ({
          label,
          href: `/products?room=${encodeURIComponent(label)}`,
        })
      ),
      { label: raw.name, href: `/products/${raw.slug}` },
    ],
    specifications: Object.entries(raw.specifications).map(([label, value]) => ({
      label,
      value,
    })),
    dimensions: raw.dimensions,
    materials: splitBullets(raw.materials),
    careInstructions: splitBullets(raw.careInstructions),
    deliveryInfo: splitBullets(raw.deliveryInfo),
    installationInfo: splitBullets(raw.installationInfo),
    features: SHARED_FEATURES.map((feature) => ({
      title: feature.title,
      description: feature.description,
      iconKey: feature.iconKey,
    })),
  }
}

export function toRelatedProductCard(raw: RelatedProductRaw) {
  const discount = raw.wasPrice ? Math.round((1 - raw.price / raw.wasPrice) * 100) : 0

  return {
    slug: raw.slug,
    name: raw.name,
    brand: raw.brand ? `By ${raw.brand}` : undefined,
    category: raw.category,
    categoryPath: raw.categoryPath?.length
      ? raw.categoryPath
      : [raw.category, raw.roomType],
    price: raw.price,
    wasPrice: raw.wasPrice,
    discountPercent: discount > 0 ? discount : undefined,
    image: raw.imagePreview,
  }
}