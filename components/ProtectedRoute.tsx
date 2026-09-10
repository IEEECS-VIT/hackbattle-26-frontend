"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import SimpleLoader from "./SimpleLoader";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login"); 
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return <SimpleLoader fullScreen label={loading ? "Checking your account…" : "Opening sign in…"} />;
  }

  return <>{children}</>;
}
