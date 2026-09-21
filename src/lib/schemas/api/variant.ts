import { z } from "zod";

export const VariantCreateSchema = z.object({
  productId: z.coerce.number().int().positive(),
  name: z.string().trim().min(1).max(255),
  images: z.array(z.string()).default([]),
  price: z.number().positive(),
  sortOrder: z.coerce.number().int().default(0),
  isActive: z.boolean().default(true),
});

export type CreateVariant = z.infer<typeof VariantCreateSchema>;

export const VariantUpdateSchema = z.object({
  id: z.coerce.number().int().positive(),
  productId: z.coerce.number().int().positive().optional(),
  name: z.string().trim().min(1).max(255).optional(),
  images: z.array(z.string()).optional(),
  price: z.number().positive().optional(),
  sortOrder: z.coerce.number().int().optional(),
  isActive: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});

export type UpdateVariant = z.infer<typeof VariantUpdateSchema>;