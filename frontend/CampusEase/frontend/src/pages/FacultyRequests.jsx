import {
  FileCheck,
  Clock3,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function FacultyRequests() {
  const requests = [
    {
      title: "Assignment Extension",
      students: "3 Students",
      reason: "Requested additional time for submission.",
      status: "PENDING",
    },
    {
      title: "Attendance Correction",
      students: "2 Students",
      reason: "Students requested correction for attendance records.",
      status: "PENDING",
    },
    {
      title: "Project Approval",
      students: "4 Students",
      reason: "Project topics submitted for faculty approval.",
      status: "REVIEW",
    },
    {
      title: "Leave Request",
      students: "1 Student",
      reason: "Medical leave application submitted.",
      status: "APPROVED",
    },
  ];

  return (
    <>
      <Sidebar role="faculty" />

      <div className="faculty-dashboard">
        <div className="faculty-topbar">
          <div>
            <p className="dashboard-label">STUDENT SERVICES</p>
            <h1>Student Requests</h1>
            <p className="dashboard-description">
              Review applications and requests submitted by students.
            </p>
          </div>
        </div>

        <div className="dashboard-panel faculty-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-label">REVIEW CENTER</p>
              <h2>Pending Requests</h2>
            </div>

            <FileCheck size={22} />
          </div>

          <div className="notice-list">
            {requests.map((request, index) => (
              <div className="notice-item" key={index}>
                {request.status === "APPROVED" ? (
                  <CheckCircle2 size={20} />
                ) : (
                  <FileCheck size={20} />
                )}

                <div style={{ flex: 1 }}>
                  <h3>{request.title}</h3>

                  <p>
                    {request.students} • {request.reason}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginTop: "9px",
                      color:
                        request.status === "APPROVED"
                          ? "#61d68b"
                          : "#3198ff",
                      fontSize: "10px",
                      fontWeight: "700",
                    }}
                  >
                    <Clock3 size={13} />
                    {request.status}
                  </div>
                </div>

                <ChevronRight size={18} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FacultyRequests;