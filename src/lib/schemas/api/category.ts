import { z } from "zod";

export const CategoryCreateSchema = z.object({
  parentId: z.coerce.number().int().positive().nullable().optional(),
  name: z.string().trim().min(1).max(255),
  slug: z.string().trim().min(1).max(255),
  description: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  sortOrder: z.coerce.number().int().default(0),
  isActive: z.boolean().default(true),
});

export type CreateCategory = z.infer<typeof CategoryCreateSchema>;

export const CategoryUpdateSchema = z.object({
  id: z.coerce.number().int().positive(),
  parentId: z.coerce.number().int().positive().nullable().optional(),
  name: z.string().trim().min(1).max(255).optional(),
  slug: z.string().trim().min(1).max(255).optional(),
  description: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  sortOrder: z.coerce.number().int().optional(),
  isActive: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});

export type UpdateCategory = z.infer<typeof CategoryUpdateSchema>;