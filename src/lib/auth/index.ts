import type { NextRequest, NextResponse } from "next/server";

import { ApiError } from "@/lib/api/http";

import { verifyJwt } from "./jwt";

export const AUTH_COOKIE_NAME = "empower_admin_token";

export interface AuthUser {
  id: string;
  role: string;
  email?: string;
}

export function getBearerTokenFromRequest(
  request: NextRequest | Request,
): string | null {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return null;
  const token = header.slice("Bearer ".length).trim();
  return token.length > 0 ? token : null;
}

export function getCookieTokenFromRequest(
  request: NextRequest | Request,
): string | null {
  const cookies = (request as NextRequest).cookies;
  const token = cookies?.get(AUTH_COOKIE_NAME)?.value;
  return token && token.length > 0 ? token : null;
}

export function getRequestToken(request: NextRequest | Request): string | null {
  return getCookieTokenFromRequest(request) ?? getBearerTokenFromRequest(request);
}

export function getAuthUserFromToken(token: string | null): AuthUser | null {
  if (!token) return null;
  const payload = verifyJwt(token);
  if (!payload) return null;
  return { id: payload.sub, role: payload.role, email: payload.email };
}

export function getAuthUser(request: NextRequest | Request): AuthUser | null {
  return getAuthUserFromToken(getRequestToken(request));
}

export function requireAuth(request: NextRequest | Request): AuthUser {
  const user = getAuthUser(request);
  if (!user) {
    throw new ApiError(401, "Unauthorized");
  }
  return user;
}

export function authCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    ...(maxAge > 0 ? { maxAge } : {}),
  };
}

export function setAuthCookie(
  response: NextResponse,
  token: string,
  maxAge: number,
): NextResponse {
  response.cookies.set(AUTH_COOKIE_NAME, token, authCookieOptions(maxAge));
  return response;
}

export function clearAuthCookie(response: NextResponse): NextResponse {
  response.cookies.set(AUTH_COOKIE_NAME, "", {
    ...authCookieOptions(0),
    maxAge: 0,
  });
  return response;
}
