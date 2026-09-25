"use server"

import { and, asc, eq, isNull } from "drizzle-orm";

import { db } from "@/db";
import { categories } from "@/db/schema";
import { ApiError } from "@/lib/api/http";
import { isUniqueViolation, pickDefined } from "@/lib/api/request";

export interface CategoryListOptions {
  limit?: number;
  offset?: number;
  includeDeleted?: boolean;
}

export async function listCategories(
  options: CategoryListOptions = {},
): Promise<typeof categories.$inferSelect[]> {
  const { limit = 20, offset = 0, includeDeleted = false } = options;

  return db
    .select()
    .from(categories)
    .where(includeDeleted ? undefined : eq(categories.isDeleted, false))
    .orderBy(asc(categories.sortOrder), asc(categories.id))
    .limit(limit)
    .offset(offset);
}

const visibleCategory = and(
  eq(categories.isDeleted, false),
  eq(categories.isActive, true),
);

const categoryOrderBy = [asc(categories.sortOrder), asc(categories.id)];

export async function getCategoryTree() {
  return db.query.categories.findMany({
    where: and(isNull(categories.parentId), visibleCategory),
    orderBy: categoryOrderBy,
    with: {
      children: {
        where: visibleCategory,
        orderBy: categoryOrderBy,
        with: {
          children: {
            where: visibleCategory,
            orderBy: categoryOrderBy,
          },
        },
      },
    },
  });
}

export async function getCategoryById(id: number) {
  const [row] = await db
    .select()
    .from(categories)
    .where(and(eq(categories.id, id), eq(categories.isDeleted, false)))
    .limit(1);
  if (!row) {
    throw new ApiError(404, "Category not found");
  }
  return row;
}

export async function createCategory(values: typeof categories.$inferInsert) {
  try {
    const [row] = await db.insert(categories).values(values).returning();
    return row;
  } catch (error) {
    if (isUniqueViolation(error)) {
      throw new ApiError(409, "Category with this slug already exists");
    }
    throw error;
  }
}

export async function updateCategory(
  id: number,
  values: { parentId?: number | null; name?: string; slug?: string; description?: string | null; image?: string | null; sortOrder?: number; isActive?: boolean; isDeleted?: boolean },
) {
  const [row] = await db
    .update(categories)
    .set({ ...pickDefined(values), updatedAt: new Date() })
    .where(eq(categories.id, id))
    .returning();
  if (!row) {
    throw new ApiError(404, "Category not found");
  }
  return row;
}

export async function softDeleteCategory(id: number) {
  const [row] = await db
    .update(categories)
    .set({ isDeleted: true, updatedAt: new Date() })
    .where(eq(categories.id, id))
    .returning();
  if (!row) {
    throw new ApiError(404, "Category not found");
  }
  return row;
}
