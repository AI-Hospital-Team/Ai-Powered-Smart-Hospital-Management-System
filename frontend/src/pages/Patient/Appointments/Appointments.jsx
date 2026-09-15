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
  RefreshCw,
  XCircle,
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
  const [doctors, setDoctors] = useState([]);

  // Cancel
  const [cancellingId, setCancellingId] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] =
    useState(null);

  // Reschedule
  const [showRescheduleModal, setShowRescheduleModal] =
    useState(false);
  const [selectedRescheduleAppointment, setSelectedRescheduleAppointment] =
    useState(null);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [reschedulingId, setReschedulingId] = useState(null);

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

      return user?.patientId || null;
    } catch (error) {
      console.error("Error reading user:", error);
      return null;
    }
  };

  // =====================================================
  // GET TODAY'S DATE
  // =====================================================

  const getTodayDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // =====================================================
  // FETCH PATIENT APPOINTMENTS + DOCTORS
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
        setDoctors([]);

        return;
      }

      console.log(
        "Fetching appointments for patient:",
        patientId
      );

      const [
        appointmentsResponse,
        doctorsResponse,
      ] = await Promise.all([
        fetch(
          `http://localhost:8080/api/appointments/patient/${patientId}`
        ),

        fetch(
          "http://localhost:8080/api/doctors"
        ),
      ]);

      if (!appointmentsResponse.ok) {
        throw new Error(
          `Failed to fetch appointments: ${appointmentsResponse.status}`
        );
      }

      const appointmentsData =
        await appointmentsResponse.json();

      const doctorsData =
        doctorsResponse.ok
          ? await doctorsResponse.json()
          : [];

      console.log(
        "Patient appointments:",
        appointmentsData
      );

      console.log(
        "Doctors:",
        doctorsData
      );

      setAppointments(
        Array.isArray(appointmentsData)
          ? appointmentsData
          : []
      );

      setDoctors(
        Array.isArray(doctorsData)
          ? doctorsData
          : []
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
      setDoctors([]);

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
  // GET DOCTOR NAME
  // =====================================================

  const getDoctorName = (doctorId) => {
    const doctor = doctors.find(
      (item) =>
        Number(item.doctorId) ===
        Number(doctorId)
    );

    return (
      doctor?.name ||
      `Doctor #${doctorId || "N/A"}`
    );
  };

  // =====================================================
  // GET DOCTOR SPECIALIZATION
  // =====================================================

  const getDoctorSpecialization = (doctorId) => {
    const doctor = doctors.find(
      (item) =>
        Number(item.doctorId) ===
        Number(doctorId)
    );

    return (
      doctor?.specialization ||
      "Medical Specialist"
    );
  };

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
  // OPEN RESCHEDULE MODAL
  // =====================================================

  const handleOpenReschedule = (appointment) => {
    if (!appointment?.appointmentId) {
      setError("Appointment ID not found.");
      return;
    }

    setSelectedRescheduleAppointment(appointment);

    // Patient selects a completely new date/time
    setRescheduleDate("");
    setRescheduleTime("");

    setShowRescheduleModal(true);
  };

  // =====================================================
  // CLOSE RESCHEDULE MODAL
  // =====================================================

  const closeRescheduleModal = () => {
    if (reschedulingId) {
      return;
    }

    setShowRescheduleModal(false);
    setSelectedRescheduleAppointment(null);
    setRescheduleDate("");
    setRescheduleTime("");
  };

  // =====================================================
  // CONFIRM RESCHEDULE
  // =====================================================

  const confirmRescheduleAppointment = async () => {
    if (!selectedRescheduleAppointment) {
      return;
    }

    if (!rescheduleDate || !rescheduleTime) {
      alert("Please select a new date and time.");
      return;
    }

    const appointmentId =
      selectedRescheduleAppointment.appointmentId;

    try {
      setReschedulingId(appointmentId);
      setError("");

      console.log(
        "Rescheduling appointment:",
        appointmentId
      );

      const response = await fetch(
        `http://localhost:8080/api/appointments/${appointmentId}/reschedule`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            appointmentDate: rescheduleDate,
            appointmentTime: rescheduleTime,
          }),
        }
      );

      let responseData = null;

      const responseText = await response.text();

      if (responseText) {
        try {
          responseData = JSON.parse(responseText);
        } catch {
          responseData = responseText;
        }
      }

      if (!response.ok) {
        const message =
          typeof responseData === "string"
            ? responseData
            : responseData?.message ||
              "Failed to reschedule appointment.";

        throw new Error(message);
      }

      console.log(
        "Appointment rescheduled:",
        responseData
      );

      // =================================================
      // UPDATE UI IMMEDIATELY
      // =================================================

      setAppointments((previousAppointments) =>
        previousAppointments.map((appointment) =>
          appointment.appointmentId === appointmentId
            ? {
                ...appointment,
                ...(responseData &&
                typeof responseData === "object"
                  ? responseData
                  : {}),
                appointmentDate: rescheduleDate,
                appointmentTime: rescheduleTime,
                status: "Pending",
              }
            : appointment
        )
      );

      // Close modal
      setShowRescheduleModal(false);
      setSelectedRescheduleAppointment(null);
      setRescheduleDate("");
      setRescheduleTime("");

      alert(
        "Appointment rescheduled successfully. It is now pending confirmation."
      );

    } catch (error) {
      console.error(
        "Reschedule appointment error:",
        error
      );

      setError(
        error.message ||
          "Unable to reschedule appointment. Please try again."
      );

    } finally {
      setReschedulingId(null);
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

      case "expired":
        return "status-expired";

      case "rejected":
        return "status-rejected";

      case "rescheduled":
        return "status-rescheduled";

      case "pending":
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

          // =================================================
          // ACTION CONDITIONS
          // =================================================

          // Pending and Confirmed can be cancelled
          const canCancel =
            statusLower === "pending" ||
            statusLower === "confirmed";

          // Pending, Confirmed, Expired and Rescheduled
          // can be extended/rescheduled
          const canReschedule =
            statusLower === "pending" ||
            statusLower === "confirmed" ||
            statusLower === "expired" ||
            statusLower === "rescheduled";

          const isCompleted =
            statusLower === "completed";

          const isCancelled =
            statusLower === "cancelled";

          const isExpired =
            statusLower === "expired";

          const isRejected =
            statusLower === "rejected";

          const isRescheduling =
            reschedulingId === appointmentId;

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
                      {getDoctorName(
                        appointment.doctorId
                      )}
                    </h2>

                    <p>
                      {getDoctorSpecialization(
                        appointment.doctorId
                      )}
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

                  {statusLower === "expired" && (
                    <Clock3
                      size={15}
                      strokeWidth={2.4}
                    />
                  )}

                  {statusLower === "cancelled" && (
                    <XCircle
                      size={15}
                      strokeWidth={2.4}
                    />
                  )}

                  {statusLower === "rescheduled" && (
                    <RefreshCw
                      size={15}
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
                  ACTIONS
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
                    disabled={
                      isCancelling ||
                      isRescheduling
                    }
                  >
                    <Trash2 size={17} />

                    {isCancelling
                      ? "Cancelling..."
                      : "Cancel Appointment"}
                  </button>
                )}

                {/* RESCHEDULE / EXTEND */}

                {canReschedule && (
                  <button
                    type="button"
                    className="reschedule-appointment-btn"
                    onClick={() =>
                      handleOpenReschedule(
                        appointment
                      )
                    }
                    disabled={
                      isCancelling ||
                      isRescheduling
                    }
                  >
                    <RefreshCw size={15} />

                    {isRescheduling
                      ? "Rescheduling..."
                      : "Reschedule"}
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

                {/* EXPIRED */}

                {isExpired && (
                  <div className="appointment-info expired-info">
                    This appointment has expired.
                  </div>
                )}

                {/* REJECTED */}

                {isRejected && (
                  <div className="appointment-info rejected-info">
                    This appointment was rejected.
                  </div>
                )}

              </div>

            </div>
          );
        })}

      </div>

      {/* =================================================
          CANCEL CONFIRMATION MODAL
      ================================================= */}

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

      {/* =================================================
          RESCHEDULE MODAL
      ================================================= */}

      {showRescheduleModal &&
        selectedRescheduleAppointment && (
          <div
            className="reschedule-modal-overlay"
            onClick={closeRescheduleModal}
          >

            <div
              className="reschedule-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              {/* ICON */}

              <div className="reschedule-modal-icon">
                <RefreshCw size={24} />
              </div>

              {/* TITLE */}

              <h3>
                Reschedule Appointment
              </h3>

              {/* DESCRIPTION */}

              <p>
                Select a new date and time for
                your appointment. The appointment
                will become{" "}
                <strong>Pending</strong> until it
                is confirmed again.
              </p>

              {/* FORM */}

              <div className="reschedule-form">

                {/* DATE */}

                <div className="reschedule-field">

                  <label htmlFor="reschedule-date">
                    New Date
                  </label>

                  <div className="reschedule-input-wrap">

                    <CalendarDays size={16} />

                    <input
                      id="reschedule-date"
                      type="date"
                      min={getTodayDate()}
                      value={rescheduleDate}
                      onChange={(e) =>
                        setRescheduleDate(
                          e.target.value
                        )
                      }
                      disabled={!!reschedulingId}
                    />

                  </div>

                </div>

                {/* TIME */}

                <div className="reschedule-field">

                  <label htmlFor="reschedule-time">
                    New Time
                  </label>

                  <div className="reschedule-input-wrap">

                    <Clock3 size={16} />

                    <input
                      id="reschedule-time"
                      type="time"
                      value={rescheduleTime}
                      onChange={(e) =>
                        setRescheduleTime(
                          e.target.value
                        )
                      }
                      disabled={!!reschedulingId}
                    />

                  </div>

                </div>

              </div>

              {/* MODAL ACTIONS */}

              <div className="reschedule-modal-actions">

                <button
                  type="button"
                  className="reschedule-modal-btn reschedule-modal-close"
                  onClick={closeRescheduleModal}
                  disabled={!!reschedulingId}
                >
                  <XCircle size={14} />
                  Close
                </button>

                <button
                  type="button"
                  className="reschedule-modal-btn reschedule-modal-confirm"
                  onClick={
                    confirmRescheduleAppointment
                  }
                  disabled={
                    !!reschedulingId ||
                    !rescheduleDate ||
                    !rescheduleTime
                  }
                >
                  <RefreshCw size={14} />

                  {reschedulingId
                    ? "Rescheduling..."
                    : "Reschedule"}
                </button>

              </div>

            </div>

          </div>
        )}

    </div>
  );
}

export default Appointments;