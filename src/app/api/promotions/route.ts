import type { NextRequest } from "next/server";

import { ApiError, handleErrors, ok } from "@/lib/api/http";
import { pickDefined, readJsonBody } from "@/lib/api/request";
import { requireAuth } from "@/lib/auth";
import {
  firstIssueMessage,
  listQuerySchema,
} from "@/lib/schemas/api/common";
import {
  PromotionCreateSchema,
  PromotionUpdateSchema,
} from "@/lib/schemas/api/promotion";
import * as queries from "@/lib/queries/promotions";

export async function GET(request: NextRequest) {
  return handleErrors(() => _promotions(request));
}

export async function POST(request: NextRequest) {
  return handleErrors(() => _postPromotions(request));
}

async function _promotions(request: NextRequest) {
  const parsed = listQuerySchema.safeParse(
    Object.fromEntries(request.nextUrl.searchParams),
  );
  if (!parsed.success) {
    throw new ApiError(400, firstIssueMessage(parsed.error));
  }
  const { limit, offset, includeDeleted } = parsed.data;
  const items = await queries.listPromotions({ limit, offset, includeDeleted });
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
    const row = await queries.updatePromotion(id, pickDefined(values));
    return ok(row);
  }

  const parsed = PromotionCreateSchema.safeParse(body);
  if (!parsed.success) {
    throw new ApiError(400, firstIssueMessage(parsed.error));
  }
  const row = await queries.createPromotion(parsed.data);
  return ok(row, 201);
}
