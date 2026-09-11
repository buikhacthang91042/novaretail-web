//File này dùng để gom hết các chỗ gọi api vào 1 chỗ
//thay vì phải fetch từng chỗ gọi API

import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "@/src/core/auth/token-store";
import { skipRefreshEndpoints } from "../constants/app";
import { RefreshResponse } from "@/src/core/auth/auth.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
let refreshPromise: Promise<string | null> | null = null;
export async function apiClient(endpoint: string, options?: RequestInit) {
  const url = `${API_URL}${endpoint}`;
  const headers = new Headers(options?.headers);
  const token = getAccessToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  let response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });
  if (response.status !== 401 || skipRefreshEndpoints.includes(endpoint)) {
    return response;
  }
  const newAccessToken = await refreshAccessToken();
  if (!newAccessToken) {
    return response;
  }
  const retryHeaders = new Headers(options?.headers);
  retryHeaders.set("Authorization", `Bearer ${newAccessToken}`);

  response = await fetch(url, {
    ...options,
    headers: retryHeaders,
    credentials: "include",
  });
  return response;
}

async function refreshAccessToken(): Promise<string | null> {
  if (refreshPromise) {
    return refreshPromise;
  }
  refreshPromise = (async () => {
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        clearAccessToken();
        return null;
      }
      const data: RefreshResponse = await response.json();
      if (!data?.accessToken || typeof data.accessToken !== "string") {
        clearAccessToken();
        return null;
      }
      const accessToken = data.accessToken;
      setAccessToken(accessToken);
      return accessToken;
    } catch (error) {
      clearAccessToken();
      return null;
    } finally {
      refreshPromise = null;
    }
  })();
  return refreshPromise;
}
