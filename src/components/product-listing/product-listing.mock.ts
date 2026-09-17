import {
  CatalogProductSchema,
  type CatalogProduct,
  type CatalogProductVariant,
} from "@/lib/schemas"

const SOFA_BASES = [
  "Aston",
  "Brennan",
  "Colby",
  "Dahlia",
  "Ember",
  "Fable",
  "Grayson",
  "Haven",
  "Indie",
  "Juno",
  "Kesler",
  "Linden",
]

const SOFA_COLORS: CatalogProductVariant[] = [
  { color: "Teal Blue", swatch: "#0f766e" },
  { color: "Rust", swatch: "#c2410c" },
  { color: "Charcoal", swatch: "#374151" },
  { color: "Moss", swatch: "#3f6212" },
  { color: "Blush", swatch: "#be185d" },
]

const SOFA_BRANDS = ["Casacraft", "Woodsworth", "Slumberland"]

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function imageFor(slug: string): string {
  return `https://picsum.photos/seed/${slug}/500/625`
}

function makeSofaVariants(): Omit<CatalogProduct, "id">[] {
  const variants: Omit<CatalogProduct, "id">[] = []

  SOFA_BASES.forEach((base, baseIndex) => {
    SOFA_COLORS.forEach((color, colorIndex) => {
      const index = baseIndex * SOFA_COLORS.length + colorIndex
      const name = `${base} ${color.color} 3 Seater Sofa`
      const slug = slugify(name)
      const price = 18999 + baseIndex * 850 + colorIndex * 400
      const wasPrice = Math.round((price * 1.9) / 100) * 100
      const rating = Math.min(5, Number((4 + (index % 10) / 10).toFixed(1)))
      const ratingCount = 120 + ((index * 37) % 880)

      variants.push({
        slug,
        name,
        brand: SOFA_BRANDS[baseIndex % SOFA_BRANDS.length],
        image: imageFor(slug),
        price,
        wasPrice,
        rating,
        ratingCount,
        assured: index % 4 !== 0,
        warrantyLabel:
          index % 2 === 0
            ? "12-Month Warranty Available"
            : "24-Month Warranty Available",
        emiStarting: `₹${Math.round(price / 24).toLocaleString("en-IN")}/month`,
        colors: [
          SOFA_COLORS[colorIndex],
          SOFA_COLORS[(colorIndex + 1) % SOFA_COLORS.length],
          SOFA_COLORS[(colorIndex + 2) % SOFA_COLORS.length],
        ],
        path: "/seating/sofas/3-seater",
      })
    })
  })

  return variants
}

const editorial: Omit<CatalogProduct, "id">[] = [
  {
    slug: "lem-velvet-3-seater-sofa",
    name: "Lem Velvet 3 Seater Sofa in Teal Blue Colour",
    brand: "Casacraft",
    image: imageFor("lem-velvet-3-seater-sofa"),
    price: 28499,
    wasPrice: 55999,
    rating: 4.8,
    ratingCount: 421,
    assured: true,
    warrantyLabel: "12-Month Warranty Available",
    emiStarting: "₹1,369/month",
    colors: [
      { color: "Teal Blue", swatch: "#0f766e" },
      { color: "Charcoal", swatch: "#374151" },
      { color: "Burgundy", swatch: "#7f1d1d" },
    ],
    path: "/seating/sofas/3-seater",
  },
  {
    slug: "lennox-l-shaped-sofa",
    name: "Lennox L-Shaped Sofa in Beige",
    brand: "Casacraft",
    image: imageFor("lennox-l-shaped-sofa"),
    price: 41999,
    wasPrice: 69999,
    rating: 4.6,
    ratingCount: 288,
    assured: true,
    warrantyLabel: "24-Month Warranty Available",
    emiStarting: "₹2,019/month",
    colors: [
      { color: "Beige", swatch: "#d6c7b0" },
      { color: "Slate", swatch: "#475569" },
    ],
    path: "/seating/sofas/l-shaped",
  },
  {
    slug: "knox-velvet-recliner",
    name: "Knox Velvet Manual Recliner",
    brand: "Woodsworth",
    image: imageFor("knox-velvet-recliner"),
    price: 24999,
    wasPrice: 38999,
    rating: 4.5,
    ratingCount: 173,
    assured: true,
    warrantyLabel: "12-Month Warranty Available",
    emiStarting: "₹1,201/month",
    colors: [{ color: "Moss", swatch: "#3f6212" }],
    path: "/seating/sofas/recliners",
  },
  {
    slug: "sloane-sofa-cum-bed",
    name: "Sloane Fabric Sofa Cum Bed",
    brand: "Casacraft",
    image: imageFor("sloane-sofa-cum-bed"),
    price: 22999,
    wasPrice: 35999,
    rating: 4.3,
    ratingCount: 96,
    warrantyLabel: "12-Month Warranty Available",
    emiStarting: "₹1,105/month",
    path: "/seating/sofas/sofa-cum-beds",
  },
  {
    slug: "sloane-2-seater-sofa",
    name: "Sloane 2 Seater Sofa in Ochre",
    brand: "Casacraft",
    image: imageFor("sloane-2-seater-sofa"),
    price: 21999,
    wasPrice: 39999,
    rating: 4.4,
    ratingCount: 205,
    assured: true,
    warrantyLabel: "12-Month Warranty Available",
    emiStarting: "₹1,057/month",
    colors: [{ color: "Ochre", swatch: "#b45309" }],
    path: "/seating/sofas/2-seater",
  },
  {
    slug: "mira-cane-armchair",
    name: "Mira Cane Armchair",
    brand: "Woodsworth",
    image: imageFor("mira-cane-armchair"),
    price: 12999,
    wasPrice: 18999,
    rating: 4.7,
    ratingCount: 312,
    assured: true,
    warrantyLabel: "12-Month Warranty Available",
    emiStarting: "₹625/month",
    colors: [{ color: "Natural Cane", swatch: "#b08968" }],
    path: "/seating/chairs/accent",
  },
  {
    slug: "harlow-fabric-lounge-chair",
    name: "Harlow Fabric Lounge Chair",
    brand: "Casacraft",
    image: imageFor("harlow-fabric-lounge-chair"),
    price: 15999,
    wasPrice: 21999,
    rating: 4.5,
    ratingCount: 141,
    warrantyLabel: "12-Month Warranty Available",
    emiStarting: "₹769/month",
    path: "/seating/chairs/accent",
  },
  {
    slug: "rustic-wood-dining-table",
    name: "Rustic Sheesham Wood 6 Seater Dining Table",
    brand: "Woodsworth",
    image: imageFor("rustic-wood-dining-table"),
    price: 32999,
    wasPrice: 52999,
    rating: 4.6,
    ratingCount: 267,
    assured: true,
    warrantyLabel: "12-Month Warranty Available",
    emiStarting: "₹1,587/month",
    path: "/dining/tables/6-seater",
  },
  {
    slug: "ashwood-open-bookshelf",
    name: "Ashwood Open Bookshelf",
    brand: "Woodsworth",
    image: imageFor("ashwood-open-bookshelf"),
    price: 11499,
    wasPrice: 16999,
    rating: 4.4,
    ratingCount: 88,
    warrantyLabel: "12-Month Warranty Available",
    emiStarting: "₹553/month",
    path: "/storage/shelves/bookshelves",
  },
  {
    slug: "ceramic-vase-trio",
    name: "Ceramic Vase Trio in Matte Ivory",
    brand: "Empower Studio",
    image: imageFor("ceramic-vase-trio"),
    price: 2499,
    wasPrice: 3999,
    rating: 4.2,
    ratingCount: 54,
    path: "/decor/accents/vases",
  },
]

const catalogSeed: Omit<CatalogProduct, "id">[] = [
  ...editorial,
  ...makeSofaVariants(),
]

export const mockCatalog: CatalogProduct[] = CatalogProductSchema.array().parse(
  catalogSeed.map((product) => ({ ...product, id: `cat-${product.slug}` })),
)