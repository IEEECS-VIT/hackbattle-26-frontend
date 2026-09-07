
import ProtectedRoute from "@/components/ProtectedRoute";

export default function TeamLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
