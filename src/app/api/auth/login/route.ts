import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ApiError, handleErrors, ok } from "@/lib/api/http";
import { readJsonBody } from "@/lib/api/request";
import { getAuthUser, setAuthCookie } from "@/lib/auth";
import { getJwtExpiresInSeconds, signJwt } from "@/lib/auth/jwt";
import { verifyPassword } from "@/lib/auth/password";
import { firstIssueMessage } from "@/lib/schemas/api/common";
import { LoginSchema } from "@/lib/schemas/api/auth";
import * as queries from "@/lib/queries/auth";

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

  const user = await queries.findUserByEmail(parsed.data.email);

  const validCredentials = await verifyPassword(
    parsed.data.password,
    user.passwordHash,
  );

  if (!user.isActive || !validCredentials) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = signJwt({
    sub: String(user.id),
    role: user.role,
    email: user.email,
  });
  const maxAge = getJwtExpiresInSeconds();

  const response = NextResponse.json({
    data: {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    },
  });
  return setAuthCookie(response, token, maxAge);
}
