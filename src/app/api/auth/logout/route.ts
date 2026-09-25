import { NextResponse } from "next/server";

import { handleErrors } from "@/lib/api/http";
import { clearAuthCookie } from "@/lib/auth";

export async function POST() {
  return handleErrors(() => _postLogout());
}

async function _postLogout() {
  const response = NextResponse.json({ data: { message: "Signed out" } });
  return clearAuthCookie(response);
}
