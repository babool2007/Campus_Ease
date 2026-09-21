import mongoose from "mongoose";

const busSchema = new mongoose.Schema(
  {
    busNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    route: {
      type: String,
      required: true,
      trim: true,
    },

    driver: {
      type: String,
      required: true,
      trim: true,
    },

    contact: {
      type: String,
      default: "",
      trim: true,
    },

    departureTime: {
      type: String,
      required: true,
    },

    returnTime: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Maintenance", "Inactive"],
      default: "Active",
    },

    stops: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Bus = mongoose.model("Bus", busSchema);

export default Bus;