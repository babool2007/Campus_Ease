import Approval from "../models/Approval.js";


// GET APPROVALS
export const getApprovals = async (req, res) => {
  try {
    let approvals;

    if (req.user.role === "admin") {
      approvals = await Approval.find()
        .populate(
          "requestedBy",
          "name email role"
        )
        .populate(
          "reviewedBy",
          "name email"
        )
        .sort({
          createdAt: -1,
        });
    } else {
      approvals = await Approval.find({
        requestedBy: req.user._id,
      })
        .populate(
          "requestedBy",
          "name email role"
        )
        .populate(
          "reviewedBy",
          "name email"
        )
        .sort({
          createdAt: -1,
        });
    }

    res.json({
      success: true,
      approvals,
    });
  } catch (error) {
    console.error(
      "Get Approvals Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to fetch approvals",
    });
  }
};


// STUDENT CREATES APPROVAL REQUEST
export const createApproval = async (
  req,
  res
) => {
  try {
    const {
      title,
      description,
      category,
    } = req.body;

    if (
      !title ||
      !description ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All required fields must be filled",
      });
    }

    const approval =
      await Approval.create({
        title,
        description,
        category,
        requestedBy: req.user._id,
      });

    res.status(201).json({
      success: true,
      message:
        "Approval request submitted successfully",
      approval,
    });
  } catch (error) {
    console.error(
      "Create Approval Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to submit approval request",
    });
  }
};


// ADMIN UPDATES APPROVAL
export const updateApproval = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const {
      status,
      remarks,
    } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const approval =
      await Approval.findByIdAndUpdate(
        id,
        {
          status,
          remarks:
            remarks || "",
          reviewedBy: req.user._id,
        },
        {
          new: true,
          runValidators: true,
        }
      )
        .populate(
          "requestedBy",
          "name email role"
        )
        .populate(
          "reviewedBy",
          "name email"
        );

    if (!approval) {
      return res.status(404).json({
        success: false,
        message: "Approval request not found",
      });
    }

    res.json({
      success: true,
      message:
        "Approval request updated successfully",
      approval,
    });
  } catch (error) {
    console.error(
      "Update Approval Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to update approval request",
    });
  }
};


// ADMIN DELETE
export const deleteApproval = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const approval =
      await Approval.findByIdAndDelete(id);

    if (!approval) {
      return res.status(404).json({
        success: false,
        message: "Approval request not found",
      });
    }

    res.json({
      success: true,
      message:
        "Approval request deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Approval Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to delete approval request",
    });
  }
};