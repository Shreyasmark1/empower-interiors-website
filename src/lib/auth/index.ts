import type { NextRequest } from "next/server";

import { ApiError } from "@/lib/api/http";

import { verifyJwt } from "./jwt";

export interface AuthUser {
  id: string;
  role: string;
}

export function getBearerToken(request: NextRequest | Request): string | null {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return null;
  const token = header.slice("Bearer ".length).trim();
  return token.length > 0 ? token : null;
}

export function getAuthUser(request: NextRequest | Request): AuthUser | null {
  const token = getBearerToken(request);
  if (!token) return null;
  const payload = verifyJwt(token);
  if (!payload) return null;
  return { id: payload.sub, role: payload.role };
}

export function requireAuth(request: NextRequest | Request): AuthUser {
  const user = getAuthUser(request);
  if (!user) {
    throw new ApiError(401, "Unauthorized");
  }
  return user;
}