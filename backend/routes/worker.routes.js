import express from "express";
import {
  registerWorker,
  getWorkerProfile,
  updateWorkerProfile,
} from "../controllers/worker.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { db } from "../config/db.js";

const router = express.Router();

// 🆕 Signup
router.post("/profile", registerWorker);

// 🔐 Protected
router.get("/profile", authMiddleware, getWorkerProfile);
router.put("/profile", authMiddleware, updateWorkerProfile);

/* =========================
   APPLY TO JOB
========================= */

router.post("/apply", authMiddleware, (req, res) => {
  if (req.user.role !== "worker") {
    return res.status(403).json({ message: "Workers only" });
  }

  const userId = req.user.id;
  console.log(userId, "USERID");
  const { listingId } = req.body;

  if (!listingId) {
    return res.status(400).json({ message: "listingId is required" });
  }

  // 1️⃣ Get worker.id using logged-in user
  db.query(
    "SELECT id FROM workers WHERE user_id = ?",
    [userId],
    (err, rows) => {
      if (err) {
        console.error("WORKER LOOKUP ERROR:", err);
        return res.status(500).json({ message: "Worker lookup failed" });
      }

      if (rows.length === 0) {
        return res.status(400).json({ message: "Worker profile not found" });
      }

      const workerId = rows[0].id;

      // 2️⃣ Prevent duplicate application
      db.query(
        `
        SELECT id FROM applications
        WHERE listing_id = ? AND worker_id = ?
        `,
        [listingId, workerId],
        (err, existing) => {
          if (err) {
            console.error("DUPLICATE CHECK ERROR:", err);
            return res.status(500).json({ message: "Apply failed" });
          }

          if (existing.length > 0) {
            return res
              .status(400)
              .json({ message: "Already applied to this job" });
          }

          // 3️⃣ Insert application
          db.query(
            "INSERT INTO applications (listing_id, worker_id) VALUES (?, ?)",
            [listingId, workerId],
            (err) => {
              if (err) {
                console.error("APPLY ERROR:", err);
                return res.status(500).json({ message: "Apply failed" });
              }

              res.json({ success: true });
            },
          );
        },
      );
    },
  );
});

export default router;
