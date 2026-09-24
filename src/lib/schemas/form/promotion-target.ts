import { z } from "zod";

import {
  PLACEMENTS,
  TARGET_TYPES,
} from "@/lib/schemas/api/promotion-target";

import { selectId, selectIdOrNull, sortOrderField } from "./common";

export const PromotionTargetFormSchema = z
  .object({
    promotionId: selectId("Select a promotion"),
    targetType: z.enum(TARGET_TYPES),
    categoryId: selectIdOrNull(),
    productId: selectIdOrNull(),
    placement: z.enum(PLACEMENTS),
    sortOrder: sortOrderField(),
  })
  .superRefine((values, ctx) => {
    if (values.targetType === "category" && values.categoryId === null) {
      ctx.addIssue({
        code: "custom",
        path: ["categoryId"],
        message: "Select a category",
      });
    }
    if (values.targetType === "product" && values.productId === null) {
      ctx.addIssue({
        code: "custom",
        path: ["productId"],
        message: "Select a product",
      });
    }
  });

export type PromotionTargetFormInput = z.input<
  typeof PromotionTargetFormSchema
>;
export type PromotionTargetFormOutput = z.output<
  typeof PromotionTargetFormSchema
>;