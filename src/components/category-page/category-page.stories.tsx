import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CategoryView } from "./category-page";

const seo = {
  description:
    "Explore the full collection at Empower Interiors — designed for real homes, with free delivery above ₹999 and 7-day easy returns.",
  faqs: [
    {
      question: "How long does delivery take?",
      answer:
        "Most orders ship within 2–4 business days and arrive in 7–10 business days.",
    },
    {
      question: "Do items come pre-assembled?",
      answer:
        "Most pieces arrive fully assembled; flat-pack items include a step-by-step guide.",
    },
  ],
};

const meta = {
  title: "Furnish/CategoryView",
  component: CategoryView,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CategoryView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Seating: Story = {
  args: {
    category: {
      slug: "seating",
      breadcrumb: [
        { label: "Home", href: "/" },
        { label: "Seating", href: "/seating" },
      ],
      title: "Seating",
      description:
        "A 3 seater sofa brings comfort and style to your living room. At Pepperfry, choose from 40+ designs in fabric, leather, velvet and solid wood frames. All at affordable prices, with no-cost EMI and free delivery options.",
      subcategories: [
        {
          name: "3-Seater Sofas",
          subtitle: "Sofas",
          imageUrl: "https://picsum.photos/seed/3-seater/400/500",
          href: "/seating/sofas/3-seater",
        },
        {
          name: "2-Seater Sofas",
          subtitle: "Sofas",
          imageUrl: "https://picsum.photos/seed/2-seater/400/500",
          href: "/seating/sofas/2-seater",
        },
        {
          name: "L-Shaped Sofas",
          subtitle: "Sofas",
          imageUrl: "https://picsum.photos/seed/l-shaped/400/500",
          href: "/seating/sofas/l-shaped",
        },
        {
          name: "Sofa Cum Beds",
          subtitle: "Sofas",
          imageUrl: "https://picsum.photos/seed/sofa-cum-beds/400/500",
          href: "/seating/sofas/sofa-cum-beds",
        },
        {
          name: "Recliners",
          subtitle: "Sofas",
          imageUrl: "https://picsum.photos/seed/recliners/400/500",
          href: "/seating/sofas/recliners",
        },
        {
          name: "Accent Chairs",
          subtitle: "Chairs",
          imageUrl: "https://picsum.photos/seed/accent-chairs/400/500",
          href: "/seating/chairs/accent",
        },
        {
          name: "Armchairs",
          subtitle: "Chairs",
          imageUrl: "https://picsum.photos/seed/armchairs/400/500",
          href: "/seating/chairs/armchairs",
        },
        {
          name: "Dining Chairs",
          subtitle: "Chairs",
          imageUrl: "https://picsum.photos/seed/dining-chairs/400/500",
          href: "/seating/chairs/dining",
        },
        {
          name: "Office Chairs",
          subtitle: "Chairs",
          imageUrl: "https://picsum.photos/seed/office-chairs/400/500",
          href: "/seating/chairs/office",
        },
        {
          name: "Benches",
          subtitle: "Benches & Ottomans",
          imageUrl: "https://picsum.photos/seed/benches/400/500",
          href: "/seating/benches",
        },
        {
          name: "Ottomans",
          subtitle: "Benches & Ottomans",
          imageUrl: "https://picsum.photos/seed/ottomans/400/500",
          href: "/seating/ottomans",
        },
        {
          name: "Poufs",
          subtitle: "Benches & Ottomans",
          imageUrl: "https://picsum.photos/seed/poufs/400/500",
          href: "/seating/poufs",
        },
      ],
      promoBanners: [
        {
          title: "New Arrivals in Seating",
          subtitle: "Explore the latest collection of sofas and chairs",
          ctaText: "Shop Seating",
          ctaUrl: "/seating",
          imageUrl: "https://picsum.photos/seed/seating-promo/1676/153",
        },
      ],
      seo,
    },
  },
};

export const ExpandsToMoreRows: Story = {
  args: {
    category: {
      slug: "dining",
      breadcrumb: [
        { label: "Home", href: "/" },
        { label: "Dining", href: "/dining" },
      ],
      title: "Dining",
      description: "Tables, sets and storage that turn every meal into an occasion.",
      subcategories: [
        { name: "4-Seater Tables", subtitle: "Tables", href: "/dining/tables/4-seater" },
        { name: "6-Seater Tables", subtitle: "Tables", href: "/dining/tables/6-seater" },
        { name: "Extendable Tables", subtitle: "Tables", href: "/dining/tables/extendable" },
        { name: "Round Tables", subtitle: "Tables", href: "/dining/tables/round" },
        { name: "4-Seater Sets", subtitle: "Dining Sets", href: "/dining/sets/4-seater" },
        { name: "6-Seater Sets", subtitle: "Dining Sets", href: "/dining/sets/6-seater" },
        { name: "Corner Dining Sets", subtitle: "Dining Sets", href: "/dining/sets/corner" },
        { name: "Sideboards", subtitle: "Dining Storage", href: "/dining/storage/sideboards" },
        { name: "Bar Cabinets", subtitle: "Dining Storage", href: "/dining/storage/bar-cabinets" },
        { name: "Wine Racks", subtitle: "Dining Storage", href: "/dining/storage/wine-racks" },
        { name: "Bar Tables", subtitle: "Bar Furniture", href: "/dining/bar/tables" },
        { name: "Bar Stools", subtitle: "Bar Furniture", href: "/dining/bar/stools" },
        { name: "Bar Carts", subtitle: "Bar Furniture", href: "/dining/bar/carts" },
        { name: "Table Runners", subtitle: "Dining Accessories", href: "/dining/accessories/runners" },
        { name: "Placemats", subtitle: "Dining Accessories", href: "/dining/accessories/placemats" },
        { name: "Napkin Holders", subtitle: "Dining Accessories", href: "/dining/accessories/napkins" },
        { name: "Coasters", subtitle: "Dining Accessories", href: "/dining/accessories/coasters" },
      ],
      promoBanners: [],
      seo,
    },
  },
};

export const Empty: Story = {
  args: {
    category: {
      slug: "decor",
      breadcrumb: [
        { label: "Home", href: "/" },
        { label: "Decor", href: "/decor" },
      ],
      title: "Decor",
      description: "Mirrors, accents and textiles that give your home its personality.",
      subcategories: [],
      promoBanners: [],
      seo,
    },
  },
};