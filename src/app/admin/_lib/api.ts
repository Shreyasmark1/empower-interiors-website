"use client"

import { clearSession } from "./auth";

export class AdminApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "AdminApiError";
  }
}

interface AdminApiOptions {
  method?: "GET" | "POST";
  body?: unknown;
  headers?: Record<string, string>;
  auth?: boolean;
}

async function adminFetch<T>(
  path: string,
  options: AdminApiOptions = {},
): Promise<T> {
  const { method = "GET", body, headers: extraHeaders = {}, auth = true } =
    options;

  const headers: Record<string, string> = { ...extraHeaders };
  const isFormData = body instanceof FormData;
  if (body !== undefined && !isFormData) {
    headers["Content-Type"] = "application/json";
  }
  if (auth) {
    const { getToken } = await import("./auth");
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  let response: Response;
  try {
    response = await fetch(`/api${path}`, {
      method,
      headers,
      body:
        body === undefined
          ? undefined
          : isFormData
            ? body
            : JSON.stringify(body),
    });
  } catch {
    throw new AdminApiError(0, "Network error");
  }

  if (response.status === 401 && auth) {
    clearSession();
    if (typeof window !== "undefined") {
      window.location.replace("/admin/login");
    }
    throw new AdminApiError(401, "Unauthorized");
  }

  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      payload &&
      typeof payload === "object" &&
      "message" in payload &&
      typeof (payload as { message: unknown }).message === "string"
        ? ((payload as { message: string }).message)
        : `Request failed (${response.status})`;
    throw new AdminApiError(response.status, message);
  }

  const data =
    payload &&
    typeof payload === "object" &&
    "data" in payload
      ? (payload as { data: T }).data
      : (payload as T);
  return data;
}

export async function adminGet<T>(
  path: string,
  searchParams?: Record<string, string>,
  options: AdminApiOptions = {},
): Promise<T> {
  const query = searchParams
    ? `?${new URLSearchParams(searchParams).toString()}`
    : "";
  return adminFetch<T>(`${path}${query}`, { ...options, method: "GET" });
}

export async function adminPost<T>(
  path: string,
  body: unknown,
  options: AdminApiOptions = {},
): Promise<T> {
  return adminFetch<T>(path, { ...options, method: "POST", body });
}

export { adminFetch };