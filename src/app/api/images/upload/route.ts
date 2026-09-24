import type { NextRequest } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";

import { ApiError, handleErrors, ok } from "@/lib/api/http";
import { requireAuth } from "@/lib/auth";

import { getS3Bucket, getS3Client } from "@/lib/s3/client";

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

const PREFIX_REGEX = /^[a-z0-9][a-z0-9-]*(\/[a-z0-9][a-z0-9-]*)*$/;

export async function POST(request: NextRequest) {
  return handleErrors(() => _uploadImage(request));
}

async function _uploadImage(request: NextRequest) {
  requireAuth(request);

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    throw new ApiError(400, "Invalid multipart body");
  }

  const rawPrefix = formData.get("prefix");
  const prefix =
    typeof rawPrefix === "string" && rawPrefix.trim() !== ""
      ? rawPrefix.trim()
      : "product";
  if (!PREFIX_REGEX.test(prefix)) {
    throw new ApiError(
      400,
      "prefix may only contain lowercase letters, numbers, and hyphens",
    );
  }

  const rawFile = formData.get("file");
  if (!(rawFile instanceof File)) {
    throw new ApiError(400, "file is required");
  }
  const file = rawFile;

  const extension = ALLOWED_TYPES[file.type];
  if (!extension) {
    throw new ApiError(400, "Unsupported image type");
  }
  if (file.size === 0) {
    throw new ApiError(400, "Uploaded file is empty");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new ApiError(400, "File is larger than 5MB");
  }

  const key = `${prefix}/${crypto.randomUUID()}.${extension}`;
  const body = Buffer.from(await file.arrayBuffer());

  await getS3Client().send(
    new PutObjectCommand({
      Bucket: getS3Bucket(),
      Key: key,
      Body: body,
      ContentType: file.type,
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );

  return ok({ imageUrl: `/${key}` }, 201);
}