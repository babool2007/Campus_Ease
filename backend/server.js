import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import approvalRoutes from "./routes/approvalRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import busRoutes from "./routes/busRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
    credentials: true,
  })
);

app.use(express.json());


// ==========================================
// DATABASE
// ==========================================

connectDB();


// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.json({
    message: "CampusEase Backend Running",
    status: "success",
  });
});


// ==========================================
// API ROUTES
// ==========================================

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/schedules", scheduleRoutes);

app.use("/api/notices", noticeRoutes);

app.use("/api/complaints", complaintRoutes);

app.use("/api/approvals", approvalRoutes);

app.use("/api/attendance", attendanceRoutes);

app.use("/api/buses", busRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/admin", adminRoutes);

// ==========================================
// SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `CampusEase server running on http://localhost:${PORT}`
  );
});