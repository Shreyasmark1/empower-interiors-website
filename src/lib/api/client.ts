export class ApiClientError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

export interface ApiClientOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  headers?: Record<string, string>;
  getToken?: () => string | null;
  onUnauthorized?: () => void;
  signal?: AbortSignal;
}

function toQueryString(
  params: Record<string, string | number | boolean | undefined>,
): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) search.set(key, String(value));
  }
  const query = search.toString();
  return query ? `?${query}` : "";
}

export async function apiRequest<T>(
  path: string,
  options: ApiClientOptions = {},
): Promise<T> {
  const {
    method = "GET",
    query,
    body,
    headers: extraHeaders = {},
    getToken,
    onUnauthorized,
    signal,
  } = options;

  const headers: Record<string, string> = { ...extraHeaders };
  const isFormData = body instanceof FormData;
  if (body !== undefined && !isFormData) {
    headers["Content-Type"] = "application/json";
  }
  if (getToken) {
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const url = `${path}${toQueryString(query ?? {})}`;
  const requestBody =
    body === undefined || isFormData
      ? (body as BodyInit | undefined)
      : JSON.stringify(body);

  let response: Response;
  try {
    response = await fetch(url, { method, headers, body: requestBody, signal });
  } catch {
    throw new ApiClientError(0, "Network error");
  }

  if (response.status === 401 && onUnauthorized) {
    onUnauthorized();
  }

  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      payload &&
      typeof payload === "object" &&
      "message" in payload &&
      typeof (payload as { message: unknown }).message === "string"
        ? (payload as { message: string }).message
        : `Request failed (${response.status})`;
    throw new ApiClientError(response.status, message);
  }

  const data =
    payload && typeof payload === "object" && "data" in payload
      ? (payload as { data: unknown }).data
      : payload;
  return data as T;
}

export function apiGet<T>(
  path: string,
  options: ApiClientOptions = {},
): Promise<T> {
  return apiRequest<T>(path, { ...options, method: "GET" });
}

export function apiPost<T>(
  path: string,
  body: unknown,
  options: ApiClientOptions = {},
): Promise<T> {
  return apiRequest<T>(path, { ...options, method: "POST", body });
}