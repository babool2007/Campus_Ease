import { useEffect, useState } from "react";

import {
  FileCheck,
  CheckCircle2,
  XCircle,
  Clock3,
  Trash2,
  UserRound,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import api from "../services/api";

import "../styles/dashboard.css";

function AdminApprovals() {
  const [approvals, setApprovals] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


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


  const updateApproval = async (
    id,
    status,
    remarks
  ) => {
    try {
      setError("");
      setSuccess("");

      await api.put(
        `/approvals/${id}`,
        {
          status,
          remarks,
        }
      );

      setSuccess(
        `Request ${status.toLowerCase()} successfully.`
      );

      await fetchApprovals();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to update request"
      );
    }
  };


  const deleteApproval = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this request?"
      );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await api.delete(
        `/approvals/${id}`
      );

      setSuccess(
        "Approval request deleted successfully."
      );

      await fetchApprovals();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to delete request"
      );
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
    <div className="admin-dashboard">

      <Sidebar role="admin" />

      <main className="dashboard-main">

        <div className="dashboard-header">

          <div>

            <p className="dashboard-label">
              ADMINISTRATOR
            </p>

            <h1>
              Approval Management
            </h1>

            <p>
              Review and process student
              approval requests.
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
                REQUEST CENTER
              </p>

              <h2>
                Student Requests
              </h2>

            </div>

            <span>
              {approvals.length} requests
            </span>

          </div>


          {loading && (

            <div className="dashboard-loading">
              Loading requests...
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
                  There are no approval
                  requests at the moment.
                </p>

              </div>

            )}


          {!loading &&
            approvals.length > 0 && (

              <div className="approvals-list">

                {approvals.map(
                  (approval) => (

                    <div
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


                        <div className="approval-card-footer">

                          <span>

                            <UserRound
                              size={13}
                            />

                            {approval.requestedBy?.name ||
                              "Unknown"}

                          </span>

                          <span>
                            {approval.requestedBy?.email ||
                              ""}
                          </span>

                          <span>
                            Submitted{" "}
                            {new Date(
                              approval.createdAt
                            ).toLocaleDateString()}
                          </span>

                        </div>


                        <div className="approval-admin-controls">

                          <button
                            type="button"
                            className="approval-approve-button"
                            onClick={() =>
                              updateApproval(
                                approval._id,
                                "Approved",
                                "Request approved by administration."
                              )
                            }
                          >

                            <CheckCircle2
                              size={15}
                            />

                            APPROVE

                          </button>


                          <button
                            type="button"
                            className="approval-reject-button"
                            onClick={() =>
                              updateApproval(
                                approval._id,
                                "Rejected",
                                "Request rejected by administration."
                              )
                            }
                          >

                            <XCircle
                              size={15}
                            />

                            REJECT

                          </button>


                          <button
                            type="button"
                            className="schedule-delete-button"
                            onClick={() =>
                              deleteApproval(
                                approval._id
                              )
                            }
                            title="Delete request"
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

export default AdminApprovals;