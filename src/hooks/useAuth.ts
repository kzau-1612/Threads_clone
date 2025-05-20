export const useAuth = () => {
  const signIn = () => {
    localStorage.setItem("isAuthenticated", "true");
  };

  const signOut = () => {
    localStorage.removeItem("isAuthenticated");
  };

  const isLogged = () => {
    const token = localStorage.getItem("isAuthenticated");
    return !!token;
  };

  return { signIn, signOut, isLogged };
};

export type AuthContext = ReturnType<typeof useAuth>;
