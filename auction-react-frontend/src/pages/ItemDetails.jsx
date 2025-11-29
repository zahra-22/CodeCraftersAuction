import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axiosClient from "../utils/axiosClient";
import { AuthContext } from "../context/AuthContext";

export default function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [item, setItem] = useState(null);
  const [bids, setBids] = useState([]);
  const [message, setMessage] = useState("");
  const [bidAmount, setBidAmount] = useState("");

  const loadAuction = () => {
    axiosClient
      .get(`/auctions/${id}`)
      .then((res) => setItem(res.data))
      .catch(() => navigate("/"));
  };

  const loadBids = () => {
    axiosClient
      .get(`/bids/${id}`)
      .then((res) => setBids(res.data.reverse())) // newest first
      .catch(() => {});
  };

  useEffect(() => {
    loadAuction();
    loadBids();
  }, [id]);

  if (!item) return <p style={{ padding: 20 }}>Loading...</p>;

  const handleBid = (e) => {
    e.preventDefault();
    setMessage("");

    axiosClient
      .post(`/bids/${id}`, { amount: Number(bidAmount) })
      .then(() => {
        setMessage("Bid placed successfully!");
        setBidAmount("");
        loadAuction(); // refresh auction price
        loadBids();    // refresh bid history
      })
      .catch((err) =>
        setMessage(err.response?.data?.message || "Something went wrong")
      );
  };

  return (
    <div style={styles.container}>
      <h1>{item.title}</h1>
      <p>{item.description}</p>
      <p><strong>Current Price:</strong> ${item.currentPrice}</p>
      <p><strong>Status:</strong> {item.status}</p>
      <p><strong>Seller:</strong> {item.seller?.username}</p>

      {/* Bidding Form */}
      {user && item.status === "OPEN" && item.seller?._id !== user._id && (
        <form onSubmit={handleBid} style={styles.bidForm}>
          <input
            type="number"
            min={item.currentPrice + 1}
            placeholder="Enter your bid"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            required
            style={styles.input}
          />
          <button style={styles.button}>Place Bid</button>
        </form>
      )}

      {message && <p style={styles.msg}>{message}</p>}

      {/* Seller Controls */}
      {user && item.seller?._id === user._id && (
        <div style={styles.actions}>
          <Link to={`/edit/${item._id}`}>
            <button style={styles.edit}>Edit</button>
          </Link>
          <button
            style={styles.delete}
            onClick={() =>
              axiosClient.delete(`/auctions/${id}`).then(() => navigate("/"))
            }
          >
            Delete
          </button>
        </div>
      )}

      {/* Bid History */}
      <h2 style={{ marginTop: 35 }}>Bid History</h2>
      {bids.length === 0 ? (
        <p>No bids yet.</p>
      ) : (
        <ul style={styles.bidList}>
          {bids.map((b) => (
            <li key={b._id}>
              • <strong>{b.bidder?.username || "Someone"}</strong> placed ${b.amount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: { padding: 20 },
  bidForm: { marginTop: 20, display: "flex", gap: 10 },
  input: { padding: 10, width: 180 },
  button: {
    padding: "10px 14px",
    background: "#0a7",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
  msg: { marginTop: 12, fontWeight: "bold" },
  actions: { marginTop: 20, display: "flex", gap: 12 },
  edit: { background: "#444", color: "white", padding: "8px 14px", border: "none" },
  delete: { background: "red", color: "white", padding: "8px 14px", border: "none" },
  bidList: { marginTop: 10, listStyle: "none", paddingLeft: 0, fontSize: 17 },
};
