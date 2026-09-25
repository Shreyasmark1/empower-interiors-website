"use server"

import { and, asc, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { variants } from "@/db/schema";
import { ApiError } from "@/lib/api/http";
import { isUniqueViolation, pickDefined } from "@/lib/api/request";
import {
  VariantCreateSchema,
  VariantUpdateSchema,
} from "@/lib/schemas/api/variant";

export type VariantCreate = z.infer<typeof VariantCreateSchema>;
export type VariantUpdate = z.infer<typeof VariantUpdateSchema>;

export async function listVariants(query: {
  limit: number;
  offset: number;
  includeDeleted: boolean;
  productId?: number | null;
}): Promise<typeof variants.$inferSelect[]> {
  const { limit, offset, includeDeleted, productId = null } = query;

  const conditions = [];
  if (productId !== null) {
    conditions.push(eq(variants.productId, productId));
  }
  if (!includeDeleted) {
    conditions.push(eq(variants.isDeleted, false));
  }

  return db
    .select()
    .from(variants)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(asc(variants.sortOrder), asc(variants.id))
    .limit(limit)
    .offset(offset);
}

export async function getVariantById(id: number) {
  const [row] = await db
    .select()
    .from(variants)
    .where(and(eq(variants.id, id), eq(variants.isDeleted, false)))
    .limit(1);
  if (!row) {
    throw new ApiError(404, "Variant not found");
  }
  return row;
}

export async function createVariant(values: VariantCreate) {
  try {
    const [row] = await db.insert(variants).values(values).returning();
    return row;
  } catch (error) {
    if (isUniqueViolation(error)) {
      throw new ApiError(409, "Variant with this name already exists");
    }
    throw error;
  }
}

export async function updateVariant(
  id: number,
  values: Omit<VariantUpdate, "id">,
) {
  const [row] = await db
    .update(variants)
    .set({ ...pickDefined(values), updatedAt: new Date() })
    .where(and(eq(variants.id, id), eq(variants.isDeleted, false)))
    .returning();
  if (!row) {
    throw new ApiError(404, "Variant not found");
  }
  return row;
}

export async function softDeleteVariant(id: number) {
  const [row] = await db
    .update(variants)
    .set({ isDeleted: true, updatedAt: new Date() })
    .where(eq(variants.id, id))
    .returning();
  if (!row) {
    throw new ApiError(404, "Variant not found");
  }
  return row;
}
