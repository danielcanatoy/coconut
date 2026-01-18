import express from "express";
import {
  createOrUpdateWorkerProfile,
  getWorkerProfileByEmail,
} from "../controllers/worker.controller.js";

const router = express.Router();

router.get("/profile", getWorkerProfileByEmail);
router.post("/profile", createOrUpdateWorkerProfile);

export default router;
