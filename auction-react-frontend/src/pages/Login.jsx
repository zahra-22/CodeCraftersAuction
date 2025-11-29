import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../utils/axiosClient";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    axiosClient
      .post("/auth/login", { email, password })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data._id);
          setUser(res.data);
          navigate("/profile");
        }
      })
      .catch(() => setErrorMsg("Invalid email or password"));
  };

  return (
    <div style={styles.container}>
      <h1>Login</h1>
      <form style={styles.form} onSubmit={handleLogin}>
        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button style={styles.button}>Login</button>
        {errorMsg && <p style={styles.error}>{errorMsg}</p>}
      </form>
      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

const styles = {
  container: { padding: "20px" },
  form: { maxWidth: "350px", display: "flex", flexDirection: "column", gap: "12px" },
  input: { padding: "10px", fontSize: "16px" },
  button: {
    padding: "10px",
    background: "#222",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
  error: { marginTop: "10px", color: "red" },
};
