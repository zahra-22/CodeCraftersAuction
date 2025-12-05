import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../utils/axiosClient";

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/auctions")
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Error loading auctions:", err));
  }, []);

  return (
    <div style={styles.container}>
      <h1>All Auction Items For Sale</h1>

      <div style={styles.grid}>
        {items.map((item) => (
          <div key={item._id} style={styles.card}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><strong>Current Price:</strong> ${item.currentPrice}</p>

            <Link to={`/item/${item._id}`}>
              <button style={styles.button}>View Details</button>
            </Link>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <p style={{ marginTop: 20 }}>No auction items found.</p>
      )}
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
    marginTop: 8,
    padding: "6px 12px",
    cursor: "pointer",
  },
};
