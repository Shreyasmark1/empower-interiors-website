import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { ApiError, handleErrors, ok } from "@/lib/api/http";
import { readJsonBody, isUniqueViolation } from "@/lib/api/request";
import { getAuthUser } from "@/lib/auth";
import { signJwt } from "@/lib/auth/jwt";
import { hashPassword } from "@/lib/auth/password";
import { firstIssueMessage } from "@/lib/schemas/api/common";
import { RegisterSchema } from "@/lib/schemas/api/auth";

// Flip to false to re-enable public registration.
const REGISTRATION_DISABLED: boolean = true;

export async function POST(request: NextRequest) {
  return handleErrors(() => _postRegister(request));
}

async function _postRegister(request: NextRequest) {
  if (REGISTRATION_DISABLED) {
    throw new ApiError(403, "Registration is disabled");
  }

  if (getAuthUser(request)) {
    return ok({ message: "Already logged in" });
  }

  const body = (await readJsonBody(request)) as Record<string, unknown>;
  const parsed = RegisterSchema.safeParse(body);
  if (!parsed.success) {
    throw new ApiError(400, firstIssueMessage(parsed.error));
  }

  const { email, password, role } = parsed.data;

  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (existing.length > 0) {
    throw new ApiError(409, "Email is already registered");
  }

  const passwordHash = await hashPassword(password);
  let user;
  try {
    [user] = await db
      .insert(users)
      .values({ email, passwordHash, role })
      .returning();
  } catch (error) {
    if (isUniqueViolation(error)) {
      throw new ApiError(409, "Email is already registered");
    }
    throw error;
  }

  const token = signJwt({ sub: String(user.id), role: user.role });

  return ok(
    {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    },
    201,
  );
}