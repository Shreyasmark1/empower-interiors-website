import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getAuthUser } from "@/lib/auth";

const PUBLIC_API_PATHS = ["/api/auth/login", "/api/auth/register", "/api/auth/logout"];
const LOGIN_PATH = "/admin/login";

function isApiPath(pathname: string): boolean {
  return pathname.startsWith("/api/");
}

function isAdminPath(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function redirectToLogin(request: NextRequest): NextResponse {
  const loginUrl = new URL(LOGIN_PATH, request.nextUrl.origin);
  return NextResponse.redirect(loginUrl);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;
  const isReadOnly =
    method === "GET" || method === "HEAD" || method === "OPTIONS";

  if (isApiPath(pathname)) {
    if (isReadOnly || PUBLIC_API_PATHS.includes(pathname)) {
      return NextResponse.next();
    }
    if (!getAuthUser(request)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (isAdminPath(pathname) && pathname !== LOGIN_PATH) {
    if (!getAuthUser(request)) {
      return redirectToLogin(request);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/admin/:path*"],
};
