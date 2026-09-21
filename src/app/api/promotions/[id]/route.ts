import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";

import { db } from "@/db";
import { promotions } from "@/db/schema";
import { ApiError, handleErrors, ok } from "@/lib/api/http";
import {
  entityIdSchema,
  firstIssueMessage,
} from "@/lib/schemas/api/common";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return handleErrors(() => _getPromotionById(params));
}

async function _getPromotionById(params: Promise<{ id: string }>) {
  const { id: rawId } = await params;
  const id = entityIdSchema.safeParse(rawId);
  if (!id.success) {
    throw new ApiError(400, firstIssueMessage(id.error));
  }

  const row = await db.query.promotions.findFirst({
    where: eq(promotions.id, id.data),
    with: { targets: true },
  });
  if (!row) {
    throw new ApiError(404, "Promotion not found");
  }

  return ok(row);
}