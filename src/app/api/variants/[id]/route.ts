import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";

import { db } from "@/db";
import { variants } from "@/db/schema";
import { ApiError, handleErrors, ok } from "@/lib/api/http";
import {
  entityIdSchema,
  firstIssueMessage,
} from "@/lib/schemas/api/common";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return handleErrors(() => _getVariantById(params));
}

async function _getVariantById(params: Promise<{ id: string }>) {
  const { id: rawId } = await params;
  const id = entityIdSchema.safeParse(rawId);
  if (!id.success) {
    throw new ApiError(400, firstIssueMessage(id.error));
  }

  const [row] = await db
    .select()
    .from(variants)
    .where(eq(variants.id, id.data))
    .limit(1);
  if (!row) {
    throw new ApiError(404, "Variant not found");
  }

  return ok(row);
}