import ProtectedRoute from "@/components/ProtectedRoute";
import SubmissionGuard from "@/components/SubmissionGuard";

export default function SubmissionsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ProtectedRoute>
      <SubmissionGuard>{children}</SubmissionGuard>
    </ProtectedRoute>
  );
}
