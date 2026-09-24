import { z } from "zod";

import {
  commaStringToArray,
  idArrayToNumbers,
  jsonTextToObject,
  positivePriceOrNull,
  requiredText,
  slugField,
  trimmedNullable,
} from "./common";

export const ProductFormSchema = z.object({
  name: requiredText(1, 500, "Name is required"),
  slug: slugField(500),
  thumbnail: trimmedNullable(),
  brandName: trimmedNullable(255),
  description: trimmedNullable(),
  shortDescription: trimmedNullable(),
  minPrice: positivePriceOrNull("Enter a positive number"),
  mrpPrice: positivePriceOrNull("Enter a positive number"),
  badges: commaStringToArray(),
  specifications: jsonTextToObject(),
  isActive: z.boolean(),
  categoryIds: idArrayToNumbers(500),
});

export type ProductFormInput = z.input<typeof ProductFormSchema>;
export type ProductFormOutput = z.output<typeof ProductFormSchema>;