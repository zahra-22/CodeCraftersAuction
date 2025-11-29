import { createContext, useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCheckingAuth(false);
      return;
    }

    axiosClient
      .get("/auth/me")
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("userId", res.data._id);
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setUser(null);
      })
      .finally(() => setCheckingAuth(false));
  }, []);

  if (checkingAuth) {
    return <p style={{ padding: 20 }}>Checking login...</p>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
