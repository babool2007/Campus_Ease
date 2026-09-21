import { useEffect, useState } from "react";

import {
  Bell,
  CalendarDays,
  AlertTriangle,
  Info,
  Megaphone,
  LoaderCircle,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import api from "../services/api";

import "../styles/dashboard.css";

function StudentNotices() {
  const [notices, setNotices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/notices"
      );

      const allNotices =
        response.data.notices || [];

      const studentNotices =
        allNotices.filter(
          (notice) =>
            notice.audience === "All" ||
            notice.audience === "Students" ||
            notice.audience ===
              "Students & Faculty"
        );

      setNotices(studentNotices);
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

  const getPriorityIcon = (priority) => {
    if (priority === "Urgent") {
      return <AlertTriangle size={18} />;
    }

    if (priority === "Important") {
      return <Megaphone size={18} />;
    }

    return <Info size={18} />;
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
              Notices
            </h1>

            <p>
              Important campus announcements and updates.
            </p>

          </div>

        </div>

        {/* LOADING */}

        {loading && (
          <div className="dashboard-loading">

            <LoaderCircle size={22} />

            <span>
              Loading notices...
            </span>

          </div>
        )}

        {/* ERROR */}

        {error && (
          <div className="dashboard-error">
            {error}
          </div>
        )}

        {/* EMPTY */}

        {!loading &&
          !error &&
          notices.length === 0 && (
            <div className="dashboard-empty">

              <Bell size={35} />

              <h3>
                No Notices
              </h3>

              <p>
                There are no notices available for students.
              </p>

            </div>
          )}

        {/* NOTICES */}

        {!loading &&
          !error &&
          notices.length > 0 && (

            <div className="notices-list">

              {notices.map((notice) => (

                <article
                  className={`notice-card priority-${notice.priority.toLowerCase()}`}
                  key={notice._id}
                >

                  <div className="notice-card-icon">

                    {getPriorityIcon(
                      notice.priority
                    )}

                  </div>

                  <div className="notice-card-content">

                    <div className="notice-card-top">

                      <span className="notice-category">
                        {notice.category}
                      </span>

                      <span className="notice-priority">
                        {notice.priority}
                      </span>

                    </div>

                    <h2>
                      {notice.title}
                    </h2>

                    <p>
                      {notice.description}
                    </p>

                    <div className="notice-card-footer">

                      <span>
                        <CalendarDays size={14} />

                        {new Date(
                          notice.createdAt
                        ).toLocaleDateString()}
                      </span>

                      <span>
                        Published by{" "}
                        {notice.publishedBy}
                      </span>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          )}

      </main>

    </div>
  );
}

export default StudentNotices;