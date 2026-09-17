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
    description:
      "A 3 seater sofa brings comfort and style to your living room. At Pepperfry, choose from 40+ designs in fabric, leather, velvet and solid wood frames. All at affordable prices, with no-cost EMI and free delivery options. Whether you need a compact three seater sofa for your apartment or a statement piece for a spacious home, our collection suits every space and budget.",
    groups: [
      {
        id: "seating-sofas",
        title: "Sofas",
        imageUrl: "https://picsum.photos/seed/sofas/200/200",
        href: "/seating/sofas",
        description:
          "Our widest range of sofas — from cosy two-seaters to grand L-shaped loungers.",
        items: [
          {
            id: "s1",
            label: "3-Seater Sofas",
            href: "/seating/sofas/3-seater",
            description:
              "A 3 seater sofa brings comfort and style to your living room. At Pepperfry, choose from 40+ designs in fabric, leather, velvet and solid wood frames. All at affordable prices, with no-cost EMI and free delivery options. Whether you need a compact three seater sofa for your apartment or a statement piece for a spacious home, our collection suits every space and budget.",
          },
          {
            id: "s2",
            label: "2-Seater Sofas",
            href: "/seating/sofas/2-seater",
            description:
              "Compact two-seaters that punch above their weight in smaller rooms.",
          },
          {
            id: "s3",
            label: "L-Shaped Sofas",
            href: "/seating/sofas/l-shaped",
            badge: "Popular",
            description:
              "Corner sofas that add lounge-style seating and make the most of awkward corners.",
          },
          {
            id: "s4",
            label: "Sofa Cum Beds",
            href: "/seating/sofas/sofa-cum-beds",
            description:
              "Sofas that double as guest beds — pull-out comfort with a sofa cover.",
          },
          {
            id: "s5",
            label: "Recliners",
            href: "/seating/sofas/recliners",
            description:
              "Recline, relax, repeat. Motorised and manual options with cushioned support.",
          },
        ],
      },
      {
        id: "seating-chairs",
        title: "Chairs",
        imageUrl: "https://picsum.photos/seed/chairs/200/200",
        href: "/seating/chairs",
        description:
          "Statement seating for every room and every posture.",
        items: [
          {
            id: "c1",
            label: "Accent Chairs",
            href: "/seating/chairs/accent",
            description:
              "Sculptural chairs that anchor a corner or complete a reading nook.",
          },
          {
            id: "c2",
            label: "Armchairs",
            href: "/seating/chairs/armchairs",
            description:
              "Deep, generously padded armchairs for sinking into at the end of the day.",
          },
          {
            id: "c3",
            label: "Dining Chairs",
            href: "/seating/chairs/dining",
            description:
              "Ergonomic dining chairs that keep long dinners comfortable.",
          },
          {
            id: "c4",
            label: "Office Chairs",
            href: "/seating/chairs/office",
            description:
              "Supportive chairs for long hours at the desk, without the office look.",
          },
        ],
      },
      {
        id: "seating-benches",
        title: "Benches & Ottomans",
        imageUrl: "https://picsum.photos/seed/benches/200/200",
        href: "/seating/benches",
        description:
          "Flexible extras that seat extra guests or rest your feet.",
        items: [
          {
            id: "b1",
            label: "Benches",
            href: "/seating/benches",
            description:
              "Barefoot-friendly benches for dining tables, entryways and bedsides.",
          },
          {
            id: "b2",
            label: "Ottomans",
            href: "/seating/ottomans",
            description:
              "Soft-footed ottomans that multiply as seating, footrests and side tables.",
          },
          {
            id: "b3",
            label: "Poufs",
            href: "/seating/poufs",
            description:
              "Light, portable poufs that tuck under a table when you need more room.",
          },
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
    description:
      "Tables, sets and storage that turn every meal into an occasion.",
    groups: [
      {
        id: "dining-tables",
        title: "Tables",
        imageUrl: "https://picsum.photos/seed/dining-tables/200/200",
        href: "/dining/tables",
        description:
          "The centrepiece of your dining room, built to host.",
        items: [
          {
            id: "dt1",
            label: "4-Seater Tables",
            href: "/dining/tables/4-seater",
            description:
              "Four-seat tables that fit snug apartments and Sunday lunches alike.",
          },
          {
            id: "dt2",
            label: "6-Seater Tables",
            href: "/dining/tables/6-seater",
            description:
              "Generous six-seaters with room to spread a full spread.",
          },
          {
            id: "dt3",
            label: "Extendable Tables",
            href: "/dining/tables/extendable",
            badge: "New",
            description:
              "Tables that grow from intimate dinner to festive feast on demand.",
          },
          {
            id: "dt4",
            label: "Round Tables",
            href: "/dining/tables/round",
            description:
              "Round tables that keep every seat in the conversation.",
          },
        ],
      },
      {
        id: "dining-sets",
        title: "Dining Sets",
        imageUrl: "https://picsum.photos/seed/dining-sets/200/200",
        href: "/dining/sets",
        description:
          "Table and chairs designed together so your dining room looks finished.",
        items: [
          {
            id: "ds1",
            label: "4-Seater Sets",
            href: "/dining/sets/4-seater",
            description:
              "Complete four-seat settings, styled to match from day one.",
          },
          {
            id: "ds2",
            label: "6-Seater Sets",
            href: "/dining/sets/6-seater",
            badge: "Best Seller",
            description:
              "Six-seat sets for homes that love to host.",
          },
          {
            id: "ds3",
            label: "Corner Dining Sets",
            href: "/dining/sets/corner",
            description:
              "Corner banquette settings that maximise seating in compact spaces.",
          },
        ],
      },
      {
        id: "dining-storage",
        title: "Dining Storage",
        imageUrl: "https://picsum.photos/seed/dining-storage/200/200",
        href: "/dining/storage",
        description:
          "Cabinetry that keeps cutlery, glassware and bottles in easy reach.",
        items: [
          {
            id: "dst1",
            label: "Sideboards",
            href: "/dining/storage/sideboards",
            description:
              "Low sideboards that store the essentials and display the special.",
          },
          {
            id: "dst2",
            label: "Bar Cabinets",
            href: "/dining/storage/bar-cabinets",
            description:
              "Compact bar cabinets with dedicated space for bottles and glassware.",
          },
          {
            id: "dst3",
            label: "Wine Racks",
            href: "/dining/storage/wine-racks",
            description:
              "Racks that hold your collection within arm's reach of the table.",
          },
        ],
      },
      {
        id: "dining-bar",
        title: "Bar Furniture",
        imageUrl: "https://picsum.photos/seed/bar-furniture/200/200",
        href: "/dining/bar",
        description:
          "All-in-one pieces for a home bar corner.",
        items: [
          {
            id: "db1",
            label: "Bar Tables",
            href: "/dining/bar/tables",
            description:
              "Slim bar tables that turn a counter-top into a cocktail station.",
          },
          {
            id: "db2",
            label: "Bar Stools",
            href: "/dining/bar/stools",
            badge: "Trending",
            description:
              "Counter-height stools with comfort for long conversations.",
          },
          {
            id: "db3",
            label: "Bar Carts",
            href: "/dining/bar/carts",
            description:
              "Castered carts that ferry drinks from kitchen to living room.",
          },
        ],
      },
      {
        id: "dining-accessories",
        title: "Dining Accessories",
        imageUrl: "https://picsum.photos/seed/dining-accessories/200/200",
        href: "/dining/accessories",
        description:
          "Small touches that finish the table.",
        items: [
          {
            id: "da1",
            label: "Table Runners",
            href: "/dining/accessories/runners",
            description:
              "Runners that frame the feast and protect the tabletop.",
          },
          {
            id: "da2",
            label: "Placemats",
            href: "/dining/accessories/placemats",
            description:
              "Wipe-clean placemats in weaves and colours for every table.",
          },
          {
            id: "da3",
            label: "Napkin Holders",
            href: "/dining/accessories/napkins",
            description:
              "Holders that keep napkins neat and within reach.",
          },
          {
            id: "da4",
            label: "Coasters",
            href: "/dining/accessories/coasters",
            description:
              "Coasters that guard surfaces against every glass ring.",
          },
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
    description:
      "Pendants, lamps and wall lights that set the mood in every room.",
    groups: [
      {
        id: "lighting-ceiling",
        title: "Ceiling Lights",
        imageUrl: "https://picsum.photos/seed/ceiling-lights/200/200",
        href: "/lighting/ceiling",
        description:
          "Focal points that hang from above and anchor the room.",
        items: [
          {
            id: "lc1",
            label: "Chandeliers",
            href: "/lighting/ceiling/chandeliers",
            description:
              "Statement chandeliers in crystal, brass and sculpted forms.",
          },
          {
            id: "lc2",
            label: "Pendant Lights",
            href: "/lighting/ceiling/pendants",
            badge: "Trending",
            description:
              "Focused pendants that light tables and islands with intent.",
          },
          {
            id: "lc3",
            label: "Flush Mount",
            href: "/lighting/ceiling/flush-mount",
            description:
              "Flush mounts that hug the ceiling for low-clearance rooms.",
          },
        ],
      },
      {
        id: "lighting-wall",
        title: "Wall & Floor",
        imageUrl: "https://picsum.photos/seed/wall-lights/200/200",
        href: "/lighting/wall",
        description:
          "Lamps and sconces that light the edges of the room.",
        items: [
          {
            id: "lw1",
            label: "Wall Sconces",
            href: "/lighting/wall/sconces",
            description:
              "Sconces that frame doorways, mirrors and artwork with soft glow.",
          },
          {
            id: "lw2",
            label: "Floor Lamps",
            href: "/lighting/floor/lamps",
            description:
              "Tall floor lamps that wash reading corners in warm light.",
          },
          {
            id: "lw3",
            label: "Table Lamps",
            href: "/lighting/table/lamps",
            description:
              "Table lamps sized for sideboards, desks and nightstands.",
          },
        ],
      },
      {
        id: "lighting-outdoor",
        title: "Outdoor",
        imageUrl: "https://picsum.photos/seed/outdoor-lights/200/200",
        href: "/lighting/outdoor",
        description:
          "Weather-ready lighting for balconies, gardens and evenings outside.",
        items: [
          {
            id: "lo1",
            label: "Garden Lights",
            href: "/lighting/outdoor/garden",
            description:
              "Path and garden lights that extend your evenings outdoors.",
          },
          {
            id: "lo2",
            label: "String Lights",
            href: "/lighting/outdoor/string",
            description:
              "Festoon strings that make any balcony feel like a celebration.",
          },
          {
            id: "lo3",
            label: "Lanterns",
            href: "/lighting/outdoor/lanterns",
            description:
              "Portable lanterns for bedside, patio and everything between.",
          },
        ],
      },
    ],
    promoBanners: [],
  },
  {
    id: "storage",
    name: "Storage",
    slug: "storage",
    description:
      "Shelving and cabinets that tidy your space without sacrificing style.",
    groups: [
      {
        id: "storage-shelves",
        title: "Shelving",
        imageUrl: "https://picsum.photos/seed/shelves/200/200",
        href: "/storage/shelves",
        description:
          "Open shelving that puts your collection on display and within reach.",
        items: [
          {
            id: "ss1",
            label: "Bookshelves",
            href: "/storage/shelves/bookshelves",
            description:
              "Sturdy bookshelves that keep the library organised and upright.",
          },
          {
            id: "ss2",
            label: "Wall Shelves",
            href: "/storage/shelves/wall",
            description:
              "Bracketed wall shelves for displaying and storing at eye level.",
          },
          {
            id: "ss3",
            label: "Corner Shelves",
            href: "/storage/shelves/corner",
            description:
              "Corner shelves that put dead space to work.",
          },
          {
            id: "ss4",
            label: "Floating Shelves",
            href: "/storage/shelves/floating",
            description:
              "Seamless floating shelves with no visible brackets.",
          },
        ],
      },
      {
        id: "storage-cabinets",
        title: "Cabinets",
        imageUrl: "https://picsum.photos/seed/cabinets/200/200",
        href: "/storage/cabinets",
        description:
          "Closed storage that hides the clutter and shows the clean.",
        items: [
          {
            id: "sc1",
            label: "TV Units",
            href: "/storage/cabinets/tv-units",
            badge: "Popular",
            description:
              "Media consoles with cable management and room for consoles.",
          },
          {
            id: "sc2",
            label: "Shoe Racks",
            href: "/storage/cabinets/shoe-racks",
            description:
              "Racks that keep the entryway pairs in order.",
          },
          {
            id: "sc3",
            label: "Cupboards",
            href: "/storage/cabinets/cupboards",
            description:
              "Tall cupboards for linen, storage and everything without a home.",
          },
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
    description:
      "Mirrors, accents and textiles that give your home its personality.",
    groups: [
      {
        id: "decor-wall",
        title: "Wall Decor",
        imageUrl: "https://picsum.photos/seed/wall-decor/200/200",
        href: "/decor/wall",
        description:
          "Walls that tell your story.",
        items: [
          {
            id: "dw1",
            label: "Wall Art",
            href: "/decor/wall/art",
            description:
              "Prints and panels that add colour, texture and narrative.",
          },
          {
            id: "dw2",
            label: "Mirrors",
            href: "/decor/wall/mirrors",
            description:
              "Mirrors that bounce light and make rooms feel bigger.",
          },
          {
            id: "dw3",
            label: "Wall Clocks",
            href: "/decor/wall/clocks",
            description:
              "Clocks that anchor a wall and keep the day moving.",
          },
          {
            id: "dw4",
            label: "Photo Frames",
            href: "/decor/wall/frames",
            description:
              "Frames that turn snapshots into a gallery.",
          },
        ],
      },
      {
        id: "decor-accents",
        title: "Accents",
        imageUrl: "https://picsum.photos/seed/accents/200/200",
        href: "/decor/accents",
        description:
          "The finishing pieces on every surface.",
        items: [
          {
            id: "da1",
            label: "Vases",
            href: "/decor/accents/vases",
            description:
              "Vases for every stem — from sculptural statement to everyday bloom.",
          },
          {
            id: "da2",
            label: "Candles & Holders",
            href: "/decor/accents/candles",
            description:
              "Candles and holders that set a warm, flickering mood.",
          },
          {
            id: "da3",
            label: "Showpieces",
            href: "/decor/accents/showpieces",
            description:
              "Sculptures and curios to add character to shelves and consoles.",
          },
          {
            id: "da4",
            label: "Planters",
            href: "/decor/accents/planters",
            badge: "New",
            description:
              "Planters indoors and out, in trailing and upright silhouettes.",
          },
        ],
      },
      {
        id: "decor-textiles",
        title: "Textiles",
        imageUrl: "https://picsum.photos/seed/textiles/200/200",
        href: "/decor/textiles",
        description:
          "Soft layers that warm the room.",
        items: [
          {
            id: "dt1",
            label: "Cushion Covers",
            href: "/decor/textiles/cushion-covers",
            description:
              "Covers in weaves, prints and textures that refresh a sofa in minutes.",
          },
          {
            id: "dt2",
            label: "Rugs & Carpets",
            href: "/decor/textiles/rugs",
            description:
              "Rugs that anchor the room underfoot.",
          },
          {
            id: "dt3",
            label: "Curtains",
            href: "/decor/textiles/curtains",
            description:
              "Curtains that frame the window and soften the light.",
          },
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