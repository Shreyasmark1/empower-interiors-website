import { and, eq } from "drizzle-orm";
import type { NextRequest } from "next/server";

import { db } from "@/db";
import { productCategories } from "@/db/schema";
import { ApiError, handleErrors, ok } from "@/lib/api/http";
import { readJsonBody } from "@/lib/api/request";
import { requireAuth } from "@/lib/auth";
import { firstIssueMessage } from "@/lib/schemas/api/common";
import {
  ProductCategorySetSchema,
  productCategoryQuerySchema,
} from "@/lib/schemas/api/product-category";

export async function GET(request: NextRequest) {
  return handleErrors(() => _getProductCategories(request));
}

export async function POST(request: NextRequest) {
  return handleErrors(() => _postProductCategories(request));
}

async function _getProductCategories(request: NextRequest) {
  const query = Object.fromEntries(request.nextUrl.searchParams);
  const parsed = productCategoryQuerySchema.safeParse(query);
  if (!parsed.success) {
    throw new ApiError(400, firstIssueMessage(parsed.error));
  }
  const { productId, categoryId } = parsed.data;

  const conditions = [];
  if (productId !== undefined) {
    conditions.push(eq(productCategories.productId, productId));
  }
  if (categoryId !== undefined) {
    conditions.push(eq(productCategories.categoryId, categoryId));
  }

  const items = await db
    .select()
    .from(productCategories)
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  return ok({ items });
}

async function _postProductCategories(request: NextRequest) {
  requireAuth(request);

  const body = (await readJsonBody(request)) as Record<string, unknown>;
  const parsed = ProductCategorySetSchema.safeParse(body);
  if (!parsed.success) {
    throw new ApiError(400, firstIssueMessage(parsed.error));
  }
  const { productId, categoryIds } = parsed.data;

  await db.transaction(async (tx) => {
    await tx
      .delete(productCategories)
      .where(eq(productCategories.productId, productId));
    if (categoryIds.length > 0) {
      await tx.insert(productCategories).values(
        categoryIds.map((categoryId) => ({ productId, categoryId })),
      );
    }
  });

  const items = await db
    .select()
    .from(productCategories)
    .where(eq(productCategories.productId, productId));

  return ok({ items });
}