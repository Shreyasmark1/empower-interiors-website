import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { handleErrors, ok, err, ApiError } from "@/lib/api/http";
import { readJsonBody } from "@/lib/api/request";
import { getAuthUser } from "@/lib/auth";
import { signJwt } from "@/lib/auth/jwt";
import { verifyPassword } from "@/lib/auth/password";
import { firstIssueMessage } from "@/lib/schemas/api/common";
import { LoginSchema } from "@/lib/schemas/api/auth";

export async function POST(request: NextRequest) {
  return handleErrors(() => _postLogin(request));
}

async function _postLogin(request: NextRequest) {
  if (getAuthUser(request)) {
    return ok({ message: "Already logged in" });
  }

  const body = (await readJsonBody(request)) as Record<string, unknown>;
  const parsed = LoginSchema.safeParse(body);
  if (!parsed.success) {
    throw new ApiError(400, firstIssueMessage(parsed.error));
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, parsed.data.email))
    .limit(1);

  console.log(JSON.stringify(user ? user : "no user"))

  const validCredentials = user && (await verifyPassword(parsed.data.password, user.passwordHash));

  console.log("is valid: " + validCredentials)

  if (!user || !user.isActive || !validCredentials) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = signJwt({ sub: String(user.id), role: user.role });

  return ok({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });
}