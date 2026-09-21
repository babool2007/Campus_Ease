import Notice from "../models/Notice.js";

// ==========================================
// GET ALL NOTICES
// ==========================================

export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find()
      .sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      notices,
    });
  } catch (error) {
    console.error(
      "Get Notices Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to fetch notices",
    });
  }
};

// ==========================================
// CREATE NOTICE
// ==========================================

export const createNotice = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      priority,
      audience,
    } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !priority ||
      !audience
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const notice = await Notice.create({
      title,
      description,
      category,
      priority,
      audience,
      publishedBy:
        req.user?.name ||
        "Campus Administration",
    });

    res.status(201).json({
      success: true,
      message: "Notice published successfully",
      notice,
    });
  } catch (error) {
    console.error(
      "Create Notice Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to create notice",
    });
  }
};

// ==========================================
// DELETE NOTICE
// ==========================================

export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;

    const notice =
      await Notice.findByIdAndDelete(id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }

    res.json({
      success: true,
      message: "Notice deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Notice Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to delete notice",
    });
  }
};