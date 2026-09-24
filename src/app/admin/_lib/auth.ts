"use client"

const TOKEN_KEY = "empower_admin_token";
const USER_KEY = "empower_admin_user";

export interface AdminUser {
  id: number;
  email: string;
  role: string;
}

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

function setSession(token: string, user: AdminUser): void {
  window.localStorage.setItem(TOKEN_KEY, token);
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearSession(): void {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
}

function getSessionUser(): AdminUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as AdminUser) : null;
}

function isSessionExpired(): boolean {
  const token = getToken();
  if (!token) return true;
  try {
    const payload = JSON.parse(
      window.atob(token.split(".")[1] ?? "")
    ) as { exp?: number };
    return !payload.exp || payload.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

function isLoggedIn(): boolean {
  return getToken() !== null && !isSessionExpired();
}

export { clearSession, getSessionUser, getToken, isLoggedIn, setSession };