"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { api } from "@/lib/api";

interface SubmissionGuardProps {
  children: React.ReactNode;
}

export default function SubmissionGuard({
  children,
}: SubmissionGuardProps) {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const verifyAccess = async () => {
      if (loading) {
        return;
      }

      if (!user) {
        router.replace("/login");
        return;
      }

      setChecking(true);

      try {
        // Always fetch fresh team data.
        // This prevents stale AuthProvider state from causing
        // /submission -> /dashboard -> /team redirect loops.
        const { data, status } = await api.getTeam();

        if (cancelled) {
          return;
        }

        if (status === 401) {
          router.replace("/login");
          return;
        }

        if (
          status === 204 ||
          status === 403 ||
          status === 404 ||
          !data
        ) {
          router.replace("/dashboard");
          return;
        }

        if (status !== 200) {
          console.error(
            "Unable to verify team for submission:",
            status
          );

          setAuthorized(false);
          return;
        }

        const isLeader =
          Boolean(data.isLeader) ||
          data.leaderId === user.uid ||
          data.leaderId === user.email;

        if (!isLeader) {
          // Non-leaders should go to the team page,
          // not back through the dashboard.
          router.replace("/team");
          return;
        }

        setAuthorized(true);
      } catch (error) {
        console.error(
          "Failed to verify submission access:",
          error
        );

        // Important:
        // don't redirect on transient network errors.
        setAuthorized(false);
      } finally {
        if (!cancelled) {
          setChecking(false);
        }
      }
    };

    void verifyAccess();

    return () => {
      cancelled = true;
    };
  }, [loading, user, router]);

  if (loading || checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070e04] text-white">
        <p className="font-pixeboy text-xl">
          VERIFYING SUBMISSION ACCESS...
        </p>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070e04] px-6 text-center text-white">
        <p className="font-pixeboy text-xl">
          UNABLE TO VERIFY YOUR TEAM. PLEASE REFRESH AND TRY AGAIN.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}