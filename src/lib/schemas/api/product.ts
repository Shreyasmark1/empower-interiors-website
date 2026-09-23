import { z } from "zod";

export const ProductCreateSchema = z.object({
  name: z.string().trim().min(1).max(500),
  slug: z.string().trim().min(1).max(500),
  description: z.string().nullable().optional(),
  thumbnail: z.string().nullable().optional(),
  minPrice: z.number().positive().nullable().optional(),
  brandName: z.string().trim().max(255).nullable().optional(),
  mrpPrice: z.number().positive().nullable().optional(),
  shortDescription: z.string().nullable().optional(),
  badges: z.array(z.string()).default([]),
  specifications: z.record(z.string(), z.unknown()).default({}),
  isActive: z.boolean().default(true),
});

export type CreateProduct = z.infer<typeof ProductCreateSchema>;

export const ProductUpdateSchema = z.object({
  id: z.coerce.number().int().positive(),
  name: z.string().trim().min(1).max(500).optional(),
  slug: z.string().trim().min(1).max(500).optional(),
  description: z.string().nullable().optional(),
  thumbnail: z.string().nullable().optional(),
  minPrice: z.number().positive().nullable().optional(),
  brandName: z.string().trim().max(255).nullable().optional(),
  mrpPrice: z.number().positive().nullable().optional(),
  shortDescription: z.string().nullable().optional(),
  badges: z.array(z.string()).optional(),
  specifications: z.record(z.string(), z.unknown()).optional(),
  isActive: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});

export type UpdateProduct = z.infer<typeof ProductUpdateSchema>;