import { cookies } from "next/headers"

import { AUTH_COOKIE_NAME, getAuthUserFromToken } from "./index"

export async function getSessionUser() {
  const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value
  return getAuthUserFromToken(token ?? null)
}
