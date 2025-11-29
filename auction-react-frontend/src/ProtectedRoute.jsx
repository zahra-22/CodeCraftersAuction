import { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import axiosClient from "./utils/axiosClient";
import { AuthContext } from "./context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, setUser } = useContext(AuthContext);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setChecking(false);
      return;
    }

    axiosClient
      .get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setUser(null);
      })
      .finally(() => setChecking(false));

    //  IMPORTANT: prevents React hooks infinite loop + warning removed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (checking) {
    return <p style={{ padding: 20 }}>Checking login...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
