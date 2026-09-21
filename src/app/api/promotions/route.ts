import { asc, eq } from "drizzle-orm";
import type { NextRequest } from "next/server";

import { db } from "@/db";
import { promotions } from "@/db/schema";
import { ApiError, handleErrors, ok } from "@/lib/api/http";
import {
  pickDefined,
  readJsonBody,
} from "@/lib/api/request";
import { requireAuth } from "@/lib/auth";
import {
  firstIssueMessage,
  listQuerySchema,
} from "@/lib/schemas/api/common";
import {
  PromotionCreateSchema,
  PromotionUpdateSchema,
} from "@/lib/schemas/api/promotion";

export async function GET(request: NextRequest) {
  return handleErrors(() => _getPromotions(request));
}

export async function POST(request: NextRequest) {
  return handleErrors(() => _postPromotions(request));
}

async function _getPromotions(request: NextRequest) {
  const parsed = listQuerySchema.safeParse(
    Object.fromEntries(request.nextUrl.searchParams),
  );
  if (!parsed.success) {
    throw new ApiError(400, firstIssueMessage(parsed.error));
  }
  const { limit, offset } = parsed.data;

  const items = await db
    .select()
    .from(promotions)
    .orderBy(asc(promotions.sortOrder), asc(promotions.id))
    .limit(limit)
    .offset(offset);

  return ok({ items });
}

async function _postPromotions(request: NextRequest) {
  requireAuth(request);

  const body = (await readJsonBody(request)) as Record<string, unknown>;
  const isUpdate = typeof body.id === "number" || typeof body.id === "string";

  if (isUpdate) {
    const parsed = PromotionUpdateSchema.safeParse(body);
    if (!parsed.success) {
      throw new ApiError(400, firstIssueMessage(parsed.error));
    }
    const { id, ...values } = parsed.data;
    const [row] = await db
      .update(promotions)
      .set({ ...pickDefined(values), updatedAt: new Date() })
      .where(eq(promotions.id, id))
      .returning();
    if (!row) {
      throw new ApiError(404, "Promotion not found");
    }
    return ok(row);
  }

  const parsed = PromotionCreateSchema.safeParse(body);
  if (!parsed.success) {
    throw new ApiError(400, firstIssueMessage(parsed.error));
  }
  const [row] = await db.insert(promotions).values(parsed.data).returning();
  return ok(row, 201);
}