export interface AuthUser {
  id: string;
  username: string;
  email: string;
  status: string;
}

export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface LogoutResponse {
  message: string;
}

export interface GetMeResponse {
  id: string;
  username: string;
  email: string;
  status: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
