"use client";

import React, { useEffect } from "react";
import SimpleLoader from "./SimpleLoader";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
interface SubmissionGuardProps {
  children: React.ReactNode;
}

export default function SubmissionGuard({ children }: SubmissionGuardProps) {
  const router = useRouter();
  const { user, loading, hasTeam, teamData } = useAuth();

  useEffect(() => {
    // Wait until AuthProvider completes loading user and team data
    if (loading) return;

    // 1. Not logged in -> Redirect to Login
    if (!user) {
      router.replace("/login");
      return;
    }

    // 2. Not in a team -> Redirect to Dashboard
    if (!hasTeam || !teamData) {
      router.replace("/dashboard");
      return;
    }

    // 3. Not team leader -> Redirect to Dashboard
    // Fallback checks both API's boolean flag and leader identifier
    const isLeader =
      teamData.isLeader ??
      (teamData.leaderId === user.uid || teamData.leaderId === user.email);

    if (!isLeader) {
      router.replace("/dashboard");
    }
  }, [user, loading, hasTeam, teamData, router]);

  // Show a loading screen while auth/team status resolves
  if (loading) {
    return <SimpleLoader fullScreen label="Checking your team…" />;
  }

  // Calculate authorized status
  const isAuthorized =
    user &&
    hasTeam &&
    teamData &&
    (teamData.isLeader ??
      (teamData.leaderId === user.uid || teamData.leaderId === user.email));

  // Prevent flash of guarded content before redirect occurs
  if (!isAuthorized) {
    return <SimpleLoader fullScreen label="Opening your dashboard…" />;
  }

  return <>{children}</>;
}
