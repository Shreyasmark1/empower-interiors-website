import {
  CategoryPageSchema,
  type CategoryPage,
  type CategorySeo,
} from "@/lib/schemas";
import { navigationService } from "@/lib/services/navigation.service";

function seoFor(category: { name: string; description?: string }): CategorySeo {
  const noun = category.name.toLowerCase();
  return {
    description:
      category.description ??
      `Explore our full ${noun} collection — designed for real homes, backed by easy returns and free delivery on orders above ₹999.`,
    faqs: [
      {
        question: `How long does delivery take for ${noun}?`,
        answer: `Most ${noun} orders ship within 2–4 business days and arrive in 7–10 business days, depending on your city. You'll get a tracking link as soon as your order is on the way.`,
      },
      {
        question: `Do ${noun} items come pre-assembled?`,
        answer: `Most ${noun} pieces arrive fully assembled. Flat-pack items include a step-by-step guide, and free assembly can be requested at delivery for eligible pin codes.`,
      },
      {
        question: `What materials are used in this ${noun} collection?`,
        answer: `We use kiln-dried hardwood frames, high-density foam and premium fabrics selected for daily use. Material and care details are listed on every product page.`,
      },
      {
        question: `Can I return or exchange a ${noun} purchase?`,
        answer: `Yes — returns and exchanges are accepted within 7 days of delivery for items in original condition. We'll arrange a free pickup from your address.`,
      },
    ],
  };
}

export const categoryPageService = {
  async getCategory(slug: string): Promise<CategoryPage | null> {
    const categories = await navigationService.getNavigation();
    const category = categories.find((c) => c.slug === slug);
    if (!category) return null;

    return CategoryPageSchema.parse({
      slug: category.slug,
      breadcrumb: [
        { label: "Home", href: "/" },
        { label: category.name, href: `/${category.slug}` },
      ],
      title: category.name,
      description: category.description,
      subcategories: category.groups.flatMap((group) =>
        group.items.map((item) => ({
          name: item.label,
          subtitle: group.title,
          imageUrl: group.imageUrl,
          href: item.href,
        })),
      ),
      promoBanners: category.promoBanners,
      seo: seoFor(category),
    });
  },
};
