import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../utils/axiosClient";

export default function AddItem() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();

    axiosClient
      .post("/auctions", {
        title,
        description,
        startingPrice: Number(startingPrice),
        endTime,
      })
      .then(() => navigate("/profile"))
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Add New Auction Item</h1>

      <form onSubmit={handleAdd} style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 400 }}>
        <input type="text" placeholder="Item Title" value={title}
          onChange={(e) => setTitle(e.target.value)} required />

        <textarea placeholder="Description" value={description}
          onChange={(e) => setDescription(e.target.value)} rows="4" required />

        <input type="number" placeholder="Starting Price" value={startingPrice}
          onChange={(e) => setStartingPrice(e.target.value)} required />

        <input type="datetime-local" value={endTime}
          onChange={(e) => setEndTime(e.target.value)} required />

        <button style={{ background: "#222", color: "white", padding: 10 }}>Add Item</button>
      </form>
    </div>
  );
}
