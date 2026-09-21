import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1).max(255),
  password: z.string().min(1).max(255),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  username: z.string().min(3).max(255),
  password: z.string().min(8).max(255),
  role: z.enum(["admin"]).default("admin"),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;

export const AuthUserSchema = z.object({
  id: z.number(),
  username: z.string(),
  role: z.string(),
});

export type AuthUserPayload = z.infer<typeof AuthUserSchema>;