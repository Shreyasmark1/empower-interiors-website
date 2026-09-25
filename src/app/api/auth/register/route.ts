import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ApiError, handleErrors, ok } from "@/lib/api/http";
import { readJsonBody } from "@/lib/api/request";
import { getAuthUser, setAuthCookie } from "@/lib/auth";
import { getJwtExpiresInSeconds, signJwt } from "@/lib/auth/jwt";
import { hashPassword } from "@/lib/auth/password";
import { firstIssueMessage } from "@/lib/schemas/api/common";
import { RegisterSchema } from "@/lib/schemas/api/auth";
import * as queries from "@/lib/queries/auth";

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

  const passwordHash = await hashPassword(password);
  const user = await queries.createUser({ email, passwordHash, role });

  const token = signJwt({
    sub: String(user.id),
    role: user.role,
    email: user.email,
  });
  const maxAge = getJwtExpiresInSeconds();

  const response = NextResponse.json(
    {
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
    },
    { status: 201 },
  );
  return setAuthCookie(response, token, maxAge);
}