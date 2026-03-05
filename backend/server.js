// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// Debug env variables
console.log("✅ ENV VARIABLES LOADED:");
console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ exists" : "❌ missing");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✅ exists" : "❌ missing");
console.log("JWT_EXPIRE:", process.env.JWT_EXPIRE ? process.env.JWT_EXPIRE : "(default 1d)");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Test route (optional)
app.get("/api/test-db", async (req, res) => {
  try {
    const users = await (await import("./models/User.js")).default.find();
    res.json({ message: "DB working!", count: users.length });
  } catch (err) {
    console.error("DB TEST ERROR:", err);
    res.status(500).json({ message: "DB connection failed", error: err });
  }
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));