import express from "express";

import {
  getApprovals,
  createApproval,
  updateApproval,
  deleteApproval,
} from "../controllers/approvalController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();


// Get approvals
router.get(
  "/",
  protect,
  getApprovals
);


// Student submits request
router.post(
  "/",
  protect,
  authorize("student"),
  createApproval
);


// Admin reviews request
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateApproval
);


// Admin deletes request
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteApproval
);


export default router;