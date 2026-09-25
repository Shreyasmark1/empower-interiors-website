import { createHmac, timingSafeEqual } from "node:crypto";

export interface JwtPayload {
  sub: string;
  role: string;
  email?: string;
  iat?: number;
  exp?: number;
}

const b64url = (input: string | Buffer): string =>
  Buffer.from(input).toString("base64url");

function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }
  return secret;
}

export function getJwtExpiresInSeconds(): number {
  const value = process.env.JWT_EXPIRES_IN ?? "7d";
  if (value === "0") return 0;
  const match = /^(\d+)\s*(s|m|h|d)$/.exec(value.trim().toLowerCase());
  if (!match) {
    throw new Error(`Invalid JWT_EXPIRES_IN: ${value}`);
  }
  const unit = match[2] as "s" | "m" | "h" | "d";
  const multipliers = { s: 1, m: 60, h: 3600, d: 86400 } as const;
  return Number(match[1]) * multipliers[unit];
}

export function signJwt(payload: JwtPayload): string {
  const now = Math.floor(Date.now() / 1000);
  const expiresIn = getJwtExpiresInSeconds();
  const header = { alg: "HS256", typ: "JWT" };
  const body: JwtPayload = {
    ...payload,
    iat: now,
    ...(expiresIn > 0 ? { exp: now + expiresIn } : {}),
  };

  const data = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(body))}`;
  const signature = createHmac("sha256", getSecret())
    .update(data)
    .digest("base64url");

  return `${data}.${signature}`;
}

export function verifyJwt(token: string): JwtPayload | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [encodedHeader, encodedBody, signature] = parts as [
    string,
    string,
    string,
  ];

  const expectedSignature = createHmac("sha256", getSecret())
    .update(`${encodedHeader}.${encodedBody}`)
    .digest();
  const actualSignature = Buffer.from(signature, "base64url");
  if (
    actualSignature.length !== expectedSignature.length ||
    !timingSafeEqual(actualSignature, expectedSignature)
  ) {
    return null;
  }

  let header: { alg?: string };
  let payload: JwtPayload;
  try {
    header = JSON.parse(
      Buffer.from(encodedHeader, "base64url").toString("utf8"),
    );
    payload = JSON.parse(Buffer.from(encodedBody, "base64url").toString("utf8"));
  } catch {
    return null;
  }

  if (header.alg !== "HS256") return null;
  if (typeof payload.sub !== "string" || payload.sub.length === 0) return null;
  if (typeof payload.role !== "string") return null;
  if (payload.email !== undefined && typeof payload.email !== "string") {
    return null;
  }
  if (payload.exp !== undefined && payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return payload;
}