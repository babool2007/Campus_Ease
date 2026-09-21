import { useEffect, useState } from "react";
import {
  Bus,
  Plus,
  Pencil,
  Trash2,
  X,
  MapPin,
} from "lucide-react";

import api from "../services/api";
import "../styles/dashboard.css";

const emptyForm = {
  busNumber: "",
  route: "",
  driver: "",
  contact: "",
  departureTime: "",
  returnTime: "",
  status: "Active",
  stops: "",
};

function AdminBus() {
  const [buses, setBuses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState(emptyForm);

  /* --------------------------------
     LOAD BUSES
  -------------------------------- */

  const loadBuses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/buses");

      setBuses(response.data.buses || []);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to load buses"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBuses();
  }, []);

  /* --------------------------------
     FORM CHANGE
  -------------------------------- */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* --------------------------------
     OPEN ADD
  -------------------------------- */

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  /* --------------------------------
     OPEN EDIT
  -------------------------------- */

  const openEditForm = (bus) => {
    setEditingId(bus._id);

    setForm({
      busNumber: bus.busNumber || "",
      route: bus.route || "",
      driver: bus.driver || "",
      contact: bus.contact || "",
      departureTime: bus.departureTime || "",
      returnTime: bus.returnTime || "",
      status: bus.status || "Active",
      stops: bus.stops?.join(", ") || "",
    });

    setError("");
    setSuccess("");
    setShowForm(true);
  };

  /* --------------------------------
     CLOSE FORM
  -------------------------------- */

  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  /* --------------------------------
     SAVE BUS
  -------------------------------- */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setSaving(true);

    const payload = {
      busNumber: form.busNumber.trim(),
      route: form.route.trim(),
      driver: form.driver.trim(),
      contact: form.contact.trim(),
      departureTime: form.departureTime,
      returnTime: form.returnTime,
      status: form.status,

      stops: form.stops
        .split(",")
        .map((stop) => stop.trim())
        .filter(Boolean),
    };

    try {
      if (editingId) {
        await api.put(
          `/buses/${editingId}`,
          payload
        );

        setSuccess("Bus updated successfully.");
      } else {
        await api.post(
          "/buses",
          payload
        );

        setSuccess("Bus added successfully.");
      }

      await loadBuses();

      setTimeout(() => {
        closeForm();
        setSuccess("");
      }, 700);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to save bus"
      );
    } finally {
      setSaving(false);
    }
  };

  /* --------------------------------
     DELETE
  -------------------------------- */

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this bus?"
    );

    if (!confirmed) return;

    try {
      setError("");

      await api.delete(`/buses/${id}`);

      setBuses((previous) =>
        previous.filter(
          (bus) => bus._id !== id
        )
      );

      setSuccess("Bus deleted successfully.");

      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to delete bus"
      );
    }
  };

  return (
    <div className="bus-page">

      {/* HEADER */}

      <div className="bus-page-header">

        <div>
          <p className="page-eyebrow">
            ADMINISTRATION
          </p>

          <h1>Campus Bus</h1>

          <p>
            Manage campus transportation routes,
            timings and drivers.
          </p>
        </div>

        <button
          className="bus-add-button"
          onClick={openAddForm}
        >
          <Plus size={16} />
          Add Bus
        </button>

      </div>

      {/* MESSAGES */}

      {error && (
        <div className="bus-error">
          {error}
        </div>
      )}

      {success && (
        <div className="bus-success">
          {success}
        </div>
      )}

      {/* TABLE */}

      {loading ? (
        <div className="bus-loading">
          <Bus size={30} />
          <p>Loading buses...</p>
        </div>
      ) : buses.length === 0 ? (
        <div className="bus-empty">

          <Bus size={35} />

          <h3>No buses added</h3>

          <p>
            Add the first campus bus to the system.
          </p>

          <button
            className="bus-add-button"
            onClick={openAddForm}
          >
            <Plus size={15} />
            Add Bus
          </button>

        </div>
      ) : (
        <div className="admin-bus-table-wrapper">

          <table className="admin-bus-table">

            <thead>
              <tr>
                <th>BUS</th>
                <th>ROUTE</th>
                <th>DRIVER</th>
                <th>DEPARTURE</th>
                <th>RETURN</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>

              {buses.map((bus) => (
                <tr key={bus._id}>

                  <td>
                    <div className="admin-bus-number">
                      <Bus size={15} />
                      {bus.busNumber}
                    </div>
                  </td>

                  <td>
                    <div className="admin-bus-route">
                      <MapPin size={13} />
                      {bus.route}
                    </div>
                  </td>

                  <td>
                    {bus.driver}
                  </td>

                  <td>
                    {bus.departureTime}
                  </td>

                  <td>
                    {bus.returnTime}
                  </td>

                  <td>
                    <span
                      className={`bus-status ${bus.status
                        ?.toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {bus.status}
                    </span>
                  </td>

                  <td>

                    <div className="admin-bus-actions">

                      <button
                        onClick={() =>
                          openEditForm(bus)
                        }
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(bus._id)
                        }
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

      {/* MODAL */}

      {showForm && (
        <div className="bus-modal-backdrop">

          <div className="bus-modal">

            <div className="bus-modal-header">

              <div>
                <p className="page-eyebrow">
                  TRANSPORT MANAGEMENT
                </p>

                <h2>
                  {editingId
                    ? "Edit Bus"
                    : "Add New Bus"}
                </h2>
              </div>

              <button
                onClick={closeForm}
                className="bus-modal-close"
              >
                <X size={18} />
              </button>

            </div>

            <form
              className="bus-form"
              onSubmit={handleSubmit}
            >

              <div className="bus-form-grid">

                <div className="bus-form-group">
                  <label>Bus Number</label>

                  <input
                    name="busNumber"
                    value={form.busNumber}
                    onChange={handleChange}
                    placeholder="BUS-01"
                    required
                  />
                </div>

                <div className="bus-form-group">
                  <label>Route</label>

                  <input
                    name="route"
                    value={form.route}
                    onChange={handleChange}
                    placeholder="Main Gate → Hostel"
                    required
                  />
                </div>

                <div className="bus-form-group">
                  <label>Driver</label>

                  <input
                    name="driver"
                    value={form.driver}
                    onChange={handleChange}
                    placeholder="Driver name"
                    required
                  />
                </div>

                <div className="bus-form-group">
                  <label>Contact</label>

                  <input
                    name="contact"
                    value={form.contact}
                    onChange={handleChange}
                    placeholder="Phone number"
                  />
                </div>

                <div className="bus-form-group">
                  <label>Departure Time</label>

                  <input
                    type="time"
                    name="departureTime"
                    value={form.departureTime}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="bus-form-group">
                  <label>Return Time</label>

                  <input
                    type="time"
                    name="returnTime"
                    value={form.returnTime}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="bus-form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="Active">
                      Active
                    </option>

                    <option value="Maintenance">
                      Maintenance
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>
                  </select>
                </div>

                <div className="bus-form-group bus-form-full">
                  <label>
                    Stops
                  </label>

                  <input
                    name="stops"
                    value={form.stops}
                    onChange={handleChange}
                    placeholder="Main Gate, Library, Hostel, Canteen"
                  />

                  <small>
                    Separate stops with commas.
                  </small>
                </div>

              </div>

              {error && (
                <div className="bus-error">
                  {error}
                </div>
              )}

              {success && (
                <div className="bus-success">
                  {success}
                </div>
              )}

              <div className="bus-form-actions">

                <button
                  type="button"
                  className="bus-cancel-button"
                  onClick={closeForm}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bus-save-button"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Bus"
                    : "Add Bus"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default AdminBus;