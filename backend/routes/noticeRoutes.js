import express from "express";

import {
  getNotices,
  createNotice,
  deleteNotice,
} from "../controllers/noticeController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// GET NOTICES
// Any logged-in user
// ==========================================

router.get(
  "/",
  protect,
  getNotices
);

// ==========================================
// CREATE NOTICE
// Admin only
// ==========================================

router.post(
  "/",
  protect,
  authorize("admin"),
  createNotice
);

// ==========================================
// DELETE NOTICE
// Admin only
// ==========================================

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteNotice
);

export default router;