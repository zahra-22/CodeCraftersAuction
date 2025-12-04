import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

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
      if (!origin) return callback(null, true); // Allow requests with no origin (Postman, mobile apps)
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked: " + origin), false);
      }
    },
    credentials: true,
  })
);

// ======================
// Import Routes
// ======================
import authRoutes from "./routes/auth.routes.js";
import auctionRoutes from "./routes/auction.routes.js";
import bidRoutes from "./routes/bid.routes.js";   // Only if this file exists

// ======================
// Use Routes
// ======================
app.use("/api/auth", authRoutes);
app.use("/api/auctions", auctionRoutes);
app.use("/api/bids", bidRoutes); // If bid.routes.js exists

// ======================
// Database Connection
// ======================
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("🌿 MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ======================
// Start Server
// ======================
const PORT = process.env.PORT || 4000; // Render overrides PORT automatically

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
