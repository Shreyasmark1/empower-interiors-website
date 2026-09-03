import { z } from "zod";

const HeroBannerSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  imageUrl: z.string().min(1),
  mobileImageUrl: z.string().optional(),
  ctaText: z.string().min(1),
  ctaUrl: z.string().min(1),
  badgeText: z.string().optional(),
  couponCode: z.string().optional(),
});

const HeroDataSchema = z.object({
  primary: HeroBannerSchema,
  carousel: z.array(HeroBannerSchema),
});

export { HeroBannerSchema, HeroDataSchema };

export type HeroBanner = z.infer<typeof HeroBannerSchema>;
export type HeroData = z.infer<typeof HeroDataSchema>;
