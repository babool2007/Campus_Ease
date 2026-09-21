import { useEffect, useState } from "react";
import {
  Bus,
  Clock3,
  MapPin,
  UserRound,
  Phone,
  RefreshCw,
  Navigation,
} from "lucide-react";

import api from "../services/api";
import "../styles/dashboard.css";

function StudentBus() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBuses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/buses");

      setBuses(response.data.buses || []);
    } catch (error) {
      console.error("Bus Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load campus buses"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBuses();
  }, []);

  return (
    <div className="bus-page">

      {/* HEADER */}

      <div className="bus-page-header">
        <div>
          <p className="page-eyebrow">
            CAMPUS TRANSPORT
          </p>

          <h1>Campus Bus</h1>

          <p>
            View campus routes, timings and bus information.
          </p>
        </div>

        <button
          className="bus-refresh-button"
          onClick={loadBuses}
          disabled={loading}
        >
          <RefreshCw
            size={15}
            className={loading ? "bus-spin" : ""}
          />

          Refresh
        </button>
      </div>

      {/* ERROR */}

      {error && (
        <div className="bus-error">
          {error}
        </div>
      )}

      {/* LOADING */}

      {loading ? (
        <div className="bus-loading">
          <Bus size={30} />

          <p>
            Loading campus transport...
          </p>
        </div>
      ) : buses.length === 0 ? (
        <div className="bus-empty">
          <Bus size={35} />

          <h3>No buses available</h3>

          <p>
            Campus transport information has not been
            added yet.
          </p>
        </div>
      ) : (
        <div className="bus-grid">

          {buses.map((bus) => (
            <div
              className="bus-card"
              key={bus._id}
            >

              {/* CARD TOP */}

              <div className="bus-card-top">

                <div className="bus-number-icon">
                  <Bus size={21} />
                </div>

                <div>
                  <span className="bus-label">
                    BUS
                  </span>

                  <h2>
                    {bus.busNumber}
                  </h2>
                </div>

                <span
                  className={`bus-status ${bus.status
                    ?.toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {bus.status}
                </span>

              </div>

              {/* ROUTE */}

              <div className="bus-route">

                <MapPin size={17} />

                <div>
                  <span>ROUTE</span>

                  <strong>
                    {bus.route}
                  </strong>
                </div>

              </div>

              {/* TIMINGS */}

              <div className="bus-info-grid">

                <div className="bus-info-item">

                  <Clock3 size={16} />

                  <div>
                    <span>DEPARTURE</span>
                    <strong>
                      {bus.departureTime}
                    </strong>
                  </div>

                </div>

                <div className="bus-info-item">

                  <Navigation size={16} />

                  <div>
                    <span>RETURN</span>
                    <strong>
                      {bus.returnTime}
                    </strong>
                  </div>

                </div>

              </div>

              {/* DRIVER */}

              <div className="bus-driver">

                <div className="bus-driver-icon">
                  <UserRound size={15} />
                </div>

                <div>
                  <span>DRIVER</span>

                  <strong>
                    {bus.driver}
                  </strong>
                </div>

                {bus.contact && (
                  <a
                    href={`tel:${bus.contact}`}
                    className="bus-call"
                  >
                    <Phone size={14} />
                  </a>
                )}

              </div>

              {/* STOPS */}

              {bus.stops?.length > 0 && (
                <div className="bus-stops">

                  <div className="bus-stops-title">
                    <MapPin size={13} />
                    ROUTE STOPS
                  </div>

                  <div className="bus-stop-list">

                    {bus.stops.map(
                      (stop, index) => (
                        <span
                          key={`${bus._id}-${index}`}
                        >
                          {stop}
                        </span>
                      )
                    )}

                  </div>

                </div>
              )}

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default StudentBus;