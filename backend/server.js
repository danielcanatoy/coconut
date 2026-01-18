import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import workerRoutes from "./routes/worker.routes.js";
import companyRoutes from "./routes/company.routes.js";
import "./config/db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/worker", workerRoutes);
app.use("/api/company", companyRoutes);

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
