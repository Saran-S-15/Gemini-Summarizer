import express from "express";
import protectedRoute from "../middleware/protectedRoute.js";
import { createSummary, deleteSummary, getAllSummaries, getSingleSummary } from "../controllers/summary.controller.js";

const router = express.Router();

router.post("/", protectedRoute, createSummary);
router.get("/", protectedRoute, getAllSummaries);
router.get("/:id", protectedRoute, getSingleSummary);
router.delete("/:id", protectedRoute, deleteSummary);

export default router;