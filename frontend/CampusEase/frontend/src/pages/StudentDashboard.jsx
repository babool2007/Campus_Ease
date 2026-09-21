import {
  Bell,
  CalendarDays,
  Clock3,
  MessageCircle,
  FileText,
  Bus,
  ClipboardCheck,
  ChevronRight,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function StudentDashboard() {
  return (
    <>
      {/* SIDEBAR */}
      <Sidebar role="student" />

      {/* DASHBOARD */}
      <div className="student-dashboard">

        {/* TOP BAR */}
        <header className="student-topbar">
          <div>
            <p className="dashboard-label">
              STUDENT PORTAL
            </p>

            <h1>
              Good Morning, Student
            </h1>

            <p className="dashboard-description">
              Everything you need for your campus, in one place.
            </p>
          </div>

          <button className="notification-button">
            <Bell size={20} />
          </button>
        </header>


        {/* QUICK STATS */}
        <section className="student-stats">

          <div className="student-stat-card">
            <div className="stat-icon">
              <CalendarDays size={20} />
            </div>

            <div>
              <span>Today's Classes</span>
              <strong>3</strong>
            </div>
          </div>


          <div className="student-stat-card">
            <div className="stat-icon">
              <Bell size={20} />
            </div>

            <div>
              <span>Important Notices</span>
              <strong>4</strong>
            </div>
          </div>


          <div className="student-stat-card">
            <div className="stat-icon">
              <ClipboardCheck size={20} />
            </div>

            <div>
              <span>Attendance</span>
              <strong>86%</strong>
            </div>
          </div>

        </section>


        {/* MAIN GRID */}
        <main className="student-main">

          {/* TODAY'S CLASSES */}
          <section className="dashboard-panel">

            <div className="panel-heading">

              <div>
                <p className="panel-label">
                  SCHEDULE
                </p>

                <h2>
                  Today's Classes
                </h2>
              </div>

              <CalendarDays size={22} />

            </div>


            <div className="class-list">

              <div className="class-item">

                <div className="class-time">
                  <Clock3 size={16} />
                  <span>09:00 AM</span>
                </div>

                <div className="class-info">
                  <h3>Mathematics</h3>
                  <p>Room 201 • Lecture</p>
                </div>

                <ChevronRight size={18} />

              </div>


              <div className="class-item">

                <div className="class-time">
                  <Clock3 size={16} />
                  <span>11:00 AM</span>
                </div>

                <div className="class-info">
                  <h3>DBMS Lab</h3>
                  <p>Lab 03 • Practical</p>
                </div>

                <ChevronRight size={18} />

              </div>


              <div className="class-item">

                <div className="class-time">
                  <Clock3 size={16} />
                  <span>02:00 PM</span>
                </div>

                <div className="class-info">
                  <h3>Java Programming</h3>
                  <p>Room 105 • Lecture</p>
                </div>

                <ChevronRight size={18} />

              </div>

            </div>

          </section>


          {/* IMPORTANT NOTICES */}
          <section className="dashboard-panel">

            <div className="panel-heading">

              <div>
                <p className="panel-label">
                  CAMPUS UPDATES
                </p>

                <h2>
                  Important Notices
                </h2>
              </div>

              <Bell size={22} />

            </div>


            <div className="notice-list">

              <div className="notice-item">

                <div className="notice-dot"></div>

                <div>
                  <h3>
                    Semester Examination Registration
                  </h3>

                  <p>
                    Registration deadline approaching.
                  </p>
                </div>

              </div>


              <div className="notice-item">

                <div className="notice-dot"></div>

                <div>
                  <h3>
                    Campus Holiday Notice
                  </h3>

                  <p>
                    Check the latest academic calendar.
                  </p>
                </div>

              </div>


              <div className="notice-item">

                <div className="notice-dot"></div>

                <div>
                  <h3>
                    Internal Assessment Schedule
                  </h3>

                  <p>
                    Updated schedule is available.
                  </p>
                </div>

              </div>

            </div>

          </section>


          {/* QUICK SERVICES */}
          <section className="dashboard-panel services-panel">

            <div className="panel-heading">

              <div>
                <p className="panel-label">
                  CAMPUS SERVICES
                </p>

                <h2>
                  Quick Services
                </h2>
              </div>

            </div>


            <div className="service-grid">

              <button className="service-card">
                <FileText size={22} />
                <span>Apply for Approval</span>
              </button>


              <button className="service-card">
                <MessageCircle size={22} />
                <span>Report a Complaint</span>
              </button>


              <button className="service-card">
                <Bus size={22} />
                <span>Campus Bus</span>
              </button>


              <button className="service-card">
                <MessageCircle size={22} />
                <span>Ask AI Assistant</span>
              </button>

            </div>

          </section>

        </main>

      </div>
    </>
  );
}

export default StudentDashboard;