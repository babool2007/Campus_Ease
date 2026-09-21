import { useEffect, useState } from "react";

import {
  Users,
  MessageSquareWarning,
  ClipboardCheck,
  Bus,
  FileCheck,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react";

import api from "../services/api";

import "../styles/dashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeComplaints: 0,
    attendancePercentage: 0,
    activeBuses: 0,
    pendingApprovals: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* --------------------------------
     LOAD DASHBOARD
  -------------------------------- */

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await api.get("/admin/dashboard");

      setStats(
        response.data.stats || {}
      );
    } catch (error) {
      console.error(
        "Dashboard Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  /* --------------------------------
     STAT CARDS
  -------------------------------- */

  const statCards = [
    {
      title: "TOTAL STUDENTS",
      value: stats.totalStudents,
      icon: Users,
      description:
        "Registered student accounts",
    },

    {
      title: "ACTIVE COMPLAINTS",
      value: stats.activeComplaints,
      icon: MessageSquareWarning,
      description:
        "Complaints requiring attention",
    },

    {
      title: "TODAY'S ATTENDANCE",
      value: `${stats.attendancePercentage}%`,
      icon: ClipboardCheck,
      description:
        "Based on today's records",
    },

    {
      title: "ACTIVE BUSES",
      value: stats.activeBuses,
      icon: Bus,
      description:
        "Currently active buses",
    },

    {
      title: "PENDING APPROVALS",
      value: stats.pendingApprovals,
      icon: FileCheck,
      description:
        "Requests awaiting review",
    },
  ];

  return (
    <div className="admin-dashboard">

      {/* --------------------------------
          HEADER
      -------------------------------- */}

      <div className="admin-dashboard-header">

        <div>
          <p className="dashboard-eyebrow">
            ADMINISTRATOR PORTAL
          </p>

          <h1>
            Campus Overview
          </h1>

          <p className="dashboard-subtitle">
            Real-time overview of your
            digital campus ecosystem.
          </p>
        </div>

        <button
          className="dashboard-refresh"
          onClick={loadDashboard}
          disabled={loading}
        >
          <RefreshCw
            size={14}
            className={
              loading
                ? "dashboard-refresh-spin"
                : ""
            }
          />

          Refresh
        </button>

      </div>

      {/* --------------------------------
          ERROR
      -------------------------------- */}

      {error && (
        <div className="dashboard-error">
          {error}
        </div>
      )}

      {/* --------------------------------
          STATS
      -------------------------------- */}

      <div className="admin-stat-grid">

        {statCards.map((card) => {

          const Icon = card.icon;

          return (
            <div
              className="admin-stat-card"
              key={card.title}
            >

              <div className="admin-stat-top">

                <div className="admin-stat-icon">
                  <Icon size={18} />
                </div>

                <ArrowUpRight
                  size={15}
                  className="admin-stat-arrow"
                />

              </div>

              <div className="admin-stat-value">

                {loading ? (
                  <span className="stat-loading">
                    —
                  </span>
                ) : (
                  card.value
                )}

              </div>

              <div className="admin-stat-title">
                {card.title}
              </div>

              <div className="admin-stat-description">
                {card.description}
              </div>

            </div>
          );
        })}

      </div>

      {/* --------------------------------
          SYSTEM STATUS
      -------------------------------- */}

      <div className="admin-system-section">

        <div className="admin-section-heading">

          <div>
            <p className="dashboard-eyebrow">
              SYSTEM
            </p>

            <h2>
              CampusEase Services
            </h2>
          </div>

          <span className="system-online">
            <span></span>
            SYSTEM OPERATIONAL
          </span>

        </div>

        <div className="system-grid">

          <div className="system-card">

            <div className="system-card-icon">
              <Users size={17} />
            </div>

            <div>
              <strong>
                User Management
              </strong>

              <span>
                Student, faculty and
                administrator accounts
              </span>
            </div>

            <div className="system-dot"></div>

          </div>

          <div className="system-card">

            <div className="system-card-icon">
              <ClipboardCheck size={17} />
            </div>

            <div>
              <strong>
                Attendance
              </strong>

              <span>
                Campus attendance records
              </span>
            </div>

            <div className="system-dot"></div>

          </div>

          <div className="system-card">

            <div className="system-card-icon">
              <Bus size={17} />
            </div>

            <div>
              <strong>
                Campus Transport
              </strong>

              <span>
                Bus routes and operations
              </span>
            </div>

            <div className="system-dot"></div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;