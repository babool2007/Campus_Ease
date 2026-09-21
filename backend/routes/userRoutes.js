import express from "express";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Any logged-in user
router.get(
  "/profile",
  protect,
  (req, res) => {
    res.json({
      message: "Protected profile accessed successfully.",
      user: req.user,
    });
  }
);

// Student only
router.get(
  "/student",
  protect,
  authorize("student"),
  (req, res) => {
    res.json({
      message: "Student protected route accessed.",
      user: req.user,
    });
  }
);

// Faculty only
router.get(
  "/faculty",
  protect,
  authorize("faculty"),
  (req, res) => {
    res.json({
      message: "Faculty protected route accessed.",
      user: req.user,
    });
  }
);

// Admin only
router.get(
  "/admin",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({
      message: "Admin protected route accessed.",
      user: req.user,
    });
  }
);

export default router;