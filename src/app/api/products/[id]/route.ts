import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { ApiError, handleErrors, ok } from "@/lib/api/http";
import {
  entityIdSchema,
  firstIssueMessage,
} from "@/lib/schemas/api/common";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return handleErrors(() => _getProductById(params));
}

async function _getProductById(params: Promise<{ id: string }>) {
  const { id: rawId } = await params;
  const id = entityIdSchema.safeParse(rawId);
  if (!id.success) {
    throw new ApiError(400, firstIssueMessage(id.error));
  }

  const row = await db.query.products.findFirst({
    where: eq(products.id, id.data),
    with: {
      variants: true,
      categoryLinks: { with: { category: true } },
    },
  });
  if (!row) {
    throw new ApiError(404, "Product not found");
  }

  return ok({
    ...row,
    categories: row.categoryLinks.map((link) => link.category),
  });
}