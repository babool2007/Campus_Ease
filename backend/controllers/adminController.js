import User from "../models/User.js";
import Complaint from "../models/Complaint.js";
import Approval from "../models/Approval.js";
import Attendance from "../models/Attendance.js";
import Bus from "../models/Bus.js";

export const getAdminDashboardStats = async (req, res) => {
  try {
    /* --------------------------------
       TOTAL STUDENTS
    -------------------------------- */

    const totalStudents = await User.countDocuments({
      role: "student",
    });

    /* --------------------------------
       ACTIVE COMPLAINTS
    -------------------------------- */

    const activeComplaints =
      await Complaint.countDocuments({
        status: {
          $ne: "Resolved",
        },
      });

    /* --------------------------------
       ACTIVE BUSES
    -------------------------------- */

    const activeBuses =
      await Bus.countDocuments({
        status: "Active",
      });

    /* --------------------------------
       PENDING APPROVALS
    -------------------------------- */

    const pendingApprovals =
      await Approval.countDocuments({
        status: "Pending",
      });

    /* --------------------------------
       TODAY'S ATTENDANCE
    -------------------------------- */

    const today = new Date();

    const year = today.getFullYear();

    const month = String(
      today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      today.getDate()
    ).padStart(2, "0");

    const todayString =
      `${year}-${month}-${day}`;

    const attendanceRecords =
      await Attendance.find({
        date: todayString,
      }).lean();

    const totalAttendance =
      attendanceRecords.length;

    const presentAttendance =
      attendanceRecords.filter(
        (record) =>
          record.status === "Present"
      ).length;

    const attendancePercentage =
      totalAttendance > 0
        ? Math.round(
            (presentAttendance /
              totalAttendance) *
              100
          )
        : 0;

    /* --------------------------------
       RESPONSE
    -------------------------------- */

    res.json({
      success: true,

      stats: {
        totalStudents,
        activeComplaints,
        attendancePercentage,
        activeBuses,
        pendingApprovals,
      },
    });
  } catch (error) {
    console.error(
      "Admin Dashboard Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to load dashboard statistics",
    });
  }
};