"use client";
import { useAuth } from "@/src/providers/auth-provider";

type PermissionGuardType = {
  permission: string;
  children: React.ReactNode;
};
export default function PermissionGuard({
  children,
  permission,
}: PermissionGuardType) {
  const { user, isLoading } = useAuth();
  const isAllowed = user?.permissions.includes(permission);
  if (isLoading) return <div>Loading...</div>;
  if (!isAllowed) return <div>403 - Forbidden</div>;
  return <>{children}</>;
}
