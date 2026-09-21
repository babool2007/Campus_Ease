import {
  ClipboardCheck,
  Users,
  TrendingUp,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function AdminAttendance() {
  const departments = [
    { name: "CSE", attendance: 91 },
    { name: "ECE", attendance: 87 },
    { name: "ME", attendance: 82 },
    { name: "EEE", attendance: 84 },
  ];

  return (
    <>
      <Sidebar role="admin" />

      <div className="admin-dashboard">
        <div className="admin-topbar">
          <div>
            <p className="dashboard-label">CAMPUS ANALYTICS</p>
            <h1>Attendance</h1>
            <p className="dashboard-description">
              Monitor attendance across departments and programs.
            </p>
          </div>
        </div>

        <div className="admin-metrics">
          <div className="admin-metric-card">
            <div className="admin-metric-icon">
              <ClipboardCheck size={21} />
            </div>

            <div>
              <span>TODAY'S ATTENDANCE</span>
              <strong>86%</strong>
            </div>
          </div>

          <div className="admin-metric-card">
            <div className="admin-metric-icon">
              <Users size={21} />
            </div>

            <div>
              <span>PRESENT</span>
              <strong>7,341</strong>
            </div>
          </div>

          <div className="admin-metric-card">
            <div className="admin-metric-icon">
              <TrendingUp size={21} />
            </div>

            <div>
              <span>WEEKLY AVERAGE</span>
              <strong>88%</strong>
            </div>
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-label">DEPARTMENT OVERVIEW</p>
              <h2>Attendance by Department</h2>
            </div>

            <ClipboardCheck size={22} />
          </div>

          <div className="admin-attendance-list">
            {departments.map((department, index) => (
              <div
                className="admin-attendance-row"
                key={index}
              >
                <div className="admin-attendance-name">
                  <strong>{department.name}</strong>
                  <span>{department.attendance}%</span>
                </div>

                <div className="admin-attendance-bar">
                  <div
                    style={{
                      width: `${department.attendance}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminAttendance;