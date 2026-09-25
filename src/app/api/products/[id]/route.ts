import type { NextRequest } from "next/server";

import { ApiError, handleErrors, ok } from "@/lib/api/http";
import { pickDefined, readJsonBody } from "@/lib/api/request";
import { requireAuth } from "@/lib/auth";
import {
  entityIdSchema,
  firstIssueMessage,
} from "@/lib/schemas/api/common";
import { ProductUpdateSchema } from "@/lib/schemas/api/product";
import * as queries from "@/lib/queries/products";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return handleErrors(() => _getProductById(params));
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return handleErrors(() => _postProductById(request, params));
}

async function _getProductById(params: Promise<{ id: string }>) {
  const { id: rawId } = await params;
  const id = entityIdSchema.safeParse(rawId);
  if (!id.success) {
    throw new ApiError(400, firstIssueMessage(id.error));
  }

  const row = await queries.getProductDetail(id.data);
  if (!row) {
    throw new ApiError(404, "Product not found");
  }
  return ok(row);
}

async function _postProductById(
  request: NextRequest,
  params: Promise<{ id: string }>,
) {
  requireAuth(request);

  const { id: rawId } = await params;
  const id = entityIdSchema.safeParse(rawId);
  if (!id.success) {
    throw new ApiError(400, firstIssueMessage(id.error));
  }

  const body = (await readJsonBody(request)) as Record<string, unknown>;
  if (body.isDeleted === true) {
    const row = await queries.softDeleteProduct(id.data);
    return ok(row);
  }

  const parsed = ProductUpdateSchema.safeParse(body);
  if (!parsed.success) {
    throw new ApiError(400, firstIssueMessage(parsed.error));
  }
  const { categoryIds, ...values } = parsed.data;
  const row = await queries.updateProduct(
    id.data,
    pickDefined(values),
    categoryIds ?? [],
  );
  return ok(row, 200);
}
