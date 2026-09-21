import Bus from "../models/Bus.js";

/* -----------------------------------------
   GET ALL BUSES
----------------------------------------- */

export const getBuses = async (req, res) => {
  try {
    const buses = await Bus.find()
      .sort({ busNumber: 1 })
      .lean();

    res.json({
      success: true,
      buses,
    });
  } catch (error) {
    console.error("Get Buses Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch buses",
    });
  }
};

/* -----------------------------------------
   GET SINGLE BUS
----------------------------------------- */

export const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id).lean();

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    res.json({
      success: true,
      bus,
    });
  } catch (error) {
    console.error("Get Bus Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch bus",
    });
  }
};

/* -----------------------------------------
   CREATE BUS
----------------------------------------- */

export const createBus = async (req, res) => {
  try {
    const {
      busNumber,
      route,
      driver,
      contact,
      departureTime,
      returnTime,
      status,
      stops,
    } = req.body;

    if (
      !busNumber ||
      !route ||
      !driver ||
      !departureTime ||
      !returnTime
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Bus number, route, driver and timings are required",
      });
    }

    const existingBus = await Bus.findOne({
      busNumber: busNumber.trim(),
    });

    if (existingBus) {
      return res.status(400).json({
        success: false,
        message: "Bus number already exists",
      });
    }

    const bus = await Bus.create({
      busNumber,
      route,
      driver,
      contact,
      departureTime,
      returnTime,
      status,
      stops,
    });

    res.status(201).json({
      success: true,
      message: "Bus added successfully",
      bus,
    });
  } catch (error) {
    console.error("Create Bus Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create bus",
    });
  }
};

/* -----------------------------------------
   UPDATE BUS
----------------------------------------- */

export const updateBus = async (req, res) => {
  try {
    const {
      busNumber,
      route,
      driver,
      contact,
      departureTime,
      returnTime,
      status,
      stops,
    } = req.body;

    const bus = await Bus.findById(req.params.id);

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    bus.busNumber = busNumber;
    bus.route = route;
    bus.driver = driver;
    bus.contact = contact;
    bus.departureTime = departureTime;
    bus.returnTime = returnTime;
    bus.status = status;
    bus.stops = stops;

    await bus.save();

    res.json({
      success: true,
      message: "Bus updated successfully",
      bus,
    });
  } catch (error) {
    console.error("Update Bus Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update bus",
    });
  }
};

/* -----------------------------------------
   DELETE BUS
----------------------------------------- */

export const deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    await bus.deleteOne();

    res.json({
      success: true,
      message: "Bus deleted successfully",
    });
  } catch (error) {
    console.error("Delete Bus Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete bus",
    });
  }
};