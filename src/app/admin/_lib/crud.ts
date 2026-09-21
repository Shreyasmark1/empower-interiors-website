"use client"

import { adminGet, adminPost } from "./api";

export interface ListResponse<T> {
  items: T[];
}

export function listItems<T>(
  path: string,
  params?: Record<string, string>,
): Promise<ListResponse<T>> {
  return adminGet<ListResponse<T>>(path, params);
}

export function getItem<T>(path: string): Promise<T> {
  return adminGet<T>(path);
}

export function createOrUpdate<T>(path: string, body: unknown): Promise<T> {
  return adminPost<T>(path, body);
}