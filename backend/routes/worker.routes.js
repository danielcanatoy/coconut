import express from "express";
import { db } from "../config/db.js"; 
import {
  createOrUpdateWorkerProfile,
  getWorkerProfileByEmail,
} from "../controllers/worker.controller.js";

const router = express.Router();

// --- PROFILE ROUTES ---
router.get("/profile", getWorkerProfileByEmail);
router.post("/profile", createOrUpdateWorkerProfile);


// --- JOB LISTINGS ROUTES ---
router.get("/listings", (req, res) => {
  const sql = `
    SELECT 
      l.*, 
      e.company_name 
    FROM listings l
    LEFT JOIN employers e ON l.employer_id = e.id
    ORDER BY l.created_at DESC
  `;
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error fetching listings:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results); 
  });
});


// --- APPLICATION ROUTES ---
router.post("/apply", (req, res) => {
  // 1. Kunin ang data mula sa req.body
  const { listing_id, worker_id } = req.body;

  // 2. Debugging: Mahalaga ito para makita kung walang laman ang pinapadala ng frontend
  console.log("📨 Data received from frontend:", req.body);

  // 3. Validation
  if (!listing_id || !worker_id) {
    console.log("⚠️ Validation Failed: Missing fields");
    return res.status(400).json({ 
      error: "Missing listing_id or worker_id",
      received: req.body 
    });
  }

  // 4. SQL Query - Sinama natin ang 'Pending' as default status
  const sql = "INSERT INTO applications (listing_id, worker_id, status) VALUES (?, ?, 'Pending')";
  
  db.query(sql, [listing_id, worker_id], (err, result) => {
    if (err) {
      console.error("❌ SQL Error during application:", err);
      // Ipinapakita ang eksaktong error ng SQL para mas madali i-debug
      return res.status(500).json({ error: "Database insertion failed", details: err.message });
    }
    
    console.log("✅ Application saved with ID:", result.insertId);
    res.json({ 
      message: "Success", 
      application_id: result.insertId 
    });
  });
});

export default router;