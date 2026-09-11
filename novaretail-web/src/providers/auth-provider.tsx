"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextValue, AuthUser } from "../core/auth/auth.type";
import { getMe, login, logOut, refreshToken } from "../core/auth/auth.service";
import {
  setAccessToken as setStoredAccessToken,
  clearAccessToken as clearStoredAccessToken,
  subscribeAccessToken,
} from "../core/auth/token-store";
const AuthContext = createContext<AuthContextValue | null>(null);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const handleLogin = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await login({ username, password });
      setUser(result.user);
      setStoredAccessToken(result.accessToken);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const handleLogout = async () => {
    try {
      await logOut();
    } finally {
      setUser(null);
      clearStoredAccessToken();
    }
  };

  useEffect(() => {
    async function restoreSession() {
      setIsLoading(true);
      try {
        const refreshTokenResult = await refreshToken();
        const { accessToken } = refreshTokenResult;
        if (!accessToken) {
          setUser(null);
          setAccessToken(null);
          clearStoredAccessToken();
          return;
        }
        setStoredAccessToken(accessToken);
        const getMeResult = await getMe();
        setUser(getMeResult);
      } catch (error) {
        setUser(null);
        clearStoredAccessToken();
      } finally {
        setIsLoading(false);
      }
    }
    restoreSession();
  }, []);

  //này để đăng kí function vào khi component được mount
  useEffect(() => {
    const unsubcribe = subscribeAccessToken((token) => {
      setAccessToken(token);
    });

    return unsubcribe;
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isLoading,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
