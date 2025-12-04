import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// Load .env variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(express.json());

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",                     // Local Vite dev server
  "https://code-crafters-auction.vercel.app",  // Your deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked: " + origin), false);
      }
    },
    credentials: true,
  })
);

// Import Routes
import authRoutes from "./routes/auth.routes.js";
import auctionRoutes from "./routes/auction.routes.js"; // if you have this route

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/auctions", auctionRoutes); // adjust if your folder name differs

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("🌿 MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// PORT for Render (Render provides its own port)
const PORT = process.env.PORT || 4000;

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
