import {
  FilterGroupSchema,
  FilterSelectionsSchema,
  SortOptionSchema,
  type FilterGroup,
  type FilterSelections,
  type SortOption,
} from "@/lib/schemas/filter";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const filterGroupsSeed: FilterGroup[] = [
  {
    key: "color",
    label: "Color",
    inputType: "color-swatch",
    searchable: false,
    options: [
      { value: "teal", label: "Teal Blue", count: 128, swatch: "#0f766e" },
      { value: "rust", label: "Rust", count: 96, swatch: "#c2410c" },
      { value: "charcoal", label: "Charcoal", count: 204, swatch: "#374151" },
      { value: "moss", label: "Moss", count: 61, swatch: "#3f6212" },
      { value: "blush", label: "Blush", count: 87, swatch: "#be185d" },
      { value: "beige", label: "Beige", count: 154, swatch: "#d6c7b0" },
      { value: "slate", label: "Slate", count: 72, swatch: "#475569" },
      { value: "ochre", label: "Ochre", count: 55, swatch: "#b45309" },
    ],
  },
  {
    key: "brand",
    label: "Brand",
    inputType: "checkbox",
    searchable: true,
    options: [
      { value: "casacraft", label: "Casacraft from Pepperfry", count: 526 },
      { value: "woodsworth", label: "Woodsworth", count: 348 },
      { value: "slumberland", label: "Slumberland", count: 172 },
      { value: "empower-studio", label: "Empower Studio", count: 94 },
      { value: "urban-cottage", label: "Urban Cottage", count: 63 },
      { value: "amalfi", label: "Amalfi", count: 41 },
    ],
  },
  {
    key: "country",
    label: "Country of Origin",
    inputType: "checkbox",
    searchable: true,
    options: [
      { value: "india", label: "India", count: 618 },
      { value: "italy", label: "Italy", count: 86 },
      { value: "indonesia", label: "Indonesia", count: 129 },
      { value: "vietnam", label: "Vietnam", count: 104 },
      { value: "china", label: "China", count: 77 },
      { value: "denmark", label: "Denmark", count: 32 },
    ],
  },
];

const sortOptionsSeed: SortOption[] = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest Arrival" },
];

let filterGroupsCache: FilterGroup[] | null = null;
let sortOptionsCache: SortOption[] | null = null;

export const filterService = {
  async getFilterGroups(): Promise<FilterGroup[]> {
    if (filterGroupsCache) {
      return filterGroupsCache;
    }

    await delay(150);

    filterGroupsCache = FilterGroupSchema.array().parse(filterGroupsSeed);
    return filterGroupsCache;
  },

  async getSortOptions(): Promise<SortOption[]> {
    if (sortOptionsCache) {
      return sortOptionsCache;
    }

    await delay(150);

    sortOptionsCache = SortOptionSchema.array().parse(sortOptionsSeed);
    return sortOptionsCache;
  },

  async getSortLabel(value: string): Promise<string> {
    const options = await this.getSortOptions();
    return options.find((option) => option.value === value)?.label ?? value;
  },
};

export function countSelectedSelections(
  selections: FilterSelections,
): number {
  return Object.values(FilterSelectionsSchema.parse(selections)).reduce(
    (total, values) => total + values.length,
    0,
  );
}