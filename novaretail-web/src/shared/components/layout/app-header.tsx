"use client";

import { useAuth } from "@/src/providers/auth-provider";
import React, { useState } from "react";

export default function AppHeader() {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex  justify-end  border-b border-gray-300 overflow-hidden min-h-[81px]">
      <div className="p-4 flex gap-3 justify-center items-center">
        <div className="flex gap-2">
          <span className="rounded-full bg-gray-300 h-2 w-2 p-4 flex justify-center items-center">
            Ava
          </span>
          <div className="flex flex-col">
            <h3 className="text-sm">{user?.username}</h3>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="border bg-red-200">
          Logout
        </button>
      </div>
    </div>
  );
}
