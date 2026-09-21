import express from "express";

import {
  getComplaints,
  createComplaint,
  updateComplaint,
  deleteComplaint,
} from "../controllers/complaintController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();


// Get complaints
router.get(
  "/",
  protect,
  getComplaints
);


// Student submits complaint
router.post(
  "/",
  protect,
  authorize("student"),
  createComplaint
);


// Admin updates complaint
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateComplaint
);


// Admin deletes complaint
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteComplaint
);


export default router;