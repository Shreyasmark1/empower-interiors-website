import { and, asc, eq } from "drizzle-orm";
import type { NextRequest } from "next/server";

import { db } from "@/db";
import { promotionTargets } from "@/db/schema";
import { ApiError, handleErrors, ok } from "@/lib/api/http";
import {
  pickDefined,
  readJsonBody,
} from "@/lib/api/request";
import { requireAuth } from "@/lib/auth";
import {
  entityIdSchema,
  firstIssueMessage,
  listQuerySchema,
} from "@/lib/schemas/api/common";
import {
  PromotionTargetCreateSchema,
  PromotionTargetUpdateSchema,
} from "@/lib/schemas/api/promotion-target";

export async function GET(request: NextRequest) {
  return handleErrors(() => _getPromotionTargets(request));
}

export async function POST(request: NextRequest) {
  return handleErrors(() => _postPromotionTargets(request));
}

async function _getPromotionTargets(request: NextRequest) {
  const query = Object.fromEntries(request.nextUrl.searchParams);

  const listQuery = listQuerySchema.safeParse(query);
  if (!listQuery.success) {
    throw new ApiError(400, firstIssueMessage(listQuery.error));
  }
  const { limit, offset, includeDeleted } = listQuery.data;

  const conditions = [];
  for (const key of ["promotionId", "categoryId", "productId"] as const) {
    if (query[key] === undefined) continue;
    const parsed = entityIdSchema.safeParse(query[key]);
    if (!parsed.success) {
      throw new ApiError(400, firstIssueMessage(parsed.error));
    }
    conditions.push(eq(promotionTargets[key], parsed.data));
  }
  if (!includeDeleted) {
    conditions.push(eq(promotionTargets.isDeleted, false));
  }

  const items = await db
    .select()
    .from(promotionTargets)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(asc(promotionTargets.sortOrder), asc(promotionTargets.id))
    .limit(limit)
    .offset(offset);

  return ok({ items });
}

async function _postPromotionTargets(request: NextRequest) {
  requireAuth(request);

  const body = (await readJsonBody(request)) as Record<string, unknown>;
  const isUpdate = typeof body.id === "number" || typeof body.id === "string";

  if (isUpdate) {
    const parsed = PromotionTargetUpdateSchema.safeParse(body);
    if (!parsed.success) {
      throw new ApiError(400, firstIssueMessage(parsed.error));
    }
    const { id, ...values } = parsed.data;
    const [row] = await db
      .update(promotionTargets)
      .set(pickDefined(values))
      .where(eq(promotionTargets.id, id))
      .returning();
    if (!row) {
      throw new ApiError(404, "Promotion target not found");
    }
    return ok(row);
  }

  const parsed = PromotionTargetCreateSchema.safeParse(body);
  if (!parsed.success) {
    throw new ApiError(400, firstIssueMessage(parsed.error));
  }
  const [row] = await db
    .insert(promotionTargets)
    .values(parsed.data)
    .returning();
  return ok(row, 201);
}