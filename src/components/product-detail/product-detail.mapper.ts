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
} from "@/lib/schemas"

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