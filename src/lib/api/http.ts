import { NextResponse } from "next/server";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function ok(data: unknown, status = 200): NextResponse {
  return NextResponse.json({ data }, { status });
}

export function err(message: string, status = 400): NextResponse {
  return NextResponse.json({ message }, { status });
}

export function handleErrors(
  fn: () => Promise<NextResponse>,
): Promise<NextResponse> {
  return fn().catch((error) => {
    if (error instanceof ApiError) {
      return err(error.message, error.status);
    }
    console.error(error);
    return err("Internal server error", 500);
  });
}