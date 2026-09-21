import { z } from "zod";

export const PromotionCreateSchema = z.object({
  name: z.string().trim().min(1).max(255),
  title: z.string().max(500).nullable().optional(),
  description: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  mobileImage: z.string().nullable().optional(),
  linkUrl: z.string().nullable().optional(),
  buttonText: z.string().max(100).nullable().optional(),
  startsAt: z.coerce.date().nullable().optional(),
  endsAt: z.coerce.date().nullable().optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.coerce.number().int().default(0),
});

export type CreatePromotion = z.infer<typeof PromotionCreateSchema>;

export const PromotionUpdateSchema = z.object({
  id: z.coerce.number().int().positive(),
  name: z.string().trim().min(1).max(255).optional(),
  title: z.string().max(500).nullable().optional(),
  description: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  mobileImage: z.string().nullable().optional(),
  linkUrl: z.string().nullable().optional(),
  buttonText: z.string().max(100).nullable().optional(),
  startsAt: z.coerce.date().nullable().optional(),
  endsAt: z.coerce.date().nullable().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.coerce.number().int().optional(),
});

export type UpdatePromotion = z.infer<typeof PromotionUpdateSchema>;