"use client";

import { useEffect, type ReactNode } from "react";
import { useLoadingRouter as useRouter } from "@/components/NavigationLoader";
import { useAuth } from "@/components/AuthProvider";
import { useSimpleLoading } from "@/components/NavigationLoader";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  useSimpleLoading(loading || !user);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login"); 
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return null;
  }

  return <>{children}</>;
}
