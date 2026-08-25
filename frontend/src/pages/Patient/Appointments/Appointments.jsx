import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../../components/ConfirmModal";
import {
  Stethoscope,
  CalendarDays,
  Clock3,
  Building2,
  BadgeInfo,
  CheckCircle2,
  Trash2,
  Plus,
} from "lucide-react";
import "./Appointments.css";

function Appointments() {
  const navigate = useNavigate();

  // =====================================================
  // STATE
  // =====================================================

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [cancellingId, setCancellingId] = useState(null);

  // Cancel confirmation modal
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] =
    useState(null);

  // =====================================================
  // GET LOGGED-IN PATIENT
  // =====================================================

  const getPatientId = () => {
    try {
      const userData = localStorage.getItem("user");

      if (!userData) {
        return null;
      }

      const user = JSON.parse(userData);

      return user?.patientId || user?.id || null;
    } catch (error) {
      console.error("Error reading user:", error);
      return null;
    }
  };

  // =====================================================
  // FETCH PATIENT APPOINTMENTS
  // =====================================================

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const patientId = getPatientId();

      if (!patientId) {
        setError(
          "Patient information not found. Please login again."
        );

        setAppointments([]);
        return;
      }

      console.log(
        "Fetching appointments for patient:",
        patientId
      );

      const response = await fetch(
        `http://localhost:8080/api/appointments/patient/${patientId}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch appointments: ${response.status}`
        );
      }

      const data = await response.json();

      console.log("Patient appointments:", data);

      setAppointments(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "Error fetching appointments:",
        error
      );

      setError(
        "Unable to load appointments. Please try again."
      );

      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD APPOINTMENTS
  // =====================================================

  useEffect(() => {
    fetchAppointments();
  }, []);

  // =====================================================
  // OPEN CANCEL CONFIRMATION
  // =====================================================

  const handleCancelAppointment = (appointmentId) => {
    if (!appointmentId) {
      setError("Appointment ID not found.");
      return;
    }

    setSelectedAppointmentId(appointmentId);
    setShowCancelModal(true);
  };

  // =====================================================
  // CLOSE CANCEL MODAL
  // =====================================================

  const closeCancelModal = () => {
    if (cancellingId) {
      return;
    }

    setShowCancelModal(false);
    setSelectedAppointmentId(null);
  };

  // =====================================================
  // CONFIRM CANCEL APPOINTMENT
  // =====================================================

  const confirmCancelAppointment = async () => {
    const appointmentId = selectedAppointmentId;

    if (!appointmentId) {
      return;
    }

    try {
      setCancellingId(appointmentId);
      setError("");

      console.log(
        "Cancelling appointment:",
        appointmentId
      );

      const response = await fetch(
        `http://localhost:8080/api/appointments/${appointmentId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Cancelled",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Unable to cancel appointment: ${response.status}`
        );
      }

      const updatedAppointment =
        await response.json();

      console.log(
        "Appointment cancelled:",
        updatedAppointment
      );

      // =================================================
      // UPDATE UI IMMEDIATELY
      // =================================================

      setAppointments((previousAppointments) =>
        previousAppointments.map((appointment) =>
          appointment.appointmentId === appointmentId
            ? {
                ...appointment,
                ...updatedAppointment,
                status: "Cancelled",
              }
            : appointment
        )
      );

      // Close modal
      setShowCancelModal(false);
      setSelectedAppointmentId(null);

    } catch (error) {
      console.error(
        "Cancel appointment error:",
        error
      );

      setError(
        "Unable to cancel appointment. Please try again."
      );
    } finally {
      setCancellingId(null);
    }
  };

  // =====================================================
  // BOOK APPOINTMENT
  // =====================================================

  const handleBookAppointment = () => {
    navigate("/patient/book-appointment");
  };

  // =====================================================
  // GET STATUS CLASS
  // =====================================================

  const getStatusClass = (status) => {
    if (!status) {
      return "status-pending";
    }

    switch (status.toLowerCase()) {
      case "confirmed":
        return "status-confirmed";

      case "completed":
        return "status-completed";

      case "cancelled":
        return "status-cancelled";

      case "pending":
        return "status-pending";

      default:
        return "status-pending";
    }
  };

  // =====================================================
  // FORMAT TIME
  // =====================================================

  const formatTime = (time) => {
    if (!time) {
      return "-";
    }

    return time;
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="appointments-page">

        <div className="appointments-header">

          <div>
            <h1>My Appointments</h1>

            <p>
              View and manage your hospital
              appointments.
            </p>
          </div>

          <button
            type="button"
            className="book-appointment-btn"
            onClick={handleBookAppointment}
          >
            <Plus size={18} />
            Book Appointment
          </button>

        </div>

        <div className="appointments-loading">

          <div
            className="loading-spinner"
            aria-hidden="true"
          >
            <span className="spinner-ring"></span>
          </div>

          <p>Loading appointments...</p>

        </div>

      </div>
    );
  }

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="appointments-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="appointments-header">

        <div>
          <h1>My Appointments</h1>

          <p>
            View and manage your hospital
            appointments.
          </p>
        </div>

        <button
          type="button"
          className="book-appointment-btn"
          onClick={handleBookAppointment}
        >
          <Plus size={18} />
          Book Appointment
        </button>

      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="appointments-error">
          {error}
        </div>
      )}

      {/* =================================================
          NO APPOINTMENTS
      ================================================= */}

      {!error && appointments.length === 0 && (
        <div className="no-appointments">

          <div
            className="no-appointments-icon"
            aria-hidden="true"
          >
            <CalendarDays size={30} />
          </div>

          <h2>No Appointments Found</h2>

          <p>
            You don't have any appointments yet.
          </p>

          <button
            type="button"
            className="book-appointment-btn"
            onClick={handleBookAppointment}
          >
            <Plus size={18} />
            Book Your First Appointment
          </button>

        </div>
      )}

      {/* =================================================
          APPOINTMENT CARDS
      ================================================= */}

      <div className="appointments-list">

        {appointments.map((appointment) => {

          const appointmentId =
            appointment.appointmentId;

          const status =
            appointment.status || "Pending";

          const statusLower =
            status.toLowerCase();

          // Pending AND Confirmed can be cancelled
          const canCancel =
            statusLower === "pending" ||
            statusLower === "confirmed";

          const isCompleted =
            statusLower === "completed";

          const isCancelled =
            statusLower === "cancelled";

          const isCancelling =
            cancellingId === appointmentId;

          return (
            <div
              className="appointment-card"
              key={appointmentId}
            >

              {/* =========================================
                  CARD HEADER
              ========================================= */}

              <div className="appointment-card-header">

                <div className="doctor-info">

                  <div
                    className="doctor-icon"
                    aria-hidden="true"
                  >
                    <Stethoscope
                      size={32}
                      strokeWidth={2}
                    />
                  </div>

                  <div className="doctor-text">

                    <h2>
                      {appointment.doctorName ||
                        `Doctor #${
                          appointment.doctorId ||
                          "N/A"
                        }`}
                    </h2>

                    <p>
                      {appointment.specialization ||
                        "Medical Specialist"}
                    </p>

                    <span className="doctor-id">
                      Doctor #
                      {appointment.doctorId ||
                        "N/A"}
                    </span>

                  </div>

                </div>

                <span
                  className={`appointment-status ${getStatusClass(
                    status
                  )}`}
                >

                  {statusLower === "confirmed" && (
                    <CheckCircle2
                      size={16}
                      strokeWidth={2.4}
                    />
                  )}

                  <span>
                    {status}
                  </span>

                </span>

              </div>

              {/* =========================================
                  APPOINTMENT DETAILS
              ========================================= */}

              <div className="appointment-details">

                {/* DATE */}

                <div className="appointment-detail">

                  <span
                    className="detail-icon"
                    aria-hidden="true"
                  >
                    <CalendarDays size={21} />
                  </span>

                  <div>

                    <span className="detail-label">
                      Date
                    </span>

                    <strong>
                      {appointment.appointmentDate ||
                        "-"}
                    </strong>

                  </div>

                </div>

                {/* TIME */}

                <div className="appointment-detail">

                  <span
                    className="detail-icon"
                    aria-hidden="true"
                  >
                    <Clock3 size={21} />
                  </span>

                  <div>

                    <span className="detail-label">
                      Time
                    </span>

                    <strong>
                      {formatTime(
                        appointment.appointmentTime
                      )}
                    </strong>

                  </div>

                </div>

                {/* DEPARTMENT */}

                <div className="appointment-detail">

                  <span
                    className="detail-icon"
                    aria-hidden="true"
                  >
                    <Building2 size={21} />
                  </span>

                  <div>

                    <span className="detail-label">
                      Department
                    </span>

                    <strong>
                      {appointment.department ||
                        "General"}
                    </strong>

                  </div>

                </div>

                {/* APPOINTMENT ID */}

                <div className="appointment-detail">

                  <span
                    className="detail-icon"
                    aria-hidden="true"
                  >
                    <BadgeInfo size={21} />
                  </span>

                  <div>

                    <span className="detail-label">
                      Appointment ID
                    </span>

                    <strong>
                      #{appointmentId}
                    </strong>

                  </div>

                </div>

              </div>

              {/* =========================================
                  REASON
              ========================================= */}

              <div className="appointment-reason">

                <strong>
                  Reason
                </strong>

                <p>
                  {appointment.reason ||
                    "No reason provided."}
                </p>

              </div>

              {/* =========================================
                  ACTION
              ========================================= */}

              <div className="appointment-actions">

                {/* CANCEL */}

                {canCancel && (
                  <button
                    type="button"
                    className="cancel-appointment-btn"
                    onClick={() =>
                      handleCancelAppointment(
                        appointmentId
                      )
                    }
                    disabled={isCancelling}
                  >
                    <Trash2 size={17} />

                    {isCancelling
                      ? "Cancelling..."
                      : "Cancel Appointment"}
                  </button>
                )}

                {/* COMPLETED */}

                {isCompleted && (
                  <div className="appointment-info completed-info">
                    This appointment has been
                    completed.
                  </div>
                )}

                {/* CANCELLED */}

                {isCancelled && (
                  <div className="appointment-info cancelled-info">
                    This appointment has been
                    cancelled.
                  </div>
                )}

              </div>

            </div>
          );
        })}

      </div>

      <ConfirmModal
      isOpen={showCancelModal}
      variant="danger"
      title="Cancel Appointment?"
      message="Are you sure you want to cancel this appointment?"
      warning="This will change the appointment status to Cancelled."
      confirmText="Yes, Cancel"
      cancelText="Keep Appointment"
      onConfirm={confirmCancelAppointment}
      onCancel={closeCancelModal}
      loading={!!cancellingId}
      />
      

    </div>
  );
}

export default Appointments;