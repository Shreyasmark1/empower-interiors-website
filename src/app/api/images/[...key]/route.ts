import type { NextRequest } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";

import { err } from "@/lib/api/http";

import { getS3Bucket, getS3Client } from "@/lib/s3/client";

const ALLOWED_EXTENSIONS = new Set([
  "jpg",
  "jpeg",
  "png",
  "webp",
  "gif",
  "avif",
]);

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string[] }> },
) {
  const { key: segments } = await params;

  const objectKey = buildObjectKey(segments);
  if (!objectKey) {
    return err("Invalid image key", 400);
  }

  try {
    const response = await getS3Client().send(
      new GetObjectCommand({ Bucket: getS3Bucket(), Key: objectKey }),
    );
    const rawBytes = await response.Body?.transformToByteArray();
    if (!rawBytes) {
      return err("Image not found", 404);
    }
    const bytes = new Uint8Array(rawBytes);

    return new Response(new Blob([bytes]), {
      headers: {
        "Content-Type": response.ContentType ?? "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Length": String(bytes.length),
      },
    });
  } catch (error) {
    if (isNoSuchKey(error)) {
      return err("Image not found", 404);
    }
    console.error("Failed to fetch image from S3", error);
    return err("Internal server error", 500);
  }
}

function buildObjectKey(segments: string[]): string | null {
  if (segments.length === 0 || segments.some(isInvalidSegment)) {
    return null;
  }

  const last = segments[segments.length - 1] ?? "";
  const dotIndex = last.lastIndexOf(".");
  if (dotIndex <= 0 || dotIndex === last.length - 1) {
    return null;
  }
  const extension = last.slice(dotIndex + 1).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(extension)) {
    return null;
  }

  const key = segments.join("/");
  if (key.length > 255) {
    return null;
  }
  return key;
}

function isInvalidSegment(segment: string): boolean {
  return (
    segment === "" ||
    segment === "." ||
    segment === ".." ||
    segment.startsWith(".") ||
    /[^a-zA-Z0-9._-]/.test(segment)
  );
}

function isNoSuchKey(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    (error as { name?: string }).name === "NoSuchKey"
  );
}