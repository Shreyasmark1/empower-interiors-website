import { z } from "zod";

export const entityIdSchema = z.coerce.number().int().positive();

export const getByIdSchema = z.object({
  id: entityIdSchema,
});

export type GetByIdParams = z.infer<typeof getByIdSchema>;

export const listQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
  includeDeleted: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
});

export type ListQuery = z.infer<typeof listQuerySchema>;

export function firstIssueMessage(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Invalid input";
}