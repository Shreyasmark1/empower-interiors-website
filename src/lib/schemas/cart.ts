import { z } from "zod";

import { idSchema } from "./product";

export const CartQuantitySchema = z.number().int().min(1).max(99);

export const AddToCartInputSchema = z.object({
  productId: idSchema,
  quantity: CartQuantitySchema.default(1),
});

export type AddToCartInput = z.input<typeof AddToCartInputSchema>;
export type AddToCartInputValue = z.infer<typeof AddToCartInputSchema>;

export const CartItemSchema = AddToCartInputSchema.extend({
  id: idSchema,
});

export type CartItem = z.infer<typeof CartItemSchema>;
export type UpdateCartItem = CartItem;