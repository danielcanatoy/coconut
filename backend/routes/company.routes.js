import express from "express";
import {
  createListing,
  getListings,
} from "../controllers/company.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { db } from "../config/db.js";

const router = express.Router();

/* =========================
   COMPANY: CREATE / VIEW OWN LISTINGS
========================= */
router.post("/listings", authMiddleware, createListing);
router.get("/listings", authMiddleware, getListings);

/* =========================
   COMPANY: VIEW APPLICANTS
========================= */
router.get("/applicants", authMiddleware, (req, res) => {
  const sql = `
    SELECT
      id,
      listing_id,
      worker_id,
      status,
      applied_at
    FROM applications
    ORDER BY applied_at DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("FETCH APPLICATIONS ERROR:", err);
      return res.status(500).json([]);
    }
    res.json(rows);
  });
});

/* =========================
   COMPANY: APPROVE / REJECT APPLICANT
========================= */
router.put("/applications/:id/status", authMiddleware, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status",
    });
  }

  const sql = `
    UPDATE applications
    SET status = ?
    WHERE id = ?
  `;

  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.error("UPDATE APPLICATION ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to update application status",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.json({
      success: true,
      message: `Application ${status}`,
    });
  });
});

/* =========================
   PUBLIC LISTINGS (FOR WORKERS)
========================= */
router.get("/public-listings", (req, res) => {
  const sql = `
    SELECT
      id,
      position,
      time_in,
      time_out,
      salary,
      location
    FROM listings
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("FETCH PUBLIC LISTINGS ERROR:", err);
      return res.status(500).json([]);
    }
    res.json(rows);
  });
});

export default router;
