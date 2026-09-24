"use client"

import { adminPost } from "./api";

export function toImageSrc(key: string): string {
  if (!key) return "";
  if (/^https?:\/\//.test(key) || key.startsWith("/api/")) {
    return key;
  }
  return `/api/images${key}`;
}

export async function uploadImage(
  file: File,
  folder = "product",
): Promise<string> {
  const formData = new FormData();
  formData.append("prefix", folder);
  formData.append("file", file);
  const result = await adminPost<{ imageUrl: string }>(
    "/images/upload",
    formData,
  );
  return result.imageUrl;
}