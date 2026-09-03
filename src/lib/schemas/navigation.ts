import { z } from "zod";

const NavItemSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  href: z.string().min(1),
  badge: z.string().optional(),
});

const NavGroupSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  items: z.array(NavItemSchema),
  imageUrl: z.string().optional(),
  href: z.string().optional(),
});

const PromoBannerSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  ctaText: z.string().min(1),
  ctaUrl: z.string().min(1),
  imageUrl: z.string().min(1),
});

const MainCategorySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  groups: z.array(NavGroupSchema),
  promoBanners: z.array(PromoBannerSchema),
});

const NavigationSchema = z.array(MainCategorySchema);

export {
  MainCategorySchema,
  NavGroupSchema,
  NavItemSchema,
  NavigationSchema,
  PromoBannerSchema,
};

export type NavItem = z.infer<typeof NavItemSchema>;
export type NavGroup = z.infer<typeof NavGroupSchema>;
export type PromoBanner = z.infer<typeof PromoBannerSchema>;
export type MainCategory = z.infer<typeof MainCategorySchema>;
