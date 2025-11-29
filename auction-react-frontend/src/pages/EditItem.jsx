import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../utils/axiosClient";

export default function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [success, setSuccess] = useState("");

  // Load existing data
  useEffect(() => {
    axiosClient
      .get(`/auctions/${id}`)
      .then((res) => {
        setName(res.data.title);
        setDescription(res.data.description);
        setPrice(res.data.startingPrice);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Update item
  const handleUpdate = (e) => {
    e.preventDefault();

    axiosClient
      .put(`/auctions/${id}`, {
        title: name,
        description,
        startingPrice: price,
      })
      .then(() => {
        setSuccess("Item updated successfully!");

        setTimeout(() => {
          navigate(`/item/${id}`);
        }, 800);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={styles.container}>
      <h1>Edit Item</h1>

      <form style={styles.form} onSubmit={handleUpdate}>
        <input
          style={styles.input}
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          style={styles.textarea}
          placeholder="Description"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <input
          style={styles.input}
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <button style={styles.button}>Update Item</button>

        {success && <p style={styles.success}>{success}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: { padding: "20px" },
  form: {
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: { padding: "10px", fontSize: "16px" },
  textarea: { padding: "10px", fontSize: "16px" },
  button: {
    padding: "10px",
    background: "#222",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
  success: { marginTop: "10px", color: "green" },
};
