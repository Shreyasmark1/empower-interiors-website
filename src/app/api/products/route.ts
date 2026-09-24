import { asc, eq } from "drizzle-orm";
import type { NextRequest } from "next/server";

import { db } from "@/db";
import { productCategories, products } from "@/db/schema";
import { ApiError, handleErrors, ok } from "@/lib/api/http";
import {
  isUniqueViolation,
  pickDefined,
  readJsonBody,
} from "@/lib/api/request";
import { requireAuth } from "@/lib/auth";
import {
  firstIssueMessage,
  listQuerySchema,
} from "@/lib/schemas/api/common";
import {
  ProductCreateSchema,
  ProductUpdateSchema,
} from "@/lib/schemas/api/product";

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

  const items = await db
    .select()
    .from(products)
    .where(includeDeleted ? undefined : eq(products.isDeleted, false))
    .orderBy(asc(products.id))
    .limit(limit)
    .offset(offset);

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
    try {
      const row = await db.transaction(async (tx) => {
        const [updated] = await tx
          .update(products)
          .set({ ...pickDefined(values), updatedAt: new Date() })
          .where(eq(products.id, id))
          .returning();
        if (!updated) {
          throw new ApiError(404, "Product not found");
        }
        await replaceCategories(tx, updated.id, categoryIds ?? []);
        return updated;
      });
      return ok(row);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      if (isUniqueViolation(error)) {
        throw new ApiError(409, "Product with this slug already exists");
      }
      throw error;
    }
  }

  const parsed = ProductCreateSchema.safeParse(body);
  if (!parsed.success) {
    throw new ApiError(400, firstIssueMessage(parsed.error));
  }
  try {
    const row = await db.transaction(async (tx) => {
      const [created] = await tx.insert(products).values(parsed.data).returning();
      await replaceCategories(tx, created.id, parsed.data.categoryIds);
      return created;
    });
    return ok(row, 201);
  } catch (error) {
    if (isUniqueViolation(error)) {
      throw new ApiError(409, "Product with this slug already exists");
    }
    throw error;
  }
}

async function replaceCategories(
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  productId: number,
  categoryIds: number[],
) {
  await tx
    .delete(productCategories)
    .where(eq(productCategories.productId, productId));
  if (categoryIds.length === 0) return;
  await tx.insert(productCategories).values(
    categoryIds.map((categoryId) => ({ productId, categoryId })),
  );
}