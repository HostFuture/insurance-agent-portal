// Importing Build-In Package
import { createAuthProvider } from "react-token-auth";


export const { useAuth, authFetch, login, logout } = createAuthProvider({
  getAccessToken: (session) => session.accessToken,
  storage: localStorage,
  onUpdateToken: (token) =>
    fetch("/auth/token", {
        method: "POST",
        body: token.refreshToken,
    }).then(r => r.json()),
});