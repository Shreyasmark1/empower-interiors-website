import { z } from "zod";

import {
  positivePrice,
  requiredText,
  selectId,
  sortOrderField,
} from "./common";

export const VariantFormSchema = z.object({
  productId: selectId("Select a product"),
  name: requiredText(1, 255, "Name is required"),
  price: positivePrice("Enter a positive price"),
  images: z.array(z.string()),
  sortOrder: sortOrderField(),
  isActive: z.boolean(),
});

export type VariantFormInput = z.input<typeof VariantFormSchema>;
export type VariantFormOutput = z.output<typeof VariantFormSchema>;