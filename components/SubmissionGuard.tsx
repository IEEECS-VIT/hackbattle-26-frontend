"use client";

import React, { useEffect, useState } from "react";
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
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#070e04] text-white">
        <p className="font-mono text-lg animate-pulse">
          Verifying submission permissions...
        </p>
      </div>
    );
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
    return null;
  }

  return <>{children}</>;
}