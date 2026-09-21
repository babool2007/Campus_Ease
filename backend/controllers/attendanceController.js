import Attendance from "../models/Attendance.js";
import User from "../models/User.js";


// =====================================
// GET ATTENDANCE
// =====================================

export const getAttendance = async (
  req,
  res
) => {
  try {
    let attendance;

    if (req.user.role === "student") {
      attendance = await Attendance.find({
        student: req.user._id,
      })
        .populate(
          "student",
          "name email"
        )
        .populate(
          "markedBy",
          "name"
        )
        .sort({
          date: -1,
        });
    } else {
      attendance = await Attendance.find()
        .populate(
          "student",
          "name email"
        )
        .populate(
          "markedBy",
          "name"
        )
        .sort({
          date: -1,
        });
    }

    res.json({
      success: true,
      attendance,
    });
  } catch (error) {
    console.error(
      "Get Attendance Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to fetch attendance",
    });
  }
};


// =====================================
// GET STUDENTS
// =====================================

export const getStudents = async (
  req,
  res
) => {
  try {
    const students = await User.find({
      role: "student",
    })
      .select(
        "_id name email"
      )
      .sort({
        name: 1,
      });

    res.json({
      success: true,
      students,
    });
  } catch (error) {
    console.error(
      "Get Students Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to fetch students",
    });
  }
};


// =====================================
// MARK ATTENDANCE
// =====================================

export const markAttendance = async (
  req,
  res
) => {
  try {
    const {
      student,
      date,
      subject,
      status,
    } = req.body;

    if (
      !student ||
      !date ||
      !subject ||
      !status
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required",
      });
    }

    const existingAttendance =
      await Attendance.findOne({
        student,
        date,
        subject,
      });

    if (existingAttendance) {
      existingAttendance.status =
        status;

      existingAttendance.markedBy =
        req.user._id;

      await existingAttendance.save();

      return res.json({
        success: true,
        message:
          "Attendance updated successfully",
        attendance:
          existingAttendance,
      });
    }

    const attendance =
      await Attendance.create({
        student,
        date,
        subject,
        status,
        markedBy: req.user._id,
      });

    res.status(201).json({
      success: true,
      message:
        "Attendance marked successfully",
      attendance,
    });
  } catch (error) {
    console.error(
      "Mark Attendance Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to mark attendance",
    });
  }
};


// =====================================
// DELETE ATTENDANCE
// =====================================

export const deleteAttendance = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const attendance =
      await Attendance.findByIdAndDelete(
        id
      );

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message:
          "Attendance record not found",
      });
    }

    res.json({
      success: true,
      message:
        "Attendance record deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Attendance Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to delete attendance",
    });
  }
};