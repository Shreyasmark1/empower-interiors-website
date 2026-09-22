import { z } from "zod";

import { BreadcrumbItemSchema } from "./catalog";
import { PromoBannerSchema } from "./navigation";

export const CategorySubcategorySchema = z.object({
  name: z.string().min(1),
  subtitle: z.string().optional(),
  imageUrl: z.string().optional(),
  href: z.string().min(1),
});

export type CategorySubcategory = z.infer<typeof CategorySubcategorySchema>;

export const FaqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export type FaqItem = z.infer<typeof FaqItemSchema>;

export const CategorySeoSchema = z.object({
  description: z.string().min(1),
  faqs: z.array(FaqItemSchema),
});

export type CategorySeo = z.infer<typeof CategorySeoSchema>;

export const CategoryPageSchema = z.object({
  slug: z.string().min(1),
  breadcrumb: z.array(BreadcrumbItemSchema),
  title: z.string().min(1),
  description: z.string().optional(),
  subcategories: z.array(CategorySubcategorySchema),
  promoBanners: z.array(PromoBannerSchema),
  seo: CategorySeoSchema,
});

export type CategoryPage = z.infer<typeof CategoryPageSchema>;
