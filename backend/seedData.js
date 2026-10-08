import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import User from "./models/User.js";
import Schedule from "./models/Schedule.js";
import Notice from "./models/Notice.js";
import Bus from "./models/Bus.js";
import Attendance from "./models/Attendance.js";
import Complaint from "./models/Complaint.js";
import Approval from "./models/Approval.js";

dotenv.config();

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/campusease";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for seeding...");

    // 1. Users
    let student = await User.findOne({ email: "student@campusease.com" });
    if (!student) {
      const hashPassword = await bcrypt.hash("password123", 10);
      student = await User.create({
        name: "Rahul Verma",
        email: "student@campusease.com",
        password: hashPassword,
        role: "student",
      });
      console.log("Created demo student: student@campusease.com / password123");
    }

    let faculty = await User.findOne({ email: "faculty@campusease.com" });
    if (!faculty) {
      const hashPassword = await bcrypt.hash("password123", 10);
      faculty = await User.create({
        name: "Dr. Anita Sharma",
        email: "faculty@campusease.com",
        password: hashPassword,
        role: "faculty",
      });
      console.log("Created demo faculty: faculty@campusease.com / password123");
    }

    let admin = await User.findOne({ email: "admin@campusease.com" });
    if (!admin) {
      const hashPassword = await bcrypt.hash("password123", 10);
      admin = await User.create({
        name: "Campus Administrator",
        email: "admin@campusease.com",
        password: hashPassword,
        role: "admin",
      });
      console.log("Created demo admin: admin@campusease.com / password123");
    }

    // 2. Schedules
    const scheduleCount = await Schedule.countDocuments();
    if (scheduleCount === 0) {
      await Schedule.insertMany([
        {
          subject: "Data Structures & Algorithms",
          teacher: "Dr. Anita Sharma",
          room: "LH-101",
          day: "Monday",
          startTime: "09:00 AM",
          endTime: "10:30 AM",
          branch: "Computer Science",
          year: 3,
        },
        {
          subject: "Database Management Systems",
          teacher: "Prof. Rajesh Kumar",
          room: "LH-103",
          day: "Monday",
          startTime: "11:00 AM",
          endTime: "12:30 PM",
          branch: "Computer Science",
          year: 3,
        },
        {
          subject: "Operating Systems Lab",
          teacher: "Dr. Sunita Rao",
          room: "Lab-4",
          day: "Tuesday",
          startTime: "02:00 PM",
          endTime: "04:00 PM",
          branch: "Computer Science",
          year: 3,
        },
        {
          subject: "Computer Networks",
          teacher: "Prof. Vikram Sen",
          room: "LH-201",
          day: "Wednesday",
          startTime: "10:00 AM",
          endTime: "11:30 AM",
          branch: "Computer Science",
          year: 3,
        },
        {
          subject: "Artificial Intelligence",
          teacher: "Dr. Anita Sharma",
          room: "LH-102",
          day: "Thursday",
          startTime: "09:30 AM",
          endTime: "11:00 AM",
          branch: "Computer Science",
          year: 3,
        },
      ]);
      console.log("Seeded schedules successfully.");
    }

    // 3. Notices
    const noticeCount = await Notice.countDocuments();
    if (noticeCount === 0) {
      await Notice.insertMany([
        {
          title: "Mid-Semester Examination Schedule Announced",
          description: "Mid-sem examinations for all engineering batches begin next Monday. Timetable is available on the portal.",
          category: "Examination",
          priority: "Urgent",
          audience: "Students",
          publishedBy: "Exam Cell",
        },
        {
          title: "Annual Tech Fest 'Innovate 2026' Registrations Open",
          description: "Register for hackathons, robotics challenges, and paper presentations before Friday evening.",
          category: "Events",
          priority: "Important",
          audience: "All",
          publishedBy: "Student Council",
        },
        {
          title: "Central Library Extended Reading Room Hours",
          description: "During exam weeks, the reading room will remain accessible until 11:00 PM with valid ID.",
          category: "Academic",
          priority: "Normal",
          audience: "All",
          publishedBy: "Chief Librarian",
        },
        {
          title: "Campus Route #3 Bus Timing Revision",
          description: "Bus #3 will depart 15 minutes earlier starting tomorrow due to highway construction.",
          category: "Transport",
          priority: "Important",
          audience: "All",
          publishedBy: "Transport Office",
        },
      ]);
      console.log("Seeded notices successfully.");
    }

    // 4. Buses
    const busCount = await Bus.countDocuments();
    if (busCount === 0) {
      await Bus.insertMany([
        {
          busNumber: "BUS-01",
          route: "City Metro Station ➔ Main Campus",
          driver: "Suresh Patil",
          contact: "+91 98765 43210",
          departureTime: "07:30 AM",
          returnTime: "05:00 PM",
          status: "Active",
          stops: ["Metro Gate 2", "Civil Lines", "Ring Road", "North Gate", "Campus Terminal"],
        },
        {
          busNumber: "BUS-02",
          route: "South Suburbs ➔ Tech Park ➔ Campus",
          driver: "Mohan Lal",
          contact: "+91 98112 23344",
          departureTime: "07:45 AM",
          returnTime: "05:15 PM",
          status: "Active",
          stops: ["Sector 14 Market", "IT Park Circle", "Flyover Junction", "Campus Terminal"],
        },
        {
          busNumber: "BUS-03",
          route: "Central Railway Junction ➔ Campus",
          driver: "Harish Rawat",
          contact: "+91 97234 56789",
          departureTime: "08:00 AM",
          returnTime: "05:30 PM",
          status: "Active",
          stops: ["Railway Station West", "Gandhi Chowk", "University Road", "Campus Terminal"],
        },
      ]);
      console.log("Seeded buses successfully.");
    }

    // 5. Attendance for demo student
    const attendanceCount = await Attendance.countDocuments({ student: student._id });
    if (attendanceCount === 0) {
      const records = [
        { date: "2026-10-01", subject: "Data Structures & Algorithms", status: "Present" },
        { date: "2026-10-02", subject: "Database Management Systems", status: "Present" },
        { date: "2026-10-03", subject: "Computer Networks", status: "Present" },
        { date: "2026-10-04", subject: "Operating Systems Lab", status: "Present" },
        { date: "2026-10-05", subject: "Artificial Intelligence", status: "Absent" },
        { date: "2026-10-06", subject: "Data Structures & Algorithms", status: "Present" },
        { date: "2026-10-07", subject: "Database Management Systems", status: "Present" },
      ];

      for (const r of records) {
        await Attendance.create({
          student: student._id,
          date: r.date,
          subject: r.subject,
          status: r.status,
          markedBy: faculty._id,
        });
      }
      console.log("Seeded attendance for demo student.");
    }

    // 6. Complaints for demo student
    const complaintCount = await Complaint.countDocuments({ reportedBy: student._id });
    if (complaintCount === 0) {
      await Complaint.create({
        title: "Lab 4 Wi-Fi unstable during practicals",
        description: "Frequent disconnects when running Docker containers in OS Lab.",
        category: "IT",
        location: "Computer Lab 4, Block C",
        status: "In Progress",
        priority: "Important",
        assignedTo: "Network Support Team",
        reportedBy: student._id,
      });
      console.log("Seeded complaint for demo student.");
    }

    // 7. Approvals for demo student
    const approvalCount = await Approval.countDocuments({ requestedBy: student._id });
    if (approvalCount === 0) {
      await Approval.create({
        title: "Hackathon Attendance On-Duty Leave",
        description: "Requesting 2-day on-duty leave for participating in National Smart India Hackathon.",
        category: "Event",
        status: "Pending",
        remarks: "Under review by HOD",
        requestedBy: student._id,
      });
      console.log("Seeded approval for demo student.");
    }

    console.log("Database seeded successfully!");
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedDB();
