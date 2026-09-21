import { CalendarDays, Clock3, MapPin, Users } from "lucide-react";

import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function FacultySchedule() {
  const classes = [
    {
      subject: "Mathematics",
      time: "09:00 AM",
      room: "Room 201",
      students: 42,
      status: "COMPLETED",
    },
    {
      subject: "Database Management",
      time: "11:00 AM",
      room: "Lab 03",
      students: 38,
      status: "ACTIVE",
    },
    {
      subject: "Java Programming",
      time: "02:00 PM",
      room: "Room 105",
      students: 45,
      status: "UPCOMING",
    },
    {
      subject: "Project Guidance",
      time: "04:00 PM",
      room: "Room 302",
      students: 18,
      status: "UPCOMING",
    },
  ];

  return (
    <>
      <Sidebar role="faculty" />

      <div className="faculty-dashboard">
        <div className="faculty-topbar">
          <div>
            <p className="dashboard-label">ACADEMIC SCHEDULE</p>
            <h1>My Schedule</h1>
            <p className="dashboard-description">
              Manage your classes and academic sessions.
            </p>
          </div>
        </div>

        <div className="dashboard-panel faculty-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-label">TODAY</p>
              <h2>Teaching Schedule</h2>
            </div>

            <CalendarDays size={22} />
          </div>

          <div className="class-list">
            {classes.map((item, index) => (
              <div className="class-item" key={index}>
                <div className="class-time">
                  <Clock3 size={15} />
                  <span>{item.time}</span>
                </div>

                <div className="class-info">
                  <h3>{item.subject}</h3>

                  <p>
                    {item.room} • {item.students} Students
                  </p>
                </div>

                <div
                  className={`faculty-class-status ${item.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="dashboard-panel faculty-panel"
          style={{ marginTop: "22px" }}
        >
          <div className="panel-heading">
            <div>
              <p className="panel-label">TEACHING LOAD</p>
              <h2>Today's Overview</h2>
            </div>

            <Users size={22} />
          </div>

          <p className="dashboard-description">
            You have 4 academic sessions scheduled today with approximately
            128 students across your classes.
          </p>
        </div>
      </div>
    </>
  );
}

export default FacultySchedule;