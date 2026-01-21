import express from "express";
import { db } from "../config/db.js"; // Siguraduhing tama ang path ng db config mo
import {
  createListing,
  getListings,
} from "../controllers/company.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// --- LISTINGS ---
router.post("/listings", authMiddleware, createListing);
router.get("/listings", authMiddleware, getListings);

// --- APPLICANTS ---
// Mas mainam gamitin ang authMiddleware para makuha ang employerId mula sa token
router.get("/applicants", authMiddleware, (req, res) => {
  // Gagamit tayo ng JOIN para makuha ang details ng worker at ang job position
  const sql = `
    SELECT 
      a.id AS application_id,
      a.status,
      a.applied_at,
      l.position AS job_title,
      w.first_name,
      w.last_name,
      w.mobile_number,
      w.skills,
      w.experience
    FROM applications a
    JOIN listings l ON a.listing_id = l.id
    JOIN workers w ON a.worker_id = w.id
    WHERE l.employer_id = ?
    ORDER BY a.applied_at DESC
  `;

  // req.user.id ay galing sa authMiddleware (decoded token)
  const employerId = req.user.id; 

  db.query(sql, [employerId], (err, results) => {
    if (err) {
      console.error("❌ SQL Error in fetching applicants:", err);
      return res.status(500).json({ error: "Database error" });
    }
    console.log(`✅ Found ${results.length} applicants for employer ${employerId}`);
    res.json(results);
  });
});

// --- UPDATE APPLICATION STATUS ---
router.put("/applications/:id/status", authMiddleware, (req, res) => {
  const { status } = req.body; // Dapat 'Approved' o 'Rejected'
  const applicationId = req.params.id;

  const sql = "UPDATE applications SET status = ? WHERE id = ?";
  
  db.query(sql, [status, applicationId], (err, result) => {
    if (err) {
      console.error("❌ Error updating status:", err);
      return res.status(500).json({ error: "Database update failed" });
    }
    res.json({ message: `Application ${status} successfully!` });
  });
});

export default router;