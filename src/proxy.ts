import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getBearerToken } from "@/lib/auth";
import { verifyJwt } from "@/lib/auth/jwt";

const PUBLIC_PATHS = ["/api/auth/login", "/api/auth/register"];

export function proxy(request: NextRequest) {
  const method = request.method;
  if (method === "GET" || method === "HEAD" || method === "OPTIONS") {
    return NextResponse.next();
  }

  if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const token = getBearerToken(request);
  if (!token || !verifyJwt(token)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};