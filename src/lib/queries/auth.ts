"use server"

import { eq } from "drizzle-orm"

import { db } from "@/db"
import { users } from "@/db/schema"
import { ApiError } from "@/lib/api/http"
import { isUniqueViolation } from "@/lib/api/request"

export async function findUserByEmail(email: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
  if (!user) {
    throw new ApiError(401, "Invalid email or password")
  }
  return user
}

export async function createUser(values: {
  email: string
  passwordHash: string
  role: string
}) {
  try {
    const [user] = await db.insert(users).values(values).returning()
    return user
  } catch (error) {
    if (isUniqueViolation(error)) {
      throw new ApiError(409, "Email is already registered")
    }
    throw error
  }
}
