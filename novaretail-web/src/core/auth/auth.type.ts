export interface AuthUser {
  id: string;
  username: string;
  email: string;
  status: string;
  roles: string[];
  permissions: string[];
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

export type GetMeResponse = AuthUser;

export interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
