import { asc, eq } from "drizzle-orm";
import type { NextRequest } from "next/server";

import { db } from "@/db";
import { categories } from "@/db/schema";
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
  CategoryCreateSchema,
  CategoryUpdateSchema,
} from "@/lib/schemas/api/category";

export async function GET(request: NextRequest) {
  return handleErrors(() => _getCategories(request));
}

export async function POST(request: NextRequest) {
  return handleErrors(() => _postCategories(request));
}

async function _getCategories(request: NextRequest) {
  const parsed = listQuerySchema.safeParse(
    Object.fromEntries(request.nextUrl.searchParams),
  );
  if (!parsed.success) {
    throw new ApiError(400, firstIssueMessage(parsed.error));
  }
  const { limit, offset } = parsed.data;

  const items = await db
    .select()
    .from(categories)
    .orderBy(asc(categories.sortOrder), asc(categories.id))
    .limit(limit)
    .offset(offset);

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
    try {
      const [row] = await db
        .update(categories)
        .set({ ...pickDefined(values), updatedAt: new Date() })
        .where(eq(categories.id, id))
        .returning();
      if (!row) {
        throw new ApiError(404, "Category not found");
      }
      return ok(row);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      if (isUniqueViolation(error)) {
        throw new ApiError(409, "Category with this slug already exists");
      }
      throw error;
    }
  }

  const parsed = CategoryCreateSchema.safeParse(body);
  if (!parsed.success) {
    throw new ApiError(400, firstIssueMessage(parsed.error));
  }
  try {
    const [row] = await db.insert(categories).values(parsed.data).returning();
    return ok(row, 201);
  } catch (error) {
    if (isUniqueViolation(error)) {
      throw new ApiError(409, "Category with this slug already exists");
    }
    throw error;
  }
}