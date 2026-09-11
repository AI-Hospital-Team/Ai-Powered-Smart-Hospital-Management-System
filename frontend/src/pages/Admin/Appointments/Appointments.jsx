import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Search,
  RefreshCw,
  UserRound,
  Stethoscope,
  Clock3,
  ClipboardList,
  CheckCircle2,
  XCircle,
  CircleAlert,
  X,
  ArrowRight,
} from "lucide-react";

import {
  fetchAppointments,
  fetchPatients,
  updateAppointmentStatus,
} from "../adminApi";

import "./Appointments.css";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedAppointment, setSelectedAppointment] =
    useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [appointmentsData, patientsData] =
        await Promise.all([
          fetchAppointments(),
          fetchPatients(),
        ]);

      setAppointments(
        Array.isArray(appointmentsData)
          ? appointmentsData
          : []
      );

      setPatients(
        Array.isArray(patientsData)
          ? patientsData
          : []
      );
    } catch (err) {
      console.error("Appointments error:", err);

      setError(
        "Unable to load appointments. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const getPatientName = (patientId) => {
    const patient = patients.find(
      (item) =>
        Number(item.patientId) === Number(patientId)
    );

    return (
      patient?.name ||
      `Patient #${patientId ?? "-"}`
    );
  };

  const getPatientInitial = (patientId) => {
    return getPatientName(patientId)
      .trim()
      .charAt(0)
      .toUpperCase();
  };

  const formatDate = (date) => {
    if (!date) return "-";

    try {
      return new Date(`${date}T00:00:00`).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
    } catch {
      return date;
    }
  };

  const formatTime = (time) => {
    if (!time) return "-";

    try {
      const [hours, minutes] = time
        .split(":")
        .map(Number);

      const date = new Date();

      date.setHours(hours, minutes, 0, 0);

      return date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return time;
    }
  };

  const getStatusClass = (status) => {
    const value = status?.toLowerCase();

    if (value === "completed") {
      return "status-completed";
    }

    if (value === "cancelled") {
      return "status-cancelled";
    }

    if (value === "confirmed") {
      return "status-confirmed";
    }

    return "status-pending";
  };

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const statusMatch =
        statusFilter === "All" ||
        appointment.status?.toLowerCase() ===
          statusFilter.toLowerCase();

      const search =
        searchTerm.trim().toLowerCase();

      if (!search) {
        return statusMatch;
      }

      const patientName = getPatientName(
        appointment.patientId
      );

      const searchableText = [
        appointment.appointmentId,
        appointment.patientId,
        patientName,
        appointment.doctorName,
        appointment.specialization,
        appointment.reason,
        appointment.status,
        appointment.appointmentDate,
      ]
        .map((value) =>
          String(value ?? "").toLowerCase()
        )
        .join(" ");

      return (
        statusMatch &&
        searchableText.includes(search)
      );
    });
  }, [
    appointments,
    patients,
    searchTerm,
    statusFilter,
  ]);

  const counts = useMemo(() => {
    return {
      all: appointments.length,

      pending: appointments.filter(
        (item) =>
          item.status?.toLowerCase() === "pending"
      ).length,

      confirmed: appointments.filter(
        (item) =>
          item.status?.toLowerCase() === "confirmed"
      ).length,

      completed: appointments.filter(
        (item) =>
          item.status?.toLowerCase() === "completed"
      ).length,

      cancelled: appointments.filter(
        (item) =>
          item.status?.toLowerCase() === "cancelled"
      ).length,
    };
  }, [appointments]);

  const handleStatusUpdate = async (
    appointmentId,
    status
  ) => {
    try {
      setUpdatingId(appointmentId);
      setError("");

      const updated =
        await updateAppointmentStatus(
          appointmentId,
          status
        );

      setAppointments((current) =>
        current.map((appointment) =>
          appointment.appointmentId ===
          appointmentId
            ? {
                ...appointment,
                ...(updated || {}),
                status,
              }
            : appointment
        )
      );

      setSelectedAppointment((current) =>
        current &&
        current.appointmentId === appointmentId
          ? {
              ...current,
              ...(updated || {}),
              status,
            }
          : current
      );
    } catch (err) {
      console.error(
        "Status update error:",
        err
      );

      setError(
        "Unable to update appointment status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="admin-appointments-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="appointments-page-header">

        <div className="appointments-page-title">

          <div className="appointments-title-icon">
            <CalendarDays size={27} />
          </div>

          <div>

            <div className="appointments-section-label">
              Appointment Management
            </div>

            <h1>Appointments</h1>

            <p>
              View and manage all hospital
              appointments.
            </p>

          </div>

        </div>

        <button
          className="appointments-refresh-button"
          onClick={loadData}
          disabled={loading}
        >
          <RefreshCw size={16} />
          Refresh
        </button>

      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="appointments-error">

          <div>
            <strong>
              Appointment update error
            </strong>

            <p>{error}</p>
          </div>

          <button onClick={loadData}>
            Try Again
          </button>

        </div>
      )}

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div className="appointment-stats">

        <div
          className={`appointment-stat-card ${
            statusFilter === "All"
              ? "stat-selected"
              : ""
          }`}
          onClick={() => setStatusFilter("All")}
        >
          <div className="appointment-stat-icon all">
            <CalendarDays size={21} />
          </div>

          <div>
            <span>Total</span>
            <strong>{counts.all}</strong>
            <small>All appointments</small>
          </div>
        </div>

        <div
          className={`appointment-stat-card ${
            statusFilter === "Pending"
              ? "stat-selected"
              : ""
          }`}
          onClick={() => setStatusFilter("Pending")}
        >
          <div className="appointment-stat-icon pending">
            <CircleAlert size={21} />
          </div>

          <div>
            <span>Pending</span>
            <strong>{counts.pending}</strong>
            <small>Awaiting confirmation</small>
          </div>
        </div>

        <div
          className={`appointment-stat-card ${
            statusFilter === "Confirmed"
              ? "stat-selected"
              : ""
          }`}
          onClick={() => setStatusFilter("Confirmed")}
        >
          <div className="appointment-stat-icon confirmed">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <span>Confirmed</span>
            <strong>{counts.confirmed}</strong>
            <small>Scheduled visits</small>
          </div>
        </div>

        <div
          className={`appointment-stat-card ${
            statusFilter === "Completed"
              ? "stat-selected"
              : ""
          }`}
          onClick={() => setStatusFilter("Completed")}
        >
          <div className="appointment-stat-icon completed">
            <ClipboardList size={21} />
          </div>

          <div>
            <span>Completed</span>
            <strong>{counts.completed}</strong>
            <small>Finished visits</small>
          </div>
        </div>

      </div>

      {/* =================================================
          TOOLBAR
      ================================================= */}

      <div className="appointments-toolbar">

        <div>

          <h2>Appointment Directory</h2>

          <p>
            Search appointments and manage their
            status.
          </p>

        </div>

        <div className="appointments-search">

          <Search size={17} />

          <input
            type="text"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />

          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
            >
              <X size={15} />
            </button>
          )}

        </div>

      </div>

      {/* =================================================
          FILTERS
      ================================================= */}

      <div className="appointment-filters">

        {[
          ["All", counts.all],
          ["Pending", counts.pending],
          ["Confirmed", counts.confirmed],
          ["Completed", counts.completed],
          ["Cancelled", counts.cancelled],
        ].map(([status, count]) => (

          <button
            key={status}
            className={
              statusFilter === status
                ? "appointment-filter active"
                : "appointment-filter"
            }
            onClick={() =>
              setStatusFilter(status)
            }
          >
            {status}
            <span>{count}</span>
          </button>

        ))}

      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      {loading ? (

        <div className="appointments-loading">

          <div className="appointments-spinner"></div>

          <h3>Loading appointments...</h3>

          <p>
            Please wait while we fetch appointment
            data.
          </p>

        </div>

      ) : filteredAppointments.length === 0 ? (

        <div className="appointments-empty">

          <div className="appointments-empty-icon">
            <CalendarDays size={36} />
          </div>

          <h3>
            No Appointments Found
          </h3>

          <p>
            No appointments match your current
            search or filter.
          </p>

          <button
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("All");
            }}
          >
            Clear Filters
          </button>

        </div>

      ) : (

        <div className="appointments-grid">

          {filteredAppointments.map(
            (appointment, index) => {

              const patientName =
                getPatientName(
                  appointment.patientId
                );

              const isUpdating =
                updatingId ===
                appointment.appointmentId;

              return (
                <div
                  className="admin-appointment-card"
                  key={
                    appointment.appointmentId ??
                    index
                  }
                  style={{
                    animationDelay:
                      `${index * 0.04}s`,
                  }}
                >

                  {/* TOP */}

                  <div className="appointment-card-top">

                    <div className="appointment-date-icon">

                      <CalendarDays size={20} />

                    </div>

                    <div className="appointment-main">

                      <h3>
                        {patientName}
                      </h3>

                      <span>
                        Appointment #
                        {appointment.appointmentId}
                      </span>

                    </div>

                    <span
                      className={`appointment-status ${getStatusClass(
                        appointment.status
                      )}`}
                    >
                      {appointment.status ||
                        "Pending"}
                    </span>

                  </div>

                  {/* DOCTOR */}

                  <div className="appointment-doctor">

                    <div className="appointment-small-icon">
                      <Stethoscope size={16} />
                    </div>

                    <div>

                      <small>Doctor</small>

                      <strong>
                        {appointment.doctorName ||
                          `Doctor #${appointment.doctorId}`}
                      </strong>

                      {appointment.specialization && (
                        <span>
                          {
                            appointment.specialization
                          }
                        </span>
                      )}

                    </div>

                  </div>

                  {/* DATE / TIME */}

                  <div className="appointment-info-row">

                    <div>

                      <CalendarDays size={15} />

                      <div>
                        <small>Date</small>

                        <strong>
                          {formatDate(
                            appointment.appointmentDate
                          )}
                        </strong>
                      </div>

                    </div>

                    <div>

                      <Clock3 size={15} />

                      <div>
                        <small>Time</small>

                        <strong>
                          {formatTime(
                            appointment.appointmentTime
                          )}
                        </strong>
                      </div>

                    </div>

                  </div>

                  {/* REASON */}

                  <div className="appointment-reason">

                    <small>
                      Reason for Visit
                    </small>

                    <p>
                      {appointment.reason ||
                        "No reason provided."}
                    </p>

                  </div>

                  {/* ACTIONS */}

                  <div className="appointment-actions">

                    {appointment.status !==
                      "Confirmed" &&
                      appointment.status !==
                        "Completed" &&
                      appointment.status !==
                        "Cancelled" && (

                        <button
                          className="confirm-action"
                          disabled={isUpdating}
                          onClick={() =>
                            handleStatusUpdate(
                              appointment.appointmentId,
                              "Confirmed"
                            )
                          }
                        >
                          <CheckCircle2 size={14} />
                          Confirm
                        </button>
                      )}

                    {appointment.status ===
                      "Confirmed" && (

                        <button
                          className="complete-action"
                          disabled={isUpdating}
                          onClick={() =>
                            handleStatusUpdate(
                              appointment.appointmentId,
                              "Completed"
                            )
                          }
                        >
                          <CheckCircle2 size={14} />
                          Complete
                        </button>
                      )}

                    {appointment.status !==
                      "Completed" &&
                      appointment.status !==
                        "Cancelled" && (

                        <button
                          className="cancel-action"
                          disabled={isUpdating}
                          onClick={() =>
                            handleStatusUpdate(
                              appointment.appointmentId,
                              "Cancelled"
                            )
                          }
                        >
                          <XCircle size={14} />
                          Cancel
                        </button>
                      )}

                    <button
                      className="view-appointment-action"
                      onClick={() =>
                        setSelectedAppointment(
                          appointment
                        )
                      }
                    >
                      View
                      <ArrowRight size={14} />
                    </button>

                  </div>

                  {isUpdating && (
                    <div className="appointment-updating">
                      Updating status...
                    </div>
                  )}

                </div>
              );
            }
          )}

        </div>
      )}

      {/* =================================================
          DETAILS MODAL
      ================================================= */}

      {selectedAppointment && (

        <div
          className="appointment-modal-overlay"
          onClick={() =>
            setSelectedAppointment(null)
          }
        >

          <div
            className="appointment-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="appointment-modal-header">

              <div className="appointment-modal-title">

                <div className="appointment-modal-icon">
                  <CalendarDays size={22} />
                </div>

                <div>

                  <h2>
                    Appointment Details
                  </h2>

                  <p>
                    Appointment #
                    {
                      selectedAppointment.appointmentId
                    }
                  </p>

                </div>

              </div>

              <button
                className="appointment-modal-close"
                onClick={() =>
                  setSelectedAppointment(null)
                }
              >
                <X size={18} />
              </button>

            </div>

            <div className="appointment-modal-content">

              <div className="appointment-detail-patient">

                <div className="appointment-patient-avatar">
                  {getPatientInitial(
                    selectedAppointment.patientId
                  )}
                </div>

                <div>

                  <small>Patient</small>

                  <strong>
                    {getPatientName(
                      selectedAppointment.patientId
                    )}
                  </strong>

                  <span>
                    Patient #
                    {
                      selectedAppointment.patientId
                    }
                  </span>

                </div>

              </div>

              <div className="appointment-detail-grid">

                <div>

                  <small>Doctor</small>

                  <strong>
                    {selectedAppointment.doctorName ||
                      `Doctor #${selectedAppointment.doctorId}`}
                  </strong>

                </div>

                <div>

                  <small>Specialization</small>

                  <strong>
                    {selectedAppointment.specialization ||
                      "-"}
                  </strong>

                </div>

                <div>

                  <small>Date</small>

                  <strong>
                    {formatDate(
                      selectedAppointment.appointmentDate
                    )}
                  </strong>

                </div>

                <div>

                  <small>Time</small>

                  <strong>
                    {formatTime(
                      selectedAppointment.appointmentTime
                    )}
                  </strong>

                </div>

                <div>

                  <small>Status</small>

                  <strong
                    className={`modal-status-text ${getStatusClass(
                      selectedAppointment.status
                    )}`}
                  >
                    {selectedAppointment.status ||
                      "Pending"}
                  </strong>

                </div>

                <div>

                  <small>Patient ID</small>

                  <strong>
                    #
                    {
                      selectedAppointment.patientId
                    }
                  </strong>

                </div>

              </div>

              <div className="appointment-modal-reason">

                <small>
                  Reason for Visit
                </small>

                <p>
                  {selectedAppointment.reason ||
                    "No reason provided."}
                </p>

              </div>

            </div>

            <div className="appointment-modal-footer">

              <button
                onClick={() =>
                  setSelectedAppointment(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Appointments;