export function isAuthenticated() {
  return localStorage.getItem("isAuthenticated") === "true";
}

export async function signIn() {
  localStorage.setItem("isAuthenticated", "true");
}

export async function signOut() {
  localStorage.removeItem("isAuthenticated");
}

export const saveLocalToken = (token: string) => localStorage.setItem("access_token", token);
export const saveLocalRefreshToken = (token: string) =>
  localStorage.setItem("refresh_token", token);
export const getLocalToken = () => localStorage.getItem("access_token");
