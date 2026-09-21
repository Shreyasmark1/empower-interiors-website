import { z } from "zod";

export const TARGET_TYPES = ["homepage", "category", "product"] as const;
export const PLACEMENTS = ["hero", "banner", "section"] as const;

export const PromotionTargetCreateSchema = z
  .object({
    promotionId: z.coerce.number().int().positive(),
    targetType: z.enum(TARGET_TYPES),
    categoryId: z.coerce.number().int().positive().nullable().optional(),
    productId: z.coerce.number().int().positive().nullable().optional(),
    placement: z.enum(PLACEMENTS),
    sortOrder: z.coerce.number().int().default(0),
  })
  .superRefine((value, ctx) => {
    if (value.targetType === "category" && value.categoryId == null) {
      ctx.addIssue({
        code: "custom",
        message: "categoryId is required when target_type is 'category'",
        path: ["categoryId"],
      });
    }
    if (value.targetType === "product" && value.productId == null) {
      ctx.addIssue({
        code: "custom",
        message: "productId is required when target_type is 'product'",
        path: ["productId"],
      });
    }
  });

export type CreatePromotionTarget = z.infer<
  typeof PromotionTargetCreateSchema
>;

export const PromotionTargetUpdateSchema = z.object({
  id: z.coerce.number().int().positive(),
  promotionId: z.coerce.number().int().positive().optional(),
  targetType: z.enum(TARGET_TYPES).optional(),
  categoryId: z.coerce.number().int().positive().nullable().optional(),
  productId: z.coerce.number().int().positive().nullable().optional(),
  placement: z.enum(PLACEMENTS).optional(),
  sortOrder: z.coerce.number().int().optional(),
});

export type UpdatePromotionTarget = z.infer<
  typeof PromotionTargetUpdateSchema
>;