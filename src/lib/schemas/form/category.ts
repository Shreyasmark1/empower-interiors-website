import { z } from "zod";

import {
  requiredText,
  selectIdOrNull,
  slugField,
  sortOrderField,
  trimmedNullable,
} from "./common";

export const CategoryFormSchema = z.object({
  name: requiredText(1, 255, "Name is required"),
  slug: slugField(255),
  parentId: selectIdOrNull(),
  description: trimmedNullable(),
  image: trimmedNullable(),
  sortOrder: sortOrderField(),
  isActive: z.boolean(),
});

export type CategoryFormInput = z.input<typeof CategoryFormSchema>;
export type CategoryFormOutput = z.output<typeof CategoryFormSchema>;