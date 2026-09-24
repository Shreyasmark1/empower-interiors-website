import { S3Client } from "@aws-sdk/client-s3";

const accessKeyId = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;

let client: S3Client | undefined;

export function getS3Client(): S3Client {
  if (!client) {
    client = new S3Client({
      region: process.env.AWS_REGION ?? "ap-south-1",
      endpoint: process.env.S3_ENDPOINT || undefined,
      credentials:
        accessKeyId && secretAccessKey
          ? { accessKeyId, secretAccessKey }
          : undefined,
    });
  }
  return client;
}

export function getS3Bucket(): string {
  const bucket = process.env.S3_BUCKET;
  if (!bucket) {
    throw new Error("S3_BUCKET is not configured");
  }
  return bucket;
}