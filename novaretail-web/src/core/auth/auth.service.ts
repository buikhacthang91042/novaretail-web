import { apiClient } from "@/src/shared/lib/api-client";
import {
  AuthUser,
  GetMeResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  RefreshResponse,
} from "./auth.type";

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient("/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  const result = await response.json();
  return result;
}

export async function refreshToken(): Promise<RefreshResponse> {
  const response = await apiClient("/api/v1/auth/refresh", {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Refresh token failed");
  }
  const result = await response.json();
  return result;
}

export async function logOut(): Promise<LogoutResponse> {
  const response = await apiClient("/api/v1/auth/logout", {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Logout failed");
  }
  const result = await response.json();
  return result;
}

export async function getMe(): Promise<GetMeResponse> {
  const response = await apiClient("/api/v1/auth/me", {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Get me failed");
  }
  const result = await response.json();
  return result;
}
