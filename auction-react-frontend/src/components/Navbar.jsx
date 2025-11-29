import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png";   // 🔥 add this

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/" style={styles.brand}>
          <img src={logo} alt="Site Logo" style={styles.logo} />  {/* 🔥 logo shown on all pages */}
          <span>AUCTION APP</span>
        </Link>
      </div>

      <div style={styles.right}>
        <Link style={styles.link} to="/">Home</Link>

        {user ? (
          <>
            <Link style={styles.link} to="/add">Add Item</Link>
            <Link style={styles.link} to="/profile">Profile</Link>
            <button style={styles.logout} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link style={styles.link} to="/login">Login</Link>
            <Link style={styles.link} to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 25px",
    background: "#222",
    color: "white",
  },
  left: { display: "flex", alignItems: "center" },
  brand: {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: 10,
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  logo: {
    height: 45,        // 🔥 adjust size if needed
    width: 45,
    objectFit: "cover",
    borderRadius: "50%", // remove if you don't want circular
  },
  right: { display: "flex", gap: 20, alignItems: "center" },
  link: { color: "white", textDecoration: "none", fontSize: 16 },
  logout: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 12px",
    cursor: "pointer",
    borderRadius: "4px",
  },
};
