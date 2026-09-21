import { useEffect, useState } from "react";

import {
  FileCheck,
  Plus,
  LoaderCircle,
  CheckCircle2,
  XCircle,
  Clock3,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import api from "../services/api";

import "../styles/dashboard.css";

function StudentApprovals() {
  const [approvals, setApprovals] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Academic",
  });


  const fetchApprovals = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await api.get("/approvals");

      setApprovals(
        response.data.approvals || []
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to load approval requests"
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchApprovals();
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
        "/approvals",
        form
      );

      setSuccess(
        "Approval request submitted successfully."
      );

      setForm({
        title: "",
        description: "",
        category: "Academic",
      });

      await fetchApprovals();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to submit approval request"
      );
    } finally {
      setSaving(false);
    }
  };


  const getStatusIcon = (status) => {
    if (status === "Approved") {
      return (
        <CheckCircle2 size={18} />
      );
    }

    if (status === "Rejected") {
      return (
        <XCircle size={18} />
      );
    }

    return (
      <Clock3 size={18} />
    );
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
              Approvals
            </h1>

            <p>
              Submit requests and track
              approval status.
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
                New Approval Request
              </h2>

              <p>
                Submit a request for
                administration review.
              </p>

            </div>

          </div>


          <form
            className="approval-form"
            onSubmit={handleSubmit}
          >

            <div className="form-field">

              <label>
                Request Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="Example: Bonafide Certificate"
                value={form.title}
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

                <option value="Leave">
                  Leave
                </option>

                <option value="Bonafide">
                  Bonafide
                </option>

                <option value="ID Card">
                  ID Card
                </option>

                <option value="Academic">
                  Academic
                </option>

                <option value="Event">
                  Event
                </option>

                <option value="Hostel">
                  Hostel
                </option>

                <option value="Transport">
                  Transport
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>


            <div className="form-field approval-description-field">

              <label>
                Description
              </label>

              <textarea
                name="description"
                rows="5"
                placeholder="Describe your request..."
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

              <FileCheck size={17} />

              {saving
                ? "SUBMITTING..."
                : "SUBMIT REQUEST"}

            </button>

          </form>

        </section>


        <section className="admin-schedule-section">

          <div className="section-heading">

            <div>

              <p className="dashboard-label">
                REQUEST HISTORY
              </p>

              <h2>
                My Approval Requests
              </h2>

            </div>

            <span>
              {approvals.length} requests
            </span>

          </div>


          {loading && (

            <div className="dashboard-loading">

              <LoaderCircle size={22} />

              <span>
                Loading requests...
              </span>

            </div>

          )}


          {!loading &&
            approvals.length === 0 && (

              <div className="dashboard-empty">

                <FileCheck size={35} />

                <h3>
                  No Requests
                </h3>

                <p>
                  You have not submitted
                  any approval requests.
                </p>

              </div>

            )}


          {!loading &&
            approvals.length > 0 && (

              <div className="approvals-list">

                {approvals.map(
                  (approval) => (

                    <article
                      className="approval-card"
                      key={approval._id}
                    >

                      <div className="approval-card-icon">
                        {getStatusIcon(
                          approval.status
                        )}
                      </div>


                      <div className="approval-card-content">

                        <div className="approval-card-top">

                          <span className="notice-category">
                            {approval.category}
                          </span>

                          <span
                            className={`approval-status status-${approval.status.toLowerCase()}`}
                          >
                            {approval.status}
                          </span>

                        </div>


                        <h2>
                          {approval.title}
                        </h2>


                        <p>
                          {approval.description}
                        </p>


                        {approval.remarks && (
                          <div className="approval-remarks">
                            <strong>
                              Admin Remarks:
                            </strong>

                            <span>
                              {approval.remarks}
                            </span>
                          </div>
                        )}


                        <div className="approval-card-footer">

                          <span>
                            Submitted{" "}
                            {new Date(
                              approval.createdAt
                            ).toLocaleDateString()}
                          </span>

                          {approval.reviewedBy && (
                            <span>
                              Reviewed by{" "}
                              {
                                approval
                                  .reviewedBy
                                  .name
                              }
                            </span>
                          )}

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

export default StudentApprovals;