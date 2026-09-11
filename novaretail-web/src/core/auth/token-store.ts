let accessToken: string | null = null;
type TokenListener = (token: string | null) => void;
const listeners = new Set<TokenListener>();
export function getAccessToken(): string | null {
  return accessToken;
}

export function setAccessToken(token: string): void {
  accessToken = token;
  listeners.forEach((listener) => {
    listener(token);
  });
}

export function clearAccessToken(): void {
  accessToken = null;
  listeners.forEach((listener) => {
    listener(null);
  });
}

//Cái này để đăng kí hàm nhận thông báo khi token thay đổi
export function subscribeAccessToken(listener: TokenListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
