import { z } from "zod";

import {
  type Category,
  CategorySchema,
} from "@/lib/schemas";
import { apiGet } from "@/lib/api/client";

const categoryListSchema = z.object({ items: z.array(CategorySchema) });

export type CategoryListOptions = {
  limit?: number;
  offset?: number;
};

export const categoryService = {
  async getCategories(options: CategoryListOptions = {}): Promise<Category[]> {
    const { limit, offset } = options;
    const { items } = categoryListSchema.parse(
      await apiGet<unknown>("/api/categories", { query: { limit, offset } }),
    );
    return items;
  },

  async getCategoryById(id: number | string): Promise<Category> {
    return CategorySchema.parse(
      await apiGet<unknown>(`/api/categories/${encodeURIComponent(String(id))}`),
    );
  },
};