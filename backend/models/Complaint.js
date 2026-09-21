import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
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
        "Electrical",
        "Plumbing",
        "Classroom",
        "Hostel",
        "Transport",
        "Cleanliness",
        "IT",
        "Other",
      ],
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "Reported",
        "Assigned",
        "In Progress",
        "Resolved",
      ],
      default: "Reported",
    },

    priority: {
      type: String,
      enum: [
        "Normal",
        "Important",
        "Urgent",
      ],
      default: "Normal",
    },

    assignedTo: {
      type: String,
      default: "Not Assigned",
      trim: true,
    },

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model(
  "Complaint",
  complaintSchema
);

export default Complaint;