import express from "express";

import {
  getBuses,
  getBusById,
  createBus,
  updateBus,
  deleteBus,
} from "../controllers/busController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

/* Student / Faculty / Admin */

router.get(
  "/",
  protect,
  getBuses
);

router.get(
  "/:id",
  protect,
  getBusById
);

/* Admin only */

router.post(
  "/",
  protect,
  authorize("admin"),
  createBus
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateBus
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteBus
);

export default router;