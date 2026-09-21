import { asc, eq } from "drizzle-orm";
import type { NextRequest } from "next/server";

import { db } from "@/db";
import { variants } from "@/db/schema";
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
  VariantCreateSchema,
  VariantUpdateSchema,
} from "@/lib/schemas/api/variant";

export async function GET(request: NextRequest) {
  return handleErrors(() => _getVariants(request));
}

export async function POST(request: NextRequest) {
  return handleErrors(() => _postVariants(request));
}

async function _getVariants(request: NextRequest) {
  const query = Object.fromEntries(request.nextUrl.searchParams);
  const parsed = listQuerySchema.safeParse(query);
  if (!parsed.success) {
    throw new ApiError(400, firstIssueMessage(parsed.error));
  }
  const { limit, offset } = parsed.data;

  let productId: number | null = null;
  if (query.productId !== undefined) {
    const parsed = entityIdSchema.safeParse(query.productId);
    if (!parsed.success) {
      throw new ApiError(400, firstIssueMessage(parsed.error));
    }
    productId = parsed.data;
  }

  const items = await db
    .select()
    .from(variants)
    .where(
      productId !== null ? eq(variants.productId, productId) : undefined,
    )
    .orderBy(asc(variants.sortOrder), asc(variants.id))
    .limit(limit)
    .offset(offset);

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
    const [row] = await db
      .update(variants)
      .set({ ...pickDefined(values), updatedAt: new Date() })
      .where(eq(variants.id, id))
      .returning();
    if (!row) {
      throw new ApiError(404, "Variant not found");
    }
    return ok(row);
  }

  const parsed = VariantCreateSchema.safeParse(body);
  if (!parsed.success) {
    throw new ApiError(400, firstIssueMessage(parsed.error));
  }
  const [row] = await db.insert(variants).values(parsed.data).returning();
  return ok(row, 201);
}