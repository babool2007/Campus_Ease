import { useEffect, useState } from "react";

import {
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  Users,
  Save,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import api from "../services/api";

import "../styles/dashboard.css";

function FacultyAttendance() {
  const [students, setStudents] =
    useState([]);

  const [attendance, setAttendance] =
    useState({});

  const [subject, setSubject] =
    useState("");

  const [date, setDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await api.get(
          "/attendance/students"
        );

      setStudents(
        response.data.students || []
      );

      const responseAttendance =
        await api.get(
          "/attendance"
        );

      const records =
        responseAttendance.data.attendance ||
        [];

      const todayAttendance = {};

      records.forEach((record) => {
        const studentId =
          record.student?._id;

        if (
          studentId &&
          record.date === date &&
          record.subject === subject
        ) {
          todayAttendance[
            studentId
          ] = record.status;
        }
      });

      setAttendance(
        todayAttendance
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to load students"
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchStudents();
  }, []);


  const setStudentStatus = (
    studentId,
    status
  ) => {
    setAttendance(
      (previous) => ({
        ...previous,
        [studentId]: status,
      })
    );
  };


  const markAll = (status) => {
    const updated = {};

    students.forEach(
      (student) => {
        updated[student._id] =
          status;
      }
    );

    setAttendance(updated);
  };


  const handleSave = async () => {
    if (!subject.trim()) {
      setError(
        "Please enter a subject"
      );
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      for (
        const student of students
      ) {
        await api.post(
          "/attendance",
          {
            student:
              student._id,
            date,
            subject,
            status:
              attendance[
                student._id
              ] || "Absent",
          }
        );
      }

      setSuccess(
        "Attendance saved successfully."
      );

      await fetchStudents();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to save attendance"
      );
    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="faculty-dashboard">

      <Sidebar role="faculty" />

      <main className="dashboard-main">

        <div className="dashboard-header">

          <div>

            <p className="dashboard-label">
              FACULTY PORTAL
            </p>

            <h1>
              Attendance
            </h1>

            <p>
              Mark and manage student
              attendance.
            </p>

          </div>

        </div>


        <section className="admin-form-card">

          <div className="admin-form-title">

            <div className="schedule-icon">
              <ClipboardCheck
                size={20}
              />
            </div>

            <div>

              <h2>
                Attendance Session
              </h2>

              <p>
                Select the subject and
                date before marking attendance.
              </p>

            </div>

          </div>


          <div className="attendance-session-form">

            <div className="form-field">

              <label>
                Subject
              </label>

              <input
                type="text"
                placeholder="Example: Mathematics"
                value={subject}
                onChange={(event) =>
                  setSubject(
                    event.target.value
                  )
                }
              />

            </div>


            <div className="form-field">

              <label>
                Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(event) =>
                  setDate(
                    event.target.value
                  )
                }
              />

            </div>

          </div>

        </section>


        {error && (
          <div className="dashboard-error">
            {error}
          </div>
        )}


        {success && (
          <div className="dashboard-success">
            {success}
          </div>
        )}


        <section className="admin-schedule-section">

          <div className="section-heading">

            <div>

              <p className="dashboard-label">
                CLASS REGISTER
              </p>

              <h2>
                Student Attendance
              </h2>

            </div>

            <span>
              {students.length} students
            </span>

          </div>


          {loading ? (

            <div className="dashboard-loading">
              Loading students...
            </div>

          ) : students.length === 0 ? (

            <div className="dashboard-empty">

              <Users size={35} />

              <h3>
                No Students Found
              </h3>

              <p>
                No student accounts
                are available.
              </p>

            </div>

          ) : (

            <div className="attendance-register">

              <div className="attendance-toolbar">

                <button
                  type="button"
                  className="attendance-mark-all-button"
                  onClick={() =>
                    markAll("Present")
                  }
                >
                  <CheckCircle2
                    size={15}
                  />
                  MARK ALL PRESENT
                </button>


                <button
                  type="button"
                  className="attendance-mark-all-absent"
                  onClick={() =>
                    markAll("Absent")
                  }
                >
                  <XCircle
                    size={15}
                  />
                  MARK ALL ABSENT
                </button>

              </div>


              {students.map(
                (student, index) => {

                  const status =
                    attendance[
                      student._id
                    ] || "Absent";

                  return (
                    <div
                      className="attendance-row"
                      key={student._id}
                    >

                      <div className="attendance-student">

                        <span className="attendance-number">
                          {String(
                            index + 1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <div>

                          <strong>
                            {student.name}
                          </strong>

                          <small>
                            {student.email}
                          </small>

                        </div>

                      </div>


                      <div className="attendance-actions">

                        <button
                          type="button"
                          className={
                            status ===
                            "Present"
                              ? "attendance-present active"
                              : "attendance-present"
                          }
                          onClick={() =>
                            setStudentStatus(
                              student._id,
                              "Present"
                            )
                          }
                        >
                          <CheckCircle2
                            size={15}
                          />
                          Present
                        </button>


                        <button
                          type="button"
                          className={
                            status ===
                            "Absent"
                              ? "attendance-absent active"
                              : "attendance-absent"
                          }
                          onClick={() =>
                            setStudentStatus(
                              student._id,
                              "Absent"
                            )
                          }
                        >
                          <XCircle
                            size={15}
                          />
                          Absent
                        </button>

                      </div>

                    </div>
                  );
                }
              )}


              <button
                type="button"
                className="primary-action-button attendance-save-button"
                onClick={handleSave}
                disabled={saving}
              >

                <Save size={16} />

                {saving
                  ? "SAVING..."
                  : "SAVE ATTENDANCE"}

              </button>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default FacultyAttendance;