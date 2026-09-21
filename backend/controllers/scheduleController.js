import Schedule from "../models/Schedule.js";

// ==========================================
// GET ALL SCHEDULES
// ==========================================

export const getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().sort({
      day: 1,
      startTime: 1,
    });

    res.json({
      success: true,
      schedules,
    });
  } catch (error) {
    console.error("Get Schedules Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch schedules",
    });
  }
};

// ==========================================
// CREATE SCHEDULE
// ==========================================

export const createSchedule = async (req, res) => {
  try {
    const {
      subject,
      teacher,
      room,
      day,
      startTime,
      endTime,
      branch,
      year,
    } = req.body;

    if (
      !subject ||
      !teacher ||
      !room ||
      !day ||
      !startTime ||
      !endTime ||
      !branch ||
      !year
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const schedule = await Schedule.create({
      subject,
      teacher,
      room,
      day,
      startTime,
      endTime,
      branch,
      year,
    });

    res.status(201).json({
      success: true,
      message: "Schedule created successfully",
      schedule,
    });
  } catch (error) {
    console.error("Create Schedule Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create schedule",
    });
  }
};

// ==========================================
// UPDATE SCHEDULE
// ==========================================

export const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      subject,
      teacher,
      room,
      day,
      startTime,
      endTime,
      branch,
      year,
    } = req.body;

    if (
      !subject ||
      !teacher ||
      !room ||
      !day ||
      !startTime ||
      !endTime ||
      !branch ||
      !year
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const schedule = await Schedule.findByIdAndUpdate(
      id,
      {
        subject,
        teacher,
        room,
        day,
        startTime,
        endTime,
        branch,
        year,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: "Schedule not found",
      });
    }

    res.json({
      success: true,
      message: "Schedule updated successfully",
      schedule,
    });
  } catch (error) {
    console.error("Update Schedule Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update schedule",
    });
  }
};

// ==========================================
// DELETE SCHEDULE
// ==========================================

export const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const schedule = await Schedule.findByIdAndDelete(id);

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: "Schedule not found",
      });
    }

    res.json({
      success: true,
      message: "Schedule deleted successfully",
    });
  } catch (error) {
    console.error("Delete Schedule Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete schedule",
    });
  }
};