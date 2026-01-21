import express from "express";
import {
  createListing,
  getListings,
  getCompanyProfile,
  updateCompanyProfile,
} from "../controllers/company.controller.js";

// ✅ CHANGE THIS TO MATCH YOUR ACTUAL MIDDLEWARE FILENAME
import { authenticateToken } from "../middleware/auth.middleware.js"; 
// OR: import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Profile routes
router.get("/profile", authenticateToken, getCompanyProfile);
router.put("/profile", authenticateToken, updateCompanyProfile);

// Listing routes
router.post("/listing", authenticateToken, createListing);
router.get("/listings", authenticateToken, getListings);

export default router;
