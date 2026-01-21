import express from "express";
import { db } from "../config/db.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  createListing,
  getListings,
  getCompanyProfile,
  updateCompanyProfile,
} from "../controllers/company.controller.js";

const router = express.Router();

// --- PROFILE ROUTES ---
router.get("/profile", authMiddleware, getCompanyProfile);
router.put("/profile", authMiddleware, updateCompanyProfile);

// --- LISTINGS ROUTES ---
router.post("/listings", authMiddleware, createListing);
router.get("/listings", authMiddleware, getListings);

// --- APPLICANTS ROUTES ---
// Kumukuha ng lahat ng aplikante na nag-apply sa mga listings ng employer
router.get("/applicants", authMiddleware, (req, res) => {
  const sql = `
    SELECT 
      a.id AS application_id, a.status, a.applied_at, 
      l.position AS job_title, w.first_name, w.last_name, 
      w.mobile_number, w.skills, w.experience
    FROM applications a
    JOIN listings l ON a.listing_id = l.id
    JOIN workers w ON a.worker_id = w.id
    WHERE l.employer_id = ?
    ORDER BY a.applied_at DESC
  `;

  // req.user.id ay galing sa decoded token ng authMiddleware
  db.query(sql, [req.user.id], (err, results) => {
    if (err) {
      console.error("❌ SQL Error in fetching applicants:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// --- UPDATE APPLICATION STATUS ---
// Ginagamit para i-Approve o i-Reject ang isang worker
router.put("/applications/:id/status", authMiddleware, (req, res) => {
  const { status } = req.body; 
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