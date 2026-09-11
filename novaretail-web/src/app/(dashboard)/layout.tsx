"use client";

import { useAuth } from "@/src/providers/auth-provider";
import AppHeader from "@/src/shared/components/layout/app-header";
import AppSidebar from "@/src/shared/components/layout/app-sidebar";
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
  return (
    <>
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex min-w-0 flex-col flex-1">
          <AppHeader />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </>
  );
}
