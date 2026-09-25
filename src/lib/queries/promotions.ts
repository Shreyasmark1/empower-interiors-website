"use server"

import { asc, eq } from "drizzle-orm";

import { db } from "@/db";
import { promotions } from "@/db/schema";
import { ApiError } from "@/lib/api/http";
import { isUniqueViolation, pickDefined } from "@/lib/api/request";

export interface PromotionListOptions {
  limit?: number;
  offset?: number;
  includeDeleted?: boolean;
}

export async function listPromotions(
  options: PromotionListOptions = {},
): Promise<typeof promotions.$inferSelect[]> {
  const { limit = 20, offset = 0, includeDeleted = false } = options;

  return db
    .select()
    .from(promotions)
    .where(includeDeleted ? undefined : eq(promotions.isDeleted, false))
    .orderBy(asc(promotions.sortOrder), asc(promotions.id))
    .limit(limit)
    .offset(offset);
}

export async function getPromotionById(id: number) {
  const row = await db.query.promotions.findFirst({
    where: (promotions, { and, eq }) =>
      and(eq(promotions.id, id), eq(promotions.isDeleted, false)),
    with: { targets: { where: (targets, { eq }) => eq(targets.isDeleted, false) } },
  });
  if (!row) {
    throw new ApiError(404, "Promotion not found");
  }
  return row;
}

export async function createPromotion(values: typeof promotions.$inferInsert) {
  try {
    const [row] = await db.insert(promotions).values(values).returning();
    return row;
  } catch (error) {
    if (isUniqueViolation(error)) {
      throw new ApiError(409, "Promotion with this name already exists");
    }
    throw error;
  }
}

export async function updatePromotion(
  id: number,
  values: { name?: string; title?: string | null; description?: string | null; image?: string | null; mobileImage?: string | null; linkUrl?: string | null; buttonText?: string | null; badgeText?: string | null; startsAt?: Date | null; endsAt?: Date | null; isActive?: boolean; sortOrder?: number; isDeleted?: boolean },
) {
  const [row] = await db
    .update(promotions)
    .set({ ...pickDefined(values), updatedAt: new Date() })
    .where(eq(promotions.id, id))
    .returning();
  if (!row) {
    throw new ApiError(404, "Promotion not found");
  }
  return row;
}

export async function softDeletePromotion(id: number) {
  const [row] = await db
    .update(promotions)
    .set({ isDeleted: true, updatedAt: new Date() })
    .where(eq(promotions.id, id))
    .returning();
  if (!row) {
    throw new ApiError(404, "Promotion not found");
  }
  return row;
}
