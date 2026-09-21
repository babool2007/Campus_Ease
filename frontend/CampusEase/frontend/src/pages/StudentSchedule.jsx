import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
  LoaderCircle,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import api from "../services/api";

import "../styles/dashboard.css";

function StudentSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(
    localStorage.getItem("campuseaseUser")
  );

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

  return (
    <div className="student-dashboard">

      <Sidebar role="student" />

      <main className="dashboard-main">

        <div className="dashboard-header">
          <div>
            <p className="dashboard-label">
              STUDENT PORTAL
            </p>

            <h1>My Schedule</h1>

            <p>
              Your classes and academic schedule.
            </p>
          </div>
        </div>

        {loading && (
          <div className="dashboard-loading">
            <LoaderCircle size={24} />
            <span>Loading schedule...</span>
          </div>
        )}

        {error && (
          <div className="dashboard-error">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          schedules.length === 0 && (
            <div className="dashboard-empty">
              <CalendarDays size={35} />

              <h3>No Schedule Found</h3>

              <p>
                Your class schedule has not been
                added yet.
              </p>
            </div>
          )}

        {!loading &&
          schedules.length > 0 && (
            <div className="schedule-grid">

              {schedules.map((item) => (
                <div
                  className="schedule-card"
                  key={item._id}
                >

                  <div className="schedule-card-top">

                    <div className="schedule-icon">
                      <CalendarDays size={20} />
                    </div>

                    <span className="schedule-day">
                      {item.day}
                    </span>

                  </div>

                  <h2>{item.subject}</h2>

                  <div className="schedule-info">

                    <div>
                      <Clock3 size={16} />
                      <span>
                        {item.startTime} -{" "}
                        {item.endTime}
                      </span>
                    </div>

                    <div>
                      <MapPin size={16} />
                      <span>
                        {item.room}
                      </span>
                    </div>

                    <div>
                      <UserRound size={16} />
                      <span>
                        {item.teacher}
                      </span>
                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

      </main>

    </div>
  );
}

export default StudentSchedule;