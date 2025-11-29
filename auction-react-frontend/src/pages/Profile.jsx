import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../utils/axiosClient";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/auctions")
      .then((res) => {
        const myItems = res.data.filter((item) => {
          // 🔥 Support both seller: "id" and seller: { _id: "id" }
          if (typeof item.seller === "string") {
            return item.seller === user._id;
          }
          if (typeof item.seller === "object") {
            return item.seller?._id === user._id;
          }
          return false;
        });

        setItems(myItems);
      })
      .catch((err) => console.error(err));
  }, [user]);

  return (
    <div style={styles.container}>
      <h1>Your Auction Listings</h1>

      {items.length === 0 ? (
        <p>You have not posted any items yet.</p>
      ) : (
        <div style={styles.grid}>
          {items.map((item) => (
            <div key={item._id} style={styles.card}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>

              <Link to={`/item/${item._id}`}>
                <button style={styles.button}>View Details</button>
              </Link>
            </div>
          ))}
        </div>
      )}

      <Link to="/add">
        <button style={styles.addButton}>Add New Item</button>
      </Link>
    </div>
  );
}

const styles = {
  container: { padding: 20 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 20,
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: 8,
    padding: 15,
  },
  button: {
    marginTop: 10,
    padding: "6px 12px",
    background: "#222",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  addButton: {
    marginTop: 30,
    padding: "12px 20px",
    fontSize: 16,
    background: "#222",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};
