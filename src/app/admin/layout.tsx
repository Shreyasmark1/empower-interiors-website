"use client"

import React, { useSyncExternalStore } from "react";
import { usePathname, redirect } from "next/navigation";

import { isLoggedIn } from "./_lib/auth";
import { AdminShell } from "./_components/admin-shell";

function useIsHydrated() {
  return useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHydrated = useIsHydrated();

  if (!isHydrated) {
    return null;
  }

  if (pathname !== "/admin/login" && !isLoggedIn()) {
    redirect("/admin/login");
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return <AdminShell>{children}</AdminShell>;
}