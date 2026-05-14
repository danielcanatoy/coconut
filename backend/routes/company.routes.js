import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  createListing,
  getListings,
  getCompanyProfile,
  updateCompanyProfile,
  getApplicants,
  updateApplicationStatus,
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
router.get("/applicants", authMiddleware, getApplicants);

// --- UPDATE APPLICATION STATUS ---
// Ginagamit para i-Approve o i-Reject ang isang worker
router.put("/applications/:id/status", authMiddleware, updateApplicationStatus);

export default router;
