import type { NextRequest } from "next/server";

import { ApiError, handleErrors, ok } from "@/lib/api/http";
import { pickDefined, readJsonBody } from "@/lib/api/request";
import { requireAuth } from "@/lib/auth";
import {
  firstIssueMessage,
  listQuerySchema,
} from "@/lib/schemas/api/common";
import {
  PromotionTargetCreateSchema,
  PromotionTargetUpdateSchema,
} from "@/lib/schemas/api/promotion-target";
import * as queries from "@/lib/queries/promotion-targets";

export async function GET(request: NextRequest) {
  return handleErrors(() => _promotionTargets(request));
}

export async function POST(request: NextRequest) {
  return handleErrors(() => _postPromotionTargets(request));
}

async function _promotionTargets(request: NextRequest) {
  const query = Object.fromEntries(request.nextUrl.searchParams);

  const filters: { promotionId?: number } = {};
  for (const key of ["promotionId"] as const) {
    if (query[key] !== undefined) {
      filters[key] = Number(query[key]);
    }
  }

  const parsed = listQuerySchema.safeParse(query);
  if (!parsed.success) {
    throw new ApiError(400, firstIssueMessage(parsed.error));
  }
  const { limit, offset, includeDeleted } = parsed.data;
  const items = await queries.listPromotionTargets({
    limit,
    offset,
    includeDeleted,
    promotionId: filters.promotionId,
  });
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
    const row = await queries.updatePromotionTarget(id, pickDefined(values));
    return ok(row);
  }

  const parsed = PromotionTargetCreateSchema.safeParse(body);
  if (!parsed.success) {
    throw new ApiError(400, firstIssueMessage(parsed.error));
  }
  const row = await queries.createPromotionTarget(parsed.data);
  return ok(row, 201);
}
