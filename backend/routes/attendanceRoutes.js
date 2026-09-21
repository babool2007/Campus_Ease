import express from "express";

import {
  getAttendance,
  getStudents,
  markAttendance,
  deleteAttendance,
} from "../controllers/attendanceController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();


// Get attendance
router.get(
  "/",
  protect,
  getAttendance
);


// Get students
router.get(
  "/students",
  protect,
  authorize("faculty", "admin"),
  getStudents
);


// Faculty marks attendance
router.post(
  "/",
  protect,
  authorize("faculty", "admin"),
  markAttendance
);


// Admin deletes attendance
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteAttendance
);


export default router;