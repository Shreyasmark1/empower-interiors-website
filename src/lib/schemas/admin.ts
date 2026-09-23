import { z } from "zod";

import { CategorySchema } from "./category";

export const ProductRowSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  thumbnail: z.string().nullable(),
  minPrice: z.number().nullable(),
  specifications: z.record(z.string(), z.unknown()),
  isActive: z.boolean(),
  isDeleted: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type ProductRow = z.infer<typeof ProductRowSchema>;

export const VariantRowSchema = z.object({
  id: z.number(),
  productId: z.number(),
  name: z.string(),
  images: z.array(z.string()),
  price: z.number(),
  sortOrder: z.number(),
  isActive: z.boolean(),
  isDeleted: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type VariantRow = z.infer<typeof VariantRowSchema>;

export const ProductDetailRowSchema = ProductRowSchema.extend({
  variants: z.array(VariantRowSchema),
  categories: z.array(CategorySchema),
});

export type ProductDetailRow = z.infer<typeof ProductDetailRowSchema>;