import { z } from "zod";

import { idSchema } from "./product";

export const ReviewBaseSchema = z.object({
  reviewer: z.string().trim().min(1).max(60),
  date: z.string().trim().min(1).max(40),
  rating: z.number().int().min(1).max(5),
  body: z.string().trim().min(1).max(600),
  verified: z.boolean().default(false),
});

export type CreateReview = z.infer<typeof ReviewBaseSchema>;

export const ReviewSchema = ReviewBaseSchema.extend({
  id: idSchema,
});

export type Review = z.infer<typeof ReviewSchema>;
export type UpdateReview = Review;