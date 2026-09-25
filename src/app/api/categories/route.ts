import type { NextRequest } from "next/server";

import { ApiError, handleErrors, ok } from "@/lib/api/http";
import { pickDefined, readJsonBody } from "@/lib/api/request";
import { requireAuth } from "@/lib/auth";
import {
  firstIssueMessage,
  listQuerySchema,
} from "@/lib/schemas/api/common";
import {
  CategoryCreateSchema,
  CategoryUpdateSchema,
} from "@/lib/schemas/api/category";
import * as queries from "@/lib/queries/categories";

export async function GET(request: NextRequest) {
  return handleErrors(() => _categories(request));
}

export async function POST(request: NextRequest) {
  return handleErrors(() => _postCategories(request));
}

async function _categories(request: NextRequest) {
  const parsed = listQuerySchema.safeParse(
    Object.fromEntries(request.nextUrl.searchParams),
  );
  if (!parsed.success) {
    throw new ApiError(400, firstIssueMessage(parsed.error));
  }
  const { limit, offset, includeDeleted } = parsed.data;
  const items = await queries.listCategories({ limit, offset, includeDeleted });
  return ok({ items });
}

async function _postCategories(request: NextRequest) {
  requireAuth(request);

  const body = (await readJsonBody(request)) as Record<string, unknown>;
  const isUpdate = typeof body.id === "number" || typeof body.id === "string";

  if (isUpdate) {
    const parsed = CategoryUpdateSchema.safeParse(body);
    if (!parsed.success) {
      throw new ApiError(400, firstIssueMessage(parsed.error));
    }
    const { id, ...values } = parsed.data;
    const row = await queries.updateCategory(id, pickDefined(values));
    return ok(row);
  }

  const parsed = CategoryCreateSchema.safeParse(body);
  if (!parsed.success) {
    throw new ApiError(400, firstIssueMessage(parsed.error));
  }
  const row = await queries.createCategory(parsed.data);
  return ok(row, 201);
}
