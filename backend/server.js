import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

import authRoutes from "./routes/auth.routes.js";
import workerRoutes from "./routes/worker.routes.js";
import companyRoutes from "./routes/company.routes.js";
import "./config/db.js";

const app = express();

// ✅ CORS - allows local dev + production frontend
app.use(cors({
  origin: true, // allows all origins temporarily
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/worker", workerRoutes);
app.use("/api/company", companyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});