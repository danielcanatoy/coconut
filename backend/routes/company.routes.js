import express from "express";
import {
  createListing,
  getListings,
} from "../controllers/company.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/listings", authMiddleware, createListing);
router.get("/listings", authMiddleware, getListings);

export default router;
