"use client";

import { useAuth } from "@/src/providers/auth-provider";
import { apiClient } from "@/src/shared/lib/api-client";
import React, { useState } from "react";

export default function Dashboard() {
  const { logout } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    setError(null);
    try {
      await logout();
    } catch (error) {
      setError("Fail to logout");
    }
  };

  return (
    <div>
      <button onClick={handleLogout} className="border bg-red-200">
        Logout
      </button>

      {error && <p>{error}</p>}
    </div>
  );
}
