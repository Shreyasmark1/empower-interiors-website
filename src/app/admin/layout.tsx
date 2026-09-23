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
    return (
      <div className="flex min-h-svh items-center justify-center bg-muted/30">
        <div
          role="status"
          aria-label="Loading"
          className="size-8 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-primary"
        />
      </div>
    );
  }

  if (pathname !== "/admin/login" && !isLoggedIn()) {
    redirect("/admin/login");
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return <AdminShell>{children}</AdminShell>;
}