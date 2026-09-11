"use client";

import { useAuth } from "@/src/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    if (!user) router.replace("/login");
  }, [isLoading, user, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  //Cái này để tránh dashboard có thể bị flash khi mà useEffect chuẩn bị redirect
  if (!user) return null;
  return <>{children}</>;
}
