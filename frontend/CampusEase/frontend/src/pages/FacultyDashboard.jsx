import {
  Bell,
  CalendarDays,
  Clock3,
  Users,
  ClipboardCheck,
  FileText,
  Megaphone,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function FacultyDashboard() {
  return (
    <>
      {/* SIDEBAR */}
      <Sidebar role="faculty" />

      {/* FACULTY DASHBOARD */}
      <div className="faculty-dashboard">

        {/* HEADER */}
        <header className="faculty-topbar">

          <div>
            <p className="dashboard-label">
              FACULTY PORTAL
            </p>

            <h1>
              Good Morning, Faculty
            </h1>

            <p className="dashboard-description">
              Manage your classes, students and campus responsibilities.
            </p>
          </div>

          <button className="notification-button">
            <Bell size={20} />
          </button>

        </header>


        {/* FACULTY STATS */}
        <section className="faculty-stats">

          <div className="faculty-stat-card">

            <div className="faculty-stat-icon">
              <CalendarDays size={21} />
            </div>

            <div>
              <span>Today's Classes</span>
              <strong>4</strong>
            </div>

          </div>


          <div className="faculty-stat-card">

            <div className="faculty-stat-icon">
              <Users size={21} />
            </div>

            <div>
              <span>Students</span>
              <strong>128</strong>
            </div>

          </div>


          <div className="faculty-stat-card">

            <div className="faculty-stat-icon">
              <ClipboardCheck size={21} />
            </div>

            <div>
              <span>Attendance</span>
              <strong>86%</strong>
            </div>

          </div>


          <div className="faculty-stat-card">

            <div className="faculty-stat-icon">
              <FileText size={21} />
            </div>

            <div>
              <span>Pending Tasks</span>
              <strong>6</strong>
            </div>

          </div>

        </section>


        {/* MAIN CONTENT */}
        <main className="faculty-main">

          {/* TODAY'S SCHEDULE */}
          <section className="faculty-panel">

            <div className="panel-heading">

              <div>
                <p className="panel-label">
                  FACULTY SCHEDULE
                </p>

                <h2>
                  Today's Classes
                </h2>
              </div>

              <CalendarDays size={22} />

            </div>


            <div className="faculty-class-list">

              <div className="faculty-class-item">

                <div className="faculty-time">
                  <Clock3 size={15} />
                  <span>09:00 AM</span>
                </div>

                <div className="faculty-class-info">
                  <h3>
                    Mathematics
                  </h3>

                  <p>
                    CSE • 2nd Year • Room 201
                  </p>
                </div>

                <span className="class-status">
                  COMPLETED
                </span>

              </div>


              <div className="faculty-class-item">

                <div className="faculty-time">
                  <Clock3 size={15} />
                  <span>11:00 AM</span>
                </div>

                <div className="faculty-class-info">
                  <h3>
                    Database Management
                  </h3>

                  <p>
                    CSE • 3rd Year • Lab 03
                  </p>
                </div>

                <span className="class-status active">
                  IN 40 MIN
                </span>

              </div>


              <div className="faculty-class-item">

                <div className="faculty-time">
                  <Clock3 size={15} />
                  <span>02:00 PM</span>
                </div>

                <div className="faculty-class-info">
                  <h3>
                    Java Programming
                  </h3>

                  <p>
                    CSE • 2nd Year • Room 105
                  </p>
                </div>

                <span className="class-status upcoming">
                  UPCOMING
                </span>

              </div>


              <div className="faculty-class-item">

                <div className="faculty-time">
                  <Clock3 size={15} />
                  <span>04:00 PM</span>
                </div>

                <div className="faculty-class-info">
                  <h3>
                    Project Guidance
                  </h3>

                  <p>
                    Final Year • Faculty Cabin
                  </p>
                </div>

                <span className="class-status upcoming">
                  UPCOMING
                </span>

              </div>

            </div>

          </section>


          {/* ATTENDANCE */}
          <section className="faculty-panel">

            <div className="panel-heading">

              <div>
                <p className="panel-label">
                  STUDENT OVERVIEW
                </p>

                <h2>
                  Attendance
                </h2>
              </div>

              <ClipboardCheck size={22} />

            </div>


            <div className="attendance-overview">

              <div className="attendance-circle">

                <strong>
                  86%
                </strong>

                <span>
                  Overall
                </span>

              </div>


              <div className="attendance-details">

                <div>
                  <span>Present</span>
                  <strong>110</strong>
                </div>

                <div>
                  <span>Absent</span>
                  <strong>12</strong>
                </div>

                <div>
                  <span>Leave</span>
                  <strong>6</strong>
                </div>

                <div>
                  <span>Total</span>
                  <strong>128</strong>
                </div>

              </div>

            </div>


            <button className="faculty-action-button">
              Open Attendance
              <ChevronRight size={17} />
            </button>

          </section>


          {/* STUDENT REQUESTS */}
          <section className="faculty-panel">

            <div className="panel-heading">

              <div>
                <p className="panel-label">
                  ACTION REQUIRED
                </p>

                <h2>
                  Student Requests
                </h2>
              </div>

              <Users size={22} />

            </div>


            <div className="request-list">

              <div className="request-item">

                <div className="request-icon">
                  <FileText size={17} />
                </div>

                <div>
                  <h3>
                    Assignment Extension
                  </h3>

                  <p>
                    3 students waiting for approval
                  </p>
                </div>

                <ChevronRight size={17} />

              </div>


              <div className="request-item">

                <div className="request-icon">
                  <ClipboardCheck size={17} />
                </div>

                <div>
                  <h3>
                    Attendance Correction
                  </h3>

                  <p>
                    2 requests require review
                  </p>
                </div>

                <ChevronRight size={17} />

              </div>


              <div className="request-item">

                <div className="request-icon">
                  <FileText size={17} />
                </div>

                <div>
                  <h3>
                    Project Approval
                  </h3>

                  <p>
                    4 submissions pending
                  </p>
                </div>

                <ChevronRight size={17} />

              </div>

            </div>

          </section>


          {/* QUICK ACTIONS */}
          <section className="faculty-panel">

            <div className="panel-heading">

              <div>
                <p className="panel-label">
                  FACULTY TOOLS
                </p>

                <h2>
                  Quick Actions
                </h2>
              </div>

            </div>


            <div className="faculty-actions">

              <button className="faculty-tool">

                <ClipboardCheck size={21} />

                <span>
                  Mark Attendance
                </span>

              </button>


              <button className="faculty-tool">

                <Megaphone size={21} />

                <span>
                  Publish Notice
                </span>

              </button>


              <button className="faculty-tool">

                <FileText size={21} />

                <span>
                  Upload Material
                </span>

              </button>


              <button className="faculty-tool">

                <CheckCircle2 size={21} />

                <span>
                  Review Requests
                </span>

              </button>

            </div>

          </section>

        </main>

      </div>
    </>
  );
}

export default FacultyDashboard;