import { z } from "zod";

import {
  datetimeLocalOrNull,
  requiredText,
  sortOrderField,
  trimmedNullable,
} from "./common";

export const PromotionFormSchema = z.object({
  name: requiredText(1, 255, "Name is required"),
  title: trimmedNullable(500),
  description: trimmedNullable(),
  image: trimmedNullable(),
  mobileImage: trimmedNullable(),
  linkUrl: trimmedNullable(),
  buttonText: trimmedNullable(100),
  badgeText: trimmedNullable(100),
  startsAt: datetimeLocalOrNull(),
  endsAt: datetimeLocalOrNull(),
  sortOrder: sortOrderField(),
  isActive: z.boolean(),
});

export type PromotionFormInput = z.input<typeof PromotionFormSchema>;
export type PromotionFormOutput = z.output<typeof PromotionFormSchema>;