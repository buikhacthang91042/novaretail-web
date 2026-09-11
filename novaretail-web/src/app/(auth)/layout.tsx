"use client";
import { useAuth } from "@/src/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  useEffect(() => {
    if (isLoading) return;
    if (user) router.replace("/");
  }, [user, isLoading, router]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (user) return null;
  return <>{children}</>;
}
