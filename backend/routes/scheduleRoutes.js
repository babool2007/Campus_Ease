import express from "express";

import {
  getSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../controllers/scheduleController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// GET ALL SCHEDULES
// ==========================================

router.get(
  "/",
  protect,
  getSchedules
);

// ==========================================
// CREATE SCHEDULE
// ADMIN + FACULTY
// ==========================================

router.post(
  "/",
  protect,
  authorize("admin", "faculty"),
  createSchedule
);

// ==========================================
// UPDATE SCHEDULE
// ADMIN + FACULTY
// ==========================================

router.put(
  "/:id",
  protect,
  authorize("admin", "faculty"),
  updateSchedule
);

// ==========================================
// DELETE SCHEDULE
// ADMIN ONLY
// ==========================================

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteSchedule
);

export default router;