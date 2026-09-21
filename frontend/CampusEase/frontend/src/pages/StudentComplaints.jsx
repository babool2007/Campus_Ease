import { useEffect, useState } from "react";

import {
  MessageSquareWarning,
  Plus,
  MapPin,
  Clock3,
  LoaderCircle,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import api from "../services/api";

import "../styles/dashboard.css";

function StudentComplaints() {
  const [complaints, setComplaints] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Classroom",
    location: "",
    priority: "Normal",
  });

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await api.get("/complaints");

      setComplaints(
        response.data.complaints || []
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to load complaints"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await api.post(
        "/complaints",
        form
      );

      setSuccess(
        "Complaint submitted successfully."
      );

      setForm({
        title: "",
        description: "",
        category: "Classroom",
        location: "",
        priority: "Normal",
      });

      await fetchComplaints();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to submit complaint"
      );
    } finally {
      setSaving(false);
    }
  };

  const getStatusIcon = (status) => {
    if (status === "Resolved") {
      return <CheckCircle2 size={17} />;
    }

    if (
      status === "Urgent" ||
      status === "In Progress"
    ) {
      return <AlertTriangle size={17} />;
    }

    return <Clock3 size={17} />;
  };

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
              Complaints
            </h1>

            <p>
              Report campus issues and track
              their resolution.
            </p>
          </div>
        </div>


        <section className="admin-form-card">

          <div className="admin-form-title">

            <div className="schedule-icon">
              <Plus size={20} />
            </div>

            <div>
              <h2>
                Report an Issue
              </h2>

              <p>
                Submit a campus complaint
                for administration.
              </p>
            </div>

          </div>


          <form
            className="complaint-form"
            onSubmit={handleSubmit}
          >

            <div className="form-field">
              <label>
                Issue Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="Example: Classroom projector not working"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-field">
              <label>
                Location
              </label>

              <input
                type="text"
                name="location"
                placeholder="Example: Classroom 204"
                value={form.location}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-field">
              <label>
                Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="Electrical">
                  Electrical
                </option>

                <option value="Plumbing">
                  Plumbing
                </option>

                <option value="Classroom">
                  Classroom
                </option>

                <option value="Hostel">
                  Hostel
                </option>

                <option value="Transport">
                  Transport
                </option>

                <option value="Cleanliness">
                  Cleanliness
                </option>

                <option value="IT">
                  IT
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>


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


            <div className="form-field complaint-description-field">
              <label>
                Description
              </label>

              <textarea
                name="description"
                rows="5"
                placeholder="Describe the issue..."
                value={form.description}
                onChange={handleChange}
                required
              />
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
              <MessageSquareWarning
                size={17}
              />

              {saving
                ? "SUBMITTING..."
                : "SUBMIT COMPLAINT"}
            </button>

          </form>

        </section>


        <section className="admin-schedule-section">

          <div className="section-heading">

            <div>
              <p className="dashboard-label">
                TRACKING
              </p>

              <h2>
                My Complaints
              </h2>
            </div>

            <span>
              {complaints.length} complaints
            </span>

          </div>


          {loading && (
            <div className="dashboard-loading">

              <LoaderCircle size={22} />

              <span>
                Loading complaints...
              </span>

            </div>
          )}


          {!loading &&
            !error &&
            complaints.length === 0 && (

              <div className="dashboard-empty">

                <MessageSquareWarning
                  size={35}
                />

                <h3>
                  No Complaints
                </h3>

                <p>
                  You have not submitted
                  any complaints yet.
                </p>

              </div>
            )}


          {!loading &&
            complaints.length > 0 && (

              <div className="complaints-list">

                {complaints.map(
                  (complaint) => (

                    <article
                      className="complaint-card"
                      key={complaint._id}
                    >

                      <div className="complaint-card-icon">
                        {getStatusIcon(
                          complaint.status
                        )}
                      </div>


                      <div className="complaint-card-content">

                        <div className="complaint-card-top">

                          <span className="notice-category">
                            {complaint.category}
                          </span>

                          <span className="complaint-status">
                            {complaint.status}
                          </span>

                        </div>


                        <h2>
                          {complaint.title}
                        </h2>


                        <p>
                          {complaint.description}
                        </p>


                        <div className="complaint-card-footer">

                          <span>
                            <MapPin size={14} />

                            {complaint.location}
                          </span>

                          <span>
                            Priority:{" "}
                            {complaint.priority}
                          </span>

                          <span>
                            Assigned:{" "}
                            {complaint.assignedTo}
                          </span>

                        </div>

                      </div>

                    </article>

                  )
                )}

              </div>
            )}

        </section>

      </main>

    </div>
  );
}

export default StudentComplaints;