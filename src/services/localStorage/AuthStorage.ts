const LOCAL_STORAGE_TOKEN_KEY = "c-chat-token";

export function saveToken(token: string) {
  window.localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
}

export function getToken() {
  return window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
}

export function removeToken() {
  return window.localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
}
