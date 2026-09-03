import { z } from "zod";

export const idSchema = z.string().min(1);

export const ProductCategorySchema = z.enum([
  "Seating",
  "Dining",
  "Lighting",
  "Storage",
  "Decor",
]);

export const ProductStatusSchema = z.enum([
  "inStock",
  "soldOut",
  "newArrival",
]);

export const CurrencyAmountSchema = z.number().int().positive();

export const ProductBaseSchema = z.object({
  name: z.string().trim().min(2).max(80),
  category: ProductCategorySchema,
  price: CurrencyAmountSchema,
  wasPrice: CurrencyAmountSchema.optional(),
  status: ProductStatusSchema.default("inStock"),
});

export type CreateProduct = z.infer<typeof ProductBaseSchema>;

export const ProductSchema = ProductBaseSchema.extend({
  id: idSchema,
});

export type Product = z.infer<typeof ProductSchema>;
export type UpdateProduct = Product;
export type ProductCategory = z.infer<typeof ProductCategorySchema>;
export type ProductStatus = z.infer<typeof ProductStatusSchema>;