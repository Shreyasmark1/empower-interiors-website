import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isJson(value: string): boolean {
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
}

export function requiredText(
  min: number,
  max: number,
  message = "Required",
) {
  return z.string().trim().min(min, message).max(max);
}

export function slugField(max: number) {
  return z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(max)
    .regex(slugRegex, "Use lowercase letters, numbers, and hyphens");
}

export function trimmedNullable(max?: number) {
  const base = max ? z.string().trim().max(max) : z.string().trim();
  return base.transform((value) => (value === "" ? null : value));
}

export function positivePriceOrNull(message: string) {
  return z
    .string()
    .trim()
    .refine(
      (value) =>
        value === "" ||
        (!Number.isNaN(Number(value)) && Number(value) > 0),
      message,
    )
    .transform((value) => (value === "" ? null : Number(value)));
}

export function positivePrice(message: string) {
  return z
    .string()
    .trim()
    .refine(
      (value) =>
        !Number.isNaN(Number(value)) && Number(value) > 0,
      message,
    )
    .transform((value) => Number(value));
}

export function selectId(message: string) {
  return z
    .string()
    .refine((value) => value !== "none" && /^\d+$/.test(value), message)
    .transform((value) => Number(value));
}

export function selectIdOrNull() {
  return z
    .string()
    .refine((value) => value === "none" || /^\d+$/.test(value))
    .transform((value) => (value === "none" ? null : Number(value)));
}

export function datetimeLocalOrNull() {
  return z
    .string()
    .refine(
      (value) => value === "" || !Number.isNaN(Date.parse(value)),
      "Invalid date",
    )
    .transform((value) => (value === "" ? null : new Date(value)));
}

export function sortOrderField() {
  return z
    .string()
    .default("0")
    .refine((value) => /^\d+$/.test(value), "Invalid sort order")
    .transform((value) => Number(value));
}

export function commaStringToArray() {
  return z
    .string()
    .transform((value) =>
      value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    );
}

export function jsonTextToObject() {
  return z
    .string()
    .refine(
      (value) => value.trim() === "" || isJson(value),
      "Invalid JSON",
    )
    .transform((value) =>
      value.trim() === ""
        ? {}
        : (JSON.parse(value) as Record<string, unknown>),
    );
}

export function idArrayToNumbers(max: number) {
  return z
    .array(z.string())
    .max(max)
    .refine((values) => values.every((value) => /^\d+$/.test(value)))
    .transform((values) => values.map((value) => Number(value)));
}