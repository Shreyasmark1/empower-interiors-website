import { and, asc, eq } from "drizzle-orm";

import { db } from "@/db";
import { productCategories, products } from "@/db/schema";
import { ApiError } from "@/lib/api/http";
import { isUniqueViolation, pickDefined } from "@/lib/api/request";

export interface ProductListOptions {
  limit?: number;
  offset?: number;
  includeDeleted?: boolean;
}

export async function listProducts(options: ProductListOptions = {}) {
  const { limit = 20, offset = 0, includeDeleted = false } = options;

  return db
    .select()
    .from(products)
    .where(includeDeleted ? undefined : eq(products.isDeleted, false))
    .orderBy(asc(products.slug))
    .limit(limit)
    .offset(offset);
}

export async function getProductDetail(productId: number) {
  const row = await db.query.products.findFirst({
    where: and(eq(products.id, productId), eq(products.isDeleted, false)),
    with: {
      variants: { where: (variants, { eq }) => eq(variants.isDeleted, false)}, 
      categoryLinks: { with: { category: true } },
    },
  });  if (!row) {
    throw new ApiError(404, "Product not found");
  }

  return { ...row, categories: row.categoryLinks.map((l) => l.category) };
}

export async function createProduct(
  values: typeof products.$inferInsert & { categoryIds?: number[] },
) {
  try {
    const row = await db.transaction(async (tx) => {
      const [created] = await tx.insert(products).values(values).returning();
      await replaceCategories(tx, created.id, values.categoryIds ?? []);
      return created;
    });
    return row;
  } catch (error) {
    if (isUniqueViolation(error)) {
      throw new ApiError(409, "Product with this slug already exists");
    }
    throw error;
  }
}

export async function updateProduct(
  id: number,
  values: Partial<typeof products.$inferInsert>,
  categoryIds: number[],
) {
  try {
    const row = await db.transaction(async (tx) => {
      const [updated] = await tx
        .update(products)
        .set({ ...pickDefined(values), updatedAt: new Date() })
        .where(eq(products.id, id))
        .returning();
      if (!updated) {
        throw new ApiError(404, "Product not found");
      }
      await replaceCategories(tx, id, categoryIds);
      return updated;
    });
    return row;
  } catch (error) {
    if (isUniqueViolation(error)) {
      throw new ApiError(409, "Product with this slug already exists");
    }
    throw error;
  }
}

export async function softDeleteProduct(id: number) {
  const [row] = await db
    .update(products)
    .set({ isDeleted: true, updatedAt: new Date() })
    .where(eq(products.id, id))
    .returning();
  if (!row) {
    throw new ApiError(404, "Product not found");
  }
  return row;
}

async function replaceCategories(
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  productId: number,
  categoryIds: number[],
) {
  await tx
    .delete(productCategories)
    .where(eq(productCategories.productId, productId));
  if (categoryIds.length === 0) return;
  await tx.insert(productCategories).values(
    categoryIds.map((categoryId) => ({ productId, categoryId })),
  );
}
