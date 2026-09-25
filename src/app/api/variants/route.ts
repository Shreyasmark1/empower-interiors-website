import type { NextRequest } from "next/server";

import { ApiError, handleErrors, ok } from "@/lib/api/http";
import { pickDefined, readJsonBody } from "@/lib/api/request";
import { requireAuth } from "@/lib/auth";
import {
  firstIssueMessage,
  listQuerySchema,
} from "@/lib/schemas/api/common";
import {
  VariantCreateSchema,
  VariantUpdateSchema,
} from "@/lib/schemas/api/variant";
import * as queries from "@/lib/queries/variants";

export async function GET(request: NextRequest) {
  return handleErrors(() => _getVariants(request));
}

export async function POST(request: NextRequest) {
  return handleErrors(() => _postVariants(request));
}

async function _getVariants(request: NextRequest) {
  const query = Object.fromEntries(request.nextUrl.searchParams);

  const filters: { productId?: number } = {};
  if (query.productId !== undefined) {
    filters.productId = Number(query.productId);
  }

  const parsed = listQuerySchema.safeParse(query);
  if (!parsed.success) {
    throw new ApiError(400, firstIssueMessage(parsed.error));
  }
  const { limit, offset, includeDeleted } = parsed.data;
  const items = await queries.listVariants({
    limit,
    offset,
    includeDeleted,
    productId: filters.productId ?? null,
  });
  return ok({ items });
}

async function _postVariants(request: NextRequest) {
  requireAuth(request);

  const body = (await readJsonBody(request)) as Record<string, unknown>;
  const isUpdate = typeof body.id === "number" || typeof body.id === "string";

  if (isUpdate) {
    const parsed = VariantUpdateSchema.safeParse(body);
    if (!parsed.success) {
      throw new ApiError(400, firstIssueMessage(parsed.error));
    }
    const { id, ...values } = parsed.data;
    const row = await queries.updateVariant(id, pickDefined(values));
    return ok(row);
  }

  const parsed = VariantCreateSchema.safeParse(body);
  if (!parsed.success) {
    throw new ApiError(400, firstIssueMessage(parsed.error));
  }
  const row = await queries.createVariant(parsed.data);
  return ok(row, 201);
}
