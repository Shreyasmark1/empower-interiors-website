import {
  type MainCategory,
  NavigationSchema,
} from "@/lib/schemas/navigation";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const navigationSeed: MainCategory[] = [
  {
    id: "seating",
    name: "Seating",
    slug: "seating",
    groups: [
      {
        id: "seating-sofas",
        title: "Sofas",
        imageUrl: "https://picsum.photos/seed/sofas/200/200",
        href: "/seating/sofas",
        items: [
          { id: "s1", label: "3-Seater Sofas", href: "/seating/sofas/3-seater" },
          { id: "s2", label: "2-Seater Sofas", href: "/seating/sofas/2-seater" },
          { id: "s3", label: "L-Shaped Sofas", href: "/seating/sofas/l-shaped", badge: "Popular" },
          { id: "s4", label: "Sofa Cum Beds", href: "/seating/sofas/sofa-cum-beds" },
          { id: "s5", label: "Recliners", href: "/seating/sofas/recliners" },
        ],
      },
      {
        id: "seating-chairs",
        title: "Chairs",
        imageUrl: "https://picsum.photos/seed/chairs/200/200",
        href: "/seating/chairs",
        items: [
          { id: "c1", label: "Accent Chairs", href: "/seating/chairs/accent" },
          { id: "c2", label: "Armchairs", href: "/seating/chairs/armchairs" },
          { id: "c3", label: "Dining Chairs", href: "/seating/chairs/dining" },
          { id: "c4", label: "Office Chairs", href: "/seating/chairs/office" },
        ],
      },
      {
        id: "seating-benches",
        title: "Benches & Ottomans",
        imageUrl: "https://picsum.photos/seed/benches/200/200",
        href: "/seating/benches",
        items: [
          { id: "b1", label: "Benches", href: "/seating/benches" },
          { id: "b2", label: "Ottomans", href: "/seating/ottomans" },
          { id: "b3", label: "Poufs", href: "/seating/poufs" },
        ],
      },
    ],
    promoBanners: [
      {
        title: "New Arrivals in Seating",
        subtitle: "Explore the latest collection of sofas and chairs",
        ctaText: "Shop Seating",
        ctaUrl: "/seating",
        imageUrl: "https://picsum.photos/seed/seating-promo/600/400",
      },
      {
        title: "Sofa Sale — Up to 40% Off",
        subtitle: "Limited time offer on premium sofas",
        ctaText: "View Deals",
        ctaUrl: "/seating/sofas",
        imageUrl: "https://picsum.photos/seed/seating-sale/600/400",
      },
    ],
  },
  {
    id: "dining",
    name: "Dining",
    slug: "dining",
    groups: [
      {
        id: "dining-tables",
        title: "Tables",
        imageUrl: "https://picsum.photos/seed/dining-tables/200/200",
        href: "/dining/tables",
        items: [
          { id: "dt1", label: "4-Seater Tables", href: "/dining/tables/4-seater" },
          { id: "dt2", label: "6-Seater Tables", href: "/dining/tables/6-seater" },
          { id: "dt3", label: "Extendable Tables", href: "/dining/tables/extendable", badge: "New" },
          { id: "dt4", label: "Round Tables", href: "/dining/tables/round" },
        ],
      },
      {
        id: "dining-sets",
        title: "Dining Sets",
        imageUrl: "https://picsum.photos/seed/dining-sets/200/200",
        href: "/dining/sets",
        items: [
          { id: "ds1", label: "4-Seater Sets", href: "/dining/sets/4-seater" },
          { id: "ds2", label: "6-Seater Sets", href: "/dining/sets/6-seater", badge: "Best Seller" },
          { id: "ds3", label: "Corner Dining Sets", href: "/dining/sets/corner" },
        ],
      },
      {
        id: "dining-storage",
        title: "Dining Storage",
        imageUrl: "https://picsum.photos/seed/dining-storage/200/200",
        href: "/dining/storage",
        items: [
          { id: "dst1", label: "Sideboards", href: "/dining/storage/sideboards" },
          { id: "dst2", label: "Bar Cabinets", href: "/dining/storage/bar-cabinets" },
          { id: "dst3", label: "Wine Racks", href: "/dining/storage/wine-racks" },
        ],
      },
      {
        id: "dining-bar",
        title: "Bar Furniture",
        imageUrl: "https://picsum.photos/seed/bar-furniture/200/200",
        href: "/dining/bar",
        items: [
          { id: "db1", label: "Bar Tables", href: "/dining/bar/tables" },
          { id: "db2", label: "Bar Stools", href: "/dining/bar/stools", badge: "Trending" },
          { id: "db3", label: "Bar Carts", href: "/dining/bar/carts" },
        ],
      },
      {
        id: "dining-accessories",
        title: "Dining Accessories",
        imageUrl: "https://picsum.photos/seed/dining-accessories/200/200",
        href: "/dining/accessories",
        items: [
          { id: "da1", label: "Table Runners", href: "/dining/accessories/runners" },
          { id: "da2", label: "Placemats", href: "/dining/accessories/placemats" },
          { id: "da3", label: "Napkin Holders", href: "/dining/accessories/napkins" },
          { id: "da4", label: "Coasters", href: "/dining/accessories/coasters" },
        ],
      },
    ],
    promoBanners: [
      {
        title: "Monsoon Dining Sale",
        subtitle: "Up to 30% off on dining tables and sets",
        ctaText: "Shop Dining",
        ctaUrl: "/dining",
        imageUrl: "https://picsum.photos/seed/dining-promo/600/400",
      },
      {
        title: "New Dining Sets",
        subtitle: "Elevate your dining experience",
        ctaText: "Explore Sets",
        ctaUrl: "/dining/sets",
        imageUrl: "https://picsum.photos/seed/dining-sets-promo/600/400",
      },
    ],
  },
  {
    id: "lighting",
    name: "Lighting",
    slug: "lighting",
    groups: [
      {
        id: "lighting-ceiling",
        title: "Ceiling Lights",
        imageUrl: "https://picsum.photos/seed/ceiling-lights/200/200",
        href: "/lighting/ceiling",
        items: [
          { id: "lc1", label: "Chandeliers", href: "/lighting/ceiling/chandeliers" },
          { id: "lc2", label: "Pendant Lights", href: "/lighting/ceiling/pendants", badge: "Trending" },
          { id: "lc3", label: "Flush Mount", href: "/lighting/ceiling/flush-mount" },
        ],
      },
      {
        id: "lighting-wall",
        title: "Wall & Floor",
        imageUrl: "https://picsum.photos/seed/wall-lights/200/200",
        href: "/lighting/wall",
        items: [
          { id: "lw1", label: "Wall Sconces", href: "/lighting/wall/sconces" },
          { id: "lw2", label: "Floor Lamps", href: "/lighting/floor/lamps" },
          { id: "lw3", label: "Table Lamps", href: "/lighting/table/lamps" },
        ],
      },
      {
        id: "lighting-outdoor",
        title: "Outdoor",
        imageUrl: "https://picsum.photos/seed/outdoor-lights/200/200",
        href: "/lighting/outdoor",
        items: [
          { id: "lo1", label: "Garden Lights", href: "/lighting/outdoor/garden" },
          { id: "lo2", label: "String Lights", href: "/lighting/outdoor/string" },
          { id: "lo3", label: "Lanterns", href: "/lighting/outdoor/lanterns" },
        ],
      },
    ],
    promoBanners: [],
  },
  {
    id: "storage",
    name: "Storage",
    slug: "storage",
    groups: [
      {
        id: "storage-shelves",
        title: "Shelving",
        imageUrl: "https://picsum.photos/seed/shelves/200/200",
        href: "/storage/shelves",
        items: [
          { id: "ss1", label: "Bookshelves", href: "/storage/shelves/bookshelves" },
          { id: "ss2", label: "Wall Shelves", href: "/storage/shelves/wall" },
          { id: "ss3", label: "Corner Shelves", href: "/storage/shelves/corner" },
          { id: "ss4", label: "Floating Shelves", href: "/storage/shelves/floating" },
        ],
      },
      {
        id: "storage-cabinets",
        title: "Cabinets",
        imageUrl: "https://picsum.photos/seed/cabinets/200/200",
        href: "/storage/cabinets",
        items: [
          { id: "sc1", label: "TV Units", href: "/storage/cabinets/tv-units", badge: "Popular" },
          { id: "sc2", label: "Shoe Racks", href: "/storage/cabinets/shoe-racks" },
          { id: "sc3", label: "Cupboards", href: "/storage/cabinets/cupboards" },
        ],
      },
    ],
    promoBanners: [
      {
        title: "Organize Your Space",
        subtitle: "Smart storage solutions for every room",
        ctaText: "Shop Storage",
        ctaUrl: "/storage",
        imageUrl: "https://picsum.photos/seed/storage-promo/600/400",
      },
    ],
  },
  {
    id: "decor",
    name: "Decor",
    slug: "decor",
    groups: [
      {
        id: "decor-wall",
        title: "Wall Decor",
        imageUrl: "https://picsum.photos/seed/wall-decor/200/200",
        href: "/decor/wall",
        items: [
          { id: "dw1", label: "Wall Art", href: "/decor/wall/art" },
          { id: "dw2", label: "Mirrors", href: "/decor/wall/mirrors" },
          { id: "dw3", label: "Wall Clocks", href: "/decor/wall/clocks" },
          { id: "dw4", label: "Photo Frames", href: "/decor/wall/frames" },
        ],
      },
      {
        id: "decor-accents",
        title: "Accents",
        imageUrl: "https://picsum.photos/seed/accents/200/200",
        href: "/decor/accents",
        items: [
          { id: "da1", label: "Vases", href: "/decor/accents/vases" },
          { id: "da2", label: "Candles & Holders", href: "/decor/accents/candles" },
          { id: "da3", label: "Showpieces", href: "/decor/accents/showpieces" },
          { id: "da4", label: "Planters", href: "/decor/accents/planters", badge: "New" },
        ],
      },
      {
        id: "decor-textiles",
        title: "Textiles",
        imageUrl: "https://picsum.photos/seed/textiles/200/200",
        href: "/decor/textiles",
        items: [
          { id: "dt1", label: "Cushion Covers", href: "/decor/textiles/cushion-covers" },
          { id: "dt2", label: "Rugs & Carpets", href: "/decor/textiles/rugs" },
          { id: "dt3", label: "Curtains", href: "/decor/textiles/curtains" },
        ],
      },
    ],
    promoBanners: [],
  },
];

let navigationCache: MainCategory[] | null = null;

export const navigationService = {
  async getNavigation(): Promise<MainCategory[]> {
    if (navigationCache) {
      return navigationCache;
    }

    await delay(200);

    navigationCache = NavigationSchema.parse(navigationSeed);
    return navigationCache;
  },
};
