import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // 👈 1. IMPORT THIS

dotenv.config();

import authRoutes from "./routes/auth.routes.js";
import workerRoutes from "./routes/worker.routes.js";
import companyRoutes from "./routes/company.routes.js";
import "./config/db.js";

const app = express();

// ✅ FIXED CORS - allows React + cookies
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"], 
  credentials: true
}));

app.use(cookieParser()); // 👈 2. USE THIS (Before routes!)
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/worker", workerRoutes);
app.use("/api/company", companyRoutes);

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
