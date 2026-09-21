import { useEffect, useState } from "react";

import {
  CalendarDays,
  Plus,
  Pencil,
  Trash2,
  Clock3,
  MapPin,
  UserRound,
  X,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import api from "../services/api";

import "../styles/dashboard.css";

function AdminSchedule() {
  const [schedules, setSchedules] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    subject: "",
    teacher: "",
    room: "",
    day: "Monday",
    startTime: "",
    endTime: "",
    branch: "CSE",
    year: 1,
  });

  // ==========================================
  // FETCH SCHEDULES
  // ==========================================

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/schedules");

      setSchedules(response.data.schedules || []);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to load schedules"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        name === "year"
          ? Number(value)
          : value,
    }));
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (editingId) {
        await api.put(
          `/schedules/${editingId}`,
          form
        );

        setSuccess(
          "Schedule updated successfully."
        );
      } else {
        await api.post(
          "/schedules",
          form
        );

        setSuccess(
          "Schedule added successfully."
        );
      }

      resetForm();

      await fetchSchedules();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to save schedule"
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // EDIT
  // ==========================================

  const handleEdit = (schedule) => {
    setEditingId(schedule._id);

    setForm({
      subject: schedule.subject,
      teacher: schedule.teacher,
      room: schedule.room,
      day: schedule.day,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      branch: schedule.branch,
      year: schedule.year,
    });

    setSuccess("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this schedule?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await api.delete(
        `/schedules/${id}`
      );

      setSuccess(
        "Schedule deleted successfully."
      );

      await fetchSchedules();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to delete schedule"
      );
    }
  };

  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {
    setEditingId(null);

    setForm({
      subject: "",
      teacher: "",
      room: "",
      day: "Monday",
      startTime: "",
      endTime: "",
      branch: "CSE",
      year: 1,
    });
  };

  // ==========================================
  // CANCEL EDIT
  // ==========================================

  const handleCancelEdit = () => {
    resetForm();
    setError("");
    setSuccess("");
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="admin-dashboard">

      <Sidebar role="admin" />

      <main className="dashboard-main">

        {/* HEADER */}

        <div className="dashboard-header">

          <div>

            <p className="dashboard-label">
              ADMINISTRATOR
            </p>

            <h1>
              Schedule Management
            </h1>

            <p>
              Create and manage campus class schedules.
            </p>

          </div>

        </div>

        {/* FORM */}

        <section className="admin-form-card">

          <div className="admin-form-title">

            <div className="schedule-icon">

              {editingId ? (
                <Pencil size={20} />
              ) : (
                <Plus size={20} />
              )}

            </div>

            <div>

              <h2>
                {editingId
                  ? "Edit Schedule"
                  : "Add New Schedule"}
              </h2>

              <p>
                {editingId
                  ? "Update the selected class timetable entry."
                  : "Create a new class timetable entry."}
              </p>

            </div>

          </div>

          <form
            className="schedule-form"
            onSubmit={handleSubmit}
          >

            {/* SUBJECT */}

            <div className="form-field">

              <label>
                Subject
              </label>

              <input
                type="text"
                name="subject"
                placeholder="Example: Mathematics"
                value={form.subject}
                onChange={handleChange}
                required
              />

            </div>

            {/* TEACHER */}

            <div className="form-field">

              <label>
                Teacher
              </label>

              <input
                type="text"
                name="teacher"
                placeholder="Example: Dr. Sharma"
                value={form.teacher}
                onChange={handleChange}
                required
              />

            </div>

            {/* ROOM */}

            <div className="form-field">

              <label>
                Room
              </label>

              <input
                type="text"
                name="room"
                placeholder="Example: Room 201"
                value={form.room}
                onChange={handleChange}
                required
              />

            </div>

            {/* DAY */}

            <div className="form-field">

              <label>
                Day
              </label>

              <select
                name="day"
                value={form.day}
                onChange={handleChange}
              >

                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>

              </select>

            </div>

            {/* START TIME */}

            <div className="form-field">

              <label>
                Start Time
              </label>

              <input
                type="time"
                name="startTime"
                value={form.startTime}
                onChange={handleChange}
                required
              />

            </div>

            {/* END TIME */}

            <div className="form-field">

              <label>
                End Time
              </label>

              <input
                type="time"
                name="endTime"
                value={form.endTime}
                onChange={handleChange}
                required
              />

            </div>

            {/* BRANCH */}

            <div className="form-field">

              <label>
                Branch
              </label>

              <select
                name="branch"
                value={form.branch}
                onChange={handleChange}
              >

                <option value="CSE">
                  CSE
                </option>

                <option value="ECE">
                  ECE
                </option>

                <option value="EEE">
                  EEE
                </option>

                <option value="ME">
                  Mechanical
                </option>

                <option value="CE">
                  Civil
                </option>

              </select>

            </div>

            {/* YEAR */}

            <div className="form-field">

              <label>
                Year
              </label>

              <select
                name="year"
                value={form.year}
                onChange={handleChange}
              >

                <option value={1}>
                  1st Year
                </option>

                <option value={2}>
                  2nd Year
                </option>

                <option value={3}>
                  3rd Year
                </option>

                <option value={4}>
                  4th Year
                </option>

              </select>

            </div>

            {/* ERROR */}

            {error && (
              <div className="dashboard-error">
                {error}
              </div>
            )}

            {/* SUCCESS */}

            {success && (
              <div className="dashboard-success">
                {success}
              </div>
            )}

            {/* BUTTONS */}

            <div className="schedule-form-actions">

              <button
                type="submit"
                className="primary-action-button"
                disabled={saving}
              >

                {editingId ? (
                  <Pencil size={17} />
                ) : (
                  <Plus size={17} />
                )}

                {saving
                  ? "SAVING..."
                  : editingId
                  ? "UPDATE SCHEDULE"
                  : "ADD SCHEDULE"}

              </button>

              {editingId && (
                <button
                  type="button"
                  className="secondary-action-button"
                  onClick={handleCancelEdit}
                >

                  <X size={17} />

                  CANCEL

                </button>
              )}

            </div>

          </form>

        </section>

        {/* EXISTING SCHEDULES */}

        <section className="admin-schedule-section">

          <div className="section-heading">

            <div>

              <p className="dashboard-label">
                DATABASE
              </p>

              <h2>
                Existing Schedules
              </h2>

            </div>

            <span>
              {schedules.length} schedules
            </span>

          </div>

          {/* LOADING */}

          {loading && (
            <div className="dashboard-loading">
              Loading schedules...
            </div>
          )}

          {/* EMPTY */}

          {!loading &&
            schedules.length === 0 && (
              <div className="dashboard-empty">

                <CalendarDays size={35} />

                <h3>
                  No schedules yet
                </h3>

                <p>
                  Add the first class schedule above.
                </p>

              </div>
            )}

          {/* TABLE */}

          {!loading &&
            schedules.length > 0 && (

              <div className="admin-schedule-table">

                <div className="schedule-table-header">

                  <span>SUBJECT</span>
                  <span>TEACHER</span>
                  <span>DAY</span>
                  <span>TIME</span>
                  <span>ROOM</span>
                  <span>ACTION</span>

                </div>

                {schedules.map((item) => (

                  <div
                    className="schedule-table-row"
                    key={item._id}
                  >

                    {/* SUBJECT */}

                    <div className="schedule-subject">

                      <div className="schedule-icon">

                        <CalendarDays size={17} />

                      </div>

                      <strong>
                        {item.subject}
                      </strong>

                    </div>

                    {/* TEACHER */}

                    <div className="schedule-table-info">

                      <UserRound size={14} />

                      {item.teacher}

                    </div>

                    {/* DAY */}

                    <div>
                      {item.day}
                    </div>

                    {/* TIME */}

                    <div className="schedule-table-info">

                      <Clock3 size={14} />

                      {item.startTime} - {item.endTime}

                    </div>

                    {/* ROOM */}

                    <div className="schedule-table-info">

                      <MapPin size={14} />

                      {item.room}

                    </div>

                    {/* ACTIONS */}

                    <div className="schedule-actions">

                      <button
                        type="button"
                        className="schedule-edit-button"
                        onClick={() =>
                          handleEdit(item)
                        }
                        title="Edit schedule"
                      >

                        <Pencil size={15} />

                      </button>

                      <button
                        type="button"
                        className="schedule-delete-button"
                        onClick={() =>
                          handleDelete(item._id)
                        }
                        title="Delete schedule"
                      >

                        <Trash2 size={15} />

                      </button>

                    </div>

                  </div>

                ))}

              </div>

            )}

        </section>

      </main>

    </div>
  );
}

export default AdminSchedule;