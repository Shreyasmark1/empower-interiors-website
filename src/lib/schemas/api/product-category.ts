import { z } from "zod";

export const ProductCategorySetSchema = z.object({
  productId: z.coerce.number().int().positive(),
  categoryIds: z.array(z.coerce.number().int().positive()).max(500),
});

export type ProductCategorySet = z.infer<typeof ProductCategorySetSchema>;

export const productCategoryQuerySchema = z.object({
  productId: z.coerce.number().int().positive().optional(),
  categoryId: z.coerce.number().int().positive().optional(),
});