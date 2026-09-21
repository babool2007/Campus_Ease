import Complaint from "../models/Complaint.js";


// STUDENT + ADMIN
export const getComplaints = async (req, res) => {
  try {
    let complaints;

    if (req.user.role === "admin") {
      complaints = await Complaint.find()
        .populate("reportedBy", "name email")
        .sort({ createdAt: -1 });
    } else {
      complaints = await Complaint.find({
        reportedBy: req.user._id,
      })
        .populate("reportedBy", "name email")
        .sort({ createdAt: -1 });
    }

    res.json({
      success: true,
      complaints,
    });
  } catch (error) {
    console.error("Get Complaints Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch complaints",
    });
  }
};


// STUDENT
export const createComplaint = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      priority,
    } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !location
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    const complaint = await Complaint.create({
      title,
      description,
      category,
      location,
      priority: priority || "Normal",
      reportedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    console.error("Create Complaint Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to submit complaint",
    });
  }
};


// ADMIN
export const updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      status,
      assignedTo,
      priority,
    } = req.body;

    const complaint =
      await Complaint.findByIdAndUpdate(
        id,
        {
          status,
          assignedTo,
          priority,
        },
        {
          new: true,
          runValidators: true,
        }
      ).populate(
        "reportedBy",
        "name email"
      );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    res.json({
      success: true,
      message: "Complaint updated successfully",
      complaint,
    });
  } catch (error) {
    console.error(
      "Update Complaint Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to update complaint",
    });
  }
};


// ADMIN
export const deleteComplaint = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const complaint =
      await Complaint.findByIdAndDelete(id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    res.json({
      success: true,
      message: "Complaint deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Complaint Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to delete complaint",
    });
  }
};