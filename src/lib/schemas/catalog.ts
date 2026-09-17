import { z } from "zod";

export const CatalogProductVariantSchema = z.object({
  color: z.string().min(1),
  swatch: z.string().min(1),
});

export type CatalogProductVariant = z.infer<
  typeof CatalogProductVariantSchema
>;

export const CatalogProductBaseSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  brand: z.string().optional(),
  image: z.string().min(1),
  price: z.number().positive(),
  wasPrice: z.number().positive().optional(),
  discountPercent: z.number().int().min(0).max(100).optional(),
  rating: z.number().min(0).max(5).optional(),
  ratingCount: z.number().int().nonnegative().optional(),
  assured: z.boolean().optional(),
  warrantyLabel: z.string().optional(),
  emiStarting: z.string().optional(),
  colors: z.array(CatalogProductVariantSchema).optional(),
  path: z.string().min(1),
});

export type CreateCatalogProduct = z.infer<typeof CatalogProductBaseSchema>;

export const CatalogProductSchema = CatalogProductBaseSchema.extend({
  id: z.string().min(1),
});

export type CatalogProduct = z.infer<typeof CatalogProductSchema>;

export const ListingLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  imageUrl: z.string().optional(),
});

export type ListingLink = z.infer<typeof ListingLinkSchema>;

export const BreadcrumbItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export type BreadcrumbItem = z.infer<typeof BreadcrumbItemSchema>;

export const ProductListingSchema = z.object({
  breadcrumb: z.array(BreadcrumbItemSchema),
  title: z.string().min(1),
  description: z.string().optional(),
  subcategories: z.array(ListingLinkSchema),
  products: z.array(CatalogProductSchema),
});

export type ProductListing = z.infer<typeof ProductListingSchema>;