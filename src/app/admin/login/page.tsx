"use client"

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HugeiconsIcon } from "@hugeicons/react";
import { LoginSquare01Icon } from "@hugeicons/core-free-icons";

import { LoginSchema, type LoginInput } from "@/lib/schemas/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AdminApiError, adminPost } from "../_lib/api";
import { isLoggedIn, setSession, type AdminUser } from "../_lib/auth";

interface LoginResponse {
  token: string;
  user: AdminUser;
}

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { username: "", password: "" },
  });

  if (isLoggedIn()) {
    redirect("/admin");
  }

  async function onSubmit(values: LoginInput) {
    setError(null);
    try {
      const data = await adminPost<LoginResponse>(
        "/auth/login",
        values,
        { auth: false }
      );
      setSession(data.token, data.user);
      router.replace("/admin");
    } catch (err) {
      setError(
        err instanceof AdminApiError ? err.message : "Login failed"
      );
    }
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <div className="mb-2 flex size-11 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <HugeiconsIcon icon={LoginSquare01Icon} strokeWidth={2} className="size-6" />
          </div>
          <CardTitle className="text-lg font-semibold">Admin sign in</CardTitle>
          <CardDescription>
            Enter your credentials to access the Empower admin console.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" autoComplete="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              )}
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Signing in…" : "Sign in"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}