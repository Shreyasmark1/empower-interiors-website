import { z } from "zod";

export const FilterOptionSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
  count: z.number().int().nonnegative(),
  swatch: z.string().optional(),
});

export type FilterOption = z.infer<typeof FilterOptionSchema>;

export const FilterGroupSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  inputType: z.enum(["checkbox", "color-swatch"]),
  searchable: z.boolean().default(false),
  options: z.array(FilterOptionSchema),
});

export type FilterGroup = z.infer<typeof FilterGroupSchema>;

export const SortOptionSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
});

export type SortOption = z.infer<typeof SortOptionSchema>;

export const FilterSelectionsSchema = z.record(
  z.string(),
  z.array(z.string()),
);

export type FilterSelections = z.infer<typeof FilterSelectionsSchema>;