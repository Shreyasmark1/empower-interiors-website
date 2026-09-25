import type { NextRequest } from "next/server";

import { ApiError, handleErrors, ok } from "@/lib/api/http";
import { pickDefined, readJsonBody } from "@/lib/api/request";
import { requireAuth } from "@/lib/auth";
import {
  firstIssueMessage,
  listQuerySchema,
} from "@/lib/schemas/api/common";
import {
  ProductCreateSchema,
  ProductUpdateSchema,
} from "@/lib/schemas/api/product";
import * as queries from "@/lib/queries/products";

export async function GET(request: NextRequest) {
  return handleErrors(() => _getProducts(request));
}

export async function POST(request: NextRequest) {
  return handleErrors(() => _postProducts(request));
}

async function _getProducts(request: NextRequest) {
  const parsed = listQuerySchema.safeParse(
    Object.fromEntries(request.nextUrl.searchParams),
  );
  if (!parsed.success) {
    throw new ApiError(400, firstIssueMessage(parsed.error));
  }
  const { limit, offset, includeDeleted } = parsed.data;
  const items = await queries.listProducts({ limit, offset, includeDeleted });
  return ok({ items });
}

async function _postProducts(request: NextRequest) {
  requireAuth(request);

  const body = (await readJsonBody(request)) as Record<string, unknown>;
  const isUpdate = typeof body.id === "number" || typeof body.id === "string";

  if (isUpdate) {
    const parsed = ProductUpdateSchema.safeParse(body);
    if (!parsed.success) {
      throw new ApiError(400, firstIssueMessage(parsed.error));
    }
    const { id, categoryIds, ...values } = parsed.data;
    const row = await queries.updateProduct(
      id,
      pickDefined(values),
      categoryIds ?? [],
    );
    return ok(row);
  }

  const parsed = ProductCreateSchema.safeParse(body);
  if (!parsed.success) {
    throw new ApiError(400, firstIssueMessage(parsed.error));
  }
  const row = await queries.createProduct(parsed.data);
  return ok(row, 201);
}
