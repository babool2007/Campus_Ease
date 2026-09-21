import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Academic",
        "Examination",
        "Events",
        "Transport",
        "Administration",
        "General",
      ],
    },

    priority: {
      type: String,
      required: true,
      enum: [
        "Normal",
        "Important",
        "Urgent",
      ],
      default: "Normal",
    },

    audience: {
      type: String,
      required: true,
      enum: [
        "All",
        "Students",
        "Faculty",
        "Students & Faculty",
      ],
      default: "All",
    },

    publishedBy: {
      type: String,
      default: "Campus Administration",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Notice = mongoose.model(
  "Notice",
  noticeSchema
);

export default Notice;