import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../utils/axiosClient";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    axiosClient
      .post("/auth/register", { username, email, password })
      .then((res) => {
        setSuccess("Registration successful! Redirecting...");
        setErrorMsg("");
        setTimeout(() => navigate("/login"), 1000);
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Something went wrong. Try again.";
        setErrorMsg(msg);
        setSuccess("");
      });
  };

  return (
    <div style={styles.container}>
      <h1>Register</h1>

      <form style={styles.form} onSubmit={handleRegister}>

        <input
          style={styles.input}
          type="text"
          placeholder="Full Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

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

        <button style={styles.button}>Register</button>

        {success && <p style={styles.success}>{success}</p>}
        {errorMsg && <p style={styles.error}>{errorMsg}</p>}
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

const styles = {
  container: { padding: "20px" },
  form: {
    maxWidth: "350px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    background: "#222",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
  success: { marginTop: "10px", color: "green" },
  error: { marginTop: "10px", color: "red" },
};
