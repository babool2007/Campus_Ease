import { useEffect, useState } from "react";

import {
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  CalendarDays,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import api from "../services/api";

import "../styles/dashboard.css";

function StudentAttendance() {
  const [attendance, setAttendance] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  const fetchAttendance = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await api.get(
          "/attendance"
        );

      setAttendance(
        response.data.attendance || []
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to load attendance"
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchAttendance();
  }, []);


  const presentCount =
    attendance.filter(
      (item) =>
        item.status === "Present"
    ).length;

  const absentCount =
    attendance.filter(
      (item) =>
        item.status === "Absent"
    ).length;

  const total =
    attendance.length;

  const percentage =
    total > 0
      ? Math.round(
          (presentCount / total) *
            100
        )
      : 0;


  return (
    <div className="student-dashboard">

      <Sidebar role="student" />

      <main className="dashboard-main">

        <div className="dashboard-header">

          <div>

            <p className="dashboard-label">
              STUDENT PORTAL
            </p>

            <h1>
              Attendance
            </h1>

            <p>
              View your academic
              attendance record.
            </p>

          </div>

        </div>


        {error && (
          <div className="dashboard-error">
            {error}
          </div>
        )}


        <div className="attendance-summary-grid">

          <div className="attendance-summary-card">

            <span>
              ATTENDANCE
            </span>

            <strong>
              {percentage}%
            </strong>

            <small>
              Overall attendance
            </small>

          </div>


          <div className="attendance-summary-card">

            <span>
              PRESENT
            </span>

            <strong>
              {presentCount}
            </strong>

            <small>
              Classes attended
            </small>

          </div>


          <div className="attendance-summary-card">

            <span>
              ABSENT
            </span>

            <strong>
              {absentCount}
            </strong>

            <small>
              Classes missed
            </small>

          </div>

        </div>


        <section className="admin-schedule-section">

          <div className="section-heading">

            <div>

              <p className="dashboard-label">
                ATTENDANCE LOG
              </p>

              <h2>
                Class Records
              </h2>

            </div>

            <span>
              {total} records
            </span>

          </div>


          {loading ? (

            <div className="dashboard-loading">
              Loading attendance...
            </div>

          ) : attendance.length === 0 ? (

            <div className="dashboard-empty">

              <ClipboardCheck
                size={35}
              />

              <h3>
                No Attendance Records
              </h3>

              <p>
                Your attendance has
                not been recorded yet.
              </p>

            </div>

          ) : (

            <div className="attendance-register">

              {attendance.map(
                (record) => (

                  <div
                    className="attendance-row"
                    key={record._id}
                  >

                    <div className="attendance-student">

                      <div className="attendance-record-icon">

                        {record.status ===
                        "Present" ? (
                          <CheckCircle2
                            size={17}
                          />
                        ) : (
                          <XCircle
                            size={17}
                          />
                        )}

                      </div>

                      <div>

                        <strong>
                          {record.subject}
                        </strong>

                        <small>
                          <CalendarDays
                            size={12}
                          />

                          {new Date(
                            record.date
                          ).toLocaleDateString()}
                        </small>

                      </div>

                    </div>


                    <span
                      className={
                        record.status ===
                        "Present"
                          ? "attendance-status-present"
                          : "attendance-status-absent"
                      }
                    >
                      {record.status}
                    </span>

                  </div>

                )
              )}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default StudentAttendance;