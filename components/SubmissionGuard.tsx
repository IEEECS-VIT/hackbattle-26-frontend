"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SubmissionGuardProps {
  children: React.ReactNode;
}

export default function SubmissionGuard({ children }: SubmissionGuardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Add your team/submission verification logic here
    // Example: Check if the user is in a team or is a team leader
    const checkAccess = async () => {
      try {
        // Place your fetch/state check here
        setLoading(false);
      } catch (error) {
        console.error("Access verification failed:", error);
        router.push("/dashboard");
      }
    };

    checkAccess();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading submission page...</p>
      </div>
    );
  }

  return <>{children}</>;
}
