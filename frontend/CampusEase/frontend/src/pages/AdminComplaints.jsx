import { useEffect, useState } from "react";

import {
  MessageSquareWarning,
  MapPin,
  UserRound,
  Trash2,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import api from "../services/api";

import "../styles/dashboard.css";

function AdminComplaints() {
  const [complaints, setComplaints] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


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


  const updateComplaint = async (
    id,
    updates
  ) => {
    try {
      setError("");
      setSuccess("");

      await api.put(
        `/complaints/${id}`,
        updates
      );

      setSuccess(
        "Complaint updated successfully."
      );

      await fetchComplaints();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to update complaint"
      );
    }
  };


  const deleteComplaint = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this complaint?"
      );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await api.delete(
        `/complaints/${id}`
      );

      setSuccess(
        "Complaint deleted successfully."
      );

      await fetchComplaints();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to delete complaint"
      );
    }
  };


  return (
    <div className="admin-dashboard">

      <Sidebar role="admin" />

      <main className="dashboard-main">

        <div className="dashboard-header">

          <div>
            <p className="dashboard-label">
              ADMINISTRATOR
            </p>

            <h1>
              Complaint Management
            </h1>

            <p>
              Monitor, assign and resolve
              campus complaints.
            </p>
          </div>

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


        <section className="admin-schedule-section">

          <div className="section-heading">

            <div>

              <p className="dashboard-label">
                SERVICE DESK
              </p>

              <h2>
                Campus Complaints
              </h2>

            </div>

            <span>
              {complaints.length} total
            </span>

          </div>


          {loading && (
            <div className="dashboard-loading">
              Loading complaints...
            </div>
          )}


          {!loading &&
            complaints.length === 0 && (

              <div className="dashboard-empty">

                <MessageSquareWarning
                  size={35}
                />

                <h3>
                  No Complaints
                </h3>

                <p>
                  There are no complaints
                  in the system.
                </p>

              </div>
            )}


          {!loading &&
            complaints.length > 0 && (

              <div className="complaints-list">

                {complaints.map(
                  (complaint) => (

                    <div
                      className="complaint-card"
                      key={complaint._id}
                    >

                      <div className="complaint-card-icon">
                        <MessageSquareWarning
                          size={18}
                        />
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
                            <UserRound size={14} />

                            {complaint.reportedBy?.name ||
                              "Unknown"}
                          </span>


                          <span>
                            Priority:{" "}
                            {complaint.priority}
                          </span>

                        </div>


                        <div className="complaint-admin-controls">

                          <select
                            value={
                              complaint.status
                            }
                            onChange={(event) =>
                              updateComplaint(
                                complaint._id,
                                {
                                  status:
                                    event.target.value,
                                }
                              )
                            }
                          >

                            <option value="Reported">
                              Reported
                            </option>

                            <option value="Assigned">
                              Assigned
                            </option>

                            <option value="In Progress">
                              In Progress
                            </option>

                            <option value="Resolved">
                              Resolved
                            </option>

                          </select>


                          <input
                            type="text"
                            placeholder="Assign to..."
                            defaultValue={
                              complaint.assignedTo ===
                              "Not Assigned"
                                ? ""
                                : complaint.assignedTo
                            }
                            onBlur={(event) => {

                              const value =
                                event.target.value.trim();

                              if (!value) return;

                              updateComplaint(
                                complaint._id,
                                {
                                  assignedTo:
                                    value,
                                }
                              );

                            }}
                          />


                          <select
                            value={
                              complaint.priority
                            }
                            onChange={(event) =>
                              updateComplaint(
                                complaint._id,
                                {
                                  priority:
                                    event.target.value,
                                }
                              )
                            }
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


                          <button
                            type="button"
                            className="schedule-delete-button"
                            onClick={() =>
                              deleteComplaint(
                                complaint._id
                              )
                            }
                            title="Delete complaint"
                          >
                            <Trash2
                              size={16}
                            />
                          </button>

                        </div>

                      </div>

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

export default AdminComplaints;