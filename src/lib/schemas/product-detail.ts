import { z } from "zod"

export const GalleryImageSchema = z.object({
  id: z.string().min(1),
  gradient: z.string().min(1),
  imageSrc: z.string().min(1).optional(),
  label: z.string().min(1),
})

export type GalleryImage = z.infer<typeof GalleryImageSchema>

export const AvailabilitySchema = z.enum(["inStock", "lowStock"])
export type Availability = z.infer<typeof AvailabilitySchema>

export const AvailabilityToneSchema = z.enum(["green", "amber"])
export type AvailabilityTone = z.infer<typeof AvailabilityToneSchema>

export const SpecificationsSchema = z.array(
  z.object({
    label: z.string().min(1),
    value: z.string().min(1),
  })
)

export const DimensionsSchema = z.object({
  width: z.string().min(1),
  depth: z.string().min(1),
  height: z.string().min(1),
  weight: z.string().min(1),
})

export type Dimensions = z.infer<typeof DimensionsSchema>

export const ProductFeatureItemBaseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  iconKey: z.enum(["sparkles", "award", "shieldCheck", "palette"]),
})

export type ProductFeatureItemBase = z.infer<typeof ProductFeatureItemBaseSchema>

export type ProductFeatureItem = ProductFeatureItemBase

export const ProductVariantSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  swatch: z.string().min(1),
  images: z.array(z.string().min(1)).default([]),
  price: z.number().positive().optional(),
})

export type ProductVariant = z.infer<typeof ProductVariantSchema>

export const ProductBadgeSchema = z.enum(["new", "bestseller"])
export type ProductBadge = z.infer<typeof ProductBadgeSchema>

export const ProductDetailDisplayBaseSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  shortDescription: z.string().min(1),
  brand: z.string().optional(),
  category: z.string().min(1),
  roomType: z.string().min(1),
  descriptionParagraphs: z.array(z.string().min(1)),
  price: z.number().positive(),
  wasPrice: z.number().positive().optional(),
  priceDisplay: z.string().min(1),
  emiText: z.string().min(1),
  availability: AvailabilitySchema,
  availabilityTone: AvailabilityToneSchema,
  availabilityLabel: z.string().min(1),
  shippingInfo: z.string().min(1),
  warrantyLabel: z.string().optional(),
  gallery: z.array(GalleryImageSchema).min(1),
  variants: z.array(ProductVariantSchema).default([]),
  badges: z.array(ProductBadgeSchema).default([]),
  categoryPath: z.array(z.string().min(1)).optional(),
  taxesText: z.string().optional(),
  has360: z.boolean().default(false),
  has3d: z.boolean().default(false),
  frames: z.array(z.string().min(1)).default([]),
  modelUrl: z.string().optional(),
  specifications: SpecificationsSchema,
  dimensions: DimensionsSchema.optional(),
  materials: z.array(z.string().min(1)),
  careInstructions: z.array(z.string().min(1)),
  deliveryInfo: z.array(z.string().min(1)),
  installationInfo: z.array(z.string().min(1)),
})

export type ProductDetailDisplayBase = z.infer<
  typeof ProductDetailDisplayBaseSchema
>

export type ProductDetailInfo = ProductDetailDisplayBase & {
  features: ProductFeatureItem[]
}

export const RelatedProductRawSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  brand: z.string().optional(),
  category: z.string().min(1),
  roomType: z.string().min(1),
  categoryPath: z.array(z.string().min(1)).optional(),
  price: z.number().positive(),
  wasPrice: z.number().positive().optional(),
  priceDisplay: z.string().min(1),
  imagePreview: z.string().optional(),
})

export type RelatedProductRaw = z.infer<typeof RelatedProductRawSchema>

export const ProductDetailRawSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  shortDescription: z.string().min(1),
  description: z.string().min(1),
  brand: z.string().optional(),
  category: z.string().min(1),
  roomType: z.string().min(1),
  price: z.number().positive(),
  wasPrice: z.number().positive().optional(),
  priceDisplay: z.string().min(1),
  emiText: z.string().min(1),
  availability: AvailabilitySchema,
  shippingInfo: z.string().min(1),
  warrantyLabel: z.string().optional(),
  imageMain: z.string().min(1).optional(),
  imageSide: z.string().min(1).optional(),
  imageDetail: z.string().min(1).optional(),
  imageLifestyle: z.string().min(1).optional(),
  variants: z.array(ProductVariantSchema).default([]),
  badges: z.array(ProductBadgeSchema).default([]),
  categoryPath: z.array(z.string().min(1)).optional(),
  taxesText: z.string().optional(),
  has360: z.boolean().default(false),
  has3d: z.boolean().default(false),
  frames: z.array(z.string().min(1)).default([]),
  modelUrl: z.string().optional(),
  specifications: z.record(z.string(), z.string()),
  dimensions: DimensionsSchema.optional(),
  materials: z.string().min(1),
  careInstructions: z.string().min(1),
  deliveryInfo: z.string().min(1),
  installationInfo: z.string().min(1),
  relatedProducts: z.array(RelatedProductRawSchema).default([]),
})

export type ProductDetailRaw = z.infer<typeof ProductDetailRawSchema>