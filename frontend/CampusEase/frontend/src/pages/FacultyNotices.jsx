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

function FacultyNotices() {
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

      const facultyNotices =
        allNotices.filter(
          (notice) =>
            notice.audience === "All" ||
            notice.audience === "Faculty" ||
            notice.audience ===
              "Students & Faculty"
        );

      setNotices(facultyNotices);
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
    <div className="faculty-dashboard">

      <Sidebar role="faculty" />

      <main className="dashboard-main">

        <div className="dashboard-header">

          <div>

            <p className="dashboard-label">
              FACULTY PORTAL
            </p>

            <h1>
              Notices
            </h1>

            <p>
              Campus announcements and administrative updates.
            </p>

          </div>

        </div>

        {loading && (
          <div className="dashboard-loading">

            <LoaderCircle size={22} />

            <span>
              Loading notices...
            </span>

          </div>
        )}

        {error && (
          <div className="dashboard-error">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          notices.length === 0 && (
            <div className="dashboard-empty">

              <Bell size={35} />

              <h3>
                No Notices
              </h3>

              <p>
                There are no notices available.
              </p>

            </div>
          )}

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

export default FacultyNotices;