import mongoose from "mongoose";

const approvalSchema = new mongoose.Schema(
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
        "Leave",
        "Bonafide",
        "ID Card",
        "Academic",
        "Event",
        "Hostel",
        "Transport",
        "Other",
      ],
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
      ],
      default: "Pending",
    },

    remarks: {
      type: String,
      default: "",
      trim: true,
    },

    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Approval = mongoose.model(
  "Approval",
  approvalSchema
);

export default Approval;