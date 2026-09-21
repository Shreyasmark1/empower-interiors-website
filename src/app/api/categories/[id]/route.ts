import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";

import { db } from "@/db";
import { categories } from "@/db/schema";
import { ApiError, handleErrors, ok } from "@/lib/api/http";
import {
  entityIdSchema,
  firstIssueMessage,
} from "@/lib/schemas/api/common";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return handleErrors(() => _getCategoryById(params));
}

async function _getCategoryById(params: Promise<{ id: string }>) {
  const { id: rawId } = await params;
  const id = entityIdSchema.safeParse(rawId);
  if (!id.success) {
    throw new ApiError(400, firstIssueMessage(id.error));
  }

  const [row] = await db
    .select()
    .from(categories)
    .where(eq(categories.id, id.data))
    .limit(1);
  if (!row) {
    throw new ApiError(404, "Category not found");
  }

  return ok(row);
}