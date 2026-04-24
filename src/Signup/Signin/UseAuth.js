import { useContext, createContext } from "react";

export const AuthContext = createContext(undefined);
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContext");
  }
  return context;
}
