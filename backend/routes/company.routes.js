import express from "express";
import {
  createListing,
  getListings,
} from "../controllers/company.controller.js";

const router = express.Router();

router.post("/listings", createListing);
router.get("/listings", getListings);

export default router;
