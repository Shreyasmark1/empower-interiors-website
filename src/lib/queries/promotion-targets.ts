"use server"

import { and, asc, eq } from "drizzle-orm";

import { db } from "@/db";
import { promotionTargets } from "@/db/schema";
import { ApiError } from "@/lib/api/http";
import { isUniqueViolation, pickDefined } from "@/lib/api/request";

export interface PromotionTargetListOptions {
  limit?: number;
  offset?: number;
  includeDeleted?: boolean;
  promotionId?: number | null;
  categoryId?: number | null;
  productId?: number | null;
}

export async function listPromotionTargets(
  options: PromotionTargetListOptions = {},
): Promise<typeof promotionTargets.$inferSelect[]> {
  const {
    limit = 20,
    offset = 0,
    includeDeleted = false,
    promotionId = null,
    categoryId = null,
    productId = null,
  } = options;

  const conditions = [];
  if (promotionId !== null) {
    conditions.push(eq(promotionTargets.promotionId, promotionId));
  }
  if (categoryId !== null) {
    conditions.push(eq(promotionTargets.categoryId, categoryId));
  }
  if (productId !== null) {
    conditions.push(eq(promotionTargets.productId, productId));
  }
  if (!includeDeleted) {
    conditions.push(eq(promotionTargets.isDeleted, false));
  }

  return db
    .select()
    .from(promotionTargets)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(asc(promotionTargets.sortOrder), asc(promotionTargets.id))
    .limit(limit)
    .offset(offset);
}

export async function getPromotionTargetById(id: number) {
  const row = await db.query.promotionTargets.findFirst({
    where: (targets, { and, eq }) =>
      and(eq(targets.id, id), eq(targets.isDeleted, false)),
  });
  if (!row) {
    throw new ApiError(404, "Promotion target not found");
  }
  return row;
}

export async function createPromotionTarget(
  values: typeof promotionTargets.$inferInsert,
) {
  try {
    const [row] = await db.insert(promotionTargets).values(values).returning();
    return row;
  } catch (error) {
    if (isUniqueViolation(error)) {
      throw new ApiError(409, "Promotion target already exists");
    }
    throw error;
  }
}

export async function updatePromotionTarget(
  id: number,
  values: { promotionId?: number; targetType?: "homepage" | "category" | "product"; categoryId?: number | null; productId?: number | null; placement?: "hero" | "banner" | "section"; sortOrder?: number; isDeleted?: boolean },
) {
  const [row] = await db
    .update(promotionTargets)
    .set(pickDefined(values))
    .where(eq(promotionTargets.id, id))
    .returning();
  if (!row) {
    throw new ApiError(404, "Promotion target not found");
  }
  return row;
}

export async function softDeletePromotionTarget(id: number) {
  const [row] = await db
    .update(promotionTargets)
    .set({ isDeleted: true })
    .where(eq(promotionTargets.id, id))
    .returning();
  if (!row) {
    throw new ApiError(404, "Promotion target not found");
  }
  return row;
}
