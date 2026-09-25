import React from "react";

import { getSessionUser } from "@/lib/auth/session";
import { AdminShell } from "./_components/admin-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();

  return (
    <AdminShell
      user={
        user
          ? { id: Number(user.id), role: user.role, email: user.email }
          : null
      }
    >
      {children}
    </AdminShell>
  );
}
