import { useEffect, useState } from "react";

import {
  Bell,
  Plus,
  Trash2,
  Megaphone,
  CalendarDays,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import api from "../services/api";

import "../styles/dashboard.css";

function AdminNotices() {
  const [notices, setNotices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "General",
    priority: "Normal",
    audience: "All",
  });

  // ==========================================
  // FETCH
  // ==========================================

  const fetchNotices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/notices"
      );

      setNotices(
        response.data.notices || []
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to load notices"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // ==========================================
  // CHANGE
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // CREATE
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await api.post(
        "/notices",
        form
      );

      setSuccess(
        "Notice published successfully."
      );

      setForm({
        title: "",
        description: "",
        category: "General",
        priority: "Normal",
        audience: "All",
      });

      await fetchNotices();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to publish notice"
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await api.delete(
        `/notices/${id}`
      );

      setSuccess(
        "Notice deleted successfully."
      );

      await fetchNotices();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to delete notice"
      );
    }
  };

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
              Notice Management
            </h1>

            <p>
              Publish important campus announcements.
            </p>

          </div>

        </div>

        {/* FORM */}

        <section className="admin-form-card">

          <div className="admin-form-title">

            <div className="schedule-icon">

              <Plus size={20} />

            </div>

            <div>

              <h2>
                Publish New Notice
              </h2>

              <p>
                Create an announcement for the campus community.
              </p>

            </div>

          </div>

          <form
            className="notice-form"
            onSubmit={handleSubmit}
          >

            {/* TITLE */}

            <div className="form-field">

              <label>
                Notice Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="Example: Mid Semester Examination Schedule"
                value={form.title}
                onChange={handleChange}
                required
              />

            </div>

            {/* DESCRIPTION */}

            <div className="form-field notice-description-field">

              <label>
                Description
              </label>

              <textarea
                name="description"
                placeholder="Write the notice details..."
                value={form.description}
                onChange={handleChange}
                rows="5"
                required
              />

            </div>

            {/* CATEGORY */}

            <div className="form-field">

              <label>
                Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >

                <option value="Academic">
                  Academic
                </option>

                <option value="Examination">
                  Examination
                </option>

                <option value="Events">
                  Events
                </option>

                <option value="Transport">
                  Transport
                </option>

                <option value="Administration">
                  Administration
                </option>

                <option value="General">
                  General
                </option>

              </select>

            </div>

            {/* PRIORITY */}

            <div className="form-field">

              <label>
                Priority
              </label>

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
              >

                <option value="Normal">
                  Normal
                </option>

                <option value="Important">
                  Important
                </option>

                <option value="Urgent">
                  Urgent
                </option>

              </select>

            </div>

            {/* AUDIENCE */}

            <div className="form-field">

              <label>
                Audience
              </label>

              <select
                name="audience"
                value={form.audience}
                onChange={handleChange}
              >

                <option value="All">
                  Everyone
                </option>

                <option value="Students">
                  Students
                </option>

                <option value="Faculty">
                  Faculty
                </option>

                <option value="Students & Faculty">
                  Students & Faculty
                </option>

              </select>

            </div>

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

            <button
              type="submit"
              className="primary-action-button"
              disabled={saving}
            >

              <Megaphone size={17} />

              {saving
                ? "PUBLISHING..."
                : "PUBLISH NOTICE"}

            </button>

          </form>

        </section>

        {/* EXISTING NOTICES */}

        <section className="admin-schedule-section">

          <div className="section-heading">

            <div>

              <p className="dashboard-label">
                DATABASE
              </p>

              <h2>
                Published Notices
              </h2>

            </div>

            <span>
              {notices.length} notices
            </span>

          </div>

          {loading && (
            <div className="dashboard-loading">
              Loading notices...
            </div>
          )}

          {!loading &&
            notices.length === 0 && (
              <div className="dashboard-empty">

                <Bell size={35} />

                <h3>
                  No notices yet
                </h3>

                <p>
                  Publish your first campus notice above.
                </p>

              </div>
            )}

          {!loading &&
            notices.length > 0 && (

              <div className="admin-notices-list">

                {notices.map((notice) => (

                  <div
                    className="admin-notice-row"
                    key={notice._id}
                  >

                    <div className="admin-notice-icon">

                      <Bell size={18} />

                    </div>

                    <div className="admin-notice-content">

                      <div className="admin-notice-meta">

                        <span>
                          {notice.category}
                        </span>

                        <span>
                          {notice.priority}
                        </span>

                        <span>
                          {notice.audience}
                        </span>

                      </div>

                      <h3>
                        {notice.title}
                      </h3>

                      <p>
                        {notice.description}
                      </p>

                      <small>

                        <CalendarDays size={13} />

                        {new Date(
                          notice.createdAt
                        ).toLocaleDateString()}

                      </small>

                    </div>

                    <button
                      type="button"
                      className="schedule-delete-button"
                      onClick={() =>
                        handleDelete(
                          notice._id
                        )
                      }
                      title="Delete notice"
                    >

                      <Trash2 size={16} />

                    </button>

                  </div>

                ))}

              </div>

            )}

        </section>

      </main>

    </div>
  );
}

export default AdminNotices;